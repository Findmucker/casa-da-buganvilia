import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const artists = await prisma.artist.findMany({
    include: { translations: true, artworks: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(artists);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    active?: boolean;
    bio?: string;
    name: string;
    photoUrl?: string;
    slug: string;
  };

  try {
    const artist = await prisma.artist.create({
      data: {
        active: body.active !== false,
        photoUrl: body.photoUrl || null,
        slug: body.slug,
        translations: {
          create: { locale: "pt", name: body.name, bio: body.bio || null },
        },
      },
      include: { translations: true },
    });
    return NextResponse.json(artist, { status: 201 });
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
    console.error("Admin artist create failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel criar o artista." },
      { status: 500 },
    );
  }
}
