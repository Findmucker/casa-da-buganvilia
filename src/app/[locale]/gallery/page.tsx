import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

type GalleryArtist = Prisma.ArtistGetPayload<{
  include: {
    translations: true;
    artworks: {
      include: {
        translations: true;
        images: true;
      };
    };
  };
}>;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "pt" ? "" : `/${locale}`;

  const artists = await prisma.artist.findMany({
    where: { active: true },
    include: {
      translations: { where: { locale } },
      artworks: {
        where: { active: true },
        include: {
          translations: { where: { locale } },
          images: { take: 1, orderBy: { sortOrder: "asc" } },
        },
        take: 4,
      },
    },
  });

  return <GalleryContent artists={artists} locale={locale} prefix={prefix} />;
}

function GalleryContent({
  artists,
  locale,
  prefix,
}: {
  artists: GalleryArtist[];
  locale: string;
  prefix: string;
}) {
  const t = useTranslations("gallery");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-burgundy mb-3">{t("title")}</h1>
        <p className="text-warm-brown/60 max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>

      {artists.length > 0 ? (
        <div className="space-y-20">
          {artists.map((artist) => {
            const at = artist.translations[0];
            return (
              <section key={artist.id}>
                <div className="flex items-center gap-4 mb-8">
                  {artist.photoUrl && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-cream-dark relative">
                      <Image src={artist.photoUrl} alt={at?.name || ""} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-burgundy">
                      {at?.name || artist.slug}
                    </h2>
                    {at?.bio && <p className="text-sm text-warm-brown/60 mt-1 line-clamp-2">{at.bio}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {artist.artworks.map((artwork) => {
                    const aw = artwork.translations[0];
                    return (
                      <Link key={artwork.id} href={`${prefix}/gallery/${artwork.slug}`} className="group">
                        <div className="aspect-square relative rounded-lg overflow-hidden bg-cream-dark">
                          {artwork.images[0] ? (
                            <Image
                              src={artwork.images[0].url}
                              alt={artwork.images[0].alt || aw?.title || ""}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl">🎨</div>
                          )}
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-warm-brown group-hover:text-burgundy transition-colors">
                          {aw?.title || artwork.slug}
                        </h3>
                        {artwork.price && (
                          <p className="text-sm font-serif text-terracotta">{formatPrice(Number(artwork.price), locale)}</p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-warm-brown/50">
          <p className="text-5xl mb-4">🎨</p>
          <p>{t("subtitle")}</p>
        </div>
      )}
    </div>
  );
}
