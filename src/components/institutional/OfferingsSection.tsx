"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { SERVICES } from "@/data/institutional";

export function OfferingsSection() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section id="offerings" className="bg-[var(--inst-bg-alt)] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-[var(--inst-heading)] sm:text-4xl">Our Offerings</h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-[var(--inst-primary)]" />
        </motion.div>

        <div
          role="tablist"
          aria-label="Institutional offerings"
          className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {SERVICES.map((service, i) => {
            const isActive = service.id === activeId;
            return (
              <motion.button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(service.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={clsx(
                  "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center shadow-sm transition-colors duration-200",
                  isActive
                    ? "bg-[var(--inst-card-bg)]"
                    : "border-transparent bg-[var(--inst-card-bg)]/60 hover:bg-[var(--inst-card-bg)]"
                )}
                style={{
                  borderColor: isActive ? service.color : undefined,
                  boxShadow: isActive ? `0 8px 24px ${service.color}33` : undefined,
                }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200"
                  style={{
                    background: isActive ? service.color : `${service.color}1a`,
                    transform: isActive ? "scale(1.05)" : undefined,
                  }}
                >
                  <service.icon
                    size={20}
                    color={isActive ? "#ffffff" : service.color}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className={clsx("text-sm font-semibold", !isActive && "text-[var(--inst-text)]")}
                  style={isActive ? { color: service.color } : undefined}
                >
                  {service.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
            className="rounded-2xl border bg-[var(--inst-card-bg)] p-8 shadow-sm transition-colors duration-300"
            style={{ borderColor: `${active.color}55` }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${active.color}1a` }}
              >
                <active.icon size={24} color={active.color} aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-[var(--inst-heading)]">{active.name}</h3>
            </div>
            <div className="mt-2 mb-6 h-0.5 w-12 rounded-full" style={{ background: active.color }} />

            <ul className="flex flex-col gap-3">
              {active.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-2.5 text-[var(--inst-text)]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: active.color }}
                  />
                  {point}
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-shadow duration-200 hover:shadow-lg"
              style={{ background: active.color, boxShadow: `0 6px 20px ${active.color}40` }}
            >
              Learn more
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
