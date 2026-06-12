// Server-only: loads the live Postgres data and maps it into the SAME frontend
// types the UI already consumes (src/lib/types.ts). Campaign stats and
// communication timelines are DERIVED from the CommunicationEvent spine, so
// every number traces to a real row — no Math.random in the data path.

import { prisma } from "@/lib/db.server";
import type {
  Customer, Order, Segment, Campaign, Communication,
  CampaignStats, CommStatus, Channel,
} from "@/lib/types";

const iso = (d: Date | null | undefined): string =>
  d ? new Date(d).toISOString() : new Date(0).toISOString();

// Status ordering rank — drives cumulative funnel counts and timeline order.
const RANK: Record<CommStatus, number> = {
  queued: 0, sent: 1, delivered: 2, opened: 3, read: 4, clicked: 5, converted: 6, failed: 1,
};

const DELIVERED_SET: CommStatus[] = ["delivered", "opened", "read", "clicked", "converted"];
const OPENED_SET: CommStatus[] = ["opened", "read", "clicked", "converted"];
const READ_SET: CommStatus[] = ["read", "clicked", "converted"];
const CLICKED_SET: CommStatus[] = ["clicked", "converted"];

export interface Store {
  customers: Customer[];
  orders: Order[];
  segments: Segment[];
  campaigns: Campaign[];
  communications: Communication[];
}

// Short-lived cache: dedupes the several analytics/list calls a single page
// fires on render, while staying near-live for the funnel (TTL ~1s).
let _cache: { at: number; store: Store } | null = null;
let _inflight: Promise<Store> | null = null;
const TTL_MS = 1000;

export async function loadStore(): Promise<Store> {
  const now = Date.now();
  if (_cache && now - _cache.at < TTL_MS) return _cache.store;
  if (_inflight) return _inflight;
  _inflight = loadStoreUncached().then((store) => {
    _cache = { at: Date.now(), store };
    _inflight = null;
    return store;
  }).catch((e) => { _inflight = null; throw e; });
  return _inflight;
}

async function loadStoreUncached(): Promise<Store> {
  const [customers, orders, segments, campaigns, comms] = await Promise.all([
    prisma.customer.findMany(),
    prisma.order.findMany({ orderBy: { placedAt: "desc" } }),
    prisma.segment.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.campaign.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.communication.findMany({ include: { events: { orderBy: { occurredAt: "asc" } } } }),
  ]);

  const customerOut: Customer[] = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone ?? "",
    city: c.city ?? "",
    totalSpend: c.totalSpend,
    orderCount: c.orderCount,
    lastOrderAt: iso(c.lastOrderAt),
    firstOrderAt: iso(c.firstOrderAt),
    avgOrderValue: c.avgOrderValue,
    lifecycleStage: c.lifecycleStage as Customer["lifecycleStage"],
    tags: c.tags,
  }));

  const orderOut: Order[] = orders.map((o) => ({
    id: o.id,
    customerId: o.customerId,
    amount: o.amount,
    items: (o.items as Order["items"]) ?? [],
    placedAt: iso(o.placedAt),
    channel: o.channel ?? undefined,
  }));

  // Communications with derived timeline.
  const commOut: Communication[] = comms.map((cm) => ({
    id: cm.id,
    campaignId: cm.campaignId,
    customerId: cm.customerId,
    channel: cm.channel as Channel,
    status: cm.status as CommStatus,
    retries: cm.retries,
    timeline: cm.events.map((e) => ({ status: e.status as CommStatus, at: iso(e.occurredAt) })),
  }));

  // Per-campaign stats derived from the comms + converted-event revenue.
  const revenueByCampaign = new Map<string, number>();
  for (const cm of comms) {
    for (const e of cm.events) {
      if (e.status === "converted" && e.attributedAmount) {
        revenueByCampaign.set(cm.campaignId, (revenueByCampaign.get(cm.campaignId) ?? 0) + e.attributedAmount);
      }
    }
  }
  const commsByCampaign = new Map<string, Communication[]>();
  for (const cm of commOut) {
    const arr = commsByCampaign.get(cm.campaignId) ?? [];
    arr.push(cm);
    commsByCampaign.set(cm.campaignId, arr);
  }
  const statsFor = (campaignId: string): CampaignStats => {
    const list = commsByCampaign.get(campaignId) ?? [];
    const inSet = (s: CommStatus, set: CommStatus[]) => set.includes(s);
    return {
      sent: list.filter((c) => RANK[c.status] >= 1 || c.status === "failed").length,
      delivered: list.filter((c) => inSet(c.status, DELIVERED_SET)).length,
      failed: list.filter((c) => c.status === "failed").length,
      opened: list.filter((c) => inSet(c.status, OPENED_SET)).length,
      read: list.filter((c) => inSet(c.status, READ_SET)).length,
      clicked: list.filter((c) => inSet(c.status, CLICKED_SET)).length,
      converted: list.filter((c) => c.status === "converted").length,
      attributedRevenue: Math.round(revenueByCampaign.get(campaignId) ?? 0),
    };
  };

  const campaignOut: Campaign[] = campaigns.map((c) => ({
    id: c.id,
    name: c.name,
    goal: c.goal ?? "",
    segmentId: c.segmentId,
    channel: c.channel as Channel,
    message: c.message,
    status: c.status as Campaign["status"],
    createdAt: iso(c.createdAt),
    sentAt: c.sentAt ? iso(c.sentAt) : undefined,
    audienceSize: c.audienceSize,
    prediction: (c.predictionJson as Campaign["prediction"]) ?? undefined,
    stats: statsFor(c.id),
  }));

  const segmentOut: Segment[] = segments.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description ?? "",
    rulesText: s.rulesText ?? "",
    customerCount: s.customerCount,
    createdBy: s.createdBy as Segment["createdBy"],
    createdAt: iso(s.createdAt),
    aiReason: s.aiReason ?? undefined,
  }));

  return {
    customers: customerOut,
    orders: orderOut,
    segments: segmentOut,
    campaigns: campaignOut,
    communications: commOut,
  };
}
