"use client";

import { useRef, type ComponentType } from "react";
import { useScroll } from "framer-motion";
import { FileCard } from "./FileCard";

interface FileDef {
  label: string;
  color: string;
  Section: ComponentType;
}

/**
 * A single pinned viewport holding every homepage "file" stacked at the
 * exact same spot. The whole stack pins once and stays pinned for its
 * entire scroll range — nothing about the page's own layout shifts while
 * you're in it — and each file gets an equal slice of that range to fly
 * away, unmasking the one beneath. Scrolling never moves anything on
 * screen except the file currently on top.
 */
export function FileStack({ files }: { files: FileDef[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = files.length;

  return (
    <div ref={ref} className="relative" style={{ height: `${total * 100}dvh` }}>
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[var(--inst-bg)]">
        {files.map(({ label, color, Section }, i) => (
          <FileCard key={label} index={i} total={total} label={label} color={color} scrollYProgress={scrollYProgress}>
            <Section />
          </FileCard>
        ))}
      </div>
    </div>
  );
}
