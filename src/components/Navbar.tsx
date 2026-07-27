"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Boxes, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** Sticky, glassmorphic nav bar that stays transparent until the page scrolls. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a
          href="#home"
          className="group flex items-center gap-2 text-lg font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Boxes size={18} className="text-white" aria-hidden="true" />
          </span>
          <span className="gradient-text">Rubik</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/75 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#login"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white"
          >
            Login
          </a>
          <MagneticButton href="#get-started">Get Started</MagneticButton>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-strong overflow-hidden md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-2 py-3 text-white/85 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex gap-3 px-2">
              <a href="#login" className="flex-1 rounded-full border border-white/15 py-2 text-center text-sm">
                Login
              </a>
              <a
                href="#get-started"
                className="flex-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple py-2 text-center text-sm font-medium"
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
