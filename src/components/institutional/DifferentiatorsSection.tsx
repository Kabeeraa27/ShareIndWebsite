"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { DIFFERENTIATORS, DIFFERENTIATORS_TAGLINE } from "@/data/institutional";

const ACCENTS = ["#1b6fb8", "#4fa3d1", "#0a2947", "#ce2626", "#1b6fb8", "#4fa3d1", "#0a2947", "#ce2626"];

export function DifferentiatorsSection() {
  return (
    <section className="bg-[var(--inst-bg-alt)] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold text-[var(--inst-heading)] sm:text-4xl">What sets us apart</h2>
          <div className="mx-auto mt-2 mb-6 h-1 w-16 rounded-full bg-[var(--inst-primary)]" />
          <p className="text-lg font-medium text-[var(--inst-primary)]">{DIFFERENTIATORS_TAGLINE}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DIFFERENTIATORS.map((item, i) => {
            const color = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-3 rounded-2xl border border-[var(--inst-border)] bg-[var(--inst-card-bg)] p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                style={{ borderLeft: `3px solid ${color}` }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}1a` }}
                >
                  <CheckCircle2 size={17} style={{ color }} aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-[var(--inst-text)]">{item}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
