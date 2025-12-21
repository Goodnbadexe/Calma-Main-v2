## Scope
- Implement a slim, sticky header that overlays hero media across all pages
- Remove top whitespace, align CTAs, and consolidate duplicate sections
- Simplify Projects browsing with a default grid view and clearer controls
- Unify typography/spacing and make header consistent across English/Arabic

## Root Causes (Code References)
- Header transparency only checks `#panorama` or `.hero` (src/components/ui/NavBar.tsx:39–57), missing About/News classes
- Spacer below header adds vertical band (src/layouts/AppLayout.tsx:50–52)
- Hero padding pushes content down (src/index.css:528–532)
- Nav links hidden at wide breakpoints (src/index.css:2005–2008)
- Footer duplicates navigation and mislinks Contact (src/components/ui/Footer.tsx:16–23)
- Projects defaults to complex interactive view via flags (src/components/pages/projects/ProjectsLayout.tsx:13–17, src/config/features.ts:7–14)

## Implementation Plan
### Header Overlay & Whitespace Removal
- Make `.glass-nav` full‑width and fixed; remove `left/right` margins to eliminate top band (src/index.css:283–307, 1989–1997)
- Reduce header vertical padding to shrink height (src/index.css:292)
- Extend transparency detector to include `.hero-section` and `.news-hero` so About/News keep the overlay (src/components/ui/NavBar.tsx:39–57)
- Keep header always visible; ensure `z-index` stays above hero overlay (already 1000)

### Conditional Spacer
- Render spacer only when the first viewport section is not a hero/panorama:
  - In AppLayout, compute presence of `.hero, .hero-section, .news-hero, #panorama`; set spacer height to `0` when present (src/layouts/AppLayout.tsx:40–46, 50–52)

### CTA Baseline Alignment
- Unify button styles: equal `min-height`, padding, and line-height for `.hero-button` and `.hero-button-secondary`; keep flex row baseline alignment (src/index.css:618–666, 667–672, 608–616)
- Apply same alignment to Excellence/About CTAs to ensure consistency (src/components/home/Excellence.tsx, src/pages/english/About/AboutImproved.tsx)

### Duplicate Section Cleanup
- Home: maintain a single "Discover More" (`ProjectPreviewGrid`) instance (src/components/pages/home/HomeLayout.tsx:24)
- If any other section uses the same heading on Home, rename or remove (search-confirmed only one match today)

### Footer Consistency
- Rename "Explore" to "Quick Links" and remove redundant Home/About/Projects/News/Contact duplication
- Fix Contact link to `"/contact"` (src/components/ui/Footer.tsx:16–23)

### Projects Page Simplification
- Default to grid view:
  - Either set `FEATURES.en.projectsAdvancedNav = false` (src/config/features.ts:7–10), or make `Projects.tsx` default `view="grid"` when no query param (src/pages/english/Projects/Projects.tsx:81–87, 243–265)
- Keep sticky filters header positioned below nav using `top: var(--nav-height)` (already present in grid, src/pages/english/Projects/ProjectsGrid.tsx:69–75)
- Clarify labels, ensure search is full‑width, and categories are concise

### Navigation Visibility & Breakpoints
- Show `.nav-links` on desktop/tablet; only hide on narrow mobile (<768px) to avoid perceived "missing header" (src/index.css:2005–2008)
- Keep burger menu for mobile and test drawer accessibility (src/components/ui/NavBar.tsx:333–533)

### Hero Full‑Bleed
- Remove hero top padding so media sits flush under overlay (src/index.css:528–532)
- Keep poster and lazy video load for fallback (src/pages/english/Home/Home.tsx:216–223)

### Typography & Spacing Audit
- Use tokens for consistent font sizes and margins (src/styles/variables.css:48–113)
- Normalize section vertical rhythm via `--section-vr-*` tokens (src/styles/variables.css:144–152) and ensure consistent `section` padding (src/index.css:75–87)

## Files to Update
- `src/components/ui/NavBar.tsx`
- `src/layouts/AppLayout.tsx`
- `src/index.css` and possibly `src/styles/navbar.css`
- `src/components/pages/home/HomeLayout.tsx`
- `src/components/ui/Footer.tsx`
- `src/pages/english/Projects/Projects.tsx` or `src/config/features.ts`
- CTA style references in `Excellence.tsx` and `AboutImproved.tsx`

## Verification
- Run the app and check Home/About/Projects/News/Contact on desktop and mobile
- Confirm: header overlays hero with no top band; CTAs align; Projects loads in grid by default; navbar visible across pages; footer links corrected
- Test Arabic routes to ensure parity (`/ar` variants)

## Rollback & Safety
- Keep changes localized to CSS and small component tweaks; feature-flag Projects default for quick revert
- No secrets or environment variables touched