import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FOOTER_NAV_KEYS, STORE_ADDRESS, getLocalePrefix } from "@/lib/constants";
import { FlowerDivider } from "./BuganviliaDecorations";

export default function BuganviliaFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const prefix = getLocalePrefix(locale);

  return (
    <footer className="relative bg-[#3E2723] text-[#FFF3E0]">
      {/* Flower border along the top */}
      <div className="h-6 overflow-hidden">
        <svg viewBox="0 0 1200 24" className="w-full h-full" preserveAspectRatio="none" fill="none">
          {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200].map((x, i) => (
            <g key={i}>
              <circle cx={x + 20} cy={12} r={5} fill={i % 3 === 0 ? "#C2185B" : i % 3 === 1 ? "#D4869C" : "#E91E63"} opacity={0.6} />
              <circle cx={x + 30} cy={9} r={3.5} fill={i % 2 === 0 ? "#D4869C" : "#C2185B"} opacity={0.5} />
              <circle cx={x + 40} cy={14} r={4} fill="#E91E63" opacity={0.45} />
            </g>
          ))}
          <path d="M0 18 C200 10, 400 20, 600 12 C800 4, 1000 16, 1200 10" stroke="#558B2F" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-[#D4869C]">Casa da Buganvília</h3>
            <p className="text-[#FFF3E0]/70 text-sm leading-relaxed">
              {STORE_ADDRESS}
            </p>
            <FlowerDivider />
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#FFF3E0]/50">
              {tNav("shop")}
            </h4>
            <ul className="space-y-2">
              {FOOTER_NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link href={`${prefix}/shop`} className="text-sm text-[#FFF3E0]/60 hover:text-[#D4869C] transition-colors">
                    {tNav(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#FFF3E0]/50">
              {t("followUs")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: `${prefix}/gallery`, key: "gallery" },
                { href: `${prefix}/about`, key: "about" },
                { href: `${prefix}/contact`, key: "contact" },
              ].map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-sm text-[#FFF3E0]/60 hover:text-[#D4869C] transition-colors">
                    {tNav(item.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#FFF3E0]/10 text-center text-sm text-[#FFF3E0]/40">
          <p>&copy; {new Date().getFullYear()} Casa da Buganvília. {t("rights")}.</p>
        </div>
      </div>
    </footer>
  );
}
