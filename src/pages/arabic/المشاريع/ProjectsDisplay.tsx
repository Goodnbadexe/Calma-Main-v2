import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Search, Grid3x3, Eye } from "lucide-react"
import { projects, projectOrder } from "@/data/arabic/projects"
import "@/pages/english/Projects/projects.css"

interface ProjectsPageProps {
  category?: string
}

export default function ArabicProjects({ category }: ProjectsPageProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"preview" | "grid">("preview")
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Filter projects first
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = category ? project.category?.toLowerCase() === category.toLowerCase() : true
    
    return matchesSearch && matchesCategory
  })

  // Filter order based on available projects
  const filteredOrder = projectOrder.filter(id => filteredProjects.some(p => p.id === id))
  // Fallback if order is empty (shouldn't happen if projects exist)
  const activeOrder = filteredOrder.length > 0 ? filteredOrder : filteredProjects.map(p => p.id)

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

  const translateZ = scrollProgress * 3000
  const scale = 1 + scrollProgress * 0.8
  const opacity = 1 - scrollProgress * 0.3
  
  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId)
  }

  const currentProjectIndex = Math.floor(scrollProgress * activeOrder.length)
  const currentProjectId = activeOrder[Math.min(currentProjectIndex, activeOrder.length - 1)]

  useEffect(() => {
    if (sidebarRef.current) {
      const activeElement = sidebarRef.current.querySelector(`[data-project-id="${currentProjectId}"]`)
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentProjectId])

  const getPathClass = (project: typeof projects[0]) => {
    if (!project) return "shape-default"

    if (project.id === currentProjectId) return "shape-active"
    if (selectedProject === project.id) return "shape-selected"
    if (hoveredProject === project.id) return "shape-hover"
    return "shape-default"
  }

  const getSidebarItemStyle = (projectId: number) => {
    const projectIndex = activeOrder.indexOf(projectId)
    const distance = Math.abs(projectIndex - currentProjectIndex)
    const direction = projectIndex - currentProjectIndex

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

  // Generate hex grid coordinates
  const getHexPoints = (index: number, total: number) => {
    // Simple hex grid centered in 800x800
    const columns = 6;
    const row = Math.floor(index / columns)
    const col = index % columns
    
    // Grid dimensions
    const hexRadius = 30;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const xSpacing = hexWidth;
    const ySpacing = hexHeight * 0.75;

    // Center offsets (approximate for ~50 items)
    const totalRows = Math.ceil(total / columns);
    const gridWidth = columns * xSpacing;
    const gridHeight = totalRows * ySpacing;
    const startX = (800 - gridWidth) / 2;
    const startY = (800 - gridHeight) / 2;

    const x = startX + col * xSpacing + (row % 2) * (xSpacing / 2)
    const y = startY + row * ySpacing
    const r = hexRadius - 2 // small gap

    return `M ${x + r * Math.cos(0)} ${y + r * Math.sin(0)} ` +
           [1, 2, 3, 4, 5].map(i => `L ${x + r * Math.cos(i * Math.PI / 3)} ${y + r * Math.sin(i * Math.PI / 3)}`).join(' ') +
           `Z`
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#081e1f] text-[#d4cfbc]" dir="rtl">
      {/* Header - Always visible */}
      <div className="fixed top-20 left-0 right-0 z-50 bg-[#081e1f]/80 backdrop-blur-sm border-b border-[#d4cfbc]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4cfbc]/60" />
            <input
              type="text"
              placeholder="ابحث عن المشاريع بالاسم، الموقع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a2021] text-[#d4cfbc] placeholder:text-[#d4cfbc]/50 border border-[#d4cfbc]/20 rounded-lg pr-10 pl-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#d4cfbc]/50 transition-all text-right"
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
              <span className="hidden sm:inline">معاينة</span>
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
              <span className="hidden sm:inline">شبكة</span>
            </button>
          </div>
        </div>
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

            <div className="fixed inset-0 z-0 flex items-center justify-center">
              <svg 
                ref={svgRef} 
                viewBox="0 0 800 800"
                className="w-full h-full max-w-[1200px] max-h-[1200px]" 
                style={{ transform: `scale(${scale})`, opacity, transition: 'transform 0.1s ease-out' }}
              >
                <defs>
                  <style>{`
                    .shape-default { fill: #725941; transition: all 0.4s ease; opacity: 0.8; }
                    .shape-hover { fill: #a88968; transition: all 0.4s ease; opacity: 1; transform: scale(1.1); transform-origin: center; }
                    .shape-selected { fill: #d4b896; transition: all 0.4s ease; stroke: #fff; stroke-width: 2px; }
                    .shape-active { fill: #e8d4b8; transition: all 0.4s ease; stroke: #d4cfbc; stroke-width: 2px; }
                  `}</style>
                </defs>
                <g transform="translate(100, 100)">
                   {filteredProjects.slice(0, 50).map((project, index) => (
                    <path
                      key={project.id}
                      className={`${getPathClass(project)} cursor-pointer`}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => handleProjectClick(project.id)}
                      d={getHexPoints(index, filteredProjects.length)}
                    />
                   ))}
                </g>
              </svg>
            </div>
          </div>

          {/* Scroll indicator */}
          {scrollProgress < 0.1 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <span className="text-sm font-mono">مرر لاستكشاف المشاريع</span>
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
                  مشروع {currentProjectId} من {projects.length} • {currentProjectData?.name}
                </span>
              </div>

              {/* Horizontal Scrollable Project List */}
              <div
                ref={sidebarRef}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#d4cfbc]/20 scrollbar-track-transparent"
                style={{ scrollbarWidth: "thin" }}
              >
                {activeOrder.map((projectId) => {
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
                  إغلاق
                </button>
              </div>
            </Card>
          )}
        </div>
      )}

      {viewMode === "grid" && (
        <div className="min-h-screen bg-[#081e1f] py-20 pt-40">
          {/* Grid Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
            {/* Stats Overview */}
            <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <span className="block text-2xl font-bold text-[#d4cfbc]">{filteredProjects.length}</span>
                <span className="text-xs text-[#d4cfbc]/60">إجمالي المشاريع</span>
              </div>
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <span className="block text-2xl font-bold text-[#d4cfbc]">
                  {filteredProjects.filter(p => p.category === 'فيلا').length}
                </span>
                <span className="text-xs text-[#d4cfbc]/60">فلل</span>
              </div>
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <span className="block text-2xl font-bold text-[#d4cfbc]">
                  {filteredProjects.filter(p => p.category === 'طابق').length}
                </span>
                <span className="text-xs text-[#d4cfbc]/60">طوابق</span>
              </div>
              <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-lg p-4 text-center">
                <span className="block text-2xl font-bold text-[#d4cfbc]">
                   {filteredProjects.filter(p => p.category === 'تاون هاوس').length}
                </span>
                <span className="text-xs text-[#d4cfbc]/60">تاون هاوس</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="bg-[#0a2021] border-[#d4cfbc]/20 text-[#d4cfbc] hover:border-[#d4cfbc]/50 transition-all cursor-pointer group"
                  onClick={() => {
                    setSelectedProject(project.id)
                    setViewMode("preview")
                  }}
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image || "/placeholder.svg"} 
                      alt={project.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium">عرض المشروع</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{project.name}</h3>
                      <span className="text-xs bg-[#d4cfbc]/10 px-2 py-1 rounded text-[#d4cfbc]">{project.category}</span>
                    </div>
                    <p className="text-sm text-[#d4cfbc]/70 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#d4cfbc]/60">{project.location}</span>
                      <span className="font-medium text-[#e8d4b8]">{project.price}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}