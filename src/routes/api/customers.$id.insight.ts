import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";
import { customerInsight } from "@/lib/server/compute";

// GET /api/customers/:id/insight -> string
export const Route = createFileRoute("/api/customers/$id/insight")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const customer = store.customers.find((c) => c.id === params.id);
        return Response.json(customer ? customerInsight(customer) : "");
      },
    },
  },
});
