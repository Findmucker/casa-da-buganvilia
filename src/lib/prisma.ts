import { PrismaClient } from "@prisma/client";
import path from "node:path";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function getDatasourceUrl(): string | undefined {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (process.env.VERCEL) {
    return `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: getDatasourceUrl(),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
