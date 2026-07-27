"use client";

import * as THREE from "three";
import { CubeTile } from "./CubeTile";
import type { Feature } from "@/data/features";
import { getFeatureByGridIndex } from "@/data/features";
import { STICKER_OFFSET, gridIndexToColRow, type FaceDefinition } from "@/lib/cubeLayout";

interface CubeFaceProps {
  face: FaceDefinition;
  /** Solid sticker color for non-interactive faces. */
  baseColor: string;
  /** Only the front face is interactive and carries feature tiles. */
  interactive?: boolean;
  wasDraggingRef?: React.RefObject<boolean>;
  onSelectFeature?: (feature: Feature) => void;
  onHoverChange?: (id: string | null) => void;
}

/** Renders the 3x3 sticker grid for a single face of the cube. */
export function CubeFace({
  face,
  baseColor,
  interactive,
  wasDraggingRef,
  onSelectFeature,
  onHoverChange,
}: CubeFaceProps) {
  const euler = new THREE.Euler(...face.rotation);

  return (
    <>
      {Array.from({ length: 9 }, (_, gridIndex) => {
        const [u, v] = gridIndexToColRow(gridIndex);
        const local = new THREE.Vector3(u, v, STICKER_OFFSET).applyEuler(euler);
        const feature = interactive ? getFeatureByGridIndex(gridIndex) : undefined;

        return (
          <CubeTile
            key={`${face.axis}${face.sign}-${gridIndex}`}
            position={[local.x, local.y, local.z]}
            rotation={face.rotation}
            color={feature?.color ?? baseColor}
            feature={feature}
            wasDraggingRef={wasDraggingRef}
            onSelect={onSelectFeature}
            onHoverChange={onHoverChange}
          />
        );
      })}
    </>
  );
}
