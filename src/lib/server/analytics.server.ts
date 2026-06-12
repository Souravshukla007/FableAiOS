// Server-only analytics. Every number is a real aggregate over Postgres data
// and the CommunicationEvent spine — no fabricated figures.

import { prisma } from "@/lib/db.server";
import { loadStore, type Store } from "./store.server";
import { getSettings } from "./settings.server";
import { createNotification } from "./notifications.server";
import type { Channel, CommStatus, DashboardKPIs } from "@/lib/types";

// AI suggestions are surfaced on every dashboard load. Without dedup the bell
// would flood; this window keeps inbox entries to at most once per suggestion
// per 12 hours.
const AI_SUGGESTION_DEDUP_MS = 12 * 60 * 60 * 1000;

interface EngEvent { status: CommStatus; occurredAt: Date; attributedAmount: number | null; channel: Channel }

// Load engagement events (with channel + amount) for time-series & channel revenue.
async function loadEngagementEvents(): Promise<EngEvent[]> {
  const rows = await prisma.communicationEvent.findMany({
    where: { status: { in: ["opened", "clicked", "converted", "delivered"] } },
    select: { status: true, occurredAt: true, attributedAmount: true, communication: { select: { channel: true } } },
  });
  return rows.map((r) => ({
    status: r.status as CommStatus,
    occurredAt: r.occurredAt,
    attributedAmount: r.attributedAmount,
    channel: r.communication.channel as Channel,
  }));
}

const DAY = 86400000;
const pctChange = (cur: number, prev: number) =>
  prev === 0 ? (cur > 0 ? 100 : 0) : +(((cur - prev) / prev) * 100).toFixed(1);

export async function dashboardKPIs(): Promise<DashboardKPIs> {
  const [store, events] = await Promise.all([loadStore(), loadEngagementEvents()]);
  const now = Date.now();

  const totalCustomers = store.customers.length;
  const activeCampaigns = store.campaigns.filter((c) => c.status === "sending" || c.status === "scheduled").length;

  const totalDelivered = store.campaigns.reduce((s, c) => s + c.stats.delivered, 0);
  const totalOpened = store.campaigns.reduce((s, c) => s + c.stats.opened, 0);
  const avgOpenRate = totalDelivered ? totalOpened / totalDelivered : 0;
  const attributedRevenue = store.campaigns.reduce((s, c) => s + c.stats.attributedRevenue, 0);

  // Deltas: last 30d vs prior 30d, grounded in event/customer timestamps.
  const inWindow = (d: Date, from: number, to: number) => +d >= from && +d < to;
  const conv = events.filter((e) => e.status === "converted");
  const rev30 = conv.filter((e) => inWindow(e.occurredAt, now - 30 * DAY, now)).reduce((s, e) => s + (e.attributedAmount ?? 0), 0);
  const revPrev = conv.filter((e) => inWindow(e.occurredAt, now - 60 * DAY, now - 30 * DAY)).reduce((s, e) => s + (e.attributedAmount ?? 0), 0);

  const opened = events.filter((e) => e.status === "opened");
  const delivered = events.filter((e) => e.status === "delivered");
  const orInWin = (from: number, to: number) => {
    const d = delivered.filter((e) => inWindow(e.occurredAt, from, to)).length;
    const o = opened.filter((e) => inWindow(e.occurredAt, from, to)).length;
    return d ? o / d : 0;
  };
  const newCust30 = store.customers.filter((c) => c.firstOrderAt && now - +new Date(c.firstOrderAt) < 30 * DAY).length;
  const campaigns30 = store.campaigns.filter((c) => now - +new Date(c.createdAt) < 30 * DAY).length;

  return {
    totalCustomers,
    customersDelta: +((newCust30 / Math.max(1, totalCustomers)) * 100).toFixed(1),
    activeCampaigns,
    campaignsDelta: campaigns30,
    avgOpenRate,
    openRateDelta: pctChange(orInWin(now - 30 * DAY, now), orInWin(now - 60 * DAY, now - 30 * DAY)),
    attributedRevenue,
    revenueDelta: pctChange(rev30, revPrev),
  };
}

export async function revenueByWeek(weeks = 12): Promise<{ week: string; revenue: number }[]> {
  const events = await loadEngagementEvents();
  const now = Date.now();
  const buckets = Array.from({ length: weeks }, () => 0);
  for (const e of events) {
    if (e.status !== "converted" || !e.attributedAmount) continue;
    const weeksAgo = Math.floor((now - +e.occurredAt) / (7 * DAY));
    if (weeksAgo >= 0 && weeksAgo < weeks) buckets[weeks - 1 - weeksAgo] += e.attributedAmount;
  }
  return buckets.map((revenue, i) => ({ week: `W${i + 1}`, revenue: Math.round(revenue) }));
}

export async function lifecycleDistribution(): Promise<{ stage: string; count: number }[]> {
  const rows = await prisma.customer.groupBy({ by: ["lifecycleStage"], _count: true });
  return rows.map((r) => ({ stage: r.lifecycleStage, count: r._count }));
}

