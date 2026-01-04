import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Search, Grid3x3, Eye } from "lucide-react"
import { projects, projectOrder } from "@/data/english/projects"
import "./projects.css"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

interface ProjectsPageProps {
  category?: string
}

export default function ProjectsPage({ category }: ProjectsPageProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"preview" | "grid">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / scrollHeight
      setScrollProgress(Math.min(progress, 1))
    }

    if (viewMode === "preview") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [viewMode])

  const translateZ = scrollProgress * 3000 // Increased from 2000 to 3000 for more dramatic effect
  const scale = 1 + scrollProgress * 0.8 // Increased scale for better depth perception
  const opacity = 1 - scrollProgress * 0.3 // Fade out slightly as we move forward

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId)
  }

  const currentProjectIndex = Math.floor(scrollProgress * projectOrder.length)
  const currentProjectId = projectOrder[Math.min(currentProjectIndex, projectOrder.length - 1)]

  useEffect(() => {
    if (sidebarRef.current) {
      const activeElement = sidebarRef.current.querySelector(`[data-project-id="${currentProjectId}"]`)
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentProjectId])

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
  const currentProjectData = projects.find((p) => p.id === currentProjectId)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = category ? project.category?.toLowerCase() === category.toLowerCase() : true
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#081e1f] text-[#d4cfbc] dark">
      <div className="sticky top-16 left-0 right-0 z-50 bg-[#081e1f]/80 backdrop-blur-sm border-b border-[#d4cfbc]/20">
        <Container>
          <div className="py-4 flex items-center justify-between gap-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4cfbc]/60" />
            <input
              type="text"
              placeholder="Search projects by name, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a2021] text-[#d4cfbc] placeholder:text-[#d4cfbc]/50 border border-[#d4cfbc]/20 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#d4cfbc]/50 transition-all"
            />
          </div>

          {/* View Mode Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                viewMode === "preview"
                  ? "bg-[#d4cfbc] text-[#081e1f]"
                  : "bg-[#0a2021] text-[#d4cfbc] border border-[#d4cfbc]/20 hover:bg-[#d4cfbc]/10"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-[#d4cfbc] text-[#081e1f]"
                  : "bg-[#0a2021] text-[#d4cfbc] border border-[#d4cfbc]/20 hover:bg-[#d4cfbc]/10"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
          </div>
        </Container>
      </div>

      {viewMode === "preview" && (
        <div ref={containerRef} className="relative min-h-[800vh]" style={{ backgroundColor: "#081e1f" }}>
          <div className="fixed inset-0 flex items-center justify-center overflow-hidden pt-40">
            {/* Background gradient effect */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(114, 89, 65, 0.3) 0%, rgba(8, 30, 31, 0) 70%)`,
              }}
            />

            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
              style={{
                transform: `scale(${scale}) translateZ(${translateZ}px)`,
                transformStyle: "preserve-3d",
                perspective: "1500px",
                opacity: opacity,
              }}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 543.73 582.83"
                className="w-[600px] h-[600px] md:w-[700px] md:h-[700px]"
                style={{
                  filter: "drop-shadow(0 0 60px rgba(212, 207, 188, 0.4))",
                }}
              >
                <defs>
                  <style>{`
                    .shape-default { fill: #725941; transition: all 0.4s ease; }
                    .shape-hover { fill: #a88968; transition: all 0.4s ease; }
                    .shape-selected { fill: #d4b896; transition: all 0.4s ease; }
                    .shape-active { fill: #e8d4b8; transition: all 0.4s ease; }
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
                      d="M163.83,467.01l-43.7,60.15c8.17,5.92,16.7,11.47,25.59,16.59l35.03-60.67c-5.98-5.06-16.92-16.07Z"
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
                      d="M174,185.69l-99.14-89.27c-6.76,7.51-13.17-15.42-19.18,23.71l105.08,76.34c4.22-3.87,8.65-7.46,13.25-10.79Z"
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
          </div>

          {/* Scroll indicator */}
          {scrollProgress < 0.1 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <span className="text-sm font-mono">Scroll to explore projects</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#081e1f]/90 backdrop-blur-sm border-t border-[#d4cfbc]/20">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Progress Info */}
              <div className="text-center mb-3">
                <span className="text-xs font-mono text-[#d4cfbc]/70">
                  Project {currentProjectId} of {projects.length} • {currentProjectData?.name}
                </span>
              </div>

              {/* Horizontal Scrollable Project List */}
              <div
                ref={sidebarRef}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#d4cfbc]/20 scrollbar-track-transparent"
                style={{ scrollbarWidth: "thin" }}
              >
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
                      className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                        isActive || isSelected
                          ? "bg-[#d4cfbc] text-[#081e1f] scale-110"
                          : "bg-[#0a2021] text-[#d4cfbc] border border-[#d4cfbc]/20 hover:bg-[#d4cfbc]/10"
                      }`}
                      style={getSidebarItemStyle(projectId)}
                    >
                      {project.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Project Details Card */}
          {displayProject && (
            <Card className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-[#0a2021]/95 backdrop-blur-sm border-[#d4cfbc]/30 p-6 text-[#d4cfbc]">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={displayProject.image || "/placeholder.svg"}
                  alt={displayProject.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#e8d4b8]">{displayProject.name}</h3>
                  <p className="text-xs text-[#d4cfbc]/70 mt-1">
                    {displayProject.location} • {displayProject.price}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-[#d4cfbc]/60 hover:text-[#d4cfbc] transition-colors ml-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-[#d4cfbc]/80 mb-4">{displayProject.description}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 bg-[#d4cfbc]/20 text-[#d4cfbc] rounded-lg font-medium hover:bg-[#d4cfbc]/30 transition-all"
                >
                  Close
                </button>
              </div>
            </Card>
          )}
        </div>
      )}

      {viewMode === "grid" && (
        <div className="min-h-screen bg-[#081e1f] pt-24 pb-20">
          <Section>
            <Container>
            {/* Stats Overview */}
            <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#d4cfbc]">{filteredProjects.length}</div>
                <div className="text-sm text-[#d4cfbc]/60 mt-1">Total Projects</div>
              </div>
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#d4cfbc]">
                  {new Set(filteredProjects.map((p) => p.location)).size}
                </div>
                <div className="text-sm text-[#d4cfbc]/60 mt-1">Locations</div>
              </div>
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#d4cfbc]">
                  $
                  {filteredProjects
                    .reduce((acc, p) => acc + Number.parseFloat(p.price.replace(/[$M]/g, "")), 0)
                    .toFixed(1)}
                  M
                </div>
                <div className="text-sm text-[#d4cfbc]/60 mt-1">Total Value</div>
              </div>
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#d4cfbc]">
                  $
                  {(
                    filteredProjects.reduce((acc, p) => acc + Number.parseFloat(p.price.replace(/[$M]/g, "")), 0) /
                    (filteredProjects.length || 1)
                  ).toFixed(1)}
                  M
                </div>
                <div className="text-sm text-[#d4cfbc]/60 mt-1">Avg Price</div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-[#0a2021] border-[#d4cfbc]/20 overflow-hidden hover:border-[#d4cfbc]/60 transition-all hover:scale-[1.02] cursor-pointer group"
                  onClick={() => {
                    setSelectedProject(project.id)
                    setViewMode("preview")
                    // Scroll to this project in preview mode
                    setTimeout(() => {
                      const idx = projectOrder.indexOf(project.id)
                      if (idx !== -1) {
                        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
                        const progress = idx / (projectOrder.length - 1)
                        window.scrollTo({ top: progress * scrollHeight, behavior: "smooth" })
                      }
                    }, 100)
                  }}
                >
                  {/* Project Image */}
                  <div className="aspect-video overflow-hidden bg-[#081e1f]">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#d4cfbc] group-hover:text-[#e8d4b8] transition-colors">
                        {project.name}
                      </h3>
                      <span className="text-sm font-mono text-[#d4cfbc]/60">#{project.id}</span>
                    </div>

                    <p className="text-sm text-[#d4cfbc]/70 mb-3 line-clamp-2">{project.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#d4cfbc]/60">{project.location}</span>
                      <span className="font-bold text-[#d4cfbc]">{project.price}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results Message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <Search className="w-16 h-16 mx-auto text-[#d4cfbc]/30 mb-4" />
                <h3 className="text-xl font-bold text-[#d4cfbc] mb-2">No projects found</h3>
                <p className="text-[#d4cfbc]/60">Try adjusting your search criteria</p>
              </div>
            )}
            </Container>
          </Section>
        </div>
      )}
    </div>
  )
}
