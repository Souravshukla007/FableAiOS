import { useRouterState } from "@tanstack/react-router";
import { SidebarNav } from "./SidebarNav";

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <img src="/brand-icon.png" alt="" aria-hidden="true" draggable={false} className="h-5 w-5 object-contain" />
        </div>
        <div className="text-sm font-semibold text-white">FableAiOS</div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
        <SidebarNav pathname={pathname} />
      </nav>
    </aside>
  );
}
