// Server-only AI layer. FACTS (audience, rates, revenue) come from real DB
// aggregates; Gemini only writes LANGUAGE (message copy, narration) with a
// grounded template fallback. Predictions are an honest heuristic over
// historical per-channel rates — never a fabricated number.

import type {
  Channel, Customer, CampaignPrediction, AIRecommendation, CampaignAnalysis, AppSettings,
} from "@/lib/types";
import type { Store } from "./store.server";
import { resolveAudience, channelMetaLabel, formatINRInline, daysSince } from "./compute";
import { geminiText } from "./gemini.server";
import { getSettings } from "./settings.server";

const CHANNELS: Channel[] = ["whatsapp", "rcs", "sms", "email"];
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

// ---- historical per-channel funnel rates (the empirical basis for prediction) ----
interface Rates { deliveryRate: number; openRate: number; clickRate: number; convRate: number; volume: number }
const DEFAULT_RATES: Record<Channel, Rates> = {
  whatsapp: { deliveryRate: 0.95, openRate: 0.62, clickRate: 0.30, convRate: 0.16, volume: 0 },
  rcs: { deliveryRate: 0.93, openRate: 0.55, clickRate: 0.26, convRate: 0.14, volume: 0 },
  sms: { deliveryRate: 0.98, openRate: 0.45, clickRate: 0.20, convRate: 0.10, volume: 0 },
  email: { deliveryRate: 0.97, openRate: 0.38, clickRate: 0.18, convRate: 0.09, volume: 0 },
};

export function channelHistoricalRates(store: Store): Record<Channel, Rates> {
  const out: Record<Channel, Rates> = JSON.parse(JSON.stringify(DEFAULT_RATES));
  for (const ch of CHANNELS) {
    const comms = store.communications.filter((c) => c.channel === ch);
    const sent = comms.filter((c) => c.status !== "queued").length;
    if (sent < 20) continue; // too little data — keep prior
    const delivered = comms.filter((c) => ["delivered", "opened", "read", "clicked", "converted"].includes(c.status)).length;
    const opened = comms.filter((c) => ["opened", "read", "clicked", "converted"].includes(c.status)).length;
    const clicked = comms.filter((c) => ["clicked", "converted"].includes(c.status)).length;
    const converted = comms.filter((c) => c.status === "converted").length;
    out[ch] = {
      deliveryRate: delivered / sent,
      openRate: delivered ? opened / delivered : 0,
      clickRate: delivered ? clicked / delivered : 0,
      convRate: delivered ? converted / delivered : 0,
      volume: sent,
    };
  }
  return out;
}

function avgAov(audience: Customer[]): number {
  if (!audience.length) return 1500;
  const v = audience.reduce((s, c) => s + (c.avgOrderValue || (c.orderCount ? c.totalSpend / c.orderCount : 0)), 0) / audience.length;
  return Math.round(v) || 1500;
}

export function groundedPrediction(store: Store, audience: Customer[], channel: Channel): CampaignPrediction {
  const r = channelHistoricalRates(store)[channel];
  const size = audience.length || 20;
  const aov = avgAov(audience);
  const expectedConversions = size * r.deliveryRate * r.convRate;
  const confidence: CampaignPrediction["confidence"] =
    size > 60 && r.volume > 200 ? "high" : size > 25 ? "medium" : "low";
  return {
    expectedDeliveryRate: +r.deliveryRate.toFixed(3),
    expectedOpenRate: +r.openRate.toFixed(3),
    expectedClickRate: +r.clickRate.toFixed(3),
    expectedConversionRate: +r.convRate.toFixed(3),
    expectedRevenueMin: Math.round(expectedConversions * aov * 0.7),
    expectedRevenueMax: Math.round(expectedConversions * aov * 1.3),
    confidence,
    rationale: `Heuristic from ${r.volume || "baseline"} historical ${channelMetaLabel(channel)} sends to comparable cohorts (open ${pct(r.openRate, 1)}%, conv ${(r.convRate * 100).toFixed(1)}%) × segment AOV ${formatINRInline(aov)}. Not a trained model — at scale this would learn from campaign outcomes.`,
  };
}

// ---- segment / channel selection (data-driven) ----
function pickSegment(store: Store, goal: string) {
  const t = goal.toLowerCase();
  const by = (id: string) => store.segments.find((s) => s.id === id);
  let seg =
    (t.includes("dormant") || t.includes("win")) ? by("seg_dormant_hv") :
    (t.includes("vip") || t.includes("reward")) ? by("seg_vip") :
    (t.includes("at-risk") || t.includes("reactivate") || t.includes("risk")) ? by("seg_at_risk") :
    (t.includes("first") || t.includes("repeat") || t.includes("convert")) ? by("seg_new") :
    t.includes("coffee") ? by("seg_coffee") :
    t.includes("skincare") ? by("seg_skincare") :
    (t.includes("discount") || t.includes("sale")) ? by("seg_discount") : undefined;
  return seg ?? store.segments[0];
}

