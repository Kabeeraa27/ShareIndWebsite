import gsap from "gsap";
import { STEP } from "./cubeLayout";

/** Tolerance for comparing a cubie/sticker's fixed axis coordinate against
 *  the flourish's target layer value. */
export const LAYER_EPSILON = 0.01;

/** Mutable, per-frame-read state for the post-spin "solving" flourish —
 *  plain object (not React state) so CubieBodies/DecorativeFace can read it
 *  every frame in useFrame without triggering re-renders, matching the
 *  ref-driven pattern the rest of the cube's animation already uses. */
export interface FlourishState {
  active: boolean;
  /** World Z coordinate of the layer currently turning (`STEP`, `0`, or `-STEP`). */
  layerValue: number;
  /** Current extra rotation, in radians, around the global Z axis. */
  angle: number;
}

export function createFlourishState(): FlourishState {
  return { active: false, layerValue: 0, angle: 0 };
}

/**
 * Scripted, one-time "solving" flourish: a few quick Z-axis layer turns
 * played after the intro spin settles.
 *
 * Every turn is around the Z axis (the axis pointing straight at the
 * camera) so the front layer's turn — the one the user actually watches —
 * reads as the face spinning like a dial, not an edge-on twist. Turning
 * around X or Y instead would sweep the front layer out of view entirely
 * for part of the move.
 *
 * The back and middle layers are uniform-colored (every decorative face is
 * a single flat color) and the body cubies are rotationally symmetric, so
 * those two are free to stop at any 90°-multiple — resetting straight back
 * to `angle: 0` between moves is visually seamless, no permutation to
 * track. The FRONT layer is different: its 9 tiles are real, distinct
 * feature buttons (see CubeFace/CubeTile), so a front turn must complete a
 * *full* rotation (a multiple of 2π) before resetting, or the tiles would
 * end up sitting in the wrong grid slot relative to their click handler.
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

  const turn = (layerValue: number, angle: number, duration: number) => {
    tl.set(state, { layerValue, angle: 0 })
      .to(state, { angle, duration, ease: "power2.inOut" })
      .set(state, { angle: 0 }, "+=0.08");
  };

  // Front face first and most prominent — it's the layer facing the
  // camera, so it's the one the flourish needs to actually be seen on.
  turn(STEP, Math.PI * 2, 0.9);
  turn(0, -Math.PI / 2, 0.4);
  turn(-STEP, Math.PI, 0.5);

  return tl;
}
