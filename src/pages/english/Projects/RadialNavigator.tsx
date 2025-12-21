import { useMemo } from 'react'
import type { CategoryArc, Category } from '@/types/project'

type Props = {
  arcs?: CategoryArc[]
  selectedCategory?: Category | null
  activePhase?: string | null
  isDocked?: boolean
  onHoverCategory?: (label: string) => void
  onSelectCategory?: (label: string) => void
}

const defaultArcs: CategoryArc[] = [
  { id: 'res', label: 'Residential', kind: 'category', d: 'M251.92,202.7c3.1-1.38,6.27-2.59,9.49-3.64l-13.2-40.61c-5.08.39-10.12,1.07-15.11,1.99l18.82,42.27Z' },
  { id: 'com', label: 'Commercial', kind: 'category', d: 'M234.34,212.85c2.75-1.99,5.59-3.84,8.53-5.53l-24.95-43.22c-5.12,1.52-10.15,3.32-15.08,5.39l31.5,43.36Z' },
  { id: 'mix', label: 'Mixed-Use', kind: 'category', d: 'M219.24,226.43c2.28-2.53,4.68-4.93,7.19-7.18l-38.34-42.58c-4.86,2.72-9.55,5.76-14.09,9.03l45.24,40.73Z' },
  { id: 'lux', label: 'Luxury', kind: 'category', d: 'M271.23,196.43c3.31-.7,6.66-1.23,10.04-1.59l-3.75-35.68c-4.82-.61-9.64-.97-14.44-1.09l8.15,38.36Z' },
  { id: 'sus', label: 'Sustainable', kind: 'category', d: 'M199.05,261.4c1.04-3.19,2.25-6.36,3.65-9.49l-64.67-28.79c-3.27,4.94-6.28,10.11-8.99,15.54l70.01,22.75Z' },
  { id: 'com2', label: 'Community', kind: 'category', d: 'M207.31,242.85c1.71-2.96,3.56-5.8,5.53-8.53l-52.09-37.85c-4.25,3.9-8.28,8.09-12.07,12.52l58.63,33.85Z' },
  { id: 'tower', label: 'Tower', kind: 'category', d: 'M330.92,202.69c3.13,1.4,6.15,2.94,9.06,4.61l9.67-16.75c-3.12-2.76-6.4-5.37-9.84-7.82l-8.89,19.96Z' },
  { id: 'feat', label: 'Featured', kind: 'featured', d: 'M363.59,356.4c-2.28,2.53-4.68,4.93-7.19,7.18l108.25,120.23c7.08-5.62,13.84-11.69,20.25-18.18l-121.31-109.23Z' },
  { id: 'phase1', label: 'Phase I', kind: 'phase', d: 'M321.43,199.05l7.53-23.19c-3.34-1.88-6.78-3.63-10.35-5.22-.46-.21-.94-.38-1.4-.58l-5.6,26.36c3.29.7,6.57,1.57,9.82,2.63Z' },
  { id: 'phase2', label: 'Phase II', kind: 'phase', d: 'M194.84,301.57c-.36-3.36-.54-6.75-.54-10.15h-82.49c-1.15,6.37-1.98,12.76-2.51,19.14l85.54-8.99Z' },
  { id: 'phase3', label: 'Phase III', kind: 'phase', d: 'M194.82,281.26c.35-3.35.87-6.7,1.59-10.04l-74.61-15.86c-2.21,5.83-4.14,11.71-5.78,17.62l78.8,8.28Z' },
  { id: 'phase4', label: 'Phase IV', kind: 'phase', d: 'M199.06,321.42c-1.05-3.22-1.92-6.5-2.62-9.82l-87.81,18.66c.1,6.74.53,13.46,1.29,20.12l89.14-28.96Z' },
]

export default function RadialNavigator({
  arcs = defaultArcs,
  selectedCategory,
  activePhase,
  isDocked,
  onHoverCategory,
  onSelectCategory,
}: Props) {
  const activeLabels = useMemo(() => {
    const labels = new Set<string>()
    if (selectedCategory) labels.add(selectedCategory)
    if (activePhase) labels.add(activePhase)
    return labels
  }, [selectedCategory, activePhase])

  const getClass = (arc: CategoryArc) => {
    if (activeLabels.has(arc.label)) return 'shape-active cursor-pointer'
    return 'shape-default cursor-pointer'
  }

  return (
    <div
      className="flex items-center justify-center transition-all duration-700 ease-out"
      style={{
        transform: isDocked ? 'scale(0.6)' : 'scale(1)',
        pointerEvents: 'auto',
      }}
    >
      <svg
        viewBox="0 0 543.73 582.83"
        className={isDocked ? 'w-56 h-56' : 'w-64 h-64 sm:w-[520px] sm:h-[520px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px]'}
        style={{
          filter: 'drop-shadow(0 0 60px #081e1f)',
        }}
        role="img"
        aria-label="Calma Projects Navigator"
      >
        <defs>
          <style>{`
            .shape-default { fill:#081e1f; transition: all 0.4s ease; }
            .shape-hover { fill:#d4cfbc; transition: all 0.4s ease; }
            .shape-selected { fill:#d4cfbc; transition: all 0.4s ease; }
            .shape-active { fill:#d4cfbc; stroke:#d4cfbc; stroke-width:2; filter: drop-shadow(0 0 12px #d4cfbc); transition: all 0.4s ease; }
          `}</style>
        </defs>
        <g>
          {arcs.map((arc) => (
            <path
              key={arc.id}
              className={getClass(arc)}
              d={arc.d}
              onMouseEnter={() => onHoverCategory?.(arc.label)}
              onMouseLeave={() => onHoverCategory?.('')}
              onClick={() => onSelectCategory?.(arc.label)}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

