## Scope Overview
- Apply the provided UI/UX spec to English pages and align Arabic pages with RTL-safe overrides.
- Update card layouts, spacing, typography scale, responsive grids, filters, and accessibility across News, Projects, and Contact.
- Reuse existing shared components and Tailwind utilities where available; extend page-specific CSS only when needed.

## Architecture Touchpoints
- News (English): `src/pages/english/News/News.tsx`, styles: `src/pages/english/News/News.css`
- Projects (English): `src/pages/english/Projects/ProjectsPage.tsx` and/or `src/pages/english/Projects/Projects.tsx`, styles: `src/pages/english/Projects/Project.css`
- Contact (English): `src/pages/english/Contact/Contact.tsx` (inline Tailwind)
- Shared UI: `src/components/ui/card.tsx`, global styles: `src/index.css`, navigation styles: `src/styles/navbar.css`
- Arabic pages: mirror updates with RTL-safe tweaks (`src/pages/arabic/...`) after the English implementation stabilizes.

## News Page
- Create a reusable `NewsCard` using `card.tsx` primitives for consistent shadow, radius, and spacing.
- Card anatomy per spec: top-left category pill (16px inset), date line below, headline (2 lines max, stronger weight, ~8px top margin), summary (truncate ~3 lines, ~6px margin), bottom-left “Read More” with arrow icon and 40px min touch target.
- Visuals: light card background (white/off-white) with dark text; image overlay gradient when using image-driven cards; subtle shadow; 8px radius.
- Layout: responsive grid (desktop 3 columns, tablet 2, mobile 1), 24px gaps; ensure equal heights via flex or min-height.
- Header hierarchy: tighten subheading 4px below H1; add ~40–48px vertical padding above title and below cards.
- Newsletter section: centered title/description; horizontal email field + Subscribe button (full width mobile, 50% desktop); success/error message area.
- Update `News.css` with utility classes and minimal custom rules for pills, clamp lines, arrow alignment, and consistent spacing.

## Projects Page
- Introduce a dedicated `FilterBar` below header: search box (16px padding, left icon, bordered with subtle shadow), category toggle pills with 8px spacing and brand-colored selected state, right-aligned Sort dropdown.
- Ensure 24px whitespace between nav bar and filter bar to prevent overlap.
- Card design: prominent top image (4:3 ratio), project name (bold, +2pt over body, ~8px margin), location • price line (smaller, lighter), "View Project" button (full width mobile, 60% desktop, 12px vertical padding). Make entire card clickable while keeping the button.
- Grid: desktop two columns, mobile single; 24px vertical spacing between cards.
- Filtering behavior: selecting pills filters grid; include “All” to reset; provide visual feedback for active filters.
- Hover states: image scale by ~2% and slight darken.
- Accessibility: alt text for images, keyboard focus styles on pills, dropdown, and cards.
- Implement logic inside `ProjectsPage.tsx` (or consolidate with `Projects.tsx` if that’s the canonical listing) and keep styles light in `Project.css`.

## Contact Page
- Hero: reduce background height, add semi-transparent dark overlay; center title “Contact CALMA” and subtitle in hero.
- Contact method cards: Phone, WhatsApp, Email — each as a consistent-width card (~300px) with left icon, bold heading, supporting text, and clear action button; light card background distinct from hero.
- Layout: row on desktop with 16px gap; stack on mobile.
- Actions: `tel:+966920006553`, WhatsApp chat link, `mailto:info@calma.sa`.
- Footer: dark background, brand statement, Explore links, social icons; add 2px separator line above; ensure consistent hover/focus styles.

## Global Spacing & Typography
- Navigation overlap fix: set a fixed `--nav-height` in `navbar.css`; apply top padding/margin to page content equal to nav height to prevent overlap.
- Typography scale: define CSS variables in `index.css` (e.g., H1=40px, H2=32px, body=16px); apply consistently across pages; ensure minimum contrast ratio ≥4.5:1.
- Spacing rules: 24px between sections; 16px between related elements; allow micro-adjustments (2–4px) where called out; use a 12-column grid on large screens and 4-column grid on mobile.

## Accessibility & Interaction
- Enforce focus-visible outlines and contrast-safe colors; ensure arrow icons align on baseline and meet touch target sizes.
- Make cards keyboard navigable; ensure “Read More” and “View Project” are discernible and operable via keyboard.
- Provide form validation and success/error feedback for newsletter subscription.

## Implementation Strategy
- Prefer Tailwind utilities with small custom classes for pills, overlays, truncation, and arrow alignment; leverage `card.tsx` for consistency.
- Add or adjust CSS only in page-specific files (`News.css`, `Project.css`) and `navbar.css`; keep `index.css` for global tokens (typography variables, grid utilities).
- Consolidate Projects listing into a single canonical component (`ProjectsPage.tsx`) if duplicates exist; otherwise, update both.

## Verification
- Manual QA per page: check spacing, alignment, contrast, hover/focus states, alt text, filter interactions, newsletter feedback.
- Responsive QA: desktop/tablet/mobile column counts and paddings.
- Functional checks: links navigate correctly; entire card click works; dropdown and pills update the grid.

## Rollout
- Implement English pages first; mirror into Arabic with RTL-safe spacing, direction, and typography; reuse shared components to minimize divergence.
- Keep changes scoped and incremental to reduce risk; update tests or add lightweight component tests as needed.