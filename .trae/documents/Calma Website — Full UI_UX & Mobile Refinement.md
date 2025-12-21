## Scope
- Desktop, tablet, and mobile refinements across Header/Nav, Hero, Content rhythm, About, Projects, Footer, Performance, Color, Typography, and Mobile breakpoints.
- Implement CSS-first changes to avoid code churn; adjust component markup only where necessary.

## Header & Navigation
- Reduce header height ~25% by tightening `.glass-nav .section-inner` padding/min-height in `src/styles/navbar.css` and `src/index.css`.
- Tone down blue: use transparent/charcoal backgrounds via `.glass-nav.nav-transparent` and `.glass-nav.nav-solid` in `src/index.css`.
- Equalize nav spacing with consistent `gap` for `.nav-links` and normalize button sizes.
- Collapse nav at ≤1024px: hide `.nav-links`, show `.burger-button` and drawer; add media query at 1024px in `src/index.css`.
- Mobile drawer: apply max-height transition, 12–16px padding, and ~80% icon sizes for `.mobile-menu .panel` in `src/index.css` and `src/styles/navbar.css`.
- Relevant code: `src/components/ui/NavBar.tsx` links/actions structure; styles in `src/styles/navbar.css` and `src/index.css`.

## Hero Section Responsiveness
- Make titles fluid using `clamp(...)` for `.luxury-title` in `src/index.css`.
- Enforce one-line on desktop, ≤2 lines on mobile via tighter letter-spacing, line-height, and max-width (70–75ch).
- Reduce hero vertical padding 20–30%.
- Ensure video/image uses `object-fit: cover; min-height: 60vh;` and keep a dark overlay 10–15% for readability.
- Where the hero is rendered: `src/pages/english/Home/Home.tsx` (video/poster, overlay element).

## Content Blocks & Section Flow
- Standardize vertical rhythm: 72px desktop and 48px mobile via `.section` paddings in `src/index.css`.
- Left-align descriptive text (`.section-description`) with max-width 75ch.
- Standardize images with fixed aspect ratios (e.g., 4:3 or 16:10) to avoid stretch.
- Convert metric blocks to 3-column grid at desktop, collapsing to single column on mobile; adjust `.panorama-stats` and `.stat-item` in `src/index.css`.

## About Page
- Create uniform trait cards (Sustainability/Quality/Innovation) with consistent icon sizing and spacing.
- Constrain long copy to `max-width: 680px; margin: auto;` within About sections.
- Standardize image containers with fixed aspect ratios to avoid distortion.
- Add fade-up (≈120ms stagger) animations to trait cards using existing motion utilities.
- Files: `src/pages/english/About/AboutImproved.tsx` and `src/pages/english/About/About-responsive.css`; Arabic equivalents in `src/pages/arabic/عن كالما/عن كالما.css`.

## Projects Page
- Adopt 3/2/1 responsive grid (desktop/tablet/mobile) for `.projects-grid`.
- Enforce `aspect-ratio: 16 / 10` on card media to prevent distortion.
- Hover state: soft shadow + slight lift + 200ms ease.
- Hierarchy: title at 500, description at 400, CTA clear but subtle.
- Files: `src/pages/english/Projects/Project.css`, `src/index.css`, and components under `src/pages/english/Projects/*.tsx`.

## Footer
- Implement compact three-column footer with neutral palette, reduce overall height ~20%.
- Use uniform mono-tone icons (equal size/weight), lighter stroke.
- Apply consistent paddings across breakpoints.
- Component: `src/components/ui/Footer.tsx`; styles in `src/styles/footer.css` (new, imported in `src/index.css`).

## Performance & Loading
- Convert suitable PNG/JPG assets to WebP (hero, large gallery items) and update imports.
- Preload primary font weights and hero poster/media in `index.html` to reduce CLS.
- Ensure hero video has a poster fallback and `preload` set appropriately.
- Lazy-load non-critical assets and ensure `loading="lazy"` + `decoding="async"` on images.

## Color System
- Reduce blue usage 80%; replace header overlays with charcoal/transparent.
- Use gold accents sparingly for separators and highlights (thin rule lines, badges).
- Adjust CSS variables in `src/styles/variables.css` if needed; keep palette consistent across `index.css`.

## Typography System
- Adopt modular scale (1.25/1.33) for headings and body.
- Clamp sizes for headings and key UI text (hero, section titles).
- Enforce 70–75 character max width for body text; weights: 700 headers, 500 subheaders, 300–400 body.

## Mobile-First Breakpoints
- Implement targeted breakpoints at 1440px, 1024px, 768px, 480px.
- Verify scaling for buttons, icons, hero text, metrics, and CTA blocks; ensure mobile CTAs can span full width.
- Ensure all images: `width: 100%; height: auto; object-fit: cover;`.

## Validation
- Verify Home, About, Projects, News, Contact across breakpoints with the live dev server.
- Check for no wrapping in header ≤1024px, consistent section rhythm, clean grid collapse.
- Measure CLS/FCP improvements after preloads and image format changes.

## Deliverables
- Updated CSS structure and components per sections above.
- Refined header/hero layout, spacing rhythm, projects grid, and a new compact footer.
- Full responsive behavior with reduced saturation and improved readability/performance.

Please confirm this plan; once approved, I will apply the changes incrementally and validate in the live preview.