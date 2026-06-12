// Server-only: persistent notification inbox.
// All producers go through `createNotification`. The `dedupeWindowMs` option
// suppresses duplicate inserts for the same (kind, entityId) within the window
// — used by the AI-suggestion producer so the bell isn't spammed by every
// dashboard poll.

import { prisma } from "@/lib/db.server";
import type {
  Notification,
  NotificationKind,
  NotificationSeverity,
} from "@/lib/types";

interface NotificationRow {
  id: string;
  kind: string;
  severity: string;
  title: string;
  body: string | null;
  link: string | null;
  entityType: string | null;
  entityId: string | null;
  readAt: Date | null;
  createdAt: Date;
}

export interface CreateNotificationInput {
  kind: NotificationKind;
  severity?: NotificationSeverity;
  title: string;
  body?: string | null;
  link?: string | null;
  entityType?: string | null;
  entityId?: string | null;
  /** If set, suppress this insert when an equal (kind, entityId) row exists newer than now - dedupeWindowMs. */
  dedupeWindowMs?: number;
}

function toNotification(row: NotificationRow): Notification {
  return {
    id: row.id,
    kind: row.kind as NotificationKind,
    severity: row.severity as NotificationSeverity,
    title: row.title,
    body: row.body,
    link: row.link,
    entityType: row.entityType,
    entityId: row.entityId,
    readAt: row.readAt ? row.readAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function createNotification(
  input: CreateNotificationInput,
): Promise<Notification | null> {
  if (input.entityId && input.dedupeWindowMs && input.dedupeWindowMs > 0) {
    const since = new Date(Date.now() - input.dedupeWindowMs);
    const exists = await prisma.notification.findFirst({
      where: {
        kind: input.kind,
        entityId: input.entityId,
        createdAt: { gte: since },
      },
      select: { id: true },
    });
    if (exists) return null;
  }
  const row = await prisma.notification.create({
    data: {
      kind: input.kind,
      severity: input.severity ?? "INFO",
      title: input.title,
      body: input.body ?? null,
      link: input.link ?? null,
      entityType: input.entityType ?? null,
      entityId: input.entityId ?? null,
    },
  });
  return toNotification(row);
}

export async function listNotifications(
  opts: { limit?: number; unreadOnly?: boolean } = {},
): Promise<Notification[]> {
  const limit = Math.min(Math.max(opts.limit ?? 30, 1), 100);
  const rows = await prisma.notification.findMany({
    where: opts.unreadOnly ? { readAt: null } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toNotification);
}

export async function markNotificationRead(
  id: string,
): Promise<Notification | null> {
  try {
    const row = await prisma.notification.update({
      where: { id },
      data: { readAt: new Date() },
    });
    return toNotification(row);
  } catch {
    return null;
  }
}

export async function markAllNotificationsRead(): Promise<{ updated: number }> {
  const r = await prisma.notification.updateMany({
    where: { readAt: null },
    data: { readAt: new Date() },
  });
  return { updated: r.count };
}
