## Scope  Outcomes
- Fix and standardize the “Register your interest” CTA: single fluid overlay opened reliably from page CTAs.
- Apply color, typography, and copy updates; keep project pages empty as requested.
- Ensure Arabic pages mirror behavior (RTL, fonts, z-index layering, accessibility) without re-populating project content.

## CTA Overlay Wiring
- Wrap the app layout with `RegisterOverlayProvider` so overlay context is global.
- Create a reusable `RegisterInterestButton` (Framer Motion `layoutId="cta-card"`) that calls `useRegisterOverlay().open()` and prevents default navigation.
- Replace anchor-based triggers that navigate (e.g., `#contact`) with the button so the overlay does not disappear after click.
- Keep overlay visible until close/Escape; confirm scroll lock and focus trap (provider already implements these).

## Page Updates (Arabic parity)
- `الرئيسية.tsx` / `الرئيسية.css`: hero CTA opens overlay; change “Explore Our Projects” to beige; darken headings “Impact By The Numbers” and “Featured Projects”; apply improved copy; ensure heading font parity for “Mission & Vision”.
- `الأخبار.tsx` / `الأخبار.css`: align CTA behavior; keep newsletter polish; ensure LinkedIn feed and buttons are consistent.
- `التسجيل.tsx` / `التسجيل.css`: polish form styles and inputs; ensure this page is independent (overlay CTA remains global, register page form remains functional).
- `تواصل معنا.tsx` / `تواصل معنا.css`: ensure page CTA triggers overlay (or keep contact form separate); retain current contact information; fix submit UI behavior.
- `عن كالما.tsx` / `عن كالما.css`: apply heading font parity and CTA behavior.
- `arabic.css`: add global RTL-friendly tokens (hyphens: none, consistent type ramp) and shared beige color.
- `المشاريع/*`: keep pages empty; add the shared CTA button where appropriate without content changes.

## Colors  Typography  Copy
- Beige CTA: update `.button-link .luxury-button` to beige (`#d4cfbc` or your token), adjust hover states.
- Nav text: set header nav link color to white; ensure adequate contrast.
- Copy improvements:
  - Redefining Luxury Living: “We ground bold vision in crafted realism — designing spaces that feel poetic yet purposeful. Every decision balances material authenticity with human experience.”
  - Architecting the Future of Urban Living: “A distilled snapshot of our ethos: grounded sustainability, uncompromising quality, and thoughtful urban innovation.”
- Reduce numeric font sizes in stats (e.g., `.stat-number`) for clarity.
- Remove hyphens via content cleanup and `hyphens: none` where appropriate.

## Navbar  Footer
- NavBar CTA: prefer immediate overlay open; optionally delay until splash ends if you want the splash first.
- Footer: add CALMA social accounts (LinkedIn, Instagram, X) with accessible labels.

## Verification
- Manual: hero CTA opens overlay and remains until closed; no duplicate CTAs; animation originates from the hero CTA; nav text is white; beige button visible; headings darker; numbers smaller.
- Accessibility: initial focus on first field, Escape-to-close works, `aria-live` present.

## Clarifications
- Beige hex: confirm `#d4cfbc` or provide your preferred beige token.
- Social URLs: confirm target links; default to CALMA LinkedIn if unspecified.
- NavBar CTA: immediate open vs. splash-then-open; state your preference.
- CTA label text: confirm “Talk to sales” vs. “Register your interest”.

If you approve, I will implement all wiring and UI updates across the listed Arabic files, keep project pages empty, and verify behavior in preview before handing off.