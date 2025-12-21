## General Cleanup
- Tagline duplication: Make `homeEn.heroTitle` the only per-page tagline; remove duplicates like `MissionVision` heading in `src/components/home/MissionVision.tsx:13`. Keep one H1 in hero; move secondary slogans into section intros.
- Scroll-to-top: Add a route-change effect in `src/layouts/AppLayout.tsx` to call `window.scrollTo({ top: 0, behavior: 'auto' })` on `location.pathname` changes to prevent About opening at the bottom.
- Language switch: Keep `/` ↔ `/ar` mapping using `src/utils/i18nPaths.ts`, but update action buttons to use language-aware paths (e.g., register button in `src/components/ui/NavBar.tsx:287` to navigate to `/ar/register` when Arabic).
- RTL consistency: Reuse English layout components for Arabic pages with `dir="rtl"` and mirrored spacing. Scope CSS to language containers to avoid cross-language style bleed (Arabic home currently imports English `Home.css` in `src/pages/arabic/الرئيسية/الرئيسية.tsx:1`).
- Accessibility: Add/verify `aria-label`, `aria-live`, and roles on interactive controls (project grid cards, sliders, language toggle, tel/WhatsApp icons); ensure all form fields have labels and `aria-invalid` when errors.

## Home (EN `/`, AR `/ar`)
- Hero overlap: Ensure only one language hero renders per route and scope overlays. Remove duplicate tagline from `MissionVision` or make it context-aware so it doesn’t repeat the hero title. Confirm Arabic hero uses RTL and doesn’t pull English overlay classes.
- Impact metrics: Standardize KPI section using `AnimatedNumber` for all metrics with explicit labels. Use existing `src/components/home/KPIStats.tsx` and align CSS in `src/index.css:2468` `.kpi-grid` to ensure number+label layout is consistent.

## About (EN `/about`, AR `/ar/about`)
- Missing counters: Introduce a small counters component that uses `AnimatedNumber` with `triggerOnView=false` to guarantee rendering in long pages; replace static numbers in `src/pages/english/About/About.tsx:354, 537` and equivalent Arabic.
- Content duplication: Consolidate hero messaging; reference shared content from `src/pages/content/home.en.ts` and Arabic content files to avoid copy-paste duplication.
- Navigation aids: Add intra-page anchor links (Vision, Mission, Leadership) and a sticky subnav for quick jumps within About.

## Projects (EN `/projects`, AR `/ar/projects`)
- Replace radial slider: Remove or demote `RadialNavigator` (`src/pages/english/Projects/RadialNavigator.tsx`) and use the existing grid (`src/pages/english/Projects/ProjectsGrid.tsx`) with category chips and search as the primary navigation.
- Real names: Replace placeholders `Premium Development N` in `src/pages/english/Projects/Projects.tsx:54-68` with meaningful sample names or source from a data file; add TODOs where final names are needed.
- Detail pages: Wire `ProjectCard` (`src/components/home/ProjectCard.tsx`) `href` to `/projects/:slug` and populate slugs. Extend `src/data/projects.ts` to include specific projects (e.g., `one-tower`, `calma-tower`) beyond category slugs; ensure `src/pages/ProjectPage.tsx` renders them.
- Category filters: Create dedicated category pages under `/projects/villa`, `/projects/floor`, `/projects/townhouse`, `/projects/office` (EN) and `/ar/projects/...` (AR) that render a filtered `ProjectsGrid` view. Update router (`src/main.tsx`) and Nav dropdown (`src/components/ui/NavBar.tsx:548-573`) to point to these pages (not stubs like `/ar/projects/calma-tower`).

## News (EN `/news`, AR `/ar/news`)
- LinkedIn statistics: Add labels to likes/comments/shares already shown in `News.tsx` and Arabic `الأخبار.tsx`; ensure headings communicate what numbers represent. Remove unlabeled numbers if any occur.
- Read More links: Use `article.link` from `src/data/news.en.ts` and `news.ar.ts` when present; if missing, add TODOs to supply real URLs and disable the button.
- Newsletter: Add a privacy note below the form (“We value your privacy; your email will only be used to send updates”). Client-side email validation with user-friendly messages; mark invalid inputs with `aria-invalid` and show inline errors.

## Contact (EN `/contact`, AR `/ar/contact`)
- Call/WhatsApp: Wrap actions with a confirmation prompt before dialing/opening chat. Ensure `aria-label/title` are present on the icon buttons.
- Register Your Interest: Fix header button to navigate to `/register` (EN) and `/ar/register` (AR); update `NavBar` and any page-level CTA.

## Register (EN `/register`, AR `/ar/register`)
- Submit button: Ensure it’s visible and consistent on both EN & AR (already present in EN `src/pages/english/Register/Register.tsx:333` and AR `src/pages/arabic/التسجيل/التسجيل.tsx:207`). Review styling for prominence.
- Validation: Extend existing client-side checks; add `aria-invalid`, inline error messages, and prevent submission with clear guidance. Keep privacy checkbox required and wire actual policy links to a `/privacy` and `/terms` page or external URLs; add TODOs if links are pending.
- Arabic alignment: Audit label/input alignment under RTL; fix spacing and text alignment where needed.

## Synchronize Arabic & English
- Mirror improved layouts in Arabic by reusing the same components with translated content and RTL wrappers. Ensure `LanguageContext` correctly sets `dir` and body classes (`src/contexts/LanguageContext.tsx:140-146`).

## Code Changes Summary (key files)
- Routing: `src/main.tsx` (add category pages, ensure `/projects/:slug` links), `src/utils/i18nPaths.ts` (extend mapping for new subpaths).
- NavBar: `src/components/ui/NavBar.tsx` (language-aware register path, dropdown links point to new category pages, confirm dialogs for call/WhatsApp).
- Home: `src/pages/english/Home/Home.tsx` and `src/components/home/MissionVision.tsx` (remove duplicate tagline, ensure single H1), Arabic home `src/pages/arabic/الرئيسية/الرئيسية.tsx` (avoid importing EN CSS that causes overlap).
- Projects: `src/pages/english/Projects/ProjectsPage.tsx`, `ProjectsGrid.tsx`, `ProjectCard.tsx` (link to detail pages), data in `src/data/projects.ts`.
- About: `src/pages/english/About/About.tsx` / `AboutImproved.tsx` (use `AnimatedNumber` counters, anchor subnav); Arabic equivalents.
- News: `src/pages/english/News/News.tsx` and `src/pages/arabic/الأخبار/الأخبار.tsx` (Read More links, privacy note, email validation).
- Styles: `src/index.css` (kpi-grid, accessibility tweaks), language-scoped overrides.

## TODOs To Leave In Code
- Project naming: TODO in data files where real project names are pending.
- News links: TODO on `CompanyNewsItem.link` entries to replace `#` with real URLs.
- Privacy/terms URLs: TODO in Register pages to confirm final policy endpoints.

## Verification
- Run dev server and navigate all routes (EN/AR) to confirm top-of-page load and correct language toggling.
- Validate Projects grid filtering and detail navigation (`/projects/:slug`) and category pages.
- Check counters render on About/Home; scroll to sections; anchors jump correctly.
- Confirm Contact actions show prompt before dialing and open WhatsApp chat; verify register CTA routes.
- Test newsletter email validation messages and privacy note visibility.
- Review RTL alignment on Arabic pages for forms, grids, and headings.

If you approve, I’ll implement these changes and leave TODO comments where content decisions are required.