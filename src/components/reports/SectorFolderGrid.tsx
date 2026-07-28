"use client";

import { motion } from "framer-motion";
import { REPORT_SECTORS, type ReportSector } from "@/data/reports";

/** A small deterministic per-index tilt so the folders read as a loosely
 *  stacked pile at rest, straightening out on hover (a "picking it up off
 *  the stack" feel) rather than a flat, static grid. */
function restTilt(i: number) {
  const pattern = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5, -1];
  return pattern[i % pattern.length];
}

interface SectorFolderGridProps {
  onOpen: (sector: ReportSector) => void;
}

export function SectorFolderGrid({ onOpen }: SectorFolderGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {REPORT_SECTORS.map((sector, i) => (
        <motion.button
          key={sector.id}
          type="button"
          layoutId={`folder-${sector.id}`}
          onClick={() => onOpen(sector)}
          initial={{ opacity: 0, y: 24, rotate: restTilt(i) }}
          whileInView={{ opacity: 1, y: 0, rotate: restTilt(i) }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex flex-col items-center pt-3 text-center"
          style={{ transformOrigin: "50% 100%" }}
        >
          {/* Folder tab */}
          <span
            className="relative z-10 -mb-1 h-5 w-16 rounded-t-md"
            style={{ background: sector.color }}
          />
          {/* Folder body */}
          <span
            className="relative flex w-full flex-col items-center gap-2.5 rounded-lg rounded-tl-none border p-5 pt-6 shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
            style={{
              background: "var(--inst-card-bg)",
              borderColor: `${sector.color}55`,
              boxShadow: `0 2px 0 ${sector.color}25 inset`,
            }}
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `${sector.color}1a` }}
            >
              <sector.icon size={20} style={{ color: sector.color }} aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight font-semibold text-[var(--inst-heading)]">
              {sector.name}
            </span>
            <span className="text-[11px] font-medium text-[var(--inst-text-muted)]">
              {sector.files.length} report{sector.files.length === 1 ? "" : "s"}
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
