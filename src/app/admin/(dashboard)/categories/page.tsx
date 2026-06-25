import AdminEntityManager from "@/components/admin/AdminEntityManager";
import prisma from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      translations: { where: { locale: "pt" } },
      _count: { select: { children: true, products: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <AdminEntityManager
      title="Categorias"
      createLabel="Nova Categoria"
      endpoint="/api/admin/categories"
      fields={[
        { key: "slug", label: "Slug", required: true },
        { key: "name", label: "Nome", required: true },
        { key: "description", label: "Descricao", type: "textarea" },
        { key: "sortOrder", label: "Ordem", type: "number" },
        { key: "active", label: "Ativa", type: "checkbox" },
      ]}
      rows={categories.map((category) => ({
        id: category.id,
        title: category.translations[0]?.name || category.slug,
        subtitle: `${category.active ? "Ativa" : "Inativa"} · ${category._count.products} produtos · ${category._count.children} subcategorias`,
        values: {
          slug: category.slug,
          name: category.translations[0]?.name || "",
          description: category.translations[0]?.description || "",
          sortOrder: category.sortOrder,
          active: category.active,
        },
      }))}
    />
  );
}
