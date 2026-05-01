interface StockBadgeProps {
  stock: number;
  hasStock: boolean;
  locale?: string;
}

const LABELS: Record<string, { inStock: string; lowStock: string; outOfStock: string; noTracking: string }> = {
  pt: { inStock: "Em stock", lowStock: "Últimas unidades", outOfStock: "Esgotado", noTracking: "Consultar disponibilidade" },
  en: { inStock: "In stock", lowStock: "Last units", outOfStock: "Out of stock", noTracking: "Check availability" },
  fr: { inStock: "En stock", lowStock: "Dernières unités", outOfStock: "Épuisé", noTracking: "Vérifier la disponibilité" },
  es: { inStock: "En stock", lowStock: "Últimas unidades", outOfStock: "Agotado", noTracking: "Consultar disponibilidad" },
  de: { inStock: "Auf Lager", lowStock: "Letzte Einheiten", outOfStock: "Ausverkauft", noTracking: "Verfügbarkeit prüfen" },
  zh: { inStock: "有库存", lowStock: "最后几件", outOfStock: "已售罄", noTracking: "查询库存" },
  ja: { inStock: "在庫あり", lowStock: "残りわずか", outOfStock: "在庫切れ", noTracking: "在庫確認" },
};

export default function StockBadge({ stock, hasStock, locale = "pt" }: StockBadgeProps) {
  const labels = LABELS[locale] || LABELS.pt;

  if (!hasStock) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-warm-brown/60 bg-cream-dark px-2 py-1 rounded-full">
        {labels.noTracking}
      </span>
    );
  }

  if (stock <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        {labels.outOfStock}
      </span>
    );
  }

  if (stock <= 3) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        {labels.lowStock}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      {labels.inStock}
    </span>
  );
}
