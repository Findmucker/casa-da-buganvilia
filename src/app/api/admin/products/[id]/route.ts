import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface ProductTranslationInput {
  name?: string;
  description?: string;
  shortDescription?: string;
}

interface ProductUpdateInput {
  slug: string;
  price: string | number;
  categoryId: string;
  featured?: boolean;
  active?: boolean;
  translations: Record<string, ProductTranslationInput>;
}

interface ProductStatusInput {
  active: boolean;
}

function translationCreates(translations: Record<string, ProductTranslationInput>) {
  return Object.entries(translations)
    .filter(([, value]) => value.name)
    .map(([locale, value]) => ({
      locale,
      name: value.name!,
      description: value.description || null,
      shortDescription: value.shortDescription || null,
    }));
}

function productErrorResponse(error: unknown) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return NextResponse.json(
      { error: "Ja existe um produto com esse slug." },
      { status: 409 },
    );
  }

  console.error("Admin product route failed", error);
  return NextResponse.json(
    { error: "Nao foi possivel guardar o produto." },
    { status: 500 },
  );
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      translations: true,
      images: true,
      category: { include: { translations: true } },
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as ProductUpdateInput;
  const { slug, price, categoryId, featured, active, translations } = body;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        slug,
        price: Number(price),
        categoryId,
        featured: featured || false,
        active: active !== false,
        translations: {
          deleteMany: {},
          create: translationCreates(translations),
        },
      },
      include: { translations: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    return productErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as ProductStatusInput;

  if (typeof body.active !== "boolean") {
    return NextResponse.json(
      { error: "O estado do produto e obrigatorio." },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { active: body.active },
      select: { id: true, active: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    console.error("Admin product status update failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel atualizar o estado." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId: id } }),
      prisma.productTranslation.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    console.error("Admin product delete failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel eliminar o produto." },
      { status: 500 },
    );
  }
}
