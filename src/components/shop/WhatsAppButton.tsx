"use client";

import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  productName: string;
  productUrl: string;
  phoneNumber: string;
  className?: string;
}

export default function WhatsAppButton({
  productName,
  productUrl,
  phoneNumber,
  className = "",
}: WhatsAppButtonProps) {
  const locale = useLocale();
  const t = useTranslations("shop");

  const whatsappUrl = getWhatsAppLink(phoneNumber, productName, productUrl, locale);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium px-6 py-3 rounded-lg transition-colors ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {t("enquireWhatsApp")}
    </a>
  );
}
