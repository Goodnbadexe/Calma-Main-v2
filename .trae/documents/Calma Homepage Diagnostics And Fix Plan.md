## Overview

* Implement the cinematic, distinct homepage per blueprint, focusing on refined header/hero, grounded content sections, visualized metrics, a snapshot preview of Calma values, and a single teaser (“The Calma Way”).

* Keep the existing “Masterfully Crafted” section as centerpiece with minor typography/spacing refinements.

* Remove deep About-style content from Home (Leadership, Culture, CEO message) and keep it exclusively on About.

## Files To Update

* `src/pages/english/Home/Home.tsx` — restructure sections, add metrics 3-panel, add “The Calma Way”, remove Leadership/Culture/CEO.

* `src/pages/english/Home/Home.css` — hero tightening, split layout styles, metrics panel visuals, cards, hover fades.

* `src/index.css` — vertical rhythm and small global adjustments; ensure hero overlay and animation.

* `src/styles/navbar.css` — reduce logo and add subtle bottom divider.

* `src/styles/footer.css` — reduce footer logo.

* `src/styles/variables.css` — normalize spacing rhythm (72/56/40).

## Header + Hero

* Header

  * Reduce logo size by \~40% (30px → \~18px) and shrink text spacing.

  * Add a thin charcoal divider under header when in `nav-solid` state.

  * Keep glass weight lighter on white theme.

  * Where: `src/styles/navbar.css:95` (logo image sizing), `src/styles/navbar.css:52–53` (bottom border), add refined divider.

* Hero

  * Ensure hero video plays consistently; keep 15% dark overlay for readability (already present: `src/pages/english/Home/Home.css:49–62`, and `src/index.css:505–512`).

  * Title: single bold line using existing copy “Where Vision Takes Shape” (`src/pages/content/home.en.ts:2`).

  * Tighten cluster: reduce `margin-bottom` on subtitle and button; bring content closer.

  * Add a slow fade-in on page load via `framer-motion` timing (increase section fade duration from 1s to \~1.6s) and leverage existing Splash readiness (`src/pages/english/Home/Home.tsx:132–179`).

## “Redefining Luxury Living” — Dual Split

* Convert the current welcome section into a left-text/right-image split with grounded visual weight.

* Left: heading, 2–3 line paragraph, optional CTA.

* Right: impactful image (from `assets/Images/Home/*`) with soft fade or subtle parallax (motion translateY on scroll).

* Where: replace the “Welcome Section” block in `src/pages/english/Home/Home.tsx:186–199` and add split layout styles in `Home.css`.

## Metrics Block — 3 Visual Panels

* Replace the current panorama stats presentation with a 3-panel horizontal block:

  * Panel 1: “500,000+ m² of Possibilities unfolding”

  * Panel 2: “28 Landmark Developments”

  * Panel 3: “2,000+ Residents Served”

* Each panel: low-opacity background image (5–8%) that reveals to 25–35% on hover/in-view, number label fades-up elegantly (70–120ms).

* Implementation: inline in Home or as `components/ui/MetricsPanel.tsx` reusing `AnimatedNumber` and `framer-motion`.

* Where: in place of the `VisionCounter`/`panorama` section (`src/pages/english/Home/Home.tsx:201–233`).

## “ABOUT CALMA” Snapshot — 3 Cards

* Convert textual features into three minimal cards:

  * Sustainability

  * Premium Quality

  * Urban Innovation

* Each card: minimal icon/line graphic, 2–3 sentence description, faint sand/white background, hover lift 2–3px.

* Where: adapt the “About” grid in `src/pages/english/Home/Home.tsx:236–277` and corresponding CSS blocks in `Home.css`/`index.css`.

## Masterfully Crafted — Keep, Refine Only

* Keep as the signature centerpiece.

* Minor refinements: tighten typography/spacing, keep image auto-cycle soft dissolve (already using motion opacity/scale transitions: `src/pages/english/Home/Home.tsx:324–357`).

## Replace Leadership/Culture/CEO With “The Calma Way”

* Remove deep sections from Home:

  * Leadership (`src/pages/english/Home/Home.tsx:364–408`)

  * Culture (`src/pages/english/Home/Home.tsx:410–461`)

  * CEO Message (`src/pages/english/Home/Home.tsx:463–526`)

* Add a clean teaser block:

  * Title: “The Calma Way”

  * Subtitle: “We design communities with precision, purpose, and vision.”

  * Under: 3 columns — Precision, Excellence, Innovation — each a single short line and a background image that softly fades on hover.

## Footer

* Add the logo much smaller (reduce \~40%) and ensure spacing/alignments are consistent.

* Where: `src/components/ui/Footer.tsx:11` (class `footer-logo`) with sizing in `src/styles/footer.css:27–31`.

## Harmony — Spacing, Alignment, Balance

* Vertical rhythm system:

  * Desktop 72px, Tablet 56px, Mobile 40px.

  * Adjust in `src/styles/variables.css:145–147` and ensure `src/index.css:59–71` uses these.

* Headings align left unless intentionally centered; enforce via section wrappers and utilities.

* Ensure consistent image aspect ratio rules in cards and panels.

* Avoid oversized typography and color inconsistencies by reusing existing variables and type scales.

## Image & Visual Anchors

* Provide placeholders from `assets/Images/Home/*` and `assets/Icons/*` for cards/panels.

* Add subtle gradient/texture anchors behind text-only sections (‘unified-content’ style already present in `Home.css:1512–1556`).

## QA & Notes

* Verify hero video playback behavior managed by intersection observer (`src/pages/english/Home/Home.tsx:65–79`).

* Ensure the navbar transparency behavior remains smooth over hero/panorama (`src/components/ui/NavBar.tsx:32–70`).

* Keep Arabic pages unchanged in this pass; mirror later if requested.

* No duplicated content from About on Home after removal; About retains deep content.

## Deliverables

* Updated homepage structure, visuals and rhythm; corrected hero, metrics, cards; visual anchors added; proper placeholders; reduced header/footer logo sizes; spacing normalized to rhythm system.

