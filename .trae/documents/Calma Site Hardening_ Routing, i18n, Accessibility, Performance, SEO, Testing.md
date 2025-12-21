## Routing and Navigation
- Create `src/pages/english/Contact/Contact.tsx` with hero, details, and `SEOHead`.
- Wire `/contact` in `src/main.tsx:53-59` (English) similar to other pages; keep `/register` for intent capture.
- Update English Contact nav action in `src/components/ui/NavBar.tsx:246-256` to navigate to `/contact` instead of `/register`; Arabic keeps `/ar/contact`.
- Add Arabic alias route `/ar/register` in `src/main.tsx:60-75` mapped to `ArabicRegister` to match `LanguageContext` toggles.
- Normalize slug usage via a central `src/utils/i18nPaths.ts` mapping EN↔AR paths and use it inside `LanguageContext.setLanguage` (`src/contexts/LanguageContext.tsx:141-166`) and dropdown/link builders. Replace hardcoded strings with `paths.to(lang, currentPath)`.

## Internationalization Coverage
- Extend translations with missing action keys used in NavBar:
  - Add `actions.call`, `actions.whatsapp`, `actions.register`, `language.switchTo` already exists; verify usage in `src/components/ui/NavBar.tsx:261-299, 300-310`.
- Add page-specific keys for hero titles, button labels, footer links; extract remaining hardcoded EN/AR strings across pages into `LanguageContext` or per-page dictionary.
- Use `tr()` fallback pattern in NavBar (`src/components/ui/NavBar.tsx:159-163`) while migrating strings incrementally.

## Forms and Data Handling
- Replace simulated submit in `src/pages/english/Register/Register.tsx:68-87` with real API:
  - Create `src/services/api.ts` exporting `submitLead(formData)` that POSTs to `import.meta.env.VITE_LEADS_API_URL` with `Content-Type: application/json`.
  - Add basic client-side validation already present; extend to phone format and required fields; show pending/success/error states via `isLoading`, `success`, `errors`.
  - Add honeypot field (hidden input) and lightweight client-side rate limit (timestamp in `localStorage`).
  - Localize success/error messages using `useLanguage.t`.
- Server-side: validate payload and spam guard (honeypot, rate limiting); handle 4xx/5xx with localized feedback.

## Accessibility & Usability
- Ensure mobile drawer focus management:
  - Return focus to burger button on close; set `aria-expanded` on trigger (`src/components/ui/NavBar.tsx:300-309`).
  - Maintain ESC support already present (`src/components/ui/NavBar.tsx:327-351`); trap Tab cycle implemented (`src/components/ui/NavBar.tsx:331-349`).
  - Set `aria-hidden="true"` on background when drawer open; keep `role="dialog"` (`src/components/ui/NavBar.tsx:321-326`).
- Add semantic landmarks: confirm `<main>` on pages like Register (`src/pages/english/Register/Register.tsx:105`); ensure headers use appropriate levels across home/news/projects.
- Respect `prefers-reduced-motion`:
  - Gate Framer Motion transitions in `src/layouts/AppLayout.tsx:26-64` using `window.matchMedia('(prefers-reduced-motion: reduce)')` and disable/shorten transitions.
  - Avoid smooth scroll when reduce is set; update NavBar scroll calls (`src/components/ui/NavBar.tsx:201-205, 212-216, 237-241, 249-253`).

## Performance & Assets
- Audit large media (videos/panoramas/SVGs); convert to optimized formats (AVIF/WebM), add `loading="lazy"`, `decoding="async"` on images.
- Preload critical fonts and scope navbar effects CSS:
  - Add `<link rel="preload" as="font" ...>` for brand fonts in `index.html` or extend `SEOHead` for route-level fonts.
  - Code-split heavy sections where feasible (maintain existing `React.lazy` in `src/main.tsx:8-26`).
- Trim unused CSS; move magnetic/nav-specific styles to a module loaded only on pages that need them; verify `index.css` bulk usage.

## SEO & Metadata
- Use `SEOHead` per page to set title/description/OG/Twitter; ensure pages missing metadata add it (home, about, projects, news).
- Add `hreflang` pairs:
  - For each EN/AR page, add `<link rel="alternate" hreflang="en" href="/path" />` and `hreflang="ar" href="/ar/path"` via `SEOHead` or per-page head.
- Add canonical URLs and structured data updates for article/news pages.

## Testing & Release Readiness
- Add integration tests verifying:
  - Nav items route correctly; Contact goes to `/contact` in EN and `/ar/contact` in AR.
  - Language toggle preserves context across nested project pages using new `i18nPaths`.
  - Register form smoke: required validation, success path with mocked API.
- Expand preflight beyond CSS (`src/utils/preflight.ts:1-28`):
  - Check required env vars (`VITE_LEADS_API_URL`, analytics keys), presence of critical assets, and fail/gate in production builds or warn in dev.
- CI:
  - Add GitHub Actions with lint (`npm run lint`), test (`npm run test`), build size report using `rollup-plugin-visualizer`, and threshold alerts.

## Operational Checklist
- Document required env vars and endpoints in `README.md` and `.env.example` (lead API, analytics, CRM).
- Add simple health check route or endpoint; monitor client-side errors via lightweight logging/observability (Sentry or custom). 

## Verification Plan
- Run existing tests and new route/form tests; ensure Vitest setup (`src/test/setup.ts`) covers i18n.
- Manual verify:
  - English Contact renders at `/contact`; Arabic Contact at `/ar/contact`.
  - Toggle language from `/register` maps to `/ar/register` correctly (`src/contexts/LanguageContext.tsx:151-161`).
  - Mobile drawer focus and ESC behavior; reduced motion disables overlay/page fades (`src/layouts/AppLayout.tsx:31-39, 44-59`).
- Measure bundle and LCP impact after asset optimizations.

## Risks & Mitigations
- Route mapping changes can break deep links; mitigate with redirects/aliases maintained in `i18nPaths`.
- Added env requirements block builds; provide clear `.env.example` and preflight messages.
- Animation changes might affect perceived polish; gate via prefers-reduced-motion only.