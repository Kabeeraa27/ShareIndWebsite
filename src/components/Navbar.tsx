"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { SiteMenu } from "./SiteMenu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Offerings", href: "/offerings" },
  { label: "Reports", href: "/reports" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

/** Sticky, glassmorphic nav bar that stays transparent until the page scrolls. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Once scrolled, the bar gets its own dark "glass" backing (see the
   *  className below) regardless of theme, so white text/icons always read
   *  fine there. Unscrolled, the bar sits directly on the page's own
   *  backdrop — near-black in dark theme (white still reads fine) but a
   *  pale cream in light theme, where white nav text nearly disappears.
   *  This only needs a dark, contrasting color for that one combination. */
  const onLight = theme === "light" && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass shadow-[0_8px_32px_rgba(0,0,0,0.35)]" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo-mark.png"
              alt=""
              width={447}
              height={409}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          {/* Full brand name wraps to two lines on narrow screens, which
              bloats the fixed navbar's height and lets it collide with
              content below (see FileCard) — a shorter label below `sm`
              keeps the bar a single, predictable line on mobile. */}
          <span className="gradient-text whitespace-nowrap">
            <span className="hidden sm:inline">Share India Institutional Desk</span>
            <span className="sm:hidden">Share India</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-5 xl:flex xl:gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  onLight ? "text-[#0a2947]/80 hover:text-[#0a2947]" : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle theme={theme} onToggle={toggleTheme} onLight={onLight} />
          <SiteMenu onLight={onLight} />
          <MagneticButton href="/#get-started">Get Started</MagneticButton>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} onLight={onLight} />
          <SiteMenu onLight={onLight} />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              onLight ? "text-[#0a2947]" : "text-white"
            }`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-strong overflow-hidden xl:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-2 py-3 text-white/85 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-2">
              <a
                href="/#get-started"
                className="block rounded-full bg-gradient-to-r from-accent-blue to-accent-purple py-2 text-center text-sm font-medium"
              >
                Get Started
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

/** Toggles the institutional sections between the new light redesign and
 *  the site's original dark theme. Doesn't affect the cube, Navbar, or
 *  Footer — those stay as-is regardless of the choice. */
function ThemeToggle({
  theme,
  onToggle,
  onLight,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
  onLight: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ${
        onLight ? "text-[#0a2947]/80 hover:bg-black/5 hover:text-[#0a2947]" : "text-white/75 hover:bg-white/10 hover:text-white"
      }`}
    >
      {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * 0.3,
          y: (e.clientY - rect.top - rect.height / 2) * 0.3,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className="glow-blue rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink px-5 py-2 text-sm font-semibold text-white"
    >
      {children}
    </motion.a>
  );
}
