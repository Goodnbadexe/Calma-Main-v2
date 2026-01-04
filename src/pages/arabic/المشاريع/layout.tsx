import { Suspense } from "react"
import { Navigation } from "@/components/arabic/Navigation"
import { Footer } from "@/components/arabic/Footer"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#081e1f] text-[#d4cfbc]" dir="rtl">
      <Navigation />
      <main className="flex-grow">
        <Suspense fallback={<div>جاري التحميل...</div>}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  )
}
