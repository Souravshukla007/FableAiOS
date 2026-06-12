import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { d as api, A as AppLayout, B as Button, C as Card, c as channelMeta, a as ChannelIcon, k as ConfidenceBadge, b as cn } from "./card-D1doNZif.mjs";
import { f as formatINR, a as formatPct } from "./format-XwfzrowQ.mjs";
import { T as Textarea } from "./textarea-qevBqCn9.mjs";
import { W as WhyThisAudience } from "./WhyThisAudience-BkMtNsHS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route$z } from "./router-bYr-bjNA.mjs";
import "../_libs/google__genai.mjs";
import { a as Sparkles, C as Crown, c as TrendingUp, R as RotateCcw, d as Coffee, e as Send, f as Rocket, U as Users, g as Pencil, L as LoaderCircle, h as RefreshCw } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const CHIPS = [{
  label: "Win back dormant VIPs",
  goal: "Win back my dormant VIPs who haven't ordered in 90 days",
  icon: Crown
}, {
  label: "Boost weekend sales",
  goal: "Run a flash sale to boost weekend sales for discount-seekers",
  icon: TrendingUp
}, {
  label: "Re-engage one-time buyers",
  goal: "Re-engage one-time buyers and drive their second purchase",
  icon: RotateCcw
}, {
  label: "Reward coffee regulars",
  goal: "Reward my coffee regulars with early access to new roasts",
  icon: Coffee
}];
function Jarvis() {
  const search = Route$z.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [thinking, setThinking] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  const taRef = reactExports.useRef(null);
  const didSubmitGoal = reactExports.useRef(false);
  reactExports.useEffect(() => {
    taRef.current?.focus();
    if (search.goal && !didSubmitGoal.current) {
      didSubmitGoal.current = true;
      submit(search.goal);
    }
  }, []);
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, thinking]);
  async function submit(goal) {
    if (!goal.trim() || thinking) return;
    setMessages((m) => [...m, {
      role: "user",
      text: goal
    }]);
    setInput("");
    setThinking(true);
    const rec = await api.getAIRecommendation(goal);
    setThinking(false);
    const intro = `Based on your goal, I analysed your customers, channels and ${Math.floor(Math.random() * 4 + 2)} comparable past campaigns. Here's the campaign I'd run.`;
    setMessages((m) => [...m, {
      role: "ai",
      rec,
      intro
    }]);
    setTimeout(() => taRef.current?.focus(), 50);
  }
  async function launch(rec, goal, message) {
    const camp = await api.createCampaign({
      name: goal,
      goal,
      segmentId: rec.audience.segmentId,
      channel: rec.channel.value,
      message,
      audienceSize: rec.audience.size,
      status: "sending",
      prediction: rec.prediction
    });
    await api.launchCampaign(camp.id);
    qc.invalidateQueries({
      queryKey: ["campaigns"]
    });
    toast.success("Campaign launched! 🚀", {
      description: `${rec.audience.segmentName} · ${channelMeta[rec.channel.value].label}`
    });
    navigate({
      to: "/campaigns/$id",
      params: {
        id: camp.id
      }
    });
  }
  const lastGoal = [...messages].reverse().find((m) => m.role === "user")?.text ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-convert text-white shadow-lg shadow-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "Jarvis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tell me your goal — I'll recommend the audience, channel and message." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: "flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-thin", children: [
      messages.length === 0 && !thinking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          scale: 0.8,
          opacity: 0
        }, animate: {
          scale: 1,
          opacity: 1
        }, className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-convert/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-lg font-semibold", children: "What's your marketing goal?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: "Pick a quick start or describe your own — I'll build a ready-to-launch campaign plan." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex w-full max-w-lg flex-wrap justify-center gap-2", children: CHIPS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => submit(c.goal), className: "group inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4 text-primary transition-transform group-hover:scale-110" }),
          c.label
        ] }, c.label)) })
      ] }),
      messages.map((m, i) => m.role === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 8
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground", children: m.text }) }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx(RecommendationCard, { rec: m.rec, intro: m.intro, goal: lastGoal, onLaunch: launch, onRegenerate: () => submit(lastGoal) }, i)),
      thinking && /* @__PURE__ */ jsxRuntimeExports.jsx(ThinkingIndicator, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border bg-card p-2 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { ref: taRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          submit(input);
        }
      }, placeholder: "Describe your goal… e.g. Increase repeat purchases from dormant VIPs", rows: 2, className: "resize-none border-0 bg-transparent shadow-none focus-visible:ring-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => submit(input), disabled: thinking || !input.trim(), className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
        " Send"
      ] }) })
    ] })
  ] }) });
}
const THINKING_STEPS = ["Scanning your customer base…", "Matching segments to your goal…", "Comparing channel performance…", "Modelling outcomes on past campaigns…"];
function ThinkingIndicator() {
  const [step, setStep] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, THINKING_STEPS.length - 1)), 700);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-convert/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 animate-pulse text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
        opacity: 0,
        y: 4
      }, animate: {
        opacity: 1,
        y: 0
      }, exit: {
        opacity: 0,
        y: -4
      }, children: THINKING_STEPS[step] }, step) })
    ] })
  ] });
}
function useTyped(text, speed = 12, chunk = 3) {
  const [shown, setShown] = reactExports.useState("");
  reactExports.useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += chunk;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, chunk]);
  return shown;
}
function RecommendationCard({
  rec,
  intro,
  goal,
  onLaunch,
  onRegenerate
}) {
  const [launching, setLaunching] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(false);
  const [body, setBody] = reactExports.useState(rec.message.body);
  const [subject, setSubject] = reactExports.useState(rec.message.subject ?? "");
  const p = rec.prediction;
  const introShown = useTyped(intro ?? "", 10, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 12
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "space-y-3", children: [
    intro && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-convert/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1.5 text-sm text-foreground", children: introShown })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-primary/30 p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b bg-gradient-to-r from-primary/8 to-convert/8 px-5 py-3 text-sm font-semibold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4" }),
        " Recommended campaign"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), title: "Audience", highlight: `${rec.audience.segmentName} · ${rec.audience.size} customers`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm text-muted-foreground", children: rec.audience.reason }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WhyThisAudience, { source: {
            kind: "segment",
            segmentId: rec.audience.segmentId
          }, density: "compact" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: rec.channel.value }), title: "Channel", highlight: channelMeta[rec.channel.value].label, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: rec.channel.reason }),
          rec.channel.alternatives.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Alternatives:" }),
            rec.channel.alternatives.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { title: a.reason, className: "inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: a.value, className: "h-3 w-3" }),
              channelMeta[a.value].label
            ] }, a.value))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }), title: "Message", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing((e) => !e), className: "text-xs font-medium text-primary hover:underline", children: editing ? "Done" : "Edit" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessagePreview, { channel: rec.channel.value, body, subject, editing, onBody: setBody, onSubject: setSubject }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: rec.message.reason })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-convert/30 bg-gradient-to-b from-convert/5 to-transparent p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-convert" }),
          " Campaign Simulator"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBadge, { confidence: p.confidence })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: "Delivery", value: p.expectedDeliveryRate, color: "bg-info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: "Open", value: p.expectedOpenRate, color: "bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: "Click", value: p.expectedClickRate, color: "bg-warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: "Conversion", value: p.expectedConversionRate, color: "bg-convert" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Predicted attributed revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-semibold tabular-nums text-convert", children: [
          formatINR(p.expectedRevenueMin),
          " – ",
          formatINR(p.expectedRevenueMax)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: p.rationale }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: launching, onClick: async () => {
          setLaunching(true);
          const finalRec = {
            ...rec,
            message: {
              ...rec.message,
              body,
              subject: subject || void 0
            }
          };
          try {
            await onLaunch(finalRec, goal, body);
          } finally {
            setLaunching(false);
          }
        }, className: "gap-1.5", children: [
          launching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4" }),
          " Launch Campaign"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: onRegenerate, className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
          " Regenerate"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => setEditing(true), className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }),
          " Edit"
        ] })
      ] })
    ] })
  ] });
}
function renderTokens(text) {
  return text.split(/(\{\{name\}\})/g).map((part, i) => part === "{{name}}" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-primary/15 px-1 font-medium text-primary", children: "{{name}}" }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, i));
}
function MessagePreview({
  channel,
  body,
  subject,
  editing,
  onBody,
  onSubject
}) {
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      channel === "email" && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: subject, onChange: (e) => onSubject(e.target.value), placeholder: "Subject", className: "w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: body, onChange: (e) => onBody(e.target.value), rows: 6, className: "resize-none text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Tip: keep ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-muted px-1", children: "{{name}}" }),
        " for personalisation."
      ] })
    ] });
  }
  if (channel === "email") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b bg-muted/40 px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: renderTokens(subject || "(no subject)") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap px-4 py-3 text-sm text-foreground", children: renderTokens(body) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-[oklch(0.93_0.03_150)] p-3 dark:bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto max-w-[85%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl rounded-tr-sm bg-[oklch(0.86_0.09_150)] px-3 py-2 text-sm text-[oklch(0.25_0.05_150)] shadow-sm dark:bg-success/20 dark:text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap", children: renderTokens(body) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] opacity-70", children: [
      "12:30 PM",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel, className: "h-3 w-3" })
    ] })
  ] }) }) });
}
function Section({
  icon,
  title,
  highlight,
  action,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t py-3 first:border-t-0 first:pt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
        icon,
        " ",
        title
      ] }),
      action
    ] }),
    highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-sm font-semibold", children: highlight }),
    children
  ] });
}
function Bar({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: formatPct(value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: cn("h-full rounded-full", color), initial: {
      width: 0
    }, animate: {
      width: `${Math.min(100, value * 100)}%`
    }, transition: {
      duration: 0.9,
      ease: "easeOut"
    } }) })
  ] });
}
export {
  Jarvis as component
};
