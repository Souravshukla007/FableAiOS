import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as api, A as AppLayout, P as PageHeader, a as ChannelIcon, q as StatusBadge, C as Card, k as ConfidenceBadge, B as Button, b as cn } from "./card-D1doNZif.mjs";
import { f as formatINR, a as formatPct } from "./format-XwfzrowQ.mjs";
import { S as Skeleton } from "./skeleton-D_4UpKPQ.mjs";
import { b as Route$s } from "./router-bYr-bjNA.mjs";
import "../_libs/sonner.mjs";
import "../_libs/google__genai.mjs";
import { a as Sparkles, L as LoaderCircle, p as ArrowRight, f as Rocket, k as CircleCheck, z as TriangleAlert, D as CircleMinus } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const FUNNEL_STEPS = [{
  key: "sent",
  label: "Sent",
  color: "bg-muted-foreground"
}, {
  key: "delivered",
  label: "Delivered",
  color: "bg-info"
}, {
  key: "opened",
  label: "Opened",
  color: "bg-primary"
}, {
  key: "read",
  label: "Read",
  color: "bg-primary/70"
}, {
  key: "clicked",
  label: "Clicked",
  color: "bg-warning"
}, {
  key: "converted",
  label: "Converted",
  color: "bg-convert"
}];
function CampaignDetail() {
  const {
    id
  } = Route$s.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    data: c,
    isLoading
  } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => api.getCampaign(id)
  });
  const analysis = useQuery({
    queryKey: ["analysis", id],
    queryFn: () => api.getCampaignAnalysis(id),
    enabled: !!c
  });
  reactExports.useEffect(() => {
    if (c?.status !== "sending") return;
    const interval = setInterval(async () => {
      await api.tickCampaignStats(id);
      qc.invalidateQueries({
        queryKey: ["campaign", id]
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [c?.status, id, qc]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 w-full rounded-xl" }) });
  if (!c) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Campaign not found." }) });
  const s = c.stats;
  const p = c.prediction;
  const live = c.status === "sending";
  const compare = p ? [{
    metric: "Delivery",
    predicted: p.expectedDeliveryRate,
    actual: s.sent ? s.delivered / s.sent : 0
  }, {
    metric: "Open",
    predicted: p.expectedOpenRate,
    actual: s.delivered ? s.opened / s.delivered : 0
  }, {
    metric: "Click",
    predicted: p.expectedClickRate,
    actual: s.delivered ? s.clicked / s.delivered : 0
  }, {
    metric: "Convert",
    predicted: p.expectedConversionRate,
    actual: s.delivered ? s.converted / s.delivered : 0
  }] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: c.name, description: c.goal, action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      live && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-warning", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-warning" }),
        " Live"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: c.channel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: c.status })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Conversion funnel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelViz, { stats: s })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Prediction vs actual" }),
          p && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBadge, { confidence: p.confidence })
        ] }),
        p ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          compare.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(PvARow, { ...row, live }, row.metric)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-muted p-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Attributed revenue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold tabular-nums", children: [
              formatINR(s.attributedRevenue),
              p && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs font-normal text-muted-foreground", children: [
                "vs ",
                formatINR(p.expectedRevenueMin),
                "–",
                formatINR(p.expectedRevenueMax)
              ] })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No prediction recorded for this campaign." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 text-sm font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          " AI Campaign Post-Mortem"
        ] }),
        analysis.isLoading || !analysis.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Analysing performance…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: analysis.data.summary }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: analysis.data.factors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 rounded-lg border bg-card/60 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerdictIcon, { verdict: f.verdict }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: f.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: f.text })
            ] })
          ] }, f.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-convert/30 bg-convert/5 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-convert", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" }),
              " Recommended next action"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-medium", children: analysis.data.nextAction.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: analysis.data.nextAction.detail }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-3 gap-1.5", size: "sm", onClick: () => navigate({
              to: "/jarvis",
              search: {
                goal: analysis.data.nextAction.goal
              }
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4" }),
              " Create follow-up campaign"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function FunnelViz({
  stats
}) {
  const s = stats;
  const top = Math.max(1, stats.sent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: FUNNEL_STEPS.map((step, i) => {
    const value = s[step.key] ?? 0;
    const widthPct = value / top * 100;
    const prev = i === 0 ? value : s[FUNNEL_STEPS[i - 1].key] ?? 0;
    const dropOff = i === 0 || prev === 0 ? 0 : (1 - value / prev) * 100;
    const ofTotal = top ? value / top * 100 : 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: step.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-foreground", children: value.toLocaleString("en-IN") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
            "(",
            ofTotal.toFixed(0),
            "%)"
          ] }),
          i > 0 && dropOff > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive", children: [
            "−",
            dropOff.toFixed(0),
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: cn("h-full rounded-full", step.color), initial: {
        width: 0
      }, animate: {
        width: `${Math.max(widthPct, value > 0 ? 2 : 0)}%`
      }, transition: {
        duration: 0.6,
        ease: "easeOut"
      } }) })
    ] }, step.key);
  }) });
}
function PvARow({
  metric,
  predicted,
  actual,
  live
}) {
  const diff = actual - predicted;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: metric }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 tabular-nums", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "pred ",
          formatPct(predicted)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
          "act ",
          formatPct(actual)
        ] }),
        !live && Math.abs(diff) >= 5e-3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("rounded px-1.5 py-0.5 text-[10px] font-medium", diff >= 0 ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"), children: [
          diff >= 0 ? "+" : "",
          (diff * 100).toFixed(0),
          "pp"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-2 overflow-hidden rounded-full bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 rounded-full bg-muted-foreground/40", style: {
        width: `${Math.min(100, predicted * 100)}%`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-y-0 left-0 rounded-full bg-primary", initial: {
        width: 0
      }, animate: {
        width: `${Math.min(100, actual * 100)}%`
      }, transition: {
        duration: 0.6,
        ease: "easeOut"
      } })
    ] })
  ] });
}
function VerdictIcon({
  verdict
}) {
  if (verdict === "positive") return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-success" });
  if (verdict === "negative") return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-destructive" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleMinus, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" });
}
export {
  CampaignDetail as component
};
