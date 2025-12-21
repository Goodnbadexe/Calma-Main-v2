## Scope
Rebuild the English About page to fully align with the Home page’s UI/UX system: white background, shared typography and spacing, consistent components, premium editorial tone. No brand/color changes, no gradients in headlines, no emojis.

## Current State Assessment
- Dark background and gradient overlay in About: `src/pages/english/About/About-responsive.css:5, 48–52`
- Hero is full-height with dual CTAs and hero stats: `AboutImproved.tsx:139–143, 214–219, 222–243`
- Gradient headline text: `About-responsive.css:82–87` + usage `AboutImproved.tsx:191–196`
- Emojis in values and leadership: `AboutImproved.tsx:58, 64, 70, 76, 107, 112, 117, 122`
- Vision/CEO sections use dark image overlays: `About-responsive.css:208–213, 230–236`
- Portfolio grid is large and numerous: `AboutImproved.tsx:433–453`

## Design Alignment Rules
- White page background and light sections using shared variables: `src/styles/variables.css`
- Use Home’s container and section rhythm: `src/pages/english/Home/Home.css:12–22`
- Reuse shared components: Button, TrustStrip, FeaturedProjects/ProjectPreviewGrid
- Typography hierarchy and spacing mirror Home
- No gradient headlines, no emojis, minimal copy

## Implementation Outline
- Refactor About into modular, editable sections under `src/pages/english/About/sections/`.
- Replace dark styling with Home’s white, premium styles. Adopt `.container` and `.section` classes from Home.
- Keep the existing hero carousel but reduce height ~45% and remove stat/extra CTA.
- Move stats mid-page using `TrustStrip` with contextual lines.
- Curate portfolio preview to 3–4 cards and unify hover behavior with Home.

## Section-by-Section Changes
### 1) Hero (Simplified)
- Reduce height: change `.hero-section` min-height from 100vh → ~55–60vh (`About-responsive.css:12–17`).
- White background: set `.about-page-container` background to `var(--color-bg-primary)` (`About-responsive.css:5`).
- Remove gradient headline; use plain premium title color `var(--color-text-primary)` (remove `hero-title-gradient`, `About-responsive.css:82–87`; update markup `AboutImproved.tsx:191–196`).
- Keep one primary CTA only (remove secondary `AboutImproved.tsx:217–219`).
- Remove hero stats block entirely (`AboutImproved.tsx:222–243`).
- Keep carousel images; lighten overlays or remove heavy dark overlay.

### 2) Our Story (New)
- Add two-column section: left image (real context), right copy explaining why CALMA was founded, the problem solved, human tone.
- Use `.container` and `.section` spacing; image `object-fit: cover`, border radius matches Home.
- Keep copy ~120–160 words, grounded, no marketing-heavy language.

### 3) Vision (Split)
- Create dedicated Vision section with one image + short paragraph (future-focused: Saudi Arabia, cities, legacy).
- Remove dense text; target ~50–70 words.

### 4) Mission (Separate)
- Follow Vision with Mission: one image + short paragraph (execution-focused: daily how CALMA works). ~50–70 words.

### 5) CEO Message (Refined)
- Add CEO portrait image (fallback `Asset-6.JPG`).
- Reduce text by ~30–35%. Extract one key quote as visual highlight.
- Clear name and title. Confident editorial layout, no dark press-release styling.

### 6) Leadership / Capabilities (Cleaned)
- Remove all emojis in data (`AboutImproved.tsx:58, 64, 70, 76, 107, 112, 117, 122`).
- Visual-first cards: image, short title, 1–2 lines max. Premium tone.
- Grid layout matching Home’s `.projects-grid` responsive behavior.

### 7) Core Pillars (Rebuilt)
- Grid of images, minimal copy. No icons/emojis.
- One image per pillar with concise title line; neutral/light section background.

### 8) Impact / Stats (Repositioned)
- Move stats to mid-page using Home’s `TrustStrip` component: `src/components/home/TrustStrip.tsx`.
- Pair each stat with one contextual subline (already present as `stat-sublabel`).

### 9) Portfolio Preview (Curated)
- Reduce to 3–4 key projects using `ProjectPreviewGrid` or a curated `FeaturedProjects` subset.
- Larger image cards; same hover behavior as Home (card lift and clarity).

### 10) Closing Section
- Short future-facing statement, Vision 2030 alignment, soft CTA (e.g., Learn About Our Approach). Generous white space.

## Shared Styles and Components
- Buttons: use existing `<Button variant="secondary" className="luxury-button">` from Home.
- Spacing: use `--section-padding-desktop`, `--section-vr-desktop` from `variables.css` to match rhythm.
- Containers: use `.container` (1200px max width) from Home CSS.
- Typography: use `--font-family-primary`, sizes via CSS vars; remove gradient fills.

## Content Strategy
- Tone: premium, calm, authoritative; grounded and human.
- Balance: ~60% visual (images/layout/spacing), ~40% concise editorial content.
- CEO message trimmed; Vision/Mission distilled; Story personable and clear.

## Accessibility & Performance
- Alt text for all images; `loading="lazy"`, `decoding="async"`.
- High contrast text on white; focus-visible for CTAs.
- Responsive grids; avoid fixed heights except hero target.

## Verification Plan
- Visual parity check with Home: background, typography, spacing.
- Scan for forbidden elements: gradient headlines, emojis, dark sections.
- Validate routing `/about` remains intact; test in dev server.
- Cross-device checks at breakpoints (mobile/tablet/desktop).

## Deliverables
- Refactored `AboutImproved.tsx` with modular sections.
- Updated About styles to white, Home-consistent spacing/typography.
- Mid-page stats using `TrustStrip`; curated portfolio preview; confident CEO section.
- Clean hierarchy, editable modular sections, premium brand feel without sales tone.