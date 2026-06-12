import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";

// GET /api/customers/:id -> Customer | 404
export const Route = createFileRoute("/api/customers/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const customer = store.customers.find((c) => c.id === params.id);
        if (!customer) return Response.json({ error: "Not found" }, { status: 404 });
        return Response.json(customer);
      },
    },
  },
});
