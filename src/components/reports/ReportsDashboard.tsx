"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { REPORT_CATEGORIES, REPORT_SECTORS, type ReportCategory, type ReportSector } from "@/data/reports";
import { ReportsSidebar } from "./ReportsSidebar";
import { ReportCard } from "./ReportCard";

const PAGE_SIZE = 4;
const TABS: (ReportCategory | "All")[] = ["All", ...REPORT_CATEGORIES];

export function ReportsDashboard() {
  const [activeSector, setActiveSector] = useState<ReportSector>(REPORT_SECTORS[0]);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (activeTab === "All" ? activeSector.files : activeSector.files.filter((f) => f.category === activeTab)),
    [activeSector, activeTab]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectSector = (sector: ReportSector) => {
    setActiveSector(sector);
    setActiveTab("All");
    setPage(1);
  };

  const selectTab = (tab: (typeof TABS)[number]) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <section className="bg-[var(--inst-bg)] px-6 py-16 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <ReportsSidebar activeId={activeSector.id} onSelect={selectSector} />

        <div className="min-w-0 flex-1">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-start gap-3"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${activeSector.color}1a` }}
            >
              <activeSector.icon size={20} style={{ color: activeSector.color }} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[var(--inst-heading)]">{activeSector.name}</h2>
              <p className="text-sm text-[var(--inst-text-muted)]">{activeSector.blurb}</p>
            </div>
          </motion.div>

          <div role="tablist" aria-label="Report category" className="mb-6 flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectTab(tab)}
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "border border-[var(--inst-border)] text-[var(--inst-text)] hover:bg-[var(--inst-card-alt-bg)]"
                  )}
                  style={isActive ? { background: activeSector.color } : undefined}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSector.id}-${activeTab}-${page}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="tabpanel"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {pageItems.map((file, i) => (
                <ReportCard key={file.title} file={file} color={activeSector.color} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--inst-text)] transition-colors hover:bg-[var(--inst-card-alt-bg)] disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={n === page}
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    n === page ? "text-white" : "text-[var(--inst-text)] hover:bg-[var(--inst-card-alt-bg)]"
                  )}
                  style={n === page ? { background: activeSector.color } : undefined}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--inst-text)] transition-colors hover:bg-[var(--inst-card-alt-bg)] disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
