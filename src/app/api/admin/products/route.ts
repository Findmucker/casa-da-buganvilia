import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface ProductTranslationInput {
  name?: string;
  description?: string;
  shortDescription?: string;
}

interface ProductCreateInput {
  slug: string;
  price: string | number;
  categoryId: string;
  featured?: boolean;
  active?: boolean;
  translations: Record<string, ProductTranslationInput>;
}

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

  const body = (await request.json()) as ProductCreateInput;
  const { slug, price, categoryId, featured, active, translations } = body;

  try {
    const product = await prisma.product.create({
      data: {
        slug,
        price: Number(price),
        categoryId,
        featured: featured || false,
        active: active !== false,
        translations: {
          create: Object.entries(translations)
            .filter(([, value]) => value.name)
            .map(([locale, value]) => ({
              locale,
              name: value.name!,
              description: value.description || null,
              shortDescription: value.shortDescription || null,
            })),
        },
      },
      include: { translations: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ja existe um produto com esse slug." },
        { status: 409 },
      );
    }

    console.error("Admin product create failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel criar o produto." },
      { status: 500 },
    );
  }
}
