"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LEADERSHIP, LEADERSHIP_INTRO, LEADERSHIP_TAGLINE, type Leader } from "@/data/institutional";
import { LeaderPanel } from "./LeaderPanel";

export function LeadershipSection() {
  const [selected, setSelected] = useState<Leader | null>(null);

  return (
    <section id="leadership" className="bg-[var(--inst-bg)] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold text-[var(--inst-heading)] sm:text-4xl">Leadership</h2>
          <div className="mx-auto mt-2 mb-6 h-1 w-16 rounded-full bg-[var(--inst-primary)]" />
          <p className="mb-3 text-lg font-medium text-[var(--inst-primary)]">{LEADERSHIP_TAGLINE}</p>
          <p className="mx-auto max-w-2xl text-[var(--inst-text)]">{LEADERSHIP_INTRO}</p>
        </motion.div>

        <div className="mx-auto grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
          {LEADERSHIP.map((leader, i) => (
            <motion.button
              key={leader.id}
              type="button"
              onClick={() => setSelected(leader)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--inst-border)] bg-[var(--inst-card-bg)] text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={leader.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 270px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold leading-tight text-white">{leader.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-white/85">{leader.title}</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 border-t border-[var(--inst-border)] px-5 py-3 text-sm font-semibold text-[var(--inst-primary)] transition-colors group-hover:text-[var(--inst-heading)]">
                Read full bio
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <LeaderPanel leader={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
