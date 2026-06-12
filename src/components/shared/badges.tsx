import { MessageCircle, Smartphone, Mail, MessageSquareText } from "lucide-react";
import type { Channel, LifecycleStage, CampaignStatus, CommStatus, Confidence } from "@/lib/types";
import { cn } from "@/lib/utils";

export const channelMeta: Record<Channel, { label: string; icon: typeof Mail; color: string }> = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle, color: "text-success" },
  sms: { label: "SMS", icon: Smartphone, color: "text-info" },
  email: { label: "Email", icon: Mail, color: "text-primary" },
  rcs: { label: "RCS", icon: MessageSquareText, color: "text-convert" },
};

export function ChannelIcon({ channel, className }: { channel: Channel; className?: string }) {
  const M = channelMeta[channel];
  const Icon = M.icon;
  return <Icon className={cn("h-4 w-4", M.color, className)} />;
}

const lifecycleStyles: Record<LifecycleStage, string> = {
  new: "bg-info/15 text-info border-info/30",
  active: "bg-success/15 text-success border-success/30",
  at_risk: "bg-warning/15 text-warning border-warning/30",
  dormant: "bg-muted text-muted-foreground border-border",
  vip: "bg-convert/15 text-convert border-convert/30",
};
const lifecycleLabel: Record<LifecycleStage, string> = {
  new: "New",
  active: "Active",
  at_risk: "At Risk",
  dormant: "Dormant",
  vip: "VIP",
};

export function LifecycleBadge({ stage }: { stage: LifecycleStage }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", lifecycleStyles[stage])}>
      {lifecycleLabel[stage]}
    </span>
  );
}

const statusStyles: Record<CampaignStatus, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  scheduled: "bg-info/15 text-info border-info/30",
  sending: "bg-warning/15 text-warning border-warning/30",
  completed: "bg-success/15 text-success border-success/30",
  failed: "bg-destructive/15 text-destructive border-destructive/30",
};

export function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium capitalize", statusStyles[status])}>
      {status === "sending" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" />}
      {status}
    </span>
  );
}

export const commStatusColor: Record<CommStatus, string> = {
  queued: "text-muted-foreground bg-muted",
  sent: "text-foreground bg-secondary",
  delivered: "text-success bg-success/15",
  failed: "text-destructive bg-destructive/15",
  opened: "text-info bg-info/15",
  read: "text-info bg-info/15",
  clicked: "text-convert bg-convert/15",
  converted: "text-convert bg-convert/15",
};

export function CommStatusBadge({ status }: { status: CommStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize", commStatusColor[status])}>
      {status}
    </span>
  );
}

const confidenceStyles: Record<Confidence, string> = {
  low: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-info/15 text-info border-info/30",
  high: "bg-success/15 text-success border-success/30",
};
export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold capitalize", confidenceStyles[confidence])}>
      {confidence} confidence
    </span>
  );
}
