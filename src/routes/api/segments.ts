import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "@/lib/db.server";
import { loadStore } from "@/lib/server/store.server";
import { countByRules } from "@/lib/server/compute";
import type { Segment } from "@/lib/types";

// GET  /api/segments        -> Segment[]
// POST /api/segments        -> create a segment (manual or AI), returns Segment
export const Route = createFileRoute("/api/segments")({
  server: {
    handlers: {
      GET: async () => {
        const store = await loadStore();
        return Response.json(store.segments);
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const store = await loadStore();
        const rules = Array.isArray(body?.rules) ? body.rules : [];
        const combinator = body?.combinator === "OR" ? "OR" : "AND";
        // customerCount: trust client value if given, else compute from rules.
        const customerCount =
          typeof body?.customerCount === "number"
            ? body.customerCount
            : rules.length
              ? countByRules(store, rules, combinator)
              : 0;

        const created = await prisma.segment.create({
          data: {
            name: body?.name ?? "Untitled Segment",
            description: body?.description ?? "",
            rulesText: body?.rulesText ?? "",
            rulesJson: rules.length ? { op: combinator, conditions: rules } : { op: "AND", conditions: [] },
            customerCount,
            createdBy: body?.createdBy === "ai" ? "ai" : "marketer",
            aiReason: body?.aiReason ?? null,
          },
        });

        const out: Segment = {
          id: created.id,
          name: created.name,
          description: created.description ?? "",
          rulesText: created.rulesText ?? "",
          customerCount: created.customerCount,
          createdBy: created.createdBy as Segment["createdBy"],
          createdAt: created.createdAt.toISOString(),
          aiReason: created.aiReason ?? undefined,
        };
        return Response.json(out, { status: 201 });
      },
    },
  },
});
