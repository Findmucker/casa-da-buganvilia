"use client";

import Image from "next/image";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import ProductForm, {
  type ProductCategoryOption,
  type ProductFormValue,
} from "@/components/admin/ProductForm";
import ProductStatusToggle from "@/components/admin/ProductStatusToggle";

export interface AdminProductRow {
  id: string;
  categoryName: string;
  imageUrl: string | null;
  name: string;
  price: string;
  active: boolean;
  formValue: ProductFormValue & { id: string };
}

interface AdminProductManagerProps {
  categories: ProductCategoryOption[];
  products: AdminProductRow[];
}

export default function AdminProductManager({
  categories,
  products,
}: AdminProductManagerProps) {
  const [selectedProduct, setSelectedProduct] = useState<
    AdminProductRow | undefined
  >();
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  function startCreate() {
    setSelectedProduct(undefined);
    setFormMode("create");
  }

  function startEdit(product: AdminProductRow) {
    setSelectedProduct(product);
    setFormMode("edit");
  }

  const editingProduct = formMode === "edit" ? selectedProduct : undefined;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-4 py-2 text-sm text-white transition-colors hover:bg-burgundy/90"
        >
          <Plus className="h-4 w-4" />
          Novo Produto
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px]">
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
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
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.categoryName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    EUR {Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <ProductStatusToggle
                      active={product.active}
                      productId={product.id}
                      productName={product.name}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="inline-flex items-center gap-1 text-sm text-burgundy hover:underline"
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
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

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="font-medium text-gray-900">
              {editingProduct ? "Editar produto" : "Criar produto"}
            </h2>
            {editingProduct ? (
              <p className="mt-1 text-sm text-gray-500">
                {editingProduct.name}
              </p>
            ) : null}
          </div>
          <ProductForm
            key={editingProduct?.id ?? "new-product"}
            categories={categories}
            embedded
            initialProduct={editingProduct?.formValue}
            onCancel={startCreate}
            onDeleted={startCreate}
            onSaved={startCreate}
          />
        </div>
      </div>
    </div>
  );
}
