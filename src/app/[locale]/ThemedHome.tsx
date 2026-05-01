"use client";

import { useTheme } from "@/components/themes/ThemeProvider";
import BuganviliaHome from "@/components/themes/buganvilia/BuganviliaHome";
import MedievalHome from "@/components/themes/medieval/MedievalHome";
import ChristmasHome from "@/components/themes/christmas/ChristmasHome";
import DefaultHome from "./DefaultHome";

const HOMES = {
  default: DefaultHome,
  buganvilia: BuganviliaHome,
  medieval: MedievalHome,
  christmas: ChristmasHome,
} as const;

export default function ThemedHome({ locale }: { locale: string }) {
  const { theme } = useTheme();
  const HomeComponent = HOMES[theme] ?? DefaultHome;
  return <HomeComponent locale={locale} />;
}
