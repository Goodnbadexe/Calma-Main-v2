## Palette Purge
- Replace all blue with white/gold/charcoal across theme and components.
- Update focus/link tokens in `src/styles/color-palette.css:51–81` to non-blue: set `--color-info`, `--color-text-link`, `--color-text-link-hover`, and `--color-focus` to charcoal/gold-compliant values.
- Remove high-contrast blue link override in `src/styles/accessibility.css:88–91`; use charcoal with underline for contrast.
- Replace blue gradients in slider progress UI in `src/components/ui/SmoothSlider.tsx:1606–1663` with white→soft gold.

## Header Overhaul
- Make header pure white with a thin charcoal divider/shadow.
- In `src/styles/navbar.css:45–52` change `.nav-solid` background to `#FFFFFF`, add bottom border `1px solid rgba(26,26,26,0.08)` and soft shadow.
- Reduce header height 10–15% via `.glass-nav .section-inner` padding/min-height in `src/styles/navbar.css:73–76` and mobile rules `@media (max-width:1024px)`.
- Ensure vertical centering of nav links (`NavBar.tsx` already uses `alignItems: 'center'`) and keep CTA buttons consistent.
- Style CTAs to white background, charcoal text, gold accent: update `.register-button` in `src/index.css:445–469` to `background:#FFFFFF`, `color:#1A1A1A`, subtle gold border/hover.
- Ensure logo renders and scales proportionally: `src/components/ui/NavBar.tsx:170–176` and size in `src/styles/navbar.css:96–101` (increase to ~28–32px; use responsive rules).

## Hero Video Restoration
- Ensure background video loops smoothly: add `loop` to `<video>` in `src/pages/english/Home/Home.tsx:140–153`.
- Apply subtle dark overlay 10–15%: reduce overlay opacity in `src/pages/english/Home/Home.css:55–61` and unify `src/index.css:500–506` overlay to ~`rgba(0,0,0,0.12)`.
- Confirm responsive scaling: `object-fit: cover` already present in `Home.css:44–47` and min-height in `src/index.css:493–499` (`min-height:60vh`).

## Typography Refinements
- Use consistent clamp scale for headlines/body; tighten header line-height and set body measure to 70–75ch.
- Reduce “Where Vision Takes Shape” ~15% and keep single-line on desktop: adjust the heading class in panorama (`VisionCounter` render) via `.panorama-main-title` in `src/index.css:750–769` (font-size clamp and letter-spacing), or the stat title container in `Home.css`.
- Remove unnecessary full-uppercase where readability suffers: limit to badges and small labels; adjust `.section-badge` usage as needed in `src/pages/english/Home/Home.css:373–386` and `src/index.css:629–643`.

## Layout Rhythm & Grids
- Enforce vertical rhythm: 72px desktop, 48px tablet, 32px mobile.
- Variables already include `--section-vr-desktop` and `--section-vr-mobile` in `src/styles/variables.css:145–147`; add `--section-vr-tablet:48px` and wire tablet media rule in `src/index.css:58–66`.
- Normalize image aspect ratios using CSS `aspect-ratio` on key grids: update `Home.css` `.luxury-image` and showcase grid to avoid stretching (`Home.css:478–484`, `741–746`, plus `src/index.css:1243–1256`).
- Align stats blocks into clean grid: refine `.panorama-stats` grid in `src/index.css:771–783` with even spacing across breakpoints; verify `AnimatedNumber` alignment in `Home.tsx:220–228`.

## Footer Polish
- Add Calma logo before footer brand text: render `BRANDMARK_01-p-2000.png` in `src/components/ui/Footer.tsx:9–16`.
- Switch footer background to pure white with charcoal text; keep 3-column layout: update `src/styles/footer.css:2–6,21–35` (`background:#FFFFFF`, text `#1A1A1A`, subtle divider/shadow), remove any blue/teal.

## Transitions & Motion
- Re-enable soft cinematic page fade-out→fade-in: set `transition.duration` 0.2–0.3s in `src/layouts/AppLayout.tsx:31–37` and overlay fade in `:46–50` to match.
- Ensure hero video remains intact during transitions (no re-mounting or opacity dips on video); keep overlay visibility below header z-index.
- Use smooth easing only; remove any bounce in local animations (audit `framer-motion` variants in `Home.tsx:81–118`).

## Remove Unnecessary Elements
- Remove placeholders and debugging artifacts: search and delete any “0 SQM”, “00 Precision” or empty containers in `src/pages/english/Home/Home.tsx` and dependent sections; ensure no stray outlines/borders remain.

## Color Direction Enforcement
- Final palette: White `#FFFFFF` dominant; Charcoal `#1A1A1A` for text/lines; Soft Gold `#D4B483` or `#C5A46D` accents; Warm Gray `#F5F5F5` for subtle backgrounds.
- Audit hover/focus states in `navbar.css`, `footer.css`, `index.css`, `accessibility.css`, and ensure no blue remains.

## Verification
- Visual QA across breakpoints: desktop/tablet/mobile; check header height reduction and vertical alignment; confirm no blue appears in hover/focus.
- Test hero video load/loop/playback; overlay contrast for text.
- Validate grid alignment for stats and image aspect ratios; ensure no stretching.
- Confirm page transitions feel smooth (200–300ms) and no jarring jumps.

## Deliverables
- A fully white-themed, aligned luxury homepage with restored hero video and overlay; refined header with logo and no blue; clamp-based typography and spacing; responsive layout ready for production.
