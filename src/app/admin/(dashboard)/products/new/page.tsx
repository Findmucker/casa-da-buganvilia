"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  translations: { name: string }[];
}

const LOCALES = ["pt", "en", "fr", "es", "de", "zh", "ja"];
const LOCALE_NAMES: Record<string, string> = {
  pt: "Português", en: "English", fr: "Français", es: "Español",
  de: "Deutsch", zh: "中文", ja: "日本語",
};

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeLocale, setActiveLocale] = useState("pt");

  const [form, setForm] = useState({
    slug: "",
    price: "",
    categoryId: "",
    featured: false,
    active: true,
    translations: Object.fromEntries(
      LOCALES.map((l) => [l, { name: "", description: "", shortDescription: "" }])
    ),
  });

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/products");
      } else {
        alert("Erro ao criar produto");
      }
    } catch {
      alert("Erro ao criar produto");
    } finally {
      setLoading(false);
    }
  }

  function updateTranslation(locale: string, field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [locale]: { ...prev.translations[locale], [field]: value },
      },
    }));
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Produto</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Basic fields */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-medium text-gray-900">Informação Básica</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço (€)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            >
              <option value="">Selecionar...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.translations[0]?.name || cat.slug}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Destaque
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Ativo
            </label>
          </div>
        </div>

        {/* Translations */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-medium text-gray-900">Traduções</h2>
          <div className="flex gap-2 border-b pb-3">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLocale(l)}
                className={`px-3 py-1 rounded text-sm ${
                  activeLocale === l ? "bg-burgundy text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {LOCALE_NAMES[l]}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={form.translations[activeLocale].name}
                onChange={(e) => updateTranslation(activeLocale, "name", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta</label>
              <input
                type="text"
                value={form.translations[activeLocale].shortDescription}
                onChange={(e) => updateTranslation(activeLocale, "shortDescription", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                rows={4}
                value={form.translations[activeLocale].description}
                onChange={(e) => updateTranslation(activeLocale, "description", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-burgundy text-white px-6 py-2.5 rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "A guardar..." : "Guardar Produto"}
        </button>
      </form>
    </div>
  );
}
