"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { REPORT_SECTORS, type ReportSector } from "@/data/reports";

interface ReportsSidebarProps {
  activeId: string;
  onSelect: (sector: ReportSector) => void;
}

export function ReportsSidebar({ activeId, onSelect }: ReportsSidebarProps) {
  return (
    <nav
      aria-label="Sectors"
      className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-visible lg:pb-0"
    >
      <h2 className="mb-1 hidden text-xs font-semibold tracking-wide text-[var(--inst-text-muted)] uppercase lg:block">
        Sectors
      </h2>
      {REPORT_SECTORS.map((sector) => {
        const isActive = sector.id === activeId;
        return (
          <button
            key={sector.id}
            type="button"
            onClick={() => onSelect(sector)}
            aria-current={isActive}
            className={clsx(
              "group relative flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium whitespace-nowrap transition-colors duration-200 lg:w-full lg:whitespace-normal",
              isActive ? "text-[var(--inst-heading)]" : "text-[var(--inst-text)] hover:bg-[var(--inst-card-alt-bg)]"
            )}
            style={{ background: isActive ? `${sector.color}14` : undefined }}
          >
            {isActive && (
              <motion.span
                layoutId="sidebar-active-indicator"
                className="absolute inset-y-1 left-0 w-1 rounded-full lg:inset-y-1.5"
                style={{ background: sector.color }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105"
              style={{ background: `${sector.color}1a` }}
            >
              <sector.icon size={15} style={{ color: sector.color }} aria-hidden="true" />
            </span>
            {sector.name}
          </button>
        );
      })}
    </nav>
  );
}
