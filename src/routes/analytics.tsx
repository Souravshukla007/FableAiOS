import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { api } from "@/lib/api";
import { formatINR, formatINRShort } from "@/lib/format";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChannelIcon } from "@/components/shared/badges";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { Channel } from "@/lib/types";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Fable" }] }),
  component: Analytics,
});

const TT = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 };

function Analytics() {
  const channels = useQuery({ queryKey: ["channelCompare"], queryFn: api.getChannelComparison });
  const trend = useQuery({ queryKey: ["trend"], queryFn: api.getEngagementTrend });
  const campaigns = useQuery({ queryKey: ["campaigns"], queryFn: api.getCampaigns });
  const segs = useQuery({ queryKey: ["segments"], queryFn: api.getSegments });
  const [range, setRange] = useState("30");
  const [chFilter, setChFilter] = useState("all");

  const filteredCh = (channels.data ?? []).filter((c) => chFilter === "all" || c.channel === chFilter);
  const bestSegments = (segs.data ?? [])
    .map((s) => {
      const camps = (campaigns.data ?? []).filter((c) => c.segmentId === s.id);
      const revenue = camps.reduce((a, c) => a + c.stats.attributedRevenue, 0);
      return { name: s.name, campaigns: camps.length, revenue };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);

  return (
    <AppLayout>
      <PageHeader
        title="Analytics"
        description="Cross-campaign performance and attribution"
        action={
          <div className="flex gap-2">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chFilter} onValueChange={setChFilter}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All channels</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="rcs">RCS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Channel comparison</h3>
          {channels.isLoading ? <Skeleton className="h-64 w-full" /> : (
            <ResponsiveContainer width="100%" height={256}>
              <BarChart data={filteredCh}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="channel" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={TT} cursor={{ fill: "var(--color-muted)", opacity: 0.4 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="delivered" fill="var(--color-success)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="opened" fill="var(--color-info)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="clicked" fill="var(--color-convert)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Engagement trends</h3>
          {trend.isLoading ? <Skeleton className="h-64 w-full" /> : (
            <ResponsiveContainer width="100%" height={256}>
              <LineChart data={trend.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                <Tooltip contentStyle={TT} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="open" stroke="var(--color-info)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="click" stroke="var(--color-convert)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="conversion" stroke="var(--color-success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Best-performing segments</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="pb-2 font-medium">Segment</th><th className="pb-2 text-right font-medium">Campaigns</th><th className="pb-2 text-right font-medium">Revenue</th></tr></thead>
            <tbody>
              {bestSegments.map((s) => (
                <tr key={s.name} className="border-b last:border-0">
                  <td className="py-2.5 font-medium">{s.name}</td>
                  <td className="py-2.5 text-right tabular-nums">{s.campaigns}</td>
                  <td className="py-2.5 text-right tabular-nums font-medium">{formatINRShort(s.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Revenue attribution by channel</h3>
          <div className="space-y-3">
            {(channels.data ?? []).map((c) => {
              const total = (channels.data ?? []).reduce((a, x) => a + x.revenue, 0) || 1;
              const pct = (c.revenue / total) * 100;
              return (
                <div key={c.channel}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 capitalize"><ChannelIcon channel={c.channel as Channel} /> {c.channel}</span>
                    <span className="font-medium tabular-nums">{formatINR(c.revenue)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
