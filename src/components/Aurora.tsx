interface AuroraProps {
  /** Swaps the neon "screen" blend (built for the dark sky background) for
   *  a softer blend that reads as a gentle blue sweep against the light
   *  theme's cream/steel-blue gradient instead of blowing out to white. */
  isLight?: boolean;
}

/** A CSS-only "aurora borealis" backdrop behind the homepage hero — tall,
 *  narrow, softly-striated "curtains" of light that sway and flicker
 *  independently over a broad glow, the way a real aurora hangs and
 *  ripples in the sky, rather than flat drifting ribbons. Kept to
 *  blue/cyan tones only on dark theme (no green) to stay on-brand.
 *  Respects reduced-motion via the global media query in globals.css,
 *  which freezes all animations. */
export function Aurora({ isLight = false }: AuroraProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden aurora-scene ${isLight ? "aurora-light" : ""}`}
      aria-hidden="true"
    >
      <div className="aurora-veil" />
      <div className="aurora-curtain aurora-curtain-1" />
      <div className="aurora-curtain aurora-curtain-2" />
      <div className="aurora-curtain aurora-curtain-3" />
      <div className="aurora-curtain aurora-curtain-4" />
      <div className="aurora-curtain aurora-curtain-5" />
    </div>
  );
}
