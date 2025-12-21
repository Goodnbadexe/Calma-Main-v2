## Overview
- Replace the current button-driven showcase with a Smoothie-style kinetic carousel that uses momentum, soft easing, and optional parallax/scale on the active card.
- Preserve Calma’s brand typography, spacing, and card hierarchy; make the component reusable, configurable, and responsive for any number of projects.

## Files To Add/Update
- Add `src/components/carousel/SmoothCarousel.tsx` (physics engine wrapper using `smooothy` with React bindings).
- Add `src/components/home/ProjectCard.tsx` (shared card UI: image, category, name, descriptor, CTA).
- Update `src/components/home/FeaturedProjects.tsx` to render `SmoothCarousel` with project data (remove internal index and button-only flow).
- Update `src/components/home/ProjectPreviewGrid.tsx` to reuse `ProjectCard` styling and spacing for consistency.
- Update CSS in `src/styles/smooth-slider.css` and a small `src/styles/carousel.css` to define card sizing, responsive gaps, active/inactive animations, and section rhythm.
- Minor alignment tweaks in `src/pages/english/Home/Home.css` for vertical rhythm and consistent section headers.

## Data & Types
- Define `Project` type: `{ id, title, subtitle, category, image, href }` and use it in both `FeaturedProjects` and `ProjectPreviewGrid`.
- Accept projects via props (array) with optional config: `{ snap?: boolean, dragSpeed?: number, damp?: number, lerp?: number, breakpoints?: ... }` to avoid hardcoding counts.

## Carousel Behavior
- Use `smooothy` for physics: configure drag speed and damp/lerp for momentum. Default to non-snapping; allow snap via prop.
- Implement infinite or bounded scrolling (dev choice: bounded with gentle edges to avoid abrupt loop unless requested).
- Apply framer-motion micro-transitions: fade-in on mount, slight scale on active, soft hover lift.
- Optional parallax: translate image background slightly based on slide offset to track position.

## Navigation
- Keyboard: left/right arrows move by a viewport percentage (e.g., 80vw) for smooth UX; map to carousel `to(position)` without fighting inertia.
- Include focusable controls (prev/next) that call physics `to()` with eased transitions; ensure these don’t disable kinetic continuation.

## Touch + Mouse
- Pointer/touch drag feeds velocity to `smooothy` and continues with kinetic motion on release.
- Prevent text selection/drag ghosting; keep `cursor: grab` semantics.

## Responsive Rules
- Card width and gap defined via CSS clamp and breakpoints:
  - Desktop (≥1440px): 3 cards visible with breathing space.
  - Laptop (1024–1440px): 2–2.5 cards visible depending on gap.
  - Tablet (768–1024px): 1.5 cards.
  - Mobile (<768px): 1 centered card with gentle overscroll.
- Track container uses flex/grid with controlled gaps, no empty white gutters. Typography scales via existing tokens from `src/styles/variables.css`.

## Image Handling
- Image container uses `aspect-ratio` and `object-fit: cover` (350–420px desktop height, proportional downscale).
- `loading="lazy"`, `decoding="async"`, `srcSet`/`sizes` for retina assets.

## Discover More Section
- Align spacing and typography to the slider’s section rhythm and gap.
- Render each card via `ProjectCard` for consistent positioning rules and hover animation style.
- Ensure CTA "Explore" uses the same `luxury-button` system.

## Accessibility
- `role="region"` + `aria-roledescription="carousel"`, `aria-label="Featured Projects"`.
- Slides as `list`/`listitem` semantics; maintain focus order; ensure arrow keys and buttons are operable.
- Respect reduced motion; maintain high contrast and focus indicators.

## Styling & Brand
- Keep current fonts and tokens; avoid generic fallbacks. Recolor footer using palette in `src/styles/footer.css` and `variables.css`.
- Section headers ("Featured Projects", "Discover More") use consistent vertical rhythm from `index.css`/`variables.css`.

## Integration Points
- Replace current simple showcase in `src/components/home/FeaturedProjects.tsx:22–69` with `SmoothCarousel` and `ProjectCard`.
- Unify `ProjectPreviewGrid.tsx:11–43` to share card component and spacing.
- Maintain `Home.tsx:224` import and placement; only the internal behavior changes.

## Verification
- Manual QA across breakpoints to validate card counts, gaps, and kinetic behavior.
- Keyboard tests for arrow movement granularity and non-conflict with inertia.
- Unit tests for target position calculations in the carousel (vitest), and a simple render test for `ProjectCard`.
- Visual checks: no abrupt whitespace, proper alignment between slider and grid.

## Deliverables
- New reusable kinetic carousel component and shared project card.
- Refactored Featured Projects and Discover More sections with smooth, elegant behavior and brand-consistent styling.
- Configurable API ready for future CMS/JSON data injection.