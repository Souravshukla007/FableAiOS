import { createFileRoute } from "@tanstack/react-router";
import { dashboardKPIs } from "@/lib/server/analytics.server";

// GET /api/analytics/overview -> DashboardKPIs
export const Route = createFileRoute("/api/analytics/overview")({
  server: { handlers: { GET: async () => Response.json(await dashboardKPIs()) } },
});
