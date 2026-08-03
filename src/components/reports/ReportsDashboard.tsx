"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { REPORT_CATEGORIES, type ReportCategory, type ReportSector } from "@/data/reports";
import { DESK_NOTES, type DeskNoteSection } from "@/data/deskNotes";
import { ReportsSidebar } from "./ReportsSidebar";
import { ReportCard } from "./ReportCard";
import { DeskNotePostCard } from "./DeskNotePostCard";

const PAGE_SIZE = 4;
const TABS: (ReportCategory | "All")[] = ["All", ...REPORT_CATEGORIES];

/** Sectors are a file cabinet (files, categorized, paginated); desk notes
 *  are read-in-place dated posts (no categories, no file metadata) — this
 *  is the only thing that tells the two apart at render time. */
function isSector(item: ReportSector | DeskNoteSection): item is ReportSector {
  return "files" in item;
}

export function ReportsDashboard() {
  const [activeItem, setActiveItem] = useState<ReportSector | DeskNoteSection>(DESK_NOTES[0]);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!isSector(activeItem)) return [];
    return activeTab === "All" ? activeItem.files : activeItem.files.filter((f) => f.category === activeTab);
  }, [activeItem, activeTab]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectItem = (item: ReportSector | DeskNoteSection) => {
    setActiveItem(item);
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
        <ReportsSidebar activeId={activeItem.id} onSelect={selectItem} />

        <div className="min-w-0 flex-1">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-start gap-3"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${activeItem.color}1a` }}
            >
              <activeItem.icon size={20} style={{ color: activeItem.color }} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[var(--inst-heading)]">{activeItem.name}</h2>
              <p className="text-sm text-[var(--inst-text-muted)]">{activeItem.blurb}</p>
            </div>
          </motion.div>

          {isSector(activeItem) ? (
            <>
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
                      style={isActive ? { background: activeItem.color } : undefined}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem.id}-${activeTab}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  role="tabpanel"
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {pageItems.map((file, i) => (
                    <ReportCard key={file.title} file={file} color={activeItem.color} index={i} />
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
                      type="button"
                      key={n}
                      onClick={() => setPage(n)}
                      aria-current={n === page}
                      className={clsx(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                        n === page ? "text-white" : "text-[var(--inst-text)] hover:bg-[var(--inst-card-alt-bg)]"
                      )}
                      style={n === page ? { background: activeItem.color } : undefined}
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
            </>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {activeItem.posts.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-[var(--inst-border)] px-5 py-12 text-center text-sm text-[var(--inst-text-muted)]">
                    New {activeItem.name.toLowerCase()} posts are coming soon.
                  </p>
                ) : (
                  activeItem.posts.map((post, i) => (
                    <DeskNotePostCard key={post.date + post.author} post={post} color={activeItem.color} index={i} />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
