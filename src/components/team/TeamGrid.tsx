"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Mail } from "lucide-react";
import { TEAM_MEMBERS, type TeamDepartment } from "@/data/team";

const ACCENTS = ["#1b6fb8", "#ce2626", "#0a2947", "#4fa3d1"];
const TABS = ["All", "Research", "Sales"] as const;
type Tab = (typeof TABS)[number];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function matchesTab(department: TeamDepartment, tab: Tab) {
  return tab === "All" || department === tab;
}

/** Card grid built to scale from a handful of analysts to the full desk —
 *  members without a photo yet fall back to a colored initials tile so new
 *  entries can be added by data alone. A department tab (All / Research /
 *  Sales) filters the grid above it. */
export function TeamGrid() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const filtered = TEAM_MEMBERS.filter((m) => matchesTab(m.department, activeTab));

  return (
    <section className="bg-[var(--inst-bg)] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold text-[var(--inst-heading)] sm:text-4xl">Meet the Desk</h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-[var(--inst-primary)]" />
          <p className="mx-auto mt-4 max-w-xl text-[var(--inst-text)]">
            Sector specialists across the research desk — the people behind every call.
          </p>
        </motion.div>

        <div role="tablist" aria-label="Team department" className="mb-10 flex justify-center gap-2">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={
                  isActive
                    ? "rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-200"
                    : "rounded-full border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] px-5 py-2 text-sm font-medium text-[var(--inst-text)] transition-colors duration-200 hover:text-[var(--inst-primary)]"
                }
                style={
                  isActive
                    ? { background: "linear-gradient(90deg, var(--inst-primary), var(--inst-accent))" }
                    : undefined
                }
              >
                {tab}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
          >
            {filtered.map((member, i) => {
              const color = ACCENTS[i % ACCENTS.length];
              const initials = getInitials(member.name);
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--inst-border)] bg-[var(--inst-card-bg)] shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <span
                    className="absolute inset-x-0 top-0 z-10 h-1"
                    style={{ background: color }}
                    aria-hidden="true"
                  />
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-3xl font-bold text-white transition-transform duration-500 group-hover:scale-105"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                        aria-hidden="true"
                      >
                        {initials}
                      </div>
                    )}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-md"
                      style={{ background: color }}
                      aria-hidden="true"
                    >
                      <Briefcase size={14} className="text-white" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-base font-semibold leading-tight text-white">{member.name}</h3>
                      <p className="mt-0.5 text-xs font-medium text-white/85">{member.title}</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-1.5 border-t border-[var(--inst-border)] px-4 py-2.5 text-xs text-[var(--inst-text)] transition-colors hover:text-[var(--inst-primary)]"
                  >
                    <Mail size={12} className="shrink-0" style={{ color }} aria-hidden="true" />
                    <span className="truncate">{member.email}</span>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
