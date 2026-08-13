"use client";

import { useRef, type ComponentType } from "react";
import { useScroll } from "framer-motion";
import { FileCard } from "./FileCard";
import { useTheme } from "@/components/ThemeProvider";

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
  const { theme } = useTheme();

  return (
    <div ref={ref} className="relative" style={{ height: `${total * 100}dvh` }}>
      {/* The backdrop behind/around the pinned file card itself — not the
       *  card's own surface (FileCard keeps its plain --inst-bg pane
       *  unchanged). Light theme gets a modern gradient-mesh + dot-grid
       *  treatment instead of a flat cream fill, closer in spirit to how
       *  much is visually happening in the dark theme's own backdrop. */}
      <div
        className={`sticky top-0 h-dvh w-full overflow-hidden ${
          theme === "light" ? "home-filestack-backdrop" : "bg-[var(--inst-bg)]"
        }`}
      >
        {files.map(({ label, color, Section }, i) => (
          <FileCard key={label} index={i} total={total} label={label} color={color} scrollYProgress={scrollYProgress}>
            <Section />
          </FileCard>
        ))}
      </div>
    </div>
  );
}
