import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled ? "bg-[#081e1f]/80 backdrop-blur-md border-b border-[#d4cfbc]/10" : "bg-transparent"
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/ar" className="flex-shrink-0">
            <span className="text-2xl font-serif text-[#d4cfbc] tracking-wider">كالما</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 space-x-reverse">
              <Link
                to="/ar"
                className="text-[#d4cfbc]/80 hover:text-[#d4cfbc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                الرئيسية
              </Link>
              <Link
                to="/ar/projects"
                className="text-[#d4cfbc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                المشاريع
              </Link>
              <Link
                to="/ar/about"
                className="text-[#d4cfbc]/80 hover:text-[#d4cfbc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                من نحن
              </Link>
              <Link
                to="/ar/contact"
                className="text-[#d4cfbc]/80 hover:text-[#d4cfbc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                اتصل بنا
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#d4cfbc] hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#081e1f]/95 backdrop-blur-xl border-b border-[#d4cfbc]/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right">
            <Link
              to="/ar"
              className="text-[#d4cfbc] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              الرئيسية
            </Link>
            <Link
              to="/ar/projects"
              className="text-[#d4cfbc] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              المشاريع
            </Link>
            <Link
              to="/ar/about"
              className="text-[#d4cfbc] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              من نحن
            </Link>
            <Link
              to="/ar/contact"
              className="text-[#d4cfbc] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
