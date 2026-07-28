"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import type { ReportSector } from "@/data/reports";

interface SectorFilePanelProps {
  sector: ReportSector | null;
  onClose: () => void;
}

function subscribeToViewport(callback: () => void) {
  const query = window.matchMedia("(max-width: 767px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false
  );
}

/**
 * The "opened folder": a right-hand drawer (bottom sheet on mobile) whose
 * header shares a layoutId with the folder tab it was opened from, so the
 * tab visually carries over into the open header instead of just appearing.
 */
export function SectorFilePanel({ sector, onClose }: SectorFilePanelProps) {
  const isMobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sector) return;
    previousFocus.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [sector, onClose]);

  const slideVariants = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return (
    <AnimatePresence>
      {sector && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--inst-overlay)] backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sector-panel-title"
            initial={slideVariants.initial}
            animate={slideVariants.animate}
            exit={slideVariants.exit}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed z-[70] flex flex-col overflow-y-auto no-scrollbar
              bg-[var(--inst-card-bg)] text-[var(--inst-text)] shadow-2xl
              inset-x-0 bottom-0 max-h-[88vh] rounded-t-3xl
              md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-full md:max-w-lg md:rounded-t-none md:rounded-l-3xl"
          >
            <div className="relative pt-8 pb-6">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close sector folder"
                className="absolute top-4 right-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--inst-primary)] transition-colors hover:bg-[var(--inst-card-alt-bg)]"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center px-6 text-center">
                <motion.span
                  layoutId={sector ? `folder-${sector.id}` : undefined}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: sector ? `${sector.color}1a` : undefined }}
                >
                  {sector && <sector.icon size={30} style={{ color: sector.color }} aria-hidden="true" />}
                </motion.span>
                <h2 id="sector-panel-title" className="mt-4 text-xl font-semibold text-[var(--inst-heading)]">
                  {sector?.name}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--inst-text-muted)]">
                  {sector?.blurb}
                </p>
              </div>
            </div>

            <div className="flex-1 px-6 pb-8">
              <h3 className="mb-3 text-xs font-semibold tracking-wide text-[var(--inst-text-muted)] uppercase">
                Files in this folder
              </h3>
              <ul className="flex flex-col gap-2.5">
                {sector?.files.map((file, i) => (
                  <motion.li
                    key={file.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      className="group flex w-full items-start gap-3 rounded-xl border border-[var(--inst-border)] bg-[var(--inst-card-alt-bg)] p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderLeft: `3px solid ${sector.color}` }}
                    >
                      <span
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `${sector.color}1a` }}
                      >
                        <FileText size={16} style={{ color: sector.color }} aria-hidden="true" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-[var(--inst-heading)]">
                          {file.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-[var(--inst-text-muted)]">
                          {file.date} · {file.pages} pages · PDF
                        </span>
                      </span>
                      <span
                        className="mt-1 text-xs font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        style={{ color: sector.color }}
                      >
                        View
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
