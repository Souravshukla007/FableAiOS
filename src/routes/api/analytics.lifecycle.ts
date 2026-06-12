import { createFileRoute } from "@tanstack/react-router";
import { lifecycleDistribution } from "@/lib/server/analytics.server";

// GET /api/analytics/lifecycle -> { stage, count }[]
export const Route = createFileRoute("/api/analytics/lifecycle")({
  server: { handlers: { GET: async () => Response.json(await lifecycleDistribution()) } },
});
