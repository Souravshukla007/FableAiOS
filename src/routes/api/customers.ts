import { createFileRoute } from "@tanstack/react-router";
import { loadStore } from "@/lib/server/store.server";

// GET /api/customers -> Customer[]
export const Route = createFileRoute("/api/customers")({
  server: {
    handlers: {
      GET: async () => {
        const store = await loadStore();
        return Response.json(store.customers);
      },
    },
  },
});
