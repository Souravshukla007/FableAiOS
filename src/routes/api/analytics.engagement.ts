import { createFileRoute } from "@tanstack/react-router";
import { engagementTrend } from "@/lib/server/analytics.server";

// GET /api/analytics/engagement -> { day, open, click, conversion }[]
export const Route = createFileRoute("/api/analytics/engagement")({
  server: { handlers: { GET: async () => Response.json(await engagementTrend()) } },
});
