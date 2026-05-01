import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { locale } = await params;
  const { category, sort } = await searchParams;
  setRequestLocale(locale);

  const prefix = locale === "pt" ? "" : `/${locale}`;

  // Fetch categories
  const categories = await prisma.category.findMany({
    where: { active: true },
    include: {
      translations: { where: { locale } },
    },
    orderBy: { sortOrder: "asc" },
  });

  // Fetch products
  const orderBy: any = sort === "price_asc"
    ? { price: "asc" }
    : sort === "price_desc"
    ? { price: "desc" }
    : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(category ? { category: { slug: category } } : {}),
    },
    include: {
      translations: { where: { locale } },
      images: { where: { isPrimary: true }, take: 1 },
    },
    orderBy,
  });

  return <ShopContent locale={locale} prefix={prefix} categories={categories} products={products} currentCategory={category} />;
}

function ShopContent({ locale, prefix, categories, products, currentCategory }: any) {
  const t = useTranslations("shop");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-burgundy mb-3">{t("title")}</h1>
        <p className="text-warm-brown/60">{t("subtitle")}</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Link
          href={`${prefix}/shop`}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            !currentCategory
              ? "bg-burgundy text-cream"
              : "bg-white text-warm-brown hover:bg-cream-dark"
          }`}
        >
          {t("allCategories")}
        </Link>
        {categories.map((cat: any) => (
          <Link
            key={cat.id}
            href={`${prefix}/shop?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              currentCategory === cat.slug
                ? "bg-burgundy text-cream"
                : "bg-white text-warm-brown hover:bg-cream-dark"
            }`}
          >
            {cat.translations[0]?.name || cat.slug}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              name={product.translations[0]?.name || product.slug}
              price={product.price}
              imageUrl={product.images[0]?.url || ""}
              imageAlt={product.images[0]?.alt}
              locale={locale}
              localePrefix={prefix}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-warm-brown/50">
          <p className="text-5xl mb-4">🌸</p>
          <p>{t("subtitle")}</p>
        </div>
      )}

      {/* Availability Note */}
      <p className="text-center text-sm text-warm-brown/50 mt-12 italic">
        {t("availabilityNote")}
      </p>
    </div>
  );
}
