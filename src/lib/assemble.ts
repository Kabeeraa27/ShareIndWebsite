/** Shared timing for the cube's on-mount "fly in and assemble" intro —
 *  every animated piece (body cubies, decorative stickers, front tiles)
 *  reads this independently against its own local start time, so nothing
 *  needs to be passed down as a prop and everything still starts in sync
 *  (they all take their first frame within the same React commit).
 */
export const ASSEMBLE_DURATION = 1.3;
export const ASSEMBLE_MAX_DELAY = 0.8;

/** Cubic "back out" ease — pieces overshoot slightly past their resting
 *  spot and settle back, reading as a physical snap into place rather
 *  than a linear glide. */
export function easeOutBack(t: number): number {
  const c1 = 1.3;
  const c3 = c1 + 1;
  const x = Math.max(0, Math.min(1, t));
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

/** 0 -> 1 eased progress for a piece that starts `delay` seconds after
 *  `startTime` and animates over `duration` seconds. */
export function assembleT(
  elapsed: number,
  startTime: number,
  delay: number,
  duration: number = ASSEMBLE_DURATION
): number {
  const raw = (elapsed - startTime - delay) / duration;
  return easeOutBack(Math.max(0, Math.min(1, raw)));
}

/** Whether every piece with delays up to ASSEMBLE_MAX_DELAY has finished. */
export function assembleFullyDone(elapsed: number, startTime: number): boolean {
  return elapsed - startTime > ASSEMBLE_DURATION + ASSEMBLE_MAX_DELAY;
}

/** A random starting offset for a piece to fly in from. Biased toward the
 *  XY plane (lateral motion reads as "flying across the screen") with a
 *  smaller Z kick for depth variety — pure spherical sampling put pieces
 *  far enough along Z that they spent most of the flight outside the
 *  camera frustum, invisible until they were nearly home. */
export function randomFlightOffset(minDistance: number, maxDistance: number) {
  const angle = Math.random() * Math.PI * 2;
  const distance = minDistance + Math.random() * (maxDistance - minDistance);
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    z: (Math.random() - 0.5) * distance * 0.7,
  };
}

export function randomDelay(max: number = ASSEMBLE_MAX_DELAY): number {
  return Math.random() * max;
}
