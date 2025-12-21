# Backend Diagnostics Report

Summary of backend gaps and remediation tasks to make the site production-ready. Focuses only on server/API, data, and observability concerns.

## Missing or Stubbed Integrations
- **LinkedIn feed endpoint absent**: The News page calls `/api/linkedin` but falls back to mock data when the request fails. Implement an API route/service to fetch LinkedIn content (or integrate the LinkedIn Marketing API) and add error instrumentation plus retries.
  - Evidence: `fetch('/api/linkedin')` with mock fallback in `src/pages/english/News/News.tsx`.【F:src/pages/english/News/News.tsx†L86-L102】
- **Placeholder image service not provided**: Both English and Arabic News pages reference `/api/placeholder/...` URLs for post and article images, but no placeholder endpoint exists. Replace with a real image CDN or implement a lightweight placeholder generator route.
  - Evidence: Placeholder URLs in `src/pages/english/News/News.tsx`.【F:src/pages/english/News/News.tsx†L19-L79】
- **Registration form only simulates submission**: The registration form waits two seconds, logs to console, and shows an alert instead of sending data to a backend. Wire this to a persistence/API layer (e.g., POST to CRM, email service, or database) with server-side validation and spam protection.
  - Evidence: Simulated submission and alert in `src/pages/english/Register/Register.tsx`.【F:src/pages/english/Register/Register.tsx†L63-L75】

## Observability and Telemetry
- **Telemetry not persisted or exported**: The telemetry manager queues events but only logs to console and localStorage; the actual send is left as a TODO. Add a configurable transport (e.g., POST to an analytics/observability endpoint or vendor SDK) with backoff and auth, and expose environment-based enable/disable flags.
  - Evidence: TODO for analytics service in `src/utils/telemetry.ts`.【F:src/utils/telemetry.ts†L303-L327】

## Configuration and Environment
- **No backend configuration surface**: There is no `.env.example` or config module for API keys, endpoints, or feature flags. Add typed environment accessors and runtime validation (e.g., `zod` schema) so deployments fail fast when backend credentials are missing.
- **Lack of error handling pathways**: Pages with async calls (e.g., News feed) lack centralized error reporting and user-facing fallback messaging from a backend status. Add a shared API client that normalizes errors, handles retries, and forwards issues to observability.

## Data Governance
- **No persistence or storage strategy**: Inputs from forms and telemetry are not persisted or secured. Define data flow for PII (where stored, retention, encryption, access controls) and ensure requests are sent over HTTPS with CSRF/spam protections (captcha/rate limiting) once backend endpoints exist.

## Dead/Unused Backend Hooks
- **Telemetry hook available but unused**: `useTelemetry` (from `src/utils/telemetry.ts`) exposes backend-bound tracking functions but is not consumed by pages. Either integrate it where meaningful events occur (form submissions, downloads) or remove until transport is in place to avoid unused code paths.

## Release Checklist (Backend)
- Stand up required API routes/services (`/api/linkedin`, placeholder image provider, form submission endpoint) with validation, authentication, and logging.
- Centralize API access in a typed client (with retries, timeouts, and base URL from environment variables).
- Add environment schema and sample file documenting required backend secrets/URLs.
- Connect telemetry transport to your chosen analytics pipeline and gate it by environment.
- Implement storage/queue/CRM integration for form submissions with anti-abuse measures.
- Add integration tests or contract tests for API routes once implemented.
