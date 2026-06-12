import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as cn, a as ChannelIcon, c as channelMeta, d as api } from "./card-D1doNZif.mjs";
import { R as Root, C as CollapsibleTrigger$1, a as CollapsibleContent$1 } from "../_libs/radix-ui__react-collapsible.mjs";
import { u as useShowEvidencePref, S as Switch } from "./preferences-BDuSVRBv.mjs";
import { B as Brain, c as TrendingUp, q as TrendingDown, n as Check, a as Sparkles, L as LoaderCircle, h as RefreshCw, m as ChevronDown, U as Users, I as IndianRupee, t as MessageSquare, H as History, u as Type, v as CalendarClock, w as Hash, x as Percent, y as Minus } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
const Collapsible = Root;
const CollapsibleTrigger = CollapsibleTrigger$1;
const CollapsibleContent = CollapsibleContent$1;
const ANALYZE_STEPS = [
  { icon: Users, label: "Scanning customers" },
  { icon: IndianRupee, label: "Aggregating spend" },
  { icon: MessageSquare, label: "Checking channel engagement" },
  { icon: History, label: "Comparing past campaigns" }
];
function AnalyzingSteps() {
  const [step, setStep] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, ANALYZE_STEPS.length)), 550);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
      " Analyzing audience…"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", "aria-label": "Analysis steps", children: ANALYZE_STEPS.map((s, i) => {
      const done = i < step;
      const active = i === step;
      const Icon = s.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: cn(
            "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors",
            done ? "text-foreground" : active ? "bg-primary/[0.06] text-foreground" : "text-muted-foreground/60"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("flex h-4 w-4 items-center justify-center", done ? "text-success" : active ? "text-primary" : "text-muted-foreground/50"), children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : active ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
            s.label
          ]
        },
        s.label
      );
    }) })
  ] });
}
const KIND_ICON = {
  currency: IndianRupee,
  percent: Percent,
  count: Hash,
  days: CalendarClock,
  text: Type
};
function sourceKey(source) {
  if (source.kind === "segment") return ["explain", "segment", source.segmentId];
  if (source.kind === "customer") return ["explain", "customer", source.customerId];
  return ["explain", "rules", source.rules, source.combinator];
}
function fetchExplanation(source) {
  if (source.kind === "segment") return api.getAudienceExplanation({ segmentId: source.segmentId });
  if (source.kind === "customer") return api.getCustomerExplanation(source.customerId);
  return api.getAudienceExplanation({ rules: source.rules, combinator: source.combinator });
}
function WhyThisAudience({
  source,
  density = "full",
  title = "Why this audience?",
  defaultOpen = false,
  trackDeltas = false,
  className
}) {
  const [localEvidence, setLocalEvidence] = reactExports.useState(false);
  const [globalEvidence] = useShowEvidencePref();
  const { data, isFetching, refetch } = useQuery({
    queryKey: sourceKey(source),
    queryFn: () => fetchExplanation(source)
  });
  const prevRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!trackDeltas || !data) return;
    prevRef.current = {
      signals: Object.fromEntries(data.signals.map((s) => [s.id, s.rawValue])),
      size: data.audienceSize
    };
  }, [data, trackDeltas]);
  const prev = trackDeltas ? prevRef.current : null;
  const sizeDelta = prev && data ? data.audienceSize - prev.size : 0;
  const compact = density === "compact";
  const showEvidence = globalEvidence || localEvidence;
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-xl border border-primary/25 bg-gradient-to-b from-primary/[0.06] to-transparent", compact ? "p-3" : "p-4", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-convert/15", compact ? "h-7 w-7" : "h-8 w-8"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: cn("text-primary", compact ? "h-4 w-4" : "h-4 w-4") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-semibold", compact ? "text-sm" : "text-base"), children: title })
      ] }),
      data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center justify-end gap-1.5 font-bold tabular-nums text-primary", compact ? "text-lg" : "text-2xl"), children: [
          trackDeltas && sizeDelta !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", sizeDelta > 0 ? "bg-success/15 text-success" : "bg-warning/15 text-warning"), children: [
            sizeDelta > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
            sizeDelta > 0 ? "+" : "",
            sizeDelta
          ] }),
          data.audienceSize
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wide text-muted-foreground", children: data.audienceSize === 1 ? "customer" : "customers" })
      ] })
    ] }),
    isFetching && !data ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyzingSteps, {}) : data ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("mt-2 italic text-foreground/90", compact ? "text-xs" : "text-sm"), children: [
        "“",
        data.summary,
        "”"
      ] }),
      !compact && data.signals.length > 0 && (globalEvidence ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex w-fit items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-success" }),
        " Evidence shown (on for all explanations · Settings)"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-3 flex w-fit cursor-pointer items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: localEvidence, onCheckedChange: setLocalEvidence, "aria-label": "Show evidence" }),
        "Show evidence"
      ] })),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: cn("mt-3 space-y-1.5"), "aria-label": "Audience signals", children: data.signals.map((s) => {
        const prevRaw = prev?.signals[s.id];
        const moved = trackDeltas && prevRaw !== void 0 && prevRaw !== s.rawValue;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SignalRow,
          {
            signal: s,
            showEvidence: compact ? globalEvidence : showEvidence,
            delta: moved ? { dir: s.rawValue > prevRaw ? "up" : "down", from: formatPrev(s, prevRaw) } : void 0
          },
          s.id
        );
      }) }),
      data.comparableCampaigns && data.comparableCampaigns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 border-t pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Comparable campaigns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: data.comparableCampaigns.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: c.channel, className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "· ",
            channelMeta[c.channel].label,
            " ·"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold tabular-nums text-convert", children: [
            Math.round(c.conversionRate * 100),
            "% converted"
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between border-t pt-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " Signals computed from your customer data · phrased by AI"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => refetch(),
            disabled: isFetching,
            className: "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50",
            children: [
              isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
              "Regenerate"
            ]
          }
        )
      ] })
    ] }) : null
  ] });
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { defaultOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleTrigger, { className: "group flex items-center gap-1 text-xs font-medium text-primary hover:underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
        " ",
        title,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 transition-transform group-data-[state=open]:rotate-180" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: body }) })
    ] });
  }
  return body;
}
const WEIGHT_CHIP = {
  high: "bg-primary/15 text-primary border-primary/30"
};
function formatPrev(signal, raw) {
  switch (signal.kind) {
    case "currency":
      return `₹${Math.round(raw).toLocaleString("en-IN")}`;
    case "percent":
      return `${Math.round(raw * 100)}%`;
    case "days":
      return `${Math.round(raw)}d`;
    case "count":
      return `${Math.round(raw * 10) / 10}`;
    default:
      return `${raw}`;
  }
}
function SignalRow({
  signal,
  showEvidence,
  delta
}) {
  const Icon = KIND_ICON[signal.kind];
  const high = signal.weight === "high";
  const Trend = signal.trend === "up" ? TrendingUp : signal.trend === "down" ? TrendingDown : Minus;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.li,
    {
      animate: delta ? { backgroundColor: ["oklch(0.62 0.21 277 / 0.18)", "oklch(0.62 0.21 277 / 0)"] } : void 0,
      transition: { duration: 1.2 },
      className: cn("rounded-lg border px-2.5 py-2", high ? "border-primary/30 bg-primary/[0.05]" : "border-transparent bg-muted/30"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-3.5 w-3.5 shrink-0", high ? "text-primary" : "text-muted-foreground") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs", high ? "font-medium text-foreground" : "text-muted-foreground"), children: signal.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
            delta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums", delta.dir === "up" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"), children: [
              delta.dir === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
              delta.from,
              " →"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm font-semibold tabular-nums", high && "text-primary"), children: signal.value }),
            signal.trend && /* @__PURE__ */ jsxRuntimeExports.jsx(Trend, { className: cn("h-3 w-3", signal.trend === "up" ? "text-success" : signal.trend === "down" ? "text-warning" : "text-muted-foreground") }),
            high && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("hidden rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase sm:inline-block", WEIGHT_CHIP.high), children: "key factor" })
          ] })
        ] }),
        signal.kind === "percent" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: cn("h-full rounded-full", high ? "bg-primary" : "bg-muted-foreground/50"),
            initial: { width: 0 },
            animate: { width: `${Math.min(100, signal.rawValue * 100)}%` },
            transition: { duration: 0.7, ease: "easeOut" }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: (showEvidence || signal.kind === "text") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "mt-1 pl-5 text-[11px] text-muted-foreground",
            children: signal.evidence
          }
        ) })
      ]
    }
  );
}
export {
  WhyThisAudience as W
};
