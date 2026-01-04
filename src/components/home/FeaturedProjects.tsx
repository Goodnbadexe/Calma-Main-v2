import { useEffect, useMemo, useState } from 'react'
import SmoothCarousel from '@/components/carousel/SmoothCarousel'
import ProjectCard, { type Project } from '@/components/home/ProjectCard'
import { projectsData } from '@/data/projects.data'
import { getProjectAssets } from '@/utils/assetResolver'

const pickPreviewUrl = (glob: string): string | undefined => {
  const assets = getProjectAssets()
  // glob is something like '/src/assets/Images/Projects/...'
  // The key in assetModules matches this exact format
  const keyPart = glob.split('/src/assets/Images/Projects/')[1] || ''
  const match = Object.entries(assets).find(([k]) => k.includes(keyPart))
  return match?.[1]
}

const unitLabel: Record<string, string> = {
  villa: 'Residential',
  floor: 'Floors',
  townhouse: 'Townhouse',
  office: 'Office',
}

const slides: Project[] = projectsData.map((p) => ({
  id: p.id,
  title: (p.nameEN || p.id).split('•')[0].trim(),
  subtitle: p.locationEN || '',
  category: unitLabel[p.unitType] || 'Project',
  image: '',
  href: `/projects`,
  descriptor: p.nameEN,
}))

export default function FeaturedProjects() {
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({})
  useEffect(() => {
    const map: Record<string, string> = {}
    projectsData.forEach((p) => {
        const url = pickPreviewUrl(p.assets.imagesGlob)
        if (url) map[p.id] = url
    })
    setImagesMap(map)
  }, [])
  const config = useMemo(
    () => ({
      snap: false,
      dragSpeed: 1,
      damp: 0.92,
      lerp: 0.12,
      infinite: false,
      moveByVW: 0.85,
    }),
    []
  )

  // Preload first few images to reduce perceived loading
  useMemo(() => {
    const toPreload = projectsData.slice(0, 3)
    toPreload.forEach((p) => {
      const url = imagesMap[p.id]
      if (url) {
        const img = new Image()
        img.src = url
      }
    })
  }, [imagesMap])

  return (
    <SmoothCarousel
      items={slides.map((s) => ({ ...s, image: imagesMap[s.id] || '' }))}
      config={config}
      ariaLabel="Featured Projects"
      renderItem={(item, { active }) => <ProjectCard project={item} active={active} />}
    />
  )
}
