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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await request.json()) as ArtworkBody;

  try {
    const artwork = await prisma.$transaction(async (tx) => {
      const updated = await tx.artwork.update({
        where: { id },
        data: {
          active: body.active !== false,
          artistId: body.artistId,
          medium: body.medium || null,
          price: body.price ? Number(body.price) : null,
          slug: body.slug,
          translations: {
            upsert: {
              where: { artworkId_locale: { artworkId: id, locale: "pt" } },
              create: {
                locale: "pt",
                title: body.title,
                description: body.description || null,
              },
              update: {
                title: body.title,
                description: body.description || null,
              },
            },
          },
        },
        include: { translations: true },
      });

      await tx.artworkImage.deleteMany({ where: { artworkId: id } });
      if (body.imageUrl) {
        await tx.artworkImage.create({
          data: {
            artworkId: id,
            cloudinaryPublicId: body.imageUrl,
            url: body.imageUrl,
            alt: body.title,
            sortOrder: 0,
          },
        });
      }
      return updated;
    });

    return NextResponse.json(artwork);
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
    console.error("Admin artwork update failed", error);
    return NextResponse.json(
      { error: "Nao foi possivel guardar a obra." },
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
  await prisma.$transaction([
    prisma.artworkImage.deleteMany({ where: { artworkId: id } }),
    prisma.artworkTranslation.deleteMany({ where: { artworkId: id } }),
    prisma.artwork.delete({ where: { id } }),
  ]);
  return new NextResponse(null, { status: 204 });
}
