# UI Architecture Overview

- Tokens: `src/styles/tokens.css` imports color and spacing tokens from `color-palette.css` and `variables.css`. Keep this as the single import point for design tokens in `index.css`.
- Shared styles: `src/styles/sections.css` and `src/styles/layouts.css` provide reusable `.container`, section layouts, dual-split, metrics, snapshot cards, and “Calma Way” utilities. These are imported globally from `index.css`.
- Page styles: Page-specific visuals remain in each page’s stylesheet (e.g., `src/pages/english/Home/Home.css`). Avoid importing another page’s stylesheet inside a different page.
- Components: Prefer small shared components for repeating patterns (e.g., DualSplitSection) living under `src/components/` when markup repeats.
- Rules of change: Adjust tokens and shared utilities for system-wide changes; keep homepage page-level CSS isolated and unchanged in behavior and visuals.
- Testing: Homepage smoke and layout tests protect headline, key section titles, and captions from accidental regressions.

