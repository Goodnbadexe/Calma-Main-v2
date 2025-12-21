## Phase 0 — Bootstrap & Manifest
- Confirm package manager: `package.json` scripts use `vite`, `vitest`, `eslint` with Node `24.x`.
- After approval: run `npm ci`, `npm run dev` to verify bootstrap.
- Manifest (initial, code-focused; sizes/last-commit captured post-approval):
  - Root config files:
    - `vite.config.ts`
    - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
    - `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `vercel.json`, `Dockerfile`
  - `src` TypeScript/TSX:
    - `src/main.tsx`
    - `src/layouts/AppLayout.tsx`
    - `src/contexts/LanguageContext.tsx`
    - `src/components/system/SplashProvider.tsx`
    - `src/components/seo/SEOHead.tsx`
    - `src/components/ui/`:
      - `NavBar.tsx`, `AnimatedNumber.tsx`, `VisionCounter.tsx`, `SmoothSlider.tsx`, `ParallaxElements.tsx`, `ParallaxSlider.tsx`, `Parallax1Slider.tsx`, `PDFViewer.tsx`, `button.tsx`, `card.tsx`, `dropdown-menu.tsx`, `ThemeToggle.tsx`
    - Pages (English):
      - `pages/english/Home/Home.tsx`, `pages/english/About/About.tsx`, `pages/english/About/AboutImproved.tsx`, `pages/english/News/News.tsx`
      - `pages/english/Projects/{Projects.tsx, Office.tsx, TownHouse.tsx, Villa.tsx, Floor.tsx}`
      - `pages/english/Register/Register.tsx`
    - Pages (Arabic):
      - `pages/arabic/الرئيسية/الرئيسية.tsx`, `pages/arabic/عن كالما/عن كالما.tsx`
      - `pages/arabic/المشاريع/{المشاريع.tsx, عرض المشاريع.tsx, تجارية.tsx, سكنية.tsx, برج كالما.tsx}`
      - `pages/arabic/تواصل معنا/{تواصل معنا.tsx, Contact.tsx}`
      - `pages/arabic/الأخبار/الأخبار.tsx`, `pages/arabic/التسجيل/التسجيل.tsx`
    - Content:
      - `pages/content/{home.en.ts, home.ar.ts}`
    - Hooks:
      - `hooks/{useSmoothScroll.ts, useSmoothSliderControls.ts, useDarkMode.ts}`
    - Utils:
      - `utils/{helpers.ts, assetResolver.ts, gsapAnimations.ts, layoutDiagnostics.ts, telemetry.ts, preflight.ts}`
    - Lib:
      - `lib/utils.ts`
    - Tests:
      - `__tests__/{english-home-smoke.test.tsx, routes-smoke.test.tsx}`
    - Types:
      - `vite-env.d.ts`
  - Styles:
    - Global: `index.css`, `pages/arabic/arabic.css`, `components/ui/ThemeToggle.css`
    - System: `styles/{variables.css, navbar.css, splash.css, smooth-slider.css, fluid-grid.css, rtl-enhanced.css, accessibility.css, dark-mode.css, color-palette.css, debug.css}`
    - Page styles: `pages/english/{Home.css, About.css, About-responsive.css, News/News.css, Projects/Project.css, Register/Register.css}`, Arabic page-specific CSS counterparts.
  - Assets (high volume; sizes to be measured post-approval):
    - Images: `src/assets/Images/**` (About/Home/Projects), Icons: `src/assets/Icons/**`
    - Backgrounds: `src/assets/Backgrounds/**`
    - Logos: `src/assets/Logos/**`
    - Fonts: `src/assets/fonts/*.otf`
    - Video: `src/assets/Videos/Calma_TV.mp4`

## Phase 1 — Static Analysis & Baseline Metrics
- TypeScript: run `tsc --noEmit -p tsconfig.app.json` and `-p tsconfig.node.json`; gather errors.
- ESLint/Prettier: run `npm run lint` and format staged files; record violations.
- Production build: run `npm run build`; capture:
  - Build time
  - `dist/` tree with artifact sizes
  - Top 30 largest modules
- Bundle analyzer: add `rollup-plugin-visualizer` (analyze mode only) and generate treemap.
- Lighthouse: run desktop/mobile (throttled) on preview; record scores for Performance, Accessibility, Best Practices, SEO.

## Phase 2 — Architecture & Code Health Map
- Directory responsibilities:
  - Pages: EN/AR route views
  - Components/ui: interactive and animated widgets
  - System: `SplashProvider` overlay experience
  - Contexts: language state & routing integration
  - Hooks: interaction, scrolling, slider controls
  - Utils: animation helpers, parallax/magnetic effects, telemetry (unused)
  - Styles: global, system, per-page CSS
- Component metrics (LOC from current files):
  - `src/components/ui/NavBar.tsx`: ~635 LOC, inline animations and portal dropdown; scroll/resize side-effects; lucide icons; anime.js usage (src/components/ui/NavBar.tsx:75–125, 140–154).
  - `src/components/ui/SmoothSlider.tsx`: >1100 LOC; custom engine, `any` types in callbacks; exposes `window.sliderControls` (src/components/ui/SmoothSlider.tsx:1118, 1131); strong candidate for isolation and lazy-load.
  - `src/pages/english/Home/Home.tsx`: ~525 LOC; heavy framer-motion and large assets; candidate for route-level code splitting.
  - `src/components/system/SplashProvider.tsx`: ~175 LOC; global overlay with `import.meta.glob` asset scanning; ensure not preloading large media.
  - `src/contexts/LanguageContext.tsx`: ~181 LOC; global language/RTL management coupled to router navigation.
- Flags:
  - Unused code: `src/utils/telemetry.ts` not imported anywhere; dead code.
  - Mixed animation stacks: framer-motion + anime.js + gsap; likely redundant.
  - Large binary assets (JPG/PNG, MP4) in `src/assets/**`; hero video `Calma_TV.mp4` likely dominates LCP.
  - Dockerfile mismatch: uses `npm start` but no `start` script; deployment on Vercel already defined.
  - Accessibility: many buttons act as links; ensure roles/aria and keyboard behavior consistent.
- Dependency graph (high-level):
  - `main.tsx` → Pages (EN/AR) → Components/ui → Hooks/Utils → Assets
  - `AppLayout.tsx` → `NavBar.tsx` (+ global CSS)
  - No circular deps observed in current scan; full graph produced post-approval via import parsing.

## Phase 3 — Performance & Build Optimizations (Planned Patches)
- Route code-splitting:
  - Convert page imports in `src/main.tsx` to `React.lazy(() => import(...))` and wrap routes in `<Suspense fallback={...}>` to create route-level chunks.
  - Lazy-load heavy UI: `NavBar`, `SmoothSlider`, `Parallax*` only on routes that use them.
- Animation rationalization:
  - Remove anime.js from `NavBar` and reimplement with CSS transitions and framer-motion where needed; eliminate gsap if not essential.
- Dead-code removal & tree-shaking:
  - Remove or gate `src/utils/telemetry.ts` behind dynamic import/feature flag; eliminate `window` global exposure in `SmoothSlider`.
- Asset optimization:
  - Convert large JPG/PNG to `.webp`/`.avif`; generate `srcset` for responsive images; ensure `loading="lazy"` & `decoding="async"` (already present in parts).
  - Hero: consider static poster first, defer video play until intersection.
- CSS/Tailwind:
  - Ensure Tailwind v4 purge is effective (`content` config present); move inline styles into CSS/Tailwind utilities; simplify page CSS where feasible.
- Bundle size optimizations:
  - Audit dependencies: framer-motion, gsap, animejs; prefer single animation lib; ensure `lucide-react` used tree-shakably (it is).
- Runtime perf:
  - Debounce/throttle handlers (NavBar already uses RAF tick gating); ensure hook-based memoization where measurable.
- Caching/CDN:
  - `vercel.json`: add appropriate `Cache-Control` for static assets (immutable long-term hashed files) and HTML.
- Tooling:
  - Add `rollup-plugin-visualizer` to `vite.config.ts` (analysis only) and generate treemap on build.

## Planned Diffs (to be raised as PRs post-approval)
- Branch: `improve/perf-and-structure`
- `main.tsx`: swap direct imports for `React.lazy` + `Suspense` route wrapper; preserve all routes and UX.
- `vite.config.ts`: add visualizer plugin for analyzer builds; no effect on production unless enabled.
- `NavBar.tsx`: drop anime.js sequences; use CSS transforms and framer-motion minimal variants; keep dropdown portal logic; ensure keyboard navigation support.
- `SmoothSlider.tsx`: isolate engine into `lib/slider-core.ts`; type callbacks precisely; remove `window.sliderControls`; export controlled API; lazy-load where used.
- `utils/telemetry.ts`: mark as experimental and dynamically import from pages that need it, or remove.
- `vercel.json`: ensure asset caching headers; verify current build command; add headers block if missing.
- Image pipeline: add script to convert assets to `.webp`/`.avif` and update imports; generate `srcset` helpers.
- Dockerfile: update to `vite preview` or mark as non-production; alternatively remove if Vercel-only.

## Verification & CI
- Tests (Vitest present):
  - Add unit tests for helpers (`formatCurrency`, `validateEmail`, etc.).
  - Add component tests for `NavBar` (dropdown, language toggle), `Home` hero lazy video behavior.
  - Add MSW for network tests if/when API added.
- GitHub Actions:
  - `lint` (ESLint + typecheck), `test` (coverage), `build`, optional Vercel preview.
- Husky pre-commit with lint-staged.

## Deliverables
- Manifest with file sizes and last commit per file (post-approval via git and build outputs).
- Static analysis summary (TypeScript, ESLint) with autofix stats.
- Build metrics + treemap; top modules list.
- Dependency graph with any circular deps flagged.
- Patch list with PRs and rationale; each PR includes Lighthouse before/after and bundle delta.
- Final annotated architecture diagram (Markdown tree + optional SVG).
- Self-critique and next steps (top 20 actions with priority/impact).

## Immediate Findings (Actionable)
- `Dockerfile` misaligned with scripts; deployment uses `vercel.json`.
- Route imports in `main.tsx` are eager; change to lazy for chunking (src/main.tsx:8–29, routes at 42–68).
- `NavBar.tsx` animation stack redundant; anime.js adds weight (src/components/ui/NavBar.tsx:75–125, 140–154).
- `SmoothSlider.tsx` is monolithic (>1100 LOC) and exposes globals; isolate and lazy-load.
- `utils/telemetry.ts` currently dead code; remove or gate.
- Large assets present; hero video should be deferred and images converted.

## Risks & Constraints
- UX animations may shift slightly when removing anime.js; mitigate with framer-motion equivalents and CSS.
- Arabic route slugs must remain functional; ensure path mappings preserved.
- Do not touch secrets or external endpoints (none present).

## Next Execution (upon approval)
1) Run Phase 1 commands and collect metrics; generate treemap.
2) Implement PR for route lazy-loading + visualizer.
3) Implement PR for NavBar animation simplification.
4) Implement PR isolating `SmoothSlider` and removing globals.
5) Implement PR for asset webp/avif + `srcset` helpers.
6) Add CI workflows and tests.
