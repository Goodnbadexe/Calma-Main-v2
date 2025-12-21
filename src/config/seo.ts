export interface SEOConfig {
  title: string
  description: string
  keywords: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  section?: string
  tags?: string[]
}

export const seoConfig = {
  en: {
    home: {
      title: 'Premium Real Estate Development',
      description: 'CALMA creates exceptional luxury properties and communities in Saudi Arabia. Discover our premium residential, commercial, and mixed-use developments in Riyadh and Jeddah.',
      keywords: 'luxury real estate, premium properties, Saudi Arabia real estate, Riyadh properties, Jeddah developments, residential projects, commercial real estate, property investment',
      image: '/images/seo/home-en.jpg'
    },
    about: {
      title: 'About CALMA - Excellence in Real Estate',
      description: 'Learn about CALMA\'s vision, leadership, and commitment to creating exceptional spaces. Discover our journey in transforming Saudi Arabia\'s real estate landscape with innovative design and quality craftsmanship.',
      keywords: 'CALMA company, real estate developer, Saudi Arabia, company history, leadership team, vision mission, quality standards, architectural excellence',
      image: '/images/seo/about-en.jpg'
    },
    projects: {
      title: 'Our Projects - Exceptional Developments',
      description: 'Explore CALMA\'s portfolio of luxury residential, commercial, and mixed-use projects. From premium villas to iconic towers, discover developments that redefine modern living in Saudi Arabia.',
      keywords: 'CALMA projects, luxury developments, residential projects, commercial properties, mixed-use developments, Saudi Arabia real estate portfolio',
      image: '/images/seo/projects-en.jpg'
    },
    'projects/residential': {
      title: 'Residential Projects - Luxury Living Spaces',
      description: 'Discover CALMA\'s premium residential developments. From elegant villas to sophisticated apartments, our projects offer unparalleled luxury and modern amenities.',
      keywords: 'luxury homes, premium villas, residential apartments, family homes, gated communities, modern living, Saudi Arabia residential',
      image: '/images/seo/residential-en.jpg'
    },
    'projects/commercial': {
      title: 'Commercial Projects - Business Excellence',
      description: 'Explore CALMA\'s commercial real estate portfolio. Premium office spaces, retail centers, and mixed-use developments designed for business success.',
      keywords: 'commercial real estate, office spaces, retail centers, business districts, commercial developments, investment properties',
      image: '/images/seo/commercial-en.jpg'
    },
    news: {
      title: 'Latest News & Updates',
      description: 'Stay updated with CALMA\'s latest news, project announcements, industry insights, and company milestones. Get the latest updates from Saudi Arabia\'s premier real estate developer.',
      keywords: 'CALMA news, real estate news, project updates, company announcements, industry insights, Saudi Arabia property market',
      image: '/images/seo/news-en.jpg'
    },
    register: {
      title: 'Register Interest - Exclusive Opportunities',
      description: 'Register your interest in CALMA\'s exclusive properties and developments. Be the first to know about new launches, investment opportunities, and special offers.',
      keywords: 'property registration, investment opportunities, exclusive properties, early access, property alerts, real estate investment',
      image: '/images/seo/register-en.jpg'
    }
  },
  ar: {
    home: {
      title: 'تطوير عقاري فاخر',
      description: 'كالما تصنع عقارات ومجتمعات فاخرة استثنائية في المملكة العربية السعودية. اكتشف مشاريعنا السكنية والتجارية والمختلطة المتميزة في الرياض وجدة.',
      keywords: 'عقارات فاخرة, عقارات متميزة, عقارات السعودية, عقارات الرياض, تطويرات جدة, مشاريع سكنية, عقارات تجارية, استثمار عقاري',
      image: '/images/seo/home-ar.jpg'
    },
    about: {
      title: 'عن كالما - التميز في العقارات',
      description: 'تعرف على رؤية كالما وقيادتها والتزامها بإنشاء مساحات استثنائية. اكتشف رحلتنا في تحويل المشهد العقاري في المملكة العربية السعودية بالتصميم المبتكر والحرفية عالية الجودة.',
      keywords: 'شركة كالما, مطور عقاري, السعودية, تاريخ الشركة, فريق القيادة, الرؤية والرسالة, معايير الجودة, التميز المعماري',
      image: '/images/seo/about-ar.jpg'
    },
    projects: {
      title: 'مشاريعنا - تطويرات استثنائية',
      description: 'استكشف محفظة كالما من المشاريع السكنية والتجارية والمختلطة الفاخرة. من الفلل المتميزة إلى الأبراج الأيقونية، اكتشف التطويرات التي تعيد تعريف الحياة العصرية في السعودية.',
      keywords: 'مشاريع كالما, تطويرات فاخرة, مشاريع سكنية, عقارات تجارية, تطويرات مختلطة الاستخدام, محفظة عقارات السعودية',
      image: '/images/seo/projects-ar.jpg'
    },
    'projects/residential': {
      title: 'المشاريع السكنية - مساحات معيشة فاخرة',
      description: 'اكتشف التطويرات السكنية المتميزة من كالما. من الفلل الأنيقة إلى الشقق المتطورة، تقدم مشاريعنا رفاهية لا مثيل لها ووسائل راحة عصرية.',
      keywords: 'منازل فاخرة, فلل متميزة, شقق سكنية, منازل عائلية, مجتمعات مسورة, حياة عصرية, سكني السعودية',
      image: '/images/seo/residential-ar.jpg'
    },
    'projects/commercial': {
      title: 'المشاريع التجارية - تميز الأعمال',
      description: 'استكشف محفظة كالما العقارية التجارية. مساحات مكتبية متميزة ومراكز تجارية وتطويرات مختلطة الاستخدام مصممة لنجاح الأعمال.',
      keywords: 'عقارات تجارية, مساحات مكتبية, مراكز تجارية, أحياء أعمال, تطويرات تجارية, عقارات استثمارية',
      image: '/images/seo/commercial-ar.jpg'
    },
    news: {
      title: 'آخر الأخبار والتحديثات',
      description: 'ابق على اطلاع بآخر أخبار كالما وإعلانات المشاريع ورؤى الصناعة ومعالم الشركة. احصل على آخر التحديثات من المطور العقاري الرائد في السعودية.',
      keywords: 'أخبار كالما, أخبار عقارية, تحديثات المشاريع, إعلانات الشركة, رؤى الصناعة, سوق العقارات السعودي',
      image: '/images/seo/news-ar.jpg'
    },
    register: {
      title: 'تسجيل الاهتمام - فرص حصرية',
      description: 'سجل اهتمامك بعقارات وتطويرات كالما الحصرية. كن أول من يعلم بالإطلاقات الجديدة وفرص الاستثمار والعروض الخاصة.',
      keywords: 'تسجيل عقاري, فرص استثمارية, عقارات حصرية, وصول مبكر, تنبيهات عقارية, استثمار عقاري',
      image: '/images/seo/register-ar.jpg'
    }
  }
}

