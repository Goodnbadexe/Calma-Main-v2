## Summary
- Implement a real React page for `English > Register` using the provided design and existing UI components.
- Align the Arabic register page with the same submission/telemetry flow and keep RTL + Arabic copy intact.
- Verify with automated tests and a manual pass.

## Current Findings
- `src/pages/english/Register/Register.tsx` currently contains documentation/instructions, not a React component (`/Users/itcalma/trae/src/pages/english/Register/Register.tsx:1`).
- The route points to this file, so `/register` renders a non-component (`/Users/itcalma/trae/src/main.tsx:68-69`).
- Arabic page is a functional component with validation and simulated submit (`/Users/itcalma/trae/src/pages/arabic/التسجيل/التسجيل.tsx:51-72`).
- Submission API exists at `submitLead` (`/Users/itcalma/trae/src/services/api.ts:1-22`).
- Telemetry hook is available (`/Users/itcalma/trae/src/utils/telemetry.ts:433-442`).
- Existing UI components: `Card`, `Button`, and form fields (`FormField`, `SelectField`, `TextareaField`, `Checkbox`).

## Implementation Plan
### English Register Page
- Replace the instruction content with a functional component `RegisterInterest` that:
- Uses existing `Card` and `Button` (`src/components/ui/card.tsx`, `src/components/ui/button.tsx`).
- Uses existing form components for inputs to match house style (`src/components/forms/*`).
- Adds `SEOHead` with English locale, title “Register Your Interest”.
- Validates: `firstName`, `lastName`, `email` (format), and agreement checkbox required.
- Submits to `submitLead(formData)` with graceful error handling and telemetry `trackPerformance` on success and `trackError` on failure.
- Shows a success panel with `role="status"` (to satisfy tests) and an option to “Register Another Interest”.
- Keeps UX copy close to your provided design (headings, placeholders, button text).

### Arabic Register Page
- Keep existing Arabic UI and RTL layout.
- Swap the simulated `setTimeout` for `await submitLead(formData)` using the same validation gates.
- Preserve Arabic error strings and privacy requirement; keep the success message and `aria-live` as implemented.
- Add telemetry calls mirroring English: duration metric and error reporting.

### Routing & SEO
- Routing is already configured (`/register`, `/ar/التسجيل`, `/ar/register`) in `src/main.tsx`.
- Ensure `SEOHead` usage for both pages with `locale` set appropriately and link alternates if available.

### Dependencies
- Keep using existing libraries (Tailwind, framer-motion). Avoid adding `lucide-react` unless desired; icons not required for tests.
- Ensure `VITE_LEADS_API_URL` is set; handle missing URL with a user-friendly error and telemetry.

### Accessibility & UX
- Labels associated via `htmlFor`/`id` on form fields.
- Button disabled until privacy/terms agreement.
- Error messages rendered under fields; `role="status"` present on success.

### Verification
- Run unit test `register-form.test.tsx` and fix any failures.
- Manual check: navigate to `/register` and `/ar/التسجيل`, submit with valid data, confirm success state.
- Confirm telemetry events are queued without network failures.

## Deliverables
- Updated `src/pages/english/Register/Register.tsx` to a functional page.
- Updated Arabic page to use `submitLead` and telemetry.
- Clear, consistent English and Arabic copy; working routes and validated submission.
