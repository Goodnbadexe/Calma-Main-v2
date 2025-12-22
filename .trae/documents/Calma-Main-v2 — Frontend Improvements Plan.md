## Scope & Priorities
- Focus: routing/i18n abstraction, design system, animation consolidation, hero optimization, forms UX, a11y, performance, testing.
- Target files: `src/main.tsx`, `src/contexts/LanguageContext.tsx`, `src/layouts/AppLayout.tsx`, `src/components/ui/NavBar.tsx`, `src/pages/english/Home/Home.tsx`, `src/pages/english/Register/Register.tsx`.

## Routing & i18n Abstraction
- Create `src/config/routes.config.ts` with bilingual paths per route.
- Add `src/utils/i18nPaths.ts` to generate EN/AR links and hreflang pairs.
- Refactor `src/main.tsx` to map routes from config; keep `AppLayout` wrapper.
- Expose `getDir(lang)` and apply to `<html dir>` via `LanguageProvider` to centralize RTL.
- Optional: add `<Helmet>` alternate links per route for SEO.

## Design System Foundation
- Introduce `components/ui/` with minimal primitives: `Button.tsx`, `Card.tsx`, `Section.tsx`, `Heading.tsx`.
- Encode shared tokens (sizes, radii, colors, motion durations) using Tailwind classes + small props API.
- Replace ad-hoc buttons in `NavBar` and hero with `Button` incrementally.
- Add reduced-motion aware variants to animations inside primitives where needed.

## Animation Stack Consolidation
- Standardize: Framer Motion for layout/page transitions (`AppLayout.tsx`).
- Choose one sequencing library for hero: keep Anime.js (already used) and remove GSAP usage in hero.
- Extract hero sequence into `useHeroAnimation()` hook to isolate timing/easing.
- Audit `package.json` and usage; remove unused animation deps after migration.

## Home Hero Optimization
- In `src/pages/english/Home/Home.tsx`:
  - Add static image fallback on `navigator.connection.saveData` or low bandwidth.
  - Use `poster` for video and defer `source` attach until intersect.
  - Keep IntersectionObserver; cap animation durations on mobile; prefer CSS transitions for heavy elements.
- Ensure accessible overlay contrast and test low-end device behavior.

## Forms & Conversion UX
- Enhance `src/pages/english/Register/Register.tsx`:
  - Field-level inline validation on blur/change; disable submit until valid.
  - Add hidden honeypot field and ignore submissions when filled.
  - Optimistic UI: loading → success message with next-step CTA; `aria-live` for status.
  - Show config error when `VITE_LEADS_API_URL` missing; retry option.
  - Lightweight rate-limit: disable submit briefly after attempts.

## Accessibility Enhancements
- Add skip-to-content link in `AppLayout.tsx` before `NavBar`.
- Provide explicit focus styles for interactive elements; ensure keyboard order.
- Keep `prefers-reduced-motion` respected via a shared `useReducedMotion()` utility.
- Add accessible dropdown behavior: consider Floating UI/Radix or custom hook for positioning.

## Performance & Bundle Strategy
- Preload critical fonts; ensure image CDN usage (Vercel) and HLS for long videos.
- Use route-level `Suspense` boundaries; verify lazy-loaded chunks.
- Maintain manual chunk split for `react`, `router`, `motion`; recheck visualizer reports.
- Audit third-party deps for bloat; remove unused animation libs.

## Testing & QA
- Add Playwright visual regression tests for Home, Projects, and Register flows.
- Unit tests (Vitest) for `i18nPaths`, form validation, and `useHeroAnimation()` timing.
- Lighthouse a11y/perf budget in CI and track deltas per PR.

## Deliverables & Rollout
- Config-driven routing with hreflang helpers.
- UI primitives with reduced-motion variants and initial adoption in NavBar/Hero.
- Consolidated animation usage with hero hook and fallbacks.
- Improved Register UX and bot resilience.
- a11y/perf/test baselines with CI checks.

Please confirm this plan; on approval I will implement refactors and components, migrate animations, optimize hero and forms, and add tests and budgets.