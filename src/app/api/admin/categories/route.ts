import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    include: { translations: { where: { locale: "pt" } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    active?: boolean;
    description?: string;
    name: string;
    slug: string;
    sortOrder?: number;
  };

  try {
    const category = await prisma.category.create({
      data: {
        active: body.active !== false,
        slug: body.slug,
        sortOrder: Number(body.sortOrder ?? 0),
        translations: {
          create: {
            locale: "pt",
            name: body.name,
            description: body.description || null,
          },
        },
      },
      include: { translations: true },
    });

    return NextResponse.json(category, { status: 201 });
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

    console.error("Admin category create failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel criar a categoria." },
      { status: 500 },
    );
  }
}
