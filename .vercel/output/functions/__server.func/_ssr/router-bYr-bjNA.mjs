import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { PrismaClient } from "@prisma/client";
import process from "node:process";
import { G as GoogleGenAI } from "../_libs/google__genai.mjs";
import { a as arrayType, o as objectType, b as booleanType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
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
const appCss = "/assets/styles-BVtd7ZuL.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const MIGRATIONS = {
  "nexus-theme": "fable-theme",
  "nexus-show-evidence": "fable-show-evidence"
};
let done = false;
function migrateLocalStorage() {
  if (done || typeof window === "undefined") return;
  done = true;
  try {
    for (const [oldKey, newKey] of Object.entries(MIGRATIONS)) {
      const oldVal = localStorage.getItem(oldKey);
      if (oldVal !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, oldVal);
      }
      localStorage.removeItem(oldKey);
    }
  } catch {
  }
}
const Ctx = reactExports.createContext({ theme: "dark", toggle: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    migrateLocalStorage();
    const stored = typeof window !== "undefined" ? localStorage.getItem("fable-theme") : null;
    if (stored) setTheme(stored);
  }, []);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("fable-theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { theme, toggle: () => setTheme((t) => t === "dark" ? "light" : "dark") }, children });
}
const useTheme = () => reactExports.useContext(Ctx);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$C = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fable — AI Marketing Command Center" },
      { name: "description", content: "AI-native CRM for D2C brands: segment shoppers, send personalised campaigns across WhatsApp, SMS, Email & RCS, and let AI recommend the audience, channel and message." },
      { name: "author", content: "Fable" },
      { property: "og:title", content: "Fable — AI Marketing Command Center" },
      { property: "og:description", content: "AI-native marketing CRM for D2C brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$C.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$9 = () => import("./settings-CgXEAKRh.mjs");
const Route$B = createFileRoute("/settings")({
  head: () => ({
    meta: [{
      title: "Settings — Nexus"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./segments-bKb3kLSY.mjs");
const Route$A = createFileRoute("/segments")({
  head: () => ({
    meta: [{
      title: "Segments — Fable"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./jarvis-1v3dcr7m.mjs");
const Route$z = createFileRoute("/jarvis")({
  head: () => ({
    meta: [{
      title: "Jarvis — Fable"
    }]
  }),
  validateSearch: (s) => ({
    goal: typeof s.goal === "string" ? s.goal : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./customers-BlhCS7Gf.mjs");
const Route$y = createFileRoute("/customers")({
  head: () => ({
    meta: [{
      title: "Customers — Fable"
    }]
  }),
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./channel-BqKFyAkV.mjs");
const Route$x = createFileRoute("/channel")({
  head: () => ({
    meta: [{
      title: "Channel Monitor — Fable"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./analytics-BIb7mFDm.mjs");
const Route$w = createFileRoute("/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics — Fable"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-BFRIJXKx.mjs");
const Route$v = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Dashboard — Fable"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./campaigns.index-C08hd3uv.mjs");
const Route$u = createFileRoute("/campaigns/")({
  head: () => ({
    meta: [{
      title: "Campaigns — Fable"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./campaigns.new-2aF0SoD9.mjs");
const Route$t = createFileRoute("/campaigns/new")({
  head: () => ({
    meta: [{
      title: "New Campaign — Fable"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./campaigns._id-CD1UvhKW.mjs");
const Route$s = createFileRoute("/campaigns/$id")({
  head: () => ({
    meta: [{
      title: "Campaign — Fable"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
});
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
const SINGLETON_ID = "singleton";
const ALL_CHANNELS = ["whatsapp", "sms", "email", "rcs"];
const DEFAULTS = {
  brandName: "Saffron & Co."
};
function toAppSettings(row) {
  return {
    brandName: row.brandName,
    supportEmail: row.supportEmail,
    brandVoice: row.brandVoice,
    enabledChannels: row.enabledChannels.filter((c) => ALL_CHANNELS.includes(c)),
    proactiveSuggestions: row.proactiveSuggestions
  };
}
async function getSettings() {
  const row = await prisma.appSettings.upsert({
    where: { id: SINGLETON_ID },
    update: {},
    create: { id: SINGLETON_ID }
  });
  return toAppSettings(row);
}
async function updateSettings(patch) {
  const data = {};
  if (typeof patch.brandName === "string") data.brandName = patch.brandName.trim() || DEFAULTS.brandName;
  if (typeof patch.supportEmail === "string") data.supportEmail = patch.supportEmail.trim();
  if (typeof patch.brandVoice === "string") data.brandVoice = patch.brandVoice.trim();
  if (typeof patch.proactiveSuggestions === "boolean") data.proactiveSuggestions = patch.proactiveSuggestions;
  if (Array.isArray(patch.enabledChannels)) {
    const cleaned = patch.enabledChannels.filter((c) => ALL_CHANNELS.includes(c));
    data.enabledChannels = Array.from(new Set(cleaned));
  }
  const row = await prisma.appSettings.upsert({
    where: { id: SINGLETON_ID },
    update: data,
    create: { id: SINGLETON_ID, ...data }
  });
  return toAppSettings(row);
}
const ChannelEnum = enumType(["whatsapp", "sms", "email", "rcs"]);
const SettingsSchema = objectType({
  brandName: stringType().max(120).optional(),
  supportEmail: stringType().max(200).optional(),
  brandVoice: stringType().max(1e3).optional(),
  enabledChannels: arrayType(ChannelEnum).optional(),
  proactiveSuggestions: booleanType().optional()
}).strict();
const Route$r = createFileRoute("/api/settings")({
  server: {
    handlers: {
      GET: async () => Response.json(await getSettings()),
      PUT: async ({ request }) => {
        const raw = await request.json().catch(() => null);
        const parsed = SettingsSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: parsed.error.flatten() }, { status: 400 });
        }
        return Response.json(await updateSettings(parsed.data));
      }
    }
  }
});
const iso = (d) => d ? new Date(d).toISOString() : (/* @__PURE__ */ new Date(0)).toISOString();
const RANK$1 = {
  queued: 0,
  sent: 1,
  delivered: 2,
  opened: 3,
  read: 4,
  clicked: 5,
  converted: 6,
  failed: 1
};
const DELIVERED_SET = ["delivered", "opened", "read", "clicked", "converted"];
const OPENED_SET = ["opened", "read", "clicked", "converted"];
const READ_SET = ["read", "clicked", "converted"];
const CLICKED_SET = ["clicked", "converted"];
let _cache = null;
let _inflight = null;
const TTL_MS = 1e3;
async function loadStore() {
  const now = Date.now();
  if (_cache && now - _cache.at < TTL_MS) return _cache.store;
  if (_inflight) return _inflight;
  _inflight = loadStoreUncached().then((store) => {
    _cache = { at: Date.now(), store };
    _inflight = null;
    return store;
  }).catch((e) => {
    _inflight = null;
    throw e;
  });
  return _inflight;
}
async function loadStoreUncached() {
  const [customers, orders, segments, campaigns, comms] = await Promise.all([
    prisma.customer.findMany(),
    prisma.order.findMany({ orderBy: { placedAt: "desc" } }),
    prisma.segment.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.campaign.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.communication.findMany({ include: { events: { orderBy: { occurredAt: "asc" } } } })
  ]);
  const customerOut = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone ?? "",
    city: c.city ?? "",
    totalSpend: c.totalSpend,
    orderCount: c.orderCount,
    lastOrderAt: iso(c.lastOrderAt),
    firstOrderAt: iso(c.firstOrderAt),
    avgOrderValue: c.avgOrderValue,
    lifecycleStage: c.lifecycleStage,
    tags: c.tags
  }));
  const orderOut = orders.map((o) => ({
    id: o.id,
    customerId: o.customerId,
    amount: o.amount,
    items: o.items ?? [],
    placedAt: iso(o.placedAt),
    channel: o.channel ?? void 0
  }));
  const commOut = comms.map((cm) => ({
    id: cm.id,
    campaignId: cm.campaignId,
    customerId: cm.customerId,
    channel: cm.channel,
    status: cm.status,
    retries: cm.retries,
    timeline: cm.events.map((e) => ({ status: e.status, at: iso(e.occurredAt) }))
  }));
  const revenueByCampaign = /* @__PURE__ */ new Map();
  for (const cm of comms) {
    for (const e of cm.events) {
      if (e.status === "converted" && e.attributedAmount) {
        revenueByCampaign.set(cm.campaignId, (revenueByCampaign.get(cm.campaignId) ?? 0) + e.attributedAmount);
      }
    }
  }
  const commsByCampaign = /* @__PURE__ */ new Map();
  for (const cm of commOut) {
    const arr = commsByCampaign.get(cm.campaignId) ?? [];
    arr.push(cm);
    commsByCampaign.set(cm.campaignId, arr);
  }
  const statsFor = (campaignId) => {
    const list = commsByCampaign.get(campaignId) ?? [];
    const inSet = (s, set) => set.includes(s);
    return {
      sent: list.filter((c) => RANK$1[c.status] >= 1 || c.status === "failed").length,
      delivered: list.filter((c) => inSet(c.status, DELIVERED_SET)).length,
      failed: list.filter((c) => c.status === "failed").length,
      opened: list.filter((c) => inSet(c.status, OPENED_SET)).length,
      read: list.filter((c) => inSet(c.status, READ_SET)).length,
      clicked: list.filter((c) => inSet(c.status, CLICKED_SET)).length,
      converted: list.filter((c) => c.status === "converted").length,
      attributedRevenue: Math.round(revenueByCampaign.get(campaignId) ?? 0)
    };
  };
  const campaignOut = campaigns.map((c) => ({
    id: c.id,
    name: c.name,
    goal: c.goal ?? "",
    segmentId: c.segmentId,
    channel: c.channel,
    message: c.message,
    status: c.status,
    createdAt: iso(c.createdAt),
    sentAt: c.sentAt ? iso(c.sentAt) : void 0,
    audienceSize: c.audienceSize,
    prediction: c.predictionJson ?? void 0,
    stats: statsFor(c.id)
  }));
  const segmentOut = segments.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description ?? "",
    rulesText: s.rulesText ?? "",
    customerCount: s.customerCount,
    createdBy: s.createdBy,
    createdAt: iso(s.createdAt),
    aiReason: s.aiReason ?? void 0
  }));
  return {
    customers: customerOut,
    orders: orderOut,
    segments: segmentOut,
    campaigns: campaignOut,
    communications: commOut
  };
}
function channelMetaLabel(c) {
  return { whatsapp: "WhatsApp", sms: "SMS", email: "Email", rcs: "RCS" }[c];
}
function formatINRInline(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
function daysSince(isoStr) {
  return Math.floor((Date.now() - new Date(isoStr).getTime()) / 864e5);
}
function customerAttr(c, attr) {
  switch (attr) {
    case "totalSpend":
      return c.totalSpend;
    case "orderCount":
      return c.orderCount;
    case "lastOrderDays":
      return daysSince(c.lastOrderAt);
    case "city":
      return c.city.toLowerCase();
    case "lifecycleStage":
      return c.lifecycleStage;
  }
}
function matchRule(c, r) {
  const actual = customerAttr(c, r.attr);
  if (typeof actual === "number") {
    const v2 = parseFloat(r.value);
    if (Number.isNaN(v2)) return true;
    switch (r.op) {
      case ">":
        return actual > v2;
      case "<":
        return actual < v2;
      case ">=":
        return actual >= v2;
      case "<=":
        return actual <= v2;
      case "=":
        return actual === v2;
      case "!=":
        return actual !== v2;
    }
  }
  const v = r.value.trim().toLowerCase();
  if (!v) return true;
  return r.op === "!=" ? actual !== v : actual === v;
}
function customersByRules(store, rules, combinator) {
  if (rules.length === 0) return [];
  return store.customers.filter(
    (c) => combinator === "AND" ? rules.every((r) => matchRule(c, r)) : rules.some((r) => matchRule(c, r))
  );
}
function countByRules(store, rules, combinator) {
  return customersByRules(store, rules, combinator).length;
}
function rulesToText(rules, combinator) {
  if (rules.length === 0) return "All customers";
  return rules.map((r) => `${r.attr} ${r.op} ${r.value}`).join(` ${combinator} `);
}
function deriveStructuredRules(text) {
  const t = text.toLowerCase();
  const rules = [];
  const add = (attr, op, value) => rules.push({ id: `r_${rules.length}_${Math.random().toString(36).slice(2, 6)}`, attr, op, value });
  if (t.includes("dormant") || t.includes("haven't") || t.includes("lapsed") || /\b\d+\s*days?\b/.test(t)) {
    const m = t.match(/(\d+)\s*days?/);
    add("lastOrderDays", ">", m ? m[1] : "90");
  }
  if (t.includes("high") || t.includes("vip") || t.includes("value") || t.includes("loyal")) add("totalSpend", ">", "15000");
  if (t.includes("new") || t.includes("first")) add("orderCount", "=", "1");
  if (t.includes("repeat") || t.includes("regular")) add("orderCount", ">=", "2");
  if (t.includes("at risk") || t.includes("at-risk")) add("lifecycleStage", "=", "at_risk");
  const cityMatch = ["mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "pune", "kolkata"].find((c) => t.includes(c));
  if (cityMatch) add("city", "=", cityMatch);
  if (rules.length === 0) add("totalSpend", ">", "5000");
  const combinator = t.includes(" or ") ? "OR" : "AND";
  return { rules, combinator };
}
function deriveSegmentName(text) {
  const t = text.toLowerCase();
  if (t.includes("dormant") || t.includes("win")) return "AI: Dormant Win-Back Cohort";
  if (t.includes("vip") || t.includes("high")) return "AI: High-Value Cohort";
  if (t.includes("new") || t.includes("first")) return "AI: New Buyer Cohort";
  if (t.includes("coffee")) return "AI: Coffee Affinity Cohort";
  return "AI: Targeted Cohort";
}
const ENGAGED = ["opened", "read", "clicked", "converted"];
const SEGMENT_PREDICATES = {
  seg_vip: (c) => c.lifecycleStage === "vip",
  seg_dormant_hv: (c) => c.totalSpend > 1e4 && c.lifecycleStage === "dormant",
  seg_new: (c) => c.lifecycleStage === "new",
  seg_at_risk: (c) => c.lifecycleStage === "at_risk",
  seg_coffee: (c) => c.tags.includes("coffee-lover"),
  seg_skincare: (c) => c.tags.includes("skincare"),
  seg_discount: (c) => c.tags.includes("discount-seeker"),
  seg_active: (c) => c.lifecycleStage === "active"
};
function resolveAudience(store, input) {
  if (input.rules && input.rules.length) return customersByRules(store, input.rules, input.combinator ?? "AND");
  if (input.segmentId) {
    const pred = SEGMENT_PREDICATES[input.segmentId];
    if (pred) return store.customers.filter(pred);
    const seg = store.segments.find((s) => s.id === input.segmentId);
    if (seg) {
      const derived = deriveStructuredRules(seg.description || seg.rulesText || "");
      return customersByRules(store, derived.rules, derived.combinator);
    }
  }
  return [];
}
function channelAffinity(store, custIds) {
  const tally = {};
  for (const cm of store.communications) {
    if (!custIds.has(cm.customerId)) continue;
    const t = tally[cm.channel] ??= { total: 0, engaged: 0 };
    t.total++;
    if (ENGAGED.includes(cm.status)) t.engaged++;
  }
  let best = null;
  for (const [ch, t] of Object.entries(tally)) {
    if (t.total < 1) continue;
    const rate = t.engaged / t.total;
    if (!best || rate > best.rate) best = { channel: ch, rate };
  }
  return best;
}
function comparableCampaigns(store, segmentId, dominantStage) {
  const completed = store.campaigns.filter((c) => c.status === "completed" && c.stats.delivered > 0);
  const convRate = (c) => c.stats.converted / c.stats.delivered;
  let pool = completed.filter((c) => c.segmentId === segmentId);
  if (pool.length === 0) {
    pool = completed.filter((c) => {
      const seg = store.segments.find((s) => s.id === c.segmentId);
      return seg && SEGMENT_PREDICATES[seg.id] && store.customers.filter(SEGMENT_PREDICATES[seg.id]).some((x) => x.lifecycleStage === dominantStage);
    });
  }
  if (pool.length === 0) pool = completed;
  return pool.sort((a, b) => convRate(b) - convRate(a)).slice(0, 3).map((c) => ({ name: c.name.split(" — ")[0], channel: c.channel, conversionRate: convRate(c) }));
}
const STAGE_DESC = {
  vip: "high-value loyalists",
  dormant: "shoppers who've gone quiet",
  at_risk: "regulars whose cadence is slipping",
  new: "fresh first-time buyers",
  active: "engaged repeat buyers"
};
function emptyExplanation() {
  return { audienceSize: 0, summary: "No customers match this audience yet.", signals: [], generatedAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function buildExplanation(store, customers, meta) {
  const n = customers.length;
  if (n === 0) return emptyExplanation();
  const signals = [];
  const avgSpend = customers.reduce((s, c) => s + c.totalSpend, 0) / n;
  signals.push({ id: "avg_spend", label: "Average spend", value: formatINRInline(avgSpend), rawValue: Math.round(avgSpend), kind: "currency", evidence: `AVG(totalSpend) across ${n} customers`, weight: "high", trend: "up" });
  const avgDays = customers.reduce((s, c) => s + daysSince(c.lastOrderAt), 0) / n;
  signals.push({ id: "recency", label: "Recency", value: `${Math.round(avgDays)} days since last order`, rawValue: Math.round(avgDays), kind: "days", evidence: "mean days since lastOrderAt", weight: "high", trend: avgDays > 60 ? "down" : "flat" });
  const avgOrders = customers.reduce((s, c) => s + c.orderCount, 0) / n;
  signals.push({ id: "frequency", label: "Order frequency", value: `${avgOrders.toFixed(1)} orders avg`, rawValue: +avgOrders.toFixed(1), kind: "count", evidence: "AVG(orderCount)", weight: "medium" });
  const ids = new Set(customers.map((c) => c.id));
  const aff = channelAffinity(store, ids);
  if (aff) {
    signals.push({ id: "channel_affinity", label: `${channelMetaLabel(aff.channel)} engagement`, value: `${Math.round(aff.rate * 100)}%`, rawValue: +aff.rate.toFixed(3), kind: "percent", evidence: `opened/clicked rate on ${channelMetaLabel(aff.channel)} across this audience`, weight: "high", trend: aff.rate > 0.5 ? "up" : "flat" });
  }
  const mix = {};
  customers.forEach((c) => mix[c.lifecycleStage] = (mix[c.lifecycleStage] ?? 0) + 1);
  const [domStage, domCount] = Object.entries(mix).sort((a, b) => b[1] - a[1])[0];
  const domShare = domCount / n;
  signals.push({ id: "lifecycle", label: "Lifecycle mix", value: `${Math.round(domShare * 100)}% ${domStage.replace("_", " ")}`, rawValue: +domShare.toFixed(3), kind: "percent", evidence: `dominant lifecycleStage = ${domStage} (${domCount}/${n})`, weight: "medium" });
  const comps = comparableCampaigns(store, meta.segmentId, domStage);
  const descriptor = STAGE_DESC[domStage] ?? "targeted shoppers";
  const channelPart = aff && aff.rate >= 0.4 ? ` who respond well on ${channelMetaLabel(aff.channel)}` : "";
  const spendPart = avgSpend > 8e3 ? "High-value " : avgSpend > 4e3 ? "Mid-tier " : "";
  const summary = `${spendPart}${descriptor}${channelPart}.`.replace(/^./, (m) => m.toUpperCase());
  return { audienceSize: n, summary, signals, comparableCampaigns: comps.length ? comps : void 0, generatedAt: (/* @__PURE__ */ new Date()).toISOString() };
}
const LIFECYCLE_HOME_SEGMENT = {
  vip: "seg_vip",
  dormant: "seg_dormant_hv",
  at_risk: "seg_at_risk",
  new: "seg_new",
  active: "seg_active"
};
function homeSegmentForCustomer(store, c) {
  const id = LIFECYCLE_HOME_SEGMENT[c.lifecycleStage] ?? "seg_active";
  const seg = store.segments.find((s) => s.id === id);
  return { id, name: seg?.name ?? c.lifecycleStage.replace("_", " ") };
}
function rulesSatisfied(c) {
  const days = daysSince(c.lastOrderAt);
  switch (c.lifecycleStage) {
    case "vip":
      return [`totalSpend ${formatINRInline(c.totalSpend)} > ₹25,000`];
    case "dormant":
      return [`totalSpend ${formatINRInline(c.totalSpend)} > ₹10,000`, `${days} days since last order > 90`];
    case "at_risk":
      return [`${days} days since last order is within 46–75`];
    case "new":
      return [`orderCount = ${c.orderCount} (single purchase)`];
    default:
      return [`orderCount = ${c.orderCount} with last order ${days} days ago`];
  }
}
function buildCustomerExplanation(store, c) {
  const home = homeSegmentForCustomer(store, c);
  const peers = store.customers.filter((p) => p.lifecycleStage === c.lifecycleStage);
  const avgSpend = peers.length ? peers.reduce((s, p) => s + p.totalSpend, 0) / peers.length : c.totalSpend;
  const days = daysSince(c.lastOrderAt);
  const signals = [
    { id: "spend_vs_avg", label: "Spend vs segment avg", value: formatINRInline(c.totalSpend), rawValue: c.totalSpend, kind: "currency", evidence: `customer.totalSpend ${formatINRInline(c.totalSpend)} vs ${home.name} AVG ${formatINRInline(avgSpend)} (${peers.length} peers)`, weight: "high", trend: c.totalSpend > avgSpend * 1.05 ? "up" : c.totalSpend < avgSpend * 0.95 ? "down" : "flat" },
    { id: "recency", label: "Days since last order", value: `${days} days`, rawValue: days, kind: "days", evidence: `customer.lastOrderAt → ${days} days ago`, weight: "high", trend: days > 60 ? "down" : "flat" },
    { id: "orders", label: "Orders placed", value: `${c.orderCount} orders`, rawValue: c.orderCount, kind: "count", evidence: `customer.orderCount = ${c.orderCount}`, weight: "medium" }
  ];
  const aff = channelAffinity(store, /* @__PURE__ */ new Set([c.id]));
  if (aff) {
    signals.push({ id: "channel", label: `${channelMetaLabel(aff.channel)} engagement`, value: `${Math.round(aff.rate * 100)}%`, rawValue: +aff.rate.toFixed(3), kind: "percent", evidence: `opened/clicked rate on ${channelMetaLabel(aff.channel)} for ${c.name}`, weight: "high", trend: aff.rate > 0.5 ? "up" : "flat" });
  }
  const satisfied = rulesSatisfied(c);
  signals.push({ id: "rules", label: "Rules satisfied", value: `${satisfied.length} matched`, rawValue: satisfied.length, kind: "text", evidence: satisfied.join(" · "), weight: "medium" });
  const spendVerb = c.totalSpend > avgSpend * 1.05 ? "above" : c.totalSpend < avgSpend * 0.95 ? "below" : "in line with";
  return { audienceSize: 1, summary: `${c.name} sits in ${home.name} — spending ${spendVerb} the segment average and last active ${days} days ago.`, signals, generatedAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function customerInsight(c) {
  const map = {
    vip: `${c.name} is a top-tier customer (₹${c.totalSpend.toLocaleString("en-IN")} lifetime). High affinity for premium items — prioritise early access and concierge messaging on WhatsApp.`,
    dormant: `${c.name} hasn't ordered in a while despite a strong history. A win-back with a personalised incentive has strong reactivation odds in the next 30 days.`,
    at_risk: `${c.name}'s purchase cadence is slowing. A timely, value-led nudge now can prevent churn — avoid heavy discounting which trains price sensitivity.`,
    new: `${c.name} is a fresh customer. The second purchase is the most predictive of LTV — a gentle product-education sequence works best here.`,
    active: `${c.name} is an engaged repeat buyer. Cross-sell adjacent categories; they respond well to new-arrival announcements.`
  };
  return map[c.lifecycleStage] ?? "";
}
const Route$q = createFileRoute("/api/segments")({
  server: {
    handlers: {
      GET: async () => {
        const store = await loadStore();
        return Response.json(store.segments);
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const store = await loadStore();
        const rules = Array.isArray(body?.rules) ? body.rules : [];
        const combinator = body?.combinator === "OR" ? "OR" : "AND";
        const customerCount = typeof body?.customerCount === "number" ? body.customerCount : rules.length ? countByRules(store, rules, combinator) : 0;
        const created = await prisma.segment.create({
          data: {
            name: body?.name ?? "Untitled Segment",
            description: body?.description ?? "",
            rulesText: body?.rulesText ?? "",
            rulesJson: rules.length ? { op: combinator, conditions: rules } : { op: "AND", conditions: [] },
            customerCount,
            createdBy: body?.createdBy === "ai" ? "ai" : "marketer",
            aiReason: body?.aiReason ?? null
          }
        });
        const out = {
          id: created.id,
          name: created.name,
          description: created.description ?? "",
          rulesText: created.rulesText ?? "",
          customerCount: created.customerCount,
          createdBy: created.createdBy,
          createdAt: created.createdAt.toISOString(),
          aiReason: created.aiReason ?? void 0
        };
        return Response.json(out, { status: 201 });
      }
    }
  }
});
function toNotification(row) {
  return {
    id: row.id,
    kind: row.kind,
    severity: row.severity,
    title: row.title,
    body: row.body,
    link: row.link,
    entityType: row.entityType,
    entityId: row.entityId,
    readAt: row.readAt ? row.readAt.toISOString() : null,
    createdAt: row.createdAt.toISOString()
  };
}
async function createNotification(input) {
  if (input.entityId && input.dedupeWindowMs && input.dedupeWindowMs > 0) {
    const since = new Date(Date.now() - input.dedupeWindowMs);
    const exists = await prisma.notification.findFirst({
      where: {
        kind: input.kind,
        entityId: input.entityId,
        createdAt: { gte: since }
      },
      select: { id: true }
    });
    if (exists) return null;
  }
  const row = await prisma.notification.create({
    data: {
      kind: input.kind,
      severity: input.severity ?? "INFO",
      title: input.title,
      body: input.body ?? null,
      link: input.link ?? null,
      entityType: input.entityType ?? null,
      entityId: input.entityId ?? null
    }
  });
  return toNotification(row);
}
async function listNotifications(opts = {}) {
  const limit = Math.min(Math.max(opts.limit ?? 30, 1), 100);
  const rows = await prisma.notification.findMany({
    where: opts.unreadOnly ? { readAt: null } : void 0,
    orderBy: { createdAt: "desc" },
    take: limit
  });
  return rows.map(toNotification);
}
async function markNotificationRead(id) {
  try {
    const row = await prisma.notification.update({
      where: { id },
      data: { readAt: /* @__PURE__ */ new Date() }
    });
    return toNotification(row);
  } catch {
    return null;
  }
}
async function markAllNotificationsRead() {
  const r = await prisma.notification.updateMany({
    where: { readAt: null },
    data: { readAt: /* @__PURE__ */ new Date() }
  });
  return { updated: r.count };
}
const RANK = {
  queued: 0,
  sent: 1,
  delivered: 2,
  opened: 3,
  read: 4,
  clicked: 5,
  converted: 6,
  failed: 1
};
const ReceiptSchema = objectType({
  communicationId: stringType().min(1),
  status: enumType(["queued", "sent", "delivered", "failed", "opened", "read", "clicked", "converted"]),
  at: stringType().datetime().optional(),
  attempt: numberType().int().positive().optional(),
  meta: objectType({ reason: stringType().optional(), attributedAmount: numberType().optional() }).optional()
});
function deriveStatus(events) {
  let status = "queued";
  const successful = events.filter((e) => e.status !== "failed");
  const topSuccess = successful.reduce(
    (acc, e) => acc === null || RANK[e.status] > RANK[acc] ? e.status : acc,
    null
  );
  if (topSuccess && RANK[topSuccess] >= 2) status = topSuccess;
  else if (events.some((e) => e.status === "failed")) status = "failed";
  else if (topSuccess) status = topSuccess;
  const retries = events.reduce((m, e) => Math.max(m, e.attempt), 1) - 1;
  const lastEventAt = events.reduce((m, e) => e.occurredAt > m ? e.occurredAt : m, events[0]?.occurredAt ?? /* @__PURE__ */ new Date());
  return { status, retries: Math.max(0, retries), lastEventAt };
}
async function processOne(r) {
  const comm = await prisma.communication.findUnique({ where: { id: r.communicationId } });
  if (!comm) return { ok: false, reason: "unknown communicationId" };
  const attempt = r.attempt ?? 1;
  const occurredAt = r.at ? new Date(r.at) : /* @__PURE__ */ new Date();
  try {
    await prisma.communicationEvent.create({
      data: {
        communicationId: r.communicationId,
        status: r.status,
        attempt,
        attributedAmount: r.meta?.attributedAmount ?? null,
        occurredAt
      }
    });
  } catch (e) {
    const code = e?.code;
    if (code !== "P2002") throw e;
  }
  const events = await prisma.communicationEvent.findMany({
    where: { communicationId: r.communicationId },
    select: { status: true, attempt: true, occurredAt: true }
  });
  const derived = deriveStatus(events);
  await prisma.communication.update({
    where: { id: r.communicationId },
    data: { status: derived.status, retries: derived.retries, lastEventAt: derived.lastEventAt }
  });
  const inFlight = await prisma.communication.count({
    where: { campaignId: comm.campaignId, status: { in: ["queued", "sent"] } }
  });
  if (inFlight === 0) {
    const transition = await prisma.campaign.updateMany({
      where: { id: comm.campaignId, status: "sending" },
      data: { status: "completed" }
    });
    if (transition.count > 0) {
      const [campaign, deliveredCount, failedCount, totalCount] = await Promise.all([
        prisma.campaign.findUnique({ where: { id: comm.campaignId } }),
        prisma.communication.count({
          where: {
            campaignId: comm.campaignId,
            status: { in: ["delivered", "opened", "read", "clicked", "converted"] }
          }
        }),
        prisma.communication.count({
          where: { campaignId: comm.campaignId, status: "failed" }
        }),
        prisma.communication.count({ where: { campaignId: comm.campaignId } })
      ]);
      if (campaign) {
        const allFailed = totalCount > 0 && failedCount === totalCount;
        if (allFailed) {
          await prisma.campaign.update({
            where: { id: campaign.id },
            data: { status: "failed" }
          });
        }
        await createNotification({
          kind: allFailed ? "CAMPAIGN_FAILED" : "CAMPAIGN_DELIVERED",
          severity: allFailed ? "ERROR" : failedCount > 0 ? "WARN" : "SUCCESS",
          title: allFailed ? "Campaign failed" : "Campaign delivered",
          body: allFailed ? `${campaign.name}: all ${totalCount} sends failed.` : `${campaign.name}: ${deliveredCount}/${totalCount} delivered${failedCount > 0 ? `, ${failedCount} failed` : ""}.`,
          link: `/campaigns/${campaign.id}`,
          entityType: "campaign",
          entityId: campaign.id
        }).catch((e) => {
          console.error("[receipts] notification create failed:", e.message);
          return null;
        });
      }
    }
  }
  return { ok: true };
}
const Route$p = createFileRoute("/api/receipts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.json().catch(() => null);
        if (raw === null) return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
        const items = Array.isArray(raw) ? raw : [raw];
        const parsed = arrayType(ReceiptSchema).safeParse(items);
        if (!parsed.success) {
          return Response.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
        }
        const results = [];
        for (const r of parsed.data) results.push(await processOne(r));
        const accepted = results.filter((x) => x.ok).length;
        return Response.json({ ok: true, accepted, total: results.length, results });
      }
    }
  }
});
const Route$o = createFileRoute("/api/notifications")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const unreadOnly = url.searchParams.get("unread") === "true";
        const limitRaw = url.searchParams.get("limit");
        const limit = limitRaw ? Number(limitRaw) : void 0;
        const items = await listNotifications({
          unreadOnly,
          limit: Number.isFinite(limit) ? limit : void 0
        });
        return Response.json(items);
      }
    }
  }
});
const Route$n = createFileRoute("/api/customers")({
  server: {
    handlers: {
      GET: async () => {
        const store = await loadStore();
        return Response.json(store.customers);
      }
    }
  }
});
const Route$m = createFileRoute("/api/communications")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const campaignId = url.searchParams.get("campaignId");
        const store = await loadStore();
        const data = campaignId ? store.communications.filter((c) => c.campaignId === campaignId) : store.communications;
        return Response.json(data);
      }
    }
  }
});
const Route$l = createFileRoute("/api/campaigns")({
  server: {
    handlers: {
      GET: async () => {
        const store = await loadStore();
        return Response.json(store.campaigns);
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const segmentId = body?.segmentId;
        if (!segmentId) return Response.json({ error: "segmentId required" }, { status: 400 });
        const created = await prisma.campaign.create({
          data: {
            name: body?.name ?? body?.goal ?? "New Campaign",
            goal: body?.goal ?? "",
            segmentId,
            channel: body?.channel ?? "whatsapp",
            message: body?.message ?? "",
            status: body?.status ?? "draft",
            audienceSize: typeof body?.audienceSize === "number" ? body.audienceSize : 0,
            predictionJson: body?.prediction ?? null
          }
        });
        const out = {
          id: created.id,
          name: created.name,
          goal: created.goal ?? "",
          segmentId: created.segmentId,
          channel: created.channel,
          message: created.message,
          status: created.status,
          createdAt: created.createdAt.toISOString(),
          sentAt: created.sentAt ? created.sentAt.toISOString() : void 0,
          audienceSize: created.audienceSize,
          prediction: created.predictionJson ?? void 0,
          stats: { sent: 0, delivered: 0, failed: 0, opened: 0, read: 0, clicked: 0, converted: 0, attributedRevenue: 0 }
        };
        return Response.json(out, { status: 201 });
      }
    }
  }
});
const Route$k = createFileRoute("/api/segments/preview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const rules = Array.isArray(body?.rules) ? body.rules : [];
        const combinator = body?.combinator === "OR" ? "OR" : "AND";
        const store = await loadStore();
        return Response.json(countByRules(store, rules, combinator));
      }
    }
  }
});
const Route$j = createFileRoute("/api/segments/$id")({
  server: {
    handlers: {
      DELETE: async ({ params }) => {
        const seg = await prisma.segment.findUnique({ where: { id: params.id } });
        if (!seg) {
          return Response.json({ error: "Segment not found" }, { status: 404 });
        }
        const campaignCount = await prisma.campaign.count({
          where: { segmentId: params.id }
        });
        if (campaignCount > 0) {
          return Response.json(
            { error: "Segment is used by one or more campaigns", campaignCount },
            { status: 409 }
          );
        }
        await prisma.segment.delete({ where: { id: params.id } });
        return Response.json({ ok: true });
      }
    }
  }
});
const Route$i = createFileRoute("/api/notifications/mark-all-read")({
  server: {
    handlers: {
      POST: async () => Response.json(await markAllNotificationsRead())
    }
  }
});
const Route$h = createFileRoute("/api/notifications/$id")({
  server: {
    handlers: {
      PATCH: async ({ params }) => {
        const updated = await markNotificationRead(params.id);
        if (!updated) {
          return Response.json({ error: "Not found" }, { status: 404 });
        }
        return Response.json(updated);
      }
    }
  }
});
const Route$g = createFileRoute("/api/customers/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const customer = store.customers.find((c) => c.id === params.id);
        if (!customer) return Response.json({ error: "Not found" }, { status: 404 });
        return Response.json(customer);
      }
    }
  }
});
const Route$f = createFileRoute("/api/campaigns/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const campaign = store.campaigns.find((c) => c.id === params.id);
        if (!campaign) return Response.json({ error: "Not found" }, { status: 404 });
        return Response.json(campaign);
      }
    }
  }
});
const AI_SUGGESTION_DEDUP_MS = 12 * 60 * 60 * 1e3;
async function loadEngagementEvents() {
  const rows = await prisma.communicationEvent.findMany({
    where: { status: { in: ["opened", "clicked", "converted", "delivered"] } },
    select: { status: true, occurredAt: true, attributedAmount: true, communication: { select: { channel: true } } }
  });
  return rows.map((r) => ({
    status: r.status,
    occurredAt: r.occurredAt,
    attributedAmount: r.attributedAmount,
    channel: r.communication.channel
  }));
}
const DAY = 864e5;
const pctChange = (cur, prev) => prev === 0 ? cur > 0 ? 100 : 0 : +((cur - prev) / prev * 100).toFixed(1);
async function dashboardKPIs() {
  const [store, events] = await Promise.all([loadStore(), loadEngagementEvents()]);
  const now = Date.now();
  const totalCustomers = store.customers.length;
  const activeCampaigns = store.campaigns.filter((c) => c.status === "sending" || c.status === "scheduled").length;
  const totalDelivered = store.campaigns.reduce((s, c) => s + c.stats.delivered, 0);
  const totalOpened = store.campaigns.reduce((s, c) => s + c.stats.opened, 0);
  const avgOpenRate = totalDelivered ? totalOpened / totalDelivered : 0;
  const attributedRevenue = store.campaigns.reduce((s, c) => s + c.stats.attributedRevenue, 0);
  const inWindow = (d, from, to) => +d >= from && +d < to;
  const conv = events.filter((e) => e.status === "converted");
  const rev30 = conv.filter((e) => inWindow(e.occurredAt, now - 30 * DAY, now)).reduce((s, e) => s + (e.attributedAmount ?? 0), 0);
  const revPrev = conv.filter((e) => inWindow(e.occurredAt, now - 60 * DAY, now - 30 * DAY)).reduce((s, e) => s + (e.attributedAmount ?? 0), 0);
  const opened = events.filter((e) => e.status === "opened");
  const delivered = events.filter((e) => e.status === "delivered");
  const orInWin = (from, to) => {
    const d = delivered.filter((e) => inWindow(e.occurredAt, from, to)).length;
    const o = opened.filter((e) => inWindow(e.occurredAt, from, to)).length;
    return d ? o / d : 0;
  };
  const newCust30 = store.customers.filter((c) => c.firstOrderAt && now - +new Date(c.firstOrderAt) < 30 * DAY).length;
  const campaigns30 = store.campaigns.filter((c) => now - +new Date(c.createdAt) < 30 * DAY).length;
  return {
    totalCustomers,
    customersDelta: +(newCust30 / Math.max(1, totalCustomers) * 100).toFixed(1),
    activeCampaigns,
    campaignsDelta: campaigns30,
    avgOpenRate,
    openRateDelta: pctChange(orInWin(now - 30 * DAY, now), orInWin(now - 60 * DAY, now - 30 * DAY)),
    attributedRevenue,
    revenueDelta: pctChange(rev30, revPrev)
  };
}
async function revenueByWeek(weeks = 12) {
  const events = await loadEngagementEvents();
  const now = Date.now();
  const buckets = Array.from({ length: weeks }, () => 0);
  for (const e of events) {
    if (e.status !== "converted" || !e.attributedAmount) continue;
    const weeksAgo = Math.floor((now - +e.occurredAt) / (7 * DAY));
    if (weeksAgo >= 0 && weeksAgo < weeks) buckets[weeks - 1 - weeksAgo] += e.attributedAmount;
  }
  return buckets.map((revenue, i) => ({ week: `W${i + 1}`, revenue: Math.round(revenue) }));
}
async function lifecycleDistribution() {
  const rows = await prisma.customer.groupBy({ by: ["lifecycleStage"], _count: true });
  return rows.map((r) => ({ stage: r.lifecycleStage, count: r._count }));
}
async function channelComparison(days) {
  const sinceMs = days && days > 0 ? Date.now() - days * DAY : null;
  const rows = await prisma.communicationEvent.findMany({
    where: {
      status: { in: ["sent", "delivered", "opened", "clicked", "converted"] },
      ...sinceMs !== null ? { occurredAt: { gte: new Date(sinceMs) } } : {}
    },
    select: { status: true, attributedAmount: true, communication: { select: { channel: true } } }
  });
  const map = {};
  for (const r of rows) {
    const channel = r.communication.channel;
    const m = map[channel] ??= { sent: 0, delivered: 0, opened: 0, clicked: 0, revenue: 0 };
    switch (r.status) {
      case "sent":
        m.sent++;
        break;
      case "delivered":
        m.delivered++;
        break;
      case "opened":
        m.opened++;
        break;
      case "clicked":
        m.clicked++;
        break;
      case "converted":
        m.revenue += r.attributedAmount ?? 0;
        break;
    }
  }
  return Object.entries(map).map(([channel, v]) => ({ channel, ...v, revenue: Math.round(v.revenue) }));
}
async function engagementTrend(days = 14) {
  const events = await loadEngagementEvents();
  const now = Date.now();
  const mk = () => ({ open: 0, click: 0, conversion: 0 });
  const buckets = Array.from({ length: days }, mk);
  for (const e of events) {
    const daysAgo = Math.floor((now - +e.occurredAt) / DAY);
    if (daysAgo < 0 || daysAgo >= days) continue;
    const b = buckets[days - 1 - daysAgo];
    if (e.status === "opened") b.open++;
    else if (e.status === "clicked") b.click++;
    else if (e.status === "converted") b.conversion++;
  }
  return buckets.map((b, i) => ({ day: `D${i + 1}`, ...b }));
}
async function proactiveSuggestions() {
  const [store, settings] = await Promise.all([loadStore(), getSettings()]);
  if (!settings.proactiveSuggestions) return [];
  const enabled = settings.enabledChannels;
  const pick = (preferred, fallback) => preferred.find((c) => enabled.includes(c)) ?? (enabled.includes(fallback) ? fallback : enabled[0] ?? fallback);
  const dormantHV = store.customers.filter((c) => c.lifecycleStage === "dormant" && c.totalSpend > 1e4).length;
  const atRisk = store.customers.filter((c) => c.lifecycleStage === "at_risk").length;
  const vip = store.customers.filter((c) => c.lifecycleStage === "vip").length;
  const winBackChannel = pick(["whatsapp", "rcs", "sms", "email"], "whatsapp");
  const reEngageChannel = pick(["email", "whatsapp", "sms", "rcs"], "email");
  const vipChannel = pick(["rcs", "whatsapp", "email", "sms"], "rcs");
  const labelOf = { whatsapp: "WhatsApp", rcs: "RCS", sms: "SMS", email: "Email" };
  const all = [
    { id: "sug_1", title: "Dormant high-value win-back", detail: `${dormantHV} high-value customers went dormant. Launch a ${labelOf[winBackChannel]} win-back with early access.`, channel: winBackChannel, cta: `Win back on ${labelOf[winBackChannel]}` },
    { id: "sug_2", title: "At-risk regulars need a nudge", detail: `${atRisk} regulars are slowing down. A value-led ${labelOf[reEngageChannel].toLowerCase()} now can prevent churn.`, channel: reEngageChannel, cta: `Send re-engagement ${labelOf[reEngageChannel].toLowerCase()}` },
    { id: "sug_3", title: "Reward your VIPs", detail: `${vip} VIPs haven't seen the new collection. Offer early access via ${labelOf[vipChannel]}.`, channel: vipChannel, cta: `Launch VIP early access` }
  ];
  const result = enabled.length ? all : [];
  if (result.length) {
    await Promise.all(
      result.map(
        (s) => createNotification({
          kind: "AI_SUGGESTION",
          severity: "INFO",
          title: s.title,
          body: s.detail,
          link: `/jarvis?goal=${encodeURIComponent(s.title)}`,
          entityType: "suggestion",
          entityId: s.id,
          dedupeWindowMs: AI_SUGGESTION_DEDUP_MS
        }).catch(() => null)
      )
    );
  }
  return result;
}
const Route$e = createFileRoute("/api/analytics/suggestions")({
  server: { handlers: { GET: async () => Response.json(await proactiveSuggestions()) } }
});
const Route$d = createFileRoute("/api/analytics/revenue-weekly")({
  server: { handlers: { GET: async () => Response.json(await revenueByWeek()) } }
});
const Route$c = createFileRoute("/api/analytics/overview")({
  server: { handlers: { GET: async () => Response.json(await dashboardKPIs()) } }
});
const Route$b = createFileRoute("/api/analytics/lifecycle")({
  server: { handlers: { GET: async () => Response.json(await lifecycleDistribution()) } }
});
const ALLOWED$1 = /* @__PURE__ */ new Set([7, 30, 90]);
function parseDays$1(request) {
  const raw = new URL(request.url).searchParams.get("days");
  const n = raw ? Number(raw) : NaN;
  return ALLOWED$1.has(n) ? n : 14;
}
const Route$a = createFileRoute("/api/analytics/engagement")({
  server: {
    handlers: {
      GET: async ({ request }) => Response.json(await engagementTrend(parseDays$1(request)))
    }
  }
});
const ALLOWED = /* @__PURE__ */ new Set([7, 30, 90]);
function parseDays(request) {
  const raw = new URL(request.url).searchParams.get("days");
  const n = raw ? Number(raw) : NaN;
  return ALLOWED.has(n) ? n : void 0;
}
const Route$9 = createFileRoute("/api/analytics/channels")({
  server: {
    handlers: {
      GET: async ({ request }) => Response.json(await channelComparison(parseDays(request)))
    }
  }
});
const Route$8 = createFileRoute("/api/ai/segment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const text = typeof body?.text === "string" ? body.text : "";
        const { rules, combinator } = deriveStructuredRules(text);
        const store = await loadStore();
        const size = countByRules(store, rules, combinator);
        const seg = {
          id: `seg_ai_${Math.random().toString(36).slice(2, 9)}`,
          name: deriveSegmentName(text),
          description: text.trim(),
          rulesText: rulesToText(rules, combinator),
          rules,
          combinator,
          customerCount: size,
          createdBy: "ai",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          aiReason: `Interpreted your description into ${rules.length} rule${rules.length === 1 ? "" : "s"} joined with ${combinator}, matching ${size} customers from the live dataset.`
        };
        return Response.json(seg);
      }
    }
  }
});
const TIMEOUT_MS = 8e3;
function client() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}
function model() {
  return process.env.GEMINI_MODEL || "gemini-2.5-flash";
}
function withTimeout(p) {
  return Promise.race([
    p,
    new Promise((_, rej) => setTimeout(() => rej(new Error("gemini timeout")), TIMEOUT_MS))
  ]);
}
async function geminiText(prompt) {
  const ai = client();
  if (!ai) return null;
  try {
    const res = await withTimeout(ai.models.generateContent({ model: model(), contents: prompt }));
    const text = res.text;
    return text && text.trim() ? text.trim() : null;
  } catch (e) {
    console.warn("[gemini] text generation failed, using fallback:", e.message);
    return null;
  }
}
const CHANNELS = ["whatsapp", "rcs", "sms", "email"];
const pct = (n, d) => d ? Math.round(n / d * 100) : 0;
const DEFAULT_RATES = {
  whatsapp: { deliveryRate: 0.95, openRate: 0.62, clickRate: 0.3, convRate: 0.16, volume: 0 },
  rcs: { deliveryRate: 0.93, openRate: 0.55, clickRate: 0.26, convRate: 0.14, volume: 0 },
  sms: { deliveryRate: 0.98, openRate: 0.45, clickRate: 0.2, convRate: 0.1, volume: 0 },
  email: { deliveryRate: 0.97, openRate: 0.38, clickRate: 0.18, convRate: 0.09, volume: 0 }
};
function channelHistoricalRates(store) {
  const out = JSON.parse(JSON.stringify(DEFAULT_RATES));
  for (const ch of CHANNELS) {
    const comms = store.communications.filter((c) => c.channel === ch);
    const sent = comms.filter((c) => c.status !== "queued").length;
    if (sent < 20) continue;
    const delivered = comms.filter((c) => ["delivered", "opened", "read", "clicked", "converted"].includes(c.status)).length;
    const opened = comms.filter((c) => ["opened", "read", "clicked", "converted"].includes(c.status)).length;
    const clicked = comms.filter((c) => ["clicked", "converted"].includes(c.status)).length;
    const converted = comms.filter((c) => c.status === "converted").length;
    out[ch] = {
      deliveryRate: delivered / sent,
      openRate: delivered ? opened / delivered : 0,
      clickRate: delivered ? clicked / delivered : 0,
      convRate: delivered ? converted / delivered : 0,
      volume: sent
    };
  }
  return out;
}
function avgAov(audience) {
  if (!audience.length) return 1500;
  const v = audience.reduce((s, c) => s + (c.avgOrderValue || (c.orderCount ? c.totalSpend / c.orderCount : 0)), 0) / audience.length;
  return Math.round(v) || 1500;
}
function groundedPrediction(store, audience, channel) {
  const r = channelHistoricalRates(store)[channel];
  const size = audience.length || 20;
  const aov = avgAov(audience);
  const expectedConversions = size * r.deliveryRate * r.convRate;
  const confidence = size > 60 && r.volume > 200 ? "high" : size > 25 ? "medium" : "low";
  return {
    expectedDeliveryRate: +r.deliveryRate.toFixed(3),
    expectedOpenRate: +r.openRate.toFixed(3),
    expectedClickRate: +r.clickRate.toFixed(3),
    expectedConversionRate: +r.convRate.toFixed(3),
    expectedRevenueMin: Math.round(expectedConversions * aov * 0.7),
    expectedRevenueMax: Math.round(expectedConversions * aov * 1.3),
    confidence,
    rationale: `Heuristic from ${r.volume || "baseline"} historical ${channelMetaLabel(channel)} sends to comparable cohorts (open ${pct(r.openRate, 1)}%, conv ${(r.convRate * 100).toFixed(1)}%) × segment AOV ${formatINRInline(aov)}. Not a trained model — at scale this would learn from campaign outcomes.`
  };
}
function pickSegment(store, goal) {
  const t = goal.toLowerCase();
  const by = (id) => store.segments.find((s) => s.id === id);
  let seg = t.includes("dormant") || t.includes("win") ? by("seg_dormant_hv") : t.includes("vip") || t.includes("reward") ? by("seg_vip") : t.includes("at-risk") || t.includes("reactivate") || t.includes("risk") ? by("seg_at_risk") : t.includes("first") || t.includes("repeat") || t.includes("convert") ? by("seg_new") : t.includes("coffee") ? by("seg_coffee") : t.includes("skincare") ? by("seg_skincare") : t.includes("discount") || t.includes("sale") ? by("seg_discount") : void 0;
  return seg ?? store.segments[0];
}
function bestChannel(store, allowed) {
  const rates = channelHistoricalRates(store);
  const pool = allowed.length ? allowed : CHANNELS;
  let best = pool[0];
  for (const ch of pool) if (rates[ch].convRate > rates[best].convRate) best = ch;
  return { value: best, rates };
}
function templateMessage(goal, channel, brand) {
  if (channel === "email") {
    return {
      subject: `We saved something for you, {{name}} 🎁`,
      body: `Hi {{name}},

It's been a while and we'd love to welcome you back to ${brand.name}. As a thank you, here's 15% off your next order.

Your favourites are back in stock — shop now →

With love,
The ${brand.name} Team`
    };
  }
  return { body: `Hey {{name}} 👋 ${brand.name} misses you! Here's 15% off your next order — your favourites are waiting. Tap to shop before it expires ⏳` };
}
async function buildRecommendation(store, goal) {
  const settings = await getSettings();
  const segment = pickSegment(store, goal);
  const audience = resolveAudience(store, { segmentId: segment.id });
  const { value: channel, rates } = bestChannel(store, settings.enabledChannels);
  const n = Math.max(1, audience.length);
  const avgSpend = audience.reduce((s, c) => s + c.totalSpend, 0) / n;
  const avgDays = audience.reduce((s, c) => s + daysSince(c.lastOrderAt), 0) / n;
  const r = rates[channel];
  const reasons = [
    { label: "Avg lifetime spend", value: formatINRInline(avgSpend) },
    { label: "Days since last order", value: `${Math.round(avgDays)} days (avg)` },
    { label: `${channelMetaLabel(channel)} engagement`, value: `${Math.round(r.openRate * 100)}% open rate` },
    { label: "Historical conversion", value: `${(r.convRate * 100).toFixed(1)}%` }
  ];
  const tmpl = templateMessage(goal, channel, { name: settings.brandName });
  const aiBody = await geminiText(
    `You are writing marketing copy for ${settings.brandName}, an Indian D2C brand.
Brand voice: ${settings.brandVoice}
Write a short, on-brand ${channelMetaLabel(channel)} message.
Goal: "${goal}". Audience: ${segment.name} (avg spend ${formatINRInline(avgSpend)}, last order ~${Math.round(avgDays)} days ago).
Use the personalisation token {{name}}. Keep it ${channel === "email" ? "2 short paragraphs with a subject line on the first line prefixed 'Subject:'" : "under 280 characters, 1-2 emojis"}. No markdown.`
  );
  let subject = tmpl.subject;
  let body = tmpl.body;
  if (aiBody) {
    if (channel === "email" && /^subject:/i.test(aiBody)) {
      const [first, ...rest] = aiBody.split("\n");
      subject = first.replace(/^subject:/i, "").trim();
      body = rest.join("\n").trim() || tmpl.body;
    } else {
      body = aiBody;
    }
  }
  const altPool = (settings.enabledChannels.length ? settings.enabledChannels : CHANNELS).filter((c) => c !== channel);
  const alternatives = altPool.slice(0, 2).map((c) => ({
    value: c,
    reason: `${channelMetaLabel(c)}: ${(rates[c].convRate * 100).toFixed(1)}% historical conversion, ${Math.round(rates[c].openRate * 100)}% open.`
  }));
  return {
    audience: {
      segmentId: segment.id,
      segmentName: segment.name,
      size: audience.length,
      reason: `"${segment.name}" best matches your goal — ${audience.length} customers with avg spend ${formatINRInline(avgSpend)} and ${Math.round(avgDays)} days since last order. ${segment.aiReason ?? ""}`.trim(),
      reasons
    },
    channel: {
      value: channel,
      reason: `${channelMetaLabel(channel)} has the strongest historical conversion (${(r.convRate * 100).toFixed(1)}%) and open rate (${Math.round(r.openRate * 100)}%) for comparable sends.`,
      alternatives
    },
    message: { subject, body, reason: `Tone and length tuned for ${channelMetaLabel(channel)}. {{name}} personalisation; single time-boxed CTA.` },
    prediction: groundedPrediction(store, audience, channel)
  };
}
function campaignAnalysis(store, campaignId) {
  const camp = store.campaigns.find((c) => c.id === campaignId);
  if (!camp) return null;
  const s = camp.stats;
  const seg = store.segments.find((x) => x.id === camp.segmentId);
  const openRate = s.delivered ? s.opened / s.delivered : 0;
  const convRate = s.delivered ? s.converted / s.delivered : 0;
  const predConv = camp.prediction?.expectedConversionRate ?? convRate;
  const clickNoConvert = Math.max(0, s.clicked - s.converted);
  const convBeatPred = convRate >= predConv;
  const factors = [
    {
      label: "Timing",
      verdict: openRate > 0.5 ? "positive" : openRate > 0.35 ? "neutral" : "negative",
      text: `${pct(s.opened, s.delivered)}% open rate ${openRate > 0.5 ? "landed well with this cohort" : "suggests a different send window could help"}.`
    },
    {
      label: "Audience quality",
      verdict: (s.sent ? s.delivered / s.sent : 0) > 0.95 ? "positive" : "neutral",
      text: `"${seg?.name ?? "Target cohort"}" — ${pct(s.delivered, s.sent)}% delivery indicates clean, reachable contacts.`
    },
    {
      label: "Message",
      verdict: convBeatPred ? "positive" : "negative",
      text: convBeatPred ? `Copy resonated: ${pct(s.converted, s.clicked)}% of clickers converted.` : `${clickNoConvert} clicked but didn't buy — likely checkout friction or a pricing objection.`
    }
  ];
  const nextAction = convBeatPred ? { title: "Scale the winning formula", detail: `Re-run to a fresh lookalike cohort while the creative is hot.`, goal: `Re-run "${camp.name}" to a lookalike audience`, channel: camp.channel } : { title: `Follow up with ${clickNoConvert} engaged non-buyers`, detail: `Launch a 48-hour ${channelMetaLabel(camp.channel)} follow-up with a stronger, time-boxed incentive.`, goal: `48-hour win-back for clickers who didn't buy from "${camp.name}"`, channel: camp.channel };
  return {
    summary: `Delivered to ${s.delivered} of ${s.sent} (${pct(s.delivered, s.sent)}%), drove ${pct(s.opened, s.delivered)}% opens and ${pct(s.clicked, s.delivered)}% clicks. Conversion ${convBeatPred ? "beat" : "lagged"} the prediction, generating ${formatINRInline(s.attributedRevenue)} attributed revenue.`,
    factors,
    nextAction
  };
}
async function campaignPostMortem(store, campaignId) {
  const camp = store.campaigns.find((c) => c.id === campaignId);
  if (!camp) return "";
  const settings = await getSettings();
  const s = camp.stats;
  const clickNoConvert = Math.max(0, s.clicked - s.converted);
  const fallback = `This campaign delivered to ${s.delivered} of ${s.sent} recipients (${pct(s.delivered, s.sent)}% delivery). Open rate of ${pct(s.opened, s.delivered)}% with ${pct(s.clicked, s.delivered)}% clicks generated ${formatINRInline(s.attributedRevenue)} attributed revenue. ` + (clickNoConvert > 0 ? `${clickNoConvert} customers clicked but didn't purchase — a 48-hour follow-up with a sharper incentive is the recommended next action.` : `Conversion held up well; re-run to a lookalike cohort to capture more upside.`);
  const ai = await geminiText(
    `You are a CRM analyst writing for ${settings.brandName}. Brand voice: ${settings.brandVoice}
In 2-3 sentences, write an honest post-mortem for this campaign using ONLY these real numbers (do not invent any): sent=${s.sent}, delivered=${s.delivered}, opened=${s.opened}, clicked=${s.clicked}, converted=${s.converted}, attributedRevenue=₹${s.attributedRevenue}, clickedButNotConverted=${clickNoConvert}. End with one concrete next action. No markdown.`
  );
  return ai ?? fallback;
}
const Route$7 = createFileRoute("/api/ai/recommend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const goal = typeof body?.goal === "string" ? body.goal : "";
        const store = await loadStore();
        return Response.json(await buildRecommendation(store, goal));
      }
    }
  }
});
const Route$6 = createFileRoute("/api/ai/explain")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const store = await loadStore();
        const audience = resolveAudience(store, {
          segmentId: body?.segmentId,
          rules: body?.rules,
          combinator: body?.combinator
        });
        body?.segmentId ? store.segments.find((s) => s.id === body.segmentId)?.name : void 0;
        return Response.json(buildExplanation(store, audience, { segmentId: body?.segmentId }));
      }
    }
  }
});
const Route$5 = createFileRoute("/api/customers/$id/orders")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const orders = store.orders.filter((o) => o.customerId === params.id).sort((a, b) => +new Date(b.placedAt) - +new Date(a.placedAt));
        return Response.json(orders);
      }
    }
  }
});
const Route$4 = createFileRoute("/api/customers/$id/insight")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const customer = store.customers.find((c) => c.id === params.id);
        return Response.json(customer ? customerInsight(customer) : "");
      }
    }
  }
});
const Route$3 = createFileRoute("/api/customers/$id/explanation")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        const customer = store.customers.find((c) => c.id === params.id);
        if (!customer) {
          return Response.json({ audienceSize: 0, summary: "", signals: [], generatedAt: (/* @__PURE__ */ new Date()).toISOString() });
        }
        return Response.json(buildCustomerExplanation(store, customer));
      }
    }
  }
});
const Route$2 = createFileRoute("/api/campaigns/$id/postmortem")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        return Response.json(await campaignPostMortem(store, params.id));
      }
    }
  }
});
function channelServiceUrl() {
  return process.env.CHANNEL_SERVICE_URL || "http://localhost:8787";
}
function receiptUrl() {
  return process.env.CRM_RECEIPT_URL || "http://localhost:8080/api/receipts";
}
async function resolveAudienceForSegment(segmentId) {
  const store = await loadStore();
  const pred = SEGMENT_PREDICATES[segmentId];
  if (pred) return store.customers.filter(pred);
  const seg = await prisma.segment.findUnique({ where: { id: segmentId } });
  const rj = seg?.rulesJson;
  if (rj?.conditions?.length) {
    return customersByRules(store, rj.conditions, rj.op === "OR" ? "OR" : "AND");
  }
  return [];
}
async function launchCampaign(campaignId) {
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new Error("campaign not found");
  const audience = await resolveAudienceForSegment(campaign.segmentId);
  const stamp = Date.now().toString(36);
  const commRows = audience.map((c, i) => ({
    id: `comm_${campaignId}_${stamp}_${i}`,
    campaignId,
    customerId: c.id,
    channel: campaign.channel,
    status: "queued"
  }));
  await prisma.campaign.update({
    where: { id: campaignId },
    data: { status: "sending", sentAt: /* @__PURE__ */ new Date(), audienceSize: commRows.length }
  });
  if (commRows.length) await prisma.communication.createMany({ data: commRows });
  const custById = new Map(audience.map((c) => [c.id, c]));
  const batch = commRows.map((cm) => {
    const cust = custById.get(cm.customerId);
    return {
      communicationId: cm.id,
      recipient: { name: cust.name, email: cust.email, phone: cust.phone },
      channel: campaign.channel,
      message: campaign.message,
      callbackUrl: receiptUrl()
    };
  });
  let dispatched = 0;
  if (batch.length) {
    try {
      const res = await fetch(`${channelServiceUrl()}/send/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch)
      });
      const json = await res.json().catch(() => ({}));
      dispatched = typeof json?.accepted === "number" ? json.accepted : batch.length;
    } catch (e) {
      console.error("[launch] channel service dispatch failed:", e.message);
    }
  }
  await createNotification({
    kind: "CAMPAIGN_LAUNCHED",
    severity: "INFO",
    title: "Campaign launched",
    body: `${campaign.name} dispatched to ${commRows.length} customer${commRows.length === 1 ? "" : "s"} via ${campaign.channel}.`,
    link: `/campaigns/${campaignId}`,
    entityType: "campaign",
    entityId: campaignId
  }).catch((e) => {
    console.error("[launch] notification create failed:", e.message);
    return null;
  });
  return { campaignId, queued: commRows.length, dispatched };
}
const Route$1 = createFileRoute("/api/campaigns/$id/launch")({
  server: {
    handlers: {
      POST: async ({ params }) => {
        try {
          const result = await launchCampaign(params.id);
          return Response.json(result, { status: 202 });
        } catch (e) {
          return Response.json({ error: e.message }, { status: 400 });
        }
      }
    }
  }
});
const Route = createFileRoute("/api/campaigns/$id/analysis")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await loadStore();
        return Response.json(campaignAnalysis(store, params.id));
      }
    }
  }
});
const SettingsRoute = Route$B.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$C
});
const SegmentsRoute = Route$A.update({
  id: "/segments",
  path: "/segments",
  getParentRoute: () => Route$C
});
const JarvisRoute = Route$z.update({
  id: "/jarvis",
  path: "/jarvis",
  getParentRoute: () => Route$C
});
const CustomersRoute = Route$y.update({
  id: "/customers",
  path: "/customers",
  getParentRoute: () => Route$C
});
const ChannelRoute = Route$x.update({
  id: "/channel",
  path: "/channel",
  getParentRoute: () => Route$C
});
const AnalyticsRoute = Route$w.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => Route$C
});
const IndexRoute = Route$v.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$C
});
const CampaignsIndexRoute = Route$u.update({
  id: "/campaigns/",
  path: "/campaigns/",
  getParentRoute: () => Route$C
});
const CampaignsNewRoute = Route$t.update({
  id: "/campaigns/new",
  path: "/campaigns/new",
  getParentRoute: () => Route$C
});
const CampaignsIdRoute = Route$s.update({
  id: "/campaigns/$id",
  path: "/campaigns/$id",
  getParentRoute: () => Route$C
});
const ApiSettingsRoute = Route$r.update({
  id: "/api/settings",
  path: "/api/settings",
  getParentRoute: () => Route$C
});
const ApiSegmentsRoute = Route$q.update({
  id: "/api/segments",
  path: "/api/segments",
  getParentRoute: () => Route$C
});
const ApiReceiptsRoute = Route$p.update({
  id: "/api/receipts",
  path: "/api/receipts",
  getParentRoute: () => Route$C
});
const ApiNotificationsRoute = Route$o.update({
  id: "/api/notifications",
  path: "/api/notifications",
  getParentRoute: () => Route$C
});
const ApiCustomersRoute = Route$n.update({
  id: "/api/customers",
  path: "/api/customers",
  getParentRoute: () => Route$C
});
const ApiCommunicationsRoute = Route$m.update({
  id: "/api/communications",
  path: "/api/communications",
  getParentRoute: () => Route$C
});
const ApiCampaignsRoute = Route$l.update({
  id: "/api/campaigns",
  path: "/api/campaigns",
  getParentRoute: () => Route$C
});
const ApiSegmentsPreviewRoute = Route$k.update({
  id: "/preview",
  path: "/preview",
  getParentRoute: () => ApiSegmentsRoute
});
const ApiSegmentsIdRoute = Route$j.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiSegmentsRoute
});
const ApiNotificationsMarkAllReadRoute = Route$i.update({
  id: "/mark-all-read",
  path: "/mark-all-read",
  getParentRoute: () => ApiNotificationsRoute
});
const ApiNotificationsIdRoute = Route$h.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiNotificationsRoute
});
const ApiCustomersIdRoute = Route$g.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiCustomersRoute
});
const ApiCampaignsIdRoute = Route$f.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiCampaignsRoute
});
const ApiAnalyticsSuggestionsRoute = Route$e.update({
  id: "/api/analytics/suggestions",
  path: "/api/analytics/suggestions",
  getParentRoute: () => Route$C
});
const ApiAnalyticsRevenueWeeklyRoute = Route$d.update({
  id: "/api/analytics/revenue-weekly",
  path: "/api/analytics/revenue-weekly",
  getParentRoute: () => Route$C
});
const ApiAnalyticsOverviewRoute = Route$c.update({
  id: "/api/analytics/overview",
  path: "/api/analytics/overview",
  getParentRoute: () => Route$C
});
const ApiAnalyticsLifecycleRoute = Route$b.update({
  id: "/api/analytics/lifecycle",
  path: "/api/analytics/lifecycle",
  getParentRoute: () => Route$C
});
const ApiAnalyticsEngagementRoute = Route$a.update({
  id: "/api/analytics/engagement",
  path: "/api/analytics/engagement",
  getParentRoute: () => Route$C
});
const ApiAnalyticsChannelsRoute = Route$9.update({
  id: "/api/analytics/channels",
  path: "/api/analytics/channels",
  getParentRoute: () => Route$C
});
const ApiAiSegmentRoute = Route$8.update({
  id: "/api/ai/segment",
  path: "/api/ai/segment",
  getParentRoute: () => Route$C
});
const ApiAiRecommendRoute = Route$7.update({
  id: "/api/ai/recommend",
  path: "/api/ai/recommend",
  getParentRoute: () => Route$C
});
const ApiAiExplainRoute = Route$6.update({
  id: "/api/ai/explain",
  path: "/api/ai/explain",
  getParentRoute: () => Route$C
});
const ApiCustomersIdOrdersRoute = Route$5.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => ApiCustomersIdRoute
});
const ApiCustomersIdInsightRoute = Route$4.update({
  id: "/insight",
  path: "/insight",
  getParentRoute: () => ApiCustomersIdRoute
});
const ApiCustomersIdExplanationRoute = Route$3.update({
  id: "/explanation",
  path: "/explanation",
  getParentRoute: () => ApiCustomersIdRoute
});
const ApiCampaignsIdPostmortemRoute = Route$2.update({
  id: "/postmortem",
  path: "/postmortem",
  getParentRoute: () => ApiCampaignsIdRoute
});
const ApiCampaignsIdLaunchRoute = Route$1.update({
  id: "/launch",
  path: "/launch",
  getParentRoute: () => ApiCampaignsIdRoute
});
const ApiCampaignsIdAnalysisRoute = Route.update({
  id: "/analysis",
  path: "/analysis",
  getParentRoute: () => ApiCampaignsIdRoute
});
const ApiCampaignsIdRouteChildren = {
  ApiCampaignsIdAnalysisRoute,
  ApiCampaignsIdLaunchRoute,
  ApiCampaignsIdPostmortemRoute
};
const ApiCampaignsIdRouteWithChildren = ApiCampaignsIdRoute._addFileChildren(
  ApiCampaignsIdRouteChildren
);
const ApiCampaignsRouteChildren = {
  ApiCampaignsIdRoute: ApiCampaignsIdRouteWithChildren
};
const ApiCampaignsRouteWithChildren = ApiCampaignsRoute._addFileChildren(
  ApiCampaignsRouteChildren
);
const ApiCustomersIdRouteChildren = {
  ApiCustomersIdExplanationRoute,
  ApiCustomersIdInsightRoute,
  ApiCustomersIdOrdersRoute
};
const ApiCustomersIdRouteWithChildren = ApiCustomersIdRoute._addFileChildren(
  ApiCustomersIdRouteChildren
);
const ApiCustomersRouteChildren = {
  ApiCustomersIdRoute: ApiCustomersIdRouteWithChildren
};
const ApiCustomersRouteWithChildren = ApiCustomersRoute._addFileChildren(
  ApiCustomersRouteChildren
);
const ApiNotificationsRouteChildren = {
  ApiNotificationsIdRoute,
  ApiNotificationsMarkAllReadRoute
};
const ApiNotificationsRouteWithChildren = ApiNotificationsRoute._addFileChildren(ApiNotificationsRouteChildren);
const ApiSegmentsRouteChildren = {
  ApiSegmentsIdRoute,
  ApiSegmentsPreviewRoute
};
const ApiSegmentsRouteWithChildren = ApiSegmentsRoute._addFileChildren(
  ApiSegmentsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AnalyticsRoute,
  ChannelRoute,
  CustomersRoute,
  JarvisRoute,
  SegmentsRoute,
  SettingsRoute,
  ApiCampaignsRoute: ApiCampaignsRouteWithChildren,
  ApiCommunicationsRoute,
  ApiCustomersRoute: ApiCustomersRouteWithChildren,
  ApiNotificationsRoute: ApiNotificationsRouteWithChildren,
  ApiReceiptsRoute,
  ApiSegmentsRoute: ApiSegmentsRouteWithChildren,
  ApiSettingsRoute,
  CampaignsIdRoute,
  CampaignsNewRoute,
  CampaignsIndexRoute,
  ApiAiExplainRoute,
  ApiAiRecommendRoute,
  ApiAiSegmentRoute,
  ApiAnalyticsChannelsRoute,
  ApiAnalyticsEngagementRoute,
  ApiAnalyticsLifecycleRoute,
  ApiAnalyticsOverviewRoute,
  ApiAnalyticsRevenueWeeklyRoute,
  ApiAnalyticsSuggestionsRoute
};
const routeTree = Route$C._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$z as R,
  Route$y as a,
  Route$s as b,
  migrateLocalStorage as m,
  router as r,
  useTheme as u
};
