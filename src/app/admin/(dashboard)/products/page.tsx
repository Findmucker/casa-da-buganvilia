import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      translations: { where: { locale: "pt" } },
      category: { include: { translations: { where: { locale: "pt" } } } },
      images: { where: { isPrimary: true }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-burgundy text-white px-4 py-2 rounded-lg hover:bg-burgundy/90 transition-colors text-sm"
        >
          <Plus className="h-4 w-4" /> Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Produto</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Preço</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-lg">🌸</div>
                    )}
                    <span className="font-medium text-gray-900">{product.translations[0]?.name || product.slug}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.category.translations[0]?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">€{Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">
                  {product.active ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
                      <Eye className="h-3 w-3" /> Ativo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <EyeOff className="h-3 w-3" /> Inativo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/products/${product.id}`} className="text-sm text-burgundy hover:underline">
                    <Edit className="h-4 w-4 inline" /> Editar
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  Nenhum produto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
