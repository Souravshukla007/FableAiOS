import {
  LayoutDashboard,
  Users,
  Layers,
  Send,
  Sparkles,
  BarChart3,
  Radio,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

// Single source of truth for primary navigation, shared by the desktop
// sidebar and the mobile slide-in drawer so they never drift apart.
export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/segments", label: "Segments", icon: Layers },
  { to: "/campaigns", label: "Campaigns", icon: Send },
  { to: "/jarvis", label: "Jarvis", icon: Sparkles },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/channel", label: "Channel Monitor", icon: Radio },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function isNavItemActive(pathname: string, to: string, exact?: boolean): boolean {
  return exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
}
