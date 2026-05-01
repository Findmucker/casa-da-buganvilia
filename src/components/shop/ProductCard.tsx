import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import StockBadge from "@/components/shop/StockBadge";

interface ProductCardProps {
  slug: string;
  name: string;
  price: number | string;
  imageUrl: string;
  imageAlt?: string;
  locale: string;
  localePrefix: string;
  stock?: number;
  hasStock?: boolean;
}

export default function ProductCard({
  slug,
  name,
  price,
  imageUrl,
  imageAlt,
  locale,
  localePrefix,
  stock = 0,
  hasStock = true,
}: ProductCardProps) {
  return (
    <Link
      href={`${localePrefix}/shop/${slug}`}
      className="group block"
    >
      <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-cream-dark">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-brown/30">
            <span className="text-4xl">🌸</span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-warm-brown group-hover:text-burgundy transition-colors">
          {name}
        </h3>
        <p className="text-sm font-serif text-terracotta mt-1">
          {formatPrice(price, locale)}
        </p>
        <div className="mt-1.5">
          <StockBadge stock={stock} hasStock={hasStock} locale={locale} />
        </div>
      </div>
    </Link>
  );
}
