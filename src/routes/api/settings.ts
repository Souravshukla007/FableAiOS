import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSettings, updateSettings } from "@/lib/server/settings.server";

// GET /api/settings -> AppSettings (auto-creates the singleton row)
// PUT /api/settings -> persist a partial update, returns the saved AppSettings
const ChannelEnum = z.enum(["whatsapp", "sms", "email", "rcs"]);

const SettingsSchema = z
  .object({
    brandName: z.string().max(120).optional(),
    supportEmail: z.string().max(200).optional(),
    brandVoice: z.string().max(1000).optional(),
    enabledChannels: z.array(ChannelEnum).optional(),
    proactiveSuggestions: z.boolean().optional(),
  })
  .strict();

export const Route = createFileRoute("/api/settings")({
  server: {
    handlers: {
      GET: async () => Response.json(await getSettings()),
      PUT: async ({ request }) => {
        const raw = await request.json().catch(() => null);
        const parsed = SettingsSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: parsed.error.flatten() }, { status: 400 });
        }
        return Response.json(await updateSettings(parsed.data));
      },
    },
  },
});
