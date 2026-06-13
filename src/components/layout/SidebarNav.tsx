import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NAV_SECTIONS, isNavItemActive, type NavSection } from "./nav-items";

type SidebarNavProps = {
  pathname: string;
  // Mobile drawer passes this to close the sheet on navigation.
  onNavigate?: () => void;
  // Desktop uses py-2, the roomier mobile drawer uses py-2.5.
  itemPaddingClass?: string;
};

// Grouped, collapsible primary navigation shared by AppSidebar (desktop) and
// MobileNav (drawer). Sections default to expanded.
export function SidebarNav({ pathname, onNavigate, itemPaddingClass = "py-2" }: SidebarNavProps) {
  return (
    <>
      {NAV_SECTIONS.map((section) => (
        <NavSectionGroup
          key={section.heading}
          section={section}
          pathname={pathname}
          onNavigate={onNavigate}
          itemPaddingClass={itemPaddingClass}
        />
      ))}
    </>
  );
}

function NavSectionGroup({
  section,
  pathname,
  onNavigate,
  itemPaddingClass,
}: {
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
  itemPaddingClass: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="pt-3 first:pt-0">
      <CollapsibleTrigger
        className={cn(
          "group flex w-full items-center gap-1.5 rounded-md px-3 py-1.5",
          "text-[10px] font-semibold uppercase tracking-wider",
          "text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground/80",
        )}
      >
        <ChevronDown
          className={cn("h-3 w-3 transition-transform duration-200", !open && "-rotate-90")}
        />
        {section.heading}
      </CollapsibleTrigger>

      <CollapsibleContent className="nav-collapsible-content">
        <div className="mt-1 space-y-1">
          {section.items.map((item) => {
            const active = isNavItemActive(pathname, item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                  itemPaddingClass,
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
