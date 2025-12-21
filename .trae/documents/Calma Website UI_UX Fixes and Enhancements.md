## Home Page

1. Hero Section
- Replace collage with a single high‑res video or image and a semi‑transparent overlay.
- Remove ghosted Arabic text in hero; ensure no language overlap.
- Keep navbar above hero with translucent/solid background and drop shadow on scroll.
- Ensure CTA buttons have consistent styling, contrast, and padding.
- Files: `src/pages/english/Home/Home.tsx`, `src/pages/english/Home/Home.css`, `src/components/ui/NavBar.tsx`, `src/styles/navbar.css`.

2. The Calma Way
- Move the section directly under hero; present three pillars as equal cards.
- Each card: icon, short heading, one‑line descriptor; balanced padding/margins.
- Files: `src/pages/english/Home/Home.tsx`, `src/pages/english/Home/Home.css`, assets/icons.

3. Impact Metrics
- Consolidate metrics into a single “Impact by the Numbers” block; remove duplicates.
- Use consistent card design: large number, clear label, plus signs formatted.
- Align horizontally on desktop, stack on mobile; soft background or bordered section.
- Files: `src/components/home/KPIStats.tsx`, `src/index.css` (e.g., `.kpi-grid .stat-item`), `src/pages/english/Home/Home.tsx`.

4. Mission & Vision
- Keep one concise mission and one vision; add small icons for sub‑values.
- Place near page bottom; remove repeats of earlier content.
- Files: `src/pages/english/Home/Home.tsx`, `src/pages/english/Home/Home.css`.

5. Featured Projects Carousel
- Fix image references and add lazy loading for performance.
- Show one project per slide on desktop; swipe gestures on mobile; arrows and dots.
- Card: image, name, location/type, accessible alt text, “View Project” button.
- Files: `src/components/home/FeaturedProjectsCarousel.tsx`, `src/styles/carousel.css`, project image assets.

6. General Styling
- Normalize spacing/typography; apply vertical rhythm and font scale.
- Use cohesive color palette; avoid low‑contrast text.
- Optional: remove or complete scroll indicator/progress bar; ensure hover/focus states.
- Files: `src/index.css`, `src/styles/layouts.css`, page‑specific CSS files.

## About Page

1. Hero Section
- Single background contrasting with headline; consider blurred/darkened image.
- Centered CTA (“Discover Our Vision”); remove nonfunctional “Scroll to explore”.
- Files: `src/pages/english/About/About.tsx`, `src/pages/english/About/About.css`.

2. Looking Ahead
- Pair Vision 2030 paragraph with illustrative image/icon.
- Place “Learn About Our Approach” button adjacent; style consistently.
- Files: `src/pages/english/About/About.tsx`, assets/icons/images.

3. Metrics Block
- Clear cards showing number + description; no blank labels.
- Reuse home metrics design and responsive alignment.
- Files: `src/components/home/KPIStats.tsx`, `src/index.css`, `src/pages/english/About/About.tsx`.

4. Our Mission
- Two‑column layout: image vs text; align on desktop/mobile.
- Shorten/break mission into bullets highlighting discipline, materials, precise delivery.
- Files: `src/pages/english/About/About.tsx`, `src/pages/english/About/About.css`.

5. Our Story / Why CALMA Exists
- Keep image left, text right; add image caption.
- Structure text into shorter paragraphs or bullets: premium feel, functionality, longevity.
- Files: `src/pages/english/About/About.tsx`.

6. Our Vision & CEO Message
- Combine forward‑looking text and CEO message; add pull‑quote style.
- Show CEO photo adjacent; avoid repeated wording.
- Files: `src/pages/english/About/About.tsx`, assets/ceo photo.

7. Consistency
- Match navbar style with home page; fixed top; background change on scroll.
- Remove stray decorative elements; optimize images (use WebP where possible).
- Files: `src/components/ui/NavBar.tsx`, `src/styles/navbar.css`, image assets.

## News Page

1. News Listing
- Card/list items with category/tag, date, headline, short summary.
- Add “Read More” CTA; include thumbnails or icons.
- Files: `src/pages/english/News/News.tsx`, `src/pages/english/News/News.css`.

2. Newsletter Signup
- Email input + subscribe button; accessible labels; show success/failure feedback.
- Files: `src/pages/english/News/News.tsx`.

## Global UI/UX

- Navigation & Language Switch: Ensure all links work and active state updates; verify English/Arabic toggle switches routes and `dir` attribute.
- Performance: Add lazy loading for media, compress/optimize images, minimize blocking resources, optimize fonts.
- Accessibility: Add alt attributes, enforce color contrast, focus indicators, use semantic HTML (`<nav>`, `<main>`, `<footer>`).
- Files: `src/components/ui/NavBar.tsx`, `src/index.css`, page components.

## Implementation Notes

- Use existing components where present (KPIStats, FeaturedProjectsCarousel); extend rather than rebuild.
- Add a `useScroll` hook or existing listener in `NavBar.tsx` to toggle `.scrolled` class for drop shadow.
- Apply `loading="lazy"` to images and optimize via `<picture>`/`srcset` for WebP/JPEG fallback.
- Unify metrics data in a single source of truth and pass props to KPIStats on both pages.
- Ensure RTL compliance by setting `dir="rtl"` when Arabic is active via LanguageContext.

## Acceptance Criteria

- Home/About show unified metrics with no duplicates; consistent design and spacing.
- Hero sections are readable, with overlay and non‑overlapping language content.
- Navbar is fixed, gains drop shadow on scroll, and active links update correctly.
- Featured projects carousel loads images lazily, supports swipe, and shows accessible controls.
- About sections are concise, properly laid out, and include CEO pull‑quote with photo.
- News page lists items with thumbnails and working “Read More”; newsletter provides feedback.
- Global: images have alt text; color contrast passes WCAG AA; focus states visible; Arabic/English toggle switches layout and direction appropriately.

If this plan looks good, I’ll proceed to implement the changes file‑by‑file and verify in the browser.