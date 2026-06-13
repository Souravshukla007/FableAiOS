import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  Send, Users, Rocket, RefreshCw, Pencil, Loader2, TrendingUp,
  RotateCcw, Coffee, Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type { AIRecommendation, Channel } from "@/lib/types";
import { formatINR, formatPct } from "@/lib/format";
import { AppLayout } from "@/components/layout/AppLayout";
import { JarvisIcon } from "@/components/shared/JarvisIcon";
import { ChannelIcon, ConfidenceBadge, channelMeta } from "@/components/shared/badges";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WhyThisAudience } from "@/components/shared/WhyThisAudience";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/jarvis")({
  head: () => ({ meta: [{ title: "Jarvis — Fable" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ goal: typeof s.goal === "string" ? s.goal : undefined }),
  component: Jarvis,
});

const CHIPS: { label: string; goal: string; icon: typeof Crown }[] = [
  { label: "Win back dormant VIPs", goal: "Win back my dormant VIPs who haven't ordered in 90 days", icon: Crown },
  { label: "Boost weekend sales", goal: "Run a flash sale to boost weekend sales for discount-seekers", icon: TrendingUp },
  { label: "Re-engage one-time buyers", goal: "Re-engage one-time buyers and drive their second purchase", icon: RotateCcw },
  { label: "Reward coffee regulars", goal: "Reward my coffee regulars with early access to new roasts", icon: Coffee },
];

type Msg = { role: "user" | "ai"; text?: string; rec?: AIRecommendation; intro?: string };

function Jarvis() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const didSubmitGoal = useRef(false);

  useEffect(() => {
    taRef.current?.focus();
    if (search.goal && !didSubmitGoal.current) {
      didSubmitGoal.current = true;
      submit(search.goal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function submit(goal: string) {
    if (!goal.trim() || thinking) return;
    setMessages((m) => [...m, { role: "user", text: goal }]);
    setInput("");
    setThinking(true);
    const rec = await api.getAIRecommendation(goal);
    setThinking(false);
    const intro = `Based on your goal, I analysed your customers, channels and ${Math.floor(
      Math.random() * 4 + 2
    )} comparable past campaigns. Here's the campaign I'd run.`;
    setMessages((m) => [...m, { role: "ai", rec, intro }]);
    setTimeout(() => taRef.current?.focus(), 50);
  }

  async function launch(rec: AIRecommendation, goal: string, message: string) {
    const camp = await api.createCampaign({
      name: goal,
      goal,
      segmentId: rec.audience.segmentId,
      channel: rec.channel.value,
      message,
      audienceSize: rec.audience.size,
      status: "sending",
      prediction: rec.prediction,
    });
    await api.launchCampaign(camp.id);
    qc.invalidateQueries({ queryKey: ["campaigns"] });
    toast.success("Campaign launched! 🚀", { description: `${rec.audience.segmentName} · ${channelMeta[rec.channel.value].label}` });
    navigate({ to: "/campaigns/$id", params: { id: camp.id } });
  }

  const lastGoal = [...messages].reverse().find((m) => m.role === "user")?.text ?? "";

  return (
    <AppLayout>
      <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-convert text-white shadow-lg shadow-primary/20">
            <JarvisIcon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Jarvis</h1>
            <p className="text-sm text-muted-foreground">Tell me your goal — I'll recommend the audience, channel and message.</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-thin">
          {messages.length === 0 && !thinking && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-convert/15"
              >
                <JarvisIcon className="h-9 w-9" />
              </motion.div>
              <h2 className="mt-4 text-lg font-semibold">What's your marketing goal?</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Pick a quick start or describe your own — I'll build a ready-to-launch campaign plan.</p>
              <div className="mt-5 flex w-full max-w-lg flex-wrap justify-center gap-2">
                {CHIPS.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => submit(c.goal)}
                    className="group inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-accent"
                  >
                    <c.icon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.text}</div>
              </motion.div>
            ) : (
              <RecommendationCard
                key={i}
                rec={m.rec!}
                intro={m.intro}
                goal={lastGoal}
                onLaunch={launch}
                onRegenerate={() => submit(lastGoal)}
              />
            )
          )}

          {thinking && <ThinkingIndicator />}
        </div>

        <div className="mt-4 rounded-xl border bg-card p-2 shadow-sm">
          <Textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); } }}
            placeholder="Describe your goal… e.g. Increase repeat purchases from dormant VIPs"
            rows={2}
            className="resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <div className="flex justify-end">
            <Button onClick={() => submit(input)} disabled={thinking || !input.trim()} className="gap-1.5">
              <Send className="h-4 w-4" /> Send
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const THINKING_STEPS = [
  "Scanning your customer base…",
  "Matching segments to your goal…",
  "Comparing channel performance…",
  "Modelling outcomes on past campaigns…",
];

