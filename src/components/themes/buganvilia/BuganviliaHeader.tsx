"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { NAV_ITEMS_KEYS, getLocalePrefix } from "@/lib/constants";
import { VineHeader } from "./BuganviliaDecorations";

export default function BuganviliaHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefix = getLocalePrefix(locale);

  const navItems = NAV_ITEMS_KEYS.map((item) => ({
    href: `${prefix}${item.path}`,
    label: t(item.key as any),
  }));

  return (
    <header className="relative bg-[#FFF3E0]/95 backdrop-blur-sm border-b border-[#5D4037]/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={`${prefix}/`}>
            <Image src="/logo.png" alt="Casa da Buganvília" width={936} height={440} className="h-16 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#5D4037] hover:text-[#C2185B] transition-colors tracking-wide uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="md:hidden text-[#5D4037]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
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
                className="block text-sm font-medium text-[#5D4037] hover:text-[#C2185B] transition-colors tracking-wide uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <VineHeader />
    </header>
  );
}
