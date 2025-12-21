import { useEffect, useMemo, useState } from 'react'
import ResponsiveImage from './ResponsiveImage'

type ProjectEntry = {
  id: string
  title: string
  dir: string
  location?: string
}

type Props = {
  entries: ProjectEntry[]
}

export default function ProjectGallery({ entries }: Props) {
  const images = useMemo(() => {
    const modules = import.meta.glob('/src/assets/Images/Projects/**/**.{jpg,jpeg,png,webp}', { eager: false }) as Record<string, () => Promise<any>>
    const byDir: Record<string, Array<() => Promise<any>>> = {}
    Object.entries(modules).forEach(([key, loader]) => {
      const parts = key.split('/src/assets/Images/Projects/')[1]
      if (!parts) return
      const dir = parts.split('/')[0]
      byDir[dir] ||= []
      byDir[dir].push(loader)
    })
    Object.keys(byDir).forEach((d) => byDir[d].sort((a, b) => {
      // stable order by path string via toString() (function carries the path in its name)
      return (a as any).name.localeCompare((b as any).name)
    }))
    return byDir
  }, [])

  return (
    <section className="projects-gallery">
      <div className="gallery-grid">
        {entries.map((entry) => {
          const dirKey = entry.dir
          const imgList = images[dirKey] || []
          const coverLoader = imgList[0]
          return (
            <article key={entry.id} className="gallery-card" aria-label={entry.title}>
              {coverLoader && <GalleryCover loader={coverLoader} alt={entry.title} />}
              <div className="gallery-meta">
                <h3 className="gallery-title">{entry.title}</h3>
                {entry.location && <p className="gallery-location">{entry.location}</p>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function GalleryCover({ loader, alt }: { loader: () => Promise<any>, alt: string }) {
  const [src, setSrc] = useState<string | undefined>(undefined)
  useEffect(() => {
    let mounted = true
    loader().then((mod) => {
      if (mounted) setSrc(mod.default as string)
    }).catch(() => {})
    return () => { mounted = false }
  }, [loader])
  if (!src) return <div className="responsive-image skeleton" aria-hidden="true" />
  return <ResponsiveImage src={src} alt={alt} ratio="4/3" />
}
