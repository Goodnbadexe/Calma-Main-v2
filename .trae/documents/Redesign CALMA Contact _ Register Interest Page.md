## Scope & Approach
- Refine the existing bilingual Register pages to a premium, conversion-focused experience.
- Leverage the project’s Tailwind theme and brand tokens; remove default browser styles.
- Maintain strict alignment, spacing, and color consistency at every step.

## Current Pages & Targets
- English: `src/pages/english/Register/Register.tsx`
- Arabic (RTL): `src/pages/arabic/التسجيل/التسجيل.tsx`
- Shared styling: Tailwind + project CSS tokens (`tailwind.config.js`, `src/styles/color-palette.css`).

## Component Architecture
- Create reusable form primitives under `src/components/forms/`:
  - `FormField.tsx` (label + input wrapper; required flag, error)
  - `SelectField.tsx` (consistent select UI; keyboard accessible)
  - `TextareaField.tsx` (consistent textarea UI)
  - `Checkbox.tsx` and `CheckboxGroup.tsx` (custom brand style; optional vs required)
- Page composition:
  - `Hero` (title/subtitle)
  - `RegisterForm` (two-column layout, mobile single column)
  - `Checkboxes` (subscriptions + mandatory agreement)
  - `PrimaryCTA` ("Register Interest")
  - `TrustValue` (four equal cards)

## Styling & Consistency
- Use Tailwind brand tokens only (primary/neutral/accent) for colors.
- Define shared input class set (radius, border, focus/hover) applied across all fields.
- Grid rhythm: `grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6` for form rows; keep labels aligned.
- Buttons: use the existing UI button variant with brand primary; `w-full`, calm hover/active.
- Remove mixed grays; unify via neutral scale from theme; eliminate default outlines.

## Form Fields (Exact Order)
- First Name*, Last Name*, Email Address*, Phone Number, City,
- Country (select), Property Type of Interest (select), Budget Range (select),
- Purchase Timeline (select), Additional Information (textarea).
- Required indicators and `aria-required` on mandatory fields.

## Validation, Errors & Success
- Keep existing custom validators; centralize error rendering in `FormField`.
- Consistent error style: small text, accent color, `aria-describedby`.
- Submit states: loading spinner + disabled button; success confirmation message.

## Checkbox Section (Refined UX)
- Optional: newsletter/updates (spaced, aligned)
- Mandatory: privacy/legal agreement (required; validated)
- Custom checkbox UI using `peer` and brand colors; equal spacing.

## Primary CTA
- Label: "Register Interest"; visually dominant yet calm; full-width alignment.
- Hover/active states match brand; focus ring for accessibility.

## Trust & Value Section
- Title: "Why Register with CALMA?"
- Four equal cards: Exclusive Access, Personalized Service, Market Insights, VIP Events.
- Perfect icon/text alignment, balanced spacing, consistent colors.

## RTL & Bilingual Support
- Mirror the English structure in Arabic page; rely on `LanguageContext` direction handling.
- Maintain `dir="ltr"` for the email field in Arabic.
- Use `[dir="rtl"]` conditional styles already in the project for spacing and alignment swaps.

## Accessibility & SEO
- Visible focus states; sufficient contrast; large tap targets.
- Keyboard navigability across inputs and checkboxes.
- Page title/description aligned with brand; integrate with existing SEO approach.

## Progressive Refinement Checklist (Per Section)
- Verify grid alignment, vertical rhythm, and label-input alignment.
- Confirm color consistency against brand tokens.
- Check hover/focus states and remove default browser styles.
- Ensure typography scale matches News/Projects pages.

## File Changes (Implementation Plan)
- Edit: `src/pages/english/Register/Register.tsx` (structure + new components usage)
- Edit: `src/pages/arabic/التسجيل/التسجيل.tsx` (mirror changes; RTL checks)
- Add: `src/components/forms/{FormField,SelectField,TextareaField,Checkbox,CheckboxGroup}.tsx`
- Optional light-touch: shared input/button utility classes in a small `forms.css` if needed, but prefer Tailwind.

## Verification Plan
- Run locally; audit spacing/alignment at md/lg breakpoints.
- Check RTL rendering, email `dir="ltr"`, and focus/hover across all fields.
- Validate required fields, error messages, loading state, and success confirmation.

## Acceptance Criteria
- Polished, calm, trustworthy look; no alignment/spacing issues.
- Colors fully consistent with brand; no default browser styles.
- Effortless form completion; strong conversion confidence.
- English + Arabic parity with full RTL support.