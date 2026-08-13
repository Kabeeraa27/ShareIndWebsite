"use client";

import { createContext, useContext, useState } from "react";

export type InstitutionalTheme = "light" | "dark";

const ThemeContext = createContext<{
  theme: InstitutionalTheme;
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

/**
 * Controls the light/dark toggle for the institutional content sections
 * only (see the --inst-* tokens in globals.css). The cube hero and Navbar
 * are intentionally outside this system and always render the same way
 * regardless of the toggle.
 *
 * Deliberately doesn't persist the choice (no localStorage) — every fresh
 * page load always opens on light, regardless of what a visitor toggled to
 * on a previous visit. Toggling still works normally for the rest of that
 * session via React state (Next's App Router keeps this provider mounted
 * across client-side navigations).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<InstitutionalTheme>("light");

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
