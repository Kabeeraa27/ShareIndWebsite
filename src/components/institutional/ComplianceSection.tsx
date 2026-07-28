"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { COMPLIANCE_TEXT } from "@/data/institutional";

export function ComplianceSection() {
  return (
    <section className="bg-[var(--inst-bg-alt)] px-6 py-16 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl px-8 py-12 text-center sm:flex-row sm:text-left"
        style={{ background: "linear-gradient(120deg, var(--inst-primary-dark), var(--inst-primary))" }}
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
          <ShieldCheck size={32} className="text-white" aria-hidden="true" />
        </span>
        <div>
          <h2 className="mb-2 text-2xl font-bold text-white">Compliance &amp; Disclosures</h2>
          <p className="leading-relaxed text-white/85">{COMPLIANCE_TEXT}</p>
        </div>
      </motion.div>
    </section>
  );
}
