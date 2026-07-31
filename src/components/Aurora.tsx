interface AuroraProps {
  /** Swaps the neon "screen" blend (built for the dark sky background) for
   *  a softer blend that reads as a gentle blue sweep against the light
   *  theme's cream/steel-blue gradient instead of blowing out to white. */
  isLight?: boolean;
}

/** Drifting blue/cyan light ribbons behind the homepage hero — a CSS-only
 *  "aurora borealis" backdrop layered under the cube. Kept to blue/cyan
 *  tones only (no green) to stay on-brand. Respects reduced-motion via the
 *  global media query in globals.css, which freezes all animations. */
export function Aurora({ isLight = false }: AuroraProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${isLight ? "aurora-light" : ""}`}
      aria-hidden="true"
    >
      <div className="aurora-band aurora-band-1" />
      <div className="aurora-band aurora-band-2" />
      <div className="aurora-band aurora-band-3" />
    </div>
  );
}
