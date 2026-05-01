import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { translations: { where: { locale: "pt" } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}
