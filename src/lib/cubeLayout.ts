import * as THREE from "three";

/** Shared geometry constants so cubies, stickers, and faces stay perfectly aligned. */
export const CUBIE_SIZE = 1;
export const GAP = 0.08;
export const STEP = CUBIE_SIZE + GAP;
export const STICKER_SIZE = CUBIE_SIZE * 0.92;
export const STICKER_OFFSET = STEP + CUBIE_SIZE / 2 + 0.02;

/** -1, 0, 1 axis positions for the 3x3x3 grid. */
export const AXIS_POSITIONS = [-STEP, 0, STEP];

export type Axis = "x" | "y" | "z";

export interface FaceDefinition {
  axis: Axis;
  sign: 1 | -1;
  /** World-space outward normal for this face. */
  normal: THREE.Vector3;
  /** Euler rotation that orients a plane (default normal +Z) to this face's normal. */
  rotation: [number, number, number];
}

export const FACE_DEFINITIONS: FaceDefinition[] = [
  { axis: "z", sign: 1, normal: new THREE.Vector3(0, 0, 1), rotation: [0, 0, 0] },
  { axis: "z", sign: -1, normal: new THREE.Vector3(0, 0, -1), rotation: [0, Math.PI, 0] },
  { axis: "x", sign: 1, normal: new THREE.Vector3(1, 0, 0), rotation: [0, Math.PI / 2, 0] },
  { axis: "x", sign: -1, normal: new THREE.Vector3(-1, 0, 0), rotation: [0, -Math.PI / 2, 0] },
  { axis: "y", sign: 1, normal: new THREE.Vector3(0, 1, 0), rotation: [-Math.PI / 2, 0, 0] },
  { axis: "y", sign: -1, normal: new THREE.Vector3(0, -1, 0), rotation: [Math.PI / 2, 0, 0] },
];

/**
 * Maps a 0-8 grid index (row-major, top-left to bottom-right) to local
 * [col, row] tile coordinates in [-1, 0, 1], with row +1 = top.
 */
export function gridIndexToColRow(index: number): [number, number] {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return [AXIS_POSITIONS[col], AXIS_POSITIONS[2 - row]];
}

export function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}
