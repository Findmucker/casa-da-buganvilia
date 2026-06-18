import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { MapPin, Clock, Mail, Phone, MessageCircle } from "lucide-react";
import { getGeneralWhatsAppLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+351910341182";

  return <ContactContent locale={locale} whatsappNumber={whatsappNumber} />;
}

function ContactContent({ locale, whatsappNumber }: { locale: string; whatsappNumber: string }) {
  const t = useTranslations("contact");
  const whatsappLink = getGeneralWhatsAppLink(whatsappNumber, locale);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-burgundy mb-3">{t("title")}</h1>
        <p className="text-warm-brown/60">{t("subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-terracotta mt-1 shrink-0" />
            <div>
              <h3 className="font-medium text-burgundy mb-1">{t("address")}</h3>
              <p className="text-warm-brown/70">Tv. de Baltazar Gomes Figueira S/N, 2510-001 Óbidos</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="h-6 w-6 text-terracotta mt-1 shrink-0" />
            <div>
              <h3 className="font-medium text-burgundy mb-1">{t("openingHours")}</h3>
              <p className="text-warm-brown/70">10:00 - 19:00, Todos os dias</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-terracotta mt-1 shrink-0" />
            <div>
              <h3 className="font-medium text-burgundy mb-1">{t("email")}</h3>
              <p className="text-warm-brown/70">info@casadabuganvilia.pt</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MessageCircle className="h-6 w-6 text-terracotta mt-1 shrink-0" />
            <div>
              <h3 className="font-medium text-burgundy mb-1">{t("whatsapp")}</h3>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2"
              >
                <Button variant="secondary" size="md">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("sendMessage")}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Map embed */}
        <div className="aspect-square rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3088.5!2d-9.1602548!3d39.360482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd18b55a728d6c59%3A0xa73db7689f761f04!2sCasa%20da%20Buganv%C3%ADlia!5e0!3m2!1spt-PT!2spt!4v1714000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Casa da Buganvília - Google Maps"
          />
        </div>
      </div>
    </div>
  );
}
