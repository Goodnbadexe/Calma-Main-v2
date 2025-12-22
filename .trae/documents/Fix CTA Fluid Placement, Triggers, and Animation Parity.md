## What’s Off
- CTAFluid is rendered above the footer, so the compact button appears at the bottom instead of in the hero.
- The NavBar “Register your interest” currently opens the overlay; you requested it should NOT be one of the expanding CTAs.
- Duplicate CTAs: hero actions + the bottom CTA card cause confusion.
- Animation parity: the shared layout CTA must originate from the hero button location and expand into the overlay (same element ID), not from a separate bottom card.

## Fix Plan
### Placement & Structure
- Move CTAFluid from the app shell to the Home hero content block (directly under the hero title/subtitle), so the compact CTA animates from that spot.
- Keep page structure intact: hero → dual-split → sections. No new bottom cards.

### Triggers & Behavior
- Revert NavBar “Register your interest” to normal behavior (no overlay). It will keep its standard link/button behavior.
- Use a single CTA button (“Talk to sales” / “Request a demo”) in the hero that performs the fluid expansion.
- Ensure only ONE expanding CTA is present (no duplicates) and no random bottom placement.

### Animation Parity
- Use Framer Motion shared layout animation: `layoutId="cta-card"` on both compact button wrapper and overlay container.
- Animate border radius and background precisely during transition. Maintain transform-gpu / will-change-transform for 60fps.
- Keep CSS animated gradient as background (fast and reliable). If you want GodRays/MeshGradient later, I’ll add them behind a feature flag.

### Overlay UX
- Confirm scroll lock, Escape-to-close, focus trap, and `aria-live` feedback.
- First focus goes to the form’s first field.
- Keep your specified form fields in the overlay.

### Cleanup
- Remove CTAFluid injection above the footer.
- Ensure only the hero CTA owns the `layoutId` to avoid conflicting animations.

### Verification
- Visual check: CTA originates in hero, expands fluidly, overlay sits above all content.
- Confirm NavBar register behaves normally (no overlay), no duplicates.
- Test keyboard navigation and screen-reader announcements.

If this plan is approved, I’ll implement the changes end-to-end and verify in the running preview to ensure the CTA behaves exactly as specified.