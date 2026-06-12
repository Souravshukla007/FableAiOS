import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";

// GET /api/communications -> Communication[] (with derived timelines)
// Powers the Channel Monitor. Optional ?campaignId= filter.
export const Route = createFileRoute("/api/communications")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const campaignId = url.searchParams.get("campaignId");
        const store = await loadStore();
        const data = campaignId
          ? store.communications.filter((c) => c.campaignId === campaignId)
          : store.communications;
        return Response.json(data);
      },
    },
  },
});
