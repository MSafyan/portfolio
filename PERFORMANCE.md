# Performance Optimisation

## Results

| Metric | Before | After |
|--------|--------|-------|
| Lighthouse Performance | 0 | **85** |
| First Contentful Paint | 27.0s | 2.1s |
| Largest Contentful Paint | 61.0s | 4.1s |
| Total Blocking Time | 120ms | 0ms |
| Cumulative Layout Shift | — | 0 |
| Initial JS payload | ~8 MB | 233 KB |

---

## Changes

### 1. Removed Three.js entirely
`three`, `@react-three/fiber`, `@react-three/drei`, `maath` removed from `package.json`.
These libraries were loading ~8 MB of JS (77% unused) before anything rendered.

**Replacements:**
- `SpacemanCanvas` (Hero) → removed; parallax background is sufficient
- `StarsCanvas` → vanilla Canvas API (~50 lines, zero deps)
- `EarthCanvas` (Contact) → CSS animated globe (`Earth.css`)
- `BallCanvas` / Tech section → flat icon grid with CSS hover effects

### 2. Code-split all below-fold sections
`About`, `Experience`, `Certifications`, `Works`, `Tech`, `Feedbacks`, `Contact` are now `React.lazy()` imports in `App.jsx`, each bundled as a separate 1–11 KB chunk.

### 3. Vite manual chunk splitting
`vite.config.js` — `manualChunks` splits `framer-motion` into a dedicated async chunk so it never blocks initial paint.

### 4. Hero background preload
`herobg.webp` moved from `src/assets/` to `public/` so it has a stable URL.
`<link rel="preload">` added in `index.html` for both `herobg.webp` and `1Stars.svg` (LCP element).

### 5. Removed framer-motion from Hero
The single `motion.div` bounce animation was replaced with a CSS `@keyframes` animation (`scroll-bounce` in `index.css`), removing framer-motion from the eager load path.

### 6. SEO & accessibility fixes
- Added `<meta name="description">` to `index.html`
- Added `aria-label="Scroll to projects"` to the Hero scroll link
- Added explicit `width`/`height` to all 6 parallax `<img>` tags (prevents CLS)
- Removed `background-position` CSS animation from Earth globe (non-GPU-composited)

---

## Files Changed

| File | Change |
|------|--------|
| `package.json` | Removed `three`, `@react-three/fiber`, `@react-three/drei`, `maath` |
| `vite.config.js` | Added `manualChunks` for framer-motion |
| `index.html` | Added preload links, meta description |
| `src/App.jsx` | Lazy-loaded all below-fold sections |
| `src/components/Hero.jsx` | Removed SpacemanCanvas, replaced motion.div with CSS |
| `src/components/Tech.jsx` | Replaced 3D ball canvases with flat icon grid |
| `src/components/Loader.jsx` | Removed drei dependency |
| `src/components/canvas/Stars.jsx` | Vanilla Canvas API |
| `src/components/canvas/Earth.jsx` | CSS animated globe |
| `src/components/canvas/Earth.css` | New — globe styles |
| `src/components/canvas/Ball.jsx` | Stubbed out (no-op) |
| `src/components/canvas/index.js` | Cleaned up exports |
| `src/components/index.js` | Removed static imports of lazy sections |
| `src/index.css` | Added `scroll-bounce` keyframe animation |
| `tailwind.config.cjs` | Updated hero-pattern URL to `/herobg.webp` |
| `public/herobg.webp` | Moved from `src/assets/` |
