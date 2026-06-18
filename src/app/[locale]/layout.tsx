import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ComingSoon from "@/components/construction/ComingSoon";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { isSiteLive } from "@/lib/site-mode";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const siteIsLive = isSiteLive();

  return (
    <NextIntlClientProvider messages={messages}>
      {siteIsLive ? (
        <>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      ) : (
        <ComingSoon locale={locale} />
      )}
    </NextIntlClientProvider>
  );
}
