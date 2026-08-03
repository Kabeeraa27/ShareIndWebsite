"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  X,
  Home,
  Building2,
  Award,
  Layers,
  IdCard,
  FolderOpen,
  PieChart,
  Phone,
  type LucideIcon,
} from "lucide-react";

interface MenuEntry {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

const ENTRIES: MenuEntry[] = [
  { label: "Home", href: "/", icon: Home, description: "Back to the cube" },
  { label: "About Us", href: "/about", icon: Building2, description: "Who we are" },
  { label: "Differentiators", href: "/differentiators", icon: Award, description: "What sets us apart" },
  { label: "Offerings", href: "/offerings", icon: Layers, description: "What we provide" },
  { label: "Our Team", href: "/team", icon: IdCard, description: "Leadership & the analyst desk" },
  { label: "Reports", href: "/reports", icon: FolderOpen, description: "Sector research" },
  { label: "Sector Expertise", href: "/sectors", icon: PieChart, description: "13 sectors covered" },
  { label: "Contact", href: "/contact", icon: Phone, description: "Get in touch" },
];

/** Global sitemap overlay, reachable from the top-right corner on every
 *  page — the fallback way back into the site once a visitor has left the
 *  cube's own click-to-navigate flow.
 *
 *  `onLight`: true when the navbar is unscrolled in light theme, sitting
 *  directly on the page's own pale cream backdrop rather than the dark
 *  "glass" bar — the trigger icon needs a dark color there instead of the
 *  usual white to stay visible (the dropdown panel itself is always the
 *  same dark glass regardless, so its contents don't need this). */
export function SiteMenu({ onLight = false }: { onLight?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open site menu"
        aria-expanded={open}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ${
          onLight ? "text-[#0a2947]/80 hover:bg-black/5 hover:text-[#0a2947]" : "text-white/75 hover:bg-white/10 hover:text-white"
        }`}
      >
        <LayoutGrid size={17} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="site-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="site-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="glass-strong fixed right-4 top-20 z-[95] w-[min(92vw,380px)] rounded-2xl border p-3 shadow-2xl sm:right-8"
            >
              <div className="mb-2 flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Site menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close site menu"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>
              <ul className="flex flex-col gap-0.5">
                {ENTRIES.map((entry) => (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-white/10"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-colors group-hover:bg-white/10 group-hover:text-white">
                        <entry.icon size={16} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-medium text-white/90">{entry.label}</span>
                        <span className="text-xs text-white/45">{entry.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
