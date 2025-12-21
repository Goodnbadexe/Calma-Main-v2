## Findings
- Unused router `src/routes.tsx` defined but not consumed; real routing lives in `src/main.tsx` (`/Users/itcalma/trae/Calma-Reacration/Calma Receartion/src/main.tsx:55-93`).
- Dead hooks `src/hooks/useSmoothScroll.ts` and `src/hooks/useSmoothSliderControls.ts` have no imports anywhere.
- CAPTCHA bypass: `verifyCaptcha` returns true when secret is missing (`/Users/itcalma/trae/Calma-Reacration/Calma Receartion/api/register/submit.ts:15-26`, specifically line 16).
- Telemetry auth optional: handler only enforces auth when token set (`/Users/itcalma/trae/Calma-Reacration/Calma Receartion/api/telemetry/ingest.ts:14-21`).
- No Reports page under `src/pages` or `src/components`.

## Objectives
- Remove or consolidate unused routing and hooks to prevent drift and reduce bundle size.
- Enforce CAPTCHA secret requirement and fail closed when misconfigured.
- Require authentication for telemetry ingestion whenever enabled.
- Add a minimal Reports page and routes for EN/AR.

## Implementation Steps
### 1) Remove unused files
- Delete `src/routes.tsx` since routing is centralized in `src/main.tsx`.
- Delete dead hooks: `src/hooks/useSmoothScroll.ts`, `src/hooks/useSmoothSliderControls.ts`.

### 2) Keep a single routing entry point
- Retain router in `src/main.tsx` and remove the unused `AppRoutes` to avoid drift.
- Optionally add a comment-free note via commit message later explaining consolidation.

### 3) Fix CAPTCHA verification (fail closed)
- In `api/register/submit.ts`, change `verifyCaptcha` behavior:
  - If `secret` is missing, do not bypass; return false and have the handler fail.
  - In the handler, when `env.CAPTCHA_SECRET_KEY` is missing, respond with 500 and `{ error: 'Captcha misconfigured' }`, instead of silently allowing.
- Exact edits:
  - Replace line 16 (`if (!secret) return true`) with `if (!secret) return false`.
  - After `const env = getServerEnv()` add a guard: if `!env.CAPTCHA_SECRET_KEY`, `res.status(500).json({ error: 'Captcha misconfigured' })` early-return.
- References: `/Users/itcalma/trae/Calma-Reacration/Calma Receartion/api/register/submit.ts:15-26`, `/Users/itcalma/trae/Calma-Reacration/Calma Receartion/api/register/submit.ts:28-64`.

### 4) Require telemetry auth when enabled
- In `api/telemetry/ingest.ts`:
  - If `env.TELEMETRY_ENABLED` and `!env.TELEMETRY_AUTH_TOKEN`, return 503 with `{ error: 'Telemetry misconfigured' }` and do not accept requests.
  - Always require Bearer token when telemetry is enabled (move auth check out of optional block or keep the block but add the misconfiguration guard).
- Exact edits:
  - Insert after line 6: `if (env.TELEMETRY_ENABLED && !env.TELEMETRY_AUTH_TOKEN) { res.status(503).json({ error: 'Telemetry misconfigured' }); return }`.
  - Leave existing 404 when disabled and 401 when token invalid.
- References: `/Users/itcalma/trae/Calma-Reacration/Calma Receartion/api/telemetry/ingest.ts:1-33`.

### 5) Add Reports pages and routes
- Create `src/pages/english/Reports/ReportsPage.tsx` and `src/pages/arabic/Reports/ReportsPage.tsx` with lazy-loaded components following existing page conventions.
- Wire routes in `src/main.tsx`:
  - EN: add `<Route path="/reports" element={<ReportsPage />} />` near other English routes.
  - AR: add `<Route path="/ar/reports" element={<ArabicReportsPage />} />` near Arabic routes.
- Use `lazy(() => import(...))` consistent with existing pages.

### 6) Optional: env validation helper
- In `src/config/env.ts`, add validation that throws or logs when `CAPTCHA_SECRET_KEY` is missing in production or when `TELEMETRY_ENABLED` is true but `TELEMETRY_AUTH_TOKEN` is missing.
- This centralizes configuration checks and prevents silent misconfigurations.

## Verification
- Start dev server and navigate to `/reports` and `/ar/reports` to confirm routes render.
- Hit `POST /api/register/submit` with missing `CAPTCHA_SECRET_KEY` to confirm 500 error; with secret and invalid token to confirm 400; with valid token to confirm 202.
- Hit `POST /api/telemetry/ingest` with `TELEMETRY_ENABLED=true` and no token to confirm 503; with enabled + wrong token to confirm 401; with correct token to confirm 202.

## Deliverables
- Deleted unused router and hooks.
- Hardened `submit.ts` and `ingest.ts`.
- New EN/AR Reports pages and routes.
- Optional env validation in `src/config/env.ts`.