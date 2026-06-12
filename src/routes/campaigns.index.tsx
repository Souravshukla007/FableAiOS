import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Send, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { formatINRShort, formatPct, relativeTime } from "@/lib/format";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { StatusBadge, ChannelIcon } from "@/components/shared/badges";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/campaigns/")({
  head: () => ({ meta: [{ title: "Campaigns — Fable" }] }),
  component: Campaigns,
});

function Campaigns() {
  const { data, isLoading } = useQuery({ queryKey: ["campaigns"], queryFn: api.getCampaigns });
  const segs = useQuery({ queryKey: ["segments"], queryFn: api.getSegments });
  const [q, setQ] = useState("");

  const segName = (id: string) => segs.data?.find((s) => s.id === id)?.name ?? "—";
  const rows = useMemo(
    () => (data ?? []).filter((c) => c.name.toLowerCase().includes(q.toLowerCase())),
    [data, q]
  );

  return (
    <AppLayout>
      <PageHeader
        title="Campaigns"
        description="All your marketing campaigns"
        action={<Button asChild className="gap-1.5"><Link to="/campaigns/new"><Plus className="h-4 w-4" /> New Campaign</Link></Button>}
      />

      <Card className="mb-4 p-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search campaigns…" className="max-w-sm" />
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Campaign</th>
                <th className="px-4 py-3 font-medium">Segment</th>
                <th className="px-4 py-3 font-medium">Channel</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Audience</th>
                <th className="px-4 py-3 text-right font-medium">Open rate</th>
                <th className="px-4 py-3 text-right font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b"><td colSpan={7} className="px-4 py-3"><Skeleton className="h-6 w-full" /></td></tr>
                ))
              ) : rows.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-muted-foreground">
                  <Send className="mx-auto mb-2 h-8 w-8 opacity-40" />No campaigns yet.
                </td></tr>
              ) : rows.map((c) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <Link to="/campaigns/$id" params={{ id: c.id }} className="font-medium hover:text-primary">{c.name}</Link>
                    <div className="text-xs text-muted-foreground">{relativeTime(c.createdAt)}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{segName(c.segmentId)}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><ChannelIcon channel={c.channel} /><span className="capitalize text-muted-foreground">{c.channel}</span></div></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-right tabular-nums">{c.audienceSize}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{c.stats.delivered ? formatPct(c.stats.opened / c.stats.delivered) : "—"}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">{formatINRShort(c.stats.attributedRevenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}
