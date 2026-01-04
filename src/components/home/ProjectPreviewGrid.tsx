import ProjectCard, { type Project } from '@/components/home/ProjectCard'
import { projectsData } from '@/data/projects.data'
import { pickPreviewImage } from '@/utils/assetResolver'

const unitLabel: Record<string, string> = {
  villa: 'Residential',
  floor: 'Floors',
  townhouse: 'Townhouse',
  office: 'Office',
}

const items: Project[] = projectsData.slice(0, 9).map((p) => ({
  id: p.id,
  title: (p.nameEN || p.id).split('•')[0].trim(),
  category: unitLabel[p.unitType] || 'Project',
  image: pickPreviewImage(p.assets.imagesGlob),
  href: '/en/projects',
  subtitle: p.locationEN || '',
}))

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
