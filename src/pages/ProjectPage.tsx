import { useParams } from 'react-router-dom'
import ProjectsLayout from '@/pages/english/Projects/layout'

export default function ProjectPage() {
  const { slug } = useParams()

  return (
    <ProjectsLayout>
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-serif text-[#d4cfbc] mb-6">
            Project Details: {slug}
          </h1>
          <p className="text-[#d4cfbc]/60">
            Details for project {slug} will appear here.
          </p>
        </div>
      </div>
    </ProjectsLayout>
  )
}
