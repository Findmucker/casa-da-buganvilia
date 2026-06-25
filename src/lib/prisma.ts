import { PrismaClient } from "@prisma/client";
import path from "node:path";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

interface DatasourceUrlOptions {
  databaseUrl?: string;
  isVercel?: string;
  cwd?: string;
}

export function resolveDatasourceUrl({
  databaseUrl = process.env.DATABASE_URL,
  isVercel = process.env.VERCEL,
  cwd = process.cwd(),
}: DatasourceUrlOptions = {}): string | undefined {
  if (databaseUrl) {
    return databaseUrl;
  }

  if (isVercel) {
    return `file:${path.join(cwd, "prisma", "dev.db")}`;
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: resolveDatasourceUrl(),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
