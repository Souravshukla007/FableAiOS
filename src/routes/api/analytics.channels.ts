import { createFileRoute } from "@tanstack/react-router";
import { channelComparison } from "@/lib/server/analytics.server";

// GET /api/analytics/channels -> per-channel sent/delivered/opened/clicked/revenue
export const Route = createFileRoute("/api/analytics/channels")({
  server: { handlers: { GET: async () => Response.json(await channelComparison()) } },
});
