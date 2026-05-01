"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_NAMES: Record<string, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
  es: "ES",
  de: "DE",
  zh: "中文",
  ja: "日本語",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.push(pathname, { locale: newLocale });
  }

  return (
    <div className="relative group">
      <button className="text-sm font-medium text-warm-brown hover:text-burgundy transition-colors px-2 py-1 border border-warm-brown/20 rounded">
        {LOCALE_NAMES[locale] || locale.toUpperCase()}
      </button>
      <div className="absolute right-0 top-full mt-1 bg-cream border border-warm-brown/20 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[80px]">
        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`block w-full text-left px-3 py-2 text-sm hover:bg-cream-dark transition-colors ${
              loc === locale ? "text-burgundy font-bold" : "text-warm-brown"
            }`}
          >
            {LOCALE_NAMES[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}
