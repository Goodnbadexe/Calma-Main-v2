# Localization Parity Audit and Refactor Plan

## Overview

The goal of this document is to ensure structural and design parity between the Arabic and English versions of the Calma Recreation website. Currently the repository contains separate directories for Arabic (`src/pages/arabic`) and English (`src/pages/english`), which has led to drift in page structure and inconsistent user experiences. To support future expansion while keeping the site fast and maintainable, shared page layouts should be used with locale-specific translations.

## Parity & Drift Issues

### About Page: `src/pages/arabic/عن كالما` vs `src/pages/english/About`

- **Difference:** The English side includes `AboutImproved.tsx` and `About-responsive.css` variants that have no Arabic equivalents, which means the two versions use different implementations and styling paths.
- **Risk:** ❌ *Unintentional drift* — if one language evolves separately, users may see inconsistent layouts or features.
- **Recommended Fix:** Consolidate on a single shared About page component that renders the same structure for both locales. Pull all copy from translation files, and gate any experimental layout (e.g., “Improved”) behind a feature or locale flag.

### Home Page: `src/pages/arabic/الرئيسية/الرئيسية.tsx` vs `src/pages/english/Home/Home.tsx`

- **Difference:** The English Home page renders a stack of shared components (AboutCalma, Excellence, Pillars, KPIStats, TrustStrip, TestimonialsBand, ProjectPreviewGrid, MissionVision). The Arabic Home stops after a smaller hero/community/CEO flow and only appends `FeaturedProjectsCarousel`.
- **Risk:** ❌ *Unintentional drift* — content density, component coverage and layout differ, leading to a fragmented experience.
- **Recommended Fix:** Move all common sections into shared components and render the same sequence for both locales. Use translation files for text and gate optional extras behind feature flags.

### Projects Page: `src/pages/arabic/المشاريع` vs `src/pages/english/Projects`

- **Difference:** The English Projects directory contains numerous interactive subcomponents (`ProjectSlideOver`, `ProjectsGrid`, `ProjectsPage`, `RadialNavigator`, etc.) and a complex 3D/scroll‑driven experience in `Projects.tsx`. The Arabic implementation is a single-page filter/grid experience without these supporting components.
- **Risk:** ❌ *Unintentional drift* — different UX, data handling and navigation can confuse users and increase maintenance burden.
- **Recommended Fix:** Extract the advanced Projects experience into shared components and wrap locale‑specific strings. If the simpler Arabic view is intentional, gate the advanced UI behind a feature or locale flag and document the divergence.

### Contact Page: `src/pages/arabic/تواصل معنا` vs `src/pages/english/Contact`

- **Difference:** The Arabic directory includes both `Contact.tsx` and `تواصل معنا.tsx` plus a dedicated CSS file, while the English side has a single `Contact.tsx`. This suggests duplication or orphaned variants.
- **Risk:** ⚠️ *Acceptable divergence* if one is legacy, otherwise ❌ drift.
- **Recommended Fix:** Determine which implementation is canonical and delete or merge duplicates. Use a shared component with translation props for both routes.

### Root Localization Assets

- **Difference:** Arabic pages carry a top‑level `arabic.css` that is not mirrored in English, implying potential styling inconsistencies across layouts.
- **Risk:** ⚠️ *Acceptable divergence* if the file contains purely RTL helpers; otherwise ❌ drift.
- **Recommended Fix:** Centralize RTL/LTR styling in a shared theme or scoped CSS modules. Avoid language‑specific global styles where possible.

## Architecture Recommendation

To prevent future drift and ensure parity between locales:

- **Shared Page Shells:** Create unified page shells (Home, About, Projects, Contact) that assemble common sections/components. Place these in `src/components/pages` or a similar directory.
- **Locale‑Based Routing:** Use dynamic routes like `src/pages/[locale]/home.tsx` that wrap the shared layout with a translation context. The `[locale]` parameter can be `en` or `ar`.
- **Translation Files:** Store locale‑specific strings in JSON files under `src/locales/en/` and `src/locales/ar/`. Use a translation hook to fetch text, e.g., `t('home.hero.title')`.
- **Feature Flags:** For experimental or language‑specific features (e.g., an improved About layout or advanced Projects navigator), wrap them in feature flags or locale checks:

  ```tsx
  {locale === 'en' && <AboutImproved />}
  ```

- **Remove Duplication:** Once shared shells are implemented, remove duplicate directories (`src/pages/arabic` and `src/pages/english`). Rely on the locale parameter to serve the correct translations.
- **Centralize Styling:** Provide RTL/LTR handling in a shared theme using CSS logical properties or separate modules. Avoid top‑level language‑specific CSS files.

### Example Structure

```
src/pages/[locale]/
  home.tsx
  about.tsx
  projects.tsx
  contact.tsx

src/components/pages/
  HomeLayout.tsx
  AboutLayout.tsx
  ProjectsLayout.tsx
  ContactLayout.tsx

src/locales/en/
  home.json
  about.json
  projects.json
  contact.json

src/locales/ar/
  home.json
  about.json
  projects.json
  contact.json
```

## Next Steps

1. **Audit Files:** Review each Arabic and English page to identify unused or orphaned files and ensure a one‑to‑one mapping between routes.
2. **Build Shared Components:** Implement the shared layout components for Home, About, Projects and Contact, moving existing logic into these components.
3. **Set Up Translations:** Introduce translation JSON files for each locale and migrate hardcoded strings into these files.
4. **Refactor Routing:** Implement `[locale]` dynamic routing so that `/{locale}/home` and similar paths render the appropriate translations while using the same code path.
5. **Feature Flagging:** Identify experimental features (such as `AboutImproved` and advanced Projects views) and wrap them behind locale or feature toggles.
6. **Clean Up:** After migration, remove unused files (e.g., duplicate Contact pages) and language‑specific global CSS, documenting any intentional divergences.

By following this plan, the Arabic and English versions of the site will share the same core code, reducing maintenance overhead, improving load performance, and ensuring a consistent user experience across locales.
