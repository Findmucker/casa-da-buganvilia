import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { syncAll } from "@/lib/moloni-sync";
import { isMoloniConfigured } from "@/lib/moloni";

export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isMoloniConfigured()) {
    return NextResponse.json(
      { error: "Moloni is not configured. Please add Moloni credentials to your environment variables." },
      { status: 400 }
    );
  }

  try {
    const result = await syncAll();
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Sync failed: ${error.message}` },
      { status: 500 }
    );
  }
}
