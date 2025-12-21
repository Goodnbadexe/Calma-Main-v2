## Summary
- Align navigation with expectations by adding an English Contact page and route.
- Confirm and solidify ARIA i18n keys used by navigation for accessibility.
- Reduce initial payload by deferring heavy media, compressing assets, and gating large files.

## Contact Page & Routing
- Create `src/pages/english/Contact/Contact.tsx` modeled on the Arabic page at `src/pages/arabic/تواصل معنا/Contact.tsx` (keep content minimal: company contact details + simple form or CTA).
- Register an English route `/contact` in `src/main.tsx` alongside existing English routes.
- Update `src/components/ui/NavBar.tsx` to point the English "Contact" item to `/contact` instead of `/register` and ensure active styling is consistent.
- Add a `SEOHead` entry for the Contact page (title + description) if `SEOHead` is used elsewhere.
- Extend tests: add a smoke test asserting `/contact` renders in `src/__tests__/routes-smoke.test.tsx` and add a nav flow test for the English header.

## ARIA i18n Keys
- Verify keys: `actions.openMenu` and `actions.closeMenu` exist in `src/contexts/LanguageContext.tsx` for both EN/AR (references: `src/contexts/LanguageContext.tsx:52–53`, `:94–95`).
- Confirm usage in NavBar: `aria-label`/`title` callsites are present (references: `src/components/ui/NavBar.tsx:304`, `:306`, `:363`). No changes needed if strings are correct; otherwise update values to meaningful phrases.
- Audit other `actions.*` usages via a quick search; add any missing keys to `LanguageContext` to prevent raw key fallback from surfacing.
- Optional: implement a safe fallback (return English string for missing keys) to avoid leaking raw i18n keys to assistive tech.

## Media Optimization
- Videos: stop bundling large MP4s via ES imports. In English Home (`src/pages/english/Home/Home.tsx`) and Arabic Home (`src/pages/arabic/الرئيسية/الرئيسية.tsx`), replace `import calmaTV from ...` with a public/CDN URL. Set `<video preload="none" poster={...}>` and only attach the `src` when the video enters viewport (IntersectionObserver) to avoid network on initial load.
- Images/Galleries: switch eager `import.meta.glob(..., { eager: true })` usages to lazy (`eager: false`) in gallery components like `src/components/ui/ProjectGallery.tsx` and `src/components/home/FeaturedProjects.tsx`. Load assets on demand using dynamic import when a section becomes visible.
- SVG Map: investigate `src/assets/Images/Projects/Map.svg`. If used, replace with a lighter vector (svgo-optimized) or rasterized alternative loaded lazily. If unused, exclude it from globs so it doesn’t ship.
- Build compression: add a compression plugin to Vite and enable gzip/brotli for production (`vite-plugin-compression`). Configure `build.rollupOptions.manualChunks` so media-heavy sections form separate chunks, and set appropriate cache headers.
- UX polish: index CSS already includes "Suspense skeleton styles"; wrap lazy sections in `<Suspense>` and show skeletons during loading for better perceived performance.

## Verification
- Bundle analysis: add an npm script `analyze` that runs `vite build --mode analyze`; inspect `dist/bundle-treemap.html` to confirm reductions.
- Tests: run `npm run test` and ensure routes/nav tests pass.
- Manual QA: open `/contact` in preview/dev, verify it renders correctly; tab through the NavBar and confirm ARIA labels read properly.
- Perf checks: run Lighthouse and verify improved LCP/Total Blocking Time and media transfer sizes.
