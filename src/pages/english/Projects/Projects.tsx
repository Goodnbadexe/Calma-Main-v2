"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import "./Project.css"
import { resolveAssetUrl } from "@/utils/assetResolver"

interface Project {
  id: number
  name: string
  description: string
  location: string
  price: string
  image: string
}

const projects: Project[] = [
  // Residential Projects
  { id: 1, name: "Calma Residences", description: "Luxury family homes with premium finishes and community amenities", location: "Riyadh North", price: "$2.8M", image: resolveAssetUrl("/src/assets/Backgrounds/About-Header-p-1600.jpg") },
  { id: 2, name: "Heritage Villas", description: "Traditional Saudi architecture meets modern luxury living", location: "Jeddah Historic District", price: "$3.2M", image: resolveAssetUrl("/src/assets/Images/About/About-Header.jpg") },
  { id: 3, name: "Garden Estates", description: "Spacious family compounds with private gardens and pools", location: "Riyadh Central", price: "$4.1M", image: resolveAssetUrl("/src/assets/Backgrounds/CTA-BG-p-1600.jpg") },
  { id: 4, name: "Modern Townhomes", description: "Contemporary design with smart home technology integration", location: "New Riyadh", price: "$1.9M", image: resolveAssetUrl("/src/assets/Backgrounds/Abou-1-p-1600.jpg") },
  { id: 5, name: "Executive Residences", description: "Premium homes designed for discerning professionals", location: "Diplomatic Quarter", price: "$5.2M", image: resolveAssetUrl("/src/assets/Images/About/Brand-Values-1.JPG") },
  
  // Commercial Projects
  { id: 6, name: "Business Hub Central", description: "Grade A office spaces with cutting-edge infrastructure", location: "King Fahd Road", price: "$12.5M", image: resolveAssetUrl("/src/assets/Backgrounds/About-Header-p-1600.jpg") },
  { id: 7, name: "Innovation Center", description: "Tech-focused commercial complex with flexible workspaces", location: "KAUST Area", price: "$8.7M", image: resolveAssetUrl("/src/assets/Images/About/Stats-77097-sqm.JPG") },
  { id: 8, name: "Retail Plaza", description: "Premium shopping and dining destination", location: "Tahlia Street", price: "$15.3M", image: resolveAssetUrl("/src/assets/Backgrounds/CTA-BG-p-1600.jpg") },
  { id: 9, name: "Corporate Towers", description: "Twin towers offering prestigious business addresses", location: "Financial District", price: "$25.8M", image: resolveAssetUrl("/src/assets/Images/About/Stats130000-sqm.JPG") },
  { id: 10, name: "Mixed-Use Complex", description: "Integrated commercial and residential development", location: "Downtown Jeddah", price: "$18.9M", image: resolveAssetUrl("/src/assets/Backgrounds/Abou-1-p-1600.jpg") },
  
  // Luxury Projects
  { id: 11, name: "Calma Tower", description: "Iconic residential tower defining the skyline", location: "King Abdullah Financial District", price: "$45.2M", image: resolveAssetUrl("/src/assets/Backgrounds/About-Header-p-1600.jpg") },
  { id: 12, name: "Penthouse Collection", description: "Ultra-luxury penthouses with panoramic city views", location: "Riyadh Sky", price: "$8.5M", image: resolveAssetUrl("/src/assets/Images/About/About-Header.jpg") },
  { id: 13, name: "Waterfront Residences", description: "Exclusive beachfront properties with private access", location: "Red Sea Coast", price: "$6.8M", image: resolveAssetUrl("/src/assets/Backgrounds/CTA-BG-p-1600.jpg") },
  { id: 14, name: "Desert Retreat", description: "Luxury resort-style living in natural surroundings", location: "Edge of Riyadh", price: "$3.9M", image: resolveAssetUrl("/src/assets/Backgrounds/Abou-1-p-1600.jpg") },
  { id: 15, name: "Sky Villas", description: "Elevated luxury living with private elevators", location: "Olaya District", price: "$7.2M", image: resolveAssetUrl("/src/assets/Images/About/Brand-Values-1.JPG") },
  
  // Community Projects
  { id: 16, name: "Family Community", description: "Integrated neighborhood with schools and parks", location: "Al Nakheel", price: "$2.1M", image: resolveAssetUrl("/src/assets/Images/About/Stats-77097-sqm.JPG") },
  { id: 17, name: "Senior Living", description: "Comfortable and accessible homes for mature residents", location: "Al Malqa", price: "$1.8M", image: resolveAssetUrl("/src/assets/Images/About/Stats130000-sqm.JPG") },
  { id: 18, name: "Student Housing", description: "Modern accommodations near major universities", location: "University District", price: "$950K", image: resolveAssetUrl("/src/assets/Backgrounds/About-Header-p-1600.jpg") },
  { id: 19, name: "Wellness Village", description: "Health-focused community with fitness facilities", location: "Green Riyadh", price: "$2.7M", image: resolveAssetUrl("/src/assets/Images/About/About-Header.jpg") },
  { id: 20, name: "Cultural Quarter", description: "Arts and culture-focused residential development", location: "Historic Jeddah", price: "$3.4M", image: resolveAssetUrl("/src/assets/Backgrounds/CTA-BG-p-1600.jpg") },
  
  // Sustainable Projects
  { id: 21, name: "Green Homes", description: "Eco-friendly residences with solar power integration", location: "NEOM Vicinity", price: "$4.6M", image: resolveAssetUrl("/src/assets/Backgrounds/Abou-1-p-1600.jpg") },
  { id: 22, name: "Smart City Phase 1", description: "Technology-integrated sustainable community", location: "Future City", price: "$3.8M", image: resolveAssetUrl("/src/assets/Images/About/Brand-Values-1.JPG") },
  { id: 23, name: "Carbon Neutral Complex", description: "Net-zero energy commercial development", location: "Green Business District", price: "$22.1M", image: resolveAssetUrl("/src/assets/Images/About/Stats-77097-sqm.JPG") },
  { id: 24, name: "Renewable Energy Hub", description: "Self-sustaining mixed-use development", location: "Solar Valley", price: "$16.7M", image: resolveAssetUrl("/src/assets/Images/About/Stats130000-sqm.JPG") },
  { id: 25, name: "Water Conservation Village", description: "Innovative water management residential project", location: "Desert Edge", price: "$2.9M", image: resolveAssetUrl("/src/assets/Backgrounds/About-Header-p-1600.jpg") },
  
  // Additional Premium Projects
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 26,
    name: `Premium Development ${i + 1}`,
    description: `Exclusive ${['residential', 'commercial', 'mixed-use'][i % 3]} project with luxury amenities`,
    location: `${['Riyadh', 'Jeddah', 'Dammam'][i % 3]} ${['North', 'South', 'East', 'West', 'Central'][i % 5]}`,
    price: `$${(Math.random() * 8 + 2).toFixed(1)}M`,
    image: resolveAssetUrl([
      "/src/assets/Backgrounds/About-Header-p-1600.jpg",
      "/src/assets/Images/About/About-Header.jpg",
      "/src/assets/Backgrounds/CTA-BG-p-1600.jpg",
      "/src/assets/Backgrounds/Abou-1-p-1600.jpg",
      "/src/assets/Images/About/Brand-Values-1.JPG"
    ][i % 5]),
  }))
]

