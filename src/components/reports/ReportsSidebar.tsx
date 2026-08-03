"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { REPORT_SECTORS, type ReportSector } from "@/data/reports";
import { DESK_NOTES, type DeskNoteSection } from "@/data/deskNotes";

interface ReportsSidebarProps {
  activeId: string;
  onSelect: (item: ReportSector | DeskNoteSection) => void;
}

function SidebarButton({
  id,
  name,
  color,
  icon: Icon,
  isActive,
  onClick,
}: {
  id: string;
  name: string;
  color: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; "aria-hidden"?: boolean }>;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      key={id}
      type="button"
      onClick={onClick}
      aria-current={isActive}
      className={clsx(
        "group relative flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium whitespace-nowrap transition-colors duration-200 lg:w-full lg:whitespace-normal",
        isActive ? "text-[var(--inst-heading)]" : "text-[var(--inst-text)] hover:bg-[var(--inst-card-alt-bg)]"
      )}
      style={{ background: isActive ? `${color}14` : undefined }}
    >
      {isActive && (
        <motion.span
          layoutId="sidebar-active-indicator"
          className="absolute inset-y-1 left-0 w-1 rounded-full lg:inset-y-1.5"
          style={{ background: color }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105"
        style={{ background: `${color}1a` }}
      >
        <Icon size={15} style={{ color }} aria-hidden />
      </span>
      {name}
    </button>
  );
}

export function ReportsSidebar({ activeId, onSelect }: ReportsSidebarProps) {
  return (
    <nav
      aria-label="Reports navigation"
      className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-visible lg:gap-6 lg:pb-0"
    >
      <div className="flex gap-2 lg:flex-col lg:gap-1.5">
        <h2 className="mb-1 hidden text-xs font-semibold tracking-wide text-[var(--inst-text-muted)] uppercase lg:block">
          Desk Notes
        </h2>
        {DESK_NOTES.map((section) => (
          <SidebarButton
            key={section.id}
            id={section.id}
            name={section.name}
            color={section.color}
            icon={section.icon}
            isActive={section.id === activeId}
            onClick={() => onSelect(section)}
          />
        ))}
      </div>

      <div className="flex gap-2 lg:flex-col lg:gap-1.5">
        <h2 className="mb-1 hidden text-xs font-semibold tracking-wide text-[var(--inst-text-muted)] uppercase lg:block">
          Sectors
        </h2>
        {REPORT_SECTORS.map((sector) => (
          <SidebarButton
            key={sector.id}
            id={sector.id}
            name={sector.name}
            color={sector.color}
            icon={sector.icon}
            isActive={sector.id === activeId}
            onClick={() => onSelect(sector)}
          />
        ))}
      </div>
    </nav>
  );
}
