import gsap from "gsap";
import { STEP, type Axis } from "./cubeLayout";

/** Tolerance for comparing a cubie/sticker's fixed axis coordinate against
 *  the flourish's target layer value. */
export const LAYER_EPSILON = 0.01;

/** Mutable, per-frame-read state for the post-spin "solving" flourish —
 *  plain object (not React state) so CubieBodies/DecorativeFace/CubeTile
 *  can read it every frame in useFrame without triggering re-renders,
 *  matching the ref-driven pattern the rest of the cube's animation
 *  already uses. */
export interface FlourishState {
  active: boolean;
  /** World coordinate, along `axis`, of the layer currently turning. */
  layerValue: number;
  /** Which axis the layer is currently turning around — always the same
   *  axis the layer is selected by, matching a real cube move (a layer can
   *  only physically turn about the axis perpendicular to its own face). */
  axis: Axis;
  /** Current rotation, in radians, around `axis`. */
  angle: number;
}

export function createFlourishState(): FlourishState {
  return { active: false, layerValue: 0, axis: "z", angle: 0 };
}

/**
 * Whether a sticker/tile belongs to the layer currently turning.
 *
 * A face's own 9 stickers/tiles all sit at the same fixed depth along its
 * own axis (e.g. every "right" face sticker has x ≈ the face's outward
 * offset, not `STEP` — see DecorativeFace/CubeTile) — so when the flourish
 * is turning about *that same* axis, the whole face moves as one layer.
 * When it's turning about a *different* axis, the face's own varying
 * in-plane coordinate (which does range over -STEP/0/STEP) decides
 * per-sticker, same as the body cubies.
 */
export function layerMatches(
  faceAxis: Axis,
  faceSign: 1 | -1,
  x: number,
  y: number,
  z: number,
  flourishAxis: Axis,
  layerValue: number
): boolean {
  if (faceAxis === flourishAxis) {
    return Math.abs(faceSign * STEP - layerValue) < LAYER_EPSILON;
  }
  const coord = flourishAxis === "x" ? x : flourishAxis === "y" ? y : z;
  return Math.abs(coord - layerValue) < LAYER_EPSILON;
}

const FULL_TURN = Math.PI * 2;
const TURN_DURATION = 1;
const PAUSE = 0.35; // a beat between moves, like a hand repositioning

/** Total wall-clock length of the scripted sequence below, so callers
 *  (CubeTile's own post-flourish tile flip) know when it's safe to layer
 *  another animation on top without the two overlapping. 6 moves, one
 *  full turn each, 5 pauses between them. */
const MOVE_COUNT = 6;
export const FLOURISH_TOTAL_DURATION_MS = (TURN_DURATION * MOVE_COUNT + PAUSE * (MOVE_COUNT - 1)) * 1000;

/**
 * Scripted, one-time "solving" flourish played after the intro spin
 * settles — six real cube moves in sequence, in standard-notation order:
 *
 *   F (front, z=+STEP)   → S (middle slice, z=0) → L (left, x=-STEP) →
 *   R (right, x=+STEP)   → U (up, y=+STEP)        → D (down, y=-STEP)
 *
 * Each is a genuine full-depth layer turn — the 3 body cubies *and* the
 * matching decorative stickers at that depth all rotate together, exactly
 * like a real cube move — not just the front face's own tiles spinning in
 * place.
 *
 * F, L, R, U, and D each include some of the front face's 9 interactive
 * tiles (F includes all of them; L/R include a column of 3; U/D include a
 * row of 3). Those tiles are real, distinct feature buttons (see
 * CubeFace/CubeTile), not a uniform color like the decorative faces, so
 * every move is a *full* 2π turn — never a quarter turn — landing back
 * exactly on the original grid before the next move starts. S (the middle
 * slice) never touches the front face at all, but uses the same full-turn
 * shape for consistency.
 */
export function runSolveFlourish(state: FlourishState, reducedMotion: boolean): gsap.core.Timeline {
  const tl = gsap.timeline({
    onStart: () => {
      state.active = true;
    },
    onComplete: () => {
      state.layerValue = 0;
      state.angle = 0;
      state.active = false;
    },
  });

  if (reducedMotion) return tl;

  const move = (axis: Axis, layerValue: number, direction: 1 | -1, gapBefore: number) => {
    tl.set(state, { axis, layerValue, angle: 0 }, `+=${gapBefore}`);
    tl.to(state, { angle: FULL_TURN * direction, duration: TURN_DURATION, ease: "power1.inOut" });
    tl.set(state, { angle: 0 });
  };

  move("z", STEP, 1, 0); // F
  move("z", 0, -1, PAUSE); // S
  move("x", -STEP, 1, PAUSE); // L
  move("x", STEP, -1, PAUSE); // R
  move("y", STEP, -1, PAUSE); // U
  move("y", -STEP, 1, PAUSE); // D

  return tl;
}
