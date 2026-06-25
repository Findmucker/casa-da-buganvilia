import Link from "next/link";
import {
  AlertCircle,
  Image as ImageIcon,
  Package,
  Palette,
  Settings,
  Sparkles,
  Tag,
} from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    productCount,
    activeProductCount,
    inactiveProductCount,
    featuredProductCount,
    categoryCount,
    activeCategoryCount,
    artistCount,
    activeArtistCount,
    artworkCount,
    activeArtworkCount,
    galleryImageCount,
    settingsCount,
    productsWithoutImages,
    artworksWithoutImages,
    recentProducts,
    recentArtworks,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { active: false } }),
    prisma.product.count({ where: { featured: true } }),
    prisma.category.count(),
    prisma.category.count({ where: { active: true } }),
    prisma.artist.count(),
    prisma.artist.count({ where: { active: true } }),
    prisma.artwork.count(),
    prisma.artwork.count({ where: { active: true } }),
    prisma.galleryImage.count(),
    prisma.siteSettings.count(),
    prisma.product.count({ where: { images: { none: {} } } }),
    prisma.artwork.count({ where: { images: { none: {} } } }),
    prisma.product.findMany({
      include: { translations: { where: { locale: "pt" } } },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.artwork.findMany({
      include: {
        artist: { include: { translations: { where: { locale: "pt" } } } },
        translations: { where: { locale: "pt" } },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    {
      href: "/admin/products",
      label: "Produtos",
      value: productCount,
      detail: `${activeProductCount} ativos · ${featuredProductCount} em destaque`,
      icon: Package,
      color: "bg-terracotta",
    },
    {
      href: "/admin/categories",
      label: "Categorias",
      value: categoryCount,
      detail: `${activeCategoryCount} ativas`,
      icon: Tag,
      color: "bg-olive",
    },
    {
      href: "/admin/artists",
      label: "Artistas",
      value: artistCount,
      detail: `${activeArtistCount} ativos`,
      icon: Palette,
      color: "bg-bougainvillea",
    },
    {
      href: "/admin/artworks",
      label: "Obras de arte",
      value: artworkCount,
      detail: `${activeArtworkCount} ativas`,
      icon: ImageIcon,
      color: "bg-burgundy",
    },
  ];

  const attentionItems = [
    {
      label: "Produtos sem imagem",
      value: productsWithoutImages,
      href: "/admin/products",
    },
    {
      label: "Obras sem imagem",
      value: artworksWithoutImages,
      href: "/admin/artworks",
    },
    {
      label: "Produtos inativos",
      value: inactiveProductCount,
      href: "/admin/products",
    },
  ];

  const quickLinks = [
    { href: "/admin/products", label: "Gerir produtos", icon: Package },
    { href: "/admin/gallery", label: "Imagens do espaço", icon: ImageIcon },
    { href: "/admin/settings", label: "Definições", icon: Settings },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Painel de Controlo</h1>
        <p className="mt-1 text-sm text-gray-500">
          Resumo rápido do catálogo, galeria e conteúdos editáveis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl bg-white p-6 shadow-sm transition-colors hover:bg-gray-50"
          >
            <div className="flex items-start gap-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-500">{stat.detail}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-terracotta" />
            <h2 className="font-medium text-gray-900">Precisa de atenção</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {attentionItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50"
              >
                <p className="text-2xl font-bold text-gray-900">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-bougainvillea" />
            <h2 className="font-medium text-gray-900">Conteúdo publicado</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Imagens do espaço</span>
              <span className="font-medium text-gray-900">
                {galleryImageCount}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Definições preenchidas</span>
              <span className="font-medium text-gray-900">{settingsCount}</span>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-medium text-gray-900">
            Produtos atualizados recentemente
          </h2>
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {product.translations[0]?.name || product.slug}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.active ? "Ativo" : "Inativo"}
                  </p>
                </div>
                <Link
                  href="/admin/products"
                  className="text-sm text-burgundy hover:underline"
                >
                  Abrir
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-medium text-gray-900">
            Obras atualizadas recentemente
          </h2>
          <div className="space-y-3">
            {recentArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {artwork.translations[0]?.title || artwork.slug}
                  </p>
                  <p className="text-sm text-gray-500">
                    {artwork.artist.translations[0]?.name ||
                      artwork.artist.slug}
                  </p>
                </div>
                <Link
                  href="/admin/artworks"
                  className="text-sm text-burgundy hover:underline"
                >
                  Abrir
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            <link.icon className="h-4 w-4 text-burgundy" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
