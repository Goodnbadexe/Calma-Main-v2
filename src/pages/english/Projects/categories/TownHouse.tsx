import ProjectsGrid from '@/pages/english/Projects/ProjectsGrid'
import { baseProjects } from '@/pages/english/Projects/ProjectsPage'
import type { ProjectFilters } from '@/types/project'
import { useState, useMemo } from 'react'

export default function ProjectsTownHouse() {
  const [filters, setFilters] = useState<ProjectFilters>({ selectedCategory: 'Residential', searchQuery: '', sortBy: 'Newest' })
  const visible = useMemo(() => baseProjects.filter(p => p.category === 'Residential'), [])
  return (
    <main className="page luxury-real-estate">
      <ProjectsGrid
        projects={visible}
        filters={filters}
        onUpdateFilters={(next) => setFilters((f) => ({ ...f, ...next }))}
        onOpenProject={() => {}}
        labels={{ searchPlaceholder: 'Search town houses', sortLabel: 'Sort' }}
      />
      {/* TODO: Filter specifically for Town House projects when data available */}
    </main>
  )
}

