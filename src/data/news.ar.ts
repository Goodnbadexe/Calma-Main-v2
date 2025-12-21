export type شركةخبر = {
  id: string
  title: string
  excerpt: string
  date: string
  category: 'استدامة' | 'جوائز' | 'أعمال' | 'بيان صحفي'
  image: string
  link?: string
}

export const الاخبارAR: شركةخبر[] = [
  {
    id: 'n1',
    title: 'CALMA تطلق مبادرة تطوير مستدامة جديدة',
    excerpt: 'ريادة في البناء الصديق للبيئة عبر تقنيات خضراء مبتكرة.',
    date: '2024-01-20',
    category: 'استدامة',
    image: '/api/placeholder/400/250',
    link: '#',
  },
  {
    id: 'n2',
    title: 'خطة توسع لعام 2024',
    excerpt: 'نمو استراتيجي في مدن رئيسية مع تركيز على المشاريع السكنية الفاخرة.',
    date: '2024-01-18',
    category: 'أعمال',
    image: '/api/placeholder/400/250',
    link: '#',
  },
  {
    id: 'n3',
    title: 'جائزة للتميز المعماري',
    excerpt: 'CALMA تتلقى تكريمًا مرموقًا لابتكارها في التصميم وجودة التنفيذ.',
    date: '2024-01-15',
    category: 'جوائز',
    image: '/api/placeholder/400/250',
    link: '#',
  },
]
