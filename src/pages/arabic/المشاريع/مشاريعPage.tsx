import { useEffect, useMemo, useState } from 'react'
import RadialNavigator from '@/pages/english/Projects/RadialNavigator'
import ProjectsGrid from '@/pages/english/Projects/ProjectsGrid'
import ProjectSlideOver from '@/pages/english/Projects/ProjectSlideOver'
import type { Project, ProjectFilters, Category } from '@/types/project'
import { resolveAssetUrl } from '@/utils/assetResolver'
import '@/pages/english/Projects/Project.css'

const المشاريع: Project[] = [
  { id: 'nr100', name: 'NR100', category: 'Residential', type: 'سكني', location: 'شمال الرياض', valueLabel: '$2.8M', image: resolveAssetUrl('/src/assets/Images/About/Asset-4.JPG'), featured: true },
  { id: 'ys200', name: 'YS200', category: 'Residential', type: 'سكني', location: 'جنوب الرياض', valueLabel: '$3.2M', image: resolveAssetUrl('/src/assets/Images/About/Asset-5.jpg') },
  { id: 'one-tower', name: 'ONE Tower', category: 'Tower', type: 'برج فاخر', location: 'الحي المالي', valueLabel: '$45.2M', image: resolveAssetUrl('/src/assets/Images/About/Asset-6.JPG'), featured: true },
  { id: 'retail-plaza', name: 'Retail Plaza', category: 'Commercial', type: 'تجاري', location: 'شارع التحلية', valueLabel: '$15.3M', image: resolveAssetUrl('/src/assets/Backgrounds/CTA-BG-p-1600.jpg') },
]

export default function مشاريعPage() {
  const [filters, setFilters] = useState<ProjectFilters>({ selectedCategory: null, searchQuery: '', sortBy: 'Newest' })
  const [isDocked, setIsDocked] = useState(false)
  const [openProject, setOpenProject] = useState<Project | null>(null)

  useEffect(() => {
    const onScroll = () => setIsDocked(window.scrollY > 240)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleProjects = useMemo(() => المشاريع, [])

  return (
    <div className="page luxury-real-estate" dir="rtl">
      <div className="relative min-h-[160vh]">
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, var(--color-overlay-dark) 0%, var(--color-overlay-dark) 70%)`,
            }}
          />
          <RadialNavigator
            selectedCategory={filters.selectedCategory as Category | null}
            activePhase={filters.activePhase ?? null}
            isDocked={isDocked}
            onHoverCategory={() => {}}
            onSelectCategory={(label) => {
              const normalized = (label as Category) ?? null
              setFilters((f) => ({ ...f, selectedCategory: f.selectedCategory === normalized ? null : normalized }))
            }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <ProjectsGrid
          projects={visibleProjects}
          filters={filters}
          onUpdateFilters={(next) => setFilters((f) => ({ ...f, ...next }))}
          onOpenProject={(p) => setOpenProject(p)}
          labels={{ searchPlaceholder: 'ابحث عن المشاريع', sortLabel: 'ترتيب' }}
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

