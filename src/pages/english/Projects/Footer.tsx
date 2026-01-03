export function Footer() {
  return (
    <footer className="bg-[#081e1f] border-t border-[#d4cfbc]/10 text-[#d4cfbc]/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-[#d4cfbc]">CALMA</h3>
            <p className="text-sm leading-relaxed">
              Crafting distinctive Saudi homes with masterful precision and purposeful design.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#d4cfbc] font-medium mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#d4cfbc] transition-colors">Home</a></li>
              <li><a href="/projects" className="hover:text-[#d4cfbc] transition-colors">Projects</a></li>
              <li><a href="/about" className="hover:text-[#d4cfbc] transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#d4cfbc] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#d4cfbc] font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Riyadh, Saudi Arabia</li>
              <li>info@calma.sa</li>
              <li>+966 11 000 0000</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#d4cfbc] font-medium mb-4">Social</h4>
            <div className="flex space-x-4">
              {/* Add social icons here */}
              <a href="#" className="hover:text-[#d4cfbc] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#d4cfbc] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#d4cfbc] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#d4cfbc]/10 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Calma Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
