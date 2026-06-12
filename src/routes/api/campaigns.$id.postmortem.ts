import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import { campaignPostMortem } from "@/lib/server/ai.server";

// GET /api/campaigns/:id/postmortem -> string (grounded narration, Gemini-phrased)
export const Route = createFileRoute("/api/campaigns/$id/postmortem")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        return Response.json(await campaignPostMortem(store, params.id));
      },
    },
  },
});
