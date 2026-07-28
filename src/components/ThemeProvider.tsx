"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type InstitutionalTheme = "light" | "dark";

const STORAGE_KEY = "si-theme";

const ThemeContext = createContext<{
  theme: InstitutionalTheme;
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

/**
 * Controls the light/dark toggle for the institutional content sections
 * only (see the --inst-* tokens in globals.css). The cube hero, Navbar, and
 * Footer are intentionally outside this system and always render the
 * same way regardless of the toggle.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<InstitutionalTheme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
