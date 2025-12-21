## Findings
- Navigation bar renders a fixed header with padding that creates a blank strip: `src/index.css` sets `padding-top: calc(var(--nav-height, 64px) + 24px)` on `body`, `.site-wrapper`, and `.page`; `navbar.css` positions the header at `top: 16px`, which together produce the visible grey bar.
- Active link styles exist (`.nav-link.active` in `src/styles/navbar.css`), but link activation logic is partly manual in `src/components/ui/NavBar.tsx`, leading to inconsistencies.
- Hero section CTAs already have hover/motion effects (`Home.tsx` + `Home.css`), but effects are not consistently applied across other buttons/links.
- “Calma Way” cards use a grid (`src/components/home/Pillars.tsx` with `src/styles/layouts.css`) but can show uneven heights and spacing when content or images vary.
- “From Principles to Outcomes” section (`src/components/home/AboutCalma.tsx`) uses `<picture>` with `loading="lazy"` and descriptive alt text, but lacks a unified fallback mechanism on image error.
- Routing in `src/main.tsx` maps English/Arabic About pages; the English improved page is heavy and may block rendering; Arabic routes use shared components but can mismatch assets. No UI fallback is shown on route/component load errors.

## Navigation Bar
- Reduce global top padding: change `padding-top` on `body`, `.site-wrapper`, `.page` in `src/index.css` from `calc(var(--nav-height, 64px) + 24px)` to `var(--nav-height, 64px)` (or remove entirely if header overlays the hero cleanly).
- Align header to the very top: in `src/styles/navbar.css`, set `top: 0` for the fixed nav and ensure `border-radius`/shadow do not create visible background above.
- Standardize active state: replace manual path checks with `NavLink` and `isActive` across all nav links in `src/components/ui/NavBar.tsx`, reusing `.nav-link.active` styles.

## Hero CTAs
- Unify hover/focus styles by extracting shared button classes in `src/index.css` or a new `src/styles/components/buttons.css` (scale, color shift, shadow) and apply to CTA anchors in `Home.tsx` and other pages.
- Ensure responsive typography remains consistent by using `clamp(...)` sizes for hero headings/subtitles where missing.

## Value Cards Grid
- Enforce equal heights and spacing: in `src/styles/layouts.css`, set grid with `grid-auto-rows: 1fr` and apply flex column layout inside `.way-card` so all cards align baseline regardless of content length.
- Normalize internal padding/margins for `.way-content`, and keep a consistent `gap` at the grid level.
- Optionally add lightweight inline SVG icons to each card to reinforce themes (matching the icon approach used in `AboutCalma.tsx`).

## Section Spacing
- Tighten vertical rhythm by reducing `--section-padding-desktop` from `80px` to `64px` and `--section-padding-mobile` from `48px` to `40px` in `src/styles/variables.css`.
- Standardize section headers: introduce a small label + heading pattern with consistent classes (label `.section-badge`, heading `.section-title`) and apply across Home/About sections.

## Routing & About Page
- Audit routes in `src/main.tsx` to ensure every nav link has a resolvable component in both locales; remove unused or duplicate Arabic slugs.
- Add a lightweight `ErrorBoundary` component under `src/components/util/ErrorBoundary.tsx` and wrap route elements so blocked pages display friendly fallback content instead of blank screens.
- Lazy-load heavy About assets and split media: move large images to `<picture>` with `srcset` breakpoints; ensure video uses `preload="none"` and a compressed `poster`.

## Images & Media
- Create `ImageWithFallback` in `src/components/ui/ImageWithFallback.tsx` that wraps `<img>` with `onError` to swap to a placeholder asset, preserves `alt`, and supports `loading="lazy"`/`decoding="async"`.
- Replace vulnerable `<img>` usages in AboutCalma, Pillars, FeaturedProjects, ProjectGallery, and project pages with `ImageWithFallback`.
- Add simple skeleton/blur placeholders via a reusable `.image-skeleton` class and apply while images are loading.
- Ensure all images have descriptive `alt` text; use `<picture>`/`srcset` for responsive imagery where available.

## Interactivity & Accessibility
- Add consistent hover and focus styles to `.nav-link`, `.button-link`, and `.hero-button` classes; ensure visible focus outlines and adequate contrast.
- Use `aria-current="page"` via `NavLink` for active nav items; verify keyboard navigation order and focus trapping in overlays.

## Verification
- Manually verify removal of the top grey bar across Home and inner pages.
- Navigate to every link (Home, About, Projects, News, Contact) in both English and Arabic to confirm accessibility and active states.
- Simulate image load failures (by pointing `src` to an invalid URL in dev) and confirm graceful fallback.
- Run performance checks (Lighthouse) to ensure improved layout shift and image loading metrics.

## Files In Scope
- `src/components/ui/NavBar.tsx`, `src/styles/navbar.css`
- `src/index.css`, `src/styles/variables.css`, `src/styles/layouts.css`
- `src/pages/english/Home/Home.tsx`, `src/pages/english/Home/Home.css`
- `src/components/home/Pillars.tsx`
- `src/components/home/AboutCalma.tsx`
- `src/components/ui/ImageWithFallback.tsx` (new)
- `src/main.tsx`, `src/components/util/ErrorBoundary.tsx` (new)

If this plan looks good, I’ll implement the changes, wire in fallbacks, and verify across English/Arabic routes.