import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  locale?: 'en' | 'ar'
  siteName?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  noIndex?: boolean
  canonical?: string
  alternates?: { hrefLang: string, href: string }[]
}

const defaultSEO = {
  siteName: 'CALMA',
  author: 'CALMA Real Estate',
  image: '/og-image.jpg',
  type: 'website' as const,
  locale: 'en' as const
}

export default function SEOHead({
  title,
  description,
  keywords,
  image = defaultSEO.image,
  url,
  type = defaultSEO.type,
  locale = defaultSEO.locale,
  siteName = defaultSEO.siteName,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noIndex = false,
  canonical,
  alternates
}: SEOHeadProps) {
  // Generate full title with site name
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Real Estate Development`
  
  // Default descriptions based on locale
  const defaultDescription = locale === 'ar' 
    ? 'كالما - شركة رائدة في تطوير العقارات الفاخرة في المملكة العربية السعودية. نصمم مساحات استثنائية ونبني مجتمعات المستقبل بأعلى معايير الجودة والتميز.'
    : 'CALMA - Leading luxury real estate development company in Saudi Arabia. Creating exceptional spaces and building tomorrow\'s communities with the highest standards of quality and excellence.'
  
  const finalDescription = description || defaultDescription
  
  // Generate keywords
  const defaultKeywords = locale === 'ar'
    ? 'كالما, عقارات فاخرة, تطوير عقاري, السعودية, الرياض, جدة, مشاريع سكنية, عقارات تجارية, استثمار عقاري'
    : 'CALMA, luxury real estate, property development, Saudi Arabia, Riyadh, Jeddah, residential projects, commercial properties, real estate investment'
  
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords
  
  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": url || (typeof window !== 'undefined' ? window.location.origin : ''),
    "logo": `${typeof window !== 'undefined' ? window.location.origin : ''}/logo.png`,
    "description": finalDescription,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressLocality": locale === 'ar' ? "الرياض" : "Riyadh"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    },
    "sameAs": [
      "https://twitter.com/calma_sa",
      "https://linkedin.com/company/calma-sa",
      "https://instagram.com/calma_sa"
    ]
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta name="language" content={locale === 'ar' ? 'Arabic' : 'English'} />
      <meta name="geo.region" content="SA" />
      <meta name="geo.placename" content={locale === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Hreflang alternates */}
      {alternates && alternates.map(a => (
        <link key={`${a.hrefLang}-${a.href}`} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale === 'ar' ? 'ar_SA' : 'en_US'} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title || siteName} />
      <meta name="twitter:site" content="@calma_sa" />
      <meta name="twitter:creator" content="@calma_sa" />
      
      {/* Additional Meta Tags for Mobile */}
      <meta name="theme-color" content="#D4AF37" />
      <meta name="msapplication-TileColor" content="#D4AF37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Language and Direction */}
      <html lang={locale === 'ar' ? 'ar' : 'en'} dir={locale === 'ar' ? 'rtl' : 'ltr'} />
    </Helmet>
  )
}
