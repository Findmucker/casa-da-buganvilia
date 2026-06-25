import AdminEntityManager from "@/components/admin/AdminEntityManager";
import prisma from "@/lib/prisma";

const gallerySections = [
  { value: "EXTERIOR", label: "Exterior" },
  { value: "GROUND_FLOOR", label: "Res-do-chao" },
  { value: "SECOND_FLOOR", label: "Primeiro andar" },
  { value: "COURTYARD", label: "Patio" },
  { value: "DETAIL", label: "Detalhe" },
];

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
        {
          key: "section",
          label: "Sala / seccao",
          type: "select",
          required: true,
          options: gallerySections,
        },
        { key: "sortOrder", label: "Ordem", type: "number" },
      ]}
      rows={images.map((image) => ({
        id: image.id,
        title: image.alt || image.url,
        subtitle: `${gallerySections.find((section) => section.value === image.section)?.label ?? image.section} · ordem ${image.sortOrder}`,
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
