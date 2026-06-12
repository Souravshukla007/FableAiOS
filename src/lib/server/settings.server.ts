// Server-only: the single-row application settings (id = "singleton").
// Brand profile feeds AI copy prompts; enabledChannels gates channel selection;
// proactiveSuggestions toggles dashboard suggestions. Always returns one row,
// creating it with schema defaults on first read.

import { prisma } from "@/lib/db.server";
import type { AppSettings, Channel } from "@/lib/types";

const SINGLETON_ID = "singleton";
const ALL_CHANNELS: Channel[] = ["whatsapp", "sms", "email", "rcs"];

const DEFAULTS: AppSettings = {
  brandName: "Saffron & Co.",
  supportEmail: "hello@saffronco.in",
  brandVoice: "Warm, premium and conversational. We speak to shoppers like friends.",
  enabledChannels: ["whatsapp", "sms", "email"],
  proactiveSuggestions: true,
};

function toAppSettings(row: {
  brandName: string;
  supportEmail: string;
  brandVoice: string;
  enabledChannels: string[];
  proactiveSuggestions: boolean;
}): AppSettings {
  return {
    brandName: row.brandName,
    supportEmail: row.supportEmail,
    brandVoice: row.brandVoice,
    enabledChannels: (row.enabledChannels as Channel[]).filter((c) => ALL_CHANNELS.includes(c)),
    proactiveSuggestions: row.proactiveSuggestions,
  };
}

// Read settings, creating the singleton row with defaults if it doesn't exist.
export async function getSettings(): Promise<AppSettings> {
  const row = await prisma.appSettings.upsert({
    where: { id: SINGLETON_ID },
    update: {},
    create: { id: SINGLETON_ID },
  });
  return toAppSettings(row);
}

// Partial update of the singleton; unknown fields ignored, channels sanitised.
export async function updateSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
  const data: Record<string, unknown> = {};
  if (typeof patch.brandName === "string") data.brandName = patch.brandName.trim() || DEFAULTS.brandName;
  if (typeof patch.supportEmail === "string") data.supportEmail = patch.supportEmail.trim();
  if (typeof patch.brandVoice === "string") data.brandVoice = patch.brandVoice.trim();
  if (typeof patch.proactiveSuggestions === "boolean") data.proactiveSuggestions = patch.proactiveSuggestions;
  if (Array.isArray(patch.enabledChannels)) {
    const cleaned = patch.enabledChannels.filter((c): c is Channel => ALL_CHANNELS.includes(c as Channel));
    data.enabledChannels = Array.from(new Set(cleaned));
  }

  const row = await prisma.appSettings.upsert({
    where: { id: SINGLETON_ID },
    update: data,
    create: { id: SINGLETON_ID, ...data },
  });
  return toAppSettings(row);
}
