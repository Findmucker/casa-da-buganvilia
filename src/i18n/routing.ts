import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "fr", "es", "de", "zh", "ja"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
});
