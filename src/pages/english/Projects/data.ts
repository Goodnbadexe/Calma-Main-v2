export interface Project {
  id: number
  name: string
  description: string
  location: string
  price: string
  image: string
  category: string
}

export const projects: Project[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Project ${i + 1}`,
  description: `Premium real estate development in prime location`,
  location: `District ${Math.floor(i / 5) + 1}`,
  price: `$${(Math.random() * 5 + 2).toFixed(1)}M`,
  image: `/placeholder.svg?height=400&width=600&query=modern real estate building project ${i + 1}`,
  category: ['Villa', 'Floor', 'TownHouse', 'Office'][Math.floor(Math.random() * 4)]
}))

export const projectOrder = [
  // Part 1
  42, 35, 48, 45, 37, 47, 32, 38, 28, 49, 50, 26, 46, 27, 43, 41, 30, 39, 40, 31, 44, 36, 33, 29, 34,
  // Part 2
  19, 9, 18, 17, 20, 16, 22, 25, 24, 21, 23, 14, 11, 13, 5, 7, 3, 2, 1, 4, 15, 10, 8, 12, 6,
]
