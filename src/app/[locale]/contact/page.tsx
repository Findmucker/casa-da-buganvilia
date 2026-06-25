import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { STORE_ADDRESS } from "@/lib/constants";
import { getSiteSettingsMap, settingValue } from "@/lib/site-settings";
import { getGeneralWhatsAppLink } from "@/lib/whatsapp";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettingsMap();
  const whatsappNumber = settingValue(
    settings,
    "whatsapp_number",
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+351910341182",
  );

  return (
    <ContactContent
      locale={locale}
      settings={settings}
      whatsappNumber={whatsappNumber}
    />
  );
}

function ContactContent({
  locale,
  settings,
  whatsappNumber,
}: {
  locale: string;
  settings: Record<string, string>;
  whatsappNumber: string;
}) {
  const t = useTranslations("contact");
  const whatsappLink = getGeneralWhatsAppLink(whatsappNumber, locale);
  const address = settingValue(settings, "address", STORE_ADDRESS);
  const email = settingValue(settings, "email", "info@casadabuganvilia.pt");
  const openingHours = settingValue(settings, "opening_hours", "10:00 - 19:00");
  const workingDays = settingValue(settings, "working_days", "Todos os dias");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-3 font-serif text-4xl font-bold text-burgundy">
          {t("title")}
        </h1>
        <p className="text-warm-brown/60">{t("subtitle")}</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
            <div>
              <h3 className="mb-1 font-medium text-burgundy">{t("address")}</h3>
              <p className="text-warm-brown/70">{address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
            <div>
              <h3 className="mb-1 font-medium text-burgundy">
                {t("openingHours")}
              </h3>
              <p className="text-warm-brown/70">
                {openingHours}
                {workingDays ? `, ${workingDays}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
            <div>
              <h3 className="mb-1 font-medium text-burgundy">{t("email")}</h3>
              <p className="text-warm-brown/70">{email}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
            <div>
              <h3 className="mb-1 font-medium text-burgundy">
                {t("whatsapp")}
              </h3>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2"
              >
                <Button variant="secondary" size="md">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("sendMessage")}
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="aspect-square overflow-hidden rounded-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3088.5!2d-9.1602548!3d39.360482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd18b55a728d6c59%3A0xa73db7689f761f04!2sCasa%20da%20Buganv%C3%ADlia!5e0!3m2!1spt-PT!2spt!4v1714000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Casa da Buganvilia - Google Maps"
          />
        </div>
      </div>
    </div>
  );
}
