# CALMA Website: Routing, i18n, Accessibility, Performance, SEO, Testing

## Environment Variables
- `VITE_LEADS_API_URL`: API endpoint to receive registration leads.
- Optional: `VITE_ANALYTICS_KEY`: Client analytics key.

Copy `.env.example` to `.env` and fill values for local/staging builds.

## Routing Updates
- English Contact page available at `/contact`.
- Arabic alias `/ar/register` added to align with language toggles.
- Path toggling normalized via `src/utils/i18nPaths.ts`.

## Internationalization
- Extended action translations: `actions.call`, `actions.whatsapp`, `actions.register`.
- Use `tr()` fallback in NavBar during incremental migration.

## Forms
- Registration form posts to `VITE_LEADS_API_URL` with validation and feedback.
- Honeypot field `website` and client-side rate limiting.

## Accessibility
- Mobile drawer: focus return to burger, `aria-expanded`, ESC handling, focus trap.
- Page transitions gated by `prefers-reduced-motion`.

## SEO
- Route-level metadata per page via `SEOHead`.
- Hreflang alternates added for EN/AR pairs.

## Testing
- Vitest tests for routing and form submission.
- Test stubs added for carousel dependency during unit tests.

## Preflight
- Dev preflight warns on missing env vars and critical assets.
