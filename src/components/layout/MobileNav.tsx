import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SidebarNav } from "./SidebarNav";

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
            <img src="/brand-icon.png" alt="" aria-hidden="true" draggable={false} className="h-5 w-5 object-contain" />
          </div>
          <SheetTitle className="text-sm font-semibold text-white">FableAiOS</SheetTitle>
          <SheetDescription className="sr-only">Primary navigation</SheetDescription>
        </SheetHeader>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
          <SidebarNav
            pathname={pathname}
            onNavigate={() => setOpen(false)}
            itemPaddingClass="py-2.5"
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
