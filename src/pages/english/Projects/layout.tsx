import { Suspense } from "react"
import "./projects.css"
import { Navigation } from "@/components/english/Navigation"
import { Footer } from "@/components/english/Footer"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#081e1f] text-[#d4cfbc] dark">
      <Navigation />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  )
}
