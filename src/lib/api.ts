import type {
  Customer,
  Order,
  Segment,
  Campaign,
  Communication,
  AIRecommendation,
  Channel,
  DashboardKPIs,
  SegmentRule,
  RuleCombinator,
  AudienceExplanation,
  CampaignAnalysis,
  AppSettings,
  Notification,
} from "./types";

// ---------------------------------------------------------------------------
// SINGLE API LAYER — backed by the real CRM server routes (TanStack Start).
// Every method calls /api/* which reads/writes Postgres via Prisma. The Channel
// Service (separate process) drives communication events through /api/receipts.
// ---------------------------------------------------------------------------

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${init?.method ?? "GET"} ${path} -> ${res.status}`);
  return (await res.json()) as T;
}

export const api = {
  // ---- Customers ----
  async getCustomers(): Promise<Customer[]> {
    return http<Customer[]>("/api/customers");
  },
  async getCustomer(id: string): Promise<Customer | undefined> {
    const res = await fetch(`/api/customers/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`GET /api/customers/${id} -> ${res.status}`);
    return (await res.json()) as Customer;
  },
  async getCustomerOrders(customerId: string): Promise<Order[]> {
    return http<Order[]>(`/api/customers/${customerId}/orders`);
  },
  async getCustomerInsight(id: string): Promise<string> {
    return http<string>(`/api/customers/${id}/insight`);
  },

  // ---- Segments ----
  async getSegments(): Promise<Segment[]> {
    return http<Segment[]>("/api/segments");
  },
  async getSegment(id: string): Promise<Segment | undefined> {
    const segs = await http<Segment[]>("/api/segments");
    return segs.find((s) => s.id === id);
  },
  async createSegment(input: Partial<Segment>): Promise<Segment> {
    return http<Segment>("/api/segments", { method: "POST", body: JSON.stringify(input) });
  },
  // Guarded delete: server refuses (409) when campaigns still reference the
  // segment. We surface a friendly message with the blocking campaign count.
  async deleteSegment(id: string): Promise<{ ok: true }> {
    const res = await fetch(`/api/segments/${id}`, { method: "DELETE" });
    if (res.ok) return (await res.json()) as { ok: true };
    const data = (await res.json().catch(() => ({}))) as { error?: string; campaignCount?: number };
    if (res.status === 409) {
      const n = data.campaignCount ?? 0;
      throw new Error(
        `This segment is used by ${n} campaign${n === 1 ? "" : "s"}. Delete or reassign ${n === 1 ? "it" : "them"} first.`
      );
    }
    throw new Error(data.error ?? `DELETE /api/segments/${id} -> ${res.status}`);
  },
  // Count customers matching a structured rule set (live audience preview).
  async previewSegmentByRules(rules: SegmentRule[], combinator: RuleCombinator): Promise<number> {
    return http<number>("/api/segments/preview", {
      method: "POST",
      body: JSON.stringify({ rules, combinator }),
    });
  },
  // Natural-language -> AI segment with equivalent structured rules.
  async generateSegmentFromText(
    text: string
  ): Promise<Segment & { rules: SegmentRule[]; combinator: RuleCombinator }> {
    return http<Segment & { rules: SegmentRule[]; combinator: RuleCombinator }>("/api/ai/segment", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  },

  // ---- Campaigns ----
  async getCampaigns(): Promise<Campaign[]> {
    return http<Campaign[]>("/api/campaigns");
  },
  async getCampaign(id: string): Promise<Campaign | undefined> {
    const res = await fetch(`/api/campaigns/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`GET /api/campaigns/${id} -> ${res.status}`);
    return (await res.json()) as Campaign;
  },
  async createCampaign(input: Partial<Campaign>): Promise<Campaign> {
    return http<Campaign>("/api/campaigns", { method: "POST", body: JSON.stringify(input) });
  },
  async launchCampaign(id: string): Promise<Campaign> {
    await http(`/api/campaigns/${id}/launch`, { method: "POST" });
    const camp = await api.getCampaign(id);
    if (!camp) throw new Error("Campaign not found after launch");
    return camp;
  },
  async getCampaignPostMortem(id: string): Promise<string> {
    return http<string>(`/api/campaigns/${id}/postmortem`);
  },
  async getCampaignAnalysis(id: string): Promise<CampaignAnalysis | null> {
    const res = await fetch(`/api/campaigns/${id}/analysis`);
    if (!res.ok) return null;
    return (await res.json()) as CampaignAnalysis | null;
  },
  // Live stats come from real Channel Service callbacks; just re-fetch.
  async tickCampaignStats(id: string): Promise<Campaign | undefined> {
    return api.getCampaign(id);
  },

  // ---- Communications / Channel Monitor ----
  async getCommunications(): Promise<Communication[]> {
    return http<Communication[]>("/api/communications");
  },

  // ---- Dashboard / Analytics (real aggregates over the event spine) ----
  async getDashboardKPIs(): Promise<DashboardKPIs> {
    return http<DashboardKPIs>("/api/analytics/overview");
  },
  async getRevenueByWeek(): Promise<{ week: string; revenue: number }[]> {
    return http<{ week: string; revenue: number }[]>("/api/analytics/revenue-weekly");
  },
  async getLifecycleDistribution(): Promise<{ stage: string; count: number }[]> {
    return http<{ stage: string; count: number }[]>("/api/analytics/lifecycle");
  },
  async getChannelComparison(days?: number): Promise<
    { channel: string; sent: number; delivered: number; opened: number; clicked: number; revenue: number }[]
  > {
    const qs = days ? `?days=${days}` : "";
    return http<
      { channel: string; sent: number; delivered: number; opened: number; clicked: number; revenue: number }[]
    >(`/api/analytics/channels${qs}`);
  },
  async getEngagementTrend(days?: number): Promise<{ day: string; open: number; click: number; conversion: number }[]> {
    const qs = days ? `?days=${days}` : "";
    return http<{ day: string; open: number; click: number; conversion: number }[]>(
      `/api/analytics/engagement${qs}`
    );
  },

  // ---- Jarvis (AI recommendations) ----
  async getAIRecommendation(goal: string): Promise<AIRecommendation> {
    return http<AIRecommendation>("/api/ai/recommend", { method: "POST", body: JSON.stringify({ goal }) });
  },
  async getProactiveSuggestions(): Promise<
    { id: string; title: string; detail: string; channel: Channel; cta: string }[]
  > {
    return http<{ id: string; title: string; detail: string; channel: Channel; cta: string }[]>(
      "/api/analytics/suggestions"
    );
  },

  // ---- AI Explainability (real aggregation; AI does language, DB does facts) ----
  async getAudienceExplanation(input: {
    segmentId?: string;
    rules?: SegmentRule[];
    combinator?: RuleCombinator;
  }): Promise<AudienceExplanation> {
    return http<AudienceExplanation>("/api/ai/explain", { method: "POST", body: JSON.stringify(input) });
  },
  async getCustomerExplanation(customerId: string): Promise<AudienceExplanation> {
    return http<AudienceExplanation>(`/api/customers/${customerId}/explanation`);
  },

  // ---- Settings (single-row server-authoritative app config) ----
  async getSettings(): Promise<AppSettings> {
    return http<AppSettings>("/api/settings");
  },
  async updateSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
    return http<AppSettings>("/api/settings", { method: "PUT", body: JSON.stringify(patch) });
  },

  // ---- Notifications (persistent inbox; producers fire from launch/receipts/AI) ----
  async listNotifications(opts: { unreadOnly?: boolean; limit?: number } = {}): Promise<Notification[]> {
    const qs = new URLSearchParams();
    if (opts.unreadOnly) qs.set("unread", "true");
    if (opts.limit) qs.set("limit", String(opts.limit));
    const suffix = qs.toString();
    return http<Notification[]>(`/api/notifications${suffix ? `?${suffix}` : ""}`);
  },
  async markNotificationRead(id: string): Promise<Notification> {
    return http<Notification>(`/api/notifications/${id}`, { method: "PATCH" });
  },
  async markAllNotificationsRead(): Promise<{ updated: number }> {
    return http<{ updated: number }>(`/api/notifications/mark-all-read`, { method: "POST" });
  },
};

// Map a customer's lifecycle to their "home" seed segment (display only).
const LIFECYCLE_HOME_SEGMENT: Record<string, { id: string; name: string }> = {
  vip: { id: "seg_vip", name: "VIP Loyalists" },
  dormant: { id: "seg_dormant_hv", name: "Dormant High-Value" },
  at_risk: { id: "seg_at_risk", name: "At-Risk Regulars" },
  new: { id: "seg_new", name: "First-Time Buyers" },
  active: { id: "seg_active", name: "Active Repeat Buyers" },
};

export function homeSegmentForCustomer(c: Customer): { id: string; name: string } {
  return LIFECYCLE_HOME_SEGMENT[c.lifecycleStage] ?? { id: "seg_active", name: "Active Repeat Buyers" };
}
