export type CompanyNewsItem = {
  id: string
  title: string
  excerpt: string
  date: string
  category: 'Sustainability' | 'Awards' | 'Business' | 'Press'
  image: string
  link?: string
}

export const companyNewsEn: CompanyNewsItem[] = [
  {
    id: 'n1',
    title: 'CALMA Announces New Sustainable Development Initiative',
    excerpt: 'Leading the way in eco-friendly construction with innovative green building technologies.',
    date: '2024-01-20',
    category: 'Sustainability',
    image: '/api/placeholder/400/250',
    link: '#',
  },
  {
    id: 'n2',
    title: 'Expansion Plans Unveiled for 2024',
    excerpt: 'Strategic growth across key Saudi Arabian cities with focus on luxury residential projects.',
    date: '2024-01-18',
    category: 'Business',
    image: '/api/placeholder/400/250',
    link: '#',
  },
  {
    id: 'n3',
    title: 'Award Recognition for Architectural Excellence',
    excerpt: 'CALMA receives prestigious industry award for innovative design and construction quality.',
    date: '2024-01-15',
    category: 'Awards',
    image: '/api/placeholder/400/250',
    link: '#',
  },
]
