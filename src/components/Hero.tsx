"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { Background } from "./Background";
import { features, type Feature } from "@/data/features";

/** The hero's small "modular" pitch, one module per cube face — swapped in
 *  for the old tagline/CTA row. Colors mirror the cube's own accent palette
 *  (blue/purple/pink/cyan) so each module reads as its own "face". */
const CUBE_MODULES = [
  {
    title: "Execution Edge",
    description: "Seamless trading across NSE, BSE, and MCX with technology-driven speed.",
    color: "#1b6fb8",
  },
  {
    title: "Research Depth",
    description: "Unlocking opportunities in mid & small caps with sharp fundamental and technical insights.",
    color: "#7c3aed",
  },
  {
    title: "Corporate Access",
    description: "Connecting investors and corporates through roadshows and strategic interactions.",
    color: "#ce2626",
  },
  {
    title: "Innovation Core",
    description: "Powered by uTrade & Algowire for algo-driven, low-latency trading.",
    color: "#0d9488",
  },
];

/** A slim, auto-advancing label ticker rather than a grid of cards — one
 *  label lit at a time with its description crossfading beneath, cycling
 *  through the cube's four "faces" instead of dumping all four at once. */
function CubePossibilities() {
  const [active, setActive] = useState(0);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % CUBE_MODULES.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, []);

  // Keeps whichever pill is active scrolled to the center of the row — on
  // desktop the row usually fits with no scrolling needed, but on narrower
  // screens (where the row scrolls horizontally, see the mask fade below)
  // the auto-rotating and click-selected pill would otherwise land
  // off-screen with no visual cue that it changed.
  //
  // This sets scrollLeft on the row's own scroll container directly rather
  // than calling the pill's Element.scrollIntoView() — scrollIntoView walks
  // every scrollable ancestor up to the document to bring the target fully
  // into view, and on mobile that included the *page* itself, making the
  // whole hero visibly jump/scroll every 3.4s as the ticker auto-advanced.
  // Touching only this container's scrollLeft can't affect page scroll at
  // all.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const pill = pillRefs.current[active];
    if (!scroller || !pill) return;
    const target = pill.offsetLeft - scroller.clientWidth / 2 + pill.offsetWidth / 2;
    scroller.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mb-2 w-full max-w-3xl text-center"
    >
      <p
        className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--cube-label-accent)] sm:text-base"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The Cube of Possibilities
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--inst-heading)] sm:text-lg">
        Like a Rubik&apos;s Cube, our institutional business is built on precision, agility, and
        multidimensional solutions.
      </p>

      {/* Two nested elements on purpose: the outer one owns scrolling
          (fixed width, overflow-x-auto), the inner one owns centering
          (w-max + mx-auto). Combining both jobs on a single flex container
          with justify-center is what caused an earlier version to clip both
          the first and last pill — the browser's default scroll position
          sits at the *center* of a centered-but-overflowing flex line, not
          its start. Splitting them keeps this row on one line always: it
          centers when it fits, and scrolls from a real left edge (nothing
          cut off) when it doesn't.

          The outer element also breaks out of this block's own max-w-3xl
          via the left-1/2/-translate-x-1/2 pair — at the pills' bolder,
          badge-sized width, 768px wasn't enough room to fit all four
          without scrolling even on a normal desktop viewport, so
          "Innovation Core" was permanently clipped on load, not just on
          narrow phones. Breaking out to (near) full viewport width fixes
          that for any reasonably sized screen; the scroll+fade fallback
          still catches genuinely narrow ones. */}
      <div
        ref={scrollerRef}
        className="no-scrollbar relative left-1/2 mt-7 w-screen max-w-none -translate-x-1/2 overflow-x-auto px-4 sm:px-6"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 4%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 92%, transparent)",
        }}
      >
        <div className="mx-auto flex w-max items-center gap-x-3 whitespace-nowrap sm:gap-x-4">
          {CUBE_MODULES.map((module, i) => {
            const isActive = i === active;
            return (
              <button
                key={module.title}
                ref={(el) => {
                  pillRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setActive(i)}
                className="group shrink-0 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-all duration-300 sm:px-5 sm:py-2 sm:text-base"
                style={{
                  color: isActive ? "#fff" : module.color,
                  background: isActive ? module.color : `color-mix(in srgb, ${module.color} 18%, transparent)`,
                  border: `1.5px solid ${module.color}`,
                  fontFamily: "var(--font-display)",
                  textShadow: isActive ? "0 1px 3px rgba(0,0,0,0.35)" : "none",
                  boxShadow: isActive ? `0 0 16px ${module.color}` : "none",
                }}
              >
                {module.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto mt-5 min-h-[3.5rem] max-w-xl sm:min-h-[2rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 text-sm font-semibold leading-snug text-[var(--inst-heading)] sm:text-base"
          >
            {CUBE_MODULES[active].description}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** Deferred to its own client bundle — see CubeCanvas for why. Renders
 *  nothing until mounted, so the hero's text/CTAs paint immediately. */
const CubeCanvas = dynamic(() => import("./cube/CubeCanvas").then((m) => m.CubeCanvas), {
  ssr: false,
});

function useCubeScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setScale(w < 480 ? 0.58 : w < 768 ? 0.72 : w < 1100 ? 0.88 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export function Hero() {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [cubeHovering, setCubeHovering] = useState(false);
  const cubeScale = useCubeScale();

  /** Clicking a tile no longer opens a slide-in drawer — it plays the
   *  cube's focus/zoom animation (via selectedFeature -> CameraRig) and
   *  then hands off to the feature's real page. */
  const handleSelectFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    window.setTimeout(() => {
      router.push(feature.href ?? `/features/${feature.id}`);
    }, 450);
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <Background accentGlow={cubeHovering} aurora />

      {/* Blends the dark hero into the light institutional sections below,
          instead of a hard cut between the two themes. Kept shallow and
          z-index'd below the cube's canvas wrapper (z-10) so it only fades
          the section's bottom padding — the canvas itself has a transparent
          background (alpha:true), so a taller overlay here would bleed
          through the gaps between tiles and wash out the bottom row. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent to-[var(--inst-bg)]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-4 flex flex-col items-center text-center"
      >
        <span className="glass mb-5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
          SEBI-registered • Trusted by 2M+ investors
        </span>
        <h1
          className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[var(--inst-heading)] sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Share India
          <br />
          <span className="gradient-text text-glow">Institutional Business</span>
        </h1>
      </motion.div>

      <CubePossibilities />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-4 h-[420px] w-full max-w-3xl sm:h-[480px] lg:h-[560px]"
      >
        <CubeCanvas
          selectedFeature={selectedFeature}
          onSelectFeature={handleSelectFeature}
          onHoverChange={setCubeHovering}
          cubeScale={cubeScale}
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center gap-2 text-xs text-[var(--inst-text-muted)]"
          aria-hidden="true"
        >
          <MousePointerClick size={14} />
          Drag to rotate • Click a tile to explore
        </div>
      </motion.div>

      <p className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-sm font-semibold italic leading-relaxed text-[var(--inst-heading)] sm:text-base">
        Every face of the cube represents a strength—together forming a complete solution for
        institutional investors.
      </p>

      {/* Accessible, always-tabbable equivalent of the 3D cube navigation. */}
      <nav
        aria-label="Platform features"
        className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-24 focus-within:left-1/2 focus-within:z-[80] focus-within:flex focus-within:max-w-xl focus-within:-translate-x-1/2 focus-within:flex-wrap focus-within:gap-2 focus-within:rounded-2xl focus-within:p-4 focus-within:glass-strong"
      >
        {features.map((feature) => (
          <button
            key={feature.id}
            type="button"
            onClick={() => handleSelectFeature(feature)}
            className="rounded-lg border border-white/15 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
          >
            {feature.name}
          </button>
        ))}
      </nav>
    </section>
  );
}
