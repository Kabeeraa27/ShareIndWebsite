"use client";

import { motion } from "framer-motion";
import { SECTORS } from "@/data/institutional";

const ACCENTS = ["#1b6fb8", "#4fa3d1", "#a9c9dc", "#0a2947", "#ce2626"];

export function SectorsSection() {
  return (
    <section className="bg-[var(--inst-bg)] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold text-[var(--inst-heading)] sm:text-4xl">Sector Expertise</h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-[var(--inst-primary)]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SECTORS.map((sector, i) => {
            const color = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-3 rounded-xl border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] px-4 py-3.5 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 20px ${color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}1f` }}
                >
                  <sector.icon size={16} style={{ color }} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-sm leading-snug font-medium text-[var(--inst-text)]">
                  {sector.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
