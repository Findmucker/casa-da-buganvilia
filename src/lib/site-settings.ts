import prisma from "./prisma";

export async function getSiteSettingsMap() {
  const settings = await prisma.siteSettings.findMany();
  return Object.fromEntries(
    settings.map((setting) => [setting.key, setting.value]),
  ) as Record<string, string>;
}

export function settingValue(
  settings: Record<string, string>,
  key: string,
  fallback: string,
) {
  return settings[key]?.trim() || fallback;
}
