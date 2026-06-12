import { createFileRoute } from "@tanstack/react-router";
import { engagementTrend } from "@/lib/server/analytics.server";

const ALLOWED = new Set([7, 30, 90]);
function parseDays(request: Request): number {
  const raw = new URL(request.url).searchParams.get("days");
  const n = raw ? Number(raw) : NaN;
  return ALLOWED.has(n) ? n : 14;
}

// GET /api/analytics/engagement?days=7|30|90
//   -> { day, open, click, conversion }[] bucketed per day over the window
//      (defaults to 14 days when omitted/invalid)
export const Route = createFileRoute("/api/analytics/engagement")({
  server: {
    handlers: {
      GET: async ({ request }) => Response.json(await engagementTrend(parseDays(request))),
    },
  },
});
