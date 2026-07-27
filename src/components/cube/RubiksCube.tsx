"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useCubeRotation } from "@/hooks/useCubeRotation";
import { CubeFace } from "./CubeFace";
import { AXIS_POSITIONS, CUBIE_SIZE, FACE_DEFINITIONS } from "@/lib/cubeLayout";
import type { Feature } from "@/data/features";

const FACE_BASE_COLORS: Record<string, string> = {
  "z-1": "#ec4899", // back
  x1: "#3b82f6", // right
  "x-1": "#a855f7", // left
  y1: "#f5f7ff", // top
  "y-1": "#22d3ee", // bottom
};

interface RubiksCubeProps {
  selectedFeature: Feature | null;
  onSelectFeature: (feature: Feature) => void;
  onHoverChange?: (hovering: boolean) => void;
}

/** Subtle mouse-parallax at rest, gentle dolly-in while a feature is focused. */
function CameraRig({ focused }: { focused: boolean }) {
  const { camera, pointer } = useThree();
  /* eslint-disable react-hooks/immutability -- three.js Object3D is a mutable
     render target, not React state; per-frame mutation is the standard
     react-three-fiber pattern (see R3F docs on useFrame). */
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    const targetZ = focused ? 4.7 : 6.4;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
    const targetX = focused ? 0 : pointer.x * 0.55;
    const targetY = focused ? 0 : pointer.y * 0.32;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);
    camera.lookAt(0, 0, 0);
  });
  /* eslint-enable react-hooks/immutability */
  return null;
}

export function RubiksCube({ selectedFeature, onSelectFeature, onHoverChange }: RubiksCubeProps) {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const paused = hoveredTile !== null || selectedFeature !== null;
  const { groupRef, wasDraggingRef, focusToFront, releaseFocus } = useCubeRotation({ paused });
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useEffect(() => {
    onHoverChange?.(hoveredTile !== null);
  }, [hoveredTile, onHoverChange]);

  useEffect(() => {
    if (!selectedFeature) releaseFocus();
  }, [selectedFeature, releaseFocus]);

  const handleSelect = async (feature: Feature) => {
    await focusToFront();
    onSelectFeature(feature);
  };

  return (
    <>
      <CameraRig focused={!!selectedFeature} />

      <ambientLight intensity={0.45} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-4, -1.5, 4]} intensity={0.7} color="#a855f7" />
      <pointLight position={[4, -2.5, -3]} intensity={0.5} color="#22d3ee" />
      <Environment preset="city" environmentIntensity={0.6} />

      <group ref={groupRef}>
        {AXIS_POSITIONS.map((x) =>
          AXIS_POSITIONS.map((y) =>
            AXIS_POSITIONS.map((z) => (
              <RoundedBox
                key={`cubie-${x}-${y}-${z}`}
                args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]}
                radius={0.12}
                smoothness={4}
                position={[x, y, z]}
                castShadow
                receiveShadow
              >
                <meshPhysicalMaterial
                  ref={bodyMaterialRef}
                  color="#040406"
                  roughness={0.45}
                  metalness={0.2}
                  clearcoat={0.6}
                  clearcoatRoughness={0.3}
                />
              </RoundedBox>
            ))
          )
        )}

        {FACE_DEFINITIONS.map((face) => {
          const interactive = face.axis === "z" && face.sign === 1;
          return (
            <CubeFace
              key={`face-${face.axis}${face.sign}`}
              face={face}
              baseColor={interactive ? "#0b1024" : FACE_BASE_COLORS[`${face.axis}${face.sign}`]}
              interactive={interactive}
              wasDraggingRef={wasDraggingRef}
              onSelectFeature={handleSelect}
              onHoverChange={setHoveredTile}
            />
          );
        })}
      </group>

      <ContactShadows
        position={[0, -2.3, 0]}
        opacity={0.55}
        scale={11}
        blur={2.6}
        far={4.5}
        color="#000000"
      />
    </>
  );
}
