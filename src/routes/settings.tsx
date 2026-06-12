import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, Loader2 } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { ChannelIcon, channelMeta } from "@/components/shared/badges";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/lib/theme";
import { useShowEvidencePref } from "@/lib/preferences";
import { api } from "@/lib/api";
import type { Channel, AppSettings } from "@/lib/types";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Nexus" }] }),
  component: Settings,
});

const ALL_CHANNELS: Channel[] = ["whatsapp", "sms", "email", "rcs"];

function Settings() {
  const { theme, toggle } = useTheme();
  const [showEvidence, setShowEvidence] = useShowEvidencePref();
  const qc = useQueryClient();

  // Server-authoritative app settings.
  const settingsQ = useQuery({ queryKey: ["settings"], queryFn: api.getSettings });

  // Local form state, hydrated once from the server, then user-controlled.
  const [form, setForm] = useState<AppSettings | null>(null);
  useEffect(() => { if (settingsQ.data && !form) setForm(settingsQ.data); }, [settingsQ.data, form]);

  const [saving, setSaving] = useState(false);
  const dirty = !!(form && settingsQ.data && JSON.stringify(form) !== JSON.stringify(settingsQ.data));

  function patch<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function toggleChannel(ch: Channel, on: boolean) {
    setForm((f) => {
      if (!f) return f;
      const set = new Set(f.enabledChannels);
      if (on) set.add(ch); else set.delete(ch);
      // Preserve canonical channel order for stable rendering.
      return { ...f, enabledChannels: ALL_CHANNELS.filter((c) => set.has(c)) };
    });
  }

  async function save() {
    if (!form) return;
    if (!form.brandName.trim()) { toast.error("Brand name can't be empty"); return; }
    setSaving(true);
    try {
      const saved = await api.updateSettings(form);
      qc.setQueryData(["settings"], saved);
      // Anything that branches on settings (suggestions, AI copy) needs a refresh.
      qc.invalidateQueries({ queryKey: ["suggestions"] });
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
    return (
      <AppLayout>
        <PageHeader title="Settings" description="Configure your brand, channels and preferences" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader title="Settings" description="Configure your brand, channels and preferences" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-1 text-sm font-semibold">Brand profile</h3>
          <p className="mb-4 text-xs text-muted-foreground">Brand voice is sent to the AI when it drafts campaign copy and post-mortems.</p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="brandName">Brand name</Label>
              <Input id="brandName" value={form.brandName} onChange={(e) => patch("brandName", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="supportEmail">Support email</Label>
              <Input id="supportEmail" type="email" value={form.supportEmail} onChange={(e) => patch("supportEmail", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brandVoice">Brand voice</Label>
              <Textarea id="brandVoice" rows={3} value={form.brandVoice} onChange={(e) => patch("brandVoice", e.target.value)} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-1 text-sm font-semibold">Channel configuration</h3>
          <p className="mb-4 text-xs text-muted-foreground">Disabled channels are hidden in the campaign builder and excluded from AI recommendations.</p>
          <div className="space-y-3">
            {ALL_CHANNELS.map((ch) => {
              const on = form.enabledChannels.includes(ch);
              return (
                <div key={ch} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <ChannelIcon channel={ch} />
                    <span className="text-sm font-medium">{channelMeta[ch].label}</span>
                  </div>
                  <Switch checked={on} onCheckedChange={(v) => toggleChannel(ch, v)} />
                </div>
              );
            })}
            {form.enabledChannels.length === 0 && (
              <p className="text-xs text-warning">At least one channel should be enabled — campaigns can't launch otherwise.</p>
            )}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold">Preferences</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Dark mode</div>
                <div className="text-xs text-muted-foreground">Toggle the interface theme</div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggle} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Proactive AI suggestions</div>
                <div className="text-xs text-muted-foreground">Show Jarvis opportunities on the dashboard</div>
              </div>
              <Switch checked={form.proactiveSuggestions} onCheckedChange={(v) => patch("proactiveSuggestions", v)} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Always show evidence</div>
                <div className="text-xs text-muted-foreground">Reveal computed evidence under every audience signal</div>
              </div>
              <Switch checked={showEvidence} onCheckedChange={setShowEvidence} />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Theme and evidence are device-only preferences. Brand profile, channels and proactive suggestions are saved server-side.
          </p>
        </Card>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        {dirty && <span className="text-xs text-muted-foreground">Unsaved changes</span>}
        <Button onClick={save} disabled={saving || !dirty} className="gap-1.5">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </Button>
      </div>
    </AppLayout>
  );
}
