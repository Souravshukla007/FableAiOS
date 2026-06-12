import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, P as PageHeader, D as Dialog, e as DialogTrigger, B as Button, f as DialogContent, g as DialogHeader, h as DialogTitle, i as DialogFooter, C as Card, d as api, b as cn, j as buttonVariants } from "./card-D1doNZif.mjs";
import { r as relativeTime } from "./format-XwfzrowQ.mjs";
import { I as Input } from "./input-CEY0bw9T.mjs";
import { T as Textarea } from "./textarea-qevBqCn9.mjs";
import { S as Skeleton } from "./skeleton-D_4UpKPQ.mjs";
import { B as Badge } from "./badge-k_4A8orp.mjs";
import { W as WhyThisAudience } from "./WhyThisAudience-BkMtNsHS.mjs";
import { R as Root2, T as Trigger2, P as Portal2, C as Content2, a as Title2, D as Description2, b as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-6G4iUcMc.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/google__genai.mjs";
import { P as Plus, W as WandSparkles, a as Sparkles, X, L as LoaderCircle, b as Layers, T as Trash2 } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function Segments() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["segments"],
    queryFn: api.getSegments
  });
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Segments", description: "Group your shoppers into targetable audiences", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Create Segment"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CreateSegmentDialog, { onDone: () => setOpen(false) })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: data?.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentCard, { s }) }, s.id)) })
  ] });
}
function SegmentCard({
  s
}) {
  const qc = useQueryClient();
  const [deleting, setDeleting] = reactExports.useState(false);
  async function handleDelete() {
    setDeleting(true);
    try {
      await api.deleteSegment(s.id);
      await qc.invalidateQueries({
        queryKey: ["segments"]
      });
      toast.success("Segment deleted");
    } catch (e) {
      toast.error("Couldn't delete segment", {
        description: e instanceof Error ? e.message : void 0
      });
    } finally {
      setDeleting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex h-full flex-col p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        s.createdBy === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 bg-primary/15 text-primary hover:bg-primary/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " AI-created"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive", disabled: deleting, "aria-label": `Delete segment ${s.name}`, children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                "Delete “",
                s.name,
                "”?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This removes the segment definition. Segments used by an existing campaign can't be deleted — delete or reassign those campaigns first. This action can't be undone." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-semibold", children: s.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: s.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mt-2 block rounded bg-muted px-2 py-1 text-xs text-muted-foreground", children: s.rulesText }),
    s.aiReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 rounded-lg border border-primary/20 bg-primary/5 p-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: "Why: " }),
      s.aiReason
    ] }),
    s.createdBy === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WhyThisAudience, { source: {
      kind: "segment",
      segmentId: s.id
    }, density: "compact", title: "Why?" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold tabular-nums", children: [
        s.customerCount,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "customers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: relativeTime(s.createdAt) })
    ] })
  ] });
}
const ATTR_META = {
  totalSpend: {
    label: "Total spend (₹)",
    kind: "number",
    placeholder: "15000"
  },
  orderCount: {
    label: "Order count",
    kind: "number",
    placeholder: "2"
  },
  lastOrderDays: {
    label: "Days since last order",
    kind: "number",
    placeholder: "90"
  },
  city: {
    label: "City",
    kind: "city"
  },
  lifecycleStage: {
    label: "Lifecycle stage",
    kind: "lifecycle"
  }
};
const NUM_OPS = [">", "<", ">=", "<=", "=", "!="];
const SET_OPS = ["=", "!="];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata"];
const STAGES = [{
  value: "new",
  label: "New"
}, {
  value: "active",
  label: "Active"
}, {
  value: "at_risk",
  label: "At Risk"
}, {
  value: "dormant",
  label: "Dormant"
}, {
  value: "vip",
  label: "VIP"
}];
function newRule(attr = "totalSpend") {
  const op = ATTR_META[attr].kind === "number" ? ">" : "=";
  const value = attr === "city" ? "Mumbai" : attr === "lifecycleStage" ? "vip" : "15000";
  return {
    id: `r_${Math.random().toString(36).slice(2, 8)}`,
    attr,
    op,
    value
  };
}
function CreateSegmentDialog({
  onDone
}) {
  const qc = useQueryClient();
  const [mode, setMode] = reactExports.useState("rules");
  const [name, setName] = reactExports.useState("");
  const [rules, setRules] = reactExports.useState([newRule()]);
  const [combinator, setCombinator] = reactExports.useState("AND");
  const [nlText, setNlText] = reactExports.useState("");
  const [aiSeg, setAiSeg] = reactExports.useState(null);
  const [generating, setGenerating] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const aiResultRef = reactExports.useRef(null);
  const {
    data: liveCount,
    isFetching: counting
  } = useQuery({
    queryKey: ["segment-preview", rules, combinator],
    queryFn: () => api.previewSegmentByRules(rules, combinator)
  });
  const [debouncedRules, setDebouncedRules] = reactExports.useState(rules);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebouncedRules(rules), 400);
    return () => clearTimeout(t);
  }, [rules]);
  reactExports.useEffect(() => {
    if (aiSeg) {
      requestAnimationFrame(() => aiResultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      }));
    }
  }, [aiSeg]);
  function updateRule(id, patch) {
    setRules((rs) => rs.map((r) => r.id === id ? {
      ...r,
      ...patch
    } : r));
  }
  function changeAttr(id, attr) {
    setRules((rs) => rs.map((r) => r.id === id ? newRuleKeepId(id, attr) : r));
  }
  function newRuleKeepId(id, attr) {
    return {
      ...newRule(attr),
      id
    };
  }
  async function saveManual() {
    if (!name.trim()) {
      toast.error("Give your segment a name");
      return;
    }
    setSaving(true);
    await api.createSegment({
      name,
      description: `${rules.length} rule${rules.length === 1 ? "" : "s"} joined with ${combinator}`,
      rulesText: rules.map((r) => `${r.attr} ${r.op} ${r.value}`).join(` ${combinator} `),
      customerCount: liveCount ?? 0,
      createdBy: "marketer"
    });
    qc.invalidateQueries({
      queryKey: ["segments"]
    });
    toast.success("Segment created");
    setSaving(false);
    onDone();
  }
  async function generate() {
    if (!nlText.trim()) {
      toast.error("Describe the audience first");
      return;
    }
    setGenerating(true);
    setAiSeg(null);
    const seg = await api.generateSegmentFromText(nlText);
    setAiSeg(seg);
    setGenerating(false);
  }
  async function saveAi() {
    if (!aiSeg) return;
    setSaving(true);
    await api.createSegment(aiSeg);
    qc.invalidateQueries({
      queryKey: ["segments"]
    });
    toast.success("AI segment saved");
    setSaving(false);
    onDone();
  }
  function applyAiToBuilder() {
    if (!aiSeg) return;
    setRules(aiSeg.rules.length ? aiSeg.rules : [newRule()]);
    setCombinator(aiSeg.combinator);
    setName(aiSeg.name);
    setMode("rules");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create a segment" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 rounded-lg bg-muted p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("rules"), className: `flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${mode === "rules" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-4 w-4" }),
        " Build with rules"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("describe"), className: `flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${mode === "describe" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        " Describe in words"
      ] })
    ] }),
    mode === "rules" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Segment name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: rules.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex overflow-hidden rounded-md border text-xs font-semibold", children: ["AND", "OR"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCombinator(c), className: `px-3 py-1 transition-colors ${combinator === c ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`, children: c }, c)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border bg-card p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.attr, onValueChange: (v) => changeAttr(r.id, v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(ATTR_META).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: ATTR_META[a].label }, a)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.op, onValueChange: (v) => updateRule(r.id, {
            op: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (ATTR_META[r.attr].kind === "number" ? NUM_OPS : SET_OPS).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, children: o }, o)) })
          ] }),
          ATTR_META[r.attr].kind === "number" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "w-28", type: "number", value: r.value, placeholder: ATTR_META[r.attr].placeholder, onChange: (e) => updateRule(r.id, {
            value: e.target.value
          }) }),
          ATTR_META[r.attr].kind === "city" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.value, onValueChange: (v) => updateRule(r.id, {
            value: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] }),
          ATTR_META[r.attr].kind === "lifecycle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.value, onValueChange: (v) => updateRule(r.id, {
            value: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
          ] }),
          rules.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setRules((rs) => rs.filter((x) => x.id !== r.id)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] })
      ] }, r.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setRules((rs) => [...rs, newRule("orderCount")]), className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        " Add rule"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Live audience size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-lg font-semibold tabular-nums", children: [
          counting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }),
          liveCount ?? 0,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "customers" })
        ] })
      ] }),
      debouncedRules.some((r) => r.value !== "") && /* @__PURE__ */ jsxRuntimeExports.jsx(WhyThisAudience, { source: {
        kind: "rules",
        rules: debouncedRules,
        combinator
      }, density: "full", title: "Why this audience?", trackDeltas: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveManual, disabled: saving, className: "w-full", children: "Create segment" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: nlText, onChange: (e) => setNlText(e.target.value), placeholder: "e.g. High-value customers who haven't ordered in over 90 days", rows: 3 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: generate, disabled: generating, className: "w-full gap-1.5", children: generating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Analysing audience…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        " Generate segment"
      ] }) }),
      aiSeg && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ref: aiResultRef, initial: {
        opacity: 0,
        y: 6
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: aiSeg.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: aiSeg.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: aiSeg.rules.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-mono text-xs", children: [
          idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: aiSeg.combinator }),
          r.attr,
          " ",
          r.op,
          " ",
          r.value
        ] }, r.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: aiSeg.customerCount }),
          " matching customers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: "Why: " }),
          aiSeg.aiReason
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WhyThisAudience, { source: {
          kind: "rules",
          rules: aiSeg.rules,
          combinator: aiSeg.combinator
        }, density: "full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveAi, disabled: saving, size: "sm", className: "flex-1", children: "Save segment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: applyAiToBuilder, variant: "outline", size: "sm", className: "flex-1", children: "Edit rules" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Segments as component
};
