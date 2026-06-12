import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { u as useTheme } from "./router-bYr-bjNA.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, b as Close, a as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { R as Root2, T as Trigger$1, P as Portal2, C as Content2, L as Label2, S as Separator2, I as Item2, a as SubTrigger2, b as SubContent2, c as CheckboxItem2, d as ItemIndicator2, e as RadioItem2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { E as MessageSquareText, F as Mail, J as Smartphone, K as MessageCircle, N as BookOpen, O as LayoutDashboard, U as Users, b as Layers, e as Send, a as Sparkles, Q as ChartColumn, V as Radio, Y as Settings, P as Plus, Z as Sun, _ as Moon, $ as Bell, a0 as CheckCheck, X, a1 as Menu, i as Search, s as ChevronRight, n as Check, a2 as Circle } from "../_libs/lucide-react.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/segments", label: "Segments", icon: Layers },
  { to: "/campaigns", label: "Campaigns", icon: Send },
  { to: "/jarvis", label: "Jarvis", icon: Sparkles },
  { to: "/analytics", label: "Analytics", icon: ChartColumn },
  { to: "/channel", label: "Channel Monitor", icon: Radio },
  { to: "/settings", label: "Settings", icon: Settings }
];
function isNavItemActive(pathname, to, exact) {
  return exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
}
function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white", children: "Fable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-sidebar-foreground/60", children: "AI Marketing Command" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin", children: NAV_ITEMS.map((item) => {
      const active = isNavItemActive(pathname, item.to, item.exact);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4 shrink-0" }),
            item.label,
            item.label === "Jarvis" && !active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto rounded bg-sidebar-primary/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-sidebar-primary-foreground", children: "AI" })
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-sidebar-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/kargil.jpg",
          alt: "Sourav SB",
          className: "h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-sidebar-border"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium text-white", children: "Sourav SB" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-sidebar-foreground/60", children: "Administrator" })
      ] })
    ] }) })
  ] });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function MobileNav() {
  const [open, setOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "md:hidden",
        "aria-label": "Open navigation menu",
        onClick: () => setOpen(true),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "left",
        className: "flex w-72 flex-col border-sidebar-border bg-sidebar p-0 text-sidebar-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "flex h-16 shrink-0 flex-row items-center gap-2.5 space-y-0 border-b border-sidebar-border px-5 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-sm font-semibold text-white", children: "Fable" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: "text-[10px] text-sidebar-foreground/60", children: "AI Marketing Command" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "min-h-0 flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin", children: NAV_ITEMS.map((item) => {
            const active = isNavItemActive(pathname, item.to, item.exact);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                onClick: () => setOpen(false),
                className: cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4 shrink-0" }),
                  item.label,
                  item.label === "Jarvis" && !active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto rounded bg-sidebar-primary/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-sidebar-primary-foreground", children: "AI" })
                ]
              },
              item.to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 border-t border-sidebar-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg px-2 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/kargil.jpg",
                alt: "Sourav SB",
                className: "h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-sidebar-border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium text-white", children: "Sourav SB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-sidebar-foreground/60", children: "Administrator" })
            ] })
          ] }) })
        ]
      }
    )
  ] });
}
async function http(path, init) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...init
  });
  if (!res.ok) throw new Error(`${init?.method ?? "GET"} ${path} -> ${res.status}`);
  return await res.json();
}
const api = {
  // ---- Customers ----
  async getCustomers() {
    return http("/api/customers");
  },
  async getCustomer(id) {
    const res = await fetch(`/api/customers/${id}`);
    if (res.status === 404) return void 0;
    if (!res.ok) throw new Error(`GET /api/customers/${id} -> ${res.status}`);
    return await res.json();
  },
  async getCustomerOrders(customerId) {
    return http(`/api/customers/${customerId}/orders`);
  },
  async getCustomerInsight(id) {
    return http(`/api/customers/${id}/insight`);
  },
  // ---- Segments ----
  async getSegments() {
    return http("/api/segments");
  },
  async getSegment(id) {
    const segs = await http("/api/segments");
    return segs.find((s) => s.id === id);
  },
  async createSegment(input) {
    return http("/api/segments", { method: "POST", body: JSON.stringify(input) });
  },
  // Guarded delete: server refuses (409) when campaigns still reference the
  // segment. We surface a friendly message with the blocking campaign count.
  async deleteSegment(id) {
    const res = await fetch(`/api/segments/${id}`, { method: "DELETE" });
    if (res.ok) return await res.json();
    const data = await res.json().catch(() => ({}));
    if (res.status === 409) {
      const n = data.campaignCount ?? 0;
      throw new Error(
        `This segment is used by ${n} campaign${n === 1 ? "" : "s"}. Delete or reassign ${n === 1 ? "it" : "them"} first.`
      );
    }
    throw new Error(data.error ?? `DELETE /api/segments/${id} -> ${res.status}`);
  },
  // Count customers matching a structured rule set (live audience preview).
  async previewSegmentByRules(rules, combinator) {
    return http("/api/segments/preview", {
      method: "POST",
      body: JSON.stringify({ rules, combinator })
    });
  },
  // Natural-language -> AI segment with equivalent structured rules.
  async generateSegmentFromText(text) {
    return http("/api/ai/segment", {
      method: "POST",
      body: JSON.stringify({ text })
    });
  },
  // ---- Campaigns ----
  async getCampaigns() {
    return http("/api/campaigns");
  },
  async getCampaign(id) {
    const res = await fetch(`/api/campaigns/${id}`);
    if (res.status === 404) return void 0;
    if (!res.ok) throw new Error(`GET /api/campaigns/${id} -> ${res.status}`);
    return await res.json();
  },
  async createCampaign(input) {
    return http("/api/campaigns", { method: "POST", body: JSON.stringify(input) });
  },
  async launchCampaign(id) {
    await http(`/api/campaigns/${id}/launch`, { method: "POST" });
    const camp = await api.getCampaign(id);
    if (!camp) throw new Error("Campaign not found after launch");
    return camp;
  },
  async getCampaignPostMortem(id) {
    return http(`/api/campaigns/${id}/postmortem`);
  },
  async getCampaignAnalysis(id) {
    const res = await fetch(`/api/campaigns/${id}/analysis`);
    if (!res.ok) return null;
    return await res.json();
  },
  // Live stats come from real Channel Service callbacks; just re-fetch.
  async tickCampaignStats(id) {
    return api.getCampaign(id);
  },
  // ---- Communications / Channel Monitor ----
  async getCommunications() {
    return http("/api/communications");
  },
  // ---- Dashboard / Analytics (real aggregates over the event spine) ----
  async getDashboardKPIs() {
    return http("/api/analytics/overview");
  },
  async getRevenueByWeek() {
    return http("/api/analytics/revenue-weekly");
  },
  async getLifecycleDistribution() {
    return http("/api/analytics/lifecycle");
  },
  async getChannelComparison(days) {
    const qs = days ? `?days=${days}` : "";
    return http(`/api/analytics/channels${qs}`);
  },
  async getEngagementTrend(days) {
    const qs = days ? `?days=${days}` : "";
    return http(
      `/api/analytics/engagement${qs}`
    );
  },
  // ---- Jarvis (AI recommendations) ----
  async getAIRecommendation(goal) {
    return http("/api/ai/recommend", { method: "POST", body: JSON.stringify({ goal }) });
  },
  async getProactiveSuggestions() {
    return http(
      "/api/analytics/suggestions"
    );
  },
  // ---- AI Explainability (real aggregation; AI does language, DB does facts) ----
  async getAudienceExplanation(input) {
    return http("/api/ai/explain", { method: "POST", body: JSON.stringify(input) });
  },
  async getCustomerExplanation(customerId) {
    return http(`/api/customers/${customerId}/explanation`);
  },
  // ---- Settings (single-row server-authoritative app config) ----
  async getSettings() {
    return http("/api/settings");
  },
  async updateSettings(patch) {
    return http("/api/settings", { method: "PUT", body: JSON.stringify(patch) });
  },
  // ---- Notifications (persistent inbox; producers fire from launch/receipts/AI) ----
  async listNotifications(opts = {}) {
    const qs = new URLSearchParams();
    if (opts.unreadOnly) qs.set("unread", "true");
    if (opts.limit) qs.set("limit", String(opts.limit));
    const suffix = qs.toString();
    return http(`/api/notifications${suffix ? `?${suffix}` : ""}`);
  },
  async markNotificationRead(id) {
    return http(`/api/notifications/${id}`, { method: "PATCH" });
  },
  async markAllNotificationsRead() {
    return http(`/api/notifications/mark-all-read`, { method: "POST" });
  }
};
const LIFECYCLE_HOME_SEGMENT = {
  vip: { id: "seg_vip", name: "VIP Loyalists" },
  dormant: { id: "seg_dormant_hv", name: "Dormant High-Value" },
  at_risk: { id: "seg_at_risk", name: "At-Risk Regulars" },
  new: { id: "seg_new", name: "First-Time Buyers" },
  active: { id: "seg_active", name: "Active Repeat Buyers" }
};
function homeSegmentForCustomer(c) {
  return LIFECYCLE_HOME_SEGMENT[c.lifecycleStage] ?? { id: "seg_active", name: "Active Repeat Buyers" };
}
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
const MAX_PER_GROUP = 6;
function GlobalSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  reactExports.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  const customers = useQuery({
    queryKey: ["customers"],
    queryFn: api.getCustomers,
    enabled: open,
    staleTime: 6e4
  });
  const campaigns = useQuery({
    queryKey: ["campaigns"],
    queryFn: api.getCampaigns,
    enabled: open,
    staleTime: 6e4
  });
  const segments = useQuery({
    queryKey: ["segments"],
    queryFn: api.getSegments,
    enabled: open,
    staleTime: 6e4
  });
  const q = query.trim().toLowerCase();
  const pages = reactExports.useMemo(
    () => q ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(q)) : NAV_ITEMS,
    [q]
  );
  const customerMatches = reactExports.useMemo(() => {
    if (!q) return [];
    return (customers.data ?? []).filter((c) => (c.name + " " + c.email + " " + c.city).toLowerCase().includes(q)).slice(0, MAX_PER_GROUP);
  }, [customers.data, q]);
  const campaignMatches = reactExports.useMemo(() => {
    if (!q) return [];
    return (campaigns.data ?? []).filter((c) => c.name.toLowerCase().includes(q)).slice(0, MAX_PER_GROUP);
  }, [campaigns.data, q]);
  const segmentMatches = reactExports.useMemo(() => {
    if (!q) return [];
    return (segments.data ?? []).filter((s) => (s.name + " " + s.description).toLowerCase().includes(q)).slice(0, MAX_PER_GROUP);
  }, [segments.data, q]);
  function go(fn) {
    setOpen(false);
    setQuery("");
    fn();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        "aria-label": "Open global search",
        className: cn(
          "relative hidden h-9 flex-1 max-w-md items-center rounded-md border border-transparent bg-secondary/50 pl-9 pr-2 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:flex"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "Search customers, campaigns, segments…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-auto hidden items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground md:inline-flex", children: "⌘K" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "sm:hidden",
        "aria-label": "Open global search",
        onClick: () => setOpen(true),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Command,
      {
        shouldFilter: false,
        className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CommandInput,
            {
              placeholder: "Search customers, campaigns, segments…",
              value: query,
              onValueChange: setQuery
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No results found." }),
            pages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Pages", children: pages.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              CommandItem,
              {
                value: `page-${item.to}`,
                onSelect: () => go(() => navigate({ to: item.to })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                ]
              },
              item.to
            )) }),
            customerMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Customers", children: customerMatches.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                CommandItem,
                {
                  value: `customer-${c.id}`,
                  onSelect: () => go(() => navigate({ to: "/customers", search: { q: c.name } })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto truncate text-xs text-muted-foreground", children: c.email })
                  ]
                },
                c.id
              )) })
            ] }),
            campaignMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Campaigns", children: campaignMatches.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                CommandItem,
                {
                  value: `campaign-${c.id}`,
                  onSelect: () => go(() => navigate({ to: "/campaigns/$id", params: { id: c.id } })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto truncate text-xs capitalize text-muted-foreground", children: c.status })
                  ]
                },
                c.id
              )) })
            ] }),
            segmentMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Segments", children: segmentMatches.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                CommandItem,
                {
                  value: `segment-${s.id}`,
                  onSelect: () => go(() => navigate({ to: "/segments" })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: s.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto truncate text-xs text-muted-foreground", children: [
                      s.customerCount,
                      " customers"
                    ] })
                  ]
                },
                s.id
              )) })
            ] })
          ] })
        ]
      }
    ) }) })
  ] });
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger$1;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function relativeTime(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 0) return "just now";
  const s = Math.floor(ms / 1e3);
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
const severityDot = {
  INFO: "bg-primary",
  SUCCESS: "bg-emerald-500",
  WARN: "bg-amber-500",
  ERROR: "bg-rose-500"
};
function TopBar() {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.listNotifications({ limit: 12 }),
    refetchInterval: 3e4,
    staleTime: 15e3
  });
  const unreadCount = notifications.filter((n) => !n.readAt).length;
  const markRead = useMutation({
    mutationFn: (id) => api.markNotificationRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
  });
  const markAllRead = useMutation({
    mutationFn: () => api.markAllNotificationsRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
  });
  function onActivate(n) {
    if (!n.readAt) markRead.mutate(n.id);
    if (n.link) {
      navigate({ to: n.link });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalSearch, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => navigate({ to: "/campaigns/new" }),
          className: "gap-1.5 font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "New Campaign" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: toggle, "aria-label": "Toggle theme", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "icon",
            "aria-label": unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications",
            className: "relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground",
                  "aria-hidden": "true",
                  children: unreadCount > 9 ? "9+" : unreadCount
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-96 p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 px-3 pb-1 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "px-0", children: "Notifications" }),
            unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 gap-1 px-2 text-xs",
                onClick: () => markAllRead.mutate(),
                disabled: markAllRead.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5" }),
                  "Mark all read"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-8 text-center text-xs text-muted-foreground", children: "You're all caught up." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[28rem] overflow-y-auto py-1", children: notifications.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onSelect: (e) => {
                e.preventDefault();
                onActivate(n);
              },
              className: cn(
                "flex items-start gap-2.5 px-3 py-2",
                !n.readAt && "bg-accent/40"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      n.readAt ? "bg-muted-foreground/30" : severityDot[n.severity]
                    ),
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-medium", children: n.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: relativeTime(n.createdAt) })
                  ] }),
                  n.body && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 whitespace-normal text-xs text-muted-foreground", children: n.body })
                ] })
              ]
            },
            n.id
          )) })
        ] })
      ] })
    ] })
  ] });
}
function AppLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 md:p-6 lg:p-8", children })
    ] })
  ] });
}
function PageHeader({
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
    ] }),
    action
  ] });
}
const channelMeta = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle, color: "text-success" },
  sms: { label: "SMS", icon: Smartphone, color: "text-info" },
  email: { label: "Email", icon: Mail, color: "text-primary" },
  rcs: { label: "RCS", icon: MessageSquareText, color: "text-convert" }
};
function ChannelIcon({ channel, className }) {
  const M = channelMeta[channel];
  const Icon = M.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4", M.color, className) });
}
const lifecycleStyles = {
  new: "bg-info/15 text-info border-info/30",
  active: "bg-success/15 text-success border-success/30",
  at_risk: "bg-warning/15 text-warning border-warning/30",
  dormant: "bg-muted text-muted-foreground border-border",
  vip: "bg-convert/15 text-convert border-convert/30"
};
const lifecycleLabel = {
  new: "New",
  active: "Active",
  at_risk: "At Risk",
  dormant: "Dormant",
  vip: "VIP"
};
function LifecycleBadge({ stage }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", lifecycleStyles[stage]), children: lifecycleLabel[stage] });
}
const statusStyles = {
  draft: "bg-muted text-muted-foreground border-border",
  scheduled: "bg-info/15 text-info border-info/30",
  sending: "bg-warning/15 text-warning border-warning/30",
  completed: "bg-success/15 text-success border-success/30",
  failed: "bg-destructive/15 text-destructive border-destructive/30"
};
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium capitalize", statusStyles[status]), children: [
    status === "sending" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-warning" }),
    status
  ] });
}
const commStatusColor = {
  queued: "text-muted-foreground bg-muted",
  sent: "text-foreground bg-secondary",
  delivered: "text-success bg-success/15",
  failed: "text-destructive bg-destructive/15",
  opened: "text-info bg-info/15",
  read: "text-info bg-info/15",
  clicked: "text-convert bg-convert/15",
  converted: "text-convert bg-convert/15"
};
function CommStatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize", commStatusColor[status]), children: status });
}
const confidenceStyles = {
  low: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-info/15 text-info border-info/30",
  high: "bg-success/15 text-success border-success/30"
};
function ConfidenceBadge({ confidence }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold capitalize", confidenceStyles[confidence]), children: [
    confidence,
    " confidence"
  ] });
}
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
export {
  AppLayout as A,
  Button as B,
  Card as C,
  Dialog as D,
  LifecycleBadge as L,
  PageHeader as P,
  Sheet as S,
  ChannelIcon as a,
  cn as b,
  channelMeta as c,
  api as d,
  DialogTrigger as e,
  DialogContent as f,
  DialogHeader as g,
  DialogTitle as h,
  DialogFooter as i,
  buttonVariants as j,
  ConfidenceBadge as k,
  SheetContent as l,
  SheetHeader as m,
  SheetTitle as n,
  homeSegmentForCustomer as o,
  CommStatusBadge as p,
  StatusBadge as q
};
