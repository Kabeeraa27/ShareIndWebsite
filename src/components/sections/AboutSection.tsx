"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "Assets under management", value: "₹18,400 Cr" },
  { label: "Active investors", value: "2.1M+" },
  { label: "Platform uptime", value: "99.99%" },
  { label: "Years in markets", value: "12" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent-cyan">
            About Rubik
          </p>
          <h2
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built by traders, for traders.
          </h2>
          <p className="mt-5 text-white/65">
            Rubik started as an internal tool for a proprietary trading desk that was tired of
            switching between six different apps to place one order. Today it&apos;s a full
            SEBI-registered broking platform, still obsessed with the same idea: every tool a
            trader needs, in one focused, beautifully engineered surface.
          </p>
          <p className="mt-4 text-white/65">
            No dark patterns. No hidden fees. Just markets, made clear.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-5"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center">
              <p className="gradient-text text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-white/55">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
