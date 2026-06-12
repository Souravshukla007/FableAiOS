-- CreateTable
CREATE TABLE "AppSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "brandName" TEXT NOT NULL DEFAULT 'Saffron & Co.',
    "supportEmail" TEXT NOT NULL DEFAULT 'hello@saffronco.in',
    "brandVoice" TEXT NOT NULL DEFAULT 'Warm, premium and conversational. We speak to shoppers like friends.',
    "enabledChannels" "Channel"[] DEFAULT ARRAY['whatsapp', 'sms', 'email']::"Channel"[],
    "proactiveSuggestions" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);
