import { createFileRoute } from "@tanstack/react-router";
import { channelComparison } from "@/lib/server/analytics.server";

const ALLOWED = new Set([7, 30, 90]);
function parseDays(request: Request): number | undefined {
  const raw = new URL(request.url).searchParams.get("days");
  const n = raw ? Number(raw) : NaN;
  return ALLOWED.has(n) ? n : undefined;
}

// GET /api/analytics/channels?days=7|30|90
//   -> per-channel sent/delivered/opened/clicked/revenue within the window
//      (all-time when days is omitted/invalid)
export const Route = createFileRoute("/api/analytics/channels")({
  server: {
    handlers: {
      GET: async ({ request }) => Response.json(await channelComparison(parseDays(request))),
    },
  },
});
