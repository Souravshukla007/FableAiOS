// Server-only: campaign launch orchestration.
// Resolves the audience, creates queued Communication rows, and dispatches a
// batch to the SEPARATE Channel Service. The Channel Service then calls back
// asynchronously into /api/receipts for each delivery-lifecycle event.

import process from "node:process";
import { prisma } from "@/lib/db.server";
import { loadStore } from "./store.server";
import { SEGMENT_PREDICATES, customersByRules } from "./compute";
import { createNotification } from "./notifications.server";
import type { Customer, SegmentRule, RuleCombinator } from "@/lib/types";

function channelServiceUrl() {
  return process.env.CHANNEL_SERVICE_URL || "http://localhost:8787";
}
function receiptUrl() {
  return process.env.CRM_RECEIPT_URL || "http://localhost:8080/api/receipts";
}

// Resolve a segment's audience: seeded predicate first, else stored rulesJson.
async function resolveAudienceForSegment(segmentId: string): Promise<Customer[]> {
  const store = await loadStore();
  const pred = SEGMENT_PREDICATES[segmentId];
  if (pred) return store.customers.filter(pred);

  const seg = await prisma.segment.findUnique({ where: { id: segmentId } });
  const rj = seg?.rulesJson as { op?: RuleCombinator; conditions?: SegmentRule[] } | null;
  if (rj?.conditions?.length) {
    return customersByRules(store, rj.conditions, rj.op === "OR" ? "OR" : "AND");
  }
  return [];
}

export interface LaunchResult {
  campaignId: string;
  queued: number;
  dispatched: number;
}

export async function launchCampaign(campaignId: string): Promise<LaunchResult> {
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new Error("campaign not found");

  const audience = await resolveAudienceForSegment(campaign.segmentId);

  // Create queued Communication rows (self-generated ids so we can batch-send).
  const stamp = Date.now().toString(36);
  const commRows = audience.map((c, i) => ({
    id: `comm_${campaignId}_${stamp}_${i}`,
    campaignId,
    customerId: c.id,
    channel: campaign.channel,
    status: "queued" as const,
  }));

  await prisma.campaign.update({
    where: { id: campaignId },
    data: { status: "sending", sentAt: new Date(), audienceSize: commRows.length },
  });
  if (commRows.length) await prisma.communication.createMany({ data: commRows });

  // Build the send batch for the Channel Service.
  const custById = new Map(audience.map((c) => [c.id, c]));
  const batch = commRows.map((cm) => {
    const cust = custById.get(cm.customerId)!;
    return {
      communicationId: cm.id,
      recipient: { name: cust.name, email: cust.email, phone: cust.phone },
      channel: campaign.channel,
      message: campaign.message,
      callbackUrl: receiptUrl(),
    };
  });

  let dispatched = 0;
  if (batch.length) {
    try {
      const res = await fetch(`${channelServiceUrl()}/send/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch),
      });
      const json = await res.json().catch(() => ({}));
      dispatched = typeof json?.accepted === "number" ? json.accepted : batch.length;
    } catch (e) {
      // Channel Service unreachable: comms remain queued, campaign stays sending.
      console.error("[launch] channel service dispatch failed:", (e as Error).message);
    }
  }

  // Producer: campaign-launched notification. Don't fail the launch if this throws.
  await createNotification({
    kind: "CAMPAIGN_LAUNCHED",
    severity: "INFO",
    title: "Campaign launched",
    body: `${campaign.name} dispatched to ${commRows.length} customer${commRows.length === 1 ? "" : "s"} via ${campaign.channel}.`,
    link: `/campaigns/${campaignId}`,
    entityType: "campaign",
    entityId: campaignId,
  }).catch((e) => {
    console.error("[launch] notification create failed:", (e as Error).message);
    return null;
  });

  return { campaignId, queued: commRows.length, dispatched };
}
