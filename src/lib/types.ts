export type LifecycleStage = "new" | "active" | "at_risk" | "dormant" | "vip";
export type Channel = "whatsapp" | "sms" | "email" | "rcs";
export type Confidence = "low" | "medium" | "high";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalSpend: number;
  orderCount: number;
  lastOrderAt: string;
  firstOrderAt: string;
  avgOrderValue: number;
  lifecycleStage: LifecycleStage;
  tags: string[];
}

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  amount: number;
  items: OrderItem[];
  placedAt: string;
  channel?: string;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  rulesText: string;
  customerCount: number;
  createdBy: "marketer" | "ai";
  createdAt: string;
  aiReason?: string;
}

export type SegmentAttribute =
  | "totalSpend"
  | "orderCount"
  | "lastOrderDays"
  | "city"
  | "lifecycleStage";

export type SegmentOperator = ">" | "<" | ">=" | "<=" | "=" | "!=";

export type RuleCombinator = "AND" | "OR";

export interface SegmentRule {
  id: string;
  attr: SegmentAttribute;
  op: SegmentOperator;
  value: string;
}

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "completed"
  | "failed";

export interface CampaignPrediction {
  expectedDeliveryRate: number;
  expectedOpenRate: number;
  expectedClickRate: number;
  expectedConversionRate: number;
  expectedRevenueMin: number;
  expectedRevenueMax: number;
  confidence: Confidence;
  rationale: string;
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  failed: number;
  opened: number;
  read: number;
  clicked: number;
  converted: number;
  attributedRevenue: number;
}

export interface Campaign {
  id: string;
  name: string;
  goal: string;
  segmentId: string;
  channel: Channel;
  message: string;
  status: CampaignStatus;
  createdAt: string;
  sentAt?: string;
  audienceSize: number;
  prediction?: CampaignPrediction;
  stats: CampaignStats;
}

export type CommStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "failed"
  | "opened"
  | "read"
  | "clicked"
  | "converted";

export interface Communication {
  id: string;
  campaignId: string;
  customerId: string;
  channel: Channel;
  status: CommStatus;
  timeline: { status: CommStatus; at: string }[];
  retries: number;
}

export interface AudienceReason {
  label: string;
  value: string;
}

export interface AIRecommendation {
  audience: {
    segmentId: string;
    segmentName: string;
    size: number;
    reason: string;
    reasons: AudienceReason[];
  };
  channel: { value: Channel; reason: string; alternatives: { value: Channel; reason: string }[] };
  message: { subject?: string; body: string; reason: string };
  prediction: CampaignPrediction;
}

export type SignalKind = "currency" | "percent" | "count" | "days" | "text";
export type SignalWeight = "high" | "medium" | "low";
export type SignalTrend = "up" | "down" | "flat";

export interface ExplanationSignal {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  kind: SignalKind;
  evidence: string;
  weight: SignalWeight;
  trend?: SignalTrend;
}

export interface AudienceExplanation {
  audienceSize: number;
  summary: string;
  signals: ExplanationSignal[];
  comparableCampaigns?: { name: string; channel: Channel; conversionRate: number }[];
  generatedAt: string;
}

export interface CampaignAnalysis {
  summary: string;
  factors: { label: string; verdict: "positive" | "neutral" | "negative"; text: string }[];
  nextAction: { title: string; detail: string; goal: string; channel: Channel };
}

export interface AppSettings {
  brandName: string;
  supportEmail: string;
  brandVoice: string;
  enabledChannels: Channel[];
  proactiveSuggestions: boolean;
}

export interface DashboardKPIs {
  totalCustomers: number;
  customersDelta: number;
  activeCampaigns: number;
  campaignsDelta: number;
  avgOpenRate: number;
  openRateDelta: number;
  attributedRevenue: number;
  revenueDelta: number;
}

export type NotificationKind =
  | "CAMPAIGN_LAUNCHED"
  | "CAMPAIGN_DELIVERED"
  | "CAMPAIGN_FAILED"
  | "AI_SUGGESTION";

export type NotificationSeverity = "INFO" | "SUCCESS" | "WARN" | "ERROR";

export interface Notification {
  id: string;
  kind: NotificationKind;
  severity: NotificationSeverity;
  title: string;
  body: string | null;
  link: string | null;
  entityType: string | null;
  entityId: string | null;
  readAt: string | null; // ISO timestamp; null = unread
  createdAt: string; // ISO timestamp
}
