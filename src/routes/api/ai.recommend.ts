import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import { buildRecommendation } from "@/lib/server/ai.server";

// POST /api/ai/recommend  Body { goal } -> AIRecommendation
// Audience/channel/prediction are grounded in real data; Gemini writes the copy.
export const Route = createFileRoute("/api/ai/recommend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const goal: string = typeof body?.goal === "string" ? body.goal : "";
        const store = await loadStore();
        return Response.json(await buildRecommendation(store, goal));
      },
    },
  },
});
