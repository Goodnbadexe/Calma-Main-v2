## What’s Broken
- Clicking “Register Your Interest” in NavBar triggers the splash overlay, but the fluid CTA overlay doesn’t appear.
- Cause: The splash overlay in `AppLayout` uses a higher z-index (`900`) than the CTA overlay (`z-50`), so the overlay is visually blocked while splash is showing.
- The v0/shadcn URL you shared is currently a dead link (Block Not Found). We won’t add external templates; we’ll fix the animation with our Framer Motion setup.

## Fix Plan
### Layering and Trigger
- Lower-risk option: Remove `showSplash()` from the NavBar register handler so the CTA overlay opens immediately on click.
- Or, raise CTA overlay z-index above splash, e.g., CTA root `z-[1001]`, splash remains at `z-900`, guaranteeing CTA shows on top.
- If you want the splash to play then CTA opens, delay CTA `open()` until splash finishes (e.g., `setTimeout` ≈ 260ms to match splash transition).

### Consistent Context Usage
- Cache `useRegisterOverlay()` once per render instead of calling inline twice in JSX.
- Keep a single `layoutId="cta-card"` origin in NavBar (avoid multiple origins that can confuse the shared layout transition).

### Verification
- Manual: Click NavBar register → fluid expansion into full-screen CTA overlay; overlay sits above all content.
- Automated: Add a basic Playwright check that clicks the NavBar CTA and expects the overlay to be visible.

### No Shadcn Install
- The v0 block link is not available, so we will not run `npx shadcn@latest add`.
- We’ll keep the current Framer Motion shared layout approach which already matches the effect.

## Deliverables
- NavBar register button opens CTA overlay reliably.
- Splash overlay no longer blocks CTA overlay (via z-index or handler change).
- Shared layout fluid animation preserved.
- Quick validation with the running preview and an e2e check.

I’ll implement the z-index and trigger sequencing fix (preferred: raise CTA overlay above splash) and verify the behavior end-to-end. 