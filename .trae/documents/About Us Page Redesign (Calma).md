## Files To Update/Add
- Update `src/pages/english/About/AboutImproved.tsx` to restructure section markup per spec.
- Update `src/pages/english/About/About-responsive.css` for exact typography, spacing and responsive layout.
- Add `src/components/about/ImpactMetrics.tsx` for unified metric cards.
- Add `src/pages/english/About/About.metrics.css` scoped styles for the metrics section.
- Update `src/components/ui/NavBar.tsx` and `src/styles/navbar.css` to highlight the active nav item and ensure solid background on scroll.
- Keep existing `Footer` intact; minor spacing tweaks in `src/styles/footer.css` if needed.

## Hero Section
- Replace collage grid with a single image/video background and a semi-transparent dark overlay. Simplify the current gallery in `AboutImproved.tsx` (lines `140–175`) to render one `img`/`video` element.
- Enforce minimum contrast (4.5:1) by darkening the overlay in `About-responsive.css` (`.hero-overlay`).
- Typography:
  - Set title to `48px`, `line-height: 1.1` via `.hero-title` in `About-responsive.css` (`75–81`).
  - Place subtitle `8px` below title, with `20px` font and lighter weight via `.hero-subtitle` (`86–94`).
- CTA:
  - Primary button label “Discover Our Vision”: center under subtitle with `24px` top margin; padding `16px 32px`; `border-radius: 8px`; hover slightly darkens (no scale). Update `.hero-button-primary` (`105–121`).
- Navigation clearance:
  - Ensure `40px` top padding between nav bottom and hero text by adding top padding to `.hero-content` (`54–61`) and/or container offset. Nav bar already switches classes on scroll (`NavBar.tsx:80–83`); keep behavior.
- Micro-adjust: apply `transform: translateY(2px)` to `.hero-title` when cramped (media query breakpoint).

## Looking Ahead Section
- Pair content with a supporting image:
  - Desktop: image right; Mobile: image above text. Use a two-column grid in `AboutImproved.tsx` (section currently around `231–253`).
  - Image constraints: aspect ratio `3:2`; `border-radius: 4px`.
- Heading: H2 at `32px` with `letter-spacing: -0.02em` via `.section-title` override.
- Body: `18px`, `line-height: 1.5`, limited to 3–4 lines.
- Button: “Learn About Our Approach” flush-left under paragraph with `24px` top margin; treat as secondary with `14px` text.
- Section spacing: `64px` padding above and below.

## Impact Metrics Section
- Create `src/components/about/ImpactMetrics.tsx` rendering 4 uniform cards with props `{number,label,subLabel}`.
- Card spec:
  - Large number centered top (`>=40px`), label uppercase `14px`, optional sub-label smaller.
  - Style: light background `#F8F8F8`, subtle shadow, `12px` radius, internal padding `24px`.
- Layout:
  - Desktop: 2x2 grid with `24px` gaps (rows and columns).
  - Tablet: 2 per row; Mobile: single column, `16px` vertical spacing.
- Contextual copy above grid: heading “Our Impact” + one-line summary.
- Data: use existing values (28, 77,097 m², 130,000+ m², 700+ units). If any future metric is unknown, render “TBD” in italic grey.
- Insert this section in `AboutImproved.tsx` replacing `<TrustStrip />` (`255–257`).

## Our Mission Section
- Two-column layout: left image `45%`, right text `55%` on desktop; stack on mobile with `16px` spacing. Update `.dual-split-grid` in CSS.
- Image styling: fixed `4:3` aspect via `aspect-ratio: 4/3`, `8px` radius, subtle shadow.
- Text:
  - Heading “Our Mission” `36px` with `16px` bottom margin (`AboutImproved.tsx:267` + CSS).
  - Break statement into short paragraphs or bullets; use 18px font, `line-height: 1.6`.
- Spacing: `64px` top and bottom; vertically center text alongside image.

## Our Story / Why CALMA Exists
- Add capsule label “Our Story” above heading with uppercase text, gold accent, `24px` height, `8px` horizontal padding, `4px` radius. The existing `.section-badge` in `About.css:171–182` will be tuned.
- Heading `40px`, bold, `8px` bottom margin.
- Description: 2–3 short paragraphs; optionally add bullet points for key values.
- Alignment: image left, text right on desktop; image width tracks text height; `12px` gap; mobile image top with `24px` bottom margin.

## Our Vision & CEO Message
- Vision statement: centered block, lighter weight, serif/italic style; max width `60%` centered. Implement as a distinct block in “Our Vision” section (`331–362`).
- CEO message:
  - Distinct section background (light grey) or subtle border.
  - Headshot at `80x80` (circular or rounded rectangle) on left; quote on right.
  - Quote larger italic with quotation marks; name and title in uppercase/small caps.
  - Max quote width `~500px` on desktop.
  - Spacing: `48px` padding; `32px` vertical margins separating adjacent sections. Adjust existing markup at `365–408`.

## Navigation & Footer
- Active nav item (“About”) highlighted: add active state based on `useLocation()` and apply a pill/underline style in `NavBar.tsx` and `navbar.css`.
- Keep footer layout unchanged; ensure consistent spacing and adequate copyright margin.

## Spacing & Typography System
- Adopt 8-pt spacing: normalize paddings/margins to multiples of 8 (`8, 16, 24, 32, 64`).
- Headings line-height `1.1–1.2`; body `1.5–1.6`.
- Ensure images never touch viewport edges: `>=16px` horizontal padding on mobile, `24–32px` on desktop.
- Micro-adjust via `±2–4px` where elements feel tight (e.g., hero subtitle).

## Accessibility & Performance
- Verify contrast with `#000` overlay alpha to meet `4.5:1`.
- Use `alt` text on imagery throughout (already present in `AboutImproved.tsx` e.g., `345–350`, `382–387`).
- Keep lazy loading (`loading="lazy"`) and `decoding="async"` on images as currently used.

## Verification
- Visual QA with responsive breakpoints (mobile/tablet/desktop).
- Ensure active nav highlights on `/about` and navbar switches to solid on scroll.
- Confirm metrics render correctly with values populated and responsive grid behavior.
- Cross-check that CSS updates do not regress Home page components (scope metrics CSS to About page).
