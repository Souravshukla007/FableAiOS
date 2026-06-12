import { createFileRoute } from "@tanstack/react-router";
import { proactiveSuggestions } from "@/lib/server/analytics.server";

// GET /api/analytics/suggestions -> proactive suggestions grounded in lifecycle counts
export const Route = createFileRoute("/api/analytics/suggestions")({
  server: { handlers: { GET: async () => Response.json(await proactiveSuggestions()) } },
});
