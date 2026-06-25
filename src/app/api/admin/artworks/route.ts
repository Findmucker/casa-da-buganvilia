import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface ArtworkBody {
  active?: boolean;
  artistId: string;
  description?: string;
  imageUrl?: string;
  medium?: string;
  price?: number | string;
  slug: string;
  title: string;
}

function imageCreate(body: ArtworkBody) {
  if (!body.imageUrl) return undefined;
  return {
    create: {
      cloudinaryPublicId: body.imageUrl,
      url: body.imageUrl,
      alt: body.title,
      sortOrder: 0,
    },
  };
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as ArtworkBody;
  try {
    const artwork = await prisma.artwork.create({
      data: {
        active: body.active !== false,
        artistId: body.artistId,
        medium: body.medium || null,
        price: body.price ? Number(body.price) : null,
        slug: body.slug,
        translations: {
          create: {
            locale: "pt",
            title: body.title,
            description: body.description || null,
          },
        },
        images: imageCreate(body),
      },
      include: { translations: true, images: true },
    });
    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ja existe uma obra com esse slug." },
        { status: 409 },
      );
    }
    console.error("Admin artwork create failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel criar a obra." },
      { status: 500 },
    );
  }
}
