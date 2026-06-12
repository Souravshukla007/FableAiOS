import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Sparkles, Layers, Wand2, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import type { Segment, SegmentRule, SegmentOperator, RuleCombinator } from "@/lib/types";
import { relativeTime } from "@/lib/format";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { WhyThisAudience } from "@/components/shared/WhyThisAudience";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/segments")({
  head: () => ({ meta: [{ title: "Segments — Fable" }] }),
  component: Segments,
});

function Segments() {
  const { data, isLoading } = useQuery({ queryKey: ["segments"], queryFn: api.getSegments });
  const [open, setOpen] = useState(false);

  return (
    <AppLayout>
      <PageHeader
        title="Segments"
        description="Group your shoppers into targetable audiences"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1.5"><Plus className="h-4 w-4" /> Create Segment</Button>
            </DialogTrigger>
            <CreateSegmentDialog onDone={() => setOpen(false)} />
          </Dialog>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <SegmentCard s={s} />
            </motion.div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}

function SegmentCard({ s }: { s: Segment }) {
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Layers className="h-5 w-5" />
        </div>
        {s.createdBy === "ai" && (
          <Badge className="gap-1 bg-primary/15 text-primary hover:bg-primary/15">
            <Sparkles className="h-3 w-3" /> AI-created
          </Badge>
        )}
      </div>
      <h3 className="mt-3 font-semibold">{s.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
      <code className="mt-2 block rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{s.rulesText}</code>
      {s.aiReason && (
        <p className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-2 text-xs text-muted-foreground">
          <span className="font-medium text-primary">Why: </span>{s.aiReason}
        </p>
      )}
      {s.createdBy === "ai" && (
        <div className="mt-2">
          <WhyThisAudience source={{ kind: "segment", segmentId: s.id }} density="compact" title="Why?" />
        </div>
      )}
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-sm font-semibold tabular-nums">{s.customerCount} <span className="font-normal text-muted-foreground">customers</span></span>
        <span className="text-xs text-muted-foreground">{relativeTime(s.createdAt)}</span>
      </div>
    </Card>
  );
}

const ATTR_META: Record<
  SegmentRule["attr"],
  { label: string; kind: "number" | "city" | "lifecycle"; placeholder?: string }
> = {
  totalSpend: { label: "Total spend (₹)", kind: "number", placeholder: "15000" },
  orderCount: { label: "Order count", kind: "number", placeholder: "2" },
  lastOrderDays: { label: "Days since last order", kind: "number", placeholder: "90" },
  city: { label: "City", kind: "city" },
  lifecycleStage: { label: "Lifecycle stage", kind: "lifecycle" },
};
const NUM_OPS: SegmentOperator[] = [">", "<", ">=", "<=", "=", "!="];
const SET_OPS: SegmentOperator[] = ["=", "!="];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata"];
const STAGES: { value: string; label: string }[] = [
  { value: "new", label: "New" },
  { value: "active", label: "Active" },
  { value: "at_risk", label: "At Risk" },
  { value: "dormant", label: "Dormant" },
  { value: "vip", label: "VIP" },
];

function newRule(attr: SegmentRule["attr"] = "totalSpend"): SegmentRule {
  const op = ATTR_META[attr].kind === "number" ? ">" : "=";
  const value = attr === "city" ? "Mumbai" : attr === "lifecycleStage" ? "vip" : "15000";
  return { id: `r_${Math.random().toString(36).slice(2, 8)}`, attr, op, value };
}

function CreateSegmentDialog({ onDone }: { onDone: () => void }) {
  const qc = useQueryClient();
  const [mode, setMode] = useState<"rules" | "describe">("rules");

  // rule builder state
  const [name, setName] = useState("");
  const [rules, setRules] = useState<SegmentRule[]>([newRule()]);
  const [combinator, setCombinator] = useState<RuleCombinator>("AND");

  // NL state
  const [nlText, setNlText] = useState("");
  const [aiSeg, setAiSeg] = useState<(Segment & { rules: SegmentRule[]; combinator: RuleCombinator }) | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const aiResultRef = useRef<HTMLDivElement>(null);

  const { data: liveCount, isFetching: counting } = useQuery({
    queryKey: ["segment-preview", rules, combinator],
    queryFn: () => api.previewSegmentByRules(rules, combinator),
  });

  // Debounce rules so the explanation panel recomputes smoothly, not on every keystroke.
  const [debouncedRules, setDebouncedRules] = useState(rules);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedRules(rules), 400);
    return () => clearTimeout(t);
  }, [rules]);

  // Bring the AI-generated result into view once it renders.
  useEffect(() => {
    if (aiSeg) {
      requestAnimationFrame(() =>
        aiResultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      );
    }
  }, [aiSeg]);

  function updateRule(id: string, patch: Partial<SegmentRule>) {
    setRules((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function changeAttr(id: string, attr: SegmentRule["attr"]) {
    setRules((rs) => rs.map((r) => (r.id === id ? newRuleKeepId(id, attr) : r)));
  }
  function newRuleKeepId(id: string, attr: SegmentRule["attr"]): SegmentRule {
    return { ...newRule(attr), id };
  }

  async function saveManual() {
    if (!name.trim()) { toast.error("Give your segment a name"); return; }
    setSaving(true);
    await api.createSegment({
      name,
      description: `${rules.length} rule${rules.length === 1 ? "" : "s"} joined with ${combinator}`,
      rulesText: rules.map((r) => `${r.attr} ${r.op} ${r.value}`).join(` ${combinator} `),
      customerCount: liveCount ?? 0,
      createdBy: "marketer",
    });
    qc.invalidateQueries({ queryKey: ["segments"] });
    toast.success("Segment created");
    setSaving(false);
    onDone();
  }

  async function generate() {
    if (!nlText.trim()) { toast.error("Describe the audience first"); return; }
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
    qc.invalidateQueries({ queryKey: ["segments"] });
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

  return (
    <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
      <DialogHeader><DialogTitle>Create a segment</DialogTitle></DialogHeader>

      <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
        <button
          onClick={() => setMode("rules")}
          className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${mode === "rules" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Wand2 className="h-4 w-4" /> Build with rules
        </button>
        <button
          onClick={() => setMode("describe")}
          className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${mode === "describe" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Sparkles className="h-4 w-4" /> Describe in words
        </button>
      </div>

      {mode === "rules" ? (
        <div className="space-y-3 pt-1">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Segment name" />

          <div className="space-y-2">
            {rules.map((r, i) => (
              <div key={r.id}>
                {i > 0 && (
                  <div className="flex justify-center py-1">
                    <div className="inline-flex overflow-hidden rounded-md border text-xs font-semibold">
                      {(["AND", "OR"] as RuleCombinator[]).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCombinator(c)}
                          className={`px-3 py-1 transition-colors ${combinator === c ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
                  <Select value={r.attr} onValueChange={(v) => changeAttr(r.id, v as SegmentRule["attr"])}>
                    <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(ATTR_META) as SegmentRule["attr"][]).map((a) => (
                        <SelectItem key={a} value={a}>{ATTR_META[a].label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={r.op} onValueChange={(v) => updateRule(r.id, { op: v as SegmentOperator })}>
                    <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(ATTR_META[r.attr].kind === "number" ? NUM_OPS : SET_OPS).map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {ATTR_META[r.attr].kind === "number" && (
                    <Input
                      className="w-28"
                      type="number"
                      value={r.value}
                      placeholder={ATTR_META[r.attr].placeholder}
                      onChange={(e) => updateRule(r.id, { value: e.target.value })}
                    />
                  )}
                  {ATTR_META[r.attr].kind === "city" && (
                    <Select value={r.value} onValueChange={(v) => updateRule(r.id, { value: v })}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>{CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  )}
                  {ATTR_META[r.attr].kind === "lifecycle" && (
                    <Select value={r.value} onValueChange={(v) => updateRule(r.id, { value: v })}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>{STAGES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                    </Select>
                  )}
                  {rules.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => setRules((rs) => rs.filter((x) => x.id !== r.id))}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={() => setRules((rs) => [...rs, newRule("orderCount")])} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add rule
          </Button>

          <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
            <span className="text-sm text-muted-foreground">Live audience size</span>
            <span className="flex items-center gap-2 text-lg font-semibold tabular-nums">
              {counting && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              {liveCount ?? 0} <span className="text-sm font-normal text-muted-foreground">customers</span>
            </span>
          </div>

          {debouncedRules.some((r) => r.value !== "") && (
            <WhyThisAudience
              source={{ kind: "rules", rules: debouncedRules, combinator }}
              density="full"
              title="Why this audience?"
              trackDeltas
            />
          )}


          <DialogFooter><Button onClick={saveManual} disabled={saving} className="w-full">Create segment</Button></DialogFooter>
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          <Textarea
            value={nlText}
            onChange={(e) => setNlText(e.target.value)}
            placeholder="e.g. High-value customers who haven't ordered in over 90 days"
            rows={3}
          />
          <Button onClick={generate} disabled={generating} className="w-full gap-1.5">
            {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Analysing audience…</> : <><Sparkles className="h-4 w-4" /> Generate segment</>}
          </Button>
          {aiSeg && (
            <motion.div ref={aiResultRef} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="font-medium">{aiSeg.name}</div>
              <p className="text-sm text-muted-foreground">{aiSeg.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {aiSeg.rules.map((r, idx) => (
                  <span key={r.id} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
                    {idx > 0 && <span className="font-semibold text-primary">{aiSeg.combinator}</span>}
                    {r.attr} {r.op} {r.value}
                  </span>
                ))}
              </div>
              <div className="text-sm"><span className="font-semibold tabular-nums">{aiSeg.customerCount}</span> matching customers</div>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-primary">Why: </span>{aiSeg.aiReason}</p>
              <WhyThisAudience source={{ kind: "rules", rules: aiSeg.rules, combinator: aiSeg.combinator }} density="full" />
              <div className="flex gap-2 pt-1">
                <Button onClick={saveAi} disabled={saving} size="sm" className="flex-1">Save segment</Button>
                <Button onClick={applyAiToBuilder} variant="outline" size="sm" className="flex-1">Edit rules</Button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </DialogContent>
  );
}
