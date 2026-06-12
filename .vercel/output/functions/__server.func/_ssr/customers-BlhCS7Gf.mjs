import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, P as PageHeader, C as Card, L as LifecycleBadge, B as Button, S as Sheet, l as SheetContent, m as SheetHeader, n as SheetTitle, o as homeSegmentForCustomer, d as api } from "./card-D1doNZif.mjs";
import { f as formatINR, r as relativeTime, b as formatDate } from "./format-XwfzrowQ.mjs";
import { W as WhyThisAudience } from "./WhyThisAudience-BkMtNsHS.mjs";
import { I as Input } from "./input-CEY0bw9T.mjs";
import { S as Skeleton } from "./skeleton-D_4UpKPQ.mjs";
import { B as Badge } from "./badge-k_4A8orp.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-6G4iUcMc.mjs";
import { a as Route$y } from "./router-bYr-bjNA.mjs";
import "../_libs/sonner.mjs";
import "../_libs/google__genai.mjs";
import { i as Search, A as ArrowUpDown, U as Users, a as Sparkles } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-collapsible.mjs";
import "./preferences-BDuSVRBv.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
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
const PAGE_SIZE = 12;
function Customers() {
  const {
    q: initialQ
  } = Route$y.useSearch();
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["customers"],
    queryFn: api.getCustomers
  });
  const [q, setQ] = reactExports.useState(initialQ ?? "");
  const [stage, setStage] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("totalSpend");
  const [asc, setAsc] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (initialQ !== void 0) {
      setQ(initialQ);
      setPage(0);
    }
  }, [initialQ]);
  const filtered = reactExports.useMemo(() => {
    let rows2 = data ?? [];
    if (q) rows2 = rows2.filter((c) => (c.name + c.email + c.city).toLowerCase().includes(q.toLowerCase()));
    if (stage !== "all") rows2 = rows2.filter((c) => c.lifecycleStage === stage);
    rows2 = [...rows2].sort((a, b) => {
      let v = 0;
      if (sort === "name") v = a.name.localeCompare(b.name);
      else if (sort === "lastOrderAt") v = +new Date(a.lastOrderAt) - +new Date(b.lastOrderAt);
      else v = a[sort] - b[sort];
      return asc ? v : -v;
    });
    return rows2;
  }, [data, q, stage, sort, asc]);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const rows = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  function toggleSort(k) {
    if (sort === k) setAsc((a) => !a);
    else {
      setSort(k);
      setAsc(false);
    }
    setPage(0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Customers", description: `${data?.length ?? 0} shoppers in your audience` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-4 flex flex-wrap items-center gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-48 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => {
          setQ(e.target.value);
          setPage(0);
        }, placeholder: "Search by name, email, city…", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: stage, onValueChange: (v) => {
        setStage(v);
        setPage(0);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All lifecycles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "new", children: "New" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "at_risk", children: "At Risk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "dormant", children: "Dormant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "vip", children: "VIP" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-sm text-destructive", children: "Failed to load customers. Please retry." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b bg-muted/40 text-left text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleSort("name"), className: "flex items-center gap-1 font-medium hover:text-foreground", children: [
          "Customer ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: "Lifecycle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleSort("orderCount"), className: "flex items-center gap-1 font-medium hover:text-foreground", children: [
          "Orders ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleSort("totalSpend"), className: "flex items-center gap-1 font-medium hover:text-foreground", children: [
          "Total Spend ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleSort("lastOrderAt"), className: "flex items-center gap-1 font-medium hover:text-foreground", children: [
          "Last Order ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? Array.from({
        length: 10
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }) }) }, i)) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "px-4 py-16 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }),
        "No customers match your filters."
      ] }) }) : rows.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { onClick: () => setSelected(c), className: "cursor-pointer border-b transition-colors last:border-0 hover:bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: c.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LifecycleBadge, { stage: c.lifecycleStage }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 tabular-nums", children: c.orderCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium tabular-nums", children: formatINR(c.totalSpend) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: relativeTime(c.lastOrderAt) })
      ] }, c.id)) })
    ] }) }) }),
    pageCount > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Page ",
        page + 1,
        " of ",
        pageCount
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", disabled: page === 0, onClick: () => setPage((p) => p - 1), children: "Previous" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", disabled: page >= pageCount - 1, onClick: () => setPage((p) => p + 1), children: "Next" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerDrawer, { customer: selected, onClose: () => setSelected(null) })
  ] });
}
function CustomerDrawer({
  customer,
  onClose
}) {
  const orders = useQuery({
    queryKey: ["orders", customer?.id],
    queryFn: () => api.getCustomerOrders(customer.id),
    enabled: !!customer
  });
  const insight = useQuery({
    queryKey: ["insight", customer?.id],
    queryFn: () => api.getCustomerInsight(customer.id),
    enabled: !!customer
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!customer, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { className: "w-full overflow-y-auto sm:max-w-md scrollbar-thin", children: customer && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-convert text-sm font-bold text-white", children: customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: customer.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-normal text-muted-foreground", children: [
          customer.city,
          " · ",
          customer.email
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 px-4 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LifecycleBadge, { stage: customer.lifecycleStage }),
        customer.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: t }, t))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total spend", value: formatINR(customer.totalSpend) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Orders", value: String(customer.orderCount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Avg order", value: formatINR(customer.avgOrderValue) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/30 bg-primary/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-1.5 text-sm font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          " AI insight"
        ] }),
        insight.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: insight.data })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WhyThisAudience, { source: {
        kind: "customer",
        customerId: customer.id
      }, density: "compact", title: `Why is this customer in ${homeSegmentForCustomer(customer).name}?` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-sm font-semibold", children: "Order history" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: orders.isLoading ? Array.from({
          length: 3
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) : orders.data?.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: formatINR(o.amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(o.placedAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: o.items.map((it) => `${it.qty}× ${it.name}`).join(", ") })
        ] }, o.id)) })
      ] })
    ] })
  ] }) }) });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-semibold tabular-nums", children: value })
  ] });
}
export {
  Customers as component
};
