import { useMemo, useState, useDeferredValue } from 'react'
import ProjectCard from '@/components/home/ProjectCard'
import type { Project, ProjectFilters, Category, SortBy } from '@/types/project'
import { useVirtualGrid } from '@/hooks/useVirtualGrid'

type Props = {
  projects: Project[]
  filters: ProjectFilters
  onUpdateFilters: (next: Partial<ProjectFilters>) => void
  onOpenProject: (project: Project) => void
  labels?: {
    searchPlaceholder?: string
    sortLabel?: string
  }
}

const categories: Category[] = [
  'Residential',
  'Commercial',
  'Mixed-Use',
  'Luxury',
  'Sustainable',
  'Community',
  'Tower',
  'Featured',
]

const sortOptions: SortBy[] = ['Newest', 'Value', 'Type']

export default function ProjectsGrid({ projects, filters, onUpdateFilters, onOpenProject, labels }: Props) {
  const [query, setQuery] = useState(filters.searchQuery ?? '')
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const q = (deferredQuery ?? '').toLowerCase().trim()
    let list = projects
    if (filters.selectedCategory) list = list.filter((p) => p.category === filters.selectedCategory)
    if (filters.activePhase) list = list.filter((p) => (p.phase ?? '').toLowerCase() === filters.activePhase?.toLowerCase())
    if (filters.isFeatured) list = list.filter((p) => p.featured)
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q)
      )
    }
    switch (filters.sortBy) {
      case 'Type':
        return [...list].sort((a, b) => a.type.localeCompare(b.type))
      case 'Value':
        return [...list].sort((a, b) => parseFloat(b.valueLabel.replace(/[^0-9.]/g, '')) - parseFloat(a.valueLabel.replace(/[^0-9.]/g, '')))
      case 'Newest':
      default:
        return list
    }
  }, [projects, filters.selectedCategory, filters.activePhase, filters.isFeatured, filters.sortBy, deferredQuery])

  const { startIndex, endIndex } = useVirtualGrid({
    itemCount: filtered.length,
    estimateItemHeight: 360,
    overscanRows: 2,
  })

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <header className="sticky top-16 z-30 bg-card/80 backdrop-blur-md border border-primary/10 rounded-2xl px-4 py-3 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder={labels?.searchPlaceholder ?? "Search projects"}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              onUpdateFilters({ searchQuery: e.target.value })
            }}
            className="flex-1 min-w-[220px] bg-neutral-100 text-neutral-900 placeholder:text-neutral-900 placeholder:opacity-70 border border-neutral-900 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 hover:bg-white transition-colors"
            aria-label="Search projects"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = filters.selectedCategory === c
              return (
                <button
                  key={c}
                  onClick={() => onUpdateFilters({ selectedCategory: active ? null : c })}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    active ? 'bg-primary/20 border-primary text-primary' : 'bg-secondary/40 hover:bg-secondary/60'
                  }`}
                  aria-pressed={active}
                >
                  {c}
                </button>
              )
            })}
          </div>
          <div className="ml-auto">
            <label className="sr-only" htmlFor="sort">{labels?.sortLabel ?? "Sort"}</label>
            <select
              id="sort"
              value={filters.sortBy ?? 'Newest'}
              onChange={(e) => onUpdateFilters({ sortBy: e.target.value as SortBy })}
              className="px-3 py-2 rounded-lg border bg-secondary/40 hover:bg-secondary/60"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div
        className="grid gap-4 md:gap-6"
        style={{
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
          @media (min-width: 1280px) {
            .grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
          }
        `}</style>
        {filtered.slice(startIndex, endIndex).map((p) => (
          <div key={p.id} className="relative">
            <ProjectCard
              project={{
                id: String(p.id),
                title: p.name,
                subtitle: p.type,
                category: p.category,
                image: p.image,
                href: `/projects/${String(p.id)}`,
                descriptor: `${p.location} • ${p.valueLabel}`,
              }}
            />
            <button
              aria-label={`Open ${p.name}`}
              className="absolute inset-0 z-10 bg-transparent"
              onClick={(e) => {
                e.preventDefault()
                onOpenProject(p)
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
