import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Music } from "lucide-react";
import { CATEGORIES, STORE_ADDRESS, getLocalePrefix } from "@/lib/constants";
import { TorchLeft, TorchRight, ParchmentSection, GoldDivider, ShieldIcon, StoneBorder } from "./MedievalDecorations";

const OCTAGON_CLIP = "polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)";

export default function MedievalHome({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const prefix = getLocalePrefix(locale);

  return (
    <div className="relative overflow-hidden bg-[#1A1A2E]">
      <div className="fixed left-4 top-20 w-16 h-[500px] z-10 hidden lg:block">
        <TorchLeft className="w-full h-full" />
      </div>
      <div className="fixed right-4 top-20 w-16 h-[500px] z-10 hidden lg:block">
        <TorchRight className="w-full h-full" />
      </div>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1A] via-[#1A1A2E] to-[#2D1B1B]" />
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#FFD700]/5 to-transparent" />
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#FFD700]/5 to-transparent" />
        {/* Stone texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(100,100,100,0.1) 20px, rgba(100,100,100,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(100,100,100,0.08) 40px, rgba(100,100,100,0.08) 41px)`,
        }} />

        <div className="relative text-center px-4 max-w-4xl mx-auto z-20">
          <div className="flex justify-center mb-6">
            <ShieldIcon className="w-16 h-20 opacity-80" />
          </div>
          <p className="text-sm tracking-[0.4em] uppercase text-[#C9A96E]/70 mb-4 font-serif">
            Óbidos, Portugal
          </p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-[#C9A96E] mb-6 leading-tight tracking-wide" style={{
            textShadow: "0 0 40px rgba(201,169,110,0.3), 0 0 80px rgba(201,169,110,0.1)",
          }}>
            {t("heroTitle")}
          </h1>
          <GoldDivider />
          <p className="text-xl md:text-2xl text-[#F5E6C8]/60 font-serif italic mb-4">
            {t("heroSubtitle")}
          </p>
          <p className="text-base text-[#F5E6C8]/40 max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${prefix}/shop`}>
              <button className="inline-flex items-center px-8 py-3.5 font-serif font-medium tracking-wider uppercase border-2 border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1A2E] transition-all" style={{ clipPath: OCTAGON_CLIP }}>
                {tNav("shop")} <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href={`${prefix}/about`}>
              <button className="inline-flex items-center px-8 py-3.5 font-serif font-medium tracking-wider uppercase border border-[#C9A96E]/40 text-[#C9A96E]/70 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all" style={{ clipPath: OCTAGON_CLIP }}>
                {t("exploreSpace")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <StoneBorder />

      {/* Categories */}
      <section className="relative py-20 bg-gradient-to-b from-[#2D1B1B] via-[#F5E6C8] to-[#F5E6C8]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-serif font-bold text-[#6B1D1D] text-center mb-4 tracking-wide">
            {t("featuredProducts")}
          </h2>
          <GoldDivider />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {CATEGORIES.map((cat) => (
              <Link key={cat.key} href={`${prefix}/category/${cat.slug}`}>
                <ParchmentSection className="group cursor-pointer hover:-translate-y-1 transition-transform">
                  <div className="text-center p-8">
                    <span className="text-5xl block mb-4">{cat.icon}</span>
                    <h3 className="text-sm font-serif font-bold text-[#6B1D1D] uppercase tracking-widest group-hover:text-[#C9A96E] transition-colors">
                      {tNav(cat.key as any)}
                    </h3>
                  </div>
                </ParchmentSection>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="relative py-20 bg-[#F5E6C8]">
        <StoneBorder />
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center mt-8">
          <ParchmentSection>
            <div className="p-10">
              <h2 className="text-3xl font-serif font-bold text-[#6B1D1D] mb-2 tracking-wide">
                {t("visitUs")}
              </h2>
              <GoldDivider />
              <p className="text-[#5C4033]/70 leading-relaxed mb-8 font-serif italic">
                {t("visitUsDescription")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#5C4033] font-serif">
                  <MapPin className="h-5 w-5 text-[#6B1D1D]" />
                  <span>{STORE_ADDRESS}</span>
                </div>
                <div className="flex items-center gap-3 text-[#5C4033] font-serif">
                  <Clock className="h-5 w-5 text-[#6B1D1D]" />
                  <span>10:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-3 text-[#5C4033] font-serif">
                  <Music className="h-5 w-5 text-[#6B1D1D]" />
                  <span className="italic text-[#5C4033]/60">Music always on</span>
                </div>
              </div>
            </div>
          </ParchmentSection>

          {/* Castle illustration */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#1A1A2E] flex items-center justify-center">
            <svg viewBox="0 0 400 280" className="w-full h-full p-6" fill="none">
              <rect width="400" height="280" fill="#0D0D1A" />
              <circle cx="320" cy="40" r="15" fill="#F5E6C8" opacity="0.8" />
              {[50, 120, 200, 280, 350, 80, 170, 250, 310].map((x, i) => (
                <circle key={i} cx={x} cy={15 + (i % 3) * 20} r={1} fill="#F5E6C8" opacity={0.4 + (i % 3) * 0.2} />
              ))}
              <rect x="100" y="120" width="200" height="140" fill="#3D3D5C" />
              <rect x="90" y="80" width="40" height="180" fill="#2D2D4C" />
              <rect x="270" y="80" width="40" height="180" fill="#2D2D4C" />
              {[90, 100, 110, 120].map((x, i) => (
                <rect key={`bl${i}`} x={x} y={72} width={8} height={12} fill={i % 2 === 0 ? "#2D2D4C" : "transparent"} />
              ))}
              {[270, 280, 290, 300].map((x, i) => (
                <rect key={`br${i}`} x={x} y={72} width={8} height={12} fill={i % 2 === 0 ? "#2D2D4C" : "transparent"} />
              ))}
              <path d="M175 260 L175 190 Q200 170 225 190 L225 260" fill="#1A1A2E" stroke="#C9A96E" strokeWidth="1" />
              <rect x="130" y="150" width="15" height="20" rx="7" fill="#C9A96E" opacity="0.4" />
              <rect x="255" y="150" width="15" height="20" rx="7" fill="#C9A96E" opacity="0.4" />
              <line x1="110" y1="40" x2="110" y2="80" stroke="#6B6B6B" strokeWidth="2" />
              <path d="M112 42 L135 50 L112 58" fill="#6B1D1D" />
            </svg>
          </div>
        </div>
      </section>

      {/* Art Gallery */}
      <section className="relative py-20 bg-[#1A1A2E]">
        <StoneBorder />
        <div className="max-w-6xl mx-auto px-8 text-center mt-8">
          <h2 className="text-3xl font-serif font-bold text-[#C9A96E] mb-2 tracking-wide" style={{
            textShadow: "0 0 30px rgba(201,169,110,0.2)",
          }}>
            {t("artGallery")}
          </h2>
          <GoldDivider />
          <p className="text-[#F5E6C8]/50 max-w-2xl mx-auto mb-8 font-serif italic">
            {t("artGalleryDescription")}
          </p>
          <Link href={`${prefix}/gallery`}>
            <button className="inline-flex items-center px-8 py-3.5 font-serif font-medium tracking-wider uppercase border-2 border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1A2E] transition-all" style={{ clipPath: OCTAGON_CLIP }}>
              {tNav("gallery")} <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
