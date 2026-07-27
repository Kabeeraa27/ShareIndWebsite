"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Particles } from "./Particles";

interface BackgroundProps {
  /** Nudges the ambient glow toward a hovered tile's accent color. */
  accentGlow?: boolean;
}

/**
 * Full-viewport ambient backdrop: animated gradient mesh, blurred glow orbs,
 * floating geometric shapes, and a subtle mouse-reactive parallax layer.
 */
export function Background({ accentGlow = false }: BackgroundProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const layer1X = useTransform(springX, (v) => v * 14);
  const layer1Y = useTransform(springY, (v) => v * 14);
  const layer2X = useTransform(springX, (v) => v * -22);
  const layer2Y = useTransform(springY, (v) => v * -22);
  const layer3X = useTransform(springX, (v) => v * 30);
  const layer3Y = useTransform(springY, (v) => v * 30);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      {/* Base gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 15%, rgba(59,130,246,0.20), transparent 60%)," +
            "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(168,85,247,0.18), transparent 60%)," +
            "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(236,72,153,0.14), transparent 60%)," +
            "linear-gradient(180deg, #050816 0%, #070b1e 55%, #050816 100%)",
        }}
      />

      {/* Blurred glow orbs, drifting via parallax layers */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-accent-blue/30 blur-[110px] animate-float transition-opacity duration-700"
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute right-[10%] top-[8%] h-96 w-96 rounded-full bg-accent-purple/25 blur-[130px] animate-float"
      />
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className={`absolute bottom-[6%] left-[35%] h-80 w-80 rounded-full blur-[120px] animate-float transition-colors duration-700 ${
          accentGlow ? "bg-accent-pink/30" : "bg-accent-cyan/20"
        }`}
      />

      {/* Floating geometric shapes */}
      <motion.div
        style={{ x: layer2X, y: layer1Y }}
        className="absolute left-[15%] top-[65%] h-16 w-16 rotate-12 rounded-xl border border-accent-cyan/25 animate-float"
      />
      <motion.div
        style={{ x: layer1X, y: layer3Y }}
        className="absolute right-[18%] top-[55%] h-10 w-10 rotate-45 rounded-md border border-accent-purple/30 animate-float"
      />
      <motion.div
        style={{ x: layer3X, y: layer2Y }}
        className="absolute right-[28%] top-[12%] h-6 w-6 rounded-full border border-accent-blue/40 animate-float"
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute left-[45%] top-[8%] h-8 w-8 rotate-6 rounded-full border border-accent-pink/25 animate-float"
      />

      {/* Subtle grid / vignette to ground the glass panels */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,8,22,0.65)_100%)]" />
      <Particles />
    </div>
  );
}
