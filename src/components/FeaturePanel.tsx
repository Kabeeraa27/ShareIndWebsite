"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import type { Feature } from "@/data/features";

interface FeaturePanelProps {
  feature: Feature | null;
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
 * Detail panel for the selected cube tile: a right-hand drawer on desktop,
 * a bottom sheet on mobile. Handles Escape-to-close and a basic focus trap.
 */
export function FeaturePanel({ feature, onClose }: FeaturePanelProps) {
  const isMobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!feature) return;
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
  }, [feature, onClose]);

  const slideVariants = isMobile
    ? {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
      }
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
      };

  return (
    <AnimatePresence>
      {feature && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-panel-title"
            initial={slideVariants.initial}
            animate={slideVariants.animate}
            exit={slideVariants.exit}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="glass-strong fixed z-[70] flex flex-col overflow-y-auto no-scrollbar
              inset-x-0 bottom-0 max-h-[88vh] rounded-t-3xl border-t
              md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-full md:max-w-md md:rounded-t-none md:rounded-l-3xl md:border-t-0 md:border-l"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-inherit px-6 py-5">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: `${feature.color}22`,
                    boxShadow: `0 0 20px ${feature.glowColor}`,
                  }}
                >
                  <feature.icon size={22} color={feature.color} aria-hidden="true" />
                </span>
                <h2
                  id="feature-panel-title"
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.name}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close feature panel"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-6 px-6 py-6">
              <p className="text-sm font-medium uppercase tracking-wide" style={{ color: feature.color }}>
                {feature.tagline}
              </p>

              <p className="text-base leading-relaxed text-white/80">{feature.description}</p>

              <div
                className="flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                role="img"
                aria-label={`${feature.name} screenshot placeholder`}
              >
                <feature.icon size={40} className="text-white/20" aria-hidden="true" />
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
                  Benefits
                </h3>
                <ul className="flex flex-col gap-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-white/85">
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
              </div>

              {feature.href ? (
                <Link
                  href={feature.href}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(90deg, ${feature.color}, #a855f7)`,
                    boxShadow: `0 0 24px ${feature.glowColor}`,
                  }}
                >
                  Explore {feature.name}
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <button
                  type="button"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(90deg, ${feature.color}, #a855f7)`,
                    boxShadow: `0 0 24px ${feature.glowColor}`,
                  }}
                >
                  Explore {feature.name}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
