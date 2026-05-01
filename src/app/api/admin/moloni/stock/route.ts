import { NextRequest, NextResponse } from "next/server";
import { getMoloniProductStock, isMoloniConfigured } from "@/lib/moloni";

export async function GET(request: NextRequest) {
  const moloniId = request.nextUrl.searchParams.get("moloniId");

  if (!moloniId) {
    return NextResponse.json({ error: "moloniId required" }, { status: 400 });
  }

  if (!isMoloniConfigured()) {
    return NextResponse.json({ error: "Moloni not configured" }, { status: 400 });
  }

  try {
    const stock = await getMoloniProductStock(parseInt(moloniId));
    return NextResponse.json({ stock }, {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60" },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
