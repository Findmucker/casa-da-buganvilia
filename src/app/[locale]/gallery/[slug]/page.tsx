import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import WhatsAppButton from "@/components/shop/WhatsAppButton";

type ArtworkDetail = Prisma.ArtworkGetPayload<{
  include: {
    translations: true;
    images: true;
    artist: { include: { translations: true } };
  };
}>;

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const artwork = await prisma.artwork.findUnique({
    where: { slug, active: true },
    include: {
      translations: { where: { locale } },
      images: { orderBy: { sortOrder: "asc" } },
      artist: { include: { translations: { where: { locale } } } },
    },
  });

  if (!artwork) notFound();

  const prefix = locale === "pt" ? "" : `/${locale}`;
  const translation = artwork.translations[0];
  const artistName = artwork.artist.translations[0]?.name || artwork.artist.slug;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const artworkUrl = `${siteUrl}${prefix}/gallery/${slug}`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+351910341182";

  return <ArtworkDetailContent artwork={artwork} translation={translation} artistName={artistName} locale={locale} artworkUrl={artworkUrl} whatsappNumber={whatsappNumber} />;
}

function ArtworkDetailContent({
  artwork,
  translation,
  artistName,
  locale,
  artworkUrl,
  whatsappNumber,
}: {
  artwork: ArtworkDetail;
  translation: ArtworkDetail["translations"][number] | undefined;
  artistName: string;
  locale: string;
  artworkUrl: string;
  whatsappNumber: string;
}) {
  const t = useTranslations("gallery");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          {artwork.images.length > 0 ? (
            <div className="aspect-square relative rounded-xl overflow-hidden bg-cream-dark">
              <Image src={artwork.images[0].url} alt={artwork.images[0].alt || translation?.title || ""} fill className="object-cover" priority />
            </div>
          ) : (
            <div className="aspect-square rounded-xl bg-cream-dark flex items-center justify-center text-6xl">🎨</div>
          )}
        </div>
        <div>
          <p className="text-sm text-terracotta uppercase tracking-widest mb-2">{artistName}</p>
          <h1 className="text-3xl font-serif font-bold text-burgundy mb-4">{translation?.title || artwork.slug}</h1>
          {artwork.price && (
            <p className="text-2xl font-serif text-terracotta mb-4">{formatPrice(Number(artwork.price), locale)}</p>
          )}
          {artwork.medium && (
            <p className="text-sm text-warm-brown/60 mb-4">{t("medium")}: {artwork.medium}</p>
          )}
          {translation?.description && (
            <p className="text-warm-brown/80 leading-relaxed mb-8">{translation.description}</p>
          )}
          <WhatsAppButton productName={translation?.title || artwork.slug} productUrl={artworkUrl} phoneNumber={whatsappNumber} />
        </div>
      </div>
    </div>
  );
}
