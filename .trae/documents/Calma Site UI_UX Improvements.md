## Global Layout Fixes
- Remove excess top spacing by replacing global `padding-top` in `src/index.css` with a header-aware spacer in `AppLayout`.
- Make `NavBar` `position: sticky; top: 0` and compute spacer height from actual nav height to avoid overlap without large gaps.
- Standardize section top/bottom spacing via utility classes (e.g., `section--tight`, `section--normal`).

## Shared Components & Utilities
- Create `ResponsiveGrid` utility using CSS Grid: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`; reuse across cards, impact stats, featured projects.
- Add `ImageAspect` wrapper to enforce consistent aspect ratios (`aspect-ratio: 4/3`), `object-fit: cover`.
- Introduce `SectionTitle` and `SectionGroup` components for consistent form and content headings.
- Implement accessible focus/hover states for buttons and links; unify brand colors and font weights.

## Home
- Hero (`src/pages/english/Home/Home.tsx`): cap height to ~70vh on desktop, reveal next section; ensure responsive crop.
- Calma Way (`src/components/home/Pillars.tsx`): render as responsive grid (3×1 → 2×2 → 3×3 when content grows), align cards consistently.
- Impact by Numbers (`src/components/home/KPIStats.tsx`): add horizontal layout with `ResponsiveGrid` (three/four items per row).
- Move Mission & Vision (`src/components/home/MissionVision.tsx`) directly under Impact by Numbers for narrative flow.

## About
- Reorder sections in `src/pages/english/About/About.tsx` to place Mission & Vision beneath Impact by Numbers.
- Apply horizontal `ResponsiveGrid` to impact counters; reduce vertical footprint.
- Leadership cards: use `ImageAspect` to reduce card height, ensure consistent image ratio and multi-row visibility.
- Featured projects preview: replace oversized carousel with grid thumbnails; ensure caption contrast (e.g., dark overlay behind light text).

## Projects
- Routing audit: verify all category routes (Villa/Floor/Town House/Office) resolve; fix broken paths or typos.
- View toggle in `src/pages/english/Projects/Projects.tsx`: add `Interactive` ↔ `Grid` toggle; manage state and URL query param (`view=interactive|grid`).
- Grid view: paginated 3×3 cards with image, price, location; consistent card sizes; responsive down to single column.
- Thumbnail sizing: use `ImageAspect` to avoid full-screen images.

## News
- Remove excess top spacing; hero remains but without large gap.
- Add simple posts grid: thumbnails + summaries; if no in-house articles, populate from a local JSON and include "Follow on LinkedIn" CTA.
- Keep category tags; enable filtering to update the grid.

## Contact
- Align contact method cards horizontally using `ResponsiveGrid`; add subtle background overlay to increase text contrast.
- Embed short contact form (name, email, message) beneath cards via a shared `ContactForm` component; ensure accessible labels/validation.
- Apply premium footer styling for consistency.

## Register Your Interest
- Group fields into `SectionGroup` headings (Personal Information, Preferences) for visual hierarchy.
- Maintain two-per-row layout with responsive collapse to single column; reduce height by collapsing optional fields until needed.
- Remove top spacing so the form sits closer to nav.

## Arabic Parity
- Mirror all layout and spacing changes across Arabic pages (`/src/pages/arabic/*`), ensuring RTL alignment and typography remain correct.

## Image Optimization & Accessibility
- Ensure all images have alt text and are compressed; verify graceful fallbacks.
- Standardize focus states and hit areas; maintain luxury aesthetic across footer, forms, and lists.

## Deliverables
- Updated layout spacing without large top whitespace.
- Responsive grids for Calma Way, Impact numbers, featured projects, and project lists.
- Reordered mission/vision placement; improved leadership and project previews.
- Projects page toggle and paginated grid; News posts grid.
- Contact form integration and Register form hierarchy.
- Applied across English and Arabic variants with consistent branding.