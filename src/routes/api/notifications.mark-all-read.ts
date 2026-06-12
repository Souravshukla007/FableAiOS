import { createFileRoute } from "@tanstack/react-router";
import { markAllNotificationsRead } from "@/lib/server/notifications.server";

// POST /api/notifications/mark-all-read -> { updated: number }
export const Route = createFileRoute("/api/notifications/mark-all-read")({
  server: {
    handlers: {
      POST: async () => Response.json(await markAllNotificationsRead()),
    },
  },
});
