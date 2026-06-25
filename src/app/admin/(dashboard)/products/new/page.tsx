import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    include: { translations: { where: { locale: "pt" } } },
    orderBy: { sortOrder: "asc" },
  });

  return <ProductForm categories={categories} />;
}
