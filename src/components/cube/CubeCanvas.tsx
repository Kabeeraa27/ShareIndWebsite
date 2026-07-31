"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RubiksCube } from "./RubiksCube";
import type { Feature } from "@/data/features";

interface CubeCanvasProps {
  selectedFeature: Feature | null;
  onSelectFeature: (feature: Feature) => void;
  onHoverChange: (hovering: boolean) => void;
  cubeScale: number;
}

/** Isolated in its own module so Hero can load it via next/dynamic —
 *  three.js/@react-three/fiber/drei are a heavy client-only payload that
 *  would otherwise ship in the same chunk as the hero's headline and CTAs,
 *  delaying first paint of content that has nothing to do with the cube. */
export function CubeCanvas({ selectedFeature, onSelectFeature, onHoverChange, cubeScale }: CubeCanvasProps) {
  return (
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
            onSelectFeature={onSelectFeature}
            onHoverChange={onHoverChange}
            cubeScale={cubeScale}
          />
        </group>
      </Suspense>
    </Canvas>
  );
}
