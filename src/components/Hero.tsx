"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Boxes, MousePointerClick } from "lucide-react";
import { Background } from "./Background";
import { features, type Feature } from "@/data/features";

/** The hero's small "modular" pitch, one module per cube face — swapped in
 *  for the old tagline/CTA row. Colors mirror the cube's own accent palette
 *  (blue/purple/pink/cyan) so each module reads as its own "face". */
const CUBE_MODULES = [
  {
    title: "Execution Edge",
    description: "Seamless trading across NSE, BSE, and MCX with technology-driven speed.",
    color: "var(--color-accent-blue)",
  },
  {
    title: "Research Depth",
    description: "Unlocking opportunities in mid & small caps with sharp fundamental and technical insights.",
    color: "var(--color-accent-purple)",
  },
  {
    title: "Corporate Access",
    description: "Connecting investors and corporates through roadshows and strategic interactions.",
    color: "var(--color-accent-pink)",
  },
  {
    title: "Innovation Core",
    description: "Powered by uTrade & Algowire for algo-driven, low-latency trading.",
    color: "var(--color-accent-cyan)",
  },
];

/** A slim, auto-advancing label ticker rather than a grid of cards — one
 *  label lit at a time with its description crossfading beneath, cycling
 *  through the cube's four "faces" instead of dumping all four at once. */
function CubePossibilities() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % CUBE_MODULES.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mb-2 w-full max-w-2xl text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)] sm:text-sm">
        The Cube of Possibilities
      </p>
      <p className="mx-auto mt-2 max-w-xl text-xs text-[var(--inst-text-muted)] sm:text-sm">
        Like a Rubik&apos;s Cube, our institutional business is built on precision, agility, and
        multidimensional solutions.
      </p>

      <div className="no-scrollbar mx-auto mt-5 flex max-w-xl items-center justify-center gap-3 overflow-x-auto whitespace-nowrap px-2 sm:gap-5">
        {CUBE_MODULES.map((module, i) => {
          const isActive = i === active;
          return (
            <button
              key={module.title}
              type="button"
              onClick={() => setActive(i)}
              className="group flex shrink-0 flex-col items-center gap-1.5"
            >
              <span
                className="text-[9.5px] font-semibold uppercase tracking-wide transition-all duration-300 sm:text-xs"
                style={{ color: module.color, opacity: isActive ? 1 : 0.45 }}
              >
                {module.title}
              </span>
              <span
                className="h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "100%" : "0%",
                  background: module.color,
                }}
              />
            </button>
          );
        })}
      </div>

      <div className="relative mx-auto mt-4 min-h-[2.75rem] max-w-lg sm:min-h-[1.5rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 text-xs text-[var(--inst-text-muted)] sm:text-sm"
          >
            {CUBE_MODULES[active].description}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass mx-auto mt-6 flex max-w-lg items-center gap-2.5 rounded-full px-4 py-2 sm:mt-8"
      >
        <Boxes size={15} className="shrink-0 text-[var(--color-accent-cyan)]" aria-hidden="true" />
        <p className="text-left text-[10.5px] leading-snug text-[var(--inst-text-muted)] sm:text-xs">
          No face turns alone — every move ripples across the whole. That&apos;s the discipline
          behind the desk: research, execution, and access moving as one coordinated system.
        </p>
      </motion.div>
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
