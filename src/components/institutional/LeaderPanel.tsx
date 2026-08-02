"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Leader } from "@/data/institutional";

interface LeaderPanelProps {
  leader: Leader | null;
  onClose: () => void;
}

/**
 * Detail panel for a leadership bio: a centered modal, so reading a bio
 * doesn't feel like navigating into a sub-page the way a slide-in drawer
 * does — it's a focused overlay on top of the same section.
 */
export function LeaderPanel({ leader, onClose }: LeaderPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!leader) return;
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
  }, [leader, onClose]);

  return (
    <AnimatePresence>
      {leader && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#001e33]/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* This wrapper spans the full viewport too (to center the panel),
              which otherwise sits above the backdrop and silently swallows
              clicks in the empty space around the panel before they ever
              reach the backdrop's onClose. Closing here too — with the
              panel itself stopping propagation — makes clicking anywhere
              outside the panel close it, not just the backdrop's own
              (fully covered) area. */}
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="leader-panel-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto no-scrollbar rounded-3xl border border-[var(--inst-border)]
                bg-[var(--inst-card-bg)] text-[var(--inst-text)] shadow-2xl"
            >
            <div className="relative flex flex-col items-center border-b border-[var(--inst-border)] bg-gradient-to-b from-[var(--inst-card-alt-bg)] to-[var(--inst-card-bg)] px-6 pt-8 pb-6 text-center">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close leader bio"
                className="absolute top-4 right-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--inst-primary)] transition-colors hover:bg-[var(--inst-card-bg)]"
              >
                <X size={20} />
              </button>

              {leader && (
                <span className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-[var(--inst-card-bg)] shadow-lg sm:h-36 sm:w-36">
                  <Image src={leader.image} alt="" fill sizes="144px" className="object-cover" />
                </span>
              )}
              <h2 id="leader-panel-title" className="mt-4 text-xl font-semibold text-[var(--inst-heading)]">
                {leader?.name}
              </h2>
              <p className="text-sm font-medium text-[var(--inst-primary)]">{leader?.title}</p>
            </div>

              <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                {leader?.bio.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-[var(--inst-text)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
