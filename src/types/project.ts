export type Category =
  | 'Residential'
  | 'Commercial'
  | 'Mixed-Use'
  | 'Luxury'
  | 'Sustainable'
  | 'Community'
  | 'Tower'
  | 'Featured'

export type SortBy = 'Newest' | 'Value' | 'Type'

export interface Project {
  id: string | number
  name: string
  category: Category
  type: string
  location: string
  valueLabel: string
  image: string
  description?: string
  tags?: string[]
  phase?: string
  featured?: boolean
  href?: string
}

export interface ProjectFilters {
  selectedCategory?: Category | null
  activePhase?: string | null
  isFeatured?: boolean
  searchQuery?: string
  sortBy?: SortBy
}

export interface CategoryArc {
  id: string
  label: Category | string
  kind: 'category' | 'phase' | 'featured'
  d: string
}

