## Scope Overview
- Pages: `Home`, `Projects`, `About`, `News`, `Contact/Register`, Arabic RTL equivalents.
- Priorities: Carousel UX/accessibility, responsive integrity, i18n/RTL stability, loaders/performance, accessibility.

## Key Findings (Current Code)
- Featured Projects renders only 3 items; local `slides` array instead of full dataset in `src/components/home/FeaturedProjects.tsx:8`.
- Primary projects dataset with 11 entries exists in `src/data/projects.data.ts` (source of truth to use).
- Current carousel is a custom component (`src/components/carousel/SmoothCarousel.tsx:25`), with pointer drag and arrow buttons but lacks:
  - `touch-action: pan-y` and toggled `user-select: none` during drag
  - Per-slide ARIA announcements and pagination
  - Keyboard Home/End and RTL-aware arrow logic
- Stats/Animated counters formatting: 500000+ shows as `500000+` not `500,000+` (formatter in `src/components/ui/AnimatedNumber.tsx:35`), and does not respect `prefers-reduced-motion`.
- Discover More grid (`src/components/home/ProjectPreviewGrid.tsx`) lacks mobile 50/50 image/content split; currently vertical card; CSS in `src/index.css:2086`-`2123` defines grid columns but no 50/50 per-card on mobile.
- Design tokens exist (`src/styles/variables.css`) but usage is inconsistent across components; button styles and overlay contrast vary.
- Loaders/skeletons absent for Featured and Discover sections; hero poster preloaded (`index.html:31`-`38`) but carousel first images are not.
- i18n/RTL: Language persistence + `lang`/`dir` are correctly set in `src/contexts/LanguageContext.tsx:115`-`121`; route-mapping and localStorage handled (`src/contexts/LanguageContext.tsx:101`-`113`, `123`-`148`). Carousel is not RTL-aware.
- Mobile navigation drawer (`src/components/ui/NavBar.tsx:295`) lacks focus trap and Escape-to-close; language switch is present but not announced to screen readers.

## Deliverable 1: Issues by Page
- Home (EN):
  - Featured Projects shows 3 instead of 11 (`FeaturedProjects.tsx:8`); missing pagination and ARIA per slide.
  - Carousel lacks `touch-action: pan-y` and drag selection suppression (`SmoothCarousel.tsx`).
  - Keyboard: no Home/End; Arrow not RTL-aware.
  - Counters formatting and reduced-motion not respected (`AnimatedNumber.tsx`).
  - Discover More mobile layout not 50/50.
  - No skeleton loaders for card grids; first carousel images not preloaded.
- Home (AR):
  - Equivalent Featured section absent; Arabic page lacks carousel and pagination.
  - RTL carousel behavior not integrated.
  - Same counters reduced-motion concern.
- Projects:
  - Multiple disparate arrays across pages; not unified on `projects.data.ts`.
  - Arabic subroutes exist; ensure translations consistent; audit keys like `nav.allProjects`, `nav.commercials` (used in `NavBar.tsx`) that are missing from `LanguageContext`.
- About:
  - General responsiveness OK; ensure color/contrast tokens applied consistently.
- News:
  - No blockers identified; ensure loader during route transition consistent.
- Contact/Register:
  - Verify form labels/aria; ensure consistent tokens and mobile spacing; drawer access to register CTA is present.
- Mobile Navigation:
  - Lacks focus trap and Esc close; overlay clicks close; tap targets OK; language switch present but needs explicit accessible labeling.

## Fix Strategy by Section
### 1) Featured Projects → Accessible Drag Carousel (11 projects)
- Replace local `slides` with `projectsData` (11 items) from `src/data/projects.data.ts`.
- Adopt Embla Carousel (preferred for a11y): add `embla-carousel-react` and wire with RTL support. If avoiding deps, enhance `SmoothCarousel` with ARIA/pagination.
- Implement:
  - Draggable viewport with `touch-action: pan-y` on container/track and temporary `user-select: none` while dragging.
  - Arrow controls (`Prev/Next`) with `aria-label`; invert in RTL.
  - Pagination: dots or `N / 11`, clickable and keyboard-focusable.
  - Keyboard: ArrowLeft/Right (RTL-aware), Home/End jump, Tab focus enters region then active slide CTA.
  - ARIA: region labelled “Featured Projects”; slides announce “Slide N of 11”.
- Files:
  - `src/components/home/FeaturedProjects.tsx` (data source + controller)
  - `src/components/carousel/SmoothCarousel.tsx` or new `EmblaCarousel.tsx`
  - `src/styles/carousel.css` (touch-action, selection, pagination styles)

### 2) Carousel Index / Numbers Under Featured Projects
- Replace numeric indicators with: dots (11) + `N / 11` label.
- RTL: reverse visual order and arrow logic.
- Files: `SmoothCarousel.tsx` pagination UI + `carousel.css` styles.

### 3) Stats / Counters Section
- Update formatter to always produce locale-formatted numerals (e.g., `2,000+`, `500,000+`).
- Add reduced-motion support: if `prefers-reduced-motion: reduce`, skip animation and render final values immediately.
- Responsive layout:
  - Desktop: 4 columns
  - Tablet: 2x2
  - Mobile: stacked
- Files: `src/components/ui/AnimatedNumber.tsx`, section CSS in `src/pages/english/Home/Home.css` and Arabic equivalent.

