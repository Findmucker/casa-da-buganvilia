import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { normalizeProductSaveInput } from "@/lib/admin-products";
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

  const input = normalizeProductSaveInput(await request.json());
  if ("error" in input) {
    return NextResponse.json({ error: input.error }, { status: 400 });
  }

  try {
    const product = await prisma.product.create({
      data: {
        slug: input.slug,
        price: input.price,
        categoryId: input.categoryId,
        featured: input.featured,
        active: input.active,
        translations: {
          create: input.translations,
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

    if (error instanceof Error && error.message.includes("readonly")) {
      return NextResponse.json(
        {
          error:
            "A base de dados esta em modo de leitura. Configure uma base de dados persistente para editar produtos.",
        },
        { status: 503 },
      );
    }

    console.error("Admin product create failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel criar o produto." },
      { status: 500 },
    );
  }
}
