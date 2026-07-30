"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FileLayerProps {
  index: number;
  total: number;
  label: string;
  color: string;
  children: React.ReactNode;
}

/**
 * Wraps one homepage section as a physical "file" in a stack: a card sized
 * to its own content (never internally scrollable) with a small tab
 * protruding from its top-left edge, like a hanging folder tab. It pins to
 * the top of the viewport for a stretch of scroll, then gets yanked
 * up and off screen — like a sheet pulled out of the folder — while the
 * *next* file's sticky panel rides in underneath to take its place.
 * Opacity is deliberately never animated toward 0: while still pinned,
 * nothing else occupies that screen position yet, so fading would flash
 * the raw body background instead of a clean handoff.
 */
export function FileLayer({ index, total, label, color, children }: FileLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0.62, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0.62, 1], [0, -640]);
  const rotate = useTransform(scrollYProgress, [0.62, 1], [0, index % 2 === 0 ? -6 : 6]);

  const isLast = index === total - 1;

  return (
    <div ref={ref} className={isLast ? "relative" : "relative h-[165vh]"}>
      {/* Solid background on the sticky wrapper itself — the outgoing
          card's fly-out slide needs somewhere clean behind it to reveal,
          not the raw dark body background. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--inst-bg)]">
        <div className="flex h-full w-full items-center justify-center px-4 pt-16 pb-10 sm:px-8">
          <motion.div
            style={{ scale, y, rotate, zIndex: index + 1 }}
            className="flex w-[min(94vw,1200px)] flex-col"
          >
            {/* Folder tab — a small rectangle protruding from the file's top-left edge. */}
            <div
              className="ml-8 flex w-fit shrink-0 items-center gap-2 rounded-t-lg px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-sm sm:ml-12"
              style={{ background: color }}
            >
              <span className="opacity-75">{String(index + 1).padStart(2, "0")}</span>
              {label}
            </div>
            {/* The file body — sized to its own content, never scrolls internally. */}
            <div
              className="overflow-hidden rounded-b-2xl rounded-tr-2xl border shadow-[0_25px_60px_-20px_rgba(10,41,71,0.35)]"
              style={{ borderColor: `${color}33`, background: "var(--inst-bg)" }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
