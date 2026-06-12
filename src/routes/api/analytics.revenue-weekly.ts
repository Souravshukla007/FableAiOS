import { createFileRoute } from "@tanstack/react-router";
import { revenueByWeek } from "@/lib/server/analytics.server";

// GET /api/analytics/revenue-weekly -> { week, revenue }[]
export const Route = createFileRoute("/api/analytics/revenue-weekly")({
  server: { handlers: { GET: async () => Response.json(await revenueByWeek()) } },
});
