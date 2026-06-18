import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface ProductCardProps {
  name: string;
  imageUrl: string;
  imageAlt?: string;
  locale: string;
  productUrl: string;
  phoneNumber: string;
  enquiryLabel: string;
}

export default function ProductCard({
  name,
  imageUrl,
  imageAlt,
  locale,
  productUrl,
  phoneNumber,
  enquiryLabel,
}: ProductCardProps) {
  const whatsappUrl = getWhatsAppLink(phoneNumber, name, productUrl, locale);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-4"
      aria-label={`${enquiryLabel}: ${name}`}
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
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#128C7E]">
          <MessageCircle className="h-3.5 w-3.5" />
          {enquiryLabel}
        </span>
      </div>
    </a>
  );
}
