import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import { buildCustomerExplanation } from "@/lib/server/compute";

// GET /api/customers/:id/explanation -> AudienceExplanation (per-customer)
export const Route = createFileRoute("/api/customers/$id/explanation")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const customer = store.customers.find((c) => c.id === params.id);
        if (!customer) {
          return Response.json({ audienceSize: 0, summary: "", signals: [], generatedAt: new Date().toISOString() });
        }
        return Response.json(buildCustomerExplanation(store, customer));
      },
    },
  },
});