function ThinkingIndicator() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, THINKING_STEPS.length - 1)), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-convert/15">
        <JarvisIcon className="h-4 w-4 animate-pulse" />
      </span>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AnimatePresence mode="wait">
          <motion.span key={step} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
            {THINKING_STEPS[step]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function useTyped(text: string, speed = 12, chunk = 3) {
  const [shown, setShown] = useState("");
  useEffect(() => {
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

function Typed({ text }: { text: string }) {
  const shown = useTyped(text);
  return <span className="whitespace-pre-wrap">{shown}</span>;
}

function RecommendationCard({
  rec, intro, goal, onLaunch, onRegenerate,
}: {
  rec: AIRecommendation;
  intro?: string;
  goal: string;
  onLaunch: (rec: AIRecommendation, goal: string, message: string) => Promise<void>;
  onRegenerate: () => void;
}) {
  const [launching, setLaunching] = useState(false);
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(rec.message.body);
  const [subject, setSubject] = useState(rec.message.subject ?? "");
  const p = rec.prediction;
  const introShown = useTyped(intro ?? "", 10, 4);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      {intro && (
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-convert/15">
            <JarvisIcon className="h-4 w-4" />
          </span>
          <p className="pt-1.5 text-sm text-foreground">{introShown}</p>
        </div>
      )}

      <Card className="overflow-hidden border-primary/30 p-0">
        <div className="border-b bg-gradient-to-r from-primary/8 to-convert/8 px-5 py-3 text-sm font-semibold text-primary">
          <span className="flex items-center gap-2"><Rocket className="h-4 w-4" /> Recommended campaign</span>
        </div>
        <div className="px-5">
          {/* Audience */}
          <Section icon={<Users className="h-4 w-4" />} title="Audience" highlight={`${rec.audience.segmentName} · ${rec.audience.size} customers`}>
            <p className="mb-2 text-sm text-muted-foreground">{rec.audience.reason}</p>
            <WhyThisAudience source={{ kind: "segment", segmentId: rec.audience.segmentId }} density="compact" />
          </Section>

          {/* Channel */}
          <Section icon={<ChannelIcon channel={rec.channel.value} />} title="Channel" highlight={channelMeta[rec.channel.value].label}>
            <p className="text-sm text-muted-foreground">{rec.channel.reason}</p>
            {rec.channel.alternatives.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Alternatives:</span>
                {rec.channel.alternatives.map((a) => (
                  <span key={a.value} title={a.reason} className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs">
                    <ChannelIcon channel={a.value} className="h-3 w-3" />
                    {channelMeta[a.value].label}
                  </span>
                ))}
              </div>
            )}
          </Section>

          {/* Message */}
          <Section
            icon={<Pencil className="h-4 w-4" />}
            title="Message"
            action={
              <button onClick={() => setEditing((e) => !e)} className="text-xs font-medium text-primary hover:underline">
                {editing ? "Done" : "Edit"}
              </button>
            }
          >
            <MessagePreview
              channel={rec.channel.value}
              body={body}
              subject={subject}
              editing={editing}
              onBody={setBody}
              onSubject={setSubject}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">{rec.message.reason}</p>
          </Section>
          <div className="h-1" />
        </div>
      </Card>

      {/* Simulator */}
      <Card className="border-convert/30 bg-gradient-to-b from-convert/5 to-transparent p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold"><TrendingUp className="h-4 w-4 text-convert" /> Campaign Simulator</div>
          <ConfidenceBadge confidence={p.confidence} />
        </div>
        <div className="space-y-3">
          <Bar label="Delivery" value={p.expectedDeliveryRate} color="bg-info" />
          <Bar label="Open" value={p.expectedOpenRate} color="bg-primary" />
          <Bar label="Click" value={p.expectedClickRate} color="bg-warning" />
          <Bar label="Conversion" value={p.expectedConversionRate} color="bg-convert" />
        </div>
        <div className="mt-4 rounded-lg border bg-card p-3">
          <div className="text-xs text-muted-foreground">Predicted attributed revenue</div>
          <div className="text-xl font-semibold tabular-nums text-convert">{formatINR(p.expectedRevenueMin)} – {formatINR(p.expectedRevenueMax)}</div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{p.rationale}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            disabled={launching}
            onClick={async () => {
              setLaunching(true);
              const finalRec = { ...rec, message: { ...rec.message, body, subject: subject || undefined } };
              try { await onLaunch(finalRec, goal, body); } finally { setLaunching(false); }
            }}
            className="gap-1.5"
          >
            {launching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />} Launch Campaign
          </Button>
          <Button variant="outline" onClick={onRegenerate} className="gap-1.5"><RefreshCw className="h-4 w-4" /> Regenerate</Button>
          <Button variant="ghost" onClick={() => setEditing(true)} className="gap-1.5"><Pencil className="h-4 w-4" /> Edit</Button>
        </div>
      </Card>
    </motion.div>
  );
}

function renderTokens(text: string) {
  return text.split(/(\{\{name\}\})/g).map((part, i) =>
    part === "{{name}}" ? (
      <span key={i} className="rounded bg-primary/15 px-1 font-medium text-primary">{"{{name}}"}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function MessagePreview({
  channel, body, subject, editing, onBody, onSubject,
}: {
  channel: Channel;
  body: string;
  subject: string;
  editing: boolean;
  onBody: (v: string) => void;
  onSubject: (v: string) => void;
}) {
  if (editing) {
    return (
      <div className="space-y-2">
        {channel === "email" && (
          <input
            value={subject}
            onChange={(e) => onSubject(e.target.value)}
            placeholder="Subject"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        )}
        <Textarea value={body} onChange={(e) => onBody(e.target.value)} rows={6} className="resize-none text-sm" />
        <p className="text-xs text-muted-foreground">Tip: keep <code className="rounded bg-muted px-1">{"{{name}}"}</code> for personalisation.</p>
      </div>
    );
  }

  if (channel === "email") {
    return (
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="border-b bg-muted/40 px-4 py-2">
          <div className="text-xs text-muted-foreground">Subject</div>
          <div className="text-sm font-medium">{renderTokens(subject || "(no subject)")}</div>
        </div>
        <div className="whitespace-pre-wrap px-4 py-3 text-sm text-foreground">{renderTokens(body)}</div>
      </div>
    );
  }

  // WhatsApp / SMS / RCS chat bubble
  return (
    <div className="rounded-lg bg-[oklch(0.93_0.03_150)] p-3 dark:bg-muted/40">
      <div className="ml-auto max-w-[85%]">
        <div className="relative rounded-2xl rounded-tr-sm bg-[oklch(0.86_0.09_150)] px-3 py-2 text-sm text-[oklch(0.25_0.05_150)] shadow-sm dark:bg-success/20 dark:text-foreground">
          <div className="whitespace-pre-wrap">{renderTokens(body)}</div>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-70">
            12:30 PM
            <ChannelIcon channel={channel} className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, highlight, action, children }: { icon: React.ReactNode; title: string; highlight?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border-t py-3 first:border-t-0 first:pt-4">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">{icon} {title}</div>
        {action}
      </div>
      {highlight && <div className="mb-1 text-sm font-semibold">{highlight}</div>}
      {children}
    </div>
  );
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{formatPct(value)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, value * 100)}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
