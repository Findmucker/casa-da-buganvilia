import AdminProductManager from "@/components/admin/AdminProductManager";
import prisma from "@/lib/prisma";

const LOCALES = ["pt", "en", "fr", "es", "de", "zh", "ja"] as const;

function emptyTranslations() {
  return Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      { name: "", description: "", shortDescription: "" },
    ]),
  );
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        translations: true,
        category: { include: { translations: { where: { locale: "pt" } } } },
        images: { where: { isPrimary: true }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      include: { translations: { where: { locale: "pt" } } },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <AdminProductManager
      categories={categories}
      products={products.map((product) => {
        const translations = emptyTranslations();
        for (const translation of product.translations) {
          translations[translation.locale] = {
            name: translation.name,
            description: translation.description ?? "",
            shortDescription: translation.shortDescription ?? "",
          };
        }

        const productName = translations.pt.name || product.slug;

        return {
          id: product.id,
          active: product.active,
          categoryName:
            product.category.translations[0]?.name || product.category.slug,
          formValue: {
            id: product.id,
            slug: product.slug,
            price: Number(product.price).toFixed(2),
            categoryId: product.categoryId,
            featured: product.featured,
            active: product.active,
            translations,
          },
          imageUrl: product.images[0]?.url ?? null,
          name: productName,
          price: Number(product.price).toFixed(2),
        };
      })}
    />
  );
}
