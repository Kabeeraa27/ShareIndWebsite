"use client";

import { motion } from "framer-motion";
import { Background } from "@/components/Background";

/** Static text hero for the institutional-business page (no 3D cube here). */
export function InstitutionalHero() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="glass mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
          Share India Institutional Desk
        </span>
        <h1
          className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Institutional <span className="gradient-text text-glow">Business</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/65 sm:text-lg">
          Research based conviction meets precision execution.
        </p>
        <p className="mt-6 max-w-2xl text-sm text-white/55 sm:text-base">
          Insight. Access. Execution. Three decades of broking heritage and a top-10 position in
          the derivatives market, focused on uncovering small and mid-cap opportunities most
          desks miss.
        </p>
      </motion.div>
    </section>
  );
}
