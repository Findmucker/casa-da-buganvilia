import AdminEntityManager from "@/components/admin/AdminEntityManager";
import prisma from "@/lib/prisma";

export default async function AdminArtworksPage() {
  const [artworks, artists] = await Promise.all([
    prisma.artwork.findMany({
      include: {
        artist: { include: { translations: { where: { locale: "pt" } } } },
        translations: { where: { locale: "pt" } },
        images: { take: 1, orderBy: { sortOrder: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.artist.findMany({
      include: { translations: { where: { locale: "pt" } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <AdminEntityManager
      title="Obras de Arte"
      createLabel="Nova Obra"
      endpoint="/api/admin/artworks"
      fields={[
        { key: "slug", label: "Slug", required: true },
        {
          key: "artistId",
          label: "Artista",
          type: "select",
          required: true,
          options: artists.map((artist) => ({
            value: artist.id,
            label: artist.translations[0]?.name || artist.slug,
          })),
        },
        { key: "title", label: "Titulo", required: true },
        { key: "description", label: "Descricao", type: "textarea" },
        { key: "medium", label: "Tecnica" },
        { key: "price", label: "Preco", type: "number" },
        { key: "imageUrl", label: "URL da imagem" },
        { key: "active", label: "Ativa", type: "checkbox" },
      ]}
      rows={artworks.map((artwork) => ({
        id: artwork.id,
        title: artwork.translations[0]?.title || artwork.slug,
        subtitle: `${artwork.active ? "Ativa" : "Inativa"} · ${
          artwork.artist.translations[0]?.name || artwork.artist.slug
        }`,
        values: {
          slug: artwork.slug,
          artistId: artwork.artistId,
          title: artwork.translations[0]?.title || "",
          description: artwork.translations[0]?.description || "",
          medium: artwork.medium || "",
          price: artwork.price ? Number(artwork.price) : 0,
          imageUrl: artwork.images[0]?.url || "",
          active: artwork.active,
        },
      }))}
    />
  );
}
