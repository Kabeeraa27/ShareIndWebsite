"use client";

import { motion } from "framer-motion";
import { Background } from "@/components/Background";

/** Dark banner matching the cube hero's look, so navigating here from the
 *  homepage doesn't feel like landing on a different site — then blends
 *  into the light folder-cabinet content below. */
export function ReportsHero() {
  return (
    <section className="relative flex min-h-[40vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 pt-28 pb-12 text-center">
      <Background />
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
          Research Reports
        </span>
        <h1
          className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Every sector, <span className="gradient-text text-glow">one file away</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/65 sm:text-lg">
          Pick a folder. Open a file. Get straight to the research that moves your portfolio.
        </p>
      </motion.div>
    </section>
  );
}
