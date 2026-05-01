"use client";

import { useTheme } from "@/components/themes/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuganviliaHeader from "@/components/themes/buganvilia/BuganviliaHeader";
import BuganviliaFooter from "@/components/themes/buganvilia/BuganviliaFooter";
import MedievalHeader from "@/components/themes/medieval/MedievalHeader";
import MedievalFooter from "@/components/themes/medieval/MedievalFooter";
import ChristmasHeader from "@/components/themes/christmas/ChristmasHeader";
import ChristmasFooter from "@/components/themes/christmas/ChristmasFooter";
import ThemeSwitcher from "@/components/themes/ThemeSwitcher";

const HEADERS = {
  default: Header,
  buganvilia: BuganviliaHeader,
  medieval: MedievalHeader,
  christmas: ChristmasHeader,
} as const;

const FOOTERS = {
  default: Footer,
  buganvilia: BuganviliaFooter,
  medieval: MedievalFooter,
  christmas: ChristmasFooter,
} as const;

export default function ThemedLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const HeaderComponent = HEADERS[theme] ?? Header;
  const FooterComponent = FOOTERS[theme] ?? Footer;

  return (
    <>
      <HeaderComponent />
      <main className="flex-1">{children}</main>
      <FooterComponent />
      <ThemeSwitcher />
    </>
  );
}