const projectOrder = [
  // Part 1
  42, 35, 48, 45, 37, 47, 32, 38, 28, 49, 50, 26, 46, 27, 43, 41, 30, 39, 40, 31, 44, 36, 33, 29, 34,
  // Part 2
  19, 9, 18, 17, 20, 16, 22, 25, 24, 21, 23, 14, 11, 13, 5, 7, 3, 2, 1, 4, 15, 10, 8, 12, 6,
]

export default function RealEstateShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [isSliderActive, setIsSliderActive] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const [isSidebarActive, setIsSidebarActive] = useState(false)

  function scrollToProject(projectId: number) {
    const idx = projectOrder.indexOf(projectId)
    if (idx === -1) return
    const progress = idx / (projectOrder.length - 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const top = progress * scrollHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      // When the slider is being used, don't override its value with scroll.
      if (isSliderActive) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / scrollHeight
      setScrollProgress(Math.min(progress, 1))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isSliderActive])

  // Unified progression value: driven by slider when active, otherwise by scroll.
  const progression = isSliderActive
    ? sliderValue / (projectOrder.length - 1)
    : scrollProgress

  const translateZ = progression * 3000 // Increased from 2000 to 3000 for more dramatic effect
  const scale = 1 + progression * 0.8 // Increased scale for better depth perception
  const opacity = 1 - progression * 0.3 // Fade out slightly as we move forward

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId)
    scrollToProject(projectId)
  }

  const currentProjectIndex = Math.round(progression * (projectOrder.length - 1))
  const currentProjectId = projectOrder[Math.min(currentProjectIndex, projectOrder.length - 1)]

  useEffect(() => {
    // Scroll active item into view when progression changes, but don't fight the user's sidebar scroll.
    if (listRef.current && !isSidebarActive) {
      const activeElement = listRef.current.querySelector(`[data-project-id="${currentProjectId}"]`)
      if (activeElement) {
        (activeElement as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentProjectId, isSidebarActive])

  const getPathClass = (pathIndex: number) => {
    const project = projects[pathIndex]
    if (!project) return "shape-default"

    if (project.id === currentProjectId) return "shape-active"
    if (selectedProject === project.id) return "shape-selected"
    if (hoveredProject === project.id) return "shape-hover"
    return "shape-default"
  }

  const getProjectForPath = (pathIndex: number) => {
    return projects[pathIndex]
  }

  const handleListScroll = () => {
    if (!listRef.current || !isSidebarActive) return
    const container = listRef.current
    const centerY = container.scrollTop + container.clientHeight / 2
    let closestId: number | null = null
    let closestDist = Infinity
    const buttons = Array.from(container.querySelectorAll('[data-project-id]')) as HTMLElement[]
    buttons.forEach((btn) => {
      const idStr = btn.getAttribute('data-project-id')
      const id = idStr ? Number(idStr) : null
      if (id == null) return
      const mid = btn.offsetTop + btn.offsetHeight / 2
      const dist = Math.abs(mid - centerY)
      if (dist < closestDist) {
        closestDist = dist
        closestId = id
      }
    })
    if (closestId != null && closestId !== currentProjectId) {
      // Let window scroll own the progression; disable slider while aligning.
      setIsSliderActive(false)
      // Sync slider visual too.
      const idx = projectOrder.indexOf(closestId)
      if (idx !== -1) setSliderValue(idx)
      scrollToProject(closestId)
      setSelectedProject(closestId)
    }
  }

  const getSidebarItemStyle = (projectId: number) => {
    const projectIndex = projectOrder.indexOf(projectId)
    const distance = Math.abs(projectIndex - currentProjectIndex)
    const direction = projectIndex - currentProjectIndex

    // Calculate scale and translateZ based on distance from current project
    const scale = Math.max(0.7, 1 - distance * 0.1)
    const translateZ = direction * -50 + (projectId === currentProjectId ? 50 : 0)
    const opacity = Math.max(0.4, 1 - distance * 0.15)

    return {
      transform: `scale(${scale}) translateZ(${translateZ}px)`,
      opacity: opacity,
      transformStyle: "preserve-3d" as const,
    }
  }

  const selectedProjectData = selectedProject ? projects.find((p) => p.id === selectedProject) : null
  const displayProject = selectedProjectData || (hoveredProject ? projects.find((p) => p.id === hoveredProject) : null)
  // Use displayProject to avoid unused variable warning
  console.log(displayProject)

  return (
    <div ref={containerRef} className="relative min-h-[800vh]" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        {/* Background gradient effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, var(--color-overlay-dark) 0%, var(--color-overlay-dark) 70%)`,
          }}
        />

        {/* Right-centered controls: desktop/tablet only */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-50 w-[300px]" style={{ pointerEvents: 'auto' }}>
          <div className="flex flex-col items-end gap-2 mb-3">
            <span className="text-xs font-mono text-muted-foreground">Project {currentProjectId} of {projects.length}</span>
            <input
              type="range"
              min={0}
              max={projectOrder.length - 1}
              value={isSliderActive ? sliderValue : currentProjectIndex}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIsSliderActive(true)
                const v = Number(e.target.value)
                setSliderValue(v)
              }}
              onMouseUp={() => setIsSliderActive(false)}
              onTouchEnd={() => setIsSliderActive(false)}
              aria-label="Project progression slider"
              className="w-full"
            />
          </div>

          <label htmlFor="project-search" className="sr-only">Search projects</label>
          <input
            id="project-search"
            type="text"
            placeholder="Search projects..."
            className="w-full bg-neutral-100 text-neutral-900 placeholder:text-neutral-900 placeholder:opacity-70 border border-neutral-900 rounded-full px-5 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 hover:bg-white transition-colors"
          />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            transform: `scale(${scale}) translateZ(${translateZ}px)`,
            transformStyle: "preserve-3d",
            perspective: "1500px",
            opacity: opacity,
            pointerEvents: 'none',
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 543.73 582.83"
            className="w-64 h-64 sm:w-[520px] sm:h-[520px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px]"
            style={{
              filter: "drop-shadow(0 0 60px #081e1f)",
              pointerEvents: 'auto',
            }}
          >
            <defs>
              <style>{`
                /* Green theme across states */
                .shape-default { fill:#081e1f; transition: all 0.4s ease; }
                .shape-hover { fill:#d4cfbc; transition: all 0.4s ease; }
                .shape-selected { fill:#d4cfbc; transition: all 0.4s ease; }
                .shape-active { fill:#d4cfbc; stroke:#d4cfbc; stroke-width:2; filter: drop-shadow(0 0 12px #d4cfbc); transition: all 0.4s ease; }
              `}</style>
            </defs>
            <g>
              <g>
                {/* First group of paths */}
                <path
                  className={`${getPathClass(0)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(0)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(0)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M251.92,202.7c3.1-1.38,6.27-2.59,9.49-3.64l-13.2-40.61c-5.08.39-10.12,1.07-15.11,1.99l18.82,42.27Z"
                />
                <path
                  className={`${getPathClass(1)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(1)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(1)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M234.34,212.85c2.75-1.99,5.59-3.84,8.53-5.53l-24.95-43.22c-5.12,1.52-10.15,3.32-15.08,5.39l31.5,43.36Z"
                />
                <path
                  className={`${getPathClass(2)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(2)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(2)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M219.24,226.43c2.28-2.53,4.68-4.93,7.19-7.18l-38.34-42.58c-4.86,2.72-9.55,5.76-14.09,9.03l45.24,40.73Z"
                />
                <path
                  className={`${getPathClass(3)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(3)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(3)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M271.23,196.43c3.31-.7,6.66-1.23,10.04-1.59l-3.75-35.68c-4.82-.61-9.64-.97-14.44-1.09l8.15,38.36Z"
                />
                <path
                  className={`${getPathClass(4)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(4)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(4)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M199.05,261.4c1.04-3.19,2.25-6.36,3.65-9.49l-64.67-28.79c-3.27,4.94-6.28,10.11-8.99,15.54l70.01,22.75Z"
                />
                <path
                  className={`${getPathClass(5)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(5)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(5)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M378.31,228.28c-1.68-3.45-3.53-6.83-5.54-10.12l-9.18,8.27c2.28,2.53,4.41,5.17,6.39,7.9l8.33-6.05Z"
                />
                <path
                  className={`${getPathClass(6)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(6)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(6)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M207.31,242.85c1.71-2.96,3.56-5.8,5.53-8.53l-52.09-37.85c-4.25,3.9-8.28,8.09-12.07,12.52l58.63,33.85Z"
                />
                <path
                  className={`${getPathClass(7)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(7)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(7)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M330.92,202.69c3.13,1.4,6.15,2.94,9.06,4.61l9.67-16.75c-3.12-2.76-6.4-5.37-9.84-7.82l-8.89,19.96Z"
                />
                <path
                  className={`${getPathClass(8)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(8)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(8)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M363.59,356.4c-2.28,2.53-4.68,4.93-7.19,7.18l108.25,120.23c7.08-5.62,13.84-11.69,20.25-18.18l-121.31-109.23Z"
                />
                <path
                  className={`${getPathClass(9)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(9)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(9)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M321.43,199.05l7.53-23.19c-3.34-1.88-6.78-3.63-10.35-5.22-.46-.21-.94-.38-1.4-.58l-5.6,26.36c3.29.7,6.57,1.57,9.82,2.63Z"
                />
                <path
                  className={`${getPathClass(10)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(10)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(10)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M194.84,301.57c-.36-3.36-.54-6.75-.54-10.15h-82.49c-1.15,6.37-1.98,12.76-2.51,19.14l85.54-8.99Z"
                />
                <path
                  className={`${getPathClass(11)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(11)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(11)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M348.5,212.84c2.76,2,5.39,4.15,7.9,6.4l9.74-10.82c-2.41-3.2-4.98-6.29-7.71-9.25l-9.93,13.67Z"
                />
                <path
                  className={`${getPathClass(12)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(12)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(12)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M194.82,281.26c.35-3.35.87-6.7,1.59-10.04l-74.61-15.86c-2.21,5.83-4.14,11.71-5.78,17.62l78.8,8.28Z"
                />
                <path
                  className={`${getPathClass(13)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(13)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(13)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M199.06,321.42c-1.05-3.22-1.92-6.5-2.62-9.82l-87.81,18.66c.1,6.74.53,13.46,1.29,20.12l89.14-28.96Z"
                />
                <path
                  className={`${getPathClass(14)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(14)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(14)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M304.67,165.26c-4.39-1.45-8.82-2.65-13.26-3.66v32.7c3.38,0,6.76.17,10.15.53l3.11-29.57Z"
                />
                <path
                  className={`${getPathClass(15)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(15)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(15)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M291.41,388.53c-3.38,0-6.76-.17-10.15-.52l-14.56,138.57c8.21,2.08,16.46,3.68,24.72,4.82v-142.86Z"
                />
                <path
                  className={`${getPathClass(16)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(16)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(16)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M330.91,380.13c-3.1,1.38-6.27,2.6-9.49,3.64l47.12,145.01c8.64-1.79,17.16-4.06,25.52-6.83l-63.14-141.82Z"
                />
                <path
                  className={`${getPathClass(17)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(17)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(17)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M348.49,369.98c-2.75,1.99-5.59,3.84-8.53,5.53l78.87,136.61c8.12-3.78,16.02-8.04,23.66-12.75l-94.01-129.39Z"
                />
                <path
                  className={`${getPathClass(18)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(18)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(18)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M375.52,339.98c-1.71,2.96-3.56,5.81-5.53,8.53l132.9,96.56c5.54-7.16,10.7-14.72,15.43-22.64l-142.8-82.45Z"
                />
                <path
                  className={`${getPathClass(19)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(19)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(19)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M342.68,532.6l-31.08-146.2c-3.31.7-6.66,1.23-10.04,1.59l15.29,145.46c8.65.21,17.27-.08,25.83-.85Z"
                />
                <path
                  className={`${getPathClass(20)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(20)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(20)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M219.24,356.4c-2.28-2.53-4.41-5.17-6.39-7.9l-86.22,62.65c3.01,6.69,6.37,13.22,10.09,19.57l82.53-74.31Z"
                />
                <path
                  className={`${getPathClass(21)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(21)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(21)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M243,519.18l28.22-132.76c-3.29-.7-6.57-1.57-9.82-2.64l-40.83,125.65c2.97,1.5,5.99,2.94,9.06,4.31,4.43,1.97,8.88,3.77,13.36,5.44Z"
                />
                <path
                  className={`${getPathClass(22)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(22)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(22)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M207.32,339.97c-1.69-2.94-3.24-5.96-4.62-9.05l-89.41,39.81c1.5,6.88,3.34,13.67,5.53,20.34l88.49-51.09Z"
                />
                <path
                  className={`${getPathClass(23)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(23)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(23)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M234.33,369.99c-2.76-2-5.39-4.15-7.9-6.4l-77.29,85.84c4.55,6.11,9.45,11.98,14.7,17.58l70.49-97.02Z"
                />
                <path
                  className={`${getPathClass(24)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(24)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(24)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M251.91,380.14c-3.13-1.39-6.15-2.94-9.06-4.61l-62.1,107.56c5.99,5.07,12.33,9.83,18.98,14.24l52.17-117.19Z"
                />
              </g>
              <g>
                {/* Second group of paths */}
                <path
                  className={`${getPathClass(25)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(25)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(25)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M14.3,201.37c-3.18,9.76-5.81,19.59-7.92,29.45l115.42,24.53c1.38-3.65,2.86-7.28,4.47-10.9.88-1.97,1.81-3.9,2.76-5.81L14.3,201.37Z"
                />
                <path
                  className={`${getPathClass(26)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(26)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(26)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M1.61,321.87c1.08,10.14,2.69,20.19,4.81,30.12l102.2-21.72c-.1-6.55.13-13.13.67-19.71L1.61,321.87Z"
                />
                <path
                  className={`${getPathClass(27)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(27)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(27)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M96.42,74.85l91.67,101.81c4.78-2.67,9.71-5.04,14.75-7.16L120.13,55.67c-8.21,5.95-16.12,12.35-23.72,19.18Z"
                />
                <path
                  className={`${getPathClass(28)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(28)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(28)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M486.41,507.98l-21.76-24.17c-7.09,5.64-14.49,10.83-22.15,15.56l20.19,27.79c8.21-5.95,16.13-12.35,23.72-19.18Z"
                />
                <path
                  className={`${getPathClass(29)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(29)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(29)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M96.42,507.98l52.72-58.55c-4.49-6.03-8.64-12.28-12.42-18.73l-61.87,55.7c6.77,7.53,13.97,14.73,21.57,21.57Z"
                />
                <path
                  className={`${getPathClass(30)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(30)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(30)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M266.7,526.57c-7.95-2.01-15.86-4.48-23.7-7.4l-12.17,57.27c10.02,2.14,20.07,3.73,30.12,4.79l5.74-54.65Z"
                />
                <path
                  className={`${getPathClass(31)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(31)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(31)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M201.38,14.33l46.83,144.12c4.93-.38,9.89-.5,14.86-.38L230.84,6.42c-9.96,2.12-19.79,4.76-29.45,7.90Z"
                />
                <path
                  className={`${getPathClass(32)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(32)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(32)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M409.91,557.57c9.28-4.13,18.35-8.75,27.18-13.84l-18.25-31.62c-8.06,3.75-16.34,7.04-24.78,9.83l15.86,35.62Z"
                />
                <path
                  className={`${getPathClass(33)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(33)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(33)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M507.97,486.41c6.76-7.51,13.17-15.42,19.18-23.71l-24.27-17.63c-5.62,7.26-11.63,14.12-18,20.57l23.08,20.78Z"
                />
                <path
                  className={`${getPathClass(34)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(34)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(34)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M486.41,74.85l-120.26,133.57c2.37,3.15,4.58,6.4,6.62,9.75l135.21-121.75c-6.77-7.53-13.97-14.73-21.57-21.57Z"
                />
                <path
                  className={`${getPathClass(35)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(35)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(35)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M351.99,576.4c9.96-2.13,19.79-4.76,29.45-7.9l-12.91-39.72c-8.52,1.76-17.15,3.04-25.86,3.82l9.31,43.81Z"
                />
                <path
                  className={`${getPathClass(36)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(36)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(36)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M321.87,1.6l-17.2,163.66c4.21,1.38,8.39,3,12.54,4.8L352,6.38c-10.02-2.14-20.07-3.73-30.12-4.79Z"
                />
                <path
                  className={`${getPathClass(37)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(37)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(37)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M145.74,39.09l72.17,125.01c4.99-1.49,10.06-2.72,15.19-3.67L172.91,25.25c-9.28,4.13-18.35,8.75-27.18,13.84Z"
                />
                <path
                  className={`${getPathClass(38)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(38)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(38)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M163.83,467.01l-43.7,60.15c8.17,5.92,16.7,11.47,25.59,16.59l35.03-60.67c-5.98-5.06-11.63-10.42-16.92-16.07Z"
                />
                <path
                  className={`${getPathClass(39)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(39)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(39)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M220.58,509.43c-7.26-3.66-14.21-7.72-20.84-12.11l-26.83,60.26c9.4,4.18,18.9,7.82,28.47,10.94l19.2-59.09Z"
                />
                <path
                  className={`${getPathClass(40)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(40)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(40)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M126.63,411.14c-2.95-6.55-5.56-13.25-7.8-20.08l-79.73,46.03c5.07,8.8,10.59,17.35,16.58,25.6l70.96-51.55Z"
                />
                <path
                  className={`${getPathClass(41)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(41)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(41)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M527.16,120.13l-148.85,108.15c1.65,3.39,3.15,6.85,4.48,10.37l160.94-92.92c-5.07-8.79-10.59-17.34-16.58-25.6Z"
                />
                <path
                  className={`${getPathClass(42)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(42)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(42)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M109.92,350.38l-95.59,31.06c3.15,9.67,6.8,19.18,10.93,28.47l88.04-39.19c-1.46-6.71-2.59-13.49-3.37-20.34Z"
                />
                <path
                  className={`${getPathClass(43)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(43)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(43)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M316.85,533.45c-8.46-.2-16.95-.89-25.44-2.05v51.43c10.21,0,20.38-.54,30.46-1.61l-5.02-47.77Z"
                />
                <path
                  className={`${getPathClass(44)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(44)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(44)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M328.96,175.86c3.76,2.12,7.39,4.41,10.84,6.87L409.92,25.25c-9.4-4.18-18.9-7.82-28.47-10.94l-52.49,161.56Z"
                />
                <path
                  className={`${getPathClass(45)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(45)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(45)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M116.02,272.98L1.6,260.95C.53,271.12,0,281.29,0,291.41h111.81c1.11-6.16,2.51-12.32,4.21-18.44Z"
                />
                <path
                  className={`${getPathClass(46)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(46)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(46)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M277.51,159.16c4.64.59,9.28,1.39,13.9,2.44V0c-10.21,0-20.38.54-30.46,1.61l16.56,157.55Z"
                />
                <path
                  className={`${getPathClass(47)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(47)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(47)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M358.43,199.17l104.26-143.5c-8.17-5.92-16.7-11.47-25.59-16.59l-87.46,151.48c3.09,2.73,6.02,5.61,8.79,8.61Z"
                />
                <path
                  className={`${getPathClass(48)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(48)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(48)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M174,185.69l-99.14-89.27c-6.76,7.51-13.17,15.42-19.18,23.71l105.08,76.34c4.22-3.87,8.65-7.46,13.25-10.79Z"
                />
                <path
                  className={`${getPathClass(49)} cursor-pointer`}
                  onMouseEnter={() => {
                    const proj = getProjectForPath(49)
                    if (proj) setHoveredProject(proj.id)
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    const proj = getProjectForPath(49)
                    if (proj) handleProjectClick(proj.id)
                  }}
                  d="M25.25,172.91l112.78,50.21c3.29-4.96,6.84-9.67,10.65-14.12l-109.59-63.27c-5.02,8.72-9.65,17.78-13.83,27.18Z"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Scroll indicator */}
        {progression < 0.1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm font-mono">Scroll to explore projects</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Mobile search fixed at top (outside bottom sheet), hidden on md+ */}
      <div className="md:hidden fixed top-25 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm">
        <label htmlFor="project-search-mobile" className="sr-only">Search projects</label>
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full bg-neutral-100 text-neutral-900 placeholder:text-neutral-900 placeholder:opacity-70 border border-neutral-900 rounded-full px-4 py-2 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 hover:bg-white transition-colors"
        />
      </div>

      {/* Unified responsive project list: left sidebar on md+ (hidden on mobile to avoid overlap) */}
      <div className="hidden md:block fixed z-50 left-1/2 bottom-4 -translate-x-1/2 w-[90vw] max-w-sm md:left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 md:w-64" style={{ perspective: "1000px" }}>
        <div
          ref={listRef}
          className="h-[30vh] md:h-[70vh] overflow-y-auto bg-card/90 md:bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 shadow-2xl scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent opacity-90 md:opacity-75"
          onScroll={handleListScroll}
          onMouseEnter={() => setIsSidebarActive(true)}
          onMouseLeave={() => setIsSidebarActive(false)}
          onTouchStart={() => setIsSidebarActive(true)}
          onTouchEnd={() => setIsSidebarActive(false)}
        >
          {/* Mobile controls: status only; slider hidden on mobile */}
          <div className="md:hidden flex flex-col gap-2 mb-3">
            <span className="text-xs font-mono text-muted-foreground">Project {currentProjectId} of {projects.length}</span>
          </div>

          <div className="space-y-2">
            {projectOrder.map((projectId) => {
              const project = projects.find((p) => p.id === projectId)
              if (!project) return null

              const isActive = projectId === currentProjectId
              const isSelected = projectId === selectedProject

              return (
                <button
                  key={projectId}
                  data-project-id={projectId}
                  onClick={() => handleProjectClick(projectId)}
                  onMouseEnter={() => setHoveredProject(projectId)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={getSidebarItemStyle(projectId)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-500 ${
                    isActive
                      ? "bg-primary/20 border-2 border-primary scale-105 shadow-lg"
                      : isSelected
                        ? "bg-primary/10 border border-primary/50"
                        : "bg-secondary/30 border border-transparent hover:bg-secondary/50 hover:scale-102"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? "bg-primary w-3 h-3" : "bg-muted-foreground/30"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-mono text-sm transition-all duration-300 ${
                          isActive ? "text-primary font-bold text-base" : "text-foreground"
                        }`}
                      >
                        {project.name}
                      </p>
                      {isActive && (
                        <p className="text-xs text-muted-foreground mt-1 animate-in fade-in duration-300">
                          {project.location} • {project.price}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile bottom horizontal slider bar */}
      <div className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-xl">
        <div className="bg-card/90 backdrop-blur-xl border border-primary/20 rounded-full px-4 py-3 shadow-2xl flex items-center gap-3">
          <button
            aria-label="Previous project"
            className="px-3 py-2 rounded-full bg-secondary/40 text-foreground hover:bg-secondary/60 transition"
            onClick={() => {
              const base = isSliderActive ? sliderValue : currentProjectIndex
              const next = Math.max(0, base - 1)
              setIsSliderActive(true)
              setSliderValue(next)
            }}
          >
            ‹
          </button>
          <input
            type="range"
            min={0}
            max={projectOrder.length - 1}
            value={isSliderActive ? sliderValue : currentProjectIndex}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setIsSliderActive(true)
              const v = Number(e.target.value)
              setSliderValue(v)
            }}
            onMouseUp={() => setIsSliderActive(false)}
            onTouchEnd={() => setIsSliderActive(false)}
            aria-label="Project progression slider"
            className="flex-1"
          />
          <button
            aria-label="Next project"
            className="px-3 py-2 rounded-full bg-secondary/40 text-foreground hover:bg-secondary/60 transition"
            onClick={() => {
              const base = isSliderActive ? sliderValue : currentProjectIndex
              const next = Math.min(projectOrder.length - 1, base + 1)
              setIsSliderActive(true)
              setSliderValue(next)
            }}
          >
            ›
          </button>
        </div>
      </div>

      {selectedProjectData && (
        <div className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-500">
          <Card className="bg-card/95 backdrop-blur-lg border-primary/30 overflow-hidden max-w-[95vw] md:max-w-2xl">
            <div className="flex items-center gap-6 p-6">
              <img
                src={selectedProjectData.image || "/placeholder.svg"}
                alt={selectedProjectData.name}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedProjectData.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{selectedProjectData.description}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location: </span>
                    <span className="text-foreground font-medium">{selectedProjectData.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price: </span>
                    <span className="text-foreground font-medium">{selectedProjectData.price}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}



