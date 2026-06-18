import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { isSiteLive } from "@/lib/site-mode";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  const siteIsLive = isSiteLive();

  return {
    title: {
      template: "%s | Casa da Buganvília",
      default: siteIsLive
        ? "Casa da Buganvília — Óbidos"
        : "Casa da Buganvília — Em breve",
    },
    description: siteIsLive
      ? "Uma experiência única em Óbidos. Vestuário, louça artesanal, joalharia, gastronomia e galeria de arte."
      : "Uma nova experiência está a florescer no coração de Óbidos. O site da Casa da Buganvília estará disponível em breve.",
    robots: siteIsLive
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-cream">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
