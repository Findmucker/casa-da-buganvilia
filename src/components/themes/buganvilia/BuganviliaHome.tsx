import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Music } from "lucide-react";
import { CATEGORIES, STORE_ADDRESS, getLocalePrefix } from "@/lib/constants";
import { VineLeft, VineRight, FlowerCorner, FlowerDivider } from "./BuganviliaDecorations";

export default function BuganviliaHome({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const prefix = getLocalePrefix(locale);

  return (
    <div className="relative overflow-hidden">
      <div className="fixed left-0 top-0 w-24 h-full z-10 hidden lg:block">
        <VineLeft className="w-full h-full" />
      </div>
      <div className="fixed right-0 top-0 w-24 h-full z-10 hidden lg:block">
        <VineRight className="w-full h-full" />
      </div>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF3E0] via-[#FFE0B2] to-[#FFF3E0]" />
        {/* Scattered petals — static positions to avoid recalculation */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="529" cy="143" r="3" fill="#C2185B" /><circle cx="186" cy="489" r="4" fill="#D4869C" />
            <circle cx="697" cy="274" r="5" fill="#E91E63" /><circle cx="56" cy="115" r="6" fill="#C2185B" />
            <circle cx="335" cy="389" r="7" fill="#D4869C" /><circle cx="611" cy="51" r="3" fill="#E91E63" />
            <circle cx="148" cy="234" r="4" fill="#C2185B" /><circle cx="478" cy="521" r="5" fill="#D4869C" />
            <circle cx="290" cy="78" r="6" fill="#E91E63" /><circle cx="723" cy="445" r="7" fill="#C2185B" />
            <circle cx="411" cy="189" r="3" fill="#D4869C" /><circle cx="93" cy="356" r="4" fill="#E91E63" />
            <circle cx="562" cy="312" r="5" fill="#C2185B" /><circle cx="215" cy="567" r="6" fill="#D4869C" />
            <circle cx="659" cy="167" r="7" fill="#E91E63" /><circle cx="370" cy="478" r="3" fill="#C2185B" />
            <circle cx="120" cy="89" r="4" fill="#D4869C" /><circle cx="504" cy="401" r="5" fill="#E91E63" />
            <circle cx="267" cy="245" r="6" fill="#C2185B" /><circle cx="750" cy="534" r="7" fill="#D4869C" />
            <circle cx="440" cy="67" r="3" fill="#E91E63" /><circle cx="178" cy="412" r="4" fill="#C2185B" />
            <circle cx="625" cy="198" r="5" fill="#D4869C" /><circle cx="310" cy="556" r="6" fill="#E91E63" />
            <circle cx="72" cy="289" r="7" fill="#C2185B" /><circle cx="490" cy="134" r="3" fill="#D4869C" />
            <circle cx="345" cy="345" r="4" fill="#E91E63" /><circle cx="680" cy="489" r="5" fill="#C2185B" />
            <circle cx="155" cy="178" r="6" fill="#D4869C" /><circle cx="580" cy="423" r="7" fill="#E91E63" />
          </svg>
        </div>

        <div className="relative text-center px-4 max-w-4xl mx-auto z-20">
          <div className="flex justify-center mb-6">
            <FlowerCorner className="w-16 h-16 opacity-70" />
          </div>
          <p className="text-sm tracking-[0.3em] uppercase text-[#A0522D] mb-4 font-medium">
            Óbidos, Portugal
          </p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-[#880E4F] mb-6 leading-tight">
            {t("heroTitle")}
          </h1>
          <FlowerDivider />
          <p className="text-xl md:text-2xl text-[#5D4037]/80 font-serif italic mb-4">
            {t("heroSubtitle")}
          </p>
          <p className="text-base text-[#5D4037]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${prefix}/shop`}>
              <button className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#880E4F] text-[#FFF3E0] font-medium hover:bg-[#C2185B] transition-all shadow-lg hover:shadow-xl">
                {tNav("shop")} <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href={`${prefix}/about`}>
              <button className="inline-flex items-center px-8 py-3.5 rounded-full border-2 border-[#880E4F] text-[#880E4F] font-medium hover:bg-[#880E4F] hover:text-[#FFF3E0] transition-all">
                {t("exploreSpace")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-serif font-bold text-[#880E4F] text-center mb-4">
          {t("featuredProducts")}
        </h2>
        <FlowerDivider />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`${prefix}/category/${cat.slug}`}
              className="group relative text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#D4869C]/20 hover:border-[#C2185B]/40 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <FlowerCorner className="w-10 h-10" />
              </div>
              <span className="text-5xl block mb-4">{cat.icon}</span>
              <h3 className="text-sm font-serif font-semibold text-[#5D4037] group-hover:text-[#C2185B] transition-colors uppercase tracking-wider">
                {tNav(cat.key as any)}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Visit Us */}
      <section className="relative py-20 bg-gradient-to-r from-[#FFE0B2]/50 via-[#FFF3E0] to-[#FFE0B2]/50">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#880E4F] mb-2">
              {t("visitUs")}
            </h2>
            <FlowerDivider />
            <p className="text-[#5D4037]/70 leading-relaxed mb-8 font-serif italic">
              {t("visitUsDescription")}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5D4037]">
                <MapPin className="h-5 w-5 text-[#C2185B]" />
                <span>{STORE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3 text-[#5D4037]">
                <Clock className="h-5 w-5 text-[#C2185B]" />
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex items-center gap-3 text-[#5D4037]">
                <Music className="h-5 w-5 text-[#C2185B]" />
                <span className="italic text-[#5D4037]/60">Music always on</span>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#D4869C]/30 bg-[#FFE0B2] flex items-center justify-center">
            {/* Garden illustration placeholder */}
            <svg viewBox="0 0 300 200" className="w-full h-full p-8" fill="none">
              <rect x="60" y="80" width="180" height="100" rx="8" fill="#5D4037" opacity="0.2" />
              <rect x="70" y="70" width="160" height="90" rx="6" fill="#FFF3E0" stroke="#5D4037" strokeWidth="1" opacity="0.6" />
              <rect x="120" y="110" width="30" height="50" rx="2" fill="#5D4037" opacity="0.3" />
              <rect x="130" y="115" width="10" height="10" rx="1" fill="#FFE0B2" />
              {/* Flowers on the house */}
              <circle cx="100" cy="85" r="5" fill="#C2185B" opacity="0.7" />
              <circle cx="95" cy="80" r="4" fill="#D4869C" opacity="0.6" />
              <circle cx="105" cy="82" r="3.5" fill="#E91E63" opacity="0.65" />
              <circle cx="170" cy="78" r="5.5" fill="#C2185B" opacity="0.7" />
              <circle cx="165" cy="73" r="4" fill="#D4869C" opacity="0.6" />
              <circle cx="176" cy="75" r="4" fill="#E91E63" opacity="0.65" />
              {/* Vines */}
              <path d="M90 90 C85 95, 80 110, 75 130" stroke="#558B2F" strokeWidth="1.5" opacity="0.5" />
              <path d="M175 85 C180 95, 185 115, 190 140" stroke="#558B2F" strokeWidth="1.5" opacity="0.5" />
              <text x="150" y="185" textAnchor="middle" fill="#5D4037" opacity="0.4" fontSize="12" fontFamily="serif">🏠</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Art Gallery */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#880E4F] mb-2">
          {t("artGallery")}
        </h2>
        <FlowerDivider />
        <p className="text-[#5D4037]/70 max-w-2xl mx-auto mb-8 font-serif italic">
          {t("artGalleryDescription")}
        </p>
        <Link href={`${prefix}/gallery`}>
          <button className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#A0522D] text-[#FFF3E0] font-medium hover:bg-[#5D4037] transition-all shadow-lg">
            {tNav("gallery")} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </Link>
      </section>
    </div>
  );
}
