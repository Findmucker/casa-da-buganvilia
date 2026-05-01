import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FOOTER_NAV_KEYS, STORE_ADDRESS, getLocalePrefix } from "@/lib/constants";
import { SnowBorder, HollyDivider } from "./ChristmasDecorations";

export default function ChristmasFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const prefix = getLocalePrefix(locale);

  return (
    <footer className="relative bg-[#1B2A1B] text-[#E8F5E9]">
      <SnowBorder />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-[#FDD835] tracking-wide">
              Casa da Buganvilia
            </h3>
            <p className="text-[#A5D6A7]/70 text-sm leading-relaxed">
              {STORE_ADDRESS}
            </p>
            <HollyDivider />
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#C62828]">
              {tNav("shop")}
            </h4>
            <ul className="space-y-2">
              {FOOTER_NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link href={`${prefix}/shop`} className="text-sm text-[#A5D6A7]/60 hover:text-[#FDD835] transition-colors">
                    {tNav(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#C62828]">
              {t("followUs")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: `${prefix}/gallery`, key: "gallery" },
                { href: `${prefix}/about`, key: "about" },
                { href: `${prefix}/contact`, key: "contact" },
              ].map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-sm text-[#A5D6A7]/60 hover:text-[#FDD835] transition-colors">
                    {tNav(item.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2E7D32]/30 text-center text-sm text-[#A5D6A7]/40">
          <p>&copy; {new Date().getFullYear()} Casa da Buganvilia. {t("rights")}.</p>
        </div>
      </div>
    </footer>
  );
}
