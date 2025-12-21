## Overview
- Build a premium Editorial News page with auto-synced LinkedIn feed, company news, and a newsletter block.
- Keep the existing Vite + React stack; add a secure serverless backend for LinkedIn Marketing API.
- Full English + Arabic (RTL) support, responsive grid, subtle motion, SEO and accessibility.

## Architecture
- Frontend: React (Vite) with TailwindCSS and Framer Motion.
- Routing: Integrate new routes under existing React Router (English + Arabic).
- Backend: Serverless functions (Vercel) for LinkedIn API:
  - `GET /api/linkedin/posts` — fetch organization posts with media + engagement.
  - Optional: `POST /api/newsletter/subscribe` — minimal email capture.
- Config: Environment variables for LinkedIn secrets and Org URN.
- Caching: Serverless in-memory + optional KV cache (TTL) to respect rate limits.

## LinkedIn Integration
- Authentication: OAuth 2.0 application with scopes `r_organization_social` (read) and organization page role.
- Endpoints:
  - Posts API: Query posts by organization author — `GET posts?q=authors&authors=List(urn:li:organization:{ORG_ID})&sortBy=LAST_MODIFIED&count=24` [1].
  - Engagement: Social Actions — `GET /socialActions/{encodedPostUrn}` for likes/comments/shares [1].
  - Media: Use projections to resolve `digitalmediaAsset` for images and playable streams for video where available [2][3].
- Response shaping: Normalize to a frontend-friendly schema: id, text, date, media (image/video), metrics, permalink.
- Fallbacks: If API fails or permissions missing, serve cached data (if any) or show graceful error cards with a CTA to LinkedIn.

## Data Models
- `LinkedInPost`: `{ id, text, createdAt, mediaType, mediaUrl, thumbnailUrl, metrics: { likes, comments, shares }, link }`.
- `CompanyNewsItem`: `{ id, category, title, excerpt, imageUrl, publishedAt, link }`.
- Newsletter payload: `{ email }`.

## Frontend Implementation
- New page components (English + Arabic):
  - Hero: Title "Latest News & Updates" + subtitle; large calm spacing.
  - LinkedIn Feed Grid:
    - Responsive: 1-col mobile, 2-col tablet, 3-col desktop.
    - Card layout: media-first, content below, rounded (16–24px), soft shadow.
    - Post text clamp to 3–4 lines with "Read more" expand.
    - Metrics, date, and CTA "View on LinkedIn →".
    - Subtle motion: fade-in on scroll, slight hover lift.
  - Company News Editorial:
    - Two-column desktop, one-column mobile.
    - Featured image, category pill, H3 title, short excerpt, "Read More →".
  - Newsletter:
    - Minimal email input, strong CTA; validate email; optional backend submit.
- Arabic (RTL): mirror layout, translated strings, RTL typography.

## Styling & UX
- Tailwind: neutral palette (off-white, warm gray, charcoal) consistent with brand.
- Spacing: editorial rhythm, 8pt grid scaled for luxury feel.
- Motion: Framer Motion with gentle fade/translate; reduced motion respected.
- Media: aspect-ratio utilities for consistent thumbnails; video previews where available.

## i18n & RTL
- Use existing language context and RTL handling.
- Provide Arabic translations for all labels; route mirrors (e.g., `/ar/news`).
- Typography: Arabic font stack; logical properties for padding/margins under RTL.

## SEO & Accessibility
- Semantic structure: `main`, `section`, proper headings.
- Meta tags and Open Graph for News page.
- Images with descriptive `alt`; buttons/links keyboard focus; high contrast.
- Lazy-load media; prefetch API on interaction.

## Caching & Rate Limits
- Cache LinkedIn responses for 10–15 minutes (configurable TTL) to reduce API calls.
- Stale-while-revalidate pattern: serve cache immediately, refresh in background.
- Error handling: circuit-breaker on repeated failures to avoid rate-limit loops.

## Security
- Secrets via environment variables: `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_ORG_URN`.
- Never log tokens; short-lived access tokens refreshed securely.
- Validate newsletter inputs; basic bot protection (honeypot or minimal throttling).

## Preview & Validation
- Render exact final layout in dev.
- Verify LinkedIn posts load live and in grid order; media correctness.
- Test Arabic RTL layout and translations.
- Accessibility checks (keyboard, contrast); Lighthouse pass; responsive across breakpoints.

## Deliverables
- Serverless API: `GET /api/linkedin/posts` with caching and fallbacks.
- News page components for English + Arabic with editorial and newsletter sections.
- Tailwind + Framer Motion styling aligned to CALMA brand.
- Documentation: how to set secrets, deploy, and extend.

## References
- [1] Posts API (LinkedIn Marketing): https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
- [2] UGC Post API (Legacy): https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/ugc-post-api
- [3] UGC media projections example: https://learn.microsoft.com/en-us/linkedin/compliance/integrations/shares/ugc-post-api