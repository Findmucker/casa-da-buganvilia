import prisma from "@/lib/prisma";
import { Package, Tag, Palette, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, artistCount, artworkCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.artist.count(),
    prisma.artwork.count(),
  ]);

  const stats = [
    { label: "Produtos", value: productCount, icon: Package, color: "bg-terracotta" },
    { label: "Categorias", value: categoryCount, icon: Tag, color: "bg-olive" },
    { label: "Artistas", value: artistCount, icon: Palette, color: "bg-bougainvillea" },
    { label: "Obras de Arte", value: artworkCount, icon: ImageIcon, color: "bg-burgundy" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Painel de Controlo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
