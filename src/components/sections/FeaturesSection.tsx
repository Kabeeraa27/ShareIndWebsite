"use client";

import { motion } from "framer-motion";
import { features } from "@/data/features";

/** A scannable, static recap of the same 9 features the cube exposes interactively. */
export function FeaturesSection() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent-cyan">
          Everything, in one place
        </p>
        <h2
          className="text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Nine tools. One platform.
        </h2>
        <p className="mt-4 text-white/60">
          Every tile on the cube above is a fully-built feature. Here&apos;s the full picture.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group glass relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5"
            style={{
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 32px ${feature.glowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
            }}
          >
            <span
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: `${feature.color}1f` }}
            >
              <feature.icon size={22} color={feature.color} aria-hidden="true" />
            </span>
            <h3 className="mb-1.5 text-lg font-semibold text-white">{feature.name}</h3>
            <p className="text-sm text-white/60">{feature.tagline}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
