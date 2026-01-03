export function Footer() {
  return (
    <footer className="bg-[#081e1f] border-t border-[#d4cfbc]/10 text-[#d4cfbc]/80 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-[#d4cfbc]">كالما</h3>
            <p className="text-sm leading-relaxed">
              صياغة منازل سعودية مميزة بدقة متقنة وتصميم هادف.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#d4cfbc] font-medium mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/ar" className="hover:text-[#d4cfbc] transition-colors">الرئيسية</a></li>
              <li><a href="/ar/projects" className="hover:text-[#d4cfbc] transition-colors">المشاريع</a></li>
              <li><a href="/ar/about" className="hover:text-[#d4cfbc] transition-colors">من نحن</a></li>
              <li><a href="/ar/contact" className="hover:text-[#d4cfbc] transition-colors">اتصل بنا</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#d4cfbc] font-medium mb-4">تواصل معنا</h4>
            <ul className="space-y-2 text-sm">
              <li>الرياض، المملكة العربية السعودية</li>
              <li>info@calma.sa</li>
              <li>+966 11 000 0000</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#d4cfbc] font-medium mb-4">التواصل الاجتماعي</h4>
            <div className="flex space-x-4 space-x-reverse">
              {/* Add social icons here */}
              <a href="#" className="hover:text-[#d4cfbc] transition-colors">تويتر</a>
              <a href="#" className="hover:text-[#d4cfbc] transition-colors">انستغرام</a>
              <a href="#" className="hover:text-[#d4cfbc] transition-colors">لينكد إن</a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#d4cfbc]/10 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} كالما العقارية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
