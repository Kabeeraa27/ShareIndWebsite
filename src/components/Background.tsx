"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Aurora } from "./Aurora";
import { Particles } from "./Particles";
import { useTheme } from "./ThemeProvider";

interface BackgroundProps {
  /** Nudges the ambient glow toward a hovered tile's accent color. */
  accentGlow?: boolean;
  /** Layers the drifting blue "aurora borealis" ribbons in above the base
   *  gradient — opt-in, scoped to the homepage hero rather than every
   *  banner that reuses this backdrop. Adapts its blend mode to the
   *  current light/dark theme (see Aurora). */
  aurora?: boolean;
}

/**
 * Full-viewport ambient backdrop behind the cube and every other hero
 * banner (Team, Reports). Dark theme keeps the site's original black/glass
 * look; light theme drops the black chrome entirely in favor of the
 * cream/blue/red institutional palette, so the cube doesn't sit in a stray
 * dark box once the rest of the page has gone light.
 */
export function Background({ accentGlow = false, aurora = false }: BackgroundProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

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

  const baseGradient = isLight
    ? "radial-gradient(ellipse 70% 60% at 15% 10%, rgba(255,255,255,0.35), transparent 60%)," +
      "radial-gradient(ellipse 70% 60% at 90% 15%, rgba(206,38,38,0.10), transparent 60%)," +
      "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(10,41,71,0.14), transparent 60%)," +
      "linear-gradient(180deg, #e6eef4 0%, #5085a5 55%, #e6eef4 100%)"
    : "radial-gradient(ellipse 80% 60% at 20% 15%, rgba(84,169,212,0.20), transparent 60%)," +
      "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(239,68,68,0.16), transparent 60%)," +
      "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(84,169,212,0.12), transparent 60%)," +
      // Aurora banners go a shade deeper than the standard dark theme — a
      // near-black sky makes the ribbons read as a genuine night-sky glow
      // instead of a tinted haze.
      (aurora
        ? "linear-gradient(180deg, #020308 0%, #04060f 55%, #020308 100%)"
        : "linear-gradient(180deg, #050816 0%, #070b1e 55%, #050816 100%)");

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
        isLight ? "bg-[#5085a5]" : "bg-background"
      }`}
    >
      {/* Base gradient mesh */}
      <div className="absolute inset-0" style={{ background: baseGradient }} />

      {/* Aurora borealis ribbons — opt-in per banner, adapts its blend mode
          per theme so it stays bright rather than washing out. */}
      {aurora && <Aurora isLight={isLight} />}

      {/* Blurred glow orbs, drifting via parallax layers */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className={`absolute left-[8%] top-[18%] h-72 w-72 rounded-full blur-[110px] animate-float transition-opacity duration-700 ${
          isLight ? "bg-[#1b6fb8]/10" : "bg-accent-blue/30"
        }`}
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className={`absolute right-[10%] top-[8%] h-96 w-96 rounded-full blur-[130px] animate-float ${
          isLight ? "bg-[#ce2626]/10" : "bg-accent-purple/25"
        }`}
      />
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className={`absolute bottom-[6%] left-[35%] h-80 w-80 rounded-full blur-[120px] animate-float transition-colors duration-700 ${
          isLight
            ? accentGlow
              ? "bg-[#ce2626]/15"
              : "bg-[#1b6fb8]/8"
            : accentGlow
              ? "bg-accent-pink/30"
              : "bg-accent-cyan/20"
        }`}
      />

      {/* Floating geometric shapes */}
      <motion.div
        style={{ x: layer2X, y: layer1Y }}
        className={`absolute left-[15%] top-[65%] h-16 w-16 rotate-12 rounded-xl border animate-float ${
          isLight ? "border-[#1b6fb8]/20" : "border-accent-cyan/25"
        }`}
      />
      <motion.div
        style={{ x: layer1X, y: layer3Y }}
        className={`absolute right-[18%] top-[55%] h-10 w-10 rotate-45 rounded-md border animate-float ${
          isLight ? "border-[#ce2626]/25" : "border-accent-purple/30"
        }`}
      />
      <motion.div
        style={{ x: layer3X, y: layer2Y }}
        className={`absolute right-[28%] top-[12%] h-6 w-6 rounded-full border animate-float ${
          isLight ? "border-[#1b6fb8]/30" : "border-accent-blue/40"
        }`}
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className={`absolute left-[45%] top-[8%] h-8 w-8 rotate-6 rounded-full border animate-float ${
          isLight ? "border-[#ce2626]/20" : "border-accent-pink/25"
        }`}
      />

      {/* Dark theme only: subtle grid / vignette to ground the glass panels.
          Light theme deliberately skips this — it's what was reading as a
          "black box" behind the cube once the rest of the page went light. */}
      {!isLight && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,8,22,0.65)_100%)]" />
      )}
      <Particles theme={theme} />
    </div>
  );
}
