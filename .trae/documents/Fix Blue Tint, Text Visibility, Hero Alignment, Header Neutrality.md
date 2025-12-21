## Diagnosis Summary
- Root cause: an automatic dark-mode fallback sets `--color-primary: #4F8EF7` under `prefers-color-scheme: dark`, which cascades into `--color-bg_primary` on desktop and produces a blue tint overlay. Confirmed in `src/styles/dark-mode.css:139–150` and reinforced by `src/styles/variables.css:171–181`.
- Secondary contributors: header/hero pseudo-element overlays and backdrop filters add semi-transparent layers that intensify tint and reduce text contrast. Examples in `src/index.css:281–294` (header), `src/pages/english/Home/Home.css:207–222` (hero), and `src/styles/navbar.css:214–229, 433–448, 512–527`.
- Layout notes: `.page { padding-top: var(--header-height, 80px) }` exists (`src/index.css:163`) and `AppLayout.tsx` wraps all pages in `.page` (`src/layouts/AppLayout.tsx:27`). Hero alignment can be stabilized with a visible spacer instead of relying on implicit header height.

## Fix Set 1: Eliminate Blue Tint
1. Remove the automatic dark-mode fallback that injects blue:
   - Delete `@media (prefers-color-scheme: dark) :root:not([data-theme]) { ... }` block that sets `--color-primary: #4F8EF7` in `src/styles/dark-mode.css:139–150`.
2. Keep backgrounds neutral across OS themes unless explicitly toggled:
   - Remove `@media (prefers-color-scheme: dark)` overrides that force `--color-bg-primary` to a dark brand color in `src/styles/variables.css:171–181`.
3. Maintain the brand palette from `color-palette.css` and explicit `[data-theme="dark"]` only for intentional dark mode; no automatic blue fallback.

## Fix Set 2: Restore Full Text Visibility
1. Ensure full-opacity text on hero and navigation:
   - Set `.nav-link { opacity: 1; }` in `src/index.css:334` and remove hover opacity dimming at `src/index.css:335`.
   - Set `.hero-subtitle { opacity: 1; }` in `src/pages/english/Home/Home.css:150–156`.
2. Remove blend/tint layers on text containers:
   - Remove backdrop filters from hero buttons if needed to avoid blur tint (`src/pages/english/Home/Home.css:168–179, 188–205`).

## Fix Set 3: Hero Alignment & Composition
1. Add an explicit spacer below the fixed header:
   - Insert `<div className="header-spacer" />` immediately after `<NavBar />` in `src/layouts/AppLayout.tsx:28→29` to use `src/index.css:199–202` for consistent offset.
2. Confirm hero media scaling:
   - Keep `object-fit: cover` and `object-position: center` (`src/pages/english/Home/Home.css:90–96`).
3. Retain hero overlay as neutral black gradient only (`src/pages/english/Home/Home.css:104–111`), removing decorative pseudo-elements that add artifacts.

## Fix Set 4: Header Reconstruction
1. Neutral header until explicitly defined:
   - Keep `.glass-nav.nav-transparent { background: transparent; }` and `.nav-solid { background: #FFFFFF; }`.
   - Remove the header pseudo-element overlay `src/index.css:281–294`.
2. Clean dropdown and mobile surfaces:
   - In `src/components/ui/NavBar.tsx:478–487`, set dropdown portal `background: '#FFFFFF'` and remove `backdropFilter` to eliminate tint.
   - Remove decorative `::before` overlays from navbar CSS: `src/styles/navbar.css:214–229, 433–448, 512–527`.
3. Verify icon visibility and alignment remain intact (`src/styles/navbar.css` and `src/index.css` alignments unchanged).

## Fix Set 5: Media Queries Audit
- Desktop misrender is tied to OS dark-mode overrides. By removing automatic dark fallbacks and overlays, mobile/desktop will share a consistent appearance. Retain media queries only for spacing and grid changes; no color overrides.

## Fix Set 6: Global Cleanup
1. Remove remaining blue references:
   - Confirm only `#4F8EF7` existed (found in `src/styles/dark-mode.css`). Remove as above.
2. Replace or strip semi-transparent overlay layers on key wrappers:
   - Remove pseudo-element overlays on header/nav/hero listed earlier.
3. Keep images loading clean and remove fallback gradient layers that introduce artifacts.

