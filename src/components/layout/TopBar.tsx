import { useNavigate } from "@tanstack/react-router";
import { Bell, Moon, Sun, Plus, CheckCheck, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { MobileNav } from "./MobileNav";
import { GlobalSearch } from "./GlobalSearch";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Notification, NotificationSeverity } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Compact relative-time formatter for notification timestamps. Uses fixed
// integer thresholds rather than Intl.RelativeTimeFormat to keep the badge
// label stable across locales.
function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 0) return "just now";
  const s = Math.floor(ms / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7);
  return `${w}w ago`;
}

const severityDot: Record<NotificationSeverity, string> = {
  INFO: "bg-primary",
  SUCCESS: "bg-emerald-500",
  WARN: "bg-amber-500",
  ERROR: "bg-rose-500",
};

export function TopBar() {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.listNotifications({ limit: 12 }),
    refetchInterval: 30_000,
    staleTime: 15_000,
  });

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  const markRead = useMutation({
    mutationFn: (id: string) => api.markNotificationRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const markAllRead = useMutation({
    mutationFn: () => api.markAllNotificationsRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  function onActivate(n: Notification) {
    if (!n.readAt) markRead.mutate(n.id);
    if (n.link) {
      // Notification links are server-generated relative paths (e.g. /campaigns/abc).
      // The router's typed `to` doesn't accept arbitrary strings, hence the cast.
      navigate({ to: n.link as never });
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <MobileNav />

      <GlobalSearch />

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          onClick={() => navigate({ to: "/campaigns/new" })}
          className="gap-1.5 font-medium"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Campaign</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                unreadCount > 0
                  ? `Notifications, ${unreadCount} unread`
                  : "Notifications"
              }
              className="relative"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground"
                  aria-hidden="true"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96 p-0">
            <div className="flex items-center justify-between gap-2 px-3 pb-1 pt-2">
              <DropdownMenuLabel className="px-0">Notifications</DropdownMenuLabel>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 text-xs"
                  onClick={() => markAllRead.mutate()}
                  disabled={markAllRead.isPending}
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="px-3 py-8 text-center text-xs text-muted-foreground">
                You're all caught up.
              </div>
            ) : (
              <div className="max-h-[28rem] overflow-y-auto py-1">
                {notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    onSelect={(e) => {
                      e.preventDefault();
                      onActivate(n);
                    }}
                    className={cn(
                      "flex items-start gap-2.5 px-3 py-2",
                      !n.readAt && "bg-accent/40",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        n.readAt
                          ? "bg-muted-foreground/30"
                          : severityDot[n.severity],
                      )}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-sm font-medium">
                          {n.title}
                        </span>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {relativeTime(n.createdAt)}
                        </span>
                      </div>
                      {n.body && (
                        <p className="line-clamp-2 whitespace-normal text-xs text-muted-foreground">
                          {n.body}
                        </p>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="ml-1 h-9 gap-2 px-2 sm:pl-1.5 sm:pr-2"
              aria-label="Account menu"
            >
              <img
                src="/kargil.jpg"
                alt=""
                aria-hidden="true"
                className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-border"
              />
              <span className="hidden text-sm font-medium leading-tight sm:inline">
                Sourav SB
              </span>
              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2.5 px-2 py-2">
              <img
                src="/kargil.jpg"
                alt=""
                aria-hidden="true"
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-border"
              />
              <div className="min-w-0 leading-tight">
                <div className="truncate text-sm font-medium">Sourav SB</div>
                <div className="truncate text-[11px] text-muted-foreground">
                  Administrator
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate({ to: "/settings" })}>
              <UserIcon className="mr-2 h-4 w-4" />
              Profile &amp; settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
