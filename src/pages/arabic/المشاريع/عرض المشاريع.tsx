import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import ProjectGallery from '@/components/ui/ProjectGallery'
import '../../english/Projects/Project.css'
import { resolveAssetUrl } from '@/utils/assetResolver'

interface Project { id: number; name: string; description: string; location: string; price: string; image: string }

const projects: Project[] = [
  { id: 11, name: 'برج كالما', description: 'برج سكني أيقوني يحدد أفق المدينة', location: 'الحي المالي', price: '45.2M$', image: resolveAssetUrl('/src/assets/Backgrounds/About-Header-p-1600.jpg') }
]

const projectOrder = [11]

export default function عرضالمشاريعAR() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [isSliderActive, setIsSliderActive] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)

  function scrollToProject(projectId: number) {
    const idx = projectOrder.indexOf(projectId)
    if (idx === -1) return
    const progress = idx / (projectOrder.length - 1 || 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const top = progress * scrollHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      if (isSliderActive) return
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / (scrollHeight || 1)
      setScrollProgress(Math.min(progress, 1))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSliderActive])

  const progression = isSliderActive ? sliderValue / (projectOrder.length - 1 || 1) : scrollProgress
  const translateZ = progression * 1500
  const scale = 1 + progression * 0.4
  const opacity = 1 - progression * 0.2

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId)
    scrollToProject(projectId)
  }

  const currentProjectIndex = Math.round(progression * (projectOrder.length - 1 || 1))
  const currentProjectId = projectOrder[Math.min(currentProjectIndex, projectOrder.length - 1)]

  const selectedProjectData = selectedProject ? projects.find((p) => p.id === selectedProject) : null

  const getPathClass = () => 'shape-default'

  return (
    <div ref={containerRef} className="relative min-h-[800vh]" style={{ backgroundColor: 'var(--color-bg-secondary)' }} dir="rtl" lang="ar">
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 50% 50%, var(--color-overlay-dark) 0%, var(--color-overlay-dark) 70%)` }} />

        <div className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 z-50 w-[300px]" style={{ pointerEvents: 'auto' }}>
          <div className="flex flex-col items-start gap-2 mb-3">
            <span className="text-xs font-mono text-muted-foreground">مشروع {currentProjectId} من {projects.length}</span>
            <input type="range" min={0} max={projectOrder.length - 1} value={isSliderActive ? sliderValue : currentProjectIndex} onChange={(e) => { setIsSliderActive(true); setSliderValue(Number(e.target.value)) }} onMouseUp={() => setIsSliderActive(false)} onTouchEnd={() => setIsSliderActive(false)} aria-label="شريط تقدم المشاريع" className="w-full" />
          </div>
          <input id="project-search" type="text" placeholder="ابحث عن المشاريع..." className="w-full bg-neutral-100 text-neutral-900 placeholder:text-neutral-900 placeholder:opacity-70 border border-neutral-900 rounded-full px-5 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 hover:bg-white transition-colors" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out" style={{ transform: `scale(${scale}) translateZ(${translateZ}px)`, transformStyle: 'preserve-3d' as const, perspective: '1500px', opacity, pointerEvents: 'none' }}>
          <svg ref={svgRef} viewBox="0 0 543.73 582.83" className="w-64 h-64 sm:w-[520px] sm:h-[520px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px]" style={{ filter: 'drop-shadow(0 0 60px #081e1f)', pointerEvents: 'auto' }}>
            <defs>
              <style>{`.shape-default { fill:#081e1f; transition: all 0.4s ease; }`}</style>
            </defs>
            <g>
              <path className={`${getPathClass()} cursor-pointer`} d="M251.92,202.7c3.1-1.38,6.27-2.59,9.49-3.64" />
            </g>
          </svg>
        </div>

        {progression < 0.1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm font-mono">مرر لاستكشاف المشاريع</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar list simplified */}
      <div className="hidden md:block fixed z-50 right-8 top-1/2 -translate-y-1/2 w-64" style={{ perspective: '1000px' }}>
        <div ref={listRef} className="h-[70vh] overflow-y-auto bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 opacity-75">
          <div className="space-y-2">
            {projectOrder.map((projectId) => {
              const project = projects.find((p) => p.id === projectId)
              if (!project) return null
              const isActive = projectId === currentProjectId
              return (
                <button key={projectId} data-project-id={projectId} onClick={() => handleProjectClick(projectId)} className={`w-full text-right p-3 rounded-lg transition-all ${isActive ? 'bg-primary/20 border-2 border-primary' : 'bg-secondary/30'}`}> 
                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex-1 min-w-0">
                      <p className={`font-mono text-sm ${isActive ? 'text-primary font-bold text-base' : 'text-foreground'}`}>{project.name}</p>
                      {isActive && (<p className="text-xs text-muted-foreground mt-1">{project.location} • {project.price}</p>)}
                    </div>
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${isActive ? 'bg-primary w-3 h-3' : 'bg-muted-foreground/30'}`} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {selectedProjectData && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <Card className="bg-card/95 backdrop-blur-lg border-primary/30 overflow-hidden max-w-[95vw] md:max-w-2xl">
            <div className="flex items-center gap-6 p-6">
              <img src={selectedProjectData.image} alt={selectedProjectData.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedProjectData.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{selectedProjectData.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div><span className="text-muted-foreground">الموقع: </span><span className="text-foreground font-medium">{selectedProjectData.location}</span></div>
                  <div><span className="text-muted-foreground">السعر: </span><span className="text-foreground font-medium">{selectedProjectData.price}</span></div>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-muted-foreground hover:text-foreground transition-colors">×</button>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-20">
        <ProjectGallery
          entries={[
            { id: 'calma-tower', title: 'Calma Tower', dir: 'calma tower', location: 'حي الصحافة' },
            { id: 'one-tower', title: 'One Tower', dir: 'One Tower', location: 'الرياض' },
            { id: 'gh220', title: 'GH220', dir: 'GH220 الغدير', location: 'حي الغدير' },
            { id: 'ht210', title: 'HT210', dir: 'HT210 حطين', location: 'حي حطين' },
            { id: 'ht260', title: 'HT260', dir: 'HT260 ادوار حطين', location: 'حي حطين' },
            { id: 'jn130', title: 'JN130', dir: 'JN130 الجنادرية', location: 'حي الجنادرية' },
            { id: 'rm240', title: 'RM240', dir: 'RM240 الرمال', location: 'حي الرمال' },
            { id: 'sa230', title: 'SA230', dir: 'SA230 الصفا', location: 'حي الصفا' },
            { id: 'ys190', title: 'YS190', dir: 'YS190 اداور الياسمين', location: 'حي الياسمين' },
            { id: 'nk250', title: 'NK250', dir: 'النــخـيل NK250', location: 'حي النخيل' },
            { id: 'ys200', title: 'YS200', dir: 'الياسـمين YS200', location: 'حي الياسمين' },
            { id: 'almajd', title: 'استراحة الماجد', dir: 'استراحة الماجد', location: 'الرياض' }
          ]}
        />
      </div>
    </div>
  )
}
