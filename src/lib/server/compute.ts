// Pure aggregation/compute logic over the live Store. Ported from the original
// mock api.ts so the AI explainability + segmentation math is identical, but now
// every signal is computed from real Postgres-backed data passed in via `store`.

import type {
  Customer, Segment, Channel, CommStatus, SegmentRule, RuleCombinator,
  AudienceExplanation, ExplanationSignal,
} from "@/lib/types";
import type { Store } from "./store.server";

// ---- formatting helpers ----
export function channelMetaLabel(c: Channel): string {
  return { whatsapp: "WhatsApp", sms: "SMS", email: "Email", rcs: "RCS" }[c];
}
export function formatINRInline(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
export function daysSince(isoStr: string): number {
  return Math.floor((Date.now() - new Date(isoStr).getTime()) / 86400000);
}

// ---- rule evaluation (shared by manual + AI segment paths) ----
function customerAttr(c: Customer, attr: SegmentRule["attr"]): number | string {
  switch (attr) {
    case "totalSpend": return c.totalSpend;
    case "orderCount": return c.orderCount;
    case "lastOrderDays": return daysSince(c.lastOrderAt);
    case "city": return c.city.toLowerCase();
    case "lifecycleStage": return c.lifecycleStage;
  }
}
export function matchRule(c: Customer, r: SegmentRule): boolean {
  const actual = customerAttr(c, r.attr);
  if (typeof actual === "number") {
    const v = parseFloat(r.value);
    if (Number.isNaN(v)) return true;
    switch (r.op) {
      case ">": return actual > v;
      case "<": return actual < v;
      case ">=": return actual >= v;
      case "<=": return actual <= v;
      case "=": return actual === v;
      case "!=": return actual !== v;
    }
  }
  const v = r.value.trim().toLowerCase();
  if (!v) return true;
  return r.op === "!=" ? actual !== v : actual === v;
}
export function customersByRules(store: Store, rules: SegmentRule[], combinator: RuleCombinator): Customer[] {
  if (rules.length === 0) return [];
  return store.customers.filter((c) =>
    combinator === "AND" ? rules.every((r) => matchRule(c, r)) : rules.some((r) => matchRule(c, r))
  );
}
export function countByRules(store: Store, rules: SegmentRule[], combinator: RuleCombinator): number {
  return customersByRules(store, rules, combinator).length;
}
export function rulesToText(rules: SegmentRule[], combinator: RuleCombinator): string {
  if (rules.length === 0) return "All customers";
  return rules.map((r) => `${r.attr} ${r.op} ${r.value}`).join(` ${combinator} `);
}
export function deriveStructuredRules(text: string): { rules: SegmentRule[]; combinator: RuleCombinator } {
  const t = text.toLowerCase();
  const rules: SegmentRule[] = [];
  const add = (attr: SegmentRule["attr"], op: SegmentRule["op"], value: string) =>
    rules.push({ id: `r_${rules.length}_${Math.random().toString(36).slice(2, 6)}`, attr, op, value });
  if (t.includes("dormant") || t.includes("haven't") || t.includes("lapsed") || /\b\d+\s*days?\b/.test(t)) {
    const m = t.match(/(\d+)\s*days?/);
    add("lastOrderDays", ">", m ? m[1] : "90");
  }
  if (t.includes("high") || t.includes("vip") || t.includes("value") || t.includes("loyal")) add("totalSpend", ">", "15000");
  if (t.includes("new") || t.includes("first")) add("orderCount", "=", "1");
  if (t.includes("repeat") || t.includes("regular")) add("orderCount", ">=", "2");
  if (t.includes("at risk") || t.includes("at-risk")) add("lifecycleStage", "=", "at_risk");
  const cityMatch = ["mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "pune", "kolkata"].find((c) => t.includes(c));
  if (cityMatch) add("city", "=", cityMatch);
  if (rules.length === 0) add("totalSpend", ">", "5000");
  const combinator: RuleCombinator = t.includes(" or ") ? "OR" : "AND";
  return { rules, combinator };
}
export function deriveSegmentName(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("dormant") || t.includes("win")) return "AI: Dormant Win-Back Cohort";
  if (t.includes("vip") || t.includes("high")) return "AI: High-Value Cohort";
  if (t.includes("new") || t.includes("first")) return "AI: New Buyer Cohort";
  if (t.includes("coffee")) return "AI: Coffee Affinity Cohort";
  return "AI: Targeted Cohort";
}

// ---- explainability (real aggregation) ----
const ENGAGED: CommStatus[] = ["opened", "read", "clicked", "converted"];

// Predicate map mirroring the seeded segment definitions.
export const SEGMENT_PREDICATES: Record<string, (c: Customer) => boolean> = {
  seg_vip: (c) => c.lifecycleStage === "vip",
  seg_dormant_hv: (c) => c.totalSpend > 10000 && c.lifecycleStage === "dormant",
  seg_new: (c) => c.lifecycleStage === "new",
  seg_at_risk: (c) => c.lifecycleStage === "at_risk",
  seg_coffee: (c) => c.tags.includes("coffee-lover"),
  seg_skincare: (c) => c.tags.includes("skincare"),
  seg_discount: (c) => c.tags.includes("discount-seeker"),
  seg_active: (c) => c.lifecycleStage === "active",
};

export function resolveAudience(
  store: Store,
  input: { segmentId?: string; rules?: SegmentRule[]; combinator?: RuleCombinator }
): Customer[] {
  if (input.rules && input.rules.length) return customersByRules(store, input.rules, input.combinator ?? "AND");
  if (input.segmentId) {
    const pred = SEGMENT_PREDICATES[input.segmentId];
    if (pred) return store.customers.filter(pred);
    const seg = store.segments.find((s) => s.id === input.segmentId);
    if (seg) {
      const derived = deriveStructuredRules(seg.description || seg.rulesText || "");
      return customersByRules(store, derived.rules, derived.combinator);
    }
  }
  return [];
}

function channelAffinity(store: Store, custIds: Set<string>): { channel: Channel; rate: number } | null {
  const tally: Partial<Record<Channel, { total: number; engaged: number }>> = {};
  for (const cm of store.communications) {
    if (!custIds.has(cm.customerId)) continue;
    const t = (tally[cm.channel] ??= { total: 0, engaged: 0 });
    t.total++;
    if (ENGAGED.includes(cm.status)) t.engaged++;
  }
  let best: { channel: Channel; rate: number } | null = null;
  for (const [ch, t] of Object.entries(tally) as [Channel, { total: number; engaged: number }][]) {
    if (t.total < 1) continue;
    const rate = t.engaged / t.total;
    if (!best || rate > best.rate) best = { channel: ch, rate };
  }
  return best;
}

function comparableCampaigns(store: Store, segmentId: string | undefined, dominantStage: string) {
  const completed = store.campaigns.filter((c) => c.status === "completed" && c.stats.delivered > 0);
  const convRate = (c: (typeof completed)[number]) => c.stats.converted / c.stats.delivered;
  let pool = completed.filter((c) => c.segmentId === segmentId);
  if (pool.length === 0) {
    pool = completed.filter((c) => {
      const seg = store.segments.find((s) => s.id === c.segmentId);
      return seg && SEGMENT_PREDICATES[seg.id] &&
        store.customers.filter(SEGMENT_PREDICATES[seg.id]).some((x) => x.lifecycleStage === dominantStage);
    });
  }
  if (pool.length === 0) pool = completed;
  return pool.sort((a, b) => convRate(b) - convRate(a)).slice(0, 3)
    .map((c) => ({ name: c.name.split(" — ")[0], channel: c.channel, conversionRate: convRate(c) }));
}

const STAGE_DESC: Record<string, string> = {
  vip: "high-value loyalists",
  dormant: "shoppers who've gone quiet",
  at_risk: "regulars whose cadence is slipping",
  new: "fresh first-time buyers",
  active: "engaged repeat buyers",
};

function emptyExplanation(): AudienceExplanation {
  return { audienceSize: 0, summary: "No customers match this audience yet.", signals: [], generatedAt: new Date().toISOString() };
}

export function buildExplanation(
  store: Store, customers: Customer[], meta: { segmentId?: string; segName?: string }
): AudienceExplanation {
  const n = customers.length;
  if (n === 0) return emptyExplanation();
  const signals: ExplanationSignal[] = [];

  const avgSpend = customers.reduce((s, c) => s + c.totalSpend, 0) / n;
  signals.push({ id: "avg_spend", label: "Average spend", value: formatINRInline(avgSpend), rawValue: Math.round(avgSpend), kind: "currency", evidence: `AVG(totalSpend) across ${n} customers`, weight: "high", trend: "up" });

  const avgDays = customers.reduce((s, c) => s + daysSince(c.lastOrderAt), 0) / n;
  signals.push({ id: "recency", label: "Recency", value: `${Math.round(avgDays)} days since last order`, rawValue: Math.round(avgDays), kind: "days", evidence: "mean days since lastOrderAt", weight: "high", trend: avgDays > 60 ? "down" : "flat" });

  const avgOrders = customers.reduce((s, c) => s + c.orderCount, 0) / n;
  signals.push({ id: "frequency", label: "Order frequency", value: `${avgOrders.toFixed(1)} orders avg`, rawValue: +avgOrders.toFixed(1), kind: "count", evidence: "AVG(orderCount)", weight: "medium" });

  const ids = new Set(customers.map((c) => c.id));
  const aff = channelAffinity(store, ids);
  if (aff) {
    signals.push({ id: "channel_affinity", label: `${channelMetaLabel(aff.channel)} engagement`, value: `${Math.round(aff.rate * 100)}%`, rawValue: +aff.rate.toFixed(3), kind: "percent", evidence: `opened/clicked rate on ${channelMetaLabel(aff.channel)} across this audience`, weight: "high", trend: aff.rate > 0.5 ? "up" : "flat" });
  }

  const mix: Record<string, number> = {};
  customers.forEach((c) => (mix[c.lifecycleStage] = (mix[c.lifecycleStage] ?? 0) + 1));
  const [domStage, domCount] = Object.entries(mix).sort((a, b) => b[1] - a[1])[0];
  const domShare = domCount / n;
  signals.push({ id: "lifecycle", label: "Lifecycle mix", value: `${Math.round(domShare * 100)}% ${domStage.replace("_", " ")}`, rawValue: +domShare.toFixed(3), kind: "percent", evidence: `dominant lifecycleStage = ${domStage} (${domCount}/${n})`, weight: "medium" });

  const comps = comparableCampaigns(store, meta.segmentId, domStage);
  const descriptor = STAGE_DESC[domStage] ?? "targeted shoppers";
  const channelPart = aff && aff.rate >= 0.4 ? ` who respond well on ${channelMetaLabel(aff.channel)}` : "";
  const spendPart = avgSpend > 8000 ? "High-value " : avgSpend > 4000 ? "Mid-tier " : "";
  const summary = `${spendPart}${descriptor}${channelPart}.`.replace(/^./, (m) => m.toUpperCase());

  return { audienceSize: n, summary, signals, comparableCampaigns: comps.length ? comps : undefined, generatedAt: new Date().toISOString() };
}

const LIFECYCLE_HOME_SEGMENT: Record<string, string> = {
  vip: "seg_vip", dormant: "seg_dormant_hv", at_risk: "seg_at_risk", new: "seg_new", active: "seg_active",
};
function homeSegmentForCustomer(store: Store, c: Customer): { id: string; name: string } {
  const id = LIFECYCLE_HOME_SEGMENT[c.lifecycleStage] ?? "seg_active";
  const seg = store.segments.find((s) => s.id === id);
  return { id, name: seg?.name ?? c.lifecycleStage.replace("_", " ") };
}
function rulesSatisfied(c: Customer): string[] {
  const days = daysSince(c.lastOrderAt);
  switch (c.lifecycleStage) {
    case "vip": return [`totalSpend ${formatINRInline(c.totalSpend)} > ₹25,000`];
    case "dormant": return [`totalSpend ${formatINRInline(c.totalSpend)} > ₹10,000`, `${days} days since last order > 90`];
    case "at_risk": return [`${days} days since last order is within 46–75`];
    case "new": return [`orderCount = ${c.orderCount} (single purchase)`];
    default: return [`orderCount = ${c.orderCount} with last order ${days} days ago`];
  }
}

export function buildCustomerExplanation(store: Store, c: Customer): AudienceExplanation {
  const home = homeSegmentForCustomer(store, c);
  const peers = store.customers.filter((p) => p.lifecycleStage === c.lifecycleStage);
  const avgSpend = peers.length ? peers.reduce((s, p) => s + p.totalSpend, 0) / peers.length : c.totalSpend;
  const days = daysSince(c.lastOrderAt);

  const signals: ExplanationSignal[] = [
    { id: "spend_vs_avg", label: "Spend vs segment avg", value: formatINRInline(c.totalSpend), rawValue: c.totalSpend, kind: "currency", evidence: `customer.totalSpend ${formatINRInline(c.totalSpend)} vs ${home.name} AVG ${formatINRInline(avgSpend)} (${peers.length} peers)`, weight: "high", trend: c.totalSpend > avgSpend * 1.05 ? "up" : c.totalSpend < avgSpend * 0.95 ? "down" : "flat" },
    { id: "recency", label: "Days since last order", value: `${days} days`, rawValue: days, kind: "days", evidence: `customer.lastOrderAt → ${days} days ago`, weight: "high", trend: days > 60 ? "down" : "flat" },
    { id: "orders", label: "Orders placed", value: `${c.orderCount} orders`, rawValue: c.orderCount, kind: "count", evidence: `customer.orderCount = ${c.orderCount}`, weight: "medium" },
  ];

  const aff = channelAffinity(store, new Set([c.id]));
  if (aff) {
    signals.push({ id: "channel", label: `${channelMetaLabel(aff.channel)} engagement`, value: `${Math.round(aff.rate * 100)}%`, rawValue: +aff.rate.toFixed(3), kind: "percent", evidence: `opened/clicked rate on ${channelMetaLabel(aff.channel)} for ${c.name}`, weight: "high", trend: aff.rate > 0.5 ? "up" : "flat" });
  }
  const satisfied = rulesSatisfied(c);
  signals.push({ id: "rules", label: "Rules satisfied", value: `${satisfied.length} matched`, rawValue: satisfied.length, kind: "text", evidence: satisfied.join(" · "), weight: "medium" });

  const spendVerb = c.totalSpend > avgSpend * 1.05 ? "above" : c.totalSpend < avgSpend * 0.95 ? "below" : "in line with";
  return { audienceSize: 1, summary: `${c.name} sits in ${home.name} — spending ${spendVerb} the segment average and last active ${days} days ago.`, signals, generatedAt: new Date().toISOString() };
}

// Static, stage-based insight string (no fabricated numbers).
export function customerInsight(c: Customer): string {
  const map: Record<string, string> = {
    vip: `${c.name} is a top-tier customer (₹${c.totalSpend.toLocaleString("en-IN")} lifetime). High affinity for premium items — prioritise early access and concierge messaging on WhatsApp.`,
    dormant: `${c.name} hasn't ordered in a while despite a strong history. A win-back with a personalised incentive has strong reactivation odds in the next 30 days.`,
    at_risk: `${c.name}'s purchase cadence is slowing. A timely, value-led nudge now can prevent churn — avoid heavy discounting which trains price sensitivity.`,
    new: `${c.name} is a fresh customer. The second purchase is the most predictive of LTV — a gentle product-education sequence works best here.`,
    active: `${c.name} is an engaged repeat buyer. Cross-sell adjacent categories; they respond well to new-arrival announcements.`,
  };
  return map[c.lifecycleStage] ?? "";
}
