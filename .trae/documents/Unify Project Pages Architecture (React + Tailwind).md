# Unified, Data‑Driven Project Pages

## Overview
- Single reusable page: one `ProjectPage` renders all projects by slug.
- Data‑driven content: only `src/data/projects.ts` holds project copy, images, features, highlights and CTA.
- Premium, scalable UI: consistent primitives (`Container`, `Section`, `Heading`) and composable project components.
- Motion‑ready: components use unobtrusive Framer Motion wrappers; works fine without animations if you skip installing the library.

## Mandatory File Structure
```
src/
├─ components/
│  ├─ project/
│  │  ├─ ProjectHero.tsx
│  │  ├─ ProjectIntro.tsx
│  │  ├─ ProjectGallery.tsx
│  │  ├─ ProjectFeatures.tsx
│  │  ├─ ProjectHighlights.tsx
│  │  └─ ProjectCTA.tsx
│  └─ ui/
│     ├─ Section.tsx
│     ├─ Heading.tsx
│     └─ Container.tsx
├─ data/
│  └─ projects.ts
├─ pages/
│  └─ ProjectPage.tsx
└─ routes.tsx
```

## Data: `src/data/projects.ts`
```ts
export type ProjectSlug = 'villa' | 'floor' | 'townhouse' | 'office'

export type ProjectFeature = {
  icon: string
  title: string
  description: string
}

export type Project = {
  slug: ProjectSlug
  title: string
  subtitle: string
  description: string
  heroImage: string
  gallery: string[]
  features: ProjectFeature[]
  highlights: string[]
  ctaText: string
}

export const projects: Record<ProjectSlug, Project> = {
  villa: {
    slug: 'villa',
    title: 'Signature Villas',
    subtitle: 'Crafted luxury living',
    description:
      'Besoke villa residences with precision finishes, timeless facades and elevated spatial flow across prime Riyadh districts.',
    heroImage: '/src/assets/Images/About/Hero-1.JPG',
    gallery: [
      '/src/assets/Images/About/Asset-1.JPG',
      '/src/assets/Images/About/Asset-2.JPG',
      '/src/assets/Images/About/Hero-2.JPG',
      '/src/assets/Images/About/Asset-3.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Asset-12-1.svg', title: 'Precision Craft', description: 'Detail‑led workmanship in every surface.' },
      { icon: '/src/assets/Icons/Vector-2.png', title: 'Prime Districts', description: 'Locations selected for lifestyle and value.' },
      { icon: '/src/assets/Icons/Vector-3.png', title: 'Sustainable Comfort', description: 'Efficient systems with enduring materials.' }
    ],
    highlights: [
      'Grand entries with layered light',
      'Flexible living cores',
      'Facade articulation with premium materials'
    ],
    ctaText: 'Request villa details'
  },
  floor: {
    slug: 'floor',
    title: 'Modern Floor Homes',
    subtitle: 'Efficient, elegant living',
    description:
      'Smartly planned floor apartments with generous daylight, refined finishes and elegant circulation.',
    heroImage: '/src/assets/Images/About/Asset-14.jpg',
    gallery: [
      '/src/assets/Images/About/Asset-14_2.jpg',
      '/src/assets/Images/About/Asset-14_3.jpg',
      '/src/assets/Images/About/Asset-5.jpg'
    ],
    features: [
      { icon: '/src/assets/Icons/Vector.png', title: 'Optimized Plans', description: 'Efficient layouts with clear zoning.' },
      { icon: '/src/assets/Icons/Rectangle-34.png', title: 'Refined Finishes', description: 'Materials that age gracefully.' },
      { icon: '/src/assets/Icons/Rectangle-35.png', title: 'Comfort Systems', description: 'Acoustic and thermal calm.' }
    ],
    highlights: [
      'Balanced proportions',
      'Daylight‑first planning',
      'Durable specification '
    ],
    ctaText: 'Request floor homes brochure'
  },
  townhouse: {
    slug: 'townhouse',
    title: 'Townhouse Collection',
    subtitle: 'Connected, elevated living',
    description:
      'Well‑scaled townhouses blending privacy and connection with layered outdoor rooms and crafted facades.',
    heroImage: '/src/assets/Images/About/Asset-2.JPG',
    gallery: [
      '/src/assets/Images/About/Asset-3.JPG',
      '/src/assets/Images/About/Asset-2_2.JPG',
      '/src/assets/Images/About/Asset-2_3.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Rectangle-36.png', title: 'Layered Outdoor', description: 'Courts and terraces for climate and privacy.' },
      { icon: '/src/assets/Icons/Rectangle-33.png', title: 'Facade Rhythm', description: 'Timeless composition and detail.' },
      { icon: '/src/assets/Icons/Asset-12-2.png', title: 'Adaptable Plans', description: 'Family‑friendly modular cores.' }
    ],
    highlights: [
      'Dual‑aspect living areas',
      'Intuitive circulation',
      'Material palette for longevity'
    ],
    ctaText: 'Explore townhouse availability'
  },
  office: {
    slug: 'office',
    title: 'Office Spaces',
    subtitle: 'Designed for focus and flow',
    description:
      'Elegant office environments with clear navigation, acoustic calm and flexible collaboration zones.',
    heroImage: '/src/assets/Images/Home/CTA.JPG',
    gallery: [
      '/src/assets/Images/About/CTA.JPG',
      '/src/assets/Images/About/CTA_1.JPG',
      '/src/assets/Images/About/Asset-5_1.jpg'
    ],
    features: [
      { icon: '/src/assets/Icons/Masterful-precision-in-everything-we-do..png', title: 'Acoustic Comfort', description: 'Quiet cores with smart materials.' },
      { icon: '/src/assets/Icons/Asset-12-3.png', title: 'Flexible Modules', description: 'Spaces that adapt to teams.' },
      { icon: '/src/assets/Icons/Exceptional-experiences-lasting-relationships..png', title: 'Wayfinding Clarity', description: 'Intuitive movement through space.' }
    ],
    highlights: [
      'Natural light prioritized',
      'High‑quality finishes',
      'Clear signage and flow'
    ],
    ctaText: 'Get office leasing details'
  }
}

export function getProject(slug: string) {
  const s = slug as ProjectSlug
  return projects[s]
}
```

