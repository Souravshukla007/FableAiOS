import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from "recharts";
import { Users, Send, MailOpen, IndianRupee, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { formatINRShort, formatPct, relativeTime, formatINR } from "@/lib/format";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge, ChannelIcon } from "@/components/shared/badges";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — Fable" }] }),
  component: Dashboard,
});

const lifecycleColors: Record<string, string> = {
  new: "var(--color-info)",
  active: "var(--color-success)",
  at_risk: "var(--color-warning)",
  dormant: "var(--color-muted-foreground)",
  vip: "var(--color-convert)",
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {children}
    </Card>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const kpis = useQuery({ queryKey: ["kpis"], queryFn: api.getDashboardKPIs });
  const revenue = useQuery({ queryKey: ["revenueWeek"], queryFn: api.getRevenueByWeek });
  const campaigns = useQuery({ queryKey: ["campaigns"], queryFn: api.getCampaigns });
  const lifecycle = useQuery({ queryKey: ["lifecycle"], queryFn: api.getLifecycleDistribution });
  const suggestions = useQuery({ queryKey: ["suggestions"], queryFn: api.getProactiveSuggestions });

  const recent = campaigns.data?.slice(0, 5) ?? [];

  const campaignPerf = (campaigns.data ?? [])
    .filter((c) => c.stats.sent > 0)
    .slice(0, 6)
    .map((c) => ({
      name: c.name.split(" — ")[0].slice(0, 14),
      sent: c.stats.sent,
      delivered: c.stats.delivered,
      opened: c.stats.opened,
      clicked: c.stats.clicked,
    }));

  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Your marketing performance at a glance"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
        ) : kpis.data ? (
          <>
            <StatCard label="Total Customers" value={kpis.data.totalCustomers} delta={kpis.data.customersDelta} icon={<Users className="h-4 w-4" />} />
            <StatCard label="Active Campaigns" value={kpis.data.activeCampaigns} delta={kpis.data.campaignsDelta} suffix="" icon={<Send className="h-4 w-4" />} />
            <StatCard label="Avg Open Rate" value={formatPct(kpis.data.avgOpenRate)} delta={kpis.data.openRateDelta} icon={<MailOpen className="h-4 w-4" />} />
            <StatCard label="Attributed Revenue" value={formatINRShort(kpis.data.attributedRevenue)} delta={kpis.data.revenueDelta} icon={<IndianRupee className="h-4 w-4" />} />
          </>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Revenue by week">
            {revenue.isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={256}>
                <AreaChart data={revenue.data}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatINRShort(v)} />
                  <Tooltip
                    contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                    formatter={(v: number) => [formatINR(v), "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        <ChartCard title="Lifecycle distribution">
          {lifecycle.isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={256}>
              <PieChart>
                <Pie data={lifecycle.data} dataKey="count" nameKey="stage" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {lifecycle.data?.map((e) => <Cell key={e.stage} fill={lifecycleColors[e.stage]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "var(--color-popover-foreground)" }}
                  itemStyle={{ color: "var(--color-popover-foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {lifecycle.data?.map((e) => (
              <span key={e.stage} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: lifecycleColors[e.stage] }} />
                {e.stage.replace("_", " ")} ({e.count})
              </span>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Campaign performance">
            {campaigns.isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={256}>
                <BarChart data={campaignPerf}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "var(--color-muted)", opacity: 0.4 }} />
                  <Bar dataKey="sent" fill="var(--color-muted-foreground)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="delivered" fill="var(--color-success)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="opened" fill="var(--color-info)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="clicked" fill="var(--color-convert)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* AI Suggestions */}
        {(suggestions.isLoading || (suggestions.data && suggestions.data.length > 0)) && (
        <Card className="overflow-hidden border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">AI Suggestions</h3>
          </div>
          <div className="space-y-3">
            {suggestions.isLoading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)
              : suggestions.data?.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-lg border bg-card p-3"
                  >
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <ChannelIcon channel={s.channel} />
                      {s.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-7 gap-1 px-2 text-xs text-primary"
                      onClick={() => {
                        toast.success("Opening Jarvis with this goal");
                        navigate({ to: "/jarvis", search: { goal: s.title } });
                      }}
                    >
                      {s.cta} <ArrowRight className="h-3 w-3" />
                    </Button>
                  </motion.div>
                ))}
          </div>
        </Card>
        )}
      </div>

      {/* Recent campaigns */}
      <Card className="mt-4 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Recent campaigns</h3>
          <Link to="/campaigns" className="text-xs font-medium text-primary hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="pb-2 font-medium">Campaign</th>
                <th className="pb-2 font-medium">Channel</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Audience</th>
                <th className="pb-2 text-right font-medium">Revenue</th>
                <th className="pb-2 text-right font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="py-2.5">
                    <Link to="/campaigns/$id" params={{ id: c.id }} className="font-medium hover:text-primary">
                      {c.name}
                    </Link>
                  </td>
                  <td className="py-2.5"><div className="flex items-center gap-1.5"><ChannelIcon channel={c.channel} /><span className="capitalize text-muted-foreground">{c.channel}</span></div></td>
                  <td className="py-2.5"><StatusBadge status={c.status} /></td>
                  <td className="py-2.5 text-right tabular-nums">{c.audienceSize}</td>
                  <td className="py-2.5 text-right tabular-nums">{formatINRShort(c.stats.attributedRevenue)}</td>
                  <td className="py-2.5 text-right text-muted-foreground">{relativeTime(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}
