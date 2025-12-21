import ProjectsGrid from '@/pages/english/Projects/ProjectsGrid'
import { baseProjects } from '@/pages/english/Projects/ProjectsPage'
import type { ProjectFilters } from '@/types/project'
import { useState, useMemo } from 'react'

export default function ProjectsOffice() {
  const [filters, setFilters] = useState<ProjectFilters>({ selectedCategory: 'Commercial', searchQuery: '', sortBy: 'Newest' })
  const visible = useMemo(() => baseProjects.filter(p => p.category === 'Commercial'), [])
  return (
    <main className="page luxury-real-estate">
      <ProjectsGrid
        projects={visible}
        filters={filters}
        onUpdateFilters={(next) => setFilters((f) => ({ ...f, ...next }))}
        onOpenProject={() => {}}
        labels={{ searchPlaceholder: 'Search offices', sortLabel: 'Sort' }}
      />
      {/* TODO: Filter specifically for Office subtypes when data available */}
    </main>
  )
}

