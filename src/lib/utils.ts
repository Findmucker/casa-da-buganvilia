import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, locale: string = "pt") {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : locale === "en" ? "en-GB" : locale, {
    style: "currency",
    currency: "EUR",
  }).format(num);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