export async function channelComparison(days?: number): Promise<
  { channel: string; sent: number; delivered: number; opened: number; clicked: number; revenue: number }[]
> {
  // Count events on the spine within the optional [now - days, now] window.
  // Event-based counting matches engagementTrend's approach and is time-accurate
  // (one row per status transition). When `days` is omitted we count all-time.
  const sinceMs = days && days > 0 ? Date.now() - days * DAY : null;
  const rows = await prisma.communicationEvent.findMany({
    where: {
      status: { in: ["sent", "delivered", "opened", "clicked", "converted"] },
      ...(sinceMs !== null ? { occurredAt: { gte: new Date(sinceMs) } } : {}),
    },
    select: { status: true, attributedAmount: true, communication: { select: { channel: true } } },
  });

  const map: Record<string, { sent: number; delivered: number; opened: number; clicked: number; revenue: number }> = {};
  for (const r of rows) {
    const channel = r.communication.channel;
    const m = (map[channel] ??= { sent: 0, delivered: 0, opened: 0, clicked: 0, revenue: 0 });
    switch (r.status as CommStatus) {
      case "sent": m.sent++; break;
      case "delivered": m.delivered++; break;
      case "opened": m.opened++; break;
      case "clicked": m.clicked++; break;
      case "converted": m.revenue += r.attributedAmount ?? 0; break;
      default: break;
    }
  }
  return Object.entries(map).map(([channel, v]) => ({ channel, ...v, revenue: Math.round(v.revenue) }));
}

export async function engagementTrend(days = 14): Promise<{ day: string; open: number; click: number; conversion: number }[]> {
  const events = await loadEngagementEvents();
  const now = Date.now();
  const mk = () => ({ open: 0, click: 0, conversion: 0 });
  const buckets = Array.from({ length: days }, mk);
  for (const e of events) {
    const daysAgo = Math.floor((now - +e.occurredAt) / DAY);
    if (daysAgo < 0 || daysAgo >= days) continue;
    const b = buckets[days - 1 - daysAgo];
    if (e.status === "opened") b.open++;
    else if (e.status === "clicked") b.click++;
    else if (e.status === "converted") b.conversion++;
  }
  return buckets.map((b, i) => ({ day: `D${i + 1}`, ...b }));
}

export async function proactiveSuggestions(): Promise<
  { id: string; title: string; detail: string; channel: Channel; cta: string }[]
> {
  const [store, settings] = await Promise.all([loadStore(), getSettings()]);
  if (!settings.proactiveSuggestions) return [];

  const enabled = settings.enabledChannels;
  // Pick the first enabled channel from a preferred list, else fall back to default.
  const pick = (preferred: Channel[], fallback: Channel): Channel =>
    preferred.find((c) => enabled.includes(c)) ?? (enabled.includes(fallback) ? fallback : enabled[0] ?? fallback);

  const dormantHV = store.customers.filter((c) => c.lifecycleStage === "dormant" && c.totalSpend > 10000).length;
  const atRisk = store.customers.filter((c) => c.lifecycleStage === "at_risk").length;
  const vip = store.customers.filter((c) => c.lifecycleStage === "vip").length;

  const winBackChannel = pick(["whatsapp", "rcs", "sms", "email"], "whatsapp");
  const reEngageChannel = pick(["email", "whatsapp", "sms", "rcs"], "email");
  const vipChannel = pick(["rcs", "whatsapp", "email", "sms"], "rcs");

  const labelOf: Record<Channel, string> = { whatsapp: "WhatsApp", rcs: "RCS", sms: "SMS", email: "Email" };

  const all = [
    { id: "sug_1", title: "Dormant high-value win-back", detail: `${dormantHV} high-value customers went dormant. Launch a ${labelOf[winBackChannel]} win-back with early access.`, channel: winBackChannel, cta: `Win back on ${labelOf[winBackChannel]}` },
    { id: "sug_2", title: "At-risk regulars need a nudge", detail: `${atRisk} regulars are slowing down. A value-led ${labelOf[reEngageChannel].toLowerCase()} now can prevent churn.`, channel: reEngageChannel, cta: `Send re-engagement ${labelOf[reEngageChannel].toLowerCase()}` },
    { id: "sug_3", title: "Reward your VIPs", detail: `${vip} VIPs haven't seen the new collection. Offer early access via ${labelOf[vipChannel]}.`, channel: vipChannel, cta: `Launch VIP early access` },
  ];
  // If no channels are enabled at all, return nothing rather than misleading suggestions.
  const result = enabled.length ? all : [];

  // Producer: AI_SUGGESTION notifications, deduped per suggestion id.
  // Failures are swallowed — surfacing suggestions must never break.
  if (result.length) {
    await Promise.all(
      result.map((s) =>
        createNotification({
          kind: "AI_SUGGESTION",
          severity: "INFO",
          title: s.title,
          body: s.detail,
          link: `/jarvis?goal=${encodeURIComponent(s.title)}`,
          entityType: "suggestion",
          entityId: s.id,
          dedupeWindowMs: AI_SUGGESTION_DEDUP_MS,
        }).catch(() => null),
      ),
    );
  }

  return result;
}

export type { Store };
