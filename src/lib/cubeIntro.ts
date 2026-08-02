import { ASSEMBLE_DURATION, ASSEMBLE_MAX_DELAY } from "./assemble";
import { FLOURISH_TOTAL_DURATION_MS } from "./solveFlourish";

/** Shared timing for the cube's on-mount choreography, so the pieces that
 *  drive each phase (useCubeRotation's spin, RubiksCube's solve flourish)
 *  agree on when the previous phase has actually finished, without either
 *  one owning the other's internals. */

/** Fires just after the last cubie has finished flying into place. */
export const INTRO_SPIN_DELAY_MS = (ASSEMBLE_DURATION + ASSEMBLE_MAX_DELAY) * 1000 + 150;

/** Matches the gsap tween duration for the one-time intro spin. */
export const INTRO_SPIN_DURATION_MS = 1700;

/** Fires once the intro spin has settled back to rest. */
export const SOLVE_FLOURISH_DELAY_MS = INTRO_SPIN_DELAY_MS + INTRO_SPIN_DURATION_MS + 250;

/** Fires once the solve flourish (layer turns) has finished — each front
 *  tile's own little settling flip (CubeTile) waits for this so it never
 *  overlaps the layer-turn flourish still playing on the same tiles. */
export const TILE_FLIP_DELAY_MS = SOLVE_FLOURISH_DELAY_MS + FLOURISH_TOTAL_DURATION_MS + 200;
