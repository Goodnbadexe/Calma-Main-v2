import { useEffect, useMemo, useState } from 'react'
import ResponsiveImage from './ResponsiveImage'
import { getProjectAssets } from '@/utils/assetResolver'

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
    const modules = getProjectAssets()
    const byDir: Record<string, string[]> = {}
    Object.entries(modules).forEach(([key, url]) => {
      const parts = key.split('/src/assets/Images/Projects/')[1]
      if (!parts) return
      const dir = parts.split('/')[0]
      byDir[dir] ||= []
      byDir[dir].push(url)
    })
    // Sort logic if needed, but here urls are strings.
    // Assuming file names are included in url or we need to extract them for sorting.
    // For now just sort by URL string which should preserve order roughly if named sequentially.
    Object.keys(byDir).forEach((d) => byDir[d].sort())
    return byDir
  }, [])

  return (
    <section className="projects-gallery">
      <div className="gallery-grid">
        {entries.map((entry) => {
          const dirKey = entry.dir
          const imgList = images[dirKey] || []
          const coverUrl = imgList[0]
          return (
            <article key={entry.id} className="gallery-card" aria-label={entry.title}>
              {coverUrl && <GalleryCover src={coverUrl} alt={entry.title} />}
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

function GalleryCover({ src, alt }: { src: string, alt: string }) {
  if (!src) return <div className="responsive-image skeleton" aria-hidden="true" />
  return <ResponsiveImage src={src} alt={alt} ratio="4/3" />
}
