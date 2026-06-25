import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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
    active?: boolean;
    bio?: string;
    name: string;
    photoUrl?: string;
    slug: string;
  };

  try {
    const artist = await prisma.artist.update({
      where: { id },
      data: {
        active: body.active !== false,
        photoUrl: body.photoUrl || null,
        slug: body.slug,
        translations: {
          upsert: {
            where: { artistId_locale: { artistId: id, locale: "pt" } },
            create: { locale: "pt", name: body.name, bio: body.bio || null },
            update: { name: body.name, bio: body.bio || null },
          },
        },
      },
      include: { translations: true },
    });
    return NextResponse.json(artist);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ja existe um artista com esse slug." },
        { status: 409 },
      );
    }
    console.error("Admin artist update failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel guardar o artista." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const artist = await prisma.artist.findUnique({
    where: { id },
    include: { _count: { select: { artworks: true } } },
  });
  if (!artist) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (artist._count.artworks > 0) {
    return NextResponse.json(
      { error: "Nao pode eliminar artistas com obras associadas." },
      { status: 409 },
    );
  }

  await prisma.artist.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
