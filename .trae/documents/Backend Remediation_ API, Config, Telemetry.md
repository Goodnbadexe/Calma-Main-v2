## Current State
- LinkedIn route exists in `api/linkedin/posts.ts` and is consumed by both News pages:
  - Client calls at `src/pages/english/News/News.tsx:70` and `src/pages/arabic/الأخبار/الأخبار.tsx:69`.
  - Server handler at `api/linkedin/posts.ts:105` with caching (`ttlMs`), env-based auth, and 503 fallback.
- Newsletter endpoint exists: `api/newsletter/subscribe.ts:3` (POST-only, basic validation).
- Placeholder images use `/api/placeholder/...` but no route exists; referenced in `src/pages/english/News/News.tsx:31,52` and `src/data/news.en.ts:18,27,36`, plus Arabic equivalents `src/pages/arabic/الأخبار/الأخبار.tsx:30,51` and `src/data/news.ar.ts:18,27,36`.
- Registration forms simulate submission: `src/pages/english/Register/Register.tsx:80-87` and `src/pages/arabic/التسجيل/التسجيل.tsx:60-64`.
- Telemetry queues but does not send; TODO at `src/utils/telemetry.ts:310-327`. Hook `useTelemetry` is exported at `src/utils/telemetry.ts:429-439` but unused.
- No centralized API client; fetches are inline.
- No `.env.example` and no typed env validation; env is read directly in server functions.

## Implement/Upgrade API Routes
1) LinkedIn feed hardening
- Keep `api/linkedin/posts.ts` but add:
  - Structured response schema validation and mapping.
  - Metrics backfill and error instrumentation with rate-limit/circuit breaker.
  - Configurable `s-maxage`, `max-age`, and `LINKEDIN_API_VERSION` validation.
  - Observability hooks: emit telemetry `error` on non-200 (`News.tsx:85` and Arabic `الأخبار.tsx:84`).

2) Placeholder image provider
- Add `api/placeholder/[width]/[height].ts` (or `api/placeholder.ts` with query params) to return a small SVG/PNG placeholder:
  - Accept `w`, `h`, optional `text`, `bg`, `fg`.
  - Set `Cache-Control` headers and content-type.
  - Basic input validation and 400 on invalid sizes.
  - Optionally switch to CDN (`https://placehold.co`) via env flag.
  - Update references in `src/data/news.*` and mock posts to use the provider/CDN.

3) Registration submission endpoint
- Add `api/register/submit.ts`:
  - Validate payload with schema (name, email, consent flags) and normalize.
  - Anti-abuse: hCaptcha/Recaptcha verification, IP-based rate limiting, and CSRF token for SSR form posts.
  - Persistence integration via adapter: CRM (HubSpot/Salesforce), email (Resend/SendGrid), or queue (Supabase/Vercel KV) behind an interface.
  - Return 202 on accepted with request ID; 400/429/500 on errors.
  - Emit telemetry events for success/failure.

4) Telemetry transport endpoint (if not using vendor SDK)
- Add `api/telemetry/ingest.ts` to accept batched events from the client:
  - Verify auth (shared secret or signed JWT) and environment gating.
  - Validate event schema, apply backpressure and sampling.
  - Store to chosen analytics pipeline or forward to vendor.

## Shared Client and Error Handling
- Create `src/utils/apiClient.ts`:
  - Base URL from env, JSON fetch with timeouts (`AbortController`) and retries (exponential backoff).
  - Standardized error type with `status`, `code`, `message`.
  - Integrate telemetry on error paths and retry outcomes.
- Refactor News pages and newsletter subscription to use `apiClient`:
  - English `src/pages/english/News/News.tsx:66-92`.
  - Arabic `src/pages/arabic/الأخبار/الأخبار.tsx:65-91`.
  - Newsletter calls at `src/pages/*/News/*.tsx:276-283` and Arabic `الأخبار.tsx:274-281`.

## Configuration and Environment
- Add `.env.example` documenting required variables:
  - `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORG_ID`, `LINKEDIN_CACHE_TTL`, `LINKEDIN_API_VERSION`.
  - `TELEMETRY_ENABLED`, `TELEMETRY_ENDPOINT`, `TELEMETRY_AUTH_TOKEN`.
  - `PLACEHOLDER_USE_CDN`, `PLACEHOLDER_CDN_BASE`.
  - `REGISTER_RATE_LIMIT_SECRET`, `CAPTCHA_SITE_KEY`, `CAPTCHA_SECRET_KEY`.
- Add `src/config/env.ts` with a schema (e.g., zod) to validate env at runtime for server routes and expose typed accessors for client-safe vars.
- Fail fast on missing critical credentials at boot.

## Observability and Telemetry
- Wire `TelemetryManager.flushEvents` to actual transport:
  - POST to `/api/telemetry/ingest` (or vendor SDK) with backoff and queuing.
  - Gate by `TELEMETRY_ENABLED` and ensure no PII is collected.
- Use `useTelemetry` in meaningful flows:
  - Registration submit start/success/failure.
  - Newsletter subscription success/failure.
  - LinkedIn feed load success/failure.

## Security and Data Governance
- Enforce HTTPS, input validation, and output encoding.
- Implement IP-based rate limiting on new endpoints.
- Add CAPTCHA verification for registration to deter bots.
- Define PII storage plan: retention window, encryption at rest, access controls, and deletion mechanisms.
- Avoid storing PII in localStorage; use secure server-only storage.

## Tests
- Add integration tests for:
  - `api/linkedin/posts` with mocked LinkedIn responses and cache.
  - `api/placeholder` parameter validation and headers.
  - `api/register/submit` validation, CAPTCHA failure, and rate limiting.
  - `api/telemetry/ingest` schema validation and auth.
- Add contract tests for `apiClient` covering retries, timeouts, and error normalization.

## Rollout Steps
- Introduce `.env.example` and `src/config/env.ts`.
- Implement `api/placeholder`, `api/register/submit`, and `api/telemetry/ingest`.
- Refactor client fetches to `apiClient` and add telemetry hooks.
- Harden `api/linkedin/posts.ts` with schema validation and better error instrumentation.
- Add tests and run them in CI.
- Document backend setup and operational runbooks (envs, rate limits, and CAPTCHA).
