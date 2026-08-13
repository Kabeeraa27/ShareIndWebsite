"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface FileCardProps {
  index: number;
  total: number;
  label: string;
  color: string;
  /** Shared 0->1 progress across the *entire* stack, from the parent
   *  FileStack's single scroll container — this card only reads its own
   *  slice of it. */
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}

/**
 * One file in the stack. All files sit at the exact same spot, stacked by
 * z-index (earlier files on top) — nothing "arrives", a file is just
 * unmasked once the one above it flies away. Only the topmost file's slice
 * of the shared scroll range is live at any moment; every other file's
 * transform is pinned at its start or end value.
 *
 * Within its own slice, a file first holds still for a beat (fully
 * revealed and readable) before it starts flying away — so exactly one
 * file is ever settled on screen at a time, not two overlapping mid-motion.
 */
export function FileCard({ index, total, label, color, scrollYProgress, children }: FileCardProps) {
  const isLast = index === total - 1;
  const sliceStart = index / total;
  const sliceEnd = (index + 1) / total;
  const localT = useTransform(scrollYProgress, [sliceStart, sliceEnd], [0, 1], {
    clamp: true,
  });

  const exitStart = 0.4;
  const scale = useTransform(localT, [exitStart, 1], isLast ? [1, 1] : [1, 0.8]);
  const y = useTransform(localT, [exitStart, 1], isLast ? [0, 0] : [0, -1100]);
  const rotate = useTransform(localT, [exitStart, 1], isLast ? [0, 0] : [0, index % 2 === 0 ? -6 : 6]);

  return (
    // pointer-events-none here is load-bearing: every card's wrapper spans
    // the full viewport regardless of where its content has flown to, so
    // without this the topmost (earliest, still-in-DOM) card's empty box
    // would swallow every click meant for whichever card is actually
    // visible beneath it. pointer-events-auto below re-enables it only on
    // the card's own (correctly positioned) content box.
    <div
      // Anchored to the top (not vertically centered) below `sm` — on a
      // short mobile viewport, centering a card taller than the available
      // space pushes its top edge up underneath the fixed Navbar, hiding
      // content with no way to scroll back up to it (the pinned FileStack
      // owns page scroll). Centering is safe again from `sm` up, where the
      // desktop nav is a single line and cards reliably fit.
      className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden px-4 pt-24 pb-6 sm:items-center sm:px-8 sm:pt-16 sm:pb-10"
      style={{ zIndex: total - index }}
    >
      <motion.div
        style={{ scale, y, rotate }}
        className="pointer-events-auto flex max-h-full w-[min(94vw,1200px)] flex-col"
      >
        {/* Folder tab — a small rectangle protruding from the file's top-left edge. */}
        <div
          className="ml-8 flex w-fit shrink-0 items-center gap-2 rounded-t-lg px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-sm sm:ml-12"
          style={{ background: color }}
        >
          <span className="opacity-75">{String(index + 1).padStart(2, "0")}</span>
          {label}
        </div>
        {/* The file body scrolls internally when its content is taller than
            the space available (mobile especially, but a short desktop
            window can hit this too) — never clips unreachable content top
            or bottom. Deliberately left at the default `overscroll-behavior`
            (not `contain`): once the card's own content is scrolled to its
            end, the same continued scroll/swipe chains straight through to
            the page scroll that drives the pinned stack, instead of getting
            trapped inside the card with no way to advance. */}
        <div
          className="home-filecard-surface overflow-y-auto rounded-b-2xl rounded-tr-2xl border shadow-[0_25px_60px_-20px_rgba(10,41,71,0.35)]"
          style={{ borderColor: `${color}33`, background: "var(--inst-bg)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
