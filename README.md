# Share India Institutional Desk

The marketing site for Share India's Institutional Business — a 3D Rubik's Cube hero built with React Three Fiber sits at the center of the homepage, its faces acting as navigation into the desk's research, sales, dealing, corporate access, and operations offerings.

Live at [share-ind-website.vercel.app](https://share-ind-website.vercel.app).

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** for layout/utility styling
- **React Three Fiber** / **drei** / **three.js** for the 3D cube hero
- **GSAP** for the cube's imperative rotation/solve-flourish animations
- **Framer Motion** for DOM-level page and panel animation
- **Playwright** (dev dependency) for local visual verification scripts — not a CI test suite

> [!IMPORTANT]
> This project pins a Next.js version ahead of the assistant's training data. Before making framework-level changes, check `node_modules/next/dist/docs/` for current API/convention differences rather than assuming prior Next.js knowledge holds.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npx tsc --noEmit  # typecheck
```

## Project structure

```
src/
  app/                 Route pages (App Router) — about, contact, differentiators,
                        offerings, reports, sectors, team, leadership, features/[id]
  components/
    cube/               The 3D Rubik's Cube hero: cubie/sticker instancing,
                        rotation + solve-flourish, on-mount fly-in assembly
    institutional/       Sections shared across the institutional pages
                        (sectors, services, disclosures, page hero)
    reports/            The "Reports" desk-notes browser (sector folders,
                        category tabs, file listings)
    team/               Team/leadership grid and hero
    sections/           Homepage sections composed around the cube
    Navbar.tsx, Footer.tsx, ThemeProvider.tsx, Background.tsx, ...
  data/                 Content as typed data: team members, leadership,
                        sectors, services, report seeds, desk notes, features
  lib/                  Shared animation timing/easing helpers (assemble.ts)
  hooks/                Shared React hooks
```

## Theming

Everything from the hero section down (institutional content pages) responds to a light/dark toggle scoped via `[data-theme="light" | "dark"]` and `--inst-*` CSS custom properties in `src/app/globals.css`. The Navbar, Footer, and the cube's own chrome are intentionally **not** part of this toggle — they stay fixed regardless of the theme. Default theme is light (`ThemeProvider.tsx`).

## The cube

- `src/components/cube/RubiksCube.tsx` renders body cubies and stickers via `InstancedMesh` (one draw call per mesh group) and composes each instance's transform every frame.
- `src/lib/assemble.ts` drives the on-mount "fly in and assemble" intro that every piece type reads independently against a shared timing/easing model.
- Per-frame `THREE.Matrix4`/`Vector3`/`Quaternion`/`Euler` instances are hoisted and reused across the whole animation loop rather than allocated inside `useFrame`, to avoid GC-driven jank.
- After assembly, GSAP drives the idle rotation and periodic solve-flourish (real F/S/L/R/U/D layer turns).

## Deployment

Pushes to `main` auto-deploy to Vercel. There is no separate staging branch — verify locally (`npm run build`, `npx tsc --noEmit`, and a manual check in the browser) before pushing.
