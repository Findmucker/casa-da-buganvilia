import { setRequestLocale } from "next-intl/server";
import DefaultHome from "./DefaultHome";
import { getSiteSettingsMap } from "@/lib/site-settings";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettingsMap();

  return <DefaultHome locale={locale} settings={settings} />;
}
