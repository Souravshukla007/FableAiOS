import { createFileRoute } from "@tanstack/react-router";
import { launchCampaign } from "@/lib/server/launch.server";

// POST /api/campaigns/:id/launch -> { campaignId, queued, dispatched }
// Creates queued Communication rows and dispatches a batch to the Channel
// Service, which then calls back asynchronously into /api/receipts.
export const Route = createFileRoute("/api/campaigns/$id/launch")({
  server: {
    handlers: {
      POST: async ({ params }) => {
        try {
          const result = await launchCampaign(params.id);
          return Response.json(result, { status: 202 });
        } catch (e) {
          return Response.json({ error: (e as Error).message }, { status: 400 });
        }
      },
    },
  },
});
