"use client";

import { useTheme, ThemeId } from "./ThemeProvider";

const THEMES: { id: ThemeId; label: string; icon: string; description: string }[] = [
  { id: "default", label: "Original", icon: "🌸", description: "Warm & elegant" },
  { id: "buganvilia", label: "Buganvilia", icon: "🌺", description: "Rustic & floral" },
  { id: "medieval", label: "Medieval", icon: "🏰", description: "Dark & atmospheric" },
  { id: "christmas", label: "Christmas", icon: "🎄", description: "Winter & festive" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 p-1.5 rounded-full shadow-2xl border border-black/10"
      style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            theme === t.id
              ? "bg-black text-white shadow-md scale-105"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          title={t.description}
        >
          <span className="text-lg">{t.icon}</span>
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
