## Goals
- Normalize alignment, spacing, and responsive behavior across the homepage.
- Establish a consistent spacing scale (8–12–16–24–32px) and apply it everywhere.
- Preserve the luxury aesthetic via balanced grids, intentional hierarchy, and subtle motion.

## Tech & Files
- Components: `src/pages/english/Home/Home.tsx`, `src/components/home/FeaturedProjects.tsx`, `src/components/home/ProjectPreviewGrid.tsx`, `src/components/home/TestimonialsBand.tsx`, `src/components/home/ProjectCard.tsx`
- Carousel: `src/components/carousel/SmoothCarousel.tsx`, `src/components/carousel/utils.ts`, styles in `src/styles/carousel.css`
- Styles: `src/pages/english/Home/Home.css`, `src/index.css`
- Animations: `framer-motion` (already in use)

## 1) Slider Alignment
- Center the carousel vertically within its section by converting the section wrapper to a grid and using `place-items: center` (`carousel-container`).
- Ensure all cards share the same vertical baseline: set a uniform card height via CSS (respecting the existing image aspect ratio) and enforce `align-items: stretch` on the track.
- Keep the draggable track fully inside the grid: remove any negative margins, standardize paddings to scale, and ensure `overflow: hidden` on the container.
- Standardize carousel `gap` values to the spacing scale (use 16/24/32), updating both `SmoothCarousel.tsx` sizing heuristics and `carousel.css` if needed.

## 2) Remove Ghost Spacing
- Audit and replace ad‑hoc margins/paddings with the spacing scale:
  - Reduce `.showcase-header` bottom margin to scale (e.g., 32–48px).
  - Normalize `.carousel-controls` spacing (16–24px) and header spacing in Featured.
  - Tighten `.projects-grid` gaps/padding (24–32px) and remove unnecessary outer margins.
  - Smooth transitions between sections by standardizing `.section` top/bottom padding in `Home.css`/`index.css`.

## 3) Featured Projects Positioning
- Reorder sections in `EnglishHome` to: Vision → Featured → Stories → Discover More.
- Add subtle animations:
  - Fade-in for section headers.
  - Staggered card entrances for Featured and Discover grids via `framer-motion` variants.

## 4) Card Template Consistency
- Enforce a single image aspect ratio for all `ProjectCard` usages (keep current 16:10 or adjust to 3:2 consistently across contexts).
- Normalize title/subtitle/button alignment:
  - Convert card content to a consistent vertical layout with fixed internal gaps (16–24px).
  - Ensure the “View Project” button aligns identically by standardizing its placement and spacing.
- Remove uneven weights and drifting text by harmonizing font sizes/weights in card content via shared classes.

## 5) “Masterfully Crafted. Uniquely Yours.”
- Convert `excellence-highlights` to a strict 3‑column CSS grid: `grid-template-columns: repeat(3, minmax(240px, 1fr))`.
- Apply `min-width` to prevent columns from collapsing/shifting; center the grid within `.luxury-section-inner`.
- Responsive rules: stack to 1 column ≤768px and 2 columns between 769–1200px while keeping consistent gaps.

## 6) Typography Clamping & Overflow Control
- Apply `clamp()` consistently to headings and subheadings:
  - Unify `.section-title`, `.luxury-content-title`, and Featured/Discover headers to shared clamp ranges.
- Ensure text never overflows containers:
  - Respect grid `max-width` constraints, apply `overflow-wrap: anywhere` only where needed.
  - Harmonize line‑height and letter‑spacing for luxury readability.

## 7) Discover More Refinement
- Tighten spacing in `.projects-grid` to scale and switch `justify-items` to `stretch` for uniform baselines.
- Confirm cards align perfectly by enforcing equal heights and consistent inner gaps.
- Apply gentle fade-in and stagger to the grid items.

## 8) Section Rhythm & Hierarchy
- Define standard top/bottom paddings for `.section` wrappers (e.g., 48–64px top, 48–64px bottom depending on breakpoint) and apply site‑wide.
- Keep container max‑widths consistent (e.g., 1200–1440px) and use centered `margin: 0 auto`.
- Maintain visual flow with balanced grids, controlled whitespace, and consistent headers.

## 9) General Polish
- Correct off‑center elements with container alignment rules and remove residual negative offsets.
- Fix floating components by anchoring them within their section grid/flex contexts.
- Normalize component sizing to avoid overly large/small elements relative to the grid.

## Implementation Outline
- Update `Home.tsx` section order and wrap relevant blocks with `motion` for fade/stagger.
- Adjust `SmoothCarousel.tsx` gap heuristics to the spacing scale and ensure uniform card heights.
- Update `styles/carousel.css`, `Home.css`, and `index.css` to:
  - Center the carousel section and track, enforce `overflow: hidden`.
  - Replace arbitrary margins/paddings with the scale.
  - Convert `excellence-highlights` to 3‑column grid with responsive rules.
  - Harmonize heading clamps and card content alignment.
- Verify visually across breakpoints and refine gaps.

## Verification
- Run dev server and audit at 375px, 768px, 1024px, 1440px, 1920px.
- Check baselines: carousel slides, Discover and Stories cards, stats columns.
- Confirm no overflow and clean section transitions.
- Validate keyboard and drag behavior still correct in the carousel; keep tests for `utils.ts` passing.

If this plan looks good, I’ll apply the changes and share a preview for review.