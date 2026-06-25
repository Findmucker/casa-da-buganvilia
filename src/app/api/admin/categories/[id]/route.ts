import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as {
    active?: boolean;
    description?: string;
    name: string;
    slug: string;
    sortOrder?: number;
  };

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        active: body.active !== false,
        slug: body.slug,
        sortOrder: Number(body.sortOrder ?? 0),
        translations: {
          upsert: {
            where: { categoryId_locale: { categoryId: id, locale: "pt" } },
            create: {
              locale: "pt",
              name: body.name,
              description: body.description || null,
            },
            update: {
              name: body.name,
              description: body.description || null,
            },
          },
        },
      },
      include: { translations: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ja existe uma categoria com esse slug." },
        { status: 409 },
      );
    }

    console.error("Admin category update failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel guardar a categoria." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { children: true, products: true } } },
  });

  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (category._count.children > 0 || category._count.products > 0) {
    return NextResponse.json(
      { error: "Nao pode eliminar categorias com produtos ou subcategorias." },
      { status: 409 },
    );
  }

  await prisma.category.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
