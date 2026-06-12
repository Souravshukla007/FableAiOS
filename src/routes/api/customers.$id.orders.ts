import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";

// GET /api/customers/:id/orders -> Order[] (newest first)
export const Route = createFileRoute("/api/customers/$id/orders")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const orders = store.orders
          .filter((o) => o.customerId === params.id)
          .sort((a, b) => +new Date(b.placedAt) - +new Date(a.placedAt));
        return Response.json(orders);
      },
    },
  },
});
