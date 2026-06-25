interface ProductTranslationInput {
  name?: string;
  description?: string;
  shortDescription?: string;
}

export interface ProductSaveInput {
  active: boolean;
  categoryId: string;
  featured: boolean;
  price: number;
  slug: string;
  translations: {
    locale: string;
    name: string;
    description: string | null;
    shortDescription: string | null;
  }[];
}

interface ProductSaveBody {
  active?: boolean;
  categoryId?: string;
  featured?: boolean;
  price?: number | string;
  slug?: string;
  translations?: Record<string, ProductTranslationInput>;
}

function parsePrice(value: number | string | undefined) {
  if (typeof value === "number") return value;
  if (!value) return Number.NaN;

  return Number(value.trim().replace(",", "."));
}

export function normalizeProductSaveInput(
  body: ProductSaveBody,
): ProductSaveInput | { error: string } {
  const slug = body.slug?.trim();
  if (!slug) return { error: "O slug do produto e obrigatorio." };

  const categoryId = body.categoryId?.trim();
  if (!categoryId) return { error: "A categoria do produto e obrigatoria." };

  const price = parsePrice(body.price);
  if (!Number.isFinite(price) || price < 0) {
    return { error: "O preco do produto deve ser um numero valido." };
  }

  const translationEntries = Object.entries(body.translations ?? {})
    .map(([locale, value]) => ({
      locale,
      name: value.name?.trim() ?? "",
      description: value.description?.trim() || null,
      shortDescription: value.shortDescription?.trim() || null,
    }))
    .filter((translation) => translation.name);

  if (translationEntries.length === 0) {
    return { error: "Adicione pelo menos um nome de produto." };
  }

  return {
    active: body.active !== false,
    categoryId,
    featured: body.featured === true,
    price,
    slug,
    translations: translationEntries,
  };
}

