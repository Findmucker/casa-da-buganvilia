import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const LOCALES = ["pt", "en", "fr", "es", "de", "zh", "ja"];

function emptyTranslations() {
  return Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      { name: "", description: "", shortDescription: "" },
    ]),
  );
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { translations: true },
    }),
    prisma.category.findMany({
      include: { translations: { where: { locale: "pt" } } },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!product) notFound();

  const translations = emptyTranslations();
  for (const translation of product.translations) {
    translations[translation.locale] = {
      name: translation.name,
      description: translation.description ?? "",
      shortDescription: translation.shortDescription ?? "",
    };
  }

  return (
    <ProductForm
      categories={categories}
      initialProduct={{
        id: product.id,
        slug: product.slug,
        price: Number(product.price).toFixed(2),
        categoryId: product.categoryId,
        featured: product.featured,
        active: product.active,
        translations,
      }}
    />
  );
}
