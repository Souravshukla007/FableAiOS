import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, P as PageHeader, C as Card, a as ChannelIcon, B as Button, q as StatusBadge, b as cn, d as api } from "./card-D1doNZif.mjs";
import { a as formatPct, c as formatINRShort, f as formatINR, r as relativeTime } from "./format-XwfzrowQ.mjs";
import { S as Skeleton } from "./skeleton-D_4UpKPQ.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/google__genai.mjs";
import { U as Users, e as Send, M as MailOpen, I as IndianRupee, a as Sparkles, p as ArrowRight, c as TrendingUp, q as TrendingDown } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area, P as PieChart, e as Pie, f as Cell, B as BarChart, b as Bar } from "../_libs/recharts.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./router-bYr-bjNA.mjs";
import "@prisma/client";
import "node:process";
import "../_libs/zod.mjs";
import "../_libs/p-retry.mjs";
import "../_libs/retry.mjs";
import "../_libs/google-auth-library.mjs";
import "child_process";
import "querystring";
import "fs";
import "../_libs/gaxios.mjs";
import "https";
import "../_libs/extend.mjs";
import "../_libs/gcp-metadata.mjs";
import "os";
import "../_libs/json-bigint.mjs";
import "../_libs/bignumber.js.mjs";
import "../_libs/google-logging-utils.mjs";
import "events";
import "process";
import "path";
import "../_libs/base64-js.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jws.mjs";
import "../_libs/jwa.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "fs/promises";
import "node:stream/promises";
import "../_libs/ws.mjs";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function StatCard({
  label,
  value,
  delta,
  icon,
  suffix
}) {
  const positive = (delta ?? 0) >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold tracking-tight", children: value }),
      delta !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: cn(
            "flex items-center gap-0.5 text-xs font-medium",
            positive ? "text-success" : "text-destructive"
          ),
          children: [
            positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3.5 w-3.5" }),
            Math.abs(delta),
            suffix ?? "%"
          ]
        }
      )
    ] })
  ] });
}
const lifecycleColors = {
  new: "var(--color-info)",
  active: "var(--color-success)",
  at_risk: "var(--color-warning)",
  dormant: "var(--color-muted-foreground)",
  vip: "var(--color-convert)"
};
function ChartCard({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: title }),
    children
  ] });
}
function Dashboard() {
  const navigate = useNavigate();
  const kpis = useQuery({
    queryKey: ["kpis"],
    queryFn: api.getDashboardKPIs
  });
  const revenue = useQuery({
    queryKey: ["revenueWeek"],
    queryFn: api.getRevenueByWeek
  });
  const campaigns = useQuery({
    queryKey: ["campaigns"],
    queryFn: api.getCampaigns
  });
  const lifecycle = useQuery({
    queryKey: ["lifecycle"],
    queryFn: api.getLifecycleDistribution
  });
  const suggestions = useQuery({
    queryKey: ["suggestions"],
    queryFn: api.getProactiveSuggestions
  });
  const recent = campaigns.data?.slice(0, 5) ?? [];
  const campaignPerf = (campaigns.data ?? []).filter((c) => c.stats.sent > 0).slice(0, 6).map((c) => ({
    name: c.name.split(" — ")[0].slice(0, 14),
    sent: c.stats.sent,
    delivered: c.stats.delivered,
    opened: c.stats.opened,
    clicked: c.stats.clicked
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Dashboard", description: "Your marketing performance at a glance" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: kpis.isLoading ? Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, i)) : kpis.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Customers", value: kpis.data.totalCustomers, delta: kpis.data.customersDelta, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active Campaigns", value: kpis.data.activeCampaigns, delta: kpis.data.campaignsDelta, suffix: "", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg Open Rate", value: formatPct(kpis.data.avgOpenRate), delta: kpis.data.openRateDelta, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MailOpen, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Attributed Revenue", value: formatINRShort(kpis.data.attributedRevenue), delta: kpis.data.revenueDelta, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4" }) })
    ] }) : null }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Revenue by week", children: revenue.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 256, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: revenue.data, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rev", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-primary)", stopOpacity: 0.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-primary)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "week", stroke: "var(--color-muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (v) => formatINRShort(v) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--color-popover)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          fontSize: 12
        }, formatter: (v) => [formatINR(v), "Revenue"] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "var(--color-primary)", strokeWidth: 2, fill: "url(#rev)" })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ChartCard, { title: "Lifecycle distribution", children: [
        lifecycle.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 256, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: lifecycle.data, dataKey: "count", nameKey: "stage", innerRadius: 55, outerRadius: 90, paddingAngle: 2, children: lifecycle.data?.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: lifecycleColors[e.stage] }, e.stage)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            fontSize: 12
          }, labelStyle: {
            color: "var(--color-popover-foreground)"
          }, itemStyle: {
            color: "var(--color-popover-foreground)"
          } })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: lifecycle.data?.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-sm", style: {
            background: lifecycleColors[e.stage]
          } }),
          e.stage.replace("_", " "),
          " (",
          e.count,
          ")"
        ] }, e.stage)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Campaign performance", children: campaigns.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 256, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: campaignPerf, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "var(--color-muted-foreground)", fontSize: 11, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--color-popover)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          fontSize: 12
        }, cursor: {
          fill: "var(--color-muted)",
          opacity: 0.4
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sent", fill: "var(--color-muted-foreground)", radius: [3, 3, 0, 0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "delivered", fill: "var(--color-success)", radius: [3, 3, 0, 0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "opened", fill: "var(--color-info)", radius: [3, 3, 0, 0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "clicked", fill: "var(--color-convert)", radius: [3, 3, 0, 0] })
      ] }) }) }) }),
      (suggestions.isLoading || suggestions.data && suggestions.data.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "AI Suggestions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: suggestions.isLoading ? Array.from({
          length: 3
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, i)) : suggestions.data?.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.08
        }, className: "rounded-lg border bg-card p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: s.channel }),
            s.title
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: s.detail }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "mt-2 h-7 gap-1 px-2 text-xs text-primary", onClick: () => {
            toast.success("Opening Jarvis with this goal");
            navigate({
              to: "/jarvis",
              search: {
                goal: s.title
              }
            });
          }, children: [
            s.cta,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] })
        ] }, s.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Recent campaigns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/campaigns", className: "text-xs font-medium text-primary hover:underline", children: "View all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b text-left text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Campaign" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Channel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right font-medium", children: "Audience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right font-medium", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right font-medium", children: "Created" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recent.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/campaigns/$id", params: {
            id: c.id
          }, className: "font-medium hover:text-primary", children: c.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: c.channel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-muted-foreground", children: c.channel })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: c.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right tabular-nums", children: c.audienceSize }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right tabular-nums", children: formatINRShort(c.stats.attributedRevenue) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right text-muted-foreground", children: relativeTime(c.createdAt) })
        ] }, c.id)) })
      ] }) })
    ] })
  ] });
}
export {
  Dashboard as component
};
