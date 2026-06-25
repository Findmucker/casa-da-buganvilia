import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Music } from "lucide-react";
import Button from "@/components/ui/Button";
import { CATEGORIES, STORE_ADDRESS, getLocalePrefix } from "@/lib/constants";

export default function DefaultHome({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const prefix = getLocalePrefix(locale);
  const navLabel = (key: string) => tNav(key);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-burgundy/5 to-cream">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-terracotta mb-4">Óbidos, Portugal</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-burgundy mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-warm-brown/80 font-light mb-4">
            {t("heroSubtitle")}
          </p>
          <p className="text-base text-warm-brown/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${prefix}/shop`}>
              <Button variant="primary" size="lg">
                {tNav("shop")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={`${prefix}/about`}>
              <Button variant="outline" size="lg">
                {t("exploreSpace")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-serif font-bold text-burgundy text-center mb-12">
          {t("featuredProducts")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`${prefix}/category/${cat.slug}`}
              className="group text-center p-6 rounded-xl bg-white hover:bg-cream-dark transition-all hover:shadow-lg"
            >
              <span className="text-4xl block mb-3">{cat.icon}</span>
              <h3 className="text-sm font-medium text-warm-brown group-hover:text-burgundy transition-colors uppercase tracking-wide">
                {navLabel(cat.key)}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Visit Us */}
      <section className="bg-burgundy/5 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-burgundy mb-6">
              {t("visitUs")}
            </h2>
            <p className="text-warm-brown/70 leading-relaxed mb-8">
              {t("visitUsDescription")}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-warm-brown">
                <MapPin className="h-5 w-5 text-terracotta" />
                <span>{STORE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3 text-warm-brown">
                <Clock className="h-5 w-5 text-terracotta" />
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex items-center gap-3 text-warm-brown">
                <Music className="h-5 w-5 text-terracotta" />
                <span className="italic text-warm-brown/60">Music always on</span>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-cream-dark flex items-center justify-center text-6xl">
            🏠
          </div>
        </div>
      </section>

      {/* Art Gallery Teaser */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-serif font-bold text-burgundy mb-4">
          {t("artGallery")}
        </h2>
        <p className="text-warm-brown/70 max-w-2xl mx-auto mb-8">
          {t("artGalleryDescription")}
        </p>
        <Link href={`${prefix}/gallery`}>
          <Button variant="secondary" size="lg">
            {tNav("gallery")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
