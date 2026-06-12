import { useEffect, useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Activity, CheckCircle2, XCircle, RotateCcw, Gauge } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type { Communication, CommStatus, Channel } from "@/lib/types";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { CommStatusBadge, ChannelIcon } from "@/components/shared/badges";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/channel")({
  head: () => ({ meta: [{ title: "Channel Monitor — Fable" }] }),
  component: ChannelMonitor,
});

// Realistic per-tick transition probabilities for the callback lifecycle.
// Each entry maps a status to weighted next-status outcomes (must sum ~1).
const TRANSITIONS: Record<CommStatus, { to: CommStatus; p: number }[]> = {
  queued: [
    { to: "sent", p: 0.92 },
    { to: "failed", p: 0.08 },
  ],
  sent: [
    { to: "delivered", p: 0.9 },
    { to: "failed", p: 0.1 },
  ],
  delivered: [
    { to: "opened", p: 0.55 },
    { to: "delivered", p: 0.45 }, // stays — not everyone opens
  ],
  opened: [
    { to: "read", p: 0.7 },
    { to: "clicked", p: 0.1 },
    { to: "opened", p: 0.2 },
  ],
  read: [
    { to: "clicked", p: 0.35 },
    { to: "read", p: 0.65 },
  ],
  clicked: [
    { to: "converted", p: 0.4 },
    { to: "clicked", p: 0.6 },
  ],
  converted: [],
  failed: [], // handled separately via retry logic
};

const TERMINAL: CommStatus[] = ["converted"];

function weightedNext(status: CommStatus): CommStatus | null {
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
const channels: Channel[] = ["whatsapp", "sms", "email", "rcs"];

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

interface FeedItem extends Communication {
  updatedAt: string;
}

function ChannelMonitor() {
  const { data, isLoading } = useQuery({ queryKey: ["comms"], queryFn: api.getCommunications });
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [totals, setTotals] = useState({ delivered: 0, failed: 0, retried: 0, converted: 0 });
  const [throughput, setThroughput] = useState<{ t: string; events: number }[]>(
    Array.from({ length: 20 }, (_, i) => ({ t: `${i}`, events: 0 }))
  );
  const tick = useRef(0);
  const seq = useRef(0);

  useEffect(() => {
    if (data) {
      const now = new Date().toISOString();
      setFeed(
        data.slice(0, 24).map((c) => ({ ...c, status: "queued", retries: 0, updatedAt: now }))
      );
    }
  }, [data]);

  // Live callback simulation engine
  useEffect(() => {
    const id = setInterval(() => {
      setFeed((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const now = new Date().toISOString();
        let events = 0;
        let dDelivered = 0;
        let dFailed = 0;
        let dRetried = 0;
        let dConverted = 0;

        // advance a handful of random records each tick
        const moves = Math.min(next.length, 3 + Math.floor(Math.random() * 4));
        for (let i = 0; i < moves; i++) {
          const idx = Math.floor(Math.random() * next.length);
          const c = next[idx];
          if (TERMINAL.includes(c.status)) continue;

          if (c.status === "failed") {
            // retry path: failed events re-enter the stream as queued
            if (c.retries < MAX_RETRIES && Math.random() > 0.4) {
              next[idx] = {
                ...c,
                status: "queued",
                retries: c.retries + 1,
                updatedAt: now,
                timeline: [...c.timeline, { status: "queued", at: now }],
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
            timeline: [...c.timeline, { status: ns, at: now }],
          };
          if (ns === "delivered") dDelivered++;
          if (ns === "failed") dFailed++;
          if (ns === "converted") dConverted++;
          events++;
        }

        // inject a fresh inbound callback occasionally
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
            timeline: [{ status: "queued", at: now }],
          });
          events++;
          if (next.length > 48) next.pop();
        }

        tick.current++;
        setThroughput((tp) => [...tp.slice(1), { t: `${tick.current}`, events }]);
        setTotals((t) => ({
          delivered: t.delivered + dDelivered,
          failed: t.failed + dFailed,
          retried: t.retried + dRetried,
          converted: t.converted + dConverted,
        }));
        return next;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [data]);

  const inFlight = feed.filter((c) => ["queued", "sent"].includes(c.status)).length;
  const delivered = feed.filter((c) =>
    ["delivered", "opened", "read", "clicked", "converted"].includes(c.status)
  ).length;
  const failed = feed.filter((c) => c.status === "failed").length;
  const retried = feed.reduce((a, c) => a + c.retries, 0);
  const attempted = totals.delivered + totals.failed;
  const successRate = attempted > 0 ? totals.delivered / attempted : 0;

  return (
    <AppLayout>
      <PageHeader title="Channel Monitor" description="Live view of the asynchronous channel callback stream" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Counter label="In-flight" value={inFlight} icon={<Activity className="h-4 w-4 text-warning" />} pulse />
        <Counter label="Delivered" value={delivered} icon={<CheckCircle2 className="h-4 w-4 text-success" />} />
        <Counter label="Failed" value={failed} icon={<XCircle className="h-4 w-4 text-destructive" />} />
        <Counter label="Retried" value={retried} icon={<RotateCcw className="h-4 w-4 text-info" />} />
        <Counter
          label="Success rate"
          value={`${(successRate * 100).toFixed(1)}%`}
          icon={<Gauge className="h-4 w-4 text-success" />}
        />
      </div>

      <Card className="mt-4 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Throughput</h3>
          <span className="text-xs text-muted-foreground">events / tick (~1.4s)</span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={throughput}>
            <defs>
              <linearGradient id="tp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="events" stroke="var(--color-primary)" strokeWidth={2} fill="url(#tp)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card className="mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <span className="text-sm font-semibold">Live callback feed</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> streaming
          </span>
        </div>
        <div className="max-h-[480px] overflow-x-auto overflow-y-auto scrollbar-thin">
          {isLoading ? (
            <div className="space-y-2 p-4">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (
            <table className="w-full min-w-[560px] text-sm">
              <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2 font-medium">Event ID</th>
                  <th className="px-4 py-2 font-medium">Channel</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Updated</th>
                  <th className="px-4 py-2 text-right font-medium">Retries</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {feed.map((c) => (
                    <motion.tr
                      key={c.id}
                      layout
                      initial={{ opacity: 0, backgroundColor: "var(--color-accent)" }}
                      animate={{ opacity: 1, backgroundColor: "rgba(0,0,0,0)" }}
                      transition={{ duration: 0.5 }}
                      className="border-b last:border-0"
                    >
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{c.id.slice(0, 16)}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <ChannelIcon channel={c.channel} />
                          <span className="capitalize text-muted-foreground">{c.channel}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5"><CommStatusBadge status={c.status} /></td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground tabular-nums">{fmtTime(c.updatedAt)}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {c.retries ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-info/15 px-1.5 py-0.5 text-xs font-medium text-info">
                            <RotateCcw className="h-3 w-3" />{c.retries}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </AppLayout>
  );
}

function Counter({ label, value, icon, pulse }: { label: string; value: number | string; icon: React.ReactNode; pulse?: boolean }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={pulse ? "animate-pulse" : ""}>{icon}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
    </Card>
  );
}
