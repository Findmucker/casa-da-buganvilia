import AdminEntityManager from "@/components/admin/AdminEntityManager";
import prisma from "@/lib/prisma";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <AdminEntityManager
      title="Espaco e Galeria"
      createLabel="Nova Imagem"
      endpoint="/api/admin/gallery-images"
      fields={[
        { key: "url", label: "URL da imagem", required: true },
        { key: "cloudinaryPublicId", label: "Cloudinary public ID" },
        { key: "alt", label: "Texto alternativo" },
        { key: "section", label: "Sala / seccao", required: true },
        { key: "sortOrder", label: "Ordem", type: "number" },
      ]}
      rows={images.map((image) => ({
        id: image.id,
        title: image.alt || image.url,
        subtitle: `${image.section} · ordem ${image.sortOrder}`,
        values: {
          url: image.url,
          cloudinaryPublicId: image.cloudinaryPublicId,
          alt: image.alt || "",
          section: image.section,
          sortOrder: image.sortOrder,
        },
      }))}
    />
  );
}
