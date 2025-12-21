import { useEffect, useMemo, useState } from 'react'
import RadialNavigator from './RadialNavigator'
import ProjectsGrid from './ProjectsGrid'
import ProjectSlideOver from './ProjectSlideOver'
import type { Project, ProjectFilters, Category } from '@/types/project'
import { resolveAssetUrl } from '@/utils/assetResolver'
import './Project.css'

export const baseProjects: Project[] = [
  { id: 'nr100', name: 'NR100', category: 'Residential', type: 'Residences', location: 'Riyadh North', valueLabel: '$2.8M', image: resolveAssetUrl('/src/assets/Images/About/Asset-4.JPG'), featured: true },
  { id: 'ys200', name: 'YS200', category: 'Residential', type: 'Residences', location: 'Riyadh South', valueLabel: '$3.2M', image: resolveAssetUrl('/src/assets/Images/About/Asset-5.jpg') },
  { id: 'one-tower', name: 'ONE Tower', category: 'Tower', type: 'Luxury Tower', location: 'Financial District', valueLabel: '$45.2M', image: resolveAssetUrl('/src/assets/Images/About/Asset-6.JPG'), featured: true },
  { id: 'retail-plaza', name: 'Retail Plaza', category: 'Commercial', type: 'Retail', location: 'Tahlia Street', valueLabel: '$15.3M', image: resolveAssetUrl('/src/assets/Backgrounds/CTA-BG-p-1600.jpg') },
  { id: 'garden-estates', name: 'Garden Estates', category: 'Residential', type: 'Estates', location: 'Riyadh Central', valueLabel: '$4.1M', image: resolveAssetUrl('/src/assets/Backgrounds/About-Header-p-1600.jpg') },
  { id: 'green-homes', name: 'Green Homes', category: 'Sustainable', type: 'Eco', location: 'NEOM Vicinity', valueLabel: '$4.6M', image: resolveAssetUrl('/src/assets/Backgrounds/Abou-1-p-1600.jpg') },
  { id: 'business-hub', name: 'Business Hub Central', category: 'Commercial', type: 'Office', location: 'King Fahd Road', valueLabel: '$12.5M', image: resolveAssetUrl('/src/assets/Images/About/About-Header.jpg') },
  { id: 'community-integrated', name: 'Family Community', category: 'Community', type: 'Community', location: 'Al Nakheel', valueLabel: '$2.1M', image: resolveAssetUrl('/src/assets/Images/About/Brand-Values-1.JPG') },
]

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({ selectedCategory: null, searchQuery: '', sortBy: 'Newest' })
  const [isDocked, setIsDocked] = useState(false)
  const [openProject, setOpenProject] = useState<Project | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const threshold = 240
      setIsDocked(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleProjects = useMemo(() => {
    return baseProjects
  }, [])

  return (
    <div className="page luxury-real-estate">
      <div className="relative z-10">
        <ProjectsGrid
          projects={visibleProjects}
          filters={filters}
          onUpdateFilters={(next) => setFilters((f) => ({ ...f, ...next }))}
          onOpenProject={(p) => setOpenProject(p)}
        />
      </div>
      <ProjectSlideOver
        project={openProject}
        open={!!openProject}
        onClose={() => setOpenProject(null)}
      />
    </div>
  )
}
