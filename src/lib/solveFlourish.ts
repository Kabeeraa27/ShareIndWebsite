import gsap from "gsap";
import { STEP, type Axis } from "./cubeLayout";

/** Tolerance for comparing a cubie/sticker's fixed axis coordinate against
 *  the flourish's target layer value. */
export const LAYER_EPSILON = 0.01;

/** Mutable, per-frame-read state for the post-spin "solving" flourish —
 *  plain object (not React state) so CubieBodies/DecorativeFace can read it
 *  every frame in useFrame without triggering re-renders, matching the
 *  ref-driven pattern the rest of the cube's animation already uses. */
export interface FlourishState {
  active: boolean;
  /** World Z coordinate of the layer currently turning (`STEP` = front, `0` = middle). */
  layerValue: number;
  /** Which axis the layer is currently spinning around. */
  axis: Axis;
  /** Current extra rotation, in radians, around `axis`. */
  angle: number;
}

export function createFlourishState(): FlourishState {
  return { active: false, layerValue: 0, axis: "z", angle: 0 };
}

const FULL_TURN = Math.PI * 2;
const TURN_DURATION = 1;
const PAUSE = 0.35; // a beat between moves, like a hand repositioning

/** Total wall-clock length of the scripted sequence below, so callers
 *  (CubeTile's own post-flourish tile flip) know when it's safe to layer
 *  another animation on top without the two overlapping. 4 segments, each
 *  2 full turns with one pause between them, plus a pause before each
 *  segment but the first. */
const SEGMENT_DURATION = TURN_DURATION * 2 + PAUSE;
const SEGMENT_COUNT = 4;
export const FLOURISH_TOTAL_DURATION_MS =
  (SEGMENT_DURATION * SEGMENT_COUNT + PAUSE * (SEGMENT_COUNT - 1)) * 1000;

/**
 * Scripted, one-time "solving" flourish played after the intro spin
 * settles: the front layer spins around X, then around Y, then the middle
 * layer does the same — like someone slowly tumbling the puzzle over in
 * their hands. No back-layer move; it added length without adding much.
 *
 * Every segment is a *full* rotation (a multiple of 2π), never a quarter
 * turn — the front layer's 9 tiles are real, distinct feature buttons (see
 * CubeFace/CubeTile), not a uniform color like the decorative faces. A
 * partial turn would visibly move those buttons (each keeps working —
 * clicking still opens the right feature wherever it lands — but the grid
 * would look permanently shuffled if left there), so every segment always
 * lands back on a full turn before the axis or layer changes. The middle
 * layer doesn't strictly need this (it's uniform-colored, symmetric), but
 * using the same full-turn shape for both keeps the two segments reading
 * as the same kind of move.
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

  const spin = (axis: Axis, layerValue: number, gapBefore: number) => {
    tl.set(state, { axis, layerValue, angle: 0 }, `+=${gapBefore}`);
    tl.to(state, { angle: FULL_TURN, duration: TURN_DURATION, ease: "power1.inOut" });
    tl.set(state, { angle: 0 });
    tl.to(state, { angle: FULL_TURN, duration: TURN_DURATION, ease: "power1.inOut" }, `+=${PAUSE}`);
    tl.set(state, { angle: 0 });
  };

  spin("x", STEP, 0); // front layer, tumbling forward
  spin("y", STEP, PAUSE); // front layer, spinning like a revolving door
  spin("x", 0, PAUSE); // middle layer, same two moves
  spin("y", 0, PAUSE);

  return tl;
}
