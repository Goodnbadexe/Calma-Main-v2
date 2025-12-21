**Scope**

* Implement homepage fixes aligning with the review: hero clarity, section ordering, metrics consolidation, carousel reliability, mission/vision de‑duplication, navigation behavior, visual polish, accessibility, and responsiveness.

**Key Files**

* `src/pages/english/Home/Home.tsx`

* `src/components/home/Pillars.tsx`

* `src/components/home/KPIStats.tsx`

* `src/components/home/TrustStrip.tsx`

* `src/components/home/FeaturedProjectsCarousel.tsx`

* `src/components/home/MissionVision.tsx`

* `src/components/ui/NavBar.tsx`

* `src/index.css` (e.g., `.kpi-grid .stat-item` at `Calma Receartion/src/index.css:2475`)

* Assets under `src/assets/Images/**/*` and `src/assets/Videos/*`

**Hero Section**

* Add a subtle overlay to improve text contrast: ensure `hero-overlay` applies a semi‑transparent layer over the video.

* Prevent text overlap and ghosted Arabic artifacts: remove or relocate decorative Arabic text from the hero, or move to a muted background element.

* Ensure navigation does not overlap hero: set header to fixed and assign safe `z-index`; add top padding to hero to account for header height.

* Verify responsive scaling: confirm video `object-fit: cover` and text containers scale across breakpoints.

**Calma Way Placement**

* Move `Pillars` directly under the hero in `Home.tsx` by reordering section components.

* Render three horizontal cards with consistent spacing and icons: verify `.calma-way-grid` and `.way-card` spacing; normalize margins/gap tokens.

**Impact by the Numbers (Consolidation)**

* Merge `KPIStats` and `TrustStrip` into one section component (retain most relevant metrics: projects delivered, families served, total land area, built area, units delivered).

* Standardize formatting (e.g., either use `+` suffix or plain numbers, but consistently); unify typography across `stat-number`/`stat-label`.

* Remove duplicates or clearly label categories (e.g., `Projects Delivered` vs `Landmark Projects`).

* Update styles in `src/index.css` for `.kpi-grid .stat-item`, `.stat-number`, `.stat-label` to ensure uniform spacing, font sizes, and contrast.

**Architecting the Future of Urban Living**

* Either integrate content into `Pillars` (precision, excellence, innovation) or retain as outcomes (sustainability features, materials, urban innovation) to avoid conceptual duplication.

* If removed, ensure routes/links referencing it are updated.

**Featured Projects Carousel**

* Fix image loading: verify `pickPreviewImage` resolves to existing assets in `src/assets/Images/Projects/**/*` and correct import paths.

* Add lazy loading (`loading="lazy"`) and alt text for each image; ensure accessible names.

* Style arrows/dots: improve `.carousel-controls` and `.carousel-dots` visibility; maintain touch/swipe support (Embla).

* Show one card per view on mobile, larger image focus on desktop; confirm responsive breakpoints.

**Mission & Vision Section**

* De‑duplicate values already expressed in `Pillars`; keep concise statements.

* Optionally surface a short brand story near hero or retain in footer with improved readability (typographic scale and spacing).

**Navigation Bar Behavior**

* Make `NavBar` fixed (`position: fixed`) with transparent background that transitions to solid on scroll; ensure it never overlays content.

* Validate `glass-nav` styles for readability over video; add scroll threshold logic if needed.

**Visual & Layout Adjustments**

* Normalize spacing scale (consistent `gap`, `margin`, `padding`) across sections.

* Harmonize heading/subtext sizes; define a typographic scale and apply to section titles and labels.

* Remove faint/background headings that reduce legibility; ensure color contrast meets WCAG.

**Accessibility**

* Add descriptive `alt` text to all images; ensure carousel controls are keyboard operable.

* Verify color contrast ratios and focus outlines for interactive elements.

**Responsive QA**

* Test at common widths (375, 768, 1024, 1440): hero layout, pillars alignment, consolidated metrics, carousel, header behavior.

* Adjust breakpoints and container widths as needed to prevent overflow/overlap.

**Acceptance Criteria**

* No overlapping UI: header never overlaps hero or content; all text legible over media.

* Sections order: Hero → Calma Way → Impact by Numbers → Carousel → Mission/Vision.

* Single metrics section with consistent design and accurate values.

* Carousel shows images reliably, with accessible controls and lazy loading.

* Mission/Vision concise and non‑redundant.

* Consistent spacing and typographic scale; WCAG‑compliant contrast.

* Responsive across target devices without layout breaks.

**Dependencies/Risks**

* Asset availability for carousel images and background photos.

* Embla carousel integration may require minor style/initialization adjustments.

* Potential copy updates for metric labels/categories.

**Next Steps**

* Implement the above changes in the referenced files.

* Verify locally and capture screenshots for each acceptance criterion.

* Share a short changelog and before/after diffs for review.

