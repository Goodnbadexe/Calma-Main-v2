import { Routes, Route } from 'react-router-dom'
import ProjectPage from '@/pages/ProjectPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  )
}

