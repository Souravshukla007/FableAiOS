import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/db.server";

// DELETE /api/segments/:id
//   200 { ok: true }              -> deleted
//   404 { error }                 -> no such segment
//   409 { error, campaignCount }  -> blocked: segment is used by campaigns
//
// Guarded delete: we refuse to remove a segment that any campaign references,
// because Campaign.segmentId is ON DELETE RESTRICT and campaigns carry the
// delivery/analytics history we never want to cascade away.
export const Route = createFileRoute("/api/segments/$id")({
  server: {
    handlers: {
      DELETE: async ({ params }) => {
        const seg = await prisma.segment.findUnique({ where: { id: params.id } });
        if (!seg) {
          return Response.json({ error: "Segment not found" }, { status: 404 });
        }

        const campaignCount = await prisma.campaign.count({
          where: { segmentId: params.id },
        });
        if (campaignCount > 0) {
          return Response.json(
            { error: "Segment is used by one or more campaigns", campaignCount },
            { status: 409 }
          );
        }

        await prisma.segment.delete({ where: { id: params.id } });
        return Response.json({ ok: true });
      },
    },
  },
});
