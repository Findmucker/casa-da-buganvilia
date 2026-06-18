import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Prisma, ProductTranslation } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getLocalizedRecord } from "@/lib/translations";
import WhatsAppButton from "@/components/shop/WhatsAppButton";
import ProductCard from "@/components/shop/ProductCard";

type ProductDetail = Prisma.ProductGetPayload<{
  include: {
    translations: true;
    images: true;
    category: { include: { translations: true } };
  };
}>;

type RelatedProduct = Prisma.ProductGetPayload<{
  include: { translations: true; images: true };
}>;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      translations: {
        where: { locale: { in: [locale, "en", "pt"] } },
      },
      images: { orderBy: { sortOrder: "asc" } },
      category: {
        include: {
          translations: {
            where: { locale: { in: [locale, "en", "pt"] } },
          },
        },
      },
    },
  });

  if (!product) notFound();

  const prefix = locale === "pt" ? "" : `/${locale}`;
  const translation = getLocalizedRecord(product.translations, locale);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  const catalogBaseUrl = `${siteUrl}${prefix}/shop`;
  const productUrl = `${catalogBaseUrl}/${slug}`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+351910341182";

  // Related products
  const related = await prisma.product.findMany({
    where: {
      active: true,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: {
      translations: {
        where: { locale: { in: [locale, "en", "pt"] } },
      },
      images: { where: { isPrimary: true }, take: 1 },
    },
    take: 4,
  });

  return (
    <ProductDetailContent
      product={product}
      translation={translation}
      related={related}
      locale={locale}
      catalogBaseUrl={catalogBaseUrl}
      productUrl={productUrl}
      whatsappNumber={whatsappNumber}
    />
  );
}

interface ProductDetailContentProps {
  product: ProductDetail;
  translation?: ProductTranslation;
  related: RelatedProduct[];
  locale: string;
  catalogBaseUrl: string;
  productUrl: string;
  whatsappNumber: string;
}

function ProductDetailContent({
  product,
  translation,
  related,
  locale,
  catalogBaseUrl,
  productUrl,
  whatsappNumber,
}: ProductDetailContentProps) {
  const t = useTranslations("shop");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {product.images.length > 0 ? (
            <>
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-cream-dark">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || translation?.name || ""}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1).map((img) => (
                    <div key={img.id} className="aspect-square relative rounded-lg overflow-hidden bg-cream-dark">
                      <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-[3/4] rounded-xl bg-cream-dark flex items-center justify-center text-6xl">
              🌸
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm text-terracotta uppercase tracking-widest mb-2">
            {getLocalizedRecord(
              product.category?.translations ?? [],
              locale,
            )?.name}
          </p>
          <h1 className="text-3xl font-serif font-bold text-burgundy mb-4">
            {translation?.name || product.slug}
          </h1>

          {translation?.description && (
            <div className="prose prose-warm-brown mb-8 text-warm-brown/80 leading-relaxed">
              <p>{translation.description}</p>
            </div>
          )}

          {/* Availability Note */}
          <p className="text-sm text-warm-brown/50 italic mb-6">
            {t("availabilityNote")}
          </p>

          {/* WhatsApp CTA */}
          <WhatsAppButton
            productName={translation?.name || product.slug}
            productUrl={productUrl}
            phoneNumber={whatsappNumber}
          />
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-serif font-bold text-burgundy mb-8">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                name={getLocalizedRecord(p.translations, locale)?.name || p.slug}
                imageUrl={p.images[0]?.url || ""}
                imageAlt={p.images[0]?.alt ?? undefined}
                locale={locale}
                productUrl={`${catalogBaseUrl}/${p.slug}`}
                phoneNumber={whatsappNumber}
                enquiryLabel={t("enquireWhatsApp")}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
