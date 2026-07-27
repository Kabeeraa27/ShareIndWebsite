"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  drift: number;
  phase: number;
  color: string;
}

const COLORS = ["#3b82f6", "#a855f7", "#22d3ee", "#ec4899", "#ffffff"];
const PARTICLE_COUNT = 70;

/** Cheap canvas-based ambient particle field drifting behind the hero content. */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.5,
        speedY: Math.random() * 0.18 + 0.04,
        drift: Math.random() * 0.6 - 0.3,
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.02 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.15 + twinkle * 0.35;
        ctx.fill();

        if (!reducedMotion) {
          p.y -= p.speedY;
          p.x += p.drift * 0.15;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
      }
      ctx.globalAlpha = 1;
      t += 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
