import { Routes, Route } from 'react-router-dom'
import ProjectPage from '@/pages/ProjectPage'
import RealEstateShowcase from '@/pages/english/Projects/projects'
import ProjectsLayout from '@/pages/english/Projects/layout'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/projects" element={
        <ProjectsLayout>
          <RealEstateShowcase />
        </ProjectsLayout>
      } />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  )
}
