"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { Background } from "./Background";
import { RubiksCube } from "./cube/RubiksCube";
import { features, type Feature } from "@/data/features";

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
      <Background accentGlow={cubeHovering} />

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
        <p className="mt-5 max-w-xl text-base text-[var(--inst-text)] sm:text-lg">
          Research based conviction meets precision execution.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#get-started"
            className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(90deg, var(--inst-primary), var(--inst-accent))",
              boxShadow: "0 8px 28px color-mix(in srgb, var(--inst-primary) 35%, transparent)",
            }}
          >
            Get Started Free
            <ArrowRight size={16} />
          </a>
          <a
            href="/offerings"
            className="glass rounded-full px-7 py-3 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white"
          >
            Explore Offerings
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-4 h-[420px] w-full max-w-3xl sm:h-[480px] lg:h-[560px]"
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.4], fov: 45, near: 0.1, far: 100 }}
          style={{ touchAction: "none" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <group scale={cubeScale}>
              <RubiksCube
                selectedFeature={selectedFeature}
                onSelectFeature={handleSelectFeature}
                onHoverChange={setCubeHovering}
                cubeScale={cubeScale}
              />
            </group>
          </Suspense>
        </Canvas>

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
