import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProjectsLayout from './layout'
import { projects } from "@/data/english/projects"

export default function ProjectPage() {
  const { slug } = useParams()
  // Try to find by ID first
  const project = projects.find(p => p.id.toString() === slug)

  if (!project) {
    return (
      <ProjectsLayout>
        <div className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-serif text-[#d4cfbc] mb-6">Project Not Found</h1>
           <Link to="/projects" className="text-[#d4cfbc]/60 hover:text-[#d4cfbc] flex items-center gap-2 transition-colors">
             <ArrowLeft className="w-4 h-4" />
             Back to Projects
           </Link>
        </div>
      </ProjectsLayout>
    )
  }

  return (
    <ProjectsLayout>
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-[#d4cfbc]/60 hover:text-[#d4cfbc] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="bg-[#0a2021] border border-[#d4cfbc]/20 rounded-xl overflow-hidden shadow-2xl shadow-[#0a2021]/50">
            <div className="aspect-video w-full relative">
               <img 
                 src={project.image} 
                 alt={project.name}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a2021] via-transparent to-transparent opacity-90" />
               <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                 <h1 className="text-3xl md:text-5xl font-serif text-[#e8d4b8] mb-2">{project.name}</h1>
                 <p className="text-lg md:text-xl text-[#d4cfbc]/80 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#d4cfbc]/60"></span>
                   {project.location}
                 </p>
               </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
                 {project.category && (
                   <div className="bg-[#d4cfbc]/10 px-4 py-2 rounded-lg text-[#d4cfbc] border border-[#d4cfbc]/20 text-sm font-medium">
                     {project.category}
                   </div>
                 )}
                 <div className="bg-[#d4cfbc]/10 px-4 py-2 rounded-lg text-[#d4cfbc] border border-[#d4cfbc]/20 text-sm font-medium">
                   {project.price}
                 </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-[#d4cfbc] mb-4">Overview</h3>
                  <p className="text-[#d4cfbc]/70 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#d4cfbc]/10">
                  <div>
                    <h4 className="text-[#e8d4b8] font-medium mb-2">Property Features</h4>
                    <ul className="space-y-2 text-[#d4cfbc]/60">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4cfbc]/40"></span>
                        Premium Finishes
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4cfbc]/40"></span>
                        Modern Architecture
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4cfbc]/40"></span>
                        Smart Home System
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#e8d4b8] font-medium mb-2">Location Benefits</h4>
                    <ul className="space-y-2 text-[#d4cfbc]/60">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4cfbc]/40"></span>
                        Prime District
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4cfbc]/40"></span>
                        Close to Amenities
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#d4cfbc]/40"></span>
                        High Investment Value
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-8 flex justify-end">
                  <button className="bg-[#d4cfbc] text-[#081e1f] px-8 py-3 rounded-lg font-bold hover:bg-[#e8d4b8] transition-all transform hover:scale-105 shadow-lg shadow-[#d4cfbc]/20">
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProjectsLayout>
  )
}
