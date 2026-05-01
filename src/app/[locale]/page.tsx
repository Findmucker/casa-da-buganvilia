import { setRequestLocale } from "next-intl/server";
import ThemedHome from "./ThemedHome";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ThemedHome locale={locale} />;
}
