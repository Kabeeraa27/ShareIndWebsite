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
 * look; light theme drops the black chrome entirely in favor of the blue-
 * shades institutional palette (the same family --inst-bg and friends use
 * site-wide), so the cube doesn't sit in a stray dark box once the rest of
 * the page has gone light.
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

  // Only the homepage cube hero passes aurora=true — every other
  // light-theme banner (About, Team, Reports, Sectors, ...) gets a calmer,
  // flatter version of the same blue-shades palette (matching the
  // --inst-bg tokens those pages' own sections use) rather than the
  // vivid, high-contrast one reserved for the hero.
  const boldLight = isLight && aurora;

  const baseGradient = isLight
    ? aurora
      ? // High-contrast base for the cube hero specifically, built entirely
        // from shades of blue — French Blue #023E8A, Bright Teal Blue
        // #0077B6, Blue Green #0096C7, Turquoise Surf #00B4D8, Sky Aqua
        // #48CAE4, Frosted Blue #90E0EF — rather than the mixed
        // blue/red/violet/teal set from an earlier pass, which read as
        // pinkish where the warmer hues overlapped. Keeps the same bright,
        // vivid intensity, and stays in the same blue/cyan family the dark
        // theme's own accent colors already use, so light and dark read as
        // two takes on one palette instead of unrelated looks.
        "radial-gradient(ellipse 55% 50% at 50% 0%, rgba(255,255,255,0.8), transparent 50%)," +
        "radial-gradient(ellipse 55% 55% at 8% 15%, rgba(2,62,138,0.42), transparent 65%)," +
        "radial-gradient(ellipse 55% 55% at 92% 12%, rgba(0,119,182,0.38), transparent 65%)," +
        "radial-gradient(ellipse 60% 55% at 12% 94%, rgba(0,180,216,0.36), transparent 65%)," +
        "radial-gradient(ellipse 60% 55% at 90% 96%, rgba(72,202,228,0.36), transparent 65%)," +
        "linear-gradient(160deg, #ffffff 0%, #f0f9fc 45%, #e6f6fb 100%)"
      : "radial-gradient(ellipse 70% 60% at 15% 10%, rgba(255,255,255,0.45), transparent 60%)," +
        "radial-gradient(ellipse 70% 60% at 90% 15%, rgba(0,119,182,0.07), transparent 60%)," +
        "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(2,62,138,0.07), transparent 60%)," +
        "linear-gradient(180deg, #f3fafd 0%, #f3fafd 100%)"
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
        isLight ? (aurora ? "bg-white" : "bg-[#f3fafd]") : "bg-background"
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
          isLight ? (boldLight ? "bg-[#023e8a]/35" : "bg-[#1b6fb8]/10") : "bg-accent-blue/30"
        }`}
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className={`absolute right-[10%] top-[8%] h-96 w-96 rounded-full blur-[130px] animate-float ${
          isLight ? (boldLight ? "bg-[#00b4d8]/32" : "bg-[#ce2626]/10") : "bg-accent-purple/25"
        }`}
      />
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className={`absolute bottom-[6%] left-[35%] h-80 w-80 rounded-full blur-[120px] animate-float transition-colors duration-700 ${
          isLight
            ? accentGlow
              ? "bg-[#ce2626]/32"
              : boldLight
                ? "bg-[#48cae4]/40"
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
          isLight ? (boldLight ? "border-[#00b4d8]/45" : "border-[#1b6fb8]/20") : "border-accent-cyan/25"
        }`}
      />
      <motion.div
        style={{ x: layer1X, y: layer3Y }}
        className={`absolute right-[18%] top-[55%] h-10 w-10 rotate-45 rounded-md border animate-float ${
          isLight ? (boldLight ? "border-[#0077b6]/50" : "border-[#ce2626]/25") : "border-accent-purple/30"
        }`}
      />
      <motion.div
        style={{ x: layer3X, y: layer2Y }}
        className={`absolute right-[28%] top-[12%] h-6 w-6 rounded-full border animate-float ${
          isLight ? (boldLight ? "border-[#023e8a]/55" : "border-[#1b6fb8]/30") : "border-accent-blue/40"
        }`}
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className={`absolute left-[45%] top-[8%] h-8 w-8 rotate-6 rounded-full border animate-float ${
          isLight ? (boldLight ? "border-[#48cae4]/50" : "border-[#ce2626]/20") : "border-accent-pink/25"
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
