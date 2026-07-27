"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { Background } from "./Background";
import { RubiksCube } from "./cube/RubiksCube";
import { FeaturePanel } from "./FeaturePanel";
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
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [cubeHovering, setCubeHovering] = useState(false);
  const cubeScale = useCubeScale();

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <Background accentGlow={cubeHovering} />

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
          className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Every tool you need to trade,
          <br />
          <span className="gradient-text text-glow">solved in one cube.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/65 sm:text-lg">
          Rubik brings your dashboard, analytics, AI research, and security into a
          single interactive experience. Drag the cube. Explore a feature. Start trading.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#get-started"
            className="glow-purple flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink px-7 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
          >
            Get Started Free
            <ArrowRight size={16} />
          </a>
          <a
            href="#features"
            className="glass rounded-full px-7 py-3 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white"
          >
            Explore Features
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
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6.4], fov: 45, near: 0.1, far: 100 }}
          style={{ touchAction: "none" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <group scale={cubeScale}>
              <RubiksCube
                selectedFeature={selectedFeature}
                onSelectFeature={setSelectedFeature}
                onHoverChange={setCubeHovering}
              />
            </group>
          </Suspense>
        </Canvas>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center gap-2 text-xs text-white/40"
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
            onClick={() => setSelectedFeature(feature)}
            className="rounded-lg border border-white/15 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
          >
            {feature.name}
          </button>
        ))}
      </nav>

      <FeaturePanel feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </section>
  );
}
