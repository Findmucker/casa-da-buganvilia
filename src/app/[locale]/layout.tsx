import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import ThemedLayout from "@/components/themes/ThemedLayout";
import ComingSoon from "@/components/construction/ComingSoon";
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
        <ThemeProvider>
          <ThemedLayout>{children}</ThemedLayout>
        </ThemeProvider>
      ) : (
        <ComingSoon locale={locale} />
      )}
    </NextIntlClientProvider>
  );
}
