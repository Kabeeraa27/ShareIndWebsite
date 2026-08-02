"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import { useCubeRotation } from "@/hooks/useCubeRotation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CubeFace } from "./CubeFace";
import {
  AXIS_POSITIONS,
  CUBIE_SIZE,
  FACE_DEFINITIONS,
  STICKER_OFFSET,
  STICKER_SIZE,
  gridIndexToColRow,
  type Axis,
  type FaceDefinition,
} from "@/lib/cubeLayout";
import { assembleT, assembleFullyDone, randomFlightOffset, randomDelay } from "@/lib/assemble";
import { SOLVE_FLOURISH_DELAY_MS } from "@/lib/cubeIntro";
import {
  createFlourishState,
  runSolveFlourish,
  layerMatches,
  LAYER_EPSILON,
  type FlourishState,
} from "@/lib/solveFlourish";
import type { Feature } from "@/data/features";

/** Shared, never-mutated unit vectors for the flourish's per-axis rotation. */
const AXIS_VECTORS: Record<Axis, THREE.Vector3> = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

const FACE_BASE_COLORS: Record<string, string> = {
  "z-1": "#ec4899", // back
  x1: "#54a9d4", // right
  "x-1": "#a855f7", // left
  y1: "#f5f7ff", // top
  "y-1": "#22d3ee", // bottom
};

const FRONT_FACE = FACE_DEFINITIONS.find((f) => f.axis === "z" && f.sign === 1)!;
const DECORATIVE_FACES = FACE_DEFINITIONS.filter((f) => !(f.axis === "z" && f.sign === 1));

/**
 * The 27 body cubies are identical in shape and material, so they're drawn as
 * a single InstancedMesh (1 draw call) instead of 27 separate meshes.
 *
 * On mount, each cubie flies in from a random point in space to its final
 * grid position — a per-instance random offset/delay, eased and applied
 * every frame via useFrame until the whole set has settled, at which point
 * the per-frame work stops.
 */
