import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import WhatsAppButton from "@/components/shop/WhatsAppButton";
import ProductCard from "@/components/shop/ProductCard";
import StockBadge from "@/components/shop/StockBadge";

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
      translations: { where: { locale } },
      images: { orderBy: { sortOrder: "asc" } },
      category: {
        include: { translations: { where: { locale } } },
      },
    },
  });

  if (!product) notFound();

  const prefix = locale === "pt" ? "" : `/${locale}`;
  const translation = product.translations[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const productUrl = `${siteUrl}${prefix}/shop/${slug}`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+351900000000";

  // Related products
  const related = await prisma.product.findMany({
    where: {
      active: true,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: {
      translations: { where: { locale } },
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
      prefix={prefix}
      productUrl={productUrl}
      whatsappNumber={whatsappNumber}
    />
  );
}

function ProductDetailContent({
  product,
  translation,
  related,
  locale,
  prefix,
  productUrl,
  whatsappNumber,
}: any) {
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
                  {product.images.slice(1).map((img: any) => (
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
            {product.category?.translations[0]?.name}
          </p>
          <h1 className="text-3xl font-serif font-bold text-burgundy mb-4">
            {translation?.name || product.slug}
          </h1>
          <p className="text-2xl font-serif text-terracotta mb-4">
            {formatPrice(product.price, locale)}
          </p>

          <div className="mb-6">
            <StockBadge stock={product.stock} hasStock={product.hasStock} locale={locale} />
          </div>

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
            {related.map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.translations[0]?.name || p.slug}
                price={p.price}
                imageUrl={p.images[0]?.url || ""}
                imageAlt={p.images[0]?.alt}
                locale={locale}
                localePrefix={prefix}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
