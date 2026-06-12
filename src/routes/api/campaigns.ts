import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/db.server";
import { loadStore } from "@/lib/server/store.server";
import type { Campaign } from "@/lib/types";

// GET  /api/campaigns  -> Campaign[] (with stats derived from the event spine)
// POST /api/campaigns  -> create a draft/scheduled campaign
export const Route = createFileRoute("/api/campaigns")({
  server: {
    handlers: {
      GET: async () => {
        const store = await loadStore();
        return Response.json(store.campaigns);
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const segmentId: string = body?.segmentId;
        if (!segmentId) return Response.json({ error: "segmentId required" }, { status: 400 });

        const created = await prisma.campaign.create({
          data: {
            name: body?.name ?? body?.goal ?? "New Campaign",
            goal: body?.goal ?? "",
            segmentId,
            channel: body?.channel ?? "whatsapp",
            message: body?.message ?? "",
            status: body?.status ?? "draft",
            audienceSize: typeof body?.audienceSize === "number" ? body.audienceSize : 0,
            predictionJson: body?.prediction ?? null,
          },
        });

        const out: Campaign = {
          id: created.id,
          name: created.name,
          goal: created.goal ?? "",
          segmentId: created.segmentId,
          channel: created.channel as Campaign["channel"],
          message: created.message,
          status: created.status as Campaign["status"],
          createdAt: created.createdAt.toISOString(),
          sentAt: created.sentAt ? created.sentAt.toISOString() : undefined,
          audienceSize: created.audienceSize,
          prediction: (created.predictionJson as Campaign["prediction"]) ?? undefined,
          stats: { sent: 0, delivered: 0, failed: 0, opened: 0, read: 0, clicked: 0, converted: 0, attributedRevenue: 0 },
        };
        return Response.json(out, { status: 201 });
      },
    },
  },
});
