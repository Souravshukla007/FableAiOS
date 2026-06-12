import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { NAV_ITEMS, isNavItemActive } from "./nav-items";

// Hamburger-triggered navigation drawer for screens below the md breakpoint,
// where the persistent sidebar is hidden. Mirrors the desktop sidebar nav.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <SheetContent
        side="left"
        className="flex w-72 flex-col border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="flex h-16 shrink-0 flex-row items-center gap-2.5 space-y-0 border-b border-sidebar-border px-5 text-left">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <SheetTitle className="text-sm font-semibold text-white">Fable</SheetTitle>
            <SheetDescription className="text-[10px] text-sidebar-foreground/60">
              AI Marketing Command
            </SheetDescription>
          </div>
        </SheetHeader>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(pathname, item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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

        <div className="shrink-0 border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
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
      </SheetContent>
    </Sheet>
  );
}
