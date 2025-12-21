## Structural & Layout Gaps
- Sections sit too tall due to `min-height: 100vh` on `.section` in `src/index.css:175-184`, causing visual dead zones and rhythm drift; `Home.css` also redefines `.section` padding, compounding inconsistency.
- Mixed containers (`.container` at `Home.css:14-18` = 1200px vs `.section-inner` at `Home.css:399-408` = 1600px) create misaligned content gutters.
- Thin anchors: no featured projects carousel, testimonial band or trust-number strip; metrics are isolated and feel repetitive adjacent to “Excellence” highlights.
- Rotated image grid in “Excellence” looks ornamental rather than architectural (`Home.css:851-906`), consuming space without narrative.

## Branding & Storytelling Weaknesses
- Typography conflict: `Home.css:4-11` sets `'Montserrat'`, while global brand fonts use `'Bluteau Arabic Sans'`/`'Spica Arabic'` (`src/index.css:153-161`), diluting identity.
- Brand narrative present on calma.sa (“We craft the contours of tomorrow” and Vision 2030 alignment) is only lightly echoed by `homeEn.heroTitle` and `heroSubtitle` (`src/pages/content/home.en.ts:2-5`); missing deeper mission/vision blocks.
- Metrics mismatch: homepage shows `500000+ m²` (`Home.tsx:246-248`) while calma.sa highlights +77,097 sqm land, +130,000 sqm built, 28 projects, +700 units.
- Values icons are raster PNGs (`Home.tsx:296-307`), undermining luxury tone versus vector/engraved treatments.

## Visual & UI Issues
- Hero has strong video but lacks supporting hierarchy and cues: single CTA (`Home.tsx:176-183`), no secondary action, no scroll indicator, no ambient motion after load.
- Color drift: footer uses `--color-sage` (`src/styles/footer.css:3`) while brand primary/secondary are deep charcoal and bronze (`src/styles/color-palette.css:4-17`), leading to tonal inconsistency at site endpoints.
- Gold accents defined in multiple places with different tokens (`index.css:637-647`, `color-palette.css:112-121`, `Home.css:449-475`), producing non-unified highlights.
- Section overlays/gradients vary between files (`Home.css:101-114` vs `index.css:492-499`), risking uneven hero legibility.

## Content Alignment Issues
- Headings like “Redefining Luxury Living” (`Home.tsx:200`) are generic and not anchored to Calma’s precision/sustainability/urban innovation pillars.
- Copy blocks are short and non-progressive; the homepage lacks a mission stanza, a proof stack, and project-led storytelling.
- Micro-content toggles exist (`showMicroContent` `Home.tsx:41`) but the phrases (“Designed for elegant living.” `Home.tsx:227-230`) read ornamental rather than brand-anchored.

## Missing Functional Elements
- CTA system is underdeveloped: single hero CTA, sparse repetition, no bottom-of-page conversion.
- Absent: featured project slideshow, testimonial/client story band, structured project previews, trust indicators (years, delivered units, partners), and navigation helpers (breadcrumbs, language prominence).

## Vision Integration
- “Where Vision Takes Shape” appears (`home.en.ts:2`) but the page doesn’t embed Vision 2030 context or sustainability intent beyond short badges.
- No visual narrative layering (timelines, maps, pillar modules) that make “vision” tangible and future-ready.

## Implementation Plan
- Unify typography: remove Montserrat from Home, apply brand fonts; audit weight/size/spacing across hero, h2/h3, body.
- Normalize section rhythm: drop `min-height: 100vh` on `.section`; consolidate padding to design tokens; align containers to a single max-width.
- Strengthen hero: add secondary CTA (“Get Brochure”), scroll cue, subtle ambient entrance; tighten headline and subhead tracking.
- Build Featured Projects carousel: use existing showcase styles (`index.css:2035-2140`) and real projects; 3–5 slides.
- Add Trust Strip: metrics mapped to calma.sa values; animated counters with accurate numbers; partner logos row.
- Introduce Testimonials band: 2–3 client vignettes with portrait/thumb and short quotes.
- Project preview grid: consistent cards adopting `project-showcase-card` styles; each with category, stat highlight, CTA.
- CTA cadence: reinforce at end of each section; final footer-top conversion bar.
- Color system alignment: refactor footer/nav accents to brand primary/bronze; harmonize gold tokens to one source (`color-palette.css`).
- Replace raster icons with SVG; refine snapshot cards to feel engraved/minimal.
- Micro-interactions: add scroll-based fades, parallax, and measured transitions; avoid gimmick rotations.
- Mission/Vision blocks: embed a two-column mission/vision section and a sustainability commitment aligned to Vision 2030.

## Deliverables
- Updated Home.tsx and Home.css for layout/typography/colors.
- New components: `FeaturedProjects`, `TrustStrip`, `TestimonialsBand`.
- Footer redesign using brand palette and clear information hierarchy.
- Content rewrites: hero, pillars, mission/vision, project intros.

## Acceptance Criteria
- Typography uses brand fonts site-wide and meets AA contrast.
- Hero presents two CTAs, scroll cue, and clean hierarchy; video legible.
- Featured projects and testimonials render responsively; interactions smooth at 60fps.
- Trust metrics match calma.sa and are consistent across modules.
- Footer color/palette harmonized; navigation clear and consistent.
- No visual dead zones; sections have balanced density and rhythm.

Please confirm to proceed with implementing these changes.