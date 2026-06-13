import process from "node:process";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

// Server-only Prisma singleton. The `.server.ts` suffix keeps it out of the
// client bundle. A global cache prevents exhausting DB connections during HMR
// and across serverless invocations that reuse the same warm instance.
//
// This uses the Rust-free Prisma Client (engineType = "client") with the
// node-postgres driver adapter. There is no native query-engine binary to
// bundle, which is what was crashing SSR on Vercel.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment (.env locally, Project Settings → Environment Variables on Vercel).",
    );
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
