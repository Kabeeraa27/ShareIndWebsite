"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import type { ReportFile } from "@/data/reports";

interface ReportCardProps {
  file: ReportFile;
  color: string;
  index: number;
}

export function ReportCard({ file, color, index }: ReportCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group flex items-start gap-3 rounded-xl border border-[var(--inst-border)] bg-[var(--inst-card-bg)] p-4 text-left shadow-sm transition-shadow duration-200 hover:shadow-lg"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105"
        style={{ background: `${color}1a` }}
      >
        <FileText size={18} style={{ color }} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[var(--inst-heading)]">{file.title}</span>
        <span className="mt-0.5 block text-xs text-[var(--inst-text-muted)]">{file.date}</span>
      </span>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full opacity-0 transition-all duration-200 group-hover:translate-y-0.5 group-hover:opacity-100"
        style={{ background: `${color}14` }}
      >
        <Download size={14} style={{ color }} aria-hidden="true" />
      </span>
    </motion.button>
  );
}
