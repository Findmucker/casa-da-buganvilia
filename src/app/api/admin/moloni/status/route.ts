import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isMoloniConfigured } from "@/lib/moloni";
import { getLastSyncLog, getSyncLogs } from "@/lib/moloni-sync";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const configured = isMoloniConfigured();
  const lastSync = await getLastSyncLog();
  const recentLogs = await getSyncLogs(10);

  return NextResponse.json({
    configured,
    lastSync,
    recentLogs,
  });
}
