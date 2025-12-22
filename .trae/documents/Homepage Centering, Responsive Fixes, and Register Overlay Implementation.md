## Goals
- Center misaligned sections and fix spacing issues on the homepage (hero, dual-split, CEO, stats, leadership, brand values).
- Ensure responsive layout that stays centered and does not stack awkwardly on small screens.
- Auto-rotate the 3-image grid every 5 seconds using existing assets.
- Remove the oversized stats section from the homepage as requested.
- Replace the separate Register page with an in-page animated overlay triggered by the “Register Your Interest” button, including scroll lock, animated background, and accessible form.

## Homepage: Layout and Centering
- Hero
  - Center `.hero-content` using a max-width container and `mx-auto` with `text-center`.
  - Ensure `.hero-overlay` uses `position: absolute` + `inset: 0` to avoid offsets.
- Dual Split (image + text)
  - Center grid wrapper (`.dual-split-grid`) via `max-width` + `mx-auto`.
  - Flip the right-side image (`.dual-split-image .dual-image`) using `transform: scaleX(-1)` and match styles to left image.
  - Add `gap` and `align-items: center` to fix uneven spacing; use `grid` → `1fr 1fr` on desktop, `1fr` on mobile.
- CEO Message Section
  - Center `.container.ceo-content` with `margin: 0 auto`, `max-width`, and `padding-inline`.
  - Use CSS grid `place-items: center` to keep portrait/text aligned; fix left whitespace by adjusting `grid-template-columns`.
- Leadership Grid & Brand Values
  - Add a consistent `container` with `mx-auto` and `px` padding.
  - Ensure cards have equal width and spacing; use `grid` with `auto-fit, minmax(...)`; center text.
  - Prevent images from overflowing using `object-fit: cover; aspect-ratio`.
- Stats Strip (luxury-stats-showcase)
  - Remove this section from the homepage by deleting its component import/usage (likely `KPIStats`) to follow requested structure.
  - Preserve styles for other contexts if used elsewhere.

## Homepage: 3-Image Auto-Rotate
- Implement a 5-second rotation for the 3-image grid using `useEffect + setInterval` and local asset arrays.
- Use `IntersectionObserver` to pause when off-screen for perf.
- Apply fade/scale transitions with Framer Motion or CSS transitions.

## Responsive Rules
- Breakpoints
  - Desktop ≥1024px: 2-column layouts centered, max-width containers (e.g., 1200–1400px), symmetric gaps.
  - Tablet 641–1024px: reduce gaps, stack where necessary with `grid-template-columns: 1fr`, center contents.
  - Mobile ≤640px: unified vertical flow, reduced font sizes, ensure images use `aspect-ratio` and `object-fit`.
- Alignment
  - Use `text-center` and container wrappers (`mx-auto`, `px-4 md:px-6`) consistently.

## Register Overlay (Replace Register Page)
- Component: `RegisterOverlay` with `isExpanded` state.
- Scroll lock using `useEffect` on `isExpanded` (set body `overflow: hidden|unset`).
- Trigger
  - NavBar “Register Your Interest” button toggles overlay instead of routing.
  - Remove `/register` route and imports.
- Animation & Background
  - Use Framer Motion `AnimatePresence` for enter/exit.
  - If `GodRays` / `MeshGradient` are not available, implement a CSS-based animated gradient background (fallback) with similar visual effect.
- Accessibility & UX
  - Focus trap inside overlay, `Escape` closes.
  - Close button with `aria-label` and keyboard support.
  - Form uses existing fields (`firstName`, `email`, etc.) and calls `submitLead` on submit.
  - Honeypot and inline validation retained; optimistic status via `aria-live`.

## Implementation Approach
- Update homepage components (`src/pages/english/Home/Home.tsx`) to center content, flip image, auto-rotate images, and remove the stats section component.
- Adjust About page section (`AboutImproved`) to center CEO and leadership sections.
- Introduce `RegisterOverlay` component and wire it to NavBar; remove `/register` route entries and page import.
- Keep changes consistent with existing Tailwind/CSS utility classes.

## Verification
- Run dev server and visually validate hero, dual-split, CEO, leadership, brand-values.
- Confirm 5-second image rotation and smooth transitions.
- Confirm overlay opens/closes, locks scroll, traps focus, submits form, and displays feedback.
- Playwright basic checks: hero visible, skip link focusable, overlay triggers and is visible.
- Lighthouse budget still passes.

## Deliverables
- Updated homepage and about layouts with centered, responsive structure.
- Removed stats section from homepage.
- Working register overlay with animations and accessible UX.
- Minimal CSS additions and component updates; no external animation libs beyond Framer Motion.

Please confirm, and I’ll implement these changes end-to-end, verify in the running preview, and share specific file references for each edit.