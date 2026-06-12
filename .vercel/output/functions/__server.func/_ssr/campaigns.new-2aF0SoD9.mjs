import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, P as PageHeader, b as cn, C as Card, a as ChannelIcon, c as channelMeta, k as ConfidenceBadge, B as Button, d as api } from "./card-D1doNZif.mjs";
import { a as formatPct, f as formatINR } from "./format-XwfzrowQ.mjs";
import { T as Textarea } from "./textarea-qevBqCn9.mjs";
import { B as Badge } from "./badge-k_4A8orp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { W as WhyThisAudience } from "./WhyThisAudience-BkMtNsHS.mjs";
import "../_libs/google__genai.mjs";
import { n as Check, a as Sparkles, L as LoaderCircle, r as ChevronLeft, s as ChevronRight, f as Rocket } from "../_libs/lucide-react.mjs";
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
import "./router-bYr-bjNA.mjs";
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
const STEPS = ["Goal", "Audience", "Channel", "Message", "Review"];
const CHANNELS = ["whatsapp", "sms", "email", "rcs"];
function NewCampaign() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const segs = useQuery({
    queryKey: ["segments"],
    queryFn: api.getSegments
  });
  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: api.getSettings
  });
  const enabledChannels = settings.data?.enabledChannels ?? CHANNELS;
  const [step, setStep] = reactExports.useState(0);
  const [goal, setGoal] = reactExports.useState("");
  const [segmentId, setSegmentId] = reactExports.useState("");
  const [channel, setChannel] = reactExports.useState("whatsapp");
  const [message, setMessage] = reactExports.useState("Hey {{name}} 👋 We've got something special for you — tap to explore!");
  const [recChannel, setRecChannel] = reactExports.useState("whatsapp");
  const [prediction, setPrediction] = reactExports.useState(null);
  const [loadingRec, setLoadingRec] = reactExports.useState(false);
  const [launching, setLaunching] = reactExports.useState(false);
  const segment = segs.data?.find((s) => s.id === segmentId);
  async function fetchRec() {
    setLoadingRec(true);
    const rec = await api.getAIRecommendation(goal);
    setRecChannel(rec.channel.value);
    setChannel(rec.channel.value);
    if (rec.message.body) setMessage(rec.message.body);
    setPrediction(rec.prediction);
    setLoadingRec(false);
  }
  function next() {
    if (step === 0 && !goal.trim()) {
      toast.error("Enter a goal");
      return;
    }
    if (step === 1 && !segmentId) {
      toast.error("Pick an audience");
      return;
    }
    if (step === 2 && !enabledChannels.includes(channel)) {
      toast.error("That channel is disabled in Settings");
      return;
    }
    if (step === 1) fetchRec();
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  async function launch() {
    if (!enabledChannels.includes(channel)) {
      toast.error("That channel is disabled in Settings — pick another.");
      return;
    }
    setLaunching(true);
    const camp = await api.createCampaign({
      name: goal,
      goal,
      segmentId,
      channel,
      message,
      audienceSize: segment?.customerCount,
      status: "sending",
      prediction: prediction ?? void 0
    });
    await api.launchCampaign(camp.id);
    qc.invalidateQueries({
      queryKey: ["campaigns"]
    });
    toast.success("Campaign launched!");
    navigate({
      to: "/campaigns/$id",
      params: {
        id: camp.id
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "New Campaign", description: "Build and launch in 5 steps" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center gap-2", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold", i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"), children: i < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : i + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("hidden text-sm sm:inline", i === step ? "font-medium" : "text-muted-foreground"), children: s }),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "What's the goal of this campaign?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: goal, onChange: (e) => setGoal(e.target.value), placeholder: "e.g. Win back dormant high-value customers", rows: 3 })
      ] }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Choose your audience" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: segs.data?.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSegmentId(s.id), className: cn("rounded-lg border p-3 text-left transition-colors", segmentId === s.id ? "border-primary bg-accent" : "hover:bg-muted/40"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: s.name }),
            s.createdBy === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            s.customerCount,
            " customers"
          ] })
        ] }, s.id)) }),
        segmentId && /* @__PURE__ */ jsxRuntimeExports.jsx(WhyThisAudience, { source: {
          kind: "segment",
          segmentId
        }, density: "full", defaultOpen: true })
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Pick a channel" }),
        loadingRec && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " AI is recommending the best channel…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: CHANNELS.map((ch) => {
          const disabled = !enabledChannels.includes(ch);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => !disabled && setChannel(ch), disabled, title: disabled ? "Disabled in Settings" : void 0, className: cn("relative rounded-lg border p-4 text-center transition-colors", disabled ? "cursor-not-allowed opacity-40" : "hover:bg-muted/40", !disabled && channel === ch && "border-primary bg-accent"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: ch, className: "mx-auto h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-sm font-medium", children: channelMeta[ch].label }),
            !disabled && ch === recChannel && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute -right-2 -top-2 gap-0.5 bg-primary text-[9px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5" }),
              " AI"
            ] }),
            disabled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Off" })
          ] }, ch);
        }) }),
        !enabledChannels.includes(channel) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-warning", children: "This channel is disabled in Settings — pick another or re-enable it." })
      ] }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium", children: [
          "Message ",
          channel === "email" ? "body" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "AI-drafted — edit freely. Use ",
          "{{name}}",
          " for personalisation."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: message, onChange: (e) => setMessage(e.target.value), rows: 6 })
      ] }),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Goal", value: goal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Audience", value: `${segment?.name} (${segment?.customerCount})` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Channel", value: channelMeta[channel].label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-muted/40 p-3 text-sm whitespace-pre-wrap", children: message }),
        prediction && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-convert/30 bg-gradient-to-b from-convert/5 to-transparent p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Campaign Simulator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBadge, { confidence: prediction.confidence })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Delivery", v: formatPct(prediction.expectedDeliveryRate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Open", v: formatPct(prediction.expectedOpenRate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Click", v: formatPct(prediction.expectedClickRate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Convert", v: formatPct(prediction.expectedConversionRate) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-sm", children: [
            "Predicted revenue: ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              formatINR(prediction.expectedRevenueMin),
              " – ",
              formatINR(prediction.expectedRevenueMax)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", disabled: step === 0, onClick: () => setStep((s) => s - 1), className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
          " Back"
        ] }),
        step < STEPS.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: next, className: "gap-1.5", children: [
          "Next ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: launch, disabled: launching, className: "gap-1.5", children: [
          launching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4" }),
          " Launch Campaign"
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-medium", children: value })
  ] });
}
function Mini({
  label,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-2 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold tabular-nums", children: v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
export {
  NewCampaign as component
};
