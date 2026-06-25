import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { normalizeProductSaveInput } from "@/lib/admin-products";
import prisma from "@/lib/prisma";

interface ProductStatusInput {
  active: boolean;
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

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return NextResponse.json({ error: "Produto nao encontrado." }, { status: 404 });
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

  console.error("Admin product route failed", error);
  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? `Nao foi possivel guardar o produto: ${error.message}`
          : "Nao foi possivel guardar o produto.",
    },
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
  const input = normalizeProductSaveInput(await request.json());
  if ("error" in input) {
    return NextResponse.json({ error: input.error }, { status: 400 });
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        slug: input.slug,
        price: input.price,
        categoryId: input.categoryId,
        featured: input.featured,
        active: input.active,
        translations: {
          deleteMany: {},
          create: input.translations,
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
