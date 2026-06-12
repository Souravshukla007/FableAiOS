import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, isNavItemActive } from "./nav-items";

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">Fable</div>
          <div className="text-[10px] text-sidebar-foreground/60">AI Marketing Command</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(pathname, item.to, item.exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
              {item.label === "Jarvis" && !active && (
                <span className="ml-auto rounded bg-sidebar-primary/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-sidebar-primary-foreground">
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent">
          <img
            src="/kargil.jpg"
            alt="Sourav SB"
            className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-sidebar-border"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium text-white">Sourav SB</div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
