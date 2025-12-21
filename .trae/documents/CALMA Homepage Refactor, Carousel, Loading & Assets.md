## Overview
Refactor the CALMA React (Vite) homepage to be story-led, fix responsiveness and broken images, replace the projects slider with a draggable Embla carousel, and implement a premium video-first progressive reveal with anime.js. Maintain performance, accessibility, and bilingual parity.

## Current Context
- Home pages: `src/pages/english/Home/Home.tsx`, `src/pages/arabic/الرئيسية/الرئيسية.tsx`
- Featured projects: `src/components/home/FeaturedProjects.tsx` using `SmoothCarousel` at `src/components/carousel/SmoothCarousel.tsx`
- KPI stats and “Major Cities” appear inside Home sections and shared CSS (`src/index.css`, `src/pages/english/Home/Home.css`).
- Assets handled via direct imports and `import.meta.glob` resolver; anime.js present in deps, not used for hero.

## Dependencies
- Add `embla-carousel` and `embla-carousel-react` for the new draggable carousel.
- Keep existing `animejs` for timeline animations and respect `prefers-reduced-motion`.

## Component Architecture
Create premium, modular sections under `src/components/home/`:
- `AboutCalma.tsx`: headline + snapshot ethos cards.
- `Excellence.tsx`: “MASTERFULLY CRAFTED. UNIQUELY YOURS.” + copy + highlight stats (Delivered Projects, Families Served, Major Cities).
- `Pillars.tsx`: mission/vision/sustainability (The Calma Way) with concise narrative.
- `KPIStats.tsx`: unified responsive grid for 28, 77,097, 130,000, 700.
- `FeaturedProjectsCarousel.tsx`: Embla-based draggable carousel + controls.
- `DiscoverMore.tsx`: CTA block to explore more projects/content.
- `Testimonials.tsx`: testimonials/community.
- `UnicornEffect.tsx` (optional): lazy wrapper for Unicorn WebGL export.

## Page Restructure
- Refactor `Home.tsx` to import and render in order:
  1) `AboutCalma`
  2) `Excellence`
  3) `Pillars`
  4) `KPIStats`
  5) `FeaturedProjectsCarousel`
  6) `DiscoverMore`
  7) `Testimonials`
- Apply the same order in Arabic home for parity.

## Embla Carousel (Featured Projects)
- Replace `SmoothCarousel` with Embla:
  - Basic setup: viewport/contain, `align: 'start'`, snap points.
  - Enable drag on Mac trackpad/mouse and touch; add keyboard navigation (left/right) and focus management.
  - Add Prev/Next buttons with disabled state, `aria-label`s, and live region for slide announcements.
  - Optional autoplay with pause-on-hover; ensure accessible controls.
- Styling: refined spacing, card scales kept minimal to preserve luxury feel.

## KPI Grid & “Major Cities” Fixes
- `KPIStats`: single container grid using `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));` and consistent card style.
- Use `font-variant-numeric: tabular-nums;` for number alignment, consistent baseline.
- Create `StatCard` used by both KPI and highlights:
  - Centered flex/stack layout; number + label vertically aligned.
  - Fix the “3 Major Cities” left-offset by removing conflicting `text-align`/grid column CSS; enforce centered alignment.

## Image Handling
- Audit image usage: ensure all below-the-fold images have `loading="lazy"` and `decoding="async"`.
- Replace any placeholder `/api/placeholder/...` or `"/placeholder.svg"` in production sections with real assets (prefer imports from `src/assets` or `/public` paths with leading slash).
- Add `onError` fallback to a local placeholder (e.g., `/fallback.jpg`) and `console.warn` in dev.
- Keep existing resolver util; standardize project data to imported/resolved assets.

## Video-First Progressive Reveal
- Keep hero video in Home; reserve height via `aspect-ratio` to avoid layout shift.
- Wrap non-hero content in a container initially hidden (`opacity: 0; transform: translateY(8px)`), revealed only after `onLoadedData`/`canplay`.
- Implement anime.js timeline:
  - Step 1: fade/slide hero text.
  - Step 2: stagger reveal for each section component.
- Respect `prefers-reduced-motion`: if true, skip animations and show immediately.
- Ensure `playsInline`, `muted`, `autoplay`, and fallbacks; add poster image and error handling.

## Accessibility & Performance
- Keyboard support for carousel; focus ring and `aria-live` announcements.
- Use IntersectionObserver to lazy-load heavy media/components.
- Avoid large blocking JS; keep animations lightweight and cancelable; debounce resize observers.

## Bilingual Parity
- Share new components between English and Arabic variants where content structure aligns; allow localized strings via props or i18n module.
- Apply fixes for KPI grid and highlights in Arabic pages similarly.

## Targeted Code Changes
- Home restructure: `src/pages/english/Home/Home.tsx` and Arabic analog.
- New components in `src/components/home/` as listed.
- Replace `FeaturedProjects.tsx` to use `Embla` or create `FeaturedProjectsCarousel.tsx`; deprecate `SmoothCarousel.tsx` usage on Home.
- CSS updates:
  - `src/pages/english/Home/Home.css`: highlights alignment and grid styling.
  - `src/index.css`: add `tabular-nums`, grid utility, reduced-motion guard classes, and skeleton/reveal classes.

## Verification Plan
- Run locally and test breakpoints at `375px`, `768px`, `1024px`, `1440px`.
- Confirm:
  - Carousel dragging on trackpad/mouse/touch; keyboard arrows work.
  - “3 Major Cities” number centered.
  - KPI grid reflows cleanly; no orphaned item.
  - Images load with proper URLs; fallbacks trigger on errors.
  - Hero video ready triggers reveal; reduced-motion bypasses animation.
- Lighthouse/Performance quick check; no layout shift in hero.

## Unicorn Integration (Optional)
- `UnicornEffect.tsx`:
  - Props: `lazy`, `src` (exported script or canvas bundle), `onReady`.
  - Lazy via IntersectionObserver; dynamically inject script or import.
  - Mount into a dedicated container; ensure it runs after main content reveal.

## Unicorn Checklist
- Export from Unicorn Studio to a distributable script or canvas bundle.
- Place export in `/public/unicorn/` or `src/assets/unicorn/`.
- In `UnicornEffect.tsx`, set `src` to the export path.
- Ensure export is self-contained (no dashboard login).
- Verify lazy-load triggers only when in viewport.

## Deliverables
- PR-ready changes:
  - New modular components and reordered Home pages.
  - Embla carousel implementation.
  - Fixed KPI grid and “Major Cities” alignment.
  - Correct image paths with fallbacks and lazy loading.
  - Video-first anime.js timeline reveal with reduced-motion support.
- Integration checklist for Unicorn Studio.

If this plan looks good, I’ll implement the changes and verify them end-to-end.