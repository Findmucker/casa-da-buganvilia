import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FOOTER_NAV_KEYS, STORE_ADDRESS, getLocalePrefix } from "@/lib/constants";
import { StoneBorder, GoldDivider } from "./MedievalDecorations";

export default function MedievalFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const prefix = getLocalePrefix(locale);

  return (
    <footer className="relative bg-[#1A1A2E] text-[#F5E6C8]">
      <StoneBorder />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-[#C9A96E] tracking-widest uppercase">
              Casa da Buganvília
            </h3>
            <p className="text-[#F5E6C8]/60 text-sm leading-relaxed font-serif">
              {STORE_ADDRESS}
            </p>
            <GoldDivider />
          </div>

          <div>
            <h4 className="text-sm font-serif font-bold uppercase tracking-widest mb-4 text-[#C9A96E]/60">
              {tNav("shop")}
            </h4>
            <ul className="space-y-2">
              {FOOTER_NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link href={`${prefix}/shop`} className="text-sm font-serif text-[#F5E6C8]/50 hover:text-[#C9A96E] transition-colors">
                    {tNav(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-serif font-bold uppercase tracking-widest mb-4 text-[#C9A96E]/60">
              {t("followUs")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: `${prefix}/gallery`, key: "gallery" },
                { href: `${prefix}/about`, key: "about" },
                { href: `${prefix}/contact`, key: "contact" },
              ].map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-sm font-serif text-[#F5E6C8]/50 hover:text-[#C9A96E] transition-colors">
                    {tNav(item.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#C9A96E]/15 text-center text-sm text-[#F5E6C8]/30 font-serif">
          <p>&copy; {new Date().getFullYear()} Casa da Buganvília. {t("rights")}.</p>
        </div>
      </div>
    </footer>
  );
}
