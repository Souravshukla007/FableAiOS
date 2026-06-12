import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import { countByRules } from "@/lib/server/compute";

// POST /api/segments/preview  Body { rules, combinator } -> number (live count)
export const Route = createFileRoute("/api/segments/preview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const rules = Array.isArray(body?.rules) ? body.rules : [];
        const combinator = body?.combinator === "OR" ? "OR" : "AND";
        const store = await loadStore();
        return Response.json(countByRules(store, rules, combinator));
      },
    },
  },
});
