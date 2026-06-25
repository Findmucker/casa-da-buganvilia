import { NextResponse } from "next/server";
import type { GallerySection } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    alt?: string;
    cloudinaryPublicId?: string;
    section: GallerySection;
    sortOrder?: number;
    url: string;
  };

  const image = await prisma.galleryImage.create({
    data: {
      alt: body.alt || null,
      cloudinaryPublicId: body.cloudinaryPublicId || body.url,
      section: body.section,
      sortOrder: Number(body.sortOrder ?? 0),
      url: body.url,
    },
  });

  return NextResponse.json(image, { status: 201 });
}
