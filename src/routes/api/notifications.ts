import { createFileRoute } from "@tanstack/react-router";
import { listNotifications } from "@/lib/server/notifications.server";

// GET /api/notifications?unread=true&limit=30 -> Notification[]
export const Route = createFileRoute("/api/notifications")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const unreadOnly = url.searchParams.get("unread") === "true";
        const limitRaw = url.searchParams.get("limit");
        const limit = limitRaw ? Number(limitRaw) : undefined;
        const items = await listNotifications({
          unreadOnly,
          limit: Number.isFinite(limit) ? limit : undefined,
        });
        return Response.json(items);
      },
    },
  },
});
