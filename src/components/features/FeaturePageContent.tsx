"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Background } from "@/components/Background";
import { BackToHome } from "@/components/BackToHome";
import { features } from "@/data/features";

/**
 * Full-page version of what used to be the cube's slide-in feature drawer
 * — every tile now lands here (or on its dedicated page) instead of
 * opening a panel over the cube.
 *
 * Takes a plain `featureId` rather than the resolved `Feature` object: the
 * page component that renders this is a Server Component, and `Feature`
 * carries a Lucide icon (a function) which the RSC boundary can't
 * serialize across a prop. Looking the feature up here, client-side, from
 * the same data module avoids that entirely.
 */
export function FeaturePageContent({ featureId }: { featureId: string }) {
  const feature = features.find((f) => f.id === featureId);
  if (!feature) return null;

  return (
    <>
      <section className="relative isolate flex min-h-[45vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 pt-28 pb-14 text-center">
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
          <span
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: `${feature.color}22`, boxShadow: `0 0 30px ${feature.glowColor}` }}
          >
            <feature.icon size={30} color={feature.color} aria-hidden="true" />
          </span>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[var(--inst-heading)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {feature.name}
          </h1>
          <p className="mt-5 max-w-xl text-base text-[var(--inst-text)] sm:text-lg">{feature.tagline}</p>
        </motion.div>
      </section>

      <section className="bg-[var(--inst-bg)] px-6 py-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-[var(--inst-text)]">{feature.description}</p>

          <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--inst-heading)]/70">
            Benefits
          </h2>
          <ul className="flex flex-col gap-3">
            {feature.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 rounded-xl border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] p-4 text-sm text-[var(--inst-text)]"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${feature.color}22` }}
                >
                  <Check size={12} color={feature.color} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </>
  );
}
