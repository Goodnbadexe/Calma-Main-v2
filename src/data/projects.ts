export type ProjectSlug =
  | 'villa'
  | 'floor'
  | 'townhouse'
  | 'office'
  | 'one-tower'
  | 'calma-tower'
  | 'nr100'
  | 'ys200'
  | 'retail-plaza'
  | 'garden-estates'
  | 'green-homes'
  | 'business-hub'
  | 'community-integrated'

export type ProjectFeature = {
  icon: string
  title: string
  description: string
}

export type Project = {
  slug: ProjectSlug
  title: string
  subtitle: string
  description: string
  heroImage: string
  gallery: string[]
  features: ProjectFeature[]
  highlights: string[]
  ctaText: string
}

export const projects: Record<ProjectSlug, Project> = {
  villa: {
    slug: 'villa',
    title: 'Signature Villas',
    subtitle: 'Crafted luxury living',
    description:
      'Besoke villa residences with precision finishes, timeless facades and elevated spatial flow across prime Riyadh districts.',
    heroImage: '/src/assets/Images/About/Hero-1.JPG',
    gallery: [
      '/src/assets/Images/About/Asset-1.JPG',
      '/src/assets/Images/About/Asset-2.JPG',
      '/src/assets/Images/About/Hero-2.JPG',
      '/src/assets/Images/About/Asset-3.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Asset-12-1.svg', title: 'Precision Craft', description: 'Detail‑led workmanship in every surface.' },
      { icon: '/src/assets/Icons/Vector-2.png', title: 'Prime Districts', description: 'Locations selected for lifestyle and value.' },
      { icon: '/src/assets/Icons/Vector-3.png', title: 'Sustainable Comfort', description: 'Efficient systems with enduring materials.' }
    ],
    highlights: [
      'Grand entries with layered light',
      'Flexible living cores',
      'Facade articulation with premium materials'
    ],
    ctaText: 'Request villa details'
  },
  floor: {
    slug: 'floor',
    title: 'Modern Floor Homes',
    subtitle: 'Efficient, elegant living',
    description:
      'Smartly planned floor apartments with generous daylight, refined finishes and elegant circulation.',
    heroImage: '/src/assets/Images/About/Asset-14.jpg',
    gallery: [
      '/src/assets/Images/About/Asset-14_2.jpg',
      '/src/assets/Images/About/Asset-14_3.jpg',
      '/src/assets/Images/About/Asset-5.jpg'
    ],
    features: [
      { icon: '/src/assets/Icons/Vector.png', title: 'Optimized Plans', description: 'Efficient layouts with clear zoning.' },
      { icon: '/src/assets/Icons/Rectangle-34.png', title: 'Refined Finishes', description: 'Materials that age gracefully.' },
      { icon: '/src/assets/Icons/Rectangle-35.png', title: 'Comfort Systems', description: 'Acoustic and thermal calm.' }
    ],
    highlights: [
      'Balanced proportions',
      'Daylight‑first planning',
      'Durable specification '
    ],
    ctaText: 'Request floor homes brochure'
  },
  townhouse: {
    slug: 'townhouse',
    title: 'Townhouse Collection',
    subtitle: 'Connected, elevated living',
    description:
      'Well‑scaled townhouses blending privacy and connection with layered outdoor rooms and crafted facades.',
    heroImage: '/src/assets/Images/About/Asset-2.JPG',
    gallery: [
      '/src/assets/Images/About/Asset-3.JPG',
      '/src/assets/Images/About/Asset-2_2.JPG',
      '/src/assets/Images/About/Asset-2_3.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Rectangle-36.png', title: 'Layered Outdoor', description: 'Courts and terraces for climate and privacy.' },
      { icon: '/src/assets/Icons/Rectangle-33.png', title: 'Facade Rhythm', description: 'Timeless composition and detail.' },
      { icon: '/src/assets/Icons/Asset-12-2.png', title: 'Adaptable Plans', description: 'Family‑friendly modular cores.' }
    ],
    highlights: [
      'Dual‑aspect living areas',
      'Intuitive circulation',
      'Material palette for longevity'
    ],
    ctaText: 'Explore townhouse availability'
  },
  office: {
    slug: 'office',
    title: 'Office Spaces',
    subtitle: 'Designed for focus and flow',
    description:
      'Elegant office environments with clear navigation, acoustic calm and flexible collaboration zones.',
    heroImage: '/src/assets/Images/Home/CTA.JPG',
    gallery: [
      '/src/assets/Images/About/CTA.JPG',
      '/src/assets/Images/About/CTA_1.JPG',
      '/src/assets/Images/About/Asset-5_1.jpg'
    ],
    features: [
      { icon: '/src/assets/Icons/Masterful-precision-in-everything-we-do..png', title: 'Acoustic Comfort', description: 'Quiet cores with smart materials.' },
      { icon: '/src/assets/Icons/Asset-12-3.png', title: 'Flexible Modules', description: 'Spaces that adapt to teams.' },
      { icon: '/src/assets/Icons/Exceptional-experiences-lasting-relationships..png', title: 'Wayfinding Clarity', description: 'Intuitive movement through space.' }
    ],
    highlights: [
      'Natural light prioritized',
      'High‑quality finishes',
      'Clear signage and flow'
    ],
    ctaText: 'Get office leasing details'
  },
  'one-tower': {
    slug: 'one-tower',
    title: 'ONE Tower',
    subtitle: 'Iconic luxury tower',
    description: 'An iconic residential tower defining the skyline with crafted luxury living.',
    heroImage: '/src/assets/Images/About/Asset-6.JPG',
    gallery: [
      '/src/assets/Images/About/Asset-6.JPG',
      '/src/assets/Images/About/Hero-2.JPG',
      '/src/assets/Images/About/Asset-5.jpg'
    ],
    features: [
      { icon: '/src/assets/Icons/Vector-3.png', title: 'Skyline Presence', description: 'Commanding architecture and views.' },
      { icon: '/src/assets/Icons/Vector-2.png', title: 'Elevated Luxury', description: 'Premium amenities and finishes.' },
      { icon: '/src/assets/Icons/Asset-12-1.svg', title: 'Precision Craft', description: 'Detail‑led workmanship.' }
    ],
    highlights: ['Panoramic city views', 'Premium amenity stack', 'Timeless material palette'],
    ctaText: 'Explore ONE Tower details'
  },
  'calma-tower': {
    slug: 'calma-tower',
    title: 'Calma Tower',
    subtitle: 'Signature living in the KAFD',
    description: 'Signature tower living with refined spaces and enduring materials.',
    heroImage: '/src/assets/Backgrounds/About-Header-p-1600.jpg',
    gallery: [
      '/src/assets/Images/About/Brand-Values-1.JPG',
      '/src/assets/Images/About/Asset-4.JPG',
      '/src/assets/Images/About/Asset-5.jpg'
    ],
    features: [
      { icon: '/src/assets/Icons/Rectangle-35.png', title: 'Refined Finishes', description: 'Materials that age gracefully.' },
      { icon: '/src/assets/Icons/Rectangle-34.png', title: 'Efficient Plans', description: 'Elegant circulation and flow.' },
      { icon: '/src/assets/Icons/Vector.png', title: 'Comfort Systems', description: 'Acoustic and thermal calm.' }
    ],
    highlights: ['Prime location', 'Crafted interiors', 'Efficient layouts'],
    ctaText: 'Request tower brochure'
  },
  nr100: {
    slug: 'nr100',
    title: 'NR100 Residences',
    subtitle: 'Crafted luxury living',
    description: 'Premium residences with community amenities and precision finishes.',
    heroImage: '/src/assets/Images/About/Asset-4.JPG',
    gallery: [
      '/src/assets/Images/About/Asset-4.JPG',
      '/src/assets/Images/About/Asset-5.jpg',
      '/src/assets/Images/About/Asset-6.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Asset-12-2.png', title: 'Community Amenities', description: 'Composed places and calm.' },
      { icon: '/src/assets/Icons/Vector-2.png', title: 'Prime Districts', description: 'Locations selected for lifestyle and value.' },
      { icon: '/src/assets/Icons/Vector-3.png', title: 'Sustainable Comfort', description: 'Efficient systems with enduring materials.' }
    ],
    highlights: ['Family‑friendly cores', 'Amenity rich', 'Prime Riyadh'],
    ctaText: 'Request NR100 details'
  },
  ys200: {
    slug: 'ys200',
    title: 'YS200 Residences',
    subtitle: 'Measured progress, crafted living',
    description: 'Residences blending innovation and legacy with sustainable intent.',
    heroImage: '/src/assets/Images/About/Asset-5.jpg',
    gallery: [
      '/src/assets/Images/About/Asset-5.jpg',
      '/src/assets/Images/About/Asset-6.JPG',
      '/src/assets/Images/About/Asset-4.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Vector.png', title: 'Optimized Plans', description: 'Efficient layouts with clear zoning.' },
      { icon: '/src/assets/Icons/Rectangle-34.png', title: 'Elegant Circulation', description: 'Clear movement and wayfinding.' },
      { icon: '/src/assets/Icons/Rectangle-35.png', title: 'Refined Materials', description: 'Enduring surfaces and details.' }
    ],
    highlights: ['Balanced proportions', 'Daylight‑first planning', 'Durable specification'],
    ctaText: 'Request YS200 details'
  },
  'retail-plaza': {
    slug: 'retail-plaza',
    title: 'Retail Plaza',
    subtitle: 'Premium shopping destination',
    description: 'A premium shopping and dining destination in a prime corridor.',
    heroImage: '/src/assets/Backgrounds/CTA-BG-p-1600.jpg',
    gallery: [
      '/src/assets/Backgrounds/CTA-BG-p-1600.jpg',
      '/src/assets/Images/About/Brand-Values-1.JPG',
      '/src/assets/Images/About/Asset-6.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Rectangle-36.png', title: 'Retail Mix', description: 'Curated tenant selection.' },
      { icon: '/src/assets/Icons/Asset-12-3.png', title: 'Flow', description: 'Intuitive circulation and access.' },
      { icon: '/src/assets/Icons/Masterful-precision-in-everything-we-do..png', title: 'Design', description: 'Composed façades and placemaking.' }
    ],
    highlights: ['Prime corridor', 'Curated experience', 'Composed design'],
    ctaText: 'Request retail leasing details'
  },
  'garden-estates': {
    slug: 'garden-estates',
    title: 'Garden Estates',
    subtitle: 'Spacious family compounds',
    description: 'Family compounds with private gardens and pools.',
    heroImage: '/src/assets/Backgrounds/About-Header-p-1600.jpg',
    gallery: [
      '/src/assets/Images/About/Asset-1.JPG',
      '/src/assets/Images/About/Asset-2.JPG',
      '/src/assets/Images/About/Asset-3.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Rectangle-33.png', title: 'Outdoor Rooms', description: 'Layered courts and terraces.' },
      { icon: '/src/assets/Icons/Asset-12-2.png', title: 'Family Cores', description: 'Adaptable modular layouts.' },
      { icon: '/src/assets/Icons/Vector.png', title: 'Comfort', description: 'Acoustic and thermal calm.' }
    ],
    highlights: ['Private gardens', 'Pools', 'Adaptable cores'],
    ctaText: 'Explore Garden Estates'
  },
  'green-homes': {
    slug: 'green-homes',
    title: 'Green Homes',
    subtitle: 'Eco‑friendly residences',
    description: 'Eco‑friendly residences with solar integration and efficient systems.',
    heroImage: '/src/assets/Backgrounds/Abou-1-p-1600.jpg',
    gallery: [
      '/src/assets/Images/About/Stats-77097-sqm.JPG',
      '/src/assets/Images/About/Stats130000-sqm.JPG',
      '/src/assets/Images/About/Brand-Values-1.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Asset-12-1.svg', title: 'Sustainable Systems', description: 'Energy‑conscious design.' },
      { icon: '/src/assets/Icons/Vector-2.png', title: 'Prime Locations', description: 'Lifestyle and value.' },
      { icon: '/src/assets/Icons/Vector-3.png', title: 'Enduring Materials', description: 'Timeless palette.' }
    ],
    highlights: ['Solar integration', 'Efficient systems', 'Enduring materials'],
    ctaText: 'Request green homes details'
  },
  'business-hub': {
    slug: 'business-hub',
    title: 'Business Hub Central',
    subtitle: 'Grade A office spaces',
    description: 'Grade A office spaces with cutting‑edge infrastructure.',
    heroImage: '/src/assets/Images/About/About-Header.jpg',
    gallery: [
      '/src/assets/Images/About/About-Header.jpg',
      '/src/assets/Images/About/Asset-4.JPG',
      '/src/assets/Images/About/Asset-5.jpg'
    ],
    features: [
      { icon: '/src/assets/Icons/Exceptional-experiences-lasting-relationships..png', title: 'Wayfinding', description: 'Clarity throughout.' },
      { icon: '/src/assets/Icons/Asset-12-3.png', title: 'Flexible Modules', description: 'Adaptable to teams.' },
      { icon: '/src/assets/Icons/Masterful-precision-in-everything-we-do..png', title: 'Acoustics', description: 'Quiet cores.' }
    ],
    highlights: ['Prime corridor', 'Infrastructure', 'Flexible modules'],
    ctaText: 'Get office leasing details'
  },
  'community-integrated': {
    slug: 'community-integrated',
    title: 'Family Community',
    subtitle: 'Integrated neighborhood',
    description: 'Integrated neighborhood with schools and parks.',
    heroImage: '/src/assets/Images/About/Brand-Values-1.JPG',
    gallery: [
      '/src/assets/Images/About/Asset-1.JPG',
      '/src/assets/Images/About/Asset-2.JPG',
      '/src/assets/Images/About/Asset-3.JPG'
    ],
    features: [
      { icon: '/src/assets/Icons/Rectangle-36.png', title: 'Community', description: 'Composed public realm.' },
      { icon: '/src/assets/Icons/Asset-12-2.png', title: 'Adaptable Plans', description: 'Family‑friendly modules.' },
      { icon: '/src/assets/Icons/Vector.png', title: 'Comfort', description: 'Calm systems.' }
    ],
    highlights: ['Schools and parks', 'Public realm', 'Adaptable cores'],
    ctaText: 'Request community details'
  }
}

export function getProject(slug: string) {
  const s = slug as ProjectSlug
  return projects[s]
}
