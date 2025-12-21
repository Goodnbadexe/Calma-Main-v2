import ProjectCard, { type Project } from '@/components/home/ProjectCard'
import asset4Image from '@/assets/Images/About/Asset-4.JPG'
import asset5Image from '@/assets/Images/About/Asset-5.jpg'
import asset6Image from '@/assets/Images/About/Asset-6.JPG'

const items: Project[] = [
  { id: 'nr100', title: 'NR100', category: 'Residential', image: asset4Image, href: '/projects/nr100', subtitle: 'Refined living, composed.' },
  { id: 'ys200', title: 'YS200', category: 'Residential', image: asset5Image, href: '/projects/ys200', subtitle: 'Craft and comfort aligned.' },
  { id: 'one-tower', title: 'ONE Tower', category: 'Tower', image: asset6Image, href: '/projects/one-tower', subtitle: 'A vertical statement of calm.' },
]

export default function ProjectPreviewGrid() {
  return (
    <section className="luxury-projects-showcase section showcase-strips" aria-label="Project Previews">
      <div className="showcase-header">
        <h2 className="section-title">Discover More</h2>
        <p className="section-description">Preview select developments crafted with timeless precision.</p>
      </div>
      <div className="projects-grid">
        {items.map((p) => (
          <ProjectCard key={p.id} project={{ ...p, descriptor: 'Elegant living, engineered for daily grace.' }} />
        ))}
      </div>
    </section>
  )
}
