import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import { resolveAudience, buildExplanation } from "@/lib/server/compute";

// POST /api/ai/explain  Body { segmentId?, rules?, combinator? } -> AudienceExplanation
// Aggregates the live Postgres dataset — the AI does language, the DB does facts.
export const Route = createFileRoute("/api/ai/explain")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const store = await loadStore();
        const audience = resolveAudience(store, {
          segmentId: body?.segmentId,
          rules: body?.rules,
          combinator: body?.combinator,
        });
        const segName = body?.segmentId
          ? store.segments.find((s) => s.id === body.segmentId)?.name
          : undefined;
        return Response.json(buildExplanation(store, audience, { segmentId: body?.segmentId, segName }));
      },
    },
  },
});
