"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeId = "default" | "buganvilia" | "medieval" | "christmas";

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("casa-theme") as ThemeId | null;
    if (saved && ["default", "buganvilia", "medieval", "christmas"].includes(saved)) {
      setThemeState(saved);
      if (saved !== "default") {
        document.documentElement.dataset.theme = saved;
      }
    }
    setMounted(true);
  }, []);

  function setTheme(id: ThemeId) {
    setThemeState(id);
    localStorage.setItem("casa-theme", id);
    if (id === "default") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = id;
    }
  }

  // Prevent hydration mismatch — render children immediately but theme-dependent
  // components should check `mounted` or just use the context value
  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "default", setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
