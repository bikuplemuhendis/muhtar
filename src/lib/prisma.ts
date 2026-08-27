import path from "node:path";
import { PrismaClient } from "@prisma/client";

function resolveDbUrl() {
  const fromEnv = process.env.DATABASE_URL;
  if (!fromEnv || fromEnv.startsWith("file:./") || fromEnv.startsWith("file:prisma/")) {
    return `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
  }
  return fromEnv;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: resolveDbUrl() } },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
