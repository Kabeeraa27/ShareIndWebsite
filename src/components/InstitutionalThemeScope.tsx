"use client";

import { useTheme } from "./ThemeProvider";

/** Applies the current light/dark choice as a data-attribute so the
 *  --inst-* CSS tokens (globals.css) resolve to the right palette for
 *  everything nested inside. */
export function InstitutionalThemeScope({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return <div data-theme={theme}>{children}</div>;
}
