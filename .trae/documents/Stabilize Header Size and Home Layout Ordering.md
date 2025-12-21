## Diagnosis
- Header expands because internal padding and variable heights change during route transitions and font/layout reflow.
- The route overlay previously toggled `body` overflow, causing scrollbar width shifts. This was removed, but header content still has variable dimensions.
- `.section-inner` inside the header adds dynamic padding; logo and action buttons were not strictly capped everywhere; `--nav-height` is recomputed per route which can cause reflow.

## Changes To Implement
### Fix Header Size Jitter
1. Set a fixed height for `.glass-nav` (e.g., `height: 52px`) and keep `box-sizing: border-box` to avoid height growth.
2. Remove extra inner padding on `.glass-nav .section-inner`; keep only outer header padding to prevent width expansion.
3. Ensure consistent inline sizes:
   - `.glass-nav .logo-image { height: 24px }`
   - `.glass-nav .nav-actions button { height: 28px; width: 28px }`
   - `.glass-nav .register-button { height: 32px }`
   - `.glass-nav .language-toggle { height: 28px }`
4. Pin header width: set `left/right` inset to small padding (`8px` each) or use `width: calc(100% - 16px)` so it doesn’t clip or expand.
5. Stop re-computing `--nav-height` on each route; set a constant (e.g., `--nav-height: 56px`) and remove the dynamic measurement in `AppLayout`.

### Route Overlay Stability (optional)
6. Keep overlay but ensure it never modifies `overflow` or layout; already done; remove it entirely if any residual jitter remains.

### Horizontal Stats on Home
7. Force `.panorama-stats` to a single row on desktop: 6 columns with consistent gaps.

### Reorder Home Sections
8. Move “Stories From Our Community” above “Discover More” in `HomeLayout`.

## Files To Update
- `src/index.css` (header height, paddings, logo/action sizes, panorama-stats grid)
- `src/layouts/AppLayout.tsx` (remove dynamic `--nav-height` updates; use constant)
- `src/components/pages/home/HomeLayout.tsx` (section order)

## Verification
- Navigate across all pages; header height and width remain constant.
- Home shows Stories above Discover More.
- Stats (numbers) render in a single horizontal row on desktop.
- No width shifts when clicking links; overlay does not affect layout.

## Rollback
- If fixed height clips content, raise to `56px` and reduce inner element sizes accordingly; all changes are isolated to CSS and a small layout tweak.