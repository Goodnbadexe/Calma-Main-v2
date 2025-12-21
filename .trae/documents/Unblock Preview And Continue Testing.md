## Current Status
- Dev server and Preview are running; Preview URL: `http://localhost:4173/`.
- Recent HMR reload noted for `src/main.tsx`; server did not crash.

## Likely Causes
- Browser tab lost connection or needs hard-refresh after HMR.
- Skeleton fallback or splash overlay visible during lazy route load.
- Cached assets causing stalled state.

## Unblock Steps
1. Open `http://localhost:4173/` and hard-refresh (`Cmd+Shift+R`).
2. If stuck, clear cache for the site and reload.
3. Navigate through Home → Featured Projects, Discover More, Arabic Home; verify:
   - Carousel renders 11 items with dots and `N/11` label.
   - Dragging does not select text; arrows and keyboard work (RTL-aware).
   - Skeleton overlays disappear once images resolve.
4. If overlay persists, we will reduce skeleton visibility duration and ensure Splash overlay never blocks route content.
5. Check browser console for errors; if any, address immediately.

## Next Actions After Unblock
- Capture before/after screenshots (EN/AR Home, desktop/mobile).
- Deliver page-by-page issue list and grouped PRs (carousel, responsive, i18n, loader, nav).
- Run a short regression QA checklist across routes and RTL.

## Acceptance
- Page loads without stall; skeletons appear briefly then content shows.
- Carousel accessible and responsive across devices.
- Arabic persists across refresh; `lang`/`dir` correct.