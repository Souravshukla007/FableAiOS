import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, ChevronLeft, Rocket, Loader2, Check } from "lucide-react";
import { api } from "@/lib/api";
import type { Channel, CampaignPrediction } from "@/lib/types";
import { formatINR, formatPct } from "@/lib/format";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { ChannelIcon, ConfidenceBadge, channelMeta } from "@/components/shared/badges";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { JarvisIcon } from "@/components/shared/JarvisIcon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { WhyThisAudience } from "@/components/shared/WhyThisAudience";

export const Route = createFileRoute("/campaigns/new")({
  head: () => ({ meta: [{ title: "New Campaign — Fable" }] }),
  component: NewCampaign,
});

const STEPS = ["Goal", "Audience", "Channel", "Message", "Review"];
const CHANNELS: Channel[] = ["whatsapp", "sms", "email", "rcs"];

function NewCampaign() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const segs = useQuery({ queryKey: ["segments"], queryFn: api.getSegments });
  const settings = useQuery({ queryKey: ["settings"], queryFn: api.getSettings });
  const enabledChannels = settings.data?.enabledChannels ?? CHANNELS;
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [segmentId, setSegmentId] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [message, setMessage] = useState("Hey {{name}} 👋 We've got something special for you — tap to explore!");
  const [recChannel, setRecChannel] = useState<Channel>("whatsapp");
  const [prediction, setPrediction] = useState<CampaignPrediction | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);
  const [launching, setLaunching] = useState(false);

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
    if (step === 0 && !goal.trim()) { toast.error("Enter a goal"); return; }
    if (step === 1 && !segmentId) { toast.error("Pick an audience"); return; }
    if (step === 2 && !enabledChannels.includes(channel)) {
      toast.error("That channel is disabled in Settings"); return;
    }
    if (step === 1) fetchRec();
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function launch() {
    if (!enabledChannels.includes(channel)) {
      toast.error("That channel is disabled in Settings — pick another."); return;
    }
    setLaunching(true);
    const camp = await api.createCampaign({
      name: goal, goal, segmentId, channel, message,
      audienceSize: segment?.customerCount, status: "sending", prediction: prediction ?? undefined,
    });
    await api.launchCampaign(camp.id);
    qc.invalidateQueries({ queryKey: ["campaigns"] });
    toast.success("Campaign launched!");
    navigate({ to: "/campaigns/$id", params: { id: camp.id } });
  }

  return (
    <AppLayout>
      <PageHeader title="New Campaign" description="Build and launch in 5 steps" />

      <div className="mb-6 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold", i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={cn("hidden text-sm sm:inline", i === step ? "font-medium" : "text-muted-foreground")}>{s}</span>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>

      <Card className="p-6">
        {step === 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">What's the goal of this campaign?</label>
            <Textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Win back dormant high-value customers" rows={3} />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Choose your audience</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {segs.data?.map((s) => (
                <button key={s.id} onClick={() => setSegmentId(s.id)} className={cn("rounded-lg border p-3 text-left transition-colors", segmentId === s.id ? "border-primary bg-accent" : "hover:bg-muted/40")}>
                  <div className="flex items-center justify-between"><span className="font-medium">{s.name}</span>{s.createdBy === "ai" && <JarvisIcon className="h-3.5 w-3.5" />}</div>
                  <div className="text-xs text-muted-foreground">{s.customerCount} customers</div>
                </button>
              ))}
            </div>
            {segmentId && (
              <WhyThisAudience source={{ kind: "segment", segmentId }} density="full" defaultOpen />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Pick a channel</label>
            {loadingRec && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> AI is recommending the best channel…</div>}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CHANNELS.map((ch) => {
                const disabled = !enabledChannels.includes(ch);
                return (
                  <button
                    key={ch}
                    onClick={() => !disabled && setChannel(ch)}
                    disabled={disabled}
                    title={disabled ? "Disabled in Settings" : undefined}
                    className={cn(
                      "relative rounded-lg border p-4 text-center transition-colors",
                      disabled ? "cursor-not-allowed opacity-40" : "hover:bg-muted/40",
                      !disabled && channel === ch && "border-primary bg-accent",
                    )}
                  >
                    <ChannelIcon channel={ch} className="mx-auto h-5 w-5" />
                    <div className="mt-1.5 text-sm font-medium">{channelMeta[ch].label}</div>
                    {!disabled && ch === recChannel && <Badge className="absolute -right-2 -top-2 gap-0.5 bg-primary text-[9px]"><JarvisIcon className="h-2.5 w-2.5" /> AI</Badge>}
                    {disabled && <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Off</div>}
                  </button>
                );
              })}
            </div>
            {!enabledChannels.includes(channel) && (
              <p className="text-xs text-warning">This channel is disabled in Settings — pick another or re-enable it.</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Message {channel === "email" ? "body" : ""}</label>
            <p className="text-xs text-muted-foreground">AI-drafted — edit freely. Use {"{{name}}"} for personalisation.</p>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Goal" value={goal} />
              <Field label="Audience" value={`${segment?.name} (${segment?.customerCount})`} />
              <Field label="Channel" value={channelMeta[channel].label} />
            </div>
            <div className="rounded-lg border bg-muted/40 p-3 text-sm whitespace-pre-wrap">{message}</div>
            {prediction && (
              <Card className="border-convert/30 bg-gradient-to-b from-convert/5 to-transparent p-4">
                <div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">Campaign Simulator</span><ConfidenceBadge confidence={prediction.confidence} /></div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Mini label="Delivery" v={formatPct(prediction.expectedDeliveryRate)} />
                  <Mini label="Open" v={formatPct(prediction.expectedOpenRate)} />
                  <Mini label="Click" v={formatPct(prediction.expectedClickRate)} />
                  <Mini label="Convert" v={formatPct(prediction.expectedConversionRate)} />
                </div>
                <div className="mt-3 text-sm">Predicted revenue: <span className="font-semibold">{formatINR(prediction.expectedRevenueMin)} – {formatINR(prediction.expectedRevenueMax)}</span></div>
              </Card>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="gap-1.5"><ChevronLeft className="h-4 w-4" /> Back</Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} className="gap-1.5">Next <ChevronRight className="h-4 w-4" /></Button>
          ) : (
            <Button onClick={launch} disabled={launching} className="gap-1.5">{launching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />} Launch Campaign</Button>
          )}
        </div>
      </Card>
    </AppLayout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">{label}</div><div className="mt-0.5 text-sm font-medium">{value}</div></div>;
}
function Mini({ label, v }: { label: string; v: string }) {
  return <div className="rounded-lg border bg-card p-2 text-center"><div className="text-base font-semibold tabular-nums">{v}</div><div className="text-xs text-muted-foreground">{label}</div></div>;
}
