import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, P as PageHeader, C as Card, a as ChannelIcon, c as channelMeta, B as Button, b as cn, d as api } from "./card-D1doNZif.mjs";
import { I as Input } from "./input-CEY0bw9T.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { T as Textarea } from "./textarea-qevBqCn9.mjs";
import { u as useShowEvidencePref, S as Switch } from "./preferences-BDuSVRBv.mjs";
import { S as Skeleton } from "./skeleton-D_4UpKPQ.mjs";
import { u as useTheme } from "./router-bYr-bjNA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/google__genai.mjs";
import { L as LoaderCircle, S as Save } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const ALL_CHANNELS = ["whatsapp", "sms", "email", "rcs"];
function Settings() {
  const {
    theme,
    toggle
  } = useTheme();
  const [showEvidence, setShowEvidence] = useShowEvidencePref();
  const qc = useQueryClient();
  const settingsQ = useQuery({
    queryKey: ["settings"],
    queryFn: api.getSettings
  });
  const [form, setForm] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (settingsQ.data && !form) setForm(settingsQ.data);
  }, [settingsQ.data, form]);
  const [saving, setSaving] = reactExports.useState(false);
  const dirty = !!(form && settingsQ.data && JSON.stringify(form) !== JSON.stringify(settingsQ.data));
  function patch(key, value) {
    setForm((f) => f ? {
      ...f,
      [key]: value
    } : f);
  }
  function toggleChannel(ch, on) {
    setForm((f) => {
      if (!f) return f;
      const set = new Set(f.enabledChannels);
      if (on) set.add(ch);
      else set.delete(ch);
      return {
        ...f,
        enabledChannels: ALL_CHANNELS.filter((c) => set.has(c))
      };
    });
  }
  async function save() {
    if (!form) return;
    if (!form.brandName.trim()) {
      toast.error("Brand name can't be empty");
      return;
    }
    setSaving(true);
    try {
      const saved = await api.updateSettings(form);
      qc.setQueryData(["settings"], saved);
      qc.invalidateQueries({
        queryKey: ["suggestions"]
      });
      setForm(saved);
      toast.success("Settings saved");
    } catch (e) {
      toast.error("Couldn't save settings");
      console.error(e);
    } finally {
      setSaving(false);
    }
  }
  if (!form) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Settings", description: "Configure your brand, channels and preferences" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-xl" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Settings", description: "Configure your brand, channels and preferences" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 text-sm font-semibold", children: "Brand profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-xs text-muted-foreground", children: "Brand voice is sent to the AI when it drafts campaign copy and post-mortems." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brandName", children: "Brand name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "brandName", value: form.brandName, onChange: (e) => patch("brandName", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "supportEmail", children: "Support email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "supportEmail", type: "email", value: form.supportEmail, onChange: (e) => patch("supportEmail", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brandVoice", children: "Brand voice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "brandVoice", rows: 3, value: form.brandVoice, onChange: (e) => patch("brandVoice", e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 text-sm font-semibold", children: "Channel configuration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-xs text-muted-foreground", children: "Disabled channels are hidden in the campaign builder and excluded from AI recommendations." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          ALL_CHANNELS.map((ch) => {
            const on = form.enabledChannels.includes(ch);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelIcon, { channel: ch }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: channelMeta[ch].label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: on, onCheckedChange: (v) => toggleChannel(ch, v) })
            ] }, ch);
          }),
          form.enabledChannels.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-warning", children: "At least one channel should be enabled — campaigns can't launch otherwise." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold", children: "Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Dark mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Toggle the interface theme" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: theme === "dark", onCheckedChange: toggle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Proactive AI suggestions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Show Jarvis opportunities on the dashboard" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.proactiveSuggestions, onCheckedChange: (v) => patch("proactiveSuggestions", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Always show evidence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Reveal computed evidence under every audience signal" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: showEvidence, onCheckedChange: setShowEvidence })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Theme and evidence are device-only preferences. Brand profile, channels and proactive suggestions are saved server-side." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-end gap-3", children: [
      dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Unsaved changes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving || !dirty, className: "gap-1.5", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
        "Save changes"
      ] })
    ] })
  ] });
}
export {
  Settings as component
};
