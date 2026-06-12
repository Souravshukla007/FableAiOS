// Framework-agnostic domain logic shared by the seed, the API routes, and the
// Channel Service. No DB or server imports here so it stays portable.

import type {
  CommStatus,
  LifecycleStage,
  Channel,
  SegmentRule,
  RuleCombinator,
} from "./types";

// --- Status ordering -------------------------------------------------------
// Rank used to derive Communication.status from its events and to reject
// out-of-order / duplicate callbacks (never regress to a lower rank).
export const STATUS_RANK: Record<CommStatus, number> = {
  queued: 0,
  sent: 1,
  delivered: 2,
  opened: 3,
  read: 4,
  clicked: 5,
  converted: 6,
  failed: -1, // terminal on the delivery branch; tracked, not ranked upward
};

// Given a set of event statuses, compute the derived communication status:
// the highest-rank status seen, unless a terminal `failed` is the only outcome.
export function deriveStatus(statuses: CommStatus[]): CommStatus {
  if (statuses.length === 0) return "queued";
  let top: CommStatus = "queued";
  let sawFailed = false;
  for (const s of statuses) {
    if (s === "failed") {
      sawFailed = true;
      continue;
    }
    if (STATUS_RANK[s] > STATUS_RANK[top]) top = s;
  }
  // If nothing advanced past queued but we failed, surface the failure.
  if (sawFailed && STATUS_RANK[top] <= STATUS_RANK["sent"]) return "failed";
  return top;
}

// --- Lifecycle staging -----------------------------------------------------
export interface LifecycleInput {
  totalSpend: number;
  orderCount: number;
  lastOrderDays: number; // days since last order
}

export function computeLifecycleStage(i: LifecycleInput): LifecycleStage {
  if (i.totalSpend > 25000 && i.lastOrderDays <= 45) return "vip";
  if (i.lastOrderDays > 90) return "dormant";
  if (i.lastOrderDays > 45) return "at_risk";
  if (i.orderCount <= 1) return "new";
  return "active";
}

// --- Segment rule engine ---------------------------------------------------
// A RuleTree is a flat list of rules joined by a combinator. Both the manual
// builder and the AI path emit this shape so they share one evaluator.
export interface RuleTree {
  combinator: RuleCombinator;
  rules: SegmentRule[];
}

export function daysSince(iso: string | Date): number {
  const t = typeof iso === "string" ? new Date(iso).getTime() : iso.getTime();
  return Math.floor((Date.now() - t) / 86_400_000);
}

// Translate a RuleTree into a Prisma `where` clause for Customer queries.
// Returns `{}` (match all) for an empty tree.
export function ruleTreeToPrismaWhere(tree: RuleTree): Record<string, unknown> {
  if (!tree.rules.length) return {};
  const clauses = tree.rules.map(ruleToClause).filter(Boolean) as Record<
    string,
    unknown
  >[];
  if (clauses.length === 0) return {};
  return tree.combinator === "OR" ? { OR: clauses } : { AND: clauses };
}

function numericWhere(op: SegmentRule["op"], n: number) {
  switch (op) {
    case ">":
      return { gt: n };
    case "<":
      return { lt: n };
    case ">=":
      return { gte: n };
    case "<=":
      return { lte: n };
    case "=":
      return { equals: n };
    case "!=":
      return { not: n };
  }
}

function ruleToClause(r: SegmentRule): Record<string, unknown> | null {
  switch (r.attr) {
    case "totalSpend":
    case "orderCount": {
      const n = parseFloat(r.value);
      if (Number.isNaN(n)) return null;
      return { [r.attr]: numericWhere(r.op, n) };
    }
    case "lastOrderDays": {
      // "days since last order > 90" => lastOrderAt < (now - 90d)
      const days = parseFloat(r.value);
      if (Number.isNaN(days)) return null;
      const cutoff = new Date(Date.now() - days * 86_400_000);
      // Larger "days since" means an OLDER date, so operators invert.
      const map: Record<string, Record<string, Date>> = {
        ">": { lt: cutoff },
        ">=": { lte: cutoff },
        "<": { gt: cutoff },
        "<=": { gte: cutoff },
      };
      const w = map[r.op];
      return w ? { lastOrderAt: w } : null;
    }
    case "city":
      return {
        city: r.op === "!=" ? { not: { equals: r.value, mode: "insensitive" } } : { equals: r.value, mode: "insensitive" },
      };
    case "lifecycleStage":
      return {
        lifecycleStage: r.op === "!=" ? { not: r.value } : { equals: r.value },
      };
    default:
      return null;
  }
}

export function rulesToText(tree: RuleTree): string {
  if (!tree.rules.length) return "All customers";
  return tree.rules
    .map((r) => `${r.attr} ${r.op} ${r.value}`)
    .join(` ${tree.combinator} `);
}

// --- Channel base engagement rates (seed + heuristic prediction) -----------
// Differentiated per channel so analytics and predictions are non-uniform.
export const CHANNEL_RATES: Record<
  Channel,
  { delivery: number; open: number; click: number; conversion: number }
> = {
  whatsapp: { delivery: 0.95, open: 0.62, click: 0.28, conversion: 0.13 },
  rcs: { delivery: 0.93, open: 0.55, click: 0.24, conversion: 0.11 },
  sms: { delivery: 0.97, open: 0.45, click: 0.18, conversion: 0.08 },
  email: { delivery: 0.9, open: 0.38, click: 0.14, conversion: 0.06 },
};
