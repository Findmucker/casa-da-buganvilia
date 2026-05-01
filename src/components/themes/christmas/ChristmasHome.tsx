import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Music } from "lucide-react";
import { CATEGORIES, STORE_ADDRESS, getLocalePrefix } from "@/lib/constants";
import { Snowflake, HollyDivider, SnowBorder, ChristmasTreeIcon, WinterSection } from "./ChristmasDecorations";

const SNOWFLAKE_POSITIONS = [
  { left: "5%", top: "10%", size: 20, opacity: 0.3 },
  { left: "15%", top: "30%", size: 14, opacity: 0.2 },
  { left: "85%", top: "15%", size: 18, opacity: 0.25 },
  { left: "90%", top: "40%", size: 12, opacity: 0.2 },
  { left: "50%", top: "5%", size: 16, opacity: 0.15 },
  { left: "70%", top: "25%", size: 22, opacity: 0.2 },
  { left: "30%", top: "45%", size: 10, opacity: 0.15 },
];

export default function ChristmasHome({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const prefix = getLocalePrefix(locale);

  return (
    <div className="relative overflow-hidden bg-[#0D1F0D]">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F] via-[#0D1F0D] to-[#1B2A1B]" />
        {/* Falling snow effect - static positioned snowflakes */}
        {SNOWFLAKE_POSITIONS.map((sf, i) => (
          <Snowflake
            key={i}
            className="absolute pointer-events-none"
            style={{ left: sf.left, top: sf.top, width: sf.size, height: sf.size, opacity: sf.opacity }}
          />
        ))}
        {/* Warm light glow from center */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FDD835]/5 blur-3xl" />
        </div>

        <div className="relative text-center px-4 max-w-4xl mx-auto z-20">
          <div className="flex justify-center mb-6">
            <ChristmasTreeIcon className="w-16 h-20" />
          </div>
          <p className="text-sm tracking-[0.4em] uppercase text-[#A5D6A7]/60 mb-4">
            Obidos, Portugal
          </p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight" style={{
            textShadow: "0 0 40px rgba(253,216,53,0.3), 0 0 80px rgba(253,216,53,0.1)",
          }}>
            {t("heroTitle")}
          </h1>
          <HollyDivider />
          <p className="text-xl md:text-2xl text-[#A5D6A7]/70 italic mb-4">
            {t("heroSubtitle")}
          </p>
          <p className="text-base text-[#E8F5E9]/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${prefix}/shop`}>
              <button className="inline-flex items-center px-8 py-3.5 font-medium tracking-wider uppercase rounded-full bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all shadow-lg shadow-[#C62828]/30">
                {tNav("shop")} <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href={`${prefix}/about`}>
              <button className="inline-flex items-center px-8 py-3.5 font-medium tracking-wider uppercase rounded-full border-2 border-[#2E7D32] text-[#A5D6A7] hover:bg-[#2E7D32]/20 transition-all">
                {t("exploreSpace")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <SnowBorder />

      {/* Categories */}
      <section className="relative py-20 bg-gradient-to-b from-[#1B2A1B] via-[#F5F5F0] to-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-serif font-bold text-[#1B5E20] text-center mb-4">
            {t("featuredProducts")}
          </h2>
          <HollyDivider />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {CATEGORIES.map((cat) => (
              <Link key={cat.key} href={`${prefix}/category/${cat.slug}`}>
                <WinterSection className="group cursor-pointer hover:-translate-y-1 transition-transform">
                  <div className="text-center p-8">
                    <span className="text-5xl block mb-4">{cat.icon}</span>
                    <h3 className="text-sm font-bold text-[#1B5E20] uppercase tracking-widest group-hover:text-[#C62828] transition-colors">
                      {tNav(cat.key as any)}
                    </h3>
                  </div>
                </WinterSection>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="relative py-20 bg-[#F5F5F0]">
        <SnowBorder />
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center mt-8">
          <WinterSection>
            <div className="p-10">
              <h2 className="text-3xl font-serif font-bold text-[#1B5E20] mb-2">
                {t("visitUs")}
              </h2>
              <HollyDivider />
              <p className="text-[#5D4037]/70 leading-relaxed mb-8 italic">
                {t("visitUsDescription")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#5D4037]">
                  <MapPin className="h-5 w-5 text-[#C62828]" />
                  <span>{STORE_ADDRESS}</span>
                </div>
                <div className="flex items-center gap-3 text-[#5D4037]">
                  <Clock className="h-5 w-5 text-[#C62828]" />
                  <span>10:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-3 text-[#5D4037]">
                  <Music className="h-5 w-5 text-[#C62828]" />
                  <span className="italic text-[#5D4037]/60">Music always on</span>
                </div>
              </div>
            </div>
          </WinterSection>

          {/* Winter scene */}
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#0A1A2F] flex items-center justify-center">
            <svg viewBox="0 0 400 280" className="w-full h-full p-6" fill="none">
              <rect width="400" height="280" fill="#0A1A2F" />
              <circle cx="320" cy="40" r="20" fill="#F5F5F0" opacity="0.9" />
              {/* Stars */}
              {[50, 120, 200, 280, 350, 80, 170, 250, 310].map((x, i) => (
                <circle key={i} cx={x} cy={15 + (i % 3) * 20} r={1.5} fill="white" opacity={0.4 + (i % 3) * 0.2} />
              ))}
              {/* Snow ground */}
              <path d="M0 220 Q50 210, 100 220 Q150 230, 200 218 Q250 208, 300 222 Q350 232, 400 215 L400 280 L0 280 Z" fill="white" opacity="0.9" />
              {/* Christmas tree */}
              <polygon points="200,80 240,160 160,160" fill="#2E7D32" />
              <polygon points="200,110 250,190 150,190" fill="#1B5E20" />
              <polygon points="200,140 260,220 140,220" fill="#145214" />
              <rect x="192" y="220" width="16" height="20" fill="#5D4037" />
              <circle cx="200" cy="85" r="5" fill="#FDD835" />
              {/* Ornaments */}
              <circle cx="185" cy="145" r="4" fill="#C62828" />
              <circle cx="215" cy="135" r="3.5" fill="#FDD835" />
              <circle cx="178" cy="175" r="4" fill="#1565C0" />
              <circle cx="222" cy="185" r="3.5" fill="#C62828" />
              <circle cx="195" cy="200" r="4" fill="#FDD835" />
              {/* Small house */}
              <rect x="300" y="190" width="50" height="30" fill="#5D4037" />
              <polygon points="300,190 325,170 350,190" fill="#C62828" />
              <rect x="315" y="200" width="12" height="20" fill="#3E2723" />
              <rect x="305" y="195" width="8" height="8" fill="#FDD835" opacity="0.7" />
              {/* Snowflakes */}
              <circle cx="100" cy="100" r="3" fill="white" opacity="0.5" />
              <circle cx="300" cy="120" r="2" fill="white" opacity="0.4" />
              <circle cx="150" cy="70" r="2.5" fill="white" opacity="0.3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Art Gallery */}
      <section className="relative py-20 bg-[#0D1F0D]">
        <SnowBorder />
        <div className="max-w-6xl mx-auto px-8 text-center mt-8">
          <h2 className="text-3xl font-serif font-bold text-[#FDD835] mb-2" style={{
            textShadow: "0 0 30px rgba(253,216,53,0.2)",
          }}>
            {t("artGallery")}
          </h2>
          <HollyDivider />
          <p className="text-[#A5D6A7]/50 max-w-2xl mx-auto mb-8 italic">
            {t("artGalleryDescription")}
          </p>
          <Link href={`${prefix}/gallery`}>
            <button className="inline-flex items-center px-8 py-3.5 font-medium tracking-wider uppercase rounded-full bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all shadow-lg shadow-[#C62828]/30">
              {tNav("gallery")} <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
