## Overview
- Transform the existing radial SVG into a hero identity navigator that represents categories/phases/featured groups, not individual projects.
- Introduce a compact, responsive grid (2–4 columns) as the primary exploration tool with search, category chips, and sorting.
- Synchronize SVG interactions with grid filters; smoothly transition from the hero SVG to the docked/minimized SVG on scroll.

## Architecture
- **Page shell**: `ProjectsPage` (English and Arabic variants) organizes two stacked layers:
  1. **SVG Navigator (Hero)** — full-width, center-aligned, symbolic, premium; docks to a compact corner bar on scroll.
  2. **Projects Grid (Functional)** — virtualized, lazy-loaded grid with search, chips, sort.
- **State**: Central filter state (`selectedCategory`, `searchQuery`, `sortBy`, `activePhase`, `isFeatured`) lives in the page component and is passed to both layers.
- **Synchronization**: SVG segment hover/click updates the central state; chips and sort in the grid reflect and update the same state.
- **Slide-over**: Clicking a project opens an in-page slide-over panel with project details and a highlighted SVG fragment.

## Data & Types
- Unify project types between `pages` and `components/home`:
  - `Project`: `{ id, name, category, type, location, valueLabel, image, tags?, phase?, featured? }`.
  - `Category`: fixed set (Residential, Commercial, Mixed-Use, Luxury, Sustainable, Community...).
  - Mapping from categories/phases to SVG segments (10–14 symbolic arcs; not one per project).
- Keep existing assets and brand imagery; use `ResponsiveImage` for consistent loading where available.

## SVG Navigator (Hero / Identity Layer)
- Keep the radial style and animation tone from `src/pages/english/Projects/Projects.tsx:255` and classes `shape-*` but reduce segments to a symbolic set that represents:
  - Major **categories** (primary arcs)
  - **Phases** or **Featured** (inner rings or highlights)
- Interactions:
  - Hover: subtle highlight and tooltip/title; sets a "preview" filter
  - Click: commits filter (`selectedCategory` or `activePhase`) and scrolls to the grid header
- Behavior:
  - On scroll past threshold, SVG scales down and docks to top-left/top-center bar with active segment indicator.
  - Keep motion lightweight: CSS transitions + minimal `framer-motion` springs; avoid expensive reflows.

## Grid Preview (Functional Layer)
- Compact grid with responsive columns:
  - 2 columns (≤768px), 3 columns (tablet), 4 columns (desktop ≥1280px)
- Card content:
  - Name, location, value/type, small SVG accent (category glyph), thumbnail
- Header:
  - Search input (debounced with `useDeferredValue`)
  - Category chips (reflect SVG selection; togglable)
  - Sort dropdown (Newest, Value, Type)
- Performance:
  - Lazy image loading (`loading="lazy"`) and responsive sizes
  - Virtualization: prefer `@tanstack/react-virtual` for windowing; fallback: simple windowed rendering via IntersectionObserver
  - Stable keys and memoized selectors (`useMemo`) for filtered/sorted lists

## Filters & Sync
- Central reducer or `useState` for:
  - `selectedCategory`, `activePhase`, `isFeatured`
  - `searchQuery` (deferred), `sortBy`
- Derive `visibleProjects = sort(filterByQuery(filterByCategory(baseProjects)))`
- SVG → Grid:
  - Hover sets a preview badge; click sets `selectedCategory` and collapses SVG to docked mode
- Grid → SVG:
  - Chip click toggles the same category; docked SVG highlights the active arc

## Slide-Over Panel
- On card click, open a slide-over panel from the right (or bottom on mobile):
  - Larger imagery and a highlighted SVG fragment corresponding to the project’s category
  - Project details (name, location, value/type, description)
  - CTA (e.g., "Request Details" or "View Brochure")
- Implementation: lightweight overlay with focus trap, ESC close, and ARIA roles
- Use `framer-motion` enters/exits with reduced spring stiffness; avoid layout thrash

## Scrolling & Transitions
- Initial viewport centers the hero SVG with a subtle scroll cue
- On scroll, interpolate to grid view:
  - Scale and opacity of SVG reduce smoothly; docked mode becomes sticky at top
  - Grid header fades in and pins below navigation
- Use `requestAnimationFrame` for scroll-linked transforms; clamp to 60fps

## Performance
- SVG: keep paths static; only class toggles and transforms; no path recalculation
- Images: `ResponsiveImage` where available; thumbnails pre-sized; srcset/sizes tuned
- Virtualization: `@tanstack/react-virtual` (if allowed) for large lists; otherwise IntersectionObserver windowing (render ±N rows around viewport)
- State updates: `useDeferredValue` for search; `useTransition` for heavy filters if needed; `useMemo` for derived lists
- No full page reloads; keep SPA navigation; prefetch project details on idle

## Accessibility
- Keyboard navigation for chips and cards
- ARIA labels on SVG segments (role="img" with `aria-describedby` describing categories)
- Focus management in slide-over; ESC and backdrop close
- High-contrast focus outlines consistent with brand theme

## Implementation Outline
1. Create `RadialNavigator.tsx` that wraps the existing SVG behaviors but maps arcs to categories/phases instead of individual projects; expose events: `onHoverCategory`, `onSelectCategory`.
2. Create `ProjectsGrid.tsx` with header (Search, Chips, Sort) and body using windowed rendering; reuse `ProjectCard` (`src/components/home/ProjectCard.tsx:18`) but override link behavior to open slide-over.
3. Create `ProjectSlideOver.tsx` with motion and focus trap; accepts `project` and renders details and SVG accent.
4. Integrate in `ProjectsPage.tsx` (English): top section hero (RadialNavigator), below section grid; wire shared state; implement docked behavior using sticky container and CSS transforms.
5. Mirror into Arabic (`src/pages/arabic/المشاريع`) with localized labels but shared components.
6. Styling: reuse `Project.css` theme (`src/pages/english/Projects/Project.css:6`) and minimal new utility classes; keep calm premium palette and subtle shadows.

## File Plan
- `src/pages/english/Projects/ProjectsPage.tsx` (or refactor `Projects.tsx`)
- `src/pages/english/Projects/RadialNavigator.tsx`
- `src/pages/english/Projects/ProjectsGrid.tsx`
- `src/pages/english/Projects/ProjectSlideOver.tsx`
- Shared types in `src/types/project.ts`
- Optional: `src/hooks/useVirtualGrid.ts` (fallback windowed rendering)

## Notes & Dependencies
- If permitted, add `@tanstack/react-virtual` for robust virtualization; otherwise implement an IntersectionObserver-based window.
- Keep `framer-motion` (already used) for controlled animations; avoid heavy timelines.

## Code References
- Existing radial SVG and motion scaffolding: `src/pages/english/Projects/Projects.tsx:255`
- Current grid/card style and content: `src/components/home/ProjectPreviewGrid.tsx:12`, `src/components/home/ProjectCard.tsx:18`
- Theme definitions used in Projects: `src/pages/english/Projects/Project.css:6`

## Deliverables
- A fast, synchronized SVG + Grid Projects page that feels premium and clear on first visit.
- Hero SVG acts as brand signature navigator; functional grid enables scalable browsing.
- Slide-over maintains context and reinforces system-wide identity.