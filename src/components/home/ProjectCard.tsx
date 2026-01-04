import { motion } from 'framer-motion'
import { useState } from 'react'

export type Project = {
  id: string
  title: string
  subtitle: string
  category: string
  image: string | { src: string }
  href: string
  descriptor?: string
}

type Props = {
  project: Project
  active?: boolean
}

export default function ProjectCard({ project, active }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const imageSrc = typeof project.image === 'string' ? project.image : project.image.src
  
  return (
    <a href={project.href} className="project-showcase-card" aria-label={project.title}>
      <div className="project-image">
        <img
          src={imageSrc}
          alt={project.title}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          srcSet={`${imageSrc} 1x, ${imageSrc} 2x`}
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            const t = e.currentTarget
            if (t.src !== '/placeholder.svg') {
              if (process.env.NODE_ENV !== 'production') console.warn('Image failed to load, using placeholder:', t.src)
              t.src = '/placeholder.svg'
              t.srcset = '/placeholder.svg 1x, /placeholder.svg 2x'
            }
          }}
        />
        {!imgLoaded && <div className="skeleton-overlay" aria-hidden="true" />}
        <div className="project-overlay">
          <span className="project-category">{project.category}</span>
          <div className="project-stats">
            <span className="stat-highlight">{project.title}</span>
            <span className="stat-text">{project.subtitle}</span>
          </div>
        </div>
      </div>
      <motion.div
        className="project-content"
        animate={active ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      >
        <h3>{project.title}</h3>
        <p>{project.descriptor ?? project.subtitle}</p>
        <div className="project-actions">
          <span className="hero-button luxury-button">View Project</span>
        </div>
      </motion.div>
    </a>
  )
}
