## Header/Nav
- Reduce fixed height and padding to slim the bar:
  - Decrease `--nav-height` and inner padding in `src/styles/navbar.css:13,74`.
  - Keep height stable on scroll/click; avoid any min-height changes.
- Remove the grey/white band by tightening top spacing and ensuring the hero starts directly under the header.
- On smaller screens, collapse secondary actions (language toggle, register) into the mobile drawer where they already exist.
  - Confirm current mobile drawer behavior in `src/components/ui/NavBar.tsx:333-533`.

## Hero
- Ensure a primary CTA is visible above the fold after header slimming.
- Differentiate primary/secondary CTAs by color contrast: primary uses brand green, secondary stays outline.
  - Button styles already exist in `src/pages/english/Home/Home.css:118-157,695-712`.
- Shorten hero copy to improve CTA visibility by editing `src/pages/content/home.en.ts`.

## Brand Pillars / Value Proposition
- Keep pillars immediately following the hero and normalize spacing with section defaults.
  - Component at `src/components/home/Pillars.tsx`.
- Confirm heading emphasis consistency for “Precision”, “Excellence”, “Innovation”.

## Ethos / Sustainability
- Use 3-card layout with icons and short descriptions (already implemented).
  - Verify spacing and visual hierarchy in `src/components/home/AboutCalma.tsx:55-73`.
- Keep this section before the KPI stats to communicate philosophy first.

## Impact by the Numbers
- Fix the “0+ Units Delivered” animation artifact by updating the formatter logic:
  - In `src/components/ui/AnimatedNumber.tsx:35-45`, suppress the `+` until `displayValue >= 1` and clamp the starting value to 1 when the original input includes `+`.
- Ensure consistent number formatting (commas/spaces) via the same formatter.
- Data source validated in `src/components/home/KPIStats.tsx:10-24`.

## Projects Preview Cards
- Provide unique descriptors for each card instead of a shared line:
  - Move descriptor strings into the items array in `src/components/home/ProjectPreviewGrid.tsx:6-10` and remove the override at `:21`.
- Keep consistent card size and spacing; confirm `.projects-grid` breakpoints in `src/index.css`.
- Add subtle hover reveal (already present); optionally include a “Learn More” link next to “View Project”.
- Optional: group previews by type (Residential vs Tower) using simple headings or tabs.

## Testimonials
- Add avatars or initials next to names and include city/project context.
  - Update markup in `src/components/home/TestimonialsBand.tsx:33-55` to include an avatar/initial chip and a project label.
- Convert the grid to a compact carousel for space efficiency (reuse Embla setup from Featured Projects).

## Duplicate “Discover More”
- Remove the duplicate section at the end of the page:
  - Delete the second `ProjectPreviewGrid` in `src/components/pages/home/HomeLayout.tsx:26`.
- Keep a single, well-named preview section and position it before Testimonials or right after KPIs.
  - Reorder sections to: Hero → Pillars → AboutCalma → KPIStats → ProjectPreviewGrid → Testimonials → FeaturedProjects (optional) → Footer.

## Footer
- Remove redundant hero-style tagline/description to avoid repetition.
  - Edit `src/components/ui/Footer.tsx:13,15-17` to condense copy and focus on navigation and contact.
- Keep clear headings for “Explore” and “Connect” and include copyright (already present at `:49`).
- Optionally add address/email if available.

## Interaction & Responsiveness
- Verify active nav link state and hover/press feedback across buttons and links (present in existing CSS).
- Ensure `.projects-grid` stacks to one column on mobile and cards remain tappable with adequate spacing.
- Confirm CTA buttons remain legible and accessible on small screens.

## Implementation Steps
1. Header slimming & stability: update `navbar.css` sizes and spacing.
2. Hero visibility: shorten subtitle in `home.en.ts` and validate CTA contrast.
3. Pillars/Ethos spacing confirmation.
4. AnimatedNumber formatter fix to avoid `0+` edge case.
5. Project cards: unique descriptors and optional type grouping.
6. Testimonials: avatar/context + carousel.
7. Home layout: remove duplicate `Discover More` and reorder sections.
8. Footer cleanup.
9. Pass through for Arabic home to mirror structural tweaks (`src/pages/arabic/الرئيسية/الرئيسية.tsx`).

## Validation
- Run locally and verify:
  - Header height stability on click/scroll; no extra band above.
  - Hero shows at least one CTA above the fold on common viewports.
  - KPI “Units Delivered” animates without `0+` at start.
  - Unique project descriptors and consistent card spacing.
  - Testimonials carousel functions; avatars/initials render.
  - Only one “Discover More” section; placement aligns with flow.
  - Footer focuses on navigation and contact.
- Test breakpoints: 1440, 1024, 768, 414 widths.

## Notes
- No copy changes beyond shortening the hero subtitle.
- All updates are scoped and reversible; no secrets or environment changes.
- After approval, mirror necessary UI changes in Arabic pages and ensure RTL layouts remain intact.