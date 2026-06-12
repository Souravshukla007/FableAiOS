import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Brain, RefreshCw, ChevronDown, IndianRupee, Percent, Hash, CalendarClock,
  Type, TrendingUp, TrendingDown, Minus, Loader2, Sparkles, Check, Users, MessageSquare, History,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type {
  AudienceExplanation, ExplanationSignal, SegmentRule, RuleCombinator, SignalKind,
} from "@/lib/types";
import { ChannelIcon, channelMeta } from "@/components/shared/badges";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";

import { useShowEvidencePref } from "@/lib/preferences";
import { cn } from "@/lib/utils";

const ANALYZE_STEPS = [
  { icon: Users, label: "Scanning customers" },
  { icon: IndianRupee, label: "Aggregating spend" },
  { icon: MessageSquare, label: "Checking channel engagement" },
  { icon: History, label: "Comparing past campaigns" },
] as const;

function AnalyzingSteps() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, ANALYZE_STEPS.length)), 550);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2 text-xs font-medium text-primary">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analyzing audience…
      </div>
      <ul className="space-y-1.5" aria-label="Analysis steps">
        {ANALYZE_STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          const Icon = s.icon;
          return (
            <li
              key={s.label}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors",
                done ? "text-foreground" : active ? "bg-primary/[0.06] text-foreground" : "text-muted-foreground/60",
              )}
            >
              <span className={cn("flex h-4 w-4 items-center justify-center", done ? "text-success" : active ? "text-primary" : "text-muted-foreground/50")}>
                {done ? <Check className="h-3.5 w-3.5" /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />}
              </span>
              {s.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type ExplainSource =
  | { kind: "segment"; segmentId: string }
  | { kind: "rules"; rules: SegmentRule[]; combinator: RuleCombinator }
  | { kind: "customer"; customerId: string };

const KIND_ICON: Record<SignalKind, typeof Hash> = {
  currency: IndianRupee,
  percent: Percent,
  count: Hash,
  days: CalendarClock,
  text: Type,
};

function sourceKey(source: ExplainSource): unknown[] {
  if (source.kind === "segment") return ["explain", "segment", source.segmentId];
  if (source.kind === "customer") return ["explain", "customer", source.customerId];
  return ["explain", "rules", source.rules, source.combinator];
}

function fetchExplanation(source: ExplainSource): Promise<AudienceExplanation> {
  if (source.kind === "segment") return api.getAudienceExplanation({ segmentId: source.segmentId });
  if (source.kind === "customer") return api.getCustomerExplanation(source.customerId);
  return api.getAudienceExplanation({ rules: source.rules, combinator: source.combinator });
}

export function WhyThisAudience({
  source,
  density = "full",
  title = "Why this audience?",
  defaultOpen = false,
  trackDeltas = false,
  className,
}: {
  source: ExplainSource;
  density?: "full" | "compact";
  title?: string;
  defaultOpen?: boolean;
  trackDeltas?: boolean;
  className?: string;
}) {
  const [localEvidence, setLocalEvidence] = useState(false);
  const [globalEvidence] = useShowEvidencePref();
  const { data, isFetching, refetch } = useQuery({
    queryKey: sourceKey(source),
    queryFn: () => fetchExplanation(source),
  });

  // Track previous signal/audience values so we can show real-time deltas.
  const prevRef = useRef<{ signals: Record<string, number>; size: number } | null>(null);
  useEffect(() => {
    if (!trackDeltas || !data) return;
    prevRef.current = {
      signals: Object.fromEntries(data.signals.map((s) => [s.id, s.rawValue])),
      size: data.audienceSize,
    };
  }, [data, trackDeltas]);
  const prev = trackDeltas ? prevRef.current : null;
  const sizeDelta = prev && data ? data.audienceSize - prev.size : 0;

  const compact = density === "compact";
  const showEvidence = globalEvidence || localEvidence;


  const body = (
    <div className={cn("rounded-xl border border-primary/25 bg-gradient-to-b from-primary/[0.06] to-transparent", compact ? "p-3" : "p-4", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn("flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-convert/15", compact ? "h-7 w-7" : "h-8 w-8")}>
            <Brain className={cn("text-primary", compact ? "h-4 w-4" : "h-4 w-4")} />
          </span>
          <span className={cn("font-semibold", compact ? "text-sm" : "text-base")}>{title}</span>
        </div>
        {data && (
          <div className="text-right leading-tight">
            <div className={cn("flex items-center justify-end gap-1.5 font-bold tabular-nums text-primary", compact ? "text-lg" : "text-2xl")}>
              {trackDeltas && sizeDelta !== 0 && (
                <span className={cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", sizeDelta > 0 ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
                  {sizeDelta > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {sizeDelta > 0 ? "+" : ""}{sizeDelta}
                </span>
              )}
              {data.audienceSize}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {data.audienceSize === 1 ? "customer" : "customers"}
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {isFetching && !data ? (
        <AnalyzingSteps />
      ) : data ? (
        <>
          <p className={cn("mt-2 italic text-foreground/90", compact ? "text-xs" : "text-sm")}>
            &ldquo;{data.summary}&rdquo;
          </p>

          {/* Evidence toggle */}
          {!compact && data.signals.length > 0 && (
            globalEvidence ? (
              <div className="mt-3 flex w-fit items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-success" /> Evidence shown (on for all explanations · Settings)
              </div>
            ) : (
              <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <Switch checked={localEvidence} onCheckedChange={setLocalEvidence} aria-label="Show evidence" />
                Show evidence
              </label>
            )
          )}

          {/* Signals */}
          <ul className={cn("mt-3 space-y-1.5")} aria-label="Audience signals">
            {data.signals.map((s) => {
              const prevRaw = prev?.signals[s.id];
              const moved = trackDeltas && prevRaw !== undefined && prevRaw !== s.rawValue;
              return (
                <SignalRow
                  key={s.id}
                  signal={s}
                  showEvidence={compact ? globalEvidence : showEvidence}
                  delta={moved ? { dir: s.rawValue > (prevRaw as number) ? "up" : "down", from: formatPrev(s, prevRaw as number) } : undefined}
                />
              );
            })}
          </ul>



          {/* Comparable campaigns */}
          {data.comparableCampaigns && data.comparableCampaigns.length > 0 && (
            <div className="mt-3 border-t pt-3">
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Comparable campaigns
              </div>
              <div className="space-y-1">
                {data.comparableCampaigns.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <ChannelIcon channel={c.channel} className="h-3.5 w-3.5" />
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground">· {channelMeta[c.channel].label} ·</span>
                    <span className="font-semibold tabular-nums text-convert">
                      {Math.round(c.conversionRate * 100)}% converted
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t pt-2.5">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Sparkles className="h-3 w-3" /> Signals computed from your customer data · phrased by AI
            </span>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
            >
              {isFetching ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
              Regenerate
            </button>
          </div>
        </>
      ) : null}
    </div>
  );

  // Compact mode wraps in a collapsible "Why this audience?" expander.
  if (compact) {
    return (
      <Collapsible defaultOpen={defaultOpen}>
        <CollapsibleTrigger className="group flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          <Brain className="h-3.5 w-3.5" /> {title}
          <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2">{body}</div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return body;
}

const WEIGHT_CHIP: Record<string, string> = {
  high: "bg-primary/15 text-primary border-primary/30",
  medium: "bg-muted text-muted-foreground border-border",
  low: "bg-muted text-muted-foreground border-border",
};

function formatPrev(signal: ExplanationSignal, raw: number): string {
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
  delta,
}: {
  signal: ExplanationSignal;
  showEvidence: boolean;
  delta?: { dir: "up" | "down"; from: string };
}) {
  const Icon = KIND_ICON[signal.kind];
  const high = signal.weight === "high";
  const Trend = signal.trend === "up" ? TrendingUp : signal.trend === "down" ? TrendingDown : Minus;

  return (
    <motion.li
      animate={delta ? { backgroundColor: ["oklch(0.62 0.21 277 / 0.18)", "oklch(0.62 0.21 277 / 0)"] } : undefined}
      transition={{ duration: 1.2 }}
      className={cn("rounded-lg border px-2.5 py-2", high ? "border-primary/30 bg-primary/[0.05]" : "border-transparent bg-muted/30")}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("h-3.5 w-3.5 shrink-0", high ? "text-primary" : "text-muted-foreground")} />
        <span className={cn("text-xs", high ? "font-medium text-foreground" : "text-muted-foreground")}>{signal.label}</span>
        <div className="ml-auto flex items-center gap-1.5">
          {delta && (
            <span className={cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums", delta.dir === "up" ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
              {delta.dir === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {delta.from} →
            </span>
          )}
          <span className={cn("text-sm font-semibold tabular-nums", high && "text-primary")}>{signal.value}</span>
          {signal.trend && (
            <Trend className={cn("h-3 w-3", signal.trend === "up" ? "text-success" : signal.trend === "down" ? "text-warning" : "text-muted-foreground")} />
          )}
          {high && (
            <span className={cn("hidden rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase sm:inline-block", WEIGHT_CHIP.high)}>
              key factor
            </span>
          )}
        </div>
      </div>


      {/* Inline bar for percents */}
      {signal.kind === "percent" && (
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className={cn("h-full rounded-full", high ? "bg-primary" : "bg-muted-foreground/50")}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, signal.rawValue * 100)}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
      )}

      <AnimatePresence initial={false}>
        {(showEvidence || signal.kind === "text") && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 pl-5 text-[11px] text-muted-foreground"
          >
            {signal.evidence}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
