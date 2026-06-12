import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, P as PageHeader, C as Card, a as ChannelIcon, p as CommStatusBadge, d as api } from "./card-D1doNZif.mjs";
import { S as Skeleton } from "./skeleton-D_4UpKPQ.mjs";
import "../_libs/sonner.mjs";
import "../_libs/google__genai.mjs";
import { j as Activity, k as CircleCheck, l as CircleX, R as RotateCcw, G as Gauge } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, X as XAxis, T as Tooltip, a as Area } from "../_libs/recharts.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
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
const TRANSITIONS = {
  queued: [{
    to: "sent",
    p: 0.92
  }, {
    to: "failed",
    p: 0.08
  }],
  sent: [{
    to: "delivered",
    p: 0.9
  }, {
    to: "failed",
    p: 0.1
  }],
  delivered: [
    {
      to: "opened",
      p: 0.55
    },
    {
      to: "delivered",
      p: 0.45
    }
    // stays — not everyone opens
  ],
  opened: [{
    to: "read",
    p: 0.7
  }, {
    to: "clicked",
    p: 0.1
  }, {
    to: "opened",
    p: 0.2
  }],
  read: [{
    to: "clicked",
    p: 0.35
  }, {
    to: "read",
    p: 0.65
  }],
  clicked: [{
    to: "converted",
    p: 0.4
  }, {
    to: "clicked",
    p: 0.6
  }],
  converted: [],
  failed: []
  // handled separately via retry logic
};
const TERMINAL = ["converted"];
function weightedNext(status) {
  const opts = TRANSITIONS[status];
  if (!opts || opts.length === 0) return null;
  let r = Math.random();
  for (const o of opts) {
    if (r < o.p) return o.to;
    r -= o.p;
  }
  return opts[opts.length - 1].to;
}
const MAX_RETRIES = 3;
const channels = ["whatsapp", "sms", "email", "rcs"];
function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}
function ChannelMonitor() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["comms"],
    queryFn: api.getCommunications
  });
  const [feed, setFeed] = reactExports.useState([]);
  const [totals, setTotals] = reactExports.useState({
    delivered: 0,
    failed: 0,
    retried: 0,
    converted: 0
  });
  const [throughput, setThroughput] = reactExports.useState(Array.from({
    length: 20
  }, (_, i) => ({
    t: `${i}`,
    events: 0
  })));
  const tick = reactExports.useRef(0);
  const seq = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (data) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      setFeed(data.slice(0, 24).map((c) => ({
        ...c,
        status: "queued",
        retries: 0,
        updatedAt: now
      })));
    }
  }, [data]);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setFeed((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const now = (/* @__PURE__ */ new Date()).toISOString();
        let events = 0;
        let dDelivered = 0;
        let dFailed = 0;
        let dRetried = 0;
        let dConverted = 0;
        const moves = Math.min(next.length, 3 + Math.floor(Math.random() * 4));
        for (let i = 0; i < moves; i++) {
          const idx = Math.floor(Math.random() * next.length);
          const c = next[idx];
          if (TERMINAL.includes(c.status)) continue;
          if (c.status === "failed") {
            if (c.retries < MAX_RETRIES && Math.random() > 0.4) {
              next[idx] = {
                ...c,
                status: "queued",
                retries: c.retries + 1,
                updatedAt: now,
                timeline: [...c.timeline, {
                  status: "queued",
                  at: now
                }]
              };
              dRetried++;
              events++;
            }
            continue;
          }
          const ns = weightedNext(c.status);
          if (!ns || ns === c.status) continue;
          next[idx] = {
            ...c,
            status: ns,
            updatedAt: now,
            timeline: [...c.timeline, {
              status: ns,
              at: now
            }]
          };
          if (ns === "delivered") dDelivered++;
          if (ns === "failed") dFailed++;
          if (ns === "converted") dConverted++;
          events++;
        }
        if (Math.random() > 0.5 && data) {
          const tmpl = data[Math.floor(Math.random() * data.length)];
          seq.current++;
          next.unshift({
            ...tmpl,
            id: `live_${seq.current}`,
            channel: channels[Math.floor(Math.random() * channels.length)],
            status: "queued",
            retries: 0,
            updatedAt: now,
            timeline: [{
              status: "queued",
              at: now
            }]
          });
          events++;
          if (next.length > 48) next.pop();
        }
        tick.current++;
        setThroughput((tp) => [...tp.slice(1), {
          t: `${tick.current}`,
          events
        }]);
        setTotals((t) => ({
          delivered: t.delivered + dDelivered,
          failed: t.failed + dFailed,
          retried: t.retried + dRetried,
          converted: t.converted + dConverted
        }));
        return next;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [data]);
  const inFlight = feed.filter((c) => ["queued", "sent"].includes(c.status)).length;
  const delivered = feed.filter((c) => ["delivered", "opened", "read", "clicked", "converted"].includes(c.status)).length;
  const failed = feed.filter((c) => c.status === "failed").length;
  const retried = feed.reduce((a, c) => a + c.retries, 0);
  const attempted = totals.delivered + totals.failed;
  const successRate = attempted > 0 ? totals.delivered / attempted : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Channel Monitor", description: "Live view of the asynchronous channel callback stream" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { label: "In-flight", value: inFlight, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-warning" }), pulse: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { label: "Delivered", value: delivered, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { label: "Failed", value: failed, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { label: "Retried", value: retried, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 text-info" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { label: "Success rate", value: `${(successRate * 100).toFixed(1)}%`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "h-4 w-4 text-success" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Throughput" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "events / tick (~1.4s)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: throughput, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "tp", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-primary)", stopOpacity: 0.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-primary)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "t", hide: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--color-popover)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "events", stroke: "var(--color-primary)", strokeWidth: 2, fill: "url(#tp)", isAnimationActive: false })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Live callback feed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-success" }),
          " streaming"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[480px] overflow-x-auto overflow-y-auto scrollbar-thin", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[560px] text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium", children: "Event ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium", children: "Channel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium", children: "Updated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-medium", children: "Retries" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: feed.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { layout: true, initial: {
          opacity: 0,
          backgroundColor: "var(--color-accent)"
        }, animate: {
          opacity: 1,
          backgroundColor: "rgba(0,0,0,0)"
        }, transition: {
          duration: 0.5
        }, className: "border-b last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-mono text-xs text-muted-foreground", children: c.id.slice(0, 16) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: c.channel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-muted-foreground", children: c.channel })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommStatusBadge, { status: c.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-mono text-xs text-muted-foreground tabular-nums", children: fmtTime(c.updatedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums", children: c.retries ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-info/15 px-1.5 py-0.5 text-xs font-medium text-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
            c.retries
          ] }) : "—" })
        ] }, c.id)) }) })
      ] }) })
    ] })
  ] });
}
function Counter({
  label,
  value,
  icon,
  pulse
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: pulse ? "animate-pulse" : "", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-semibold tabular-nums", children: value })
  ] });
}
export {
  ChannelMonitor as component
};
