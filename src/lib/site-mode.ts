import { routing } from "../i18n/routing";

const LIVE_VALUE = "true";

export function isSiteLive(value = process.env.NEXT_PUBLIC_SITE_LIVE): boolean {
  return value?.trim().toLowerCase() === LIVE_VALUE;
}

export function getConstructionPath(pathname: string): string {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  const requestedLocale = routing.locales.find(
    (locale) => locale === firstSegment,
  );

  return requestedLocale && requestedLocale !== routing.defaultLocale
    ? `/${requestedLocale}`
    : "/";
}