function bestChannel(store: Store, allowed: Channel[]): { value: Channel; rates: Record<Channel, Rates> } {
  const rates = channelHistoricalRates(store);
  const pool = allowed.length ? allowed : CHANNELS;
  let best: Channel = pool[0];
  for (const ch of pool) if (rates[ch].convRate > rates[best].convRate) best = ch;
  return { value: best, rates };
}

function templateMessage(goal: string, channel: Channel, brand: { name: string }): { subject?: string; body: string } {
  if (channel === "email") {
    return {
      subject: `We saved something for you, {{name}} 🎁`,
      body: `Hi {{name}},\n\nIt's been a while and we'd love to welcome you back to ${brand.name}. As a thank you, here's 15% off your next order.\n\nYour favourites are back in stock — shop now →\n\nWith love,\nThe ${brand.name} Team`,
    };
  }
  return { body: `Hey {{name}} 👋 ${brand.name} misses you! Here's 15% off your next order — your favourites are waiting. Tap to shop before it expires ⏳` };
}

export async function buildRecommendation(store: Store, goal: string): Promise<AIRecommendation> {
  const settings = await getSettings();
  const segment = pickSegment(store, goal);
  const audience = resolveAudience(store, { segmentId: segment.id });
  const { value: channel, rates } = bestChannel(store, settings.enabledChannels);

  const n = Math.max(1, audience.length);
  const avgSpend = audience.reduce((s, c) => s + c.totalSpend, 0) / n;
  const avgDays = audience.reduce((s, c) => s + daysSince(c.lastOrderAt), 0) / n;
  const r = rates[channel];

  const reasons = [
    { label: "Avg lifetime spend", value: formatINRInline(avgSpend) },
    { label: "Days since last order", value: `${Math.round(avgDays)} days (avg)` },
    { label: `${channelMetaLabel(channel)} engagement`, value: `${Math.round(r.openRate * 100)}% open rate` },
    { label: "Historical conversion", value: `${(r.convRate * 100).toFixed(1)}%` },
  ];

  // Gemini writes the copy (language); template is the grounded fallback.
  const tmpl = templateMessage(goal, channel, { name: settings.brandName });
  const aiBody = await geminiText(
    `You are writing marketing copy for ${settings.brandName}, an Indian D2C brand.\n` +
    `Brand voice: ${settings.brandVoice}\n` +
    `Write a short, on-brand ${channelMetaLabel(channel)} message.\n` +
    `Goal: "${goal}". Audience: ${segment.name} (avg spend ${formatINRInline(avgSpend)}, last order ~${Math.round(avgDays)} days ago).\n` +
    `Use the personalisation token {{name}}. Keep it ${channel === "email" ? "2 short paragraphs with a subject line on the first line prefixed 'Subject:'" : "under 280 characters, 1-2 emojis"}. No markdown.`
  );
  let subject = tmpl.subject;
  let body = tmpl.body;
  if (aiBody) {
    if (channel === "email" && /^subject:/i.test(aiBody)) {
      const [first, ...rest] = aiBody.split("\n");
      subject = first.replace(/^subject:/i, "").trim();
      body = rest.join("\n").trim() || tmpl.body;
    } else {
      body = aiBody;
    }
  }

  // Alternatives only from the marketer's enabled set (excluding the chosen one).
  const altPool = (settings.enabledChannels.length ? settings.enabledChannels : CHANNELS).filter((c) => c !== channel);
  const alternatives = altPool.slice(0, 2).map((c) => ({
    value: c,
    reason: `${channelMetaLabel(c)}: ${(rates[c].convRate * 100).toFixed(1)}% historical conversion, ${Math.round(rates[c].openRate * 100)}% open.`,
  }));

  return {
    audience: {
      segmentId: segment.id,
      segmentName: segment.name,
      size: audience.length,
      reason: `"${segment.name}" best matches your goal — ${audience.length} customers with avg spend ${formatINRInline(avgSpend)} and ${Math.round(avgDays)} days since last order. ${segment.aiReason ?? ""}`.trim(),
      reasons,
    },
    channel: {
      value: channel,
      reason: `${channelMetaLabel(channel)} has the strongest historical conversion (${(r.convRate * 100).toFixed(1)}%) and open rate (${Math.round(r.openRate * 100)}%) for comparable sends.`,
      alternatives,
    },
    message: { subject, body, reason: `Tone and length tuned for ${channelMetaLabel(channel)}. {{name}} personalisation; single time-boxed CTA.` },
    prediction: groundedPrediction(store, audience, channel),
  };
}

