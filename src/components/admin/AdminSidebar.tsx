"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Tag,
  Palette,
  Image as ImageIcon,
  Settings,
  LogOut,
  Frame,
  Cloud,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produtos", icon: Package },
  { href: "/admin/categories", label: "Categorias", icon: Tag },
  { href: "/admin/artists", label: "Artistas", icon: Palette },
  { href: "/admin/artworks", label: "Obras de Arte", icon: Frame },
  { href: "/admin/gallery", label: "Galeria do Espaço", icon: ImageIcon },
  { href: "/admin/moloni", label: "Moloni", icon: Cloud },
  { href: "/admin/settings", label: "Definições", icon: Settings },
];

interface AdminSidebarUser {
  name?: string | null;
  email?: string | null;
}

export default function AdminSidebar({ user }: { user?: AdminSidebarUser }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-serif font-bold text-burgundy">Buganvília</h2>
        <p className="text-xs text-gray-500">Backoffice</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-burgundy/10 text-burgundy font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 truncate">{user?.name || user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
