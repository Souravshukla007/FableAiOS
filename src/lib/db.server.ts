import { PrismaClient } from "@prisma/client";
import process from "node:process";

// Server-only Prisma singleton. The `.server.ts` suffix keeps it out of the
// client bundle. A global cache prevents exhausting DB connections during HMR.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