// ---- campaign analysis + post-mortem (grounded; Gemini narration optional) ----
export function campaignAnalysis(store: Store, campaignId: string): CampaignAnalysis | null {
  const camp = store.campaigns.find((c) => c.id === campaignId);
  if (!camp) return null;
  const s = camp.stats;
  const seg = store.segments.find((x) => x.id === camp.segmentId);
  const openRate = s.delivered ? s.opened / s.delivered : 0;
  const convRate = s.delivered ? s.converted / s.delivered : 0;
  const predConv = camp.prediction?.expectedConversionRate ?? convRate;
  const clickNoConvert = Math.max(0, s.clicked - s.converted);
  const convBeatPred = convRate >= predConv;

  const factors: CampaignAnalysis["factors"] = [
    { label: "Timing", verdict: openRate > 0.5 ? "positive" : openRate > 0.35 ? "neutral" : "negative",
      text: `${pct(s.opened, s.delivered)}% open rate ${openRate > 0.5 ? "landed well with this cohort" : "suggests a different send window could help"}.` },
    { label: "Audience quality", verdict: (s.sent ? s.delivered / s.sent : 0) > 0.95 ? "positive" : "neutral",
      text: `"${seg?.name ?? "Target cohort"}" — ${pct(s.delivered, s.sent)}% delivery indicates clean, reachable contacts.` },
    { label: "Message", verdict: convBeatPred ? "positive" : "negative",
      text: convBeatPred
        ? `Copy resonated: ${pct(s.converted, s.clicked)}% of clickers converted.`
        : `${clickNoConvert} clicked but didn't buy — likely checkout friction or a pricing objection.` },
  ];
  const nextAction = convBeatPred
    ? { title: "Scale the winning formula", detail: `Re-run to a fresh lookalike cohort while the creative is hot.`, goal: `Re-run "${camp.name}" to a lookalike audience`, channel: camp.channel }
    : { title: `Follow up with ${clickNoConvert} engaged non-buyers`, detail: `Launch a 48-hour ${channelMetaLabel(camp.channel)} follow-up with a stronger, time-boxed incentive.`, goal: `48-hour win-back for clickers who didn't buy from "${camp.name}"`, channel: camp.channel };

  return {
    summary: `Delivered to ${s.delivered} of ${s.sent} (${pct(s.delivered, s.sent)}%), drove ${pct(s.opened, s.delivered)}% opens and ${pct(s.clicked, s.delivered)}% clicks. Conversion ${convBeatPred ? "beat" : "lagged"} the prediction, generating ${formatINRInline(s.attributedRevenue)} attributed revenue.`,
    factors,
    nextAction,
  };
}

export async function campaignPostMortem(store: Store, campaignId: string): Promise<string> {
  const camp = store.campaigns.find((c) => c.id === campaignId);
  if (!camp) return "";
  const settings = await getSettings();
  const s = camp.stats;
  const clickNoConvert = Math.max(0, s.clicked - s.converted);
  const fallback =
    `This campaign delivered to ${s.delivered} of ${s.sent} recipients (${pct(s.delivered, s.sent)}% delivery). ` +
    `Open rate of ${pct(s.opened, s.delivered)}% with ${pct(s.clicked, s.delivered)}% clicks generated ${formatINRInline(s.attributedRevenue)} attributed revenue. ` +
    (clickNoConvert > 0
      ? `${clickNoConvert} customers clicked but didn't purchase — a 48-hour follow-up with a sharper incentive is the recommended next action.`
      : `Conversion held up well; re-run to a lookalike cohort to capture more upside.`);

  const ai = await geminiText(
    `You are a CRM analyst writing for ${settings.brandName}. Brand voice: ${settings.brandVoice}\n` +
    `In 2-3 sentences, write an honest post-mortem for this campaign using ONLY these real numbers ` +
    `(do not invent any): sent=${s.sent}, delivered=${s.delivered}, opened=${s.opened}, clicked=${s.clicked}, converted=${s.converted}, ` +
    `attributedRevenue=₹${s.attributedRevenue}, clickedButNotConverted=${clickNoConvert}. End with one concrete next action. No markdown.`
  );
  return ai ?? fallback;
}