export function getSEOConfig(route: string, locale: 'en' | 'ar'): SEOConfig {
  const config = seoConfig[locale]
  
  // Clean route (remove leading slash and language prefix)
  const cleanRoute = route.replace(/^\/?(en|ar)?\/?/, '') || 'home'
  
  // Return specific config or fallback to home
  return config[cleanRoute as keyof typeof config] || config.home
}

// Generate sitemap data
export const sitemapRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/en', priority: 1.0, changefreq: 'weekly' },
  { path: '/ar', priority: 1.0, changefreq: 'weekly' },
  { path: '/en/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/ar/عن-كالما', priority: 0.9, changefreq: 'monthly' },
  { path: '/en/projects', priority: 0.9, changefreq: 'weekly' },
  { path: '/ar/المشاريع', priority: 0.9, changefreq: 'weekly' },
  { path: '/en/projects/residential', priority: 0.8, changefreq: 'weekly' },
  { path: '/en/projects/commercial', priority: 0.8, changefreq: 'weekly' },
  { path: '/en/news', priority: 0.7, changefreq: 'daily' },
  { path: '/ar/الأخبار', priority: 0.7, changefreq: 'daily' },
  { path: '/en/register', priority: 0.6, changefreq: 'monthly' },
  { path: '/ar/التسجيل', priority: 0.6, changefreq: 'monthly' }
]