import Image from "next/image";
import Link from "next/link";
import ProductStatusToggle from "@/components/admin/ProductStatusToggle";
import prisma from "@/lib/prisma";
import { Edit, Plus } from "lucide-react";

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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-4 py-2 text-sm text-white transition-colors hover:bg-burgundy/90"
        >
          <Plus className="h-4 w-4" />
          Novo Produto
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Preco
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => {
              const productName = product.translations[0]?.name || product.slug;

              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-lg">
                          CB
                        </div>
                      )}
                      <span className="font-medium text-gray-900">
                        {productName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category.translations[0]?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    EUR {Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <ProductStatusToggle
                      active={product.active}
                      productId={product.id}
                      productName={productName}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-sm text-burgundy hover:underline"
                    >
                      <Edit className="inline h-4 w-4" />
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  Nenhum produto encontrado
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
