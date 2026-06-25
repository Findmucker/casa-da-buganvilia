import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Music, Home, Paintbrush, Sun } from "lucide-react";
import { getSiteSettingsMap, settingValue } from "@/lib/site-settings";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettingsMap();

  return <AboutContent settings={settings} />;
}

function AboutContent({ settings }: { settings: Record<string, string> }) {
  const t = useTranslations("about");
  const storyText = settingValue(settings, "about_story_text", t("storyText"));
  const musicNote = settingValue(settings, "about_music_note", t("musicNote"));

  const spaces = [
    { icon: Home, title: t("groundFloor"), emoji: "🏠" },
    { icon: Paintbrush, title: t("secondFloor"), emoji: "🎨" },
    { icon: Sun, title: t("courtyard"), emoji: "☀️" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-burgundy/5 to-cream py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-burgundy mb-4">{t("title")}</h1>
          <p className="text-xl text-warm-brown/60">{t("subtitle")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-serif font-bold text-burgundy mb-6">{t("storyTitle")}</h2>
        <p className="text-warm-brown/70 leading-relaxed text-lg">{storyText}</p>
      </section>

      {/* Spaces */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {spaces.map((space, i) => (
            <div key={i} className="text-center p-8 bg-white rounded-2xl">
              <span className="text-5xl block mb-4">{space.emoji}</span>
              <h3 className="text-lg font-serif font-bold text-burgundy mb-2">{space.title}</h3>
              <div className="aspect-[4/3] rounded-xl bg-cream-dark mt-4 flex items-center justify-center text-warm-brown/20">
                <space.icon className="h-12 w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Music Note */}
      <section className="bg-burgundy/5 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Music className="h-8 w-8 text-bougainvillea mx-auto mb-4" />
          <p className="text-lg italic text-warm-brown/60">{musicNote}</p>
        </div>
      </section>
    </div>
  );
}
