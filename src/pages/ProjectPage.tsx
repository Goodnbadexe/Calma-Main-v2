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

