import Image from "next/image";
import { AtSign, Globe, MessageCircle } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Dashboard", "Analytics", "AI Assistant", "Security"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "API Reference", "Status", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Disclosures"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={447}
                  height={409}
                  className="h-full w-full object-contain"
                />
              </span>
              <span
                className="gradient-text text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Share India Institutional Desk
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/55">
              A SEBI-registered stock broking platform for traders who want every tool, in one
              place.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, MessageCircle, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/55 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Share India Institutional Desk. All rights reserved.</p>
          <p>Investments in securities are subject to market risk.</p>
        </div>
      </div>
    </footer>
  );
}
