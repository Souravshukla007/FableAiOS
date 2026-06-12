import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { prisma } from "@/lib/db.server";
import { createNotification } from "@/lib/server/notifications.server";
import type { CommStatus } from "@/lib/types";

// POST /api/receipts — the asynchronous callback sink from the Channel Service.
//
// This handler is the core system-design surface. It is:
//   • IDEMPOTENT      — a unique (communicationId, status, attempt) means
//                       duplicate callbacks are no-ops.
//   • ORDERING-SAFE   — Communication.status is DERIVED from the max-rank of all
//                       stored events, so out-of-order callbacks never regress it.
//   • ATTRIBUTION-AWARE — `converted` callbacks carry attributedAmount.

const RANK: Record<CommStatus, number> = {
  queued: 0, sent: 1, delivered: 2, opened: 3, read: 4, clicked: 5, converted: 6, failed: 1,
};

const ReceiptSchema = z.object({
  communicationId: z.string().min(1),
  status: z.enum(["queued", "sent", "delivered", "failed", "opened", "read", "clicked", "converted"]),
  at: z.string().datetime().optional(),
  attempt: z.number().int().positive().optional(),
  meta: z.object({ reason: z.string().optional(), attributedAmount: z.number().optional() }).optional(),
});

type Receipt = z.infer<typeof ReceiptSchema>;

// Derive Communication.status from its events without ever regressing.
function deriveStatus(events: { status: CommStatus; attempt: number; occurredAt: Date }[]) {
  let status: CommStatus = "queued";
  const successful = events.filter((e) => e.status !== "failed");
  const topSuccess = successful.reduce<CommStatus | null>(
    (acc, e) => (acc === null || RANK[e.status] > RANK[acc] ? e.status : acc), null);
  if (topSuccess && RANK[topSuccess] >= 2) status = topSuccess;        // delivered or beyond wins
  else if (events.some((e) => e.status === "failed")) status = "failed"; // terminal failure
  else if (topSuccess) status = topSuccess;                             // sent
  const retries = events.reduce((m, e) => Math.max(m, e.attempt), 1) - 1;
  const lastEventAt = events.reduce<Date>((m, e) => (e.occurredAt > m ? e.occurredAt : m), events[0]?.occurredAt ?? new Date());
  return { status, retries: Math.max(0, retries), lastEventAt };
}

async function processOne(r: Receipt): Promise<{ ok: boolean; reason?: string }> {
  const comm = await prisma.communication.findUnique({ where: { id: r.communicationId } });
  if (!comm) return { ok: false, reason: "unknown communicationId" };

  const attempt = r.attempt ?? 1;
  const occurredAt = r.at ? new Date(r.at) : new Date();

  // Idempotent insert: unique (communicationId, status, attempt). A duplicate
  // callback hits the unique constraint and is silently ignored.
  try {
    await prisma.communicationEvent.create({
      data: {
        communicationId: r.communicationId,
        status: r.status,
        attempt,
        attributedAmount: r.meta?.attributedAmount ?? null,
        occurredAt,
      },
    });
  } catch (e: unknown) {
    const code = (e as { code?: string })?.code;
    if (code !== "P2002") throw e; // P2002 = duplicate → idempotent no-op
  }

  // Recompute derived status from the full (possibly out-of-order) event set.
  const events = await prisma.communicationEvent.findMany({
    where: { communicationId: r.communicationId },
    select: { status: true, attempt: true, occurredAt: true },
  });
  const derived = deriveStatus(events as { status: CommStatus; attempt: number; occurredAt: Date }[]);
  await prisma.communication.update({
    where: { id: r.communicationId },
    data: { status: derived.status, retries: derived.retries, lastEventAt: derived.lastEventAt },
  });

  // Auto-complete the campaign once delivery has resolved for every comm
  // (none still queued/sent). Engagement events may continue to arrive after;
  // stats are derived from events at read time, so they still count.
  const inFlight = await prisma.communication.count({
    where: { campaignId: comm.campaignId, status: { in: ["queued", "sent"] } },
  });
  if (inFlight === 0) {
    // Atomic transition guard: only the request that actually flips
    // sending -> completed (count > 0) emits the notification, so duplicate
    // late callbacks don't produce duplicate inbox entries.
    const transition = await prisma.campaign.updateMany({
      where: { id: comm.campaignId, status: "sending" },
      data: { status: "completed" },
    });
    if (transition.count > 0) {
      const [campaign, deliveredCount, failedCount, totalCount] = await Promise.all([
        prisma.campaign.findUnique({ where: { id: comm.campaignId } }),
        prisma.communication.count({
          where: {
            campaignId: comm.campaignId,
            status: { in: ["delivered", "opened", "read", "clicked", "converted"] },
          },
        }),
        prisma.communication.count({
          where: { campaignId: comm.campaignId, status: "failed" },
        }),
        prisma.communication.count({ where: { campaignId: comm.campaignId } }),
      ]);
      if (campaign) {
        const allFailed = totalCount > 0 && failedCount === totalCount;
        if (allFailed) {
          await prisma.campaign.update({
            where: { id: campaign.id },
            data: { status: "failed" },
          });
        }
        await createNotification({
          kind: allFailed ? "CAMPAIGN_FAILED" : "CAMPAIGN_DELIVERED",
          severity: allFailed ? "ERROR" : failedCount > 0 ? "WARN" : "SUCCESS",
          title: allFailed ? "Campaign failed" : "Campaign delivered",
          body: allFailed
            ? `${campaign.name}: all ${totalCount} sends failed.`
            : `${campaign.name}: ${deliveredCount}/${totalCount} delivered${failedCount > 0 ? `, ${failedCount} failed` : ""}.`,
          link: `/campaigns/${campaign.id}`,
          entityType: "campaign",
          entityId: campaign.id,
        }).catch((e) => {
          console.error("[receipts] notification create failed:", (e as Error).message);
          return null;
        });
      }
    }
  }
  return { ok: true };
}

export const Route = createFileRoute("/api/receipts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.json().catch(() => null);
        if (raw === null) return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });

        // Accept a single receipt or a batch.
        const items = Array.isArray(raw) ? raw : [raw];
        const parsed = z.array(ReceiptSchema).safeParse(items);
        if (!parsed.success) {
          return Response.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
        }

        const results = [];
        for (const r of parsed.data) results.push(await processOne(r));
        const accepted = results.filter((x) => x.ok).length;
        return Response.json({ ok: true, accepted, total: results.length, results });
      },
    },
  },
});