## Final UX Pass
- Verify consistent typography scale and legibility (existing scales remain).
- Center major callouts using existing grid/flex utilities.
- Ensure breathing room via `.section` tokens (`src/index.css:165–174`).
- Confirm no artifacts on high-DPI by removing blur overlays; keep neutral shadows.

## Proposed Diffs
```diff
*** Begin Patch
*** Update File: src/styles/dark-mode.css
@@
-@media (prefers-color-scheme: dark) {
-  :root:not([data-theme]) {
-    --color-primary: #4F8EF7;
-    --color-background: #0F0F0F;
-    --color-surface: #1A1A1A;
-    --color-text-primary: #FFFFFF;
-    --color-text-secondary: rgba(255, 255, 255, 0.87);
-    --color-border: rgba(255, 255, 255, 0.12);
-  }
-}
*** End Patch
```
```diff
*** Begin Patch
*** Update File: src/styles/variables.css
@@
-@media (prefers-color-scheme: dark) {
-  :root {
-    --color-text-primary: #FFFFFF;
-    --color-text-secondary: #CBD5E1;
-    --color-text-muted: #94A3B8;
-    --color-bg-primary: var(--color-primary);
-    --color-bg-secondary: var(--color-primary-800);
-    --color-bg-neutral: var(--color-neutral-900);
-  }
-}
*** End Patch
```
```diff
*** Begin Patch
*** Update File: src/index.css
@@
-.glass-nav::before {
-  content: '';
-  position: absolute;
-  top: 0;
-  left: 0;
-  right: 0;
-  bottom: 0;
-  background: linear-gradient(135deg, 
-    rgba(255, 255, 255, 0.1) 0%, 
-    transparent 50%, 
-    rgba(255, 255, 255, 0.05) 100%);
-  border-radius: inherit;
-  pointer-events: none;
-}
@@
-.nav-link { color: #071e1f; text-decoration: none; opacity: 0.8; font-weight: 500; transition: all 0.3s ease; cursor: pointer; }
+.nav-link { color: #071e1f; text-decoration: none; opacity: 1; font-weight: 500; transition: all 0.3s ease; cursor: pointer; }
-.nav-link:hover { opacity: 1; color: #071e1f; }
+.nav-link:hover { color: #071e1f; }
*** End Patch
```
```diff
*** Begin Patch
*** Update File: src/pages/english/Home/Home.css
@@
-.hero-section::before {
-  content: '';
-  position: absolute;
-  top: 0;
-  left: 0;
-  right: 0;
-  bottom: 0;
-  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
-  z-index: 1;
-  animation: pulse 4s ease-in-out infinite;
-}
@@
-.hero-subtitle {
-  font-size: clamp(1rem, 2.2vw, 1.4rem);
-  font-weight: 300;
-  margin-bottom: 0.75rem;
-  opacity: 0.95;
-  line-height: 1.5;
-  max-width: 75ch;
-  margin-left: auto;
-  margin-right: auto;
-}
+.hero-subtitle {
+  font-size: clamp(1rem, 2.2vw, 1.4rem);
+  font-weight: 300;
+  margin-bottom: 0.75rem;
+  opacity: 1;
+  line-height: 1.5;
+  max-width: 75ch;
+  margin-left: auto;
+  margin-right: auto;
+}
*** End Patch
```
```diff
*** Begin Patch
*** Update File: src/styles/navbar.css
@@
-.mobile-menu {
-  position: fixed;
-  top: 0;
-  left: 0;
-  right: 0;
-  bottom: 0;
-  background: rgba(0, 0, 0, 0.92);
-  backdrop-filter: blur(24px) saturate(180%);
-  z-index: 2000;
-  display: flex;
-  align-items: flex-start;
-  justify-content: flex-end;
-  padding: 20px;
-  opacity: 0;
-  visibility: hidden;
-  transition: var(--transition-luxury);
-  &::before { content: none; }
-}
+.mobile-menu {
+  position: fixed;
+  top: 0;
+  left: 0;
+  right: 0;
+  bottom: 0;
+  background: rgba(0, 0, 0, 0.92);
+  z-index: 2000;
+  display: flex;
+  align-items: flex-start;
+  justify-content: flex-end;
+  padding: 20px;
+  opacity: 0;
+  visibility: hidden;
+  transition: var(--transition-luxury);
+}
@@
-.dropdown-menu {
-  position: absolute;
-  background: rgba(255, 255, 255, 0.08);
-  backdrop-filter: blur(24px) saturate(180%);
-  border: 1px solid rgba(255, 255, 255, 0.15);
-  border-radius: 20px;
-  padding: 16px 0;
-  min-width: 220px;
-  box-shadow: 
-    0 8px 32px rgba(0, 0, 0, 0.12),
-    0 2px 8px rgba(0, 0, 0, 0.08),
-    inset 0 1px 0 rgba(255, 255, 255, 0.1);
-  pointer-events: auto;
-  transform-origin: top center;
-  overflow: hidden;
-  &::before { content: none; }
-}
+.dropdown-menu {
+  position: absolute;
+  background: #FFFFFF;
+  border: 1px solid rgba(26, 26, 26, 0.12);
+  border-radius: 20px;
+  padding: 16px 0;
+  min-width: 220px;
+  box-shadow:
+    0 8px 32px rgba(0, 0, 0, 0.12),
+    0 2px 8px rgba(0, 0, 0, 0.08),
+    inset 0 1px 0 rgba(255, 255, 255, 0.6);
+  pointer-events: auto;
+  transform-origin: top center;
+  overflow: hidden;
+}
@@
-.mobile-drawer {
-  position: fixed;
-  top: 0;
-  right: 0;
-  width: 100vw;
-  height: 100vh;
-  background: rgba(0, 0, 0, 0.92);
-  backdrop-filter: blur(24px) saturate(180%);
-  z-index: 1000;
-  display: flex;
-  flex-direction: column;
-  padding: 80px 24px 24px;
-  overflow-y: auto;
-  &::before { content: none; }
-}
+.mobile-drawer {
+  position: fixed;
+  top: 0;
+  right: 0;
+  width: 100vw;
+  height: 100vh;
+  background: rgba(0, 0, 0, 0.92);
+  z-index: 1000;
+  display: flex;
+  flex-direction: column;
+  padding: 80px 24px 24px;
+  overflow-y: auto;
+}
*** End Patch
```
```diff
*** Begin Patch
*** Update File: src/components/ui/NavBar.tsx
@@
-          <div 
-        ref={dropdownRef}
-        className="dropdown-portal"
-        style={{
-          position: 'fixed',
-          top: dropdownPosition.top,
-          left: dropdownPosition.left,
-          zIndex: 9999,
-          minWidth: `${dropdownPosition.width}px`,
-          width: `${dropdownPosition.width}px`,
-          background: 'var(--color-bg-glass-solid)',
-          backdropFilter: 'blur(12px)',
-          border: '1px solid var(--color-border-medium)',
-          borderRadius: '10px',
-          padding: '6px 0',
-          boxShadow: '0 12px 24px rgba(7, 30, 31, 0.12)',
-          overflow: 'hidden',
-          opacity: 1,
-          transform: 'none'
-        }}
-      >
+          <div 
+        ref={dropdownRef}
+        className="dropdown-portal"
+        style={{
+          position: 'fixed',
+          top: dropdownPosition.top,
+          left: dropdownPosition.left,
+          zIndex: 9999,
+          minWidth: `${dropdownPosition.width}px`,
+          width: `${dropdownPosition.width}px`,
+          background: '#FFFFFF',
+          border: '1px solid rgba(26, 26, 26, 0.12)',
+          borderRadius: '10px',
+          padding: '6px 0',
+          boxShadow: '0 12px 24px rgba(7, 30, 31, 0.12)',
+          overflow: 'hidden',
+          opacity: 1,
+          transform: 'none'
+        }}
+      >
*** End Patch
```
```diff
*** Begin Patch
*** Update File: src/layouts/AppLayout.tsx
@@
-    <div className="page">
-      <NavBar />
+    <div className="page">
+      <NavBar />
+      <div className="header-spacer" />
*** End Patch
```

## Verification Steps
- Run the dev server and load `http://localhost:5173/`. Inspect header/nav/hero: no blue tint, all text fully visible, hero centered with consistent spacing, dropdowns render on white with no blur/tint.
- Toggle theme via `ThemeToggle` and OS dark mode: the site stays on the explicit theme; no automatic blue fallback.
- Check desktop and mobile breakpoints to confirm only spacing changes apply.

Approve this plan to proceed with implementation and deliver the exact diffs and rebuilt UI with 0 traces of the blue overlay.