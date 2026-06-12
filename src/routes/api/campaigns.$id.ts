import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";

// GET /api/campaigns/:id -> Campaign (stats derived from events) | 404
export const Route = createFileRoute("/api/campaigns/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const campaign = store.campaigns.find((c) => c.id === params.id);
        if (!campaign) return Response.json({ error: "Not found" }, { status: 404 });
        return Response.json(campaign);
      },
    },
  },
});
