import AdminEntityManager from "@/components/admin/AdminEntityManager";
import prisma from "@/lib/prisma";

export default async function AdminArtistsPage() {
  const artists = await prisma.artist.findMany({
    include: {
      translations: { where: { locale: "pt" } },
      _count: { select: { artworks: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminEntityManager
      title="Artistas"
      createLabel="Novo Artista"
      endpoint="/api/admin/artists"
      fields={[
        { key: "slug", label: "Slug", required: true },
        { key: "name", label: "Nome", required: true },
        { key: "bio", label: "Biografia", type: "textarea" },
        { key: "photoUrl", label: "URL da fotografia" },
        { key: "active", label: "Ativo", type: "checkbox" },
      ]}
      rows={artists.map((artist) => ({
        id: artist.id,
        title: artist.translations[0]?.name || artist.slug,
        subtitle: `${artist.active ? "Ativo" : "Inativo"} · ${artist._count.artworks} obras`,
        values: {
          slug: artist.slug,
          name: artist.translations[0]?.name || "",
          bio: artist.translations[0]?.bio || "",
          photoUrl: artist.photoUrl || "",
          active: artist.active,
        },
      }))}
    />
  );
}
