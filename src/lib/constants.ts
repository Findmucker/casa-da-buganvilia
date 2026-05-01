export const STORE_ADDRESS = "Tv. de Baltazar Gomes Figueira S/N, 2510-001 Óbidos";

export const CATEGORIES = [
  { key: "clothing", icon: "👗", slug: "vestuario" },
  { key: "tableware", icon: "🍽️", slug: "louca-mesa" },
  { key: "jewellery", icon: "💎", slug: "joalharia" },
  { key: "food", icon: "🧀", slug: "gastronomia" },
  { key: "soaps", icon: "🧴", slug: "sabonetes-cremes" },
  { key: "wines", icon: "🍷", slug: "vinhos" },
] as const;

export const FOOTER_NAV_KEYS = ["clothing", "tableware", "jewellery", "food", "soaps", "wines"] as const;

export const NAV_ITEMS_KEYS = [
  { path: "/", key: "home" },
  { path: "/shop", key: "shop" },
  { path: "/gallery", key: "gallery" },
  { path: "/about", key: "about" },
  { path: "/contact", key: "contact" },
] as const;

export function getLocalePrefix(locale: string): string {
  return locale === "pt" ? "" : `/${locale}`;
}
