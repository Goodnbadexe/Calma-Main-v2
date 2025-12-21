import { useState } from 'react'
import { motion } from 'framer-motion'
import './المشاريع.css'

// Import background images
import backgroundImage1 from '@/assets/Backgrounds/Abou-1-p-1600.jpg'
import backgroundImage2 from '@/assets/Backgrounds/About-Header-p-1600.jpg'
import backgroundImage3 from '@/assets/Backgrounds/CTA-BG-p-1600.jpg'
import aboutHeader from '@/assets/Images/About/About-Header.jpg'
import brandValues1 from '@/assets/Images/About/Brand-Values-1.JPG'
import stats77097 from '@/assets/Images/About/Stats-77097-sqm.JPG'
import stats130000 from '@/assets/Images/About/Stats130000-sqm.JPG'

export default function ArabicProjects() {
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['الكل', 'سكني', 'تجاري', 'فاخر', 'مجتمعي', 'مستدام']

  const projects = [
    // Residential Projects
    { id: 1, name: "مساكن كالما", category: "سكني", location: "شمال الرياض", price: "10.5 مليون ريال", description: "منازل عائلية فاخرة مع تشطيبات راقية ومرافق مجتمعية", image: backgroundImage2 },
    { id: 2, name: "فلل التراث", category: "سكني", location: "جدة التاريخية", price: "12 مليون ريال", description: "العمارة السعودية التقليدية تلتقي بالحياة العصرية الفاخرة", image: aboutHeader },
    { id: 3, name: "عقارات الحدائق", category: "سكني", location: "وسط الرياض", price: "15.4 مليون ريال", description: "مجمعات عائلية واسعة مع حدائق خاصة ومسابح", image: backgroundImage3 },
    { id: 4, name: "منازل عصرية", category: "سكني", location: "الرياض الجديدة", price: "7.1 مليون ريال", description: "تصميم معاصر مع تكامل تقنيات المنزل الذكي", image: backgroundImage1 },
    { id: 5, name: "مساكن التنفيذيين", category: "سكني", location: "الحي الدبلوماسي", price: "19.5 مليون ريال", description: "منازل راقية مصممة للمهنيين المميزين", image: brandValues1 },
    
    // Commercial Projects
    { id: 6, name: "مركز الأعمال المركزي", category: "تجاري", location: "طريق الملك فهد", price: "46.9 مليون ريال", description: "مساحات مكتبية من الدرجة الأولى مع بنية تحتية متطورة", image: backgroundImage2 },
    { id: 7, name: "مركز الابتكار", category: "تجاري", location: "منطقة كاوست", price: "32.6 مليون ريال", description: "مجمع تجاري يركز على التقنية مع مساحات عمل مرنة", image: stats77097 },
    { id: 8, name: "ساحة التجزئة", category: "تجاري", location: "شارع التحلية", price: "57.4 مليون ريال", description: "وجهة تسوق وطعام راقية", image: backgroundImage3 },
    { id: 9, name: "أبراج الشركات", category: "تجاري", location: "الحي المالي", price: "96.7 مليون ريال", description: "برجان توأم يوفران عناوين تجارية مرموقة", image: stats130000 },
    { id: 10, name: "مجمع الاستخدام المختلط", category: "تجاري", location: "وسط جدة", price: "70.9 مليون ريال", description: "تطوير تجاري وسكني متكامل", image: backgroundImage1 },
    
    // Luxury Projects
    { id: 11, name: "برج كالما", category: "فاخر", location: "حي الملك عبدالله المالي", price: "169.5 مليون ريال", description: "برج سكني أيقوني يحدد أفق المدينة", image: backgroundImage2 },
    { id: 12, name: "مجموعة البنتهاوس", category: "فاخر", location: "سماء الرياض", price: "31.9 مليون ريال", description: "بنتهاوس فائق الفخامة مع إطلالات بانورامية على المدينة", image: aboutHeader },
    { id: 13, name: "مساكن الواجهة البحرية", category: "فاخر", location: "ساحل البحر الأحمر", price: "25.5 مليون ريال", description: "عقارات حصرية على الشاطئ مع وصول خاص", image: backgroundImage3 },
    { id: 14, name: "ملاذ الصحراء", category: "فاخر", location: "أطراف الرياض", price: "14.6 مليون ريال", description: "حياة فاخرة على طراز المنتجع في محيط طبيعي", image: backgroundImage1 },
    { id: 15, name: "فلل السماء", category: "فاخر", location: "حي العليا", price: "27 مليون ريال", description: "حياة فاخرة مرتفعة مع مصاعد خاصة", image: brandValues1 },
    
    // Community Projects
    { id: 16, name: "مجتمع العائلة", category: "مجتمعي", location: "النخيل", price: "7.9 مليون ريال", description: "حي متكامل مع مدارس وحدائق", image: stats77097 },
    { id: 17, name: "سكن كبار السن", category: "مجتمعي", location: "الملقا", price: "6.8 مليون ريال", description: "منازل مريحة ومتاحة للسكان الناضجين", image: stats130000 },
    { id: 18, name: "سكن الطلاب", category: "مجتمعي", location: "الحي الجامعي", price: "3.6 مليون ريال", description: "أماكن إقامة حديثة بالقرب من الجامعات الكبرى", image: backgroundImage2 },
    { id: 19, name: "قرية العافية", category: "مجتمعي", location: "الرياض الخضراء", price: "10.1 مليون ريال", description: "مجتمع يركز على الصحة مع مرافق لياقة بدنية", image: aboutHeader },
    { id: 20, name: "الحي الثقافي", category: "مجتمعي", location: "جدة التاريخية", price: "12.8 مليون ريال", description: "تطوير سكني يركز على الفنون والثقافة", image: backgroundImage3 },
    
    // Sustainable Projects
    { id: 21, name: "المنازل الخضراء", category: "مستدام", location: "بالقرب من نيوم", price: "17.3 مليون ريال", description: "مساكن صديقة للبيئة مع تكامل الطاقة الشمسية", image: backgroundImage1 },
    { id: 22, name: "المدينة الذكية المرحلة الأولى", category: "مستدام", location: "مدينة المستقبل", price: "14.3 مليون ريال", description: "مجتمع مستدام متكامل التقنية", image: brandValues1 },
    { id: 23, name: "مجمع محايد الكربون", category: "مستدام", location: "حي الأعمال الأخضر", price: "82.9 مليون ريال", description: "تطوير تجاري بطاقة صفرية صافية", image: stats77097 },
    { id: 24, name: "مركز الطاقة المتجددة", category: "مستدام", location: "وادي الطاقة الشمسية", price: "62.6 مليون ريال", description: "تطوير مختلط الاستخدام مكتفي ذاتياً", image: stats130000 },
    { id: 25, name: "قرية حفظ المياه", category: "مستدام", location: "أطراف الصحراء", price: "10.9 مليون ريال", description: "مشروع سكني مبتكر لإدارة المياه", image: backgroundImage2 },
    
    // Additional Premium Projects
    { id: 26, name: "التطوير الراقي الأول", category: "فاخر", location: "شمال الرياض", price: "8.2 مليون ريال", description: "مشروع سكني حصري مع مرافق فاخرة", image: aboutHeader },
    { id: 27, name: "التطوير الراقي الثاني", category: "تجاري", location: "جنوب جدة", price: "15.7 مليون ريال", description: "مشروع تجاري حصري مع مرافق فاخرة", image: backgroundImage3 },
    { id: 28, name: "التطوير الراقي الثالث", category: "مجتمعي", location: "شرق الدمام", price: "6.4 مليون ريال", description: "مشروع مختلط الاستخدام حصري مع مرافق فاخرة", image: backgroundImage1 }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'الكل' || project.category === selectedCategory
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="projects-page" dir="rtl">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              مشاريعنا
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              اكتشف مجموعة متنوعة من المشاريع العقارية المتميزة
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          {/* Search and Filter Section */}
          <motion.div 
            className="filter-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="filter-title">البحث والتصفية</h2>
            
            {/* Search Input */}
            <div className="search-container">
              <input
                type="text"
                placeholder="ابحث عن المشاريع بالاسم أو الموقع..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>

            {/* Category Filter */}
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="results-count">
              عرض {filteredProjects.length} من أصل {projects.length} مشروع
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="projects-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                  <div className="project-overlay">
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-location">{project.location}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-footer">
                    <span className="project-price">{project.price}</span>
                    <button className="project-button">عرض التفاصيل</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="projects-stats"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">28</div>
                <div className="stat-label">مشروع متميز</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2</div>
                <div className="stat-label">مدينة رئيسية</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2000+</div>
                <div className="stat-label">عائلة سعيدة</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">معيار واحد</div>
                <div className="stat-label">للتميز</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}