## Overview
We will remove global top offsets, restore text visibility, standardize typography/spacing, realign the hero, audit the nav, fix desktop-vs-mobile styles, and polish section flow. Changes will focus on `src/layouts/AppLayout.tsx`, global CSS (`src/index.css`), navbar styles (`src/styles/navbar.css`), and homepage styles for EN/AR (`src/pages/english/Home/Home.css`, `src/pages/arabic/الرئيسية/الرئيسية.css`).

## 1) Remove Top Empty Space
- Delete the spacer element in `src/layouts/AppLayout.tsx` (e.g., `header-spacer`) so the layout does not reserve vertical space.
- Remove all `.page` top padding in both `src/index.css` and `src/styles/navbar.css` (e.g., `.page { padding-top: var(--header-height, 80px); }` and `.page { padding-top: 80px; }`).
- Remove the explicit spacer rule `.header-spacer { height: 80px; }` from `src/styles/navbar.css`.
- Ensure the fixed nav (`.glass-nav`) does not reserve invisible space: keep it fixed and overlayed without adding margins or padding around the page container.
- Verify `<body>`, `<main>`, `.site-wrapper` have `padding-top: 0` unless the header is truly fixed and overlapping essential content.

## 2) Restore Invisible Text
- Set a global base color for text in `src/index.css` (e.g., `body, p, h1, h2, h3 { color: #111; }`).
- Remove or refactor gradient text that uses `-webkit-text-fill-color: transparent` in `src/pages/english/Home/Home.css` and related spots in `src/index.css`. Replace with solid `color` or provide a safe fallback (gradient background with non-transparent text).
- Ensure all text blocks have `opacity: 1` and `visibility: visible`. Remove stray `opacity: 0`/`visibility: hidden` from non-interactive content.
- Check parents for `color: transparent`, `mix-blend-mode`, and filters that reduce contrast; remove or override with readable colors.

## 3) Reset Typography & Spacing
- Define a consistent scale in `src/index.css`:
  - `h1 { font-size: 3.2rem; line-height: 1.1; }`
  - `h2 { font-size: 2.2rem; line-height: 1.2; }`
  - `p  { font-size: 1.2rem; line-height: 1.7; }`
- Normalize section rhythm globally: `.section { padding: 80px 0; } @media (max-width: 768px) { padding: 48px 0; }` and remove conflicting paddings in `Home.css`/`الرئيسية.css` (e.g., `6rem`/`8rem`).
- Remove inconsistent empty gaps between sections: eliminate extra margins on section wrappers and first/last children.

## 4) Align Hero Section Perfectly
- In EN/AR hero selectors, use a flexible center:
  - `display: flex; align-items: center; justify-content: center; text-align: center;`
- Ensure the hero background uses `background-size: cover; background-position: center;` on the image/container.
- Remove leftover absolute offsets in `.hero-overlay` and any negative margins that push content.
- Ensure the “Explore Our Projects” button is visible and aligned; audit its margins so it isn’t pushed down by ghost gaps.

## 5) Audit Navigation Bar Behavior
- Remove any top/bottom padding or placeholder inside the nav; verify `.glass-nav` has no margins creating space above/below.
- Fix the nav bar height visually (consistent `height` and internal alignment) without collapsing while leaving empty space.
- Remove ghost/nav-only elements that create spacing; keep `.nav-links`, `.nav-actions`, `.burger-button` streamlined.

## 6) Section-by-Section Visibility
- About, Stats, Excellence, The Calma Way, Footer: enforce `color: #111/#333`, `opacity: 1`, `visibility: visible` on `p`, `h2`, `h3`.
- Ensure no image overlays or out-of-flow elements push text outside the viewport.
- Validate grid/flex containers do not collapse or overflow text; adjust `flex-basis`, `min-width`, `gap`, and `overflow` accordingly.

## 7) Desktop vs Mobile Parity
- Compare media queries in `src/index.css`, `navbar.css`, `Home.css`, `الرئيسية.css`; remove any desktop-only `display: none` rules hiding text.
- Increase selector specificity where needed so desktop text styles aren’t overridden by lower-priority resets.
- Keep mobile behavior intact while mirroring visibility and layout semantics on desktop.

## 8) Polish & Verification
- Establish a premium feel via balanced spacing, smooth typography, and consistent alignment; remove all misalignments and empty gaps.
- Run the dev preview and validate on desktop and mobile:
  - Top spacing gone; hero centered; button visible.
  - All texts visible with readable contrast.
  - Sections evenly spaced with the chosen rhythm.
  - Nav fixed, overlayed, and not reserving space.
- Iterate with small visual tweaks if any residual misalignments remain.

## Change Map
- `src/layouts/AppLayout.tsx`: remove `header-spacer`, verify page wrapper spacing.
- `src/styles/navbar.css`: remove `.page` padding-top and `.header-spacer`; ensure no nav-induced gaps.
- `src/index.css`: remove `.page` padding-top; add global typography scale; normalize `.section` padding; enforce base text color/visibility.
- `src/pages/english/Home/Home.css`: remove conflicting paddings, gradient text with transparent fill; hero centering; button margins.
- `src/pages/arabic/الرئيسية/الرئيسية.css`: same adjustments as EN with RTL support.

If you approve, I will implement the edits, verify in desktop/mobile, and deliver the polished homepage.