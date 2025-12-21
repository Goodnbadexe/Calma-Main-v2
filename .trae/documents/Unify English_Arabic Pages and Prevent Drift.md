## Goals
- Eliminate implementation drift between English and Arabic pages
- Share page logic/layouts while keeping locale-specific copy and RTL/LTR styling
- Gate experimental layouts/experiences behind feature flags so both locales use the same code paths

## Current State (Verified)
- English About has extra variants: `AboutImproved.tsx` and `About-responsive.css`
  - Path: `src/pages/english/About/AboutImproved.tsx`
  - Path: `src/pages/english/About/About-responsive.css`
- English Home composes many shared sections; Arabic Home is minimal
  - English: `src/pages/english/Home/Home.tsx` uses AboutCalma, Excellence, Pillars, KPIStats, TrustStrip, TestimonialsBand, ProjectPreviewGrid, MissionVision, FeaturedProjectsCarousel
  - Arabic: `src/pages/arabic/الرئيسية/الرئيسية.tsx` uses Button, VisionCounter, AnimatedNumber, FeaturedProjectsCarousel
- Projects: English includes advanced components
  - Paths: `ProjectsGrid.tsx`, `ProjectSlideOver.tsx`, `RadialNavigator.tsx`, `Projects.tsx` under `src/pages/english/Projects/`
  - Arabic has simpler pages and some reuse (`المشاريع/المشاريع.tsx`, `المشاريع/عرض المشاريع.tsx`)
- Contact: Arabic directory duplicates components
  - Arabic: `src/pages/arabic/تواصل معنا/Contact.tsx`, `src/pages/arabic/تواصل معنا/تواصل معنا.tsx`, CSS `src/pages/arabic/تواصل معنا/تواصل معنا.css`
  - English: `src/pages/english/Contact/Contact.tsx`
- Localization: No i18n library; custom `LanguageContext.tsx` stores inline translations
  - Path: `src/contexts/LanguageContext.tsx`
- RTL/LTR: `src/pages/arabic/arabic.css` exists but appears unused by imports
- KPI styles: `.kpi-grid .stat-item` defined globally
  - Path: `src/index.css:2468–2501` (e.g., `.kpi-grid .stat-item` at `src/index.css:2475`)

## Architecture Changes
1. Create shared page shells that assemble sections; locale only affects copy and direction
   - `src/components/pages/home/HomeLayout.tsx`
   - `src/components/pages/about/AboutLayout.tsx`
   - `src/components/pages/projects/ProjectsLayout.tsx`
   - `src/components/pages/contact/ContactLayout.tsx`
2. Keep locale-specific wrappers for routing only
   - `src/pages/english/Home/index.tsx` and `src/pages/arabic/Home/index.tsx` import `HomeLayout` and pass `t('...')`
   - Same for About, Projects, Contact
3. Introduce feature flags for experimental variants
   - `src/config/features.ts` with flags like `aboutImproved`, `projectsAdvancedNav`
   - Flags can vary by locale if needed: `{ en: { aboutImproved: true }, ar: { aboutImproved: false } }`

## Localization Strategy
- Retain `LanguageContext` but move strings into JSON modules for maintainability
  - `src/locales/en/home.json`, `src/locales/ar/home.json` (and `about.json`, `projects.json`, `contact.json`)
  - `LanguageContext` loads JSON per locale and exposes `t(key)`
- Add a lightweight `useLocale()` hook to read `locale`, `dir`, `t`
- Ensure components never hardcode language; all text comes from `t(...)`

## RTL/LTR Styling
- Centralize direction-aware styles using logical CSS properties instead of language-specific globals
  - Create `src/styles/rtl.css` and `src/styles/ltr.css`, or single `theme.css` using `[dir="rtl"]` overrides
  - Apply `dir="rtl"` to Arabic root wrapper; English uses `dir="ltr"`
- Remove or integrate `src/pages/arabic/arabic.css` into shared theme if it has RTL helpers
- Keep global KPI styles in `src/index.css`; ensure classes used consistently by both locales

## Page Unifications
- About
  - Move shared sections to `AboutLayout`
  - Gate `AboutImproved` via `features.aboutImproved`; selectable per locale
  - Migrate `About-responsive.css` rules into either CSS modules or shared `about.css`
- Home
  - Align Arabic Home to render the same sequence as English via `HomeLayout`
  - All section copy driven by `t('home.*')`
  - Verify KPIStats uses `.kpi-grid .stat-item` styles defined in `src/index.css`
- Projects
  - Extract advanced UI (RadialNavigator, ProjectSlideOver, 3D/scroll in `Projects.tsx`) into `ProjectsLayout`
  - If Arabic prefers simpler grid, gate advanced UI with `features.projectsAdvancedNav`
  - Share data fetching and item rendering; only text/labels localized
- Contact
  - Create `ContactLayout` with shared form, validation, and submission
  - Use locale-specific strings via `t('contact.*')`
  - Delete/merge `تواصل معنا.tsx` duplicate; keep one Arabic wrapper
  - Consolidate CSS into shared `contact.css` or CSS module

## Routing and Directory Structure
- Keep existing route paths; point them to wrappers that use shared layouts
  - Example: `src/pages/english/Contact/index.tsx` → `<ContactLayout t={t} />`
  - Example: `src/pages/arabic/تواصل معنا/index.tsx` → `<ContactLayout t={t} dir="rtl" />`
- Optionally normalize Arabic directory names to ASCII for tooling (`arabic/contact`), but preserve route slugs

## Migration Steps
1. Create shared layouts (Home, About, Projects, Contact) with props: `t`, `dir`, `features`
2. Extract English Home sections into `HomeLayout`; plug Arabic wrapper into it
3. Move About variants into `AboutLayout` and gate `Improved` via feature flag
4. Refactor Projects: move advanced components to `ProjectsLayout`; add feature flag fallback
5. Consolidate Contact: unify into `ContactLayout`, delete Arabic duplicate, centralize CSS
6. Introduce `src/locales/{en,ar}/*.json` and wire into `LanguageContext` for `t(key)`
7. Add `[dir]` handling and RTL overrides; remove/deprecate language-specific global CSS
8. Verify parity: English and Arabic render same section sequence where intended; flags control divergences

## Verification
- Snapshot compare section counts across Home, About, Projects between locales
- Manual QA both locales with `dir` set and toggling feature flags
- Confirm `.kpi-grid .stat-item` styles apply in both locales (`src/index.css:2468–2501`)
- Ensure no remaining hardcoded strings in components

## Acceptance Criteria
- Shared layouts control structure for both locales
- All text content pulled via `t(key)` from `src/locales/{en,ar}`
- Feature flags cleanly gate experimental layouts/experiences
- No duplicate page components per locale; Arabic Contact has single canonical wrapper
- RTL/LTR styling centralized; no language-specific global CSS remains
