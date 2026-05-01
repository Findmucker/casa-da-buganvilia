"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { NAV_ITEMS_KEYS, getLocalePrefix } from "@/lib/constants";
import { ShieldIcon, StoneBorder } from "./MedievalDecorations";

export default function MedievalHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefix = getLocalePrefix(locale);

  const navItems = NAV_ITEMS_KEYS.map((item) => ({
    href: `${prefix}${item.path}`,
    label: t(item.key as any),
  }));

  return (
    <header className="relative bg-[#1A1A2E]/97 backdrop-blur-sm border-b border-[#C9A96E]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={`${prefix}/`}>
            <Image src="/logo.jpg" alt="Casa da Buganvília" width={220} height={80} className="h-16 w-auto rounded-lg bg-white/90 p-1" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-serif font-medium text-[#C9A96E]/80 hover:text-[#FFD700] transition-colors tracking-widest uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="md:hidden text-[#C9A96E]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-serif font-medium text-[#C9A96E]/80 hover:text-[#FFD700] transition-colors tracking-widest uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <StoneBorder />
    </header>
  );
}
