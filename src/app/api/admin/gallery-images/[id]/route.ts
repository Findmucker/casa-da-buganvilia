import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await request.json()) as {
    alt?: string;
    cloudinaryPublicId?: string;
    section: string;
    sortOrder?: number;
    url: string;
  };

  const image = await prisma.galleryImage.update({
    where: { id },
    data: {
      alt: body.alt || null,
      cloudinaryPublicId: body.cloudinaryPublicId || body.url,
      section: body.section,
      sortOrder: Number(body.sortOrder ?? 0),
      url: body.url,
    },
  });

  return NextResponse.json(image);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.galleryImage.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