function CubieBodies({ flourish }: { flourish: React.RefObject<FlourishState> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(
    () => new RoundedBoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE, 2, 0.12),
    []
  );
  const count = AXIS_POSITIONS.length ** 3;

  const finalPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (const x of AXIS_POSITIONS) {
      for (const y of AXIS_POSITIONS) {
        for (const z of AXIS_POSITIONS) {
          positions.push(new THREE.Vector3(x, y, z));
        }
      }
    }
    return positions;
  }, []);

  const flightSeeds = useMemo(
    () =>
      finalPositions.map(() => ({
        offset: randomFlightOffset(1.8, 3.4),
        delay: randomDelay(),
      })),
    [finalPositions]
  );

  const startTimeRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (!doneRef.current) {
      const elapsed = state.clock.getElapsedTime();
      if (startTimeRef.current === null) startTimeRef.current = elapsed;
      const startTime = startTimeRef.current;

      const matrix = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const scale = new THREE.Vector3(1, 1, 1);
      const quat = new THREE.Quaternion();

      finalPositions.forEach((finalPos, i) => {
        const { offset, delay } = flightSeeds[i];
        const t = assembleT(elapsed, startTime, delay);
        const remaining = 1 - t;
        pos.set(
          finalPos.x + offset.x * remaining,
          finalPos.y + offset.y * remaining,
          finalPos.z + offset.z * remaining
        );
        quat.setFromEuler(new THREE.Euler(remaining * Math.PI * 1.5, remaining * Math.PI * 1.5, 0));
        matrix.compose(pos, quat, scale);
        mesh.setMatrixAt(i, matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;

      if (assembleFullyDone(elapsed, startTime)) doneRef.current = true;
      return;
    }

    // Post-assembly: the "solving" flourish spins whichever layer is
    // currently turning, around whichever axis it's currently on (always
    // the same axis, matching a real cube move). Everything else just
    // holds its resting (identity) transform.
    const flourishState = flourish.current;
    if (!flourishState.active) return;

    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    const layerQuat = new THREE.Quaternion().setFromAxisAngle(
      AXIS_VECTORS[flourishState.axis],
      flourishState.angle
    );

    finalPositions.forEach((finalPos, i) => {
      const coord =
        flourishState.axis === "x" ? finalPos.x : flourishState.axis === "y" ? finalPos.y : finalPos.z;
      if (Math.abs(coord - flourishState.layerValue) < LAYER_EPSILON) {
        pos.copy(finalPos).applyQuaternion(layerQuat);
        quat.copy(layerQuat);
      } else {
        pos.copy(finalPos);
        quat.identity();
      }
      matrix.compose(pos, quat, scale);
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#040406"
        roughness={0.45}
        metalness={0.2}
        clearcoat={0.6}
        clearcoatRoughness={0.3}
      />
    </instancedMesh>
  );
}

/**
 * Non-interactive faces (5 of the 6) have a uniform color across all 9
 * stickers, so each face is one InstancedMesh instead of 9 separate meshes.
 * Same fly-in-and-settle treatment as the body cubies, independently timed
 * per sticker.
 */
function DecorativeFace({
  face,
  color,
  flourish,
}: {
  face: FaceDefinition;
  color: string;
  flourish: React.RefObject<FlourishState>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(
    () => new RoundedBoxGeometry(STICKER_SIZE, STICKER_SIZE, 0.06, 1, 0.07),
    []
  );

  const finalTransforms = useMemo(() => {
    const euler = new THREE.Euler(...face.rotation);
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    const transforms: { position: THREE.Vector3; quaternion: THREE.Quaternion }[] = [];
    for (let gridIndex = 0; gridIndex < 9; gridIndex += 1) {
      const [u, v] = gridIndexToColRow(gridIndex);
      const position = new THREE.Vector3(u, v, STICKER_OFFSET).applyEuler(euler);
      transforms.push({ position, quaternion });
    }
    return transforms;
  }, [face]);

  const flightSeeds = useMemo(
    () =>
      finalTransforms.map(() => ({
        offset: randomFlightOffset(1.6, 3),
        delay: randomDelay(),
      })),
    [finalTransforms]
  );

  const startTimeRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (!doneRef.current) {
      const elapsed = state.clock.getElapsedTime();
      if (startTimeRef.current === null) startTimeRef.current = elapsed;
      const startTime = startTimeRef.current;

      const matrix = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const scale = new THREE.Vector3(1, 1, 1);

      finalTransforms.forEach(({ position, quaternion }, i) => {
        const { offset, delay } = flightSeeds[i];
        const t = assembleT(elapsed, startTime, delay);
        const remaining = 1 - t;
        pos.set(
          position.x + offset.x * remaining,
          position.y + offset.y * remaining,
          position.z + offset.z * remaining
        );
        matrix.compose(pos, quaternion, scale);
        mesh.setMatrixAt(i, matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;

      if (assembleFullyDone(elapsed, startTime)) doneRef.current = true;
      return;
    }

    // Post-assembly flourish. Every sticker on this face sits at the same
    // fixed depth along the face's own axis (e.g. every "right" face
    // sticker has x ≈ its outward offset, not `STEP`), so whether the
    // *whole* face counts as a layer, versus each sticker deciding
    // individually via its own varying in-plane coordinate, depends on
    // whether the flourish's axis matches this face's own — see
    // layerMatches in solveFlourish.ts.
    const flourishState = flourish.current;
    if (!flourishState.active) return;

    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    const layerQuat = new THREE.Quaternion().setFromAxisAngle(
      AXIS_VECTORS[flourishState.axis],
      flourishState.angle
    );

    finalTransforms.forEach(({ position, quaternion }, i) => {
      const matches = layerMatches(
        face.axis,
        face.sign,
        position.x,
        position.y,
        position.z,
        flourishState.axis,
        flourishState.layerValue
      );

      if (matches) {
        pos.copy(position).applyQuaternion(layerQuat);
        const combinedQuat = layerQuat.clone().multiply(quaternion);
        matrix.compose(pos, combinedQuat, scale);
      } else {
        matrix.compose(position, quaternion, scale);
      }
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, 9]} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.18}
        roughness={0.28}
        metalness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.18}
      />
    </instancedMesh>
  );
}

interface RubiksCubeProps {
  selectedFeature: Feature | null;
  onSelectFeature: (feature: Feature) => void;
  onHoverChange?: (hovering: boolean) => void;
  /**
   * The ancestor `<group scale={cubeScale}>` this cube is rendered inside
   * (see Hero.tsx). Drei's Html "sprite" mode positions its DOM overlay
   * using the tile's full world matrix, but sizes it using only the Html
   * group's own local scale — ancestor scale is silently ignored. Threading
   * the real value down and applying it explicitly to each tile's Html
   * keeps feature badges sized correctly at every responsive cube size.
   */
  cubeScale?: number;
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

export function RubiksCube({
  selectedFeature,
  onSelectFeature,
  onHoverChange,
  cubeScale = 1,
}: RubiksCubeProps) {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const { groupRef, wasDraggingRef, focusToFront, releaseFocus } = useCubeRotation();
  const occluderRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();
  const flourish = useRef<FlourishState>(createFlourishState());

  useEffect(() => {
    onHoverChange?.(hoveredTile !== null);
  }, [hoveredTile, onHoverChange]);

  useEffect(() => {
    if (!selectedFeature) releaseFocus();
  }, [selectedFeature, releaseFocus]);

  // Plays once, right after the intro spin (useCubeRotation) settles.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      runSolveFlourish(flourish.current, reducedMotion);
    }, SOLVE_FLOURISH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

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
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-4, -1.5, 4]} intensity={0.7} color="#a855f7" />
      <pointLight position={[4, -2.5, -3]} intensity={0.5} color="#22d3ee" />
      {/* Two soft fill lights stand in for drei's <Environment> preset, which
          fetches an HDRI over the network — on a slow/blocked connection that
          left the whole cube (wrapped in one Suspense boundary) blank until
          the fetch resolved. This keeps the clearcoat sheen without the
          network dependency. */}
      <hemisphereLight color="#dfe8ff" groundColor="#0a0a12" intensity={0.5} />
      <directionalLight position={[-3, 4, -6]} intensity={0.5} />

      <group ref={groupRef}>
        <group ref={occluderRef}>
          <CubieBodies flourish={flourish} />
          {DECORATIVE_FACES.map((face) => (
            <DecorativeFace
              key={`face-${face.axis}${face.sign}`}
              face={face}
              color={FACE_BASE_COLORS[`${face.axis}${face.sign}`]}
              flourish={flourish}
            />
          ))}
        </group>

        <CubeFace
          face={FRONT_FACE}
          baseColor="#12141f"
          interactive
          wasDraggingRef={wasDraggingRef}
          occluderRef={occluderRef as React.RefObject<THREE.Object3D>}
          cubeScale={cubeScale}
          flourish={flourish}
          onSelectFeature={handleSelect}
          onHoverChange={setHoveredTile}
        />
      </group>

      <ContactShadows
        position={[0, -2.3, 0]}
        opacity={0.55}
        scale={11}
        blur={2.6}
        far={4.5}
        color="#000000"
        frames={1}
        resolution={256}
      />
    </>
  );
}
