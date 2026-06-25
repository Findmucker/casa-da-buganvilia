import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

interface DatasourceUrlOptions {
  databaseUrl?: string;
}

export function resolveDatasourceUrl({
  databaseUrl = process.env.DATABASE_URL,
}: DatasourceUrlOptions = {}): string | undefined {
  return databaseUrl || undefined;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: resolveDatasourceUrl(),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
