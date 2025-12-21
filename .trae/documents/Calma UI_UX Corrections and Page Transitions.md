## Header Updates
- Replace blue with transparent on load, charcoal/blur on scroll (10–20% opacity)
- Reduce header height ~25%; decrease logo size ~15%; evenly space nav items
- Update `src/components/ui/NavBar.tsx` (scroll state) and `src/styles/navbar.css` (background, height, spacing)
- Adjust mobile/desktop thresholds to avoid wrapping; keep `nowrap` and show burger earlier

## Cinematic Page Transitions
- Use Framer Motion globally: wrap routed content with `AnimatePresence` keyed by `location`
- Flow: current page fade-out (200–300ms) → overlay crossfade (20–30% black) → new page fade-in (220–260ms)
- Implement overlay as a global `motion.div` in layout; lock scroll during transition
- Keep hero video consistent when staying on Home: overlay covers video; avoid reloading by keeping video mounted outside page content where applicable

## Responsive Breakpoints
- Standardize breakpoints: 1440, 1024, 768, 480, 375 across Tailwind/screens and CSS variables
- Prevent nav wrapping: move drawer breakpoint to 1024; constrain nav container width
- Use `clamp()` for hero typography site-wide; remove fixed sizes
- Ensure images never stretch: enforce `object-fit: cover` and aspect-ratio utilities
- Apply consistent section padding: 72px desktop / 48px mobile via CSS variables/util classes

## Hero Section Adjustments
- Reduce hero vertical padding by 20–30%
- Ensure title fits one line on desktop using `clamp()` and adjusted max
- Tighten spacing: bring body copy and CTA closer
- Confirm hero media uses `object-fit: cover` and proper poster/preload

## Layout, Spacing & Visual System
- Apply a 72px vertical rhythm between sections using a reusable utility class
- Standardize image components with fixed aspect ratios (e.g., 16:9, 4:3, 1:1)
- Convert heavy PNG/JPG assets referenced in pages/components to WebP; update imports
- Fix metric inconsistencies (SQM/m², number formatting) and centralize via i18n/util formatter
- Make footer smaller and structured in three columns; reduce gaps/padding and icon sizes

## Performance & Loading
- Preload all locally served font files used in `@font-face`; prefer `<link rel="preload" as="font" crossorigin>`
- Defer non-critical scripts (module scripts already deferred); keep heavy components lazy-loaded
- Lazy-load non-visible images universally with `loading="lazy"` and `decoding="async"`
- Add a page-transition container above the router (in layout or `main.tsx`) to ensure smooth navigation transitions

## Aesthetic Consistency
- Replace saturated blues with palette: Charcoal, Warm sand, Soft gold accents
- Update color variables and usages; ensure buttons/cards use subtle shadows and micro-interactions (hover opacity/translate)

## Files To Update
- `src/components/ui/NavBar.tsx`, `src/styles/navbar.css`
- `src/layouts/AppLayout.tsx` (global transitions wrapper)
- `src/main.tsx` (location key propagation if needed)
- `src/index.css`, `src/styles/variables.css`, `src/styles/fluid-grid.css`
- Page styles: `src/pages/**/Home.css`, `About.css`, responsive CSS files (English/Arabic)
- Footer: `src/components/ui/Footer.tsx`, `src/styles/footer.css`
- Assets references under `src/assets/**` (switch to WebP)

## Verification
- Test transitions and header behavior across routes
- Manually verify breakpoints (1440/1024/768/480/375) for nav, hero typography, images
- Check performance: fonts preloaded, images lazy-loaded, no layout shift
- Provide live preview URL for review once changes are applied