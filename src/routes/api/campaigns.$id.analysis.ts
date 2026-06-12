import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import { campaignAnalysis } from "@/lib/server/ai.server";

// GET /api/campaigns/:id/analysis -> CampaignAnalysis | null
export const Route = createFileRoute("/api/campaigns/$id/analysis")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        return Response.json(campaignAnalysis(store, params.id));
      },
    },
  },
});