## UI Primitives

### `src/components/ui/Container.tsx`
```tsx
import { ReactNode } from 'react'

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={['mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className].filter(Boolean).join(' ')}>{children}</div>
}
```

### `src/components/ui/Section.tsx`
```tsx
import { ReactNode } from 'react'

type Props = { id?: string; ariaLabel?: string; className?: string; children: ReactNode }

export default function Section({ id, ariaLabel, className, children }: Props) {
  return (
    <section id={id} aria-label={ariaLabel} className={['py-12 md:py-20', className].filter(Boolean).join(' ')}>
      {children}
    </section>
  )
}
```

### `src/components/ui/Heading.tsx`
```tsx
import { ReactNode } from 'react'

type Size = 'xl' | '2xl' | '3xl' | '4xl'

export default function Heading({ size = '3xl', children, center = false, className }: { size?: Size; children: ReactNode; center?: boolean; className?: string }) {
  const map: Record<Size, string> = {
    xl: 'text-2xl md:text-3xl',
    '2xl': 'text-3xl md:text-4xl',
    '3xl': 'text-4xl md:text-5xl',
    '4xl': 'text-5xl md:text-6xl'
  }
  return <h2 className={[map[size], center ? 'text-center' : '', 'tracking-tight font-light', className].filter(Boolean).join(' ')}>{children}</h2>
}
```

## Core Components

### `src/components/project/ProjectHero.tsx`
```tsx
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function ProjectHero({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <header className="relative">
      <img src={image} alt={`${title} hero image`} className="w-full h-[60vh] md:h-[80vh] object-cover" />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      <Container>
        <div className="md:sticky md:top-24 lg:top-28">
          <motion.h1 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 md:mt-10 text-white text-4xl md:text-6xl font-light">
            {title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 text-white/90 text-lg md:text-xl max-w-2xl">
            {subtitle}
          </motion.p>
        </div>
      </Container>
    </header>
  )
}
```

### `src/components/project/ProjectIntro.tsx`
```tsx
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'

export default function ProjectIntro({ title, description }: { title: string; description: string }) {
  return (
    <Section ariaLabel="Project introduction" className="bg-white">
      <Container>
        <Heading size="3xl" className="text-slate-900">{title}</Heading>
        <p className="mt-6 text-slate-700 text-lg leading-relaxed max-w-3xl">{description}</p>
      </Container>
    </Section>
  )
}
```

