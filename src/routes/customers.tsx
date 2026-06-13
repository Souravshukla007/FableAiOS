import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowUpDown, Users as UsersIcon } from "lucide-react";
import { api } from "@/lib/api";
import type { Customer, LifecycleStage } from "@/lib/types";
import { formatINR, formatDate, relativeTime } from "@/lib/format";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { LifecycleBadge } from "@/components/shared/badges";
import { WhyThisAudience } from "@/components/shared/WhyThisAudience";
import { homeSegmentForCustomer } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { JarvisIcon } from "@/components/shared/JarvisIcon";
import { Badge } from "@/components/ui/badge";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customers — Fable" }] }),
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  component: Customers,
});

type SortKey = "name" | "orderCount" | "totalSpend" | "lastOrderAt";
const PAGE_SIZE = 12;

function Customers() {
  const { q: initialQ } = Route.useSearch();
  const { data, isLoading, isError } = useQuery({ queryKey: ["customers"], queryFn: api.getCustomers });
  const [q, setQ] = useState(initialQ ?? "");
  const [stage, setStage] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("totalSpend");
  const [asc, setAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Customer | null>(null);

  // Keep filter input in sync when navigated from the global search palette.
  useEffect(() => {
    if (initialQ !== undefined) {
      setQ(initialQ);
      setPage(0);
    }
  }, [initialQ]);

  const filtered = useMemo(() => {
    let rows = data ?? [];
    if (q) rows = rows.filter((c) => (c.name + c.email + c.city).toLowerCase().includes(q.toLowerCase()));
    if (stage !== "all") rows = rows.filter((c) => c.lifecycleStage === stage);
    rows = [...rows].sort((a, b) => {
      let v = 0;
      if (sort === "name") v = a.name.localeCompare(b.name);
      else if (sort === "lastOrderAt") v = +new Date(a.lastOrderAt) - +new Date(b.lastOrderAt);
      else v = (a[sort] as number) - (b[sort] as number);
      return asc ? v : -v;
    });
    return rows;
  }, [data, q, stage, sort, asc]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const rows = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(k: SortKey) {
    if (sort === k) setAsc((a) => !a);
    else { setSort(k); setAsc(false); }
    setPage(0);
  }

  return (
    <AppLayout>
      <PageHeader title="Customers" description={`${data?.length ?? 0} shoppers in your audience`} />

      <Card className="mb-4 flex flex-wrap items-center gap-3 p-3">
        <div className="relative min-w-48 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search by name, email, city…" className="pl-9" />
        </div>
        <Select value={stage} onValueChange={(v) => { setStage(v); setPage(0); }}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All lifecycles</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="at_risk">At Risk</SelectItem>
            <SelectItem value="dormant">Dormant</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="overflow-hidden">
        {isError ? (
          <div className="p-12 text-center text-sm text-destructive">Failed to load customers. Please retry.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3"><button onClick={() => toggleSort("name")} className="flex items-center gap-1 font-medium hover:text-foreground">Customer <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-4 py-3 font-medium">City</th>
                  <th className="px-4 py-3 font-medium">Lifecycle</th>
                  <th className="px-4 py-3"><button onClick={() => toggleSort("orderCount")} className="flex items-center gap-1 font-medium hover:text-foreground">Orders <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-4 py-3"><button onClick={() => toggleSort("totalSpend")} className="flex items-center gap-1 font-medium hover:text-foreground">Total Spend <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-4 py-3"><button onClick={() => toggleSort("lastOrderAt")} className="flex items-center gap-1 font-medium hover:text-foreground">Last Order <ArrowUpDown className="h-3 w-3" /></button></th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b"><td colSpan={6} className="px-4 py-3"><Skeleton className="h-6 w-full" /></td></tr>
                    ))
                  : rows.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-16 text-center text-muted-foreground">
                      <UsersIcon className="mx-auto mb-2 h-8 w-8 opacity-40" />No customers match your filters.
                    </td></tr>
                  ) : rows.map((c) => (
                    <tr key={c.id} onClick={() => setSelected(c)} className="cursor-pointer border-b transition-colors last:border-0 hover:bg-muted/40">
                      <td className="px-4 py-3">
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.email}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.city}</td>
                      <td className="px-4 py-3"><LifecycleBadge stage={c.lifecycleStage} /></td>
                      <td className="px-4 py-3 tabular-nums">{c.orderCount}</td>
                      <td className="px-4 py-3 font-medium tabular-nums">{formatINR(c.totalSpend)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{relativeTime(c.lastOrderAt)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {page + 1} of {pageCount}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page >= pageCount - 1} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      )}

      <CustomerDrawer customer={selected} onClose={() => setSelected(null)} />
    </AppLayout>
  );
}

function CustomerDrawer({ customer, onClose }: { customer: Customer | null; onClose: () => void }) {
  const orders = useQuery({
    queryKey: ["orders", customer?.id],
    queryFn: () => api.getCustomerOrders(customer!.id),
    enabled: !!customer,
  });
  const insight = useQuery({
    queryKey: ["insight", customer?.id],
    queryFn: () => api.getCustomerInsight(customer!.id),
    enabled: !!customer,
  });

  return (
    <Sheet open={!!customer} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md scrollbar-thin">
        {customer && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-convert text-sm font-bold text-white">
                  {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <div>{customer.name}</div>
                  <div className="text-xs font-normal text-muted-foreground">{customer.city} · {customer.email}</div>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-5 px-4 pb-6">
              <div className="flex items-center gap-2">
                <LifecycleBadge stage={customer.lifecycleStage} />
                {customer.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat label="Total spend" value={formatINR(customer.totalSpend)} />
                <Stat label="Orders" value={String(customer.orderCount)} />
                <Stat label="Avg order" value={formatINR(customer.avgOrderValue)} />
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-primary">
                  <JarvisIcon className="h-4 w-4" /> AI insight
                </div>
                {insight.isLoading ? <Skeleton className="h-12 w-full" /> : <p className="text-sm text-muted-foreground">{insight.data}</p>}
              </div>

              <WhyThisAudience
                source={{ kind: "customer", customerId: customer.id }}
                density="compact"
                title={`Why is this customer in ${homeSegmentForCustomer(customer).name}?`}
              />


              <div>
                <h4 className="mb-2 text-sm font-semibold">Order history</h4>
                <div className="space-y-2">
                  {orders.isLoading
                    ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)
                    : orders.data?.map((o) => (
                        <div key={o.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{formatINR(o.amount)}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(o.placedAt)}</span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {o.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-semibold tabular-nums">{value}</div>
    </div>
  );
}
