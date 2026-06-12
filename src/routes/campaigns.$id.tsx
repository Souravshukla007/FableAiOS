import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Sparkles, Loader2, ArrowRight, CheckCircle2, MinusCircle, AlertTriangle, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { formatINR, formatPct } from "@/lib/format";
import type { CampaignStats } from "@/lib/types";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { StatusBadge, ChannelIcon, ConfidenceBadge } from "@/components/shared/badges";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaigns/$id")({
  head: () => ({ meta: [{ title: "Campaign — Fable" }] }),
  component: CampaignDetail,
});

const FUNNEL_STEPS = [
  { key: "sent", label: "Sent", color: "bg-muted-foreground" },
  { key: "delivered", label: "Delivered", color: "bg-info" },
  { key: "opened", label: "Opened", color: "bg-primary" },
  { key: "read", label: "Read", color: "bg-primary/70" },
  { key: "clicked", label: "Clicked", color: "bg-warning" },
  { key: "converted", label: "Converted", color: "bg-convert" },
] as const;

function CampaignDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: c, isLoading } = useQuery({ queryKey: ["campaign", id], queryFn: () => api.getCampaign(id) });
  const analysis = useQuery({ queryKey: ["analysis", id], queryFn: () => api.getCampaignAnalysis(id), enabled: !!c });

  // Live simulation while the campaign is sending.
  useEffect(() => {
    if (c?.status !== "sending") return;
    const interval = setInterval(async () => {
      await api.tickCampaignStats(id);
      qc.invalidateQueries({ queryKey: ["campaign", id] });
    }, 1200);
    return () => clearInterval(interval);
  }, [c?.status, id, qc]);

  if (isLoading) return <AppLayout><Skeleton className="h-96 w-full rounded-xl" /></AppLayout>;
  if (!c) return <AppLayout><div className="p-12 text-center text-muted-foreground">Campaign not found.</div></AppLayout>;

  const s = c.stats;
  const p = c.prediction;
  const live = c.status === "sending";

  const compare = p
    ? [
        { metric: "Delivery", predicted: p.expectedDeliveryRate, actual: s.sent ? s.delivered / s.sent : 0 },
        { metric: "Open", predicted: p.expectedOpenRate, actual: s.delivered ? s.opened / s.delivered : 0 },
        { metric: "Click", predicted: p.expectedClickRate, actual: s.delivered ? s.clicked / s.delivered : 0 },
        { metric: "Convert", predicted: p.expectedConversionRate, actual: s.delivered ? s.converted / s.delivered : 0 },
      ]
    : [];

  return (
    <AppLayout>
      <PageHeader
        title={c.name}
        description={c.goal}
        action={
          <div className="flex items-center gap-2">
            {live && <span className="inline-flex items-center gap-1 text-xs font-medium text-warning"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" /> Live</span>}
            <ChannelIcon channel={c.channel} />
            <StatusBadge status={c.status} />
          </div>
        }
      />

      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold">Conversion funnel</h3>
        <FunnelViz stats={s} />
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Prediction vs actual</h3>
            {p && <ConfidenceBadge confidence={p.confidence} />}
          </div>
          {p ? (
            <div className="space-y-4">
              {compare.map((row) => (
                <PvARow key={row.metric} {...row} live={live} />
              ))}
              <div className="flex items-center justify-between rounded-lg bg-muted p-3 text-sm">
                <span className="text-muted-foreground">Attributed revenue</span>
                <span className="font-semibold tabular-nums">
                  {formatINR(s.attributedRevenue)}
                  {p && <span className="ml-2 text-xs font-normal text-muted-foreground">vs {formatINR(p.expectedRevenueMin)}–{formatINR(p.expectedRevenueMax)}</span>}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No prediction recorded for this campaign.</p>
          )}
        </Card>

        <Card className="border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> AI Campaign Post-Mortem
          </div>
          {analysis.isLoading || !analysis.data ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Analysing performance…</div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <p className="text-sm text-muted-foreground">{analysis.data.summary}</p>
              <div className="space-y-2">
                {analysis.data.factors.map((f) => (
                  <div key={f.label} className="flex gap-2.5 rounded-lg border bg-card/60 p-3">
                    <VerdictIcon verdict={f.verdict} />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{f.label}</div>
                      <div className="text-sm">{f.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-convert/30 bg-convert/5 p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-convert">
                  <ArrowRight className="h-3.5 w-3.5" /> Recommended next action
                </div>
                <div className="mt-1 text-sm font-medium">{analysis.data.nextAction.title}</div>
                <p className="mt-0.5 text-sm text-muted-foreground">{analysis.data.nextAction.detail}</p>
                <Button
                  className="mt-3 gap-1.5"
                  size="sm"
                  onClick={() =>
                    navigate({ to: "/jarvis", search: { goal: analysis.data!.nextAction.goal } })
                  }
                >
                  <Rocket className="h-4 w-4" /> Create follow-up campaign
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}

function FunnelViz({ stats }: { stats: CampaignStats }) {
  const s = stats as unknown as Record<string, number>;
  const top = Math.max(1, stats.sent);
  return (
    <div className="space-y-2.5">
      {FUNNEL_STEPS.map((step, i) => {
        const value = s[step.key] ?? 0;
        const widthPct = (value / top) * 100;
        const prev = i === 0 ? value : s[FUNNEL_STEPS[i - 1].key] ?? 0;
        const dropOff = i === 0 || prev === 0 ? 0 : (1 - value / prev) * 100;
        const ofTotal = top ? (value / top) * 100 : 0;
        return (
          <div key={step.key}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">{step.label}</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="tabular-nums text-foreground">{value.toLocaleString("en-IN")}</span>
                <span className="tabular-nums">({ofTotal.toFixed(0)}%)</span>
                {i > 0 && dropOff > 0 && (
                  <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                    −{dropOff.toFixed(0)}%
                  </span>
                )}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <motion.div
                className={cn("h-full rounded-full", step.color)}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(widthPct, value > 0 ? 2 : 0)}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PvARow({ metric, predicted, actual, live }: { metric: string; predicted: number; actual: number; live: boolean }) {
  const diff = actual - predicted;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium">{metric}</span>
        <span className="flex items-center gap-2 tabular-nums">
          <span className="text-muted-foreground">pred {formatPct(predicted)}</span>
          <span className="font-semibold">act {formatPct(actual)}</span>
          {!live && Math.abs(diff) >= 0.005 && (
            <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", diff >= 0 ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive")}>
              {diff >= 0 ? "+" : ""}{(diff * 100).toFixed(0)}pp
            </span>
          )}
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/40" style={{ width: `${Math.min(100, predicted * 100)}%` }} />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, actual * 100)}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function VerdictIcon({ verdict }: { verdict: "positive" | "neutral" | "negative" }) {
  if (verdict === "positive") return <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />;
  if (verdict === "negative") return <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />;
  return <MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />;
}
