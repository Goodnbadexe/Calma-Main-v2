## Objectives
- Keep the homepage’s visuals, spacing, and motion exactly unchanged.
- Prevent accidental cross-page style bleed by isolating page-level styles and consolidating shared tokens/utilities.
- Make future edits structural (component/system level) so other pages inherit consistency safely.

## Key Findings
- Page coupling: About imports homepage CSS (`src/pages/english/About/AboutImproved.tsx:5`), which risks unintended changes when Home styles change.
- Global tokens exist in two files with overlapping names: `src/styles/color-palette.css` and `src/styles/variables.css`. Import order (`index.css` imports palette then variables) means values can be overridden unpredictably.
- Homepage uses many global classes (`section`, `section-inner`, badges, grids) defined across `index.css` and `Home.css`. Some duplication and unscoped selectors increase bleed risk.

## Design System Decisions
- Single source of truth for design tokens: unify color, typography, spacing, and shadow variables into one tokens file; avoid duplicate variable names.
- Shared utilities/components: extract reusable layout patterns (e.g., `dual-split-grid`, badges, metrics panels) into shared CSS and lightweight React components.
- Page-level isolation: convert homepage-specific selectors to page-scoped rules (namespace or CSS Modules) without changing DOM structure or class names used by tests.

## Refactor Scope (Structural, No Visual Change)
- Tokens consolidation:
  - Merge overlapping tokens, keep canonical naming, and ensure import order is stable (`tokens.css` before utilities).
  - Map legacy variables to the canonical ones to avoid breakage.
- Shared styles extraction:
  - Create `styles/sections.css` for `.section`, `.section-inner`, `.container`, vertical rhythm.
  - Create `styles/layouts.css` for `dual-split-*`, `.metrics-*`, `.snapshot-*`, `.cta-row`, `.button-link`.
  - Keep motion-related classes unchanged; reuse in shared files where applicable.
- Homepage isolation:
  - Keep `Home.css` for home-only visuals (hero video overlay, showcase decorative elements).
  - Prefix any purely home-only selectors if needed (e.g., `.home-page ...`) to eliminate unintended matches.
- Decouple About from Home:
  - Remove `Home.css` import from About and use shared `sections.css`/`layouts.css` plus `About-responsive.css` for page-specific rules.

## Verification and Safety
- Preserve tests: the existing smoke test asserts the hero title (`src/__tests__/english-home-smoke.test.tsx`); ensure class names and content remain identical.
- Add lightweight CSS snapshot tests for homepage critical selectors (hero, overlay, metrics grid) to catch regressions.
- Visual diff: run a local visual check against before/after for the homepage; ensure zero pixel-level changes for the home route.

## Rollout Steps
1. Inventory homepage selectors used in `src/pages/english/Home/Home.css` and identify which are globally reusable vs page-only.
2. Create `src/styles/sections.css` and `src/styles/layouts.css` with reusable rules copied verbatim; import them from `index.css`.
3. Update `Home.css` to remove duplicated shared rules, leaving only home-unique styles. Keep class names intact.
4. Update `AboutImproved.tsx` to stop importing `Home.css`; import the shared styles via `index.css` (already global) and rely on `About-responsive.css` for page-specific visuals.
5. Consolidate tokens by merging `variables.css` and `color-palette.css` so overlapping variables are defined once. If needed, keep one file as canonical and have the other reference it (no visual change).
6. Run tests and perform visual QA on Home, About, Projects, News, Register (both English and Arabic) to confirm stability.

## Deliverables
- Unified tokens file and import order documented.
- New shared CSS files for sections/layouts; homepage CSS reduced to page-only rules.
- About page decoupled from homepage CSS, using shared utilities.
- Regression tests for homepage critical elements and a brief `docs/ui-architecture.md` explaining the structure.

## Risks and Mitigations
- Variable name conflicts: mitigate by choosing canonical names and mapping legacy variables until references are updated.
- Hidden dependencies on Home.css from other pages: before removal, grep usages of key classes and add them to shared files first.
- Motion/perf differences: keep framer-motion configs and animation utilities unchanged; verify scroll/viewport behavior with IntersectionObserver remains identical.

## Next Actions (After Approval)
- Implement the shared files and token consolidation with zero visual diffs on the homepage.
- Refactor About to rely only on shared utilities and its own styles.
- Add tests and document the structure so future changes remain safe.