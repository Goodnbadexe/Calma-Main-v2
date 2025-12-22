## Goals
- Add a fluid, expandable CTA that animates from a compact button into a full-screen overlay above the footer.
- Mirror the v0 template pattern using Framer Motion shared layout animations and body scroll lock.
- Include the requested form fields: First Name, Last Name, Phone Number, Email Address, Project Name, Unit Type, City, Purchase Method, Lead Source.
- Ensure the CTA panel sits above the footer and uses visually appealing animated background (CSS gradient fallback).

## Implementation
- Create a `CTAFluid` component:
  - Compact state: small card/button near the bottom of pages (Home/About), containing headline and subheadline (e.g., “Register your interest Today for a pristine tomorrow.”).
  - Expanded state: full-screen overlay form.
  - Use `AnimatePresence` and Framer Motion with `layoutId="cta-card"` on both compact element and overlay container for a fluid transform.
  - Add `transform-gpu` and `will-change-transform` classes and transition `{ duration: 0.3 }`.

- Integrate CTAFluid:
  - Render just above `<Footer />` on pages where CTA is needed (Home by default), ensuring `z-index` places overlay above everything.
  - Wire with the existing overlay provider or keep self-contained state (`isExpanded`) in CTAFluid.

- Overlay visual effects:
  - Use a CSS animated gradient background (fallback) rather than introducing `@paper-design/shaders-react`.
  - Preserve performance by using GPU accelerated transforms only.

- Form implementation:
  - Build a form with the listed fields and labels; ensure keyboard accessibility and `aria-live` feedback.
  - Submit via `submitLead` (existing service) and show optimistic success/error messages.
  - Include close button `×` with `aria-label`, Escape-to-close, focus trap, and body scroll lock.

## Accessibility & Responsive
- Focus trap within overlay; set initial focus on the first field.
- Body scroll lock when overlay open.
- Responsive layout with `sm/md/lg` breakpoints; inputs wrap cleanly.

## Verification
- Dev preview: Open CTA, confirm fluid expansion and overlay above footer.
- Check form fields and submission path; verify scroll lock, Escape, and close behavior.
- Basic Playwright check (optional) to assert CTA button opens overlay and form is visible.

## Deliverables
- `CTAFluid` component with compact → overlay animations and full form.
- Integration in Home (above footer), optional in About.
- CSS additions for animated gradient background.
- No new heavy dependencies; use existing Framer Motion and CSS.

Confirm and I will implement this end-to-end, wire it to the page, verify animations, and ensure the form fields match your spec.