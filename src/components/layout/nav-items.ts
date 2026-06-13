import {
  LayoutDashboard,
  Users,
  Layers,
  Send,
  BarChart3,
  Radio,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { JarvisIcon } from "@/components/shared/JarvisIcon";

export type NavItem = {
  to: string;
  label: string;
  // Accepts lucide icons and any component that takes a className (e.g. our
  // <img>-based JarvisIcon), so both render the same way in the nav.
  icon: LucideIcon | ComponentType<{ className?: string }>;
  exact?: boolean;
};

export type NavSection = {
  heading: string;
  items: NavItem[];
};

// Single source of truth for primary navigation, grouped into collapsible
// sections (Stackwise-style). Shared by the desktop sidebar and the mobile
// slide-in drawer so they never drift apart.
export const NAV_SECTIONS: NavSection[] = [
  {
    heading: "Operations",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { to: "/campaigns", label: "Campaigns", icon: Send },
      { to: "/channel", label: "Channel Monitor", icon: Radio },
    ],
  },
  {
    heading: "Audience",
    items: [
      { to: "/customers", label: "Customers", icon: Users },
      { to: "/segments", label: "Segments", icon: Layers },
    ],
  },
  {
    heading: "Intelligence",
    items: [
      { to: "/jarvis", label: "Jarvis", icon: JarvisIcon },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    heading: "Admin",
    items: [{ to: "/settings", label: "Settings", icon: Settings }],
  },
];

// Flat list kept for consumers that want every destination regardless of
// grouping (e.g. GlobalSearch).
export const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);

export function isNavItemActive(pathname: string, to: string, exact?: boolean): boolean {
  return exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
}
