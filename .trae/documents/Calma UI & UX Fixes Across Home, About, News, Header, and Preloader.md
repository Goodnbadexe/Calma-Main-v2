## Overview
- Align key sections to your layout and mobile expectations, fix broken images, tighten spacing, and ensure the preloader shows before navigation.
- Keep architecture intact; apply targeted React/CSS changes with brand-consistent styling.

## Numbers Grid (KPI)
- Make stat numbers horizontal and the grid 4-across on desktop.
- Update `KPIStats` to use a fixed 4-column grid and row-aligned stat items:
  - `src/components/home/KPIStats.tsx:9` switch `ResponsiveGrid` to `className="kpi-grid cols-4"` and set `min` small enough to hold 4 columns.
  - Add CSS for `.stat-item { display:flex; align-items:center; gap:12px }` and for `.stat-number` sizing.
- Keep mobile readable: 2x2 below 640px via `fluid-grid.css` (`src/styles/fluid-grid.css:60`).

## Project Preview (Discover More)
- Ensure a 3 x 1 strip grid with proper images loaded (no `/src/...` paths).
- `ProjectPreviewGrid` already imports images; fix navigation to avoid full page reload and trigger splash:
  - Update `ProjectCard` to use router `Link` and `showSplash()` on click (`src/components/home/ProjectCard.tsx:22`).

## Featured Carousel Autoplay
- Add a 4.5s auto-advance, pausing on hover/focus with clean teardown.
- Implement interval in `FeaturedProjectsCarousel` (`src/components/home/FeaturedProjectsCarousel.tsx`):
  - Create `useEffect` that runs `emblaApi?.scrollNext()` every 4500ms; clear on unmount; pause when the embla root has `:focus-within` or `pointerenter`.
- Preserve a11y: keep `aria-live="polite"` and keyboard arrows (`lines 114–121`).

## Header Simplification & Mobile Burger
- Reduce header height on small screens and ensure burger-only navigation under a breakpoint.
- CSS updates in `src/styles/navbar.css`:
  - Set `--nav-height` to 56px for `@media (max-width:640px)`; hide `.nav-links` and leave `.burger-button` visible (`~lines 659–705`).
  - Tighten paddings on `.section-inner` and `.nav-actions` for compact mobile.
- Keep transparent/solid states; logic already in `NavBar` (`src/components/ui/NavBar.tsx:81–84`).

## Preloader First, Then Navigate
- Ensure splash overlays before route change across all navigations.
- Changes:
  - Wrap anchor navigations with router `Link` and call `showSplash()` prior (e.g., `ProjectCard` at `src/components/home/ProjectCard.tsx:22`).
  - In `NavBar`, guarantee splash paints before `navigate()` using `requestAnimationFrame` or microtask; optionally await a tick before calling `navigate` in `handleDropdownNavigation` (`src/components/ui/NavBar.tsx:158–164`).
  - Confirm destination pages call `signalReady()` after hero/media is loaded (already done in Home per `src/pages/english/Home/Home.tsx:218–221`). Extend to others where missing.

## Fix Broken Images
- Replace raw `/src/assets/...` usages with module imports or `resolveAssetUrl()`:
  - Audit and update: `arabic/المشاريع/*.tsx`, `english/Projects/*.tsx`, and older About/sections where direct `/src/...` appear (see occurrences via `assetResolver`).
  - Example: `resolveAssetUrl('/src/assets/Images/About/Asset-4.JPG')` is already used; replicate this pattern where needed (`src/utils/assetResolver.ts:11–17`).

## News Page Improvements
- Replace the gradient-only hero with a proper image background:
  - `src/pages/english/News/News.tsx:116–129` set `backgroundImage` using `resolveAssetUrl('/src/assets/Images/About/About-Header.jpg')` and keep a subtle overlay.
- Harmonize card colors to brand neutrals in `News.css`; confirm image sources use valid URLs (company placeholders will remain until real assets are provided) (`src/data/news.en.ts:18,27,36`).
- Keep LinkedIn posts; ensure images fallback gracefully (already handled).

## Text Sections & Spacing
- Convert "square" feeling sections to full-width text blocks where requested:
  - CEO section grid: keep two columns on desktop, ensure ample padding/margins (`src/pages/english/About/AboutImproved.tsx:370–412`).
  - Leadership and Brand Values: ensure consistent grid spacing with `.container` and `fluid-grid.css` tokens (`src/styles/fluid-grid.css:13–21,39–45`).
- Remove extra whitespace and add consistent paddings via section classes.

## Contact Page Unjamming
- Tighten the hero height, increase grid spacing, and ensure mobile paddings:
  - `src/pages/english/Contact/Contact.tsx:22–41` hero; ensure background uses `resolveAssetUrl` correctly (`line 25`) and reduce overlay weight.
  - Verify form inputs spacing and accessibility; keep 1–2 columns responsive (`lines 95–124`).

## Register Interest Consistency
- Unify the Register page’s button and card visual language across the site (`src/pages/english/Register/Register.tsx:341–347`).
- Style `register-button` in header to match the site’s primary button.

## Consistent Mobile Design
- Use math-based clamp values for font sizes and gaps to avoid breakage across devices (already used in `fluid-grid.css`).
- Confirm grids collapse to 1–2 columns under 640px while maintaining visual rhythm.

## Verification Plan
- Run the dev server and visually verify:
  - KPI grid shows 4-across on desktop, labels beside numbers.
  - Carousel auto-advances every 4.5s and pauses on interaction.
  - Header compacts on mobile; burger works; splash appears before navigation everywhere.
  - News hero shows an image; no broken images in About/Projects.
  - Contact layout feels airy on mobile and desktop.
- Use accessible roles/labels; check Lighthouse for contrast and tap targets.

## Code References
- KPI stats: `src/components/home/KPIStats.tsx:9–26`
- Grid system: `src/styles/fluid-grid.css:39–55`
- Carousel: `src/components/home/FeaturedProjectsCarousel.tsx:41–160`
- Project card anchor: `src/components/home/ProjectCard.tsx:22–63`
- Header logic: `src/components/ui/NavBar.tsx:81–84, 299–317, 318–329`
- Preloader: `src/components/system/SplashProvider.tsx:46–78, 136–174`
- News page: `src/pages/english/News/News.tsx:116–129, 217–245`
- Contact: `src/pages/english/Contact/Contact.tsx:22–41, 95–124`
- About sections (images & grids): `src/pages/english/About/AboutImproved.tsx:335–501`