### `src/components/project/ProjectGallery.tsx`
```tsx
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function ProjectGallery({ images }: { images: string[] }) {
  return (
    <Section ariaLabel="Project gallery" className="bg-slate-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, i) => (
            <motion.figure key={src} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-xl">
              <img src={src} alt={`Project image ${i + 1}`} className="w-full h-64 md:h-80 object-cover" />
            </motion.figure>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

### `src/components/project/ProjectFeatures.tsx`
```tsx
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

type Feature = { icon: string; title: string; description: string }

export default function ProjectFeatures({ features }: { features: Feature[] }) {
  return (
    <Section ariaLabel="Project features" className="bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <div className="flex items-start gap-4">
                <img src={f.icon} alt="" aria-hidden="true" className="h-8 w-8" />
                <div>
                  <h3 className="text-slate-900 text-lg font-medium">{f.title}</h3>
                  <p className="mt-2 text-slate-700 leading-relaxed">{f.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

### `src/components/project/ProjectHighlights.tsx`
```tsx
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function ProjectHighlights({ items }: { items: string[] }) {
  return (
    <Section ariaLabel="Project highlights" className="bg-slate-50">
      <Container>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" aria-hidden="true" />
              <span className="text-slate-800 leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
```

### `src/components/project/ProjectCTA.tsx`
```tsx
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function ProjectCTA({ text }: { text: string }) {
  return (
    <Section ariaLabel="Call to action" className="bg-white">
      <Container>
        <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-12 flex items-center justify-between gap-6 flex-wrap">
          <p className="text-xl md:text-2xl font-light">{text}</p>
          <a href="#contact" className="inline-flex items-center rounded-full bg-white text-slate-900 px-5 py-3 text-sm md:text-base font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            Contact Us
          </a>
        </div>
      </Container>
    </Section>
  )
}
```

## Page: `src/pages/ProjectPage.tsx`
```tsx
import { useParams, Navigate } from 'react-router-dom'
import { getProject } from '@/data/projects'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectIntro from '@/components/project/ProjectIntro'
import ProjectGallery from '@/components/project/ProjectGallery'
import ProjectFeatures from '@/components/project/ProjectFeatures'
import ProjectHighlights from '@/components/project/ProjectHighlights'
import ProjectCTA from '@/components/project/ProjectCTA'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <Navigate to="/" replace />

  return (
    <main className="min-h-screen bg-white">
      <ProjectHero title={project.title} subtitle={project.subtitle} image={project.heroImage} />
      <ProjectIntro title={project.title} description={project.description} />
      <ProjectGallery images={project.gallery} />
      <ProjectFeatures features={project.features} />
      <ProjectHighlights items={project.highlights} />
      <ProjectCTA text={project.ctaText} />
    </main>
  )
}
```

## Routes: `src/routes.tsx`
```tsx
import { Routes, Route } from 'react-router-dom'
import ProjectPage from '@/pages/ProjectPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  )
}
```

## Why This Architecture Is Better
- Single source of truth: content lives only in `projects.ts`. Components never hardcode copy or images.
- Zero layout duplication: one `ProjectPage` composes reusable sections; each section is tested once, reused everywhere.
- Clear hierarchy: UI primitives manage spacing and typography, project components manage structure, data manages content.
- Accessibility: semantic sections, alt text, focus styles and large comfortable typography.
- Responsiveness: unified grid and spacing rhythm across all pages using Tailwind.
- Motion‑ready: discreet Framer Motion wrappers for reveal on scroll without entangling layout with animation logic.

## Add a New Project in Under 5 Minutes
- Add a new entry in `src/data/projects.ts` with slug and fields.
- Link or navigate to `/projects/<slug>`; the dynamic route will render it automatically with zero code duplication.
- Optional: add images to `src/assets/...` and reference file paths in the data object.

## Notes
- If you want reveal animations, install `framer-motion` and the above components will animate while in view.
- Existing English project pages (`Villa.tsx`, `TownHouse.tsx`, `Floor.tsx`, `Office.tsx`) become thin wrappers or routes pointing to `/projects/:slug`. The unified page replaces layout duplication.
