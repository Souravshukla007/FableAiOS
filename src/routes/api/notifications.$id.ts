import { createFileRoute } from "@tanstack/react-router";
import { markNotificationRead } from "@/lib/server/notifications.server";

// PATCH /api/notifications/:id -> Notification | 404
// Marks a single notification as read (idempotent).
export const Route = createFileRoute("/api/notifications/$id")({
  server: {
    handlers: {
      PATCH: async ({ params }) => {
        const updated = await markNotificationRead(params.id);
        if (!updated) {
          return Response.json({ error: "Not found" }, { status: 404 });
        }
        return Response.json(updated);
      },
    },
  },
});
