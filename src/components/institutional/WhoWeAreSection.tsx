"use client";

import { motion } from "framer-motion";
import { CLIENT_TYPES, OFFICE_LOCATIONS, WHO_WE_ARE } from "@/data/institutional";

export function WhoWeAreSection() {
  return (
    <section id="about" className="bg-[var(--inst-bg)] px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="text-3xl font-bold text-[var(--inst-heading)] sm:text-4xl">Who we are</h2>
        <div className="mt-2 mb-6 h-1 w-16 rounded-full bg-[var(--inst-primary)]" />

        <p className="mb-6 text-lg font-medium text-[var(--inst-primary)]">{WHO_WE_ARE.tagline}</p>

        <div className="flex flex-col gap-4">
          {WHO_WE_ARE.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-[var(--inst-text)]">
              {p}
            </p>
          ))}
        </div>

        <h3 className="mt-10 mb-4 text-xl font-semibold text-[var(--inst-heading)]">Serving</h3>
        <div className="flex flex-wrap gap-3">
          {CLIENT_TYPES.map((client) => (
            <span
              key={client}
              className="rounded-lg border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] px-4 py-2 text-sm font-medium text-[var(--inst-heading)]"
            >
              {client}
            </span>
          ))}
        </div>

        <h3 className="mt-10 mb-4 text-xl font-semibold text-[var(--inst-heading)]">Presence</h3>
        <div className="flex flex-wrap gap-3">
          {OFFICE_LOCATIONS.map((city) => (
            <span
              key={city}
              className="rounded-lg border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] px-4 py-2 text-sm font-medium text-[var(--inst-heading)]"
            >
              {city}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
