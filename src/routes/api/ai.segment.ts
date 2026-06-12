import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import {
  deriveStructuredRules, countByRules, rulesToText, deriveSegmentName,
} from "@/lib/server/compute";

// POST /api/ai/segment  Body { text } -> Segment & { rules, combinator }
// NL -> structured rules; customerCount computed against the live dataset.
export const Route = createFileRoute("/api/ai/segment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const text: string = typeof body?.text === "string" ? body.text : "";
        const { rules, combinator } = deriveStructuredRules(text);
        const store = await loadStore();
        const size = countByRules(store, rules, combinator);

        const seg = {
          id: `seg_ai_${Math.random().toString(36).slice(2, 9)}`,
          name: deriveSegmentName(text),
          description: text.trim(),
          rulesText: rulesToText(rules, combinator),
          rules,
          combinator,
          customerCount: size,
          createdBy: "ai" as const,
          createdAt: new Date().toISOString(),
          aiReason: `Interpreted your description into ${rules.length} rule${rules.length === 1 ? "" : "s"} joined with ${combinator}, matching ${size} customers from the live dataset.`,
        };
        return Response.json(seg);
      },
    },
  },
});
