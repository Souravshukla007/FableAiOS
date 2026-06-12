import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, P as PageHeader, C as Card, a as ChannelIcon, d as api } from "./card-D1doNZif.mjs";
import { c as formatINRShort, f as formatINR } from "./format-XwfzrowQ.mjs";
import { S as Skeleton } from "./skeleton-D_4UpKPQ.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-6G4iUcMc.mjs";
import "../_libs/sonner.mjs";
import "../_libs/google__genai.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, b as Bar, c as LineChart, d as Line } from "../_libs/recharts.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
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
const TT = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12
};
function Analytics() {
  const [range, setRange] = reactExports.useState("30");
  const [chFilter, setChFilter] = reactExports.useState("all");
  const days = Number(range);
  const channels = useQuery({
    queryKey: ["channelCompare", days],
    queryFn: () => api.getChannelComparison(days)
  });
  const trend = useQuery({
    queryKey: ["trend", days],
    queryFn: () => api.getEngagementTrend(days)
  });
  const campaigns = useQuery({
    queryKey: ["campaigns"],
    queryFn: api.getCampaigns
  });
  const segs = useQuery({
    queryKey: ["segments"],
    queryFn: api.getSegments
  });
  const filteredCh = (channels.data ?? []).filter((c) => chFilter === "all" || c.channel === chFilter);
  const bestSegments = (segs.data ?? []).map((s) => {
    const camps = (campaigns.data ?? []).filter((c) => c.segmentId === s.id);
    const revenue = camps.reduce((a, c) => a + c.stats.attributedRevenue, 0);
    return {
      name: s.name,
      campaigns: camps.length,
      revenue
    };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Analytics", description: "Cross-campaign performance and attribution", action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: range, onValueChange: setRange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7", children: "Last 7 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "Last 30 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "90", children: "Last 90 days" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: chFilter, onValueChange: setChFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All channels" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "whatsapp", children: "WhatsApp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sms", children: "SMS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rcs", children: "RCS" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Channel comparison" }),
        channels.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 256, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: filteredCh, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "channel", stroke: "var(--color-muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TT, cursor: {
            fill: "var(--color-muted)",
            opacity: 0.4
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "delivered", fill: "var(--color-success)", radius: [3, 3, 0, 0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "opened", fill: "var(--color-info)", radius: [3, 3, 0, 0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "clicked", fill: "var(--color-convert)", radius: [3, 3, 0, 0] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Engagement trends" }),
        trend.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 256, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trend.data, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "var(--color-muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12, tickLine: false, axisLine: false, unit: "%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TT }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "open", stroke: "var(--color-info)", strokeWidth: 2, dot: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "click", stroke: "var(--color-convert)", strokeWidth: 2, dot: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "conversion", stroke: "var(--color-success)", strokeWidth: 2, dot: false })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Best-performing segments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b text-left text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Segment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right font-medium", children: "Campaigns" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right font-medium", children: "Revenue" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bestSegments.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 font-medium", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right tabular-nums", children: s.campaigns }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right tabular-nums font-medium", children: formatINRShort(s.revenue) })
          ] }, s.name)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Revenue attribution by channel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (channels.data ?? []).map((c) => {
          const total = (channels.data ?? []).reduce((a, x) => a + x.revenue, 0) || 1;
          const pct = c.revenue / total * 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 capitalize", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: c.channel }),
                " ",
                c.channel
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium tabular-nums", children: formatINR(c.revenue) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary", style: {
              width: `${pct}%`
            } }) })
          ] }, c.channel);
        }) })
      ] })
    ] })
  ] });
}
export {
  Analytics as component
};
