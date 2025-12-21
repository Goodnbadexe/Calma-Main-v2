# Improvement Playbook (0 ➜ 100)

This playbook documents concrete fixes and enhancements to harden the Calma site from a routing, content, accessibility, performance, and release-readiness perspective.

## Routing and Navigation Accuracy
- Add a dedicated English Contact page and route so the "Contact" nav item no longer points to the registration form. Align `/contact` with that screen and keep `/register` for intent capture only. 【F:src/components/ui/NavBar.tsx†L227-L238】【F:src/main.tsx†L45-L55】
- Introduce the missing Arabic `/ar/register` alias to match the language toggle mapping; currently the switch can navigate to a non-existent route. 【F:src/main.tsx†L55-L69】【F:src/contexts/LanguageContext.tsx†L123-L148】
- Normalize slug usage (Arabic native vs. Latin aliases) to avoid duplicate content and ensure toggling maintains context for nested project pages.

## Internationalization Coverage
- Extend the translation dictionary with the `actions.*` keys used by navigation controls (call, open/close menu, language toggle) so ARIA labels render localized strings instead of raw keys. 【F:src/components/ui/NavBar.tsx†L240-L291】【F:src/contexts/LanguageContext.tsx†L16-L84】
- Add page-specific copy keys for hero, buttons, and footer links to remove remaining hardcoded English/Arabic strings across pages, enabling consistent locale switching.

## Forms and Data Handling
- Replace the simulated registration submit with a real API call, basic validation, and user feedback states (pending/success/error) to avoid console-only handling and blocking alerts. 【F:src/pages/english/Register/Register.tsx†L23-L120】
- Add server-side validation and spam protection (e.g., honeypot, rate limiting) before persisting leads; surface localized error messaging.

## Accessibility & Usability
- Ensure focus management and ESC key support for the mobile drawer/modal overlays for better keyboard navigation. 【F:src/components/ui/NavBar.tsx†L295-L360】
- Provide semantic headings and landmark roles per page, especially on home/news/project pages, to improve screen-reader navigation.
- Add prefers-reduced-motion guards around Framer Motion transitions (navbar overlays, page fades) to respect user motion settings. 【F:src/layouts/AppLayout.tsx†L8-L46】

## Performance & Assets
- Audit media assets (videos, panoramas, large SVGs) and introduce optimized encodings, lazy loading, or streaming. Aim for LCP-friendly hero imagery and defer non-critical animations.
- Preload critical fonts and trim unused CSS; the current navbar styling and magnetic effects load on every route and could be scoped or code-split.

## SEO & Metadata
- Add route-level `<Helmet>` metadata (title/description/og tags) for each page; today only the layout renders without per-page SEO cues. 【F:src/main.tsx†L35-L80】
- Provide hreflang links for English/Arabic pairs to clarify multilingual intent.

## Testing & Release Readiness
- Introduce integration tests for routing (nav -> correct page, language toggle keeps context) and smoke tests for critical forms.
- Expand preflight checks beyond CSS presence to cover missing assets and environment variables, and gate production builds on these checks. 【F:src/utils/preflight.ts†L1-L24】
- Add CI linting/formatting and bundle-size alerts to prevent regressions as assets evolve.

## Operational Checklist
- Document environment variables (APIs, analytics, CRM endpoints) in README and `.env.example` for consistent local/staging setups.
- Automate deployment verification (health endpoints, uptime checks) and monitor client-side errors via logging/observability.
