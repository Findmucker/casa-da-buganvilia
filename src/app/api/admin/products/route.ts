import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await prisma.product.findMany({
    include: {
      translations: true,
      images: true,
      category: { include: { translations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, price, categoryId, featured, active, translations } = body;

  const product = await prisma.product.create({
    data: {
      slug,
      price: parseFloat(price),
      categoryId,
      featured: featured || false,
      active: active !== false,
      translations: {
        create: Object.entries(translations)
          .filter(([_, v]: any) => v.name)
          .map(([locale, v]: any) => ({
            locale,
            name: v.name,
            description: v.description || null,
            shortDescription: v.shortDescription || null,
          })),
      },
    },
    include: { translations: true },
  });

  return NextResponse.json(product, { status: 201 });
}
