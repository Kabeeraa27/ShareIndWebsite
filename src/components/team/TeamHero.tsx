"use client";

import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { BackToHome } from "@/components/BackToHome";

export function TeamHero() {
  return (
    <section className="relative isolate flex min-h-[40vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 pt-28 pb-12 text-center">
      <Background />
      <div className="absolute left-6 top-24 z-20">
        <BackToHome />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent to-[var(--inst-bg)]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="glass mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
          Our Team
        </span>
        <h1
          className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[var(--inst-heading)] sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The analysts <span className="gradient-text text-glow">behind the research</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-[var(--inst-text)] sm:text-lg">
          Sector specialists who read the filings, build the models, and make the call.
        </p>
      </motion.div>
    </section>
  );
}
