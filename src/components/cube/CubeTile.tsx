"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import type { Feature } from "@/data/features";
import { STICKER_SIZE } from "@/lib/cubeLayout";

interface CubeTileProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  feature?: Feature;
  wasDraggingRef?: React.RefObject<boolean>;
  occluderRef?: React.RefObject<THREE.Object3D>;
  /** Ancestor scale applied to the whole cube; see RubiksCubeProps. */
  cubeScale?: number;
  onSelect?: (feature: Feature) => void;
  onHoverChange?: (id: string | null) => void;
}

/**
 * One sticker on the cube. Decorative tiles are inert colored plates;
 * feature tiles additionally carry a billboarded, accessible icon button.
 */
export function CubeTile({
  position,
  rotation,
  color,
  feature,
  wasDraggingRef,
  occluderRef,
  cubeScale = 1,
  onSelect,
  onHoverChange,
}: CubeTileProps) {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const hoverT = useRef(0);

  // A view-independent "floor" emissive (matching the sticker's own base
  // color) keeps the whole tile at a consistent, perceptible brightness
  // regardless of the scene's directional light angle — without it, only
  // the brightly-lit top of a black sticker reads as "the tile," making a
  // perfectly-centered badge look like it's sitting too low.
  const restEmissive = useMemo(() => new THREE.Color(color), [color]);
  const hoverEmissive = useMemo(() => new THREE.Color(feature?.color ?? color), [feature?.color, color]);

  useFrame((_, delta) => {
    const target = hovered ? 1 : 0;
    hoverT.current = THREE.MathUtils.damp(hoverT.current, target, 6, delta);
    if (materialRef.current) {
      materialRef.current.emissive.copy(restEmissive).lerp(hoverEmissive, hoverT.current);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(0.75, 1.2, hoverT.current);
    }
    if (meshRef.current) {
      const s = THREE.MathUtils.lerp(1, 1.08, hoverT.current);
      meshRef.current.scale.setScalar(s);
    }
  });

  const setHover = (isHovered: boolean) => {
    setHovered(isHovered);
    onHoverChange?.(isHovered ? feature?.id ?? null : null);
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  };

  const handleActivate = () => {
    if (wasDraggingRef?.current) return;
    if (feature) onSelect?.(feature);
  };

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox
        ref={meshRef}
        args={[STICKER_SIZE, STICKER_SIZE, 0.06]}
        radius={0.07}
        smoothness={feature ? 4 : 2}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.75}
          roughness={0.75}
          metalness={0.05}
          clearcoat={0.15}
          clearcoatRoughness={0.6}
          envMapIntensity={0.15}
        />
      </RoundedBox>

      {feature && (
        // Deliberately NOT using transform+sprite mode: drei builds that
        // mode's screen position from a hand-rolled CSS billboard matrix
        // which, verified empirically (a 3D marker at the tile's true
        // center vs. the rendered badge position, sampled across all 9
        // grid cells), introduces a radial distortion that grows with
        // distance from the view center — tens of px off on corner tiles,
        // in different directions per tile, not a fixable constant offset.
        // Default (non-transform) mode positions via THREE's own
        // Vector3.project(camera), the standard/correct 3D->2D projection,
        // which doesn't carry that bug.
        <Html
          center
          occlude={occluderRef ? [occluderRef] : undefined}
          distanceFactor={5.3 / cubeScale}
          position={[0, 0, 0.05]}
          zIndexRange={[10, 0]}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onClick={handleActivate}
            className="group relative flex h-[64px] w-[64px] select-none flex-col items-center justify-center gap-1 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md transition-transform duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              boxShadow: hovered
                ? `0 0 22px ${feature.glowColor}, 0 0 46px ${feature.glowColor}`
                : "0 0 0 rgba(0,0,0,0)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            <feature.icon
              size={22}
              strokeWidth={1.75}
              color={feature.color}
              aria-hidden="true"
            />
            <span
              className="text-[9px] font-medium tracking-wide text-white/90"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {feature.name}
            </span>

            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  role="tooltip"
                  className="glass-strong pointer-events-none absolute -top-11 left-1/2 z-20 w-max max-w-[160px] -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-center text-[10px] leading-snug text-white/90 shadow-lg"
                >
                  {feature.tagline}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </Html>
      )}
    </group>
  );
}
