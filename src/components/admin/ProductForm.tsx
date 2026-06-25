"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useState } from "react";

const LOCALES = ["pt", "en", "fr", "es", "de", "zh", "ja"] as const;

const LOCALE_NAMES: Record<(typeof LOCALES)[number], string> = {
  pt: "Portugues",
  en: "English",
  fr: "Francais",
  es: "Espanol",
  de: "Deutsch",
  zh: "Chinese",
  ja: "Japanese",
};

export interface ProductCategoryOption {
  id: string;
  slug: string;
  translations: { name: string }[];
}

export interface ProductTranslationFormValue {
  name: string;
  description: string;
  shortDescription: string;
}

export type ProductTranslationMap = Record<string, ProductTranslationFormValue>;

export interface ProductFormValue {
  slug: string;
  price: string;
  categoryId: string;
  featured: boolean;
  active: boolean;
  translations: ProductTranslationMap;
}

interface ProductFormProps {
  categories: ProductCategoryOption[];
  embedded?: boolean;
  initialProduct?: ProductFormValue & { id: string };
  onCancel?: () => void;
  onDeleted?: () => void;
  onSaved?: () => void;
}

function emptyTranslations() {
  return Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      { name: "", description: "", shortDescription: "" },
    ]),
  ) as ProductTranslationMap;
}

function emptyProduct(): ProductFormValue {
  return {
    slug: "",
    price: "",
    categoryId: "",
    featured: false,
    active: true,
    translations: emptyTranslations(),
  };
}

export default function ProductForm({
  categories,
  embedded = false,
  initialProduct,
  onCancel,
  onDeleted,
  onSaved,
}: ProductFormProps) {
  const router = useRouter();
  const [activeLocale, setActiveLocale] =
    useState<(typeof LOCALES)[number]>("pt");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ProductFormValue>(
    initialProduct ?? emptyProduct(),
  );

  const isEditing = Boolean(initialProduct);

  function updateTranslation(
    locale: string,
    field: keyof ProductTranslationFormValue,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      translations: {
        ...previous.translations,
        [locale]: {
          ...previous.translations[locale],
          [field]: value,
        },
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const endpoint = isEditing
      ? `/api/admin/products/${initialProduct?.id}`
      : "/api/admin/products";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Nao foi possivel guardar o produto.");
      }

      if (!embedded) router.push("/admin/products");
      onSaved?.();
      router.refresh();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Nao foi possivel guardar o produto.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initialProduct) return;
    const confirmed = window.confirm("Eliminar este produto?");
    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/products/${initialProduct.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Nao foi possivel eliminar o produto.");
      }

      if (!embedded) router.push("/admin/products");
      onDeleted?.();
      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Nao foi possivel eliminar o produto.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      {!embedded ? (
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin/products"
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </h1>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className={embedded ? "space-y-4" : "max-w-3xl space-y-6"}
      >
        {error ? (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div
          className={
            embedded ? "space-y-4" : "space-y-4 rounded-xl bg-white p-6 shadow-sm"
          }
        >
          <h2 className="font-medium text-gray-900">Informacao basica</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(event) =>
                  setForm({ ...form, slug: event.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Preco (EUR)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(event) =>
                  setForm({ ...form, price: event.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              value={form.categoryId}
              onChange={(event) =>
                setForm({ ...form, categoryId: event.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
              required
            >
              <option value="">Selecionar...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.translations[0]?.name || category.slug}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  setForm({ ...form, featured: event.target.checked })
                }
              />
              Destaque
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) =>
                  setForm({ ...form, active: event.target.checked })
                }
              />
              Ativo
            </label>
          </div>
        </div>

        <div
          className={
            embedded ? "space-y-4" : "space-y-4 rounded-xl bg-white p-6 shadow-sm"
          }
        >
          <h2 className="font-medium text-gray-900">Traducoes</h2>
          <div className="flex flex-wrap gap-2 border-b pb-3">
            {LOCALES.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => setActiveLocale(locale)}
                className={`rounded px-3 py-1 text-sm ${
                  activeLocale === locale
                    ? "bg-burgundy text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {LOCALE_NAMES[locale]}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={form.translations[activeLocale].name}
                onChange={(event) =>
                  updateTranslation(activeLocale, "name", event.target.value)
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descricao curta
              </label>
              <input
                type="text"
                value={form.translations[activeLocale].shortDescription}
                onChange={(event) =>
                  updateTranslation(
                    activeLocale,
                    "shortDescription",
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descricao
              </label>
              <textarea
                rows={4}
                value={form.translations[activeLocale].description}
                onChange={(event) =>
                  updateTranslation(
                    activeLocale,
                    "description",
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={saving || deleting}
            className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-6 py-2.5 text-white transition-colors hover:bg-burgundy/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "A guardar..." : "Guardar Produto"}
          </button>
          {isEditing ? (
            <button
              type="button"
              disabled={saving || deleting}
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-6 py-2.5 text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? "A eliminar..." : "Eliminar"}
            </button>
          ) : null}
          {embedded && onCancel ? (
            <button
              type="button"
              disabled={saving || deleting}
              onClick={onCancel}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
