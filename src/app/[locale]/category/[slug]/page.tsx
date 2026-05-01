import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const prefix = locale === "pt" ? "" : `/${locale}`;
  redirect(`${prefix}/shop?category=${slug}`);
}