### 4) Discover More — Mobile 50/50 Shrink
- Per card on mobile, switch to horizontal two-column layout (image 50%, content 50%).
- Preserve fixed image ratio with `aspect-ratio` and `object-fit: cover`.
- Desktop: keep 3-column grid.
- Files: `src/components/home/ProjectPreviewGrid.tsx`, `src/index.css` responsive rules for `.project-showcase-card`, `.project-image`, `.project-content` at small breakpoints.

### 5) Global Design System Consistency
- Consolidate and apply tokens from `src/styles/variables.css`:
  - background/surface/text/muted/border/brand
  - primary/secondary buttons; clear primary vs secondary hierarchy
- Verify hero overlay contrast (WCAG AA-ish) over video images.
- Files: `src/styles/variables.css`, audit usage in `index.css`, `navbar.css`, section CSS; normalize button classes.

### 6) Loader / Performance / Stability
- Prevent layout shift: ensure explicit `width/height` or `aspect-ratio` on all images; already present, verify grids.
- Add skeleton loaders for:
  - Featured projects cards
  - Discover more cards
- Improve route Suspense fallback to non-blank skeleton; ensure Splash overlay doesn’t hide content completely.
- Preload hero image (already) and first carousel images via `<link rel="preload" as="image">` or dynamic preloading.
- Files: `index.html`, new `SkeletonCard.tsx`, usage in Home sections.

### 7) Arabic / i18n / RTL Fixes
- Persist language (already localStorage) and confirm across refresh/navigation (validated in `LanguageContext.tsx:101`-`121`).
- Ensure `document.lang` and `document.dir` set (done in `LanguageContext.tsx:117`-`121`).
- Add missing translation keys and avoid fallback to key strings (audit `NavBar.tsx` usage like `actions.openMenu`, `nav.allProjects`, etc.).
- RTL-specific:
  - Carousel direction inversion and arrow logic.
  - Layout spacing/alignment with existing RTL variables; verify Arabic font stack usage.
- Files: `src/contexts/LanguageContext.tsx`, carousel component, any RTL CSS.

### 8) Mobile Navigation Accessibility
- Implement focus trap inside drawer; auto-focus first focusable; restore focus on close.
- Add `Esc` to close; ensure close button visible and labelled.
- Keep large tap targets; ensure language switch accessible inside drawer.
- Files: `src/components/ui/NavBar.tsx`, `navbar.css`.

## Deliverable 2: PR Plan (Small Commits Grouped)
- Carousel (data + a11y):
  - Use `projectsData` for Featured; add pagination (dots + `N/11`); add ARIA for slides; add `touch-action` and `user-select` toggle; RTL-aware controls.
- Responsive: 
  - Discover More 50/50 mobile layout; ensure aspect-ratio; grid breakpoints.
- i18n/RTL:
  - Add missing keys; harden LanguageContext route mapping to mirror Arabic aliases; unify dataset usage.
- Loader/Performance:
  - Skeleton components; Suspense fallback; preloads for first carousel images.
- Navigation:
  - Focus trap; Esc close; accessible labelling.

## Deliverable 3: Before/After Screenshots
- Capture Desktop + Mobile for Home (EN) and Arabic Home:
  - Featured Projects (pagination, ARIA-focused state)
  - Discover More grid (mobile 50/50)
  - Metrics counters (formatted numbers; reduced motion)
  - Mobile drawer focus trapping

## Deliverable 4: QA Checklist
- Carousel:
  - Drag/swipe works on iOS/Android/trackpad; text not selectable while dragging
  - Keyboard: ArrowLeft/Right; Home/End; Tab enters region and focuses active slide CTA
  - RTL: arrows reversed; pagination order natural
- Pagination: dots clickable via mouse/touch/keyboard; `N / 11` label updates
- Counters: formatting `500,000+`, `2,000+`; on `prefers-reduced-motion`, no animation
- Discover More: mobile cards render side-by-side 50/50; tap targets large; no layout shift
- i18n/RTL:
  - Switch to Arabic; refresh; navigate; language persists; `lang="ar"`, `dir="rtl"`
  - No fallback keys visible; fonts and spacing correct
- Loader/Performance:
  - Skeletons appear during slow network; reduced CLS
  - Hero and first carousel images preloaded
- Navigation:
  - Drawer traps focus; Esc closes; language switch accessible; close button visible

## Acceptance Mapping
- Dragging does not select text: `touch-action` + `user-select` class toggle in carousel CSS/JS.
- Works across devices: pointer + touch events; inertial feel retained.
- Keyboard accessibility: implement arrow/Home/End; focus management to CTA.
- Pagination: dots + `N / 11`; accessible labels.
- Counters: formatted numbers and reduced-motion respect.
- Discover More: mobile 50/50 card layout; desktop 3-column.
- Design token consistency: variables applied; hero overlay contrast.
- Loader/performance: skeletons and preloads; low CLS.
- i18n/RTL stability: persisted language; correct dir/lang; RTL-aware carousel.
- Mobile nav accessibility: focus trap; Esc; labelled controls.

## Notes
- If Embla is preferred, we will add it; otherwise we will enhance `SmoothCarousel` to meet all a11y requirements.
- All changes maintain brand structure and styling; tokens are applied, not redesigned.