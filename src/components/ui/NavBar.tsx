import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import logoC from '@/assets/Logos/BRANDMARK_01-p-2000.png'
import { Button } from '@/components/ui/button'
import { Menu, Globe, X, ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { useSplash } from '@/components/system/SplashProvider'
import { useLanguage } from '@/contexts/LanguageContext'
import { createMagneticEffect } from '@/utils/helpers'

export default function NavBar() {
  const navigate = useNavigate()
  const { showSplash } = useSplash()
  const { language, toggleLanguage, t } = useLanguage()
  const isArabic = language === 'ar'
  const [isTransparent, setIsTransparent] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  // Keep navbar always visible to avoid layout glitches
  const [isHidden] = useState(false)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })

  // Animation refs
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let ticking = false
    
    const computeTransparency = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const firstSection = document.getElementById('panorama') || document.querySelector('.hero') as HTMLElement | null
          const header = document.querySelector('header.glass-nav') as HTMLElement | null
          
          if (!firstSection) {
            setIsTransparent(false)
            ticking = false
            return
          }
          
          const sectionTop = firstSection.offsetTop
          const sectionHeight = firstSection.offsetHeight
          const scrollY = window.scrollY
          const headerHeight = header?.offsetHeight ?? 0
          const sectionBottom = sectionTop + sectionHeight
          
          // Keep header transparent only while overlapping the first section (hero/panorama)
          // Add a small buffer for smoother transition
          const overlappingFirst = scrollY < (sectionBottom - headerHeight - 20)
          setIsTransparent(overlappingFirst)
          ticking = false
        })
        ticking = true
      }
    }

    computeTransparency()
    window.addEventListener('scroll', computeTransparency, { passive: true })
    window.addEventListener('resize', computeTransparency, { passive: true })
    return () => {
      window.removeEventListener('scroll', computeTransparency)
      window.removeEventListener('resize', computeTransparency)
    }
  }, [])

  // Initialize magnetic effects
  useEffect(() => {
    createMagneticEffect('.action-button', 0.3)
  }, [])

  // Navbar visibility is controlled via CSS classes

  // Transparency changes: toggle CSS classes synchronously
  useEffect(() => {
    navRef.current?.classList.toggle('nav-transparent', isTransparent)
    navRef.current?.classList.toggle('nav-solid', !isTransparent)
  }, [isTransparent])

  // Removed hide-on-scroll behavior to ensure consistent, predictable navbar visibility
  // Focus trap setup on drawer open
  useEffect(() => {
    if (!drawerOpen) return
    const panel = document.querySelector('.mobile-menu .panel') as HTMLDivElement | null
    if (!panel) return
    const focusables = panel.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const first = focusables[0]
    if (first) first.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setDrawerOpen(false)
      }
    }
    panel.addEventListener('keydown', onKey as any)
    return () => {
      panel.removeEventListener('keydown', onKey as any)
    }
  }, [drawerOpen])

  // Click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (dropdownOpen && !target.closest('.dropdown-portal') && !target.closest('.dropdown-trigger')) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // Function to close dropdown menu
  const closeDropdown = () => {
    setDropdownOpen(false)
  }
  const closeDrawer = () => {
    setDrawerOpen(false)
    const trigger = document.querySelector('.burger-button') as HTMLButtonElement | null
    trigger?.focus()
  }

  // Function to toggle dropdown and calculate position with animation
  const toggleDropdown = (event: React.MouseEvent) => {
    event.preventDefault()
    if (!dropdownOpen) {
      const triggerElement = dropdownTriggerRef.current || (event.currentTarget as HTMLElement)
      const rect = triggerElement.getBoundingClientRect()
      const navRect = navRef.current?.getBoundingClientRect()
      
      // Position dropdown centered under the trigger with a compact width
      const baseWidth = 300
      const centeredLeftRaw = rect.left + rect.width / 2 - baseWidth / 2
      const centeredLeft = Math.max(16, Math.min(centeredLeftRaw, (window.innerWidth - baseWidth - 16)))
      setDropdownPosition({
        top: (navRect?.bottom || rect.bottom) - 2,
        left: Math.max(centeredLeft, 16),
        width: baseWidth
      })
      setDropdownOpen(true)
      
      // Dropdown appears immediately without JS animations
    } else {
      setDropdownOpen(false)
    }
  }

  // Enhanced navigation function that closes dropdown
  const handleDropdownNavigation = async (path: string) => {
    closeDropdown()
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
    showSplash()
    navigate(path)
  }

  // Translation fallback: if key returns itself, use provided EN/AR text
  const tr = (key: string, en: string, ar: string) => {
    const val = t(key)
    return val === key ? (isArabic ? ar : en) : val
  }

  return (
    <>
    <header
      ref={navRef}
      className={`glass-nav ${isTransparent ? 'nav-transparent' : 'nav-solid'} ${isHidden ? 'nav-hidden' : 'nav-visible'}`}
      role="navigation"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div
        className="section-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Left-aligned: Logo */}
        <Link
          ref={logoRef}
          to={isArabic ? '/ar' : '/'}
          className="logo"
          aria-label="Calma Home"
        >
          <img
            src={logoC}
            alt={isArabic ? 'كالما شعار' : 'Calma Logo'}
            className="logo-image"
          />
          <span className="logo-text">{isArabic ? 'كالما' : 'Calma'}</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav ref={linksRef} className="nav-links" aria-label={tr('common.menu', 'Primary navigation', 'التنقل الرئيسي')} style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'nowrap' }}>
          <button 
            className="nav-link" 
            onClick={() => { 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              showSplash(); 
              navigate(isArabic ? '/ar' : '/'); 
            }}
          >
            {tr('nav.home', 'Home', 'الرئيسية')}
          </button>
          
          <button 
            className="nav-link" 
            onClick={() => { 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              showSplash(); 
              navigate(isArabic ? '/ar/about' : '/about'); 
            }}
          >
            {tr('nav.about', 'About', 'عن كالما')}
          </button>
          
          <button 
            ref={dropdownTriggerRef}
            className="dropdown-trigger nav-link" 
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span>{tr('nav.projects', 'Projects', 'المشاريع')}</span>
            <ChevronDown 
              className={`dropdown-icon ${dropdownOpen ? 'rotated' : ''}`}
              size={16}
            />
          </button>
          
          <button 
            className="nav-link" 
            onClick={() => { 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              showSplash(); 
              navigate(isArabic ? '/ar/news' : '/news'); 
            }}
          >
            {tr('nav.news', 'News', 'الأخبار')}
          </button>

          {/* Always show Contact (English routes to register for now) */}
          <button 
            className="nav-link" 
            onClick={() => { 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              showSplash(); 
              navigate(isArabic ? '/ar/contact' : '/contact'); 
            }}
          >
            {tr('nav.contact', 'Contact', 'تواصل')}
          </button>
        </nav>

        {/* Right-aligned: Actions (phone, WhatsApp, register, language, burger) */}
        <div ref={actionsRef} className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12, justifySelf: 'end' }}>
          <Button
            variant="ghost"
            size="icon"
            aria-label={tr('actions.call', 'Call', 'اتصل')}
            title={tr('actions.call', 'Call us', 'اتصل بنا')}
            onClick={() => {
              const confirmMsg = isArabic ? 'هل تريد الاتصال الآن؟' : 'Do you want to dial now?'
              if (window.confirm(confirmMsg)) {
                window.location.href = 'tel:+966920006553'
              }
            }}
          >
            <Phone className="icon" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={tr('actions.whatsapp', 'WhatsApp', 'واتساب')}
            title={tr('actions.whatsapp', 'WhatsApp', 'واتساب')}
            onClick={() => {
              const confirmMsg = isArabic ? 'فتح محادثة واتساب؟' : 'Open WhatsApp chat?'
              if (window.confirm(confirmMsg)) {
                window.open('https://wa.me/966920006553', '_blank')
              }
            }}
          >
            <MessageCircle className="icon" />
          </Button>

          <Button className="rounded-full register-button" onClick={() => { showSplash(); navigate(isArabic ? '/ar/register' : '/register') }}>
            {tr('actions.register', 'Register Your Interest', 'سجل اهتمامك')}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="language-toggle"
            onClick={() => { 
              showSplash(); 
              toggleLanguage();
            }}
            aria-label={tr('language.switchTo', 'Switch language', 'تبديل اللغة')}
            title={tr('language.switchTo', 'Switch language', 'تبديل اللغة')}
          >
            <Globe className="icon" style={{ width: 16, height: 16, marginRight: 4 }} />
            {tr('language.switch', 'Arabic', 'English')}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="burger-button"
            aria-label={t('actions.openMenu')}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            title={t('actions.openMenu')}
          >
            <Menu className="icon" />
          </Button>
        </div>
      </div>
    </header>
    {/* Enhanced Mobile Menu */}
    {drawerOpen && (
      <div 
        className={`mobile-menu ${drawerOpen ? 'open' : ''}`} 
        onClick={closeDrawer} 
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div
          className="panel"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={isArabic ? 'قائمة التنقل' : 'Navigation menu'}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault()
              setDrawerOpen(false)
            } else if (e.key === 'Tab') {
              const panel = (e.currentTarget as HTMLDivElement)
              const focusables = panel.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])')
              const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)
              if (!list.length) return
              const first = list[0]
              const last = list[list.length - 1]
              const active = document.activeElement as HTMLElement
              if (e.shiftKey) {
                if (active === first || !panel.contains(active)) {
                  e.preventDefault()
                  last.focus()
                }
              } else {
                if (active === last) {
                  e.preventDefault()
                  first.focus()
                }
              }
            }
          }}
        >
          {/* Header */}
          <div className="panel-header">
            <div className="logo">
              <img src={logoC} alt="Calma" className="logo-image" />
              <span className="logo-text">{isArabic ? 'كالما' : 'Calma'}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="close-button"
              aria-label={t('actions.closeMenu')} 
              onClick={closeDrawer}
            >
              <X size={24} />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="panel-links">
            <button 
              className="nav-link" 
              onClick={() => { 
                setDrawerOpen(false); 
                showSplash(); 
                navigate(isArabic ? '/ar' : '/'); 
              }}
            >
              {t('nav.home')}
            </button>
            
            <button 
              className="nav-link" 
              onClick={() => { 
                setDrawerOpen(false); 
                showSplash(); 
                navigate(isArabic ? '/ar/about' : '/about'); 
              }}
            >
              {t('nav.about')}
            </button>
            
            <div className="mobile-dropdown-section">
              <div className="mobile-dropdown-header">{t('nav.projects')}</div>
              <button 
                className="nav-link" 
                onClick={() => { 
                  setDrawerOpen(false); 
                  showSplash(); 
                  navigate(isArabic ? '/ar/projects' : '/projects'); 
                }}
              >
                {t('nav.allProjects')}
              </button>
              {!isArabic && (
                <>
                  <button 
                     className="nav-link" 
                     onClick={() => { 
                       setDrawerOpen(false); 
                       showSplash(); 
                       navigate('/projects/commercials'); 
                     }}
                   >
                     {t('nav.commercials')}
                   </button>
                   <button 
                     className="nav-link" 
                     onClick={() => { 
                       setDrawerOpen(false); 
                       showSplash(); 
                       navigate('/projects/residential'); 
                     }}
                   >
                     {t('nav.residential')}
                   </button>
                   <button 
                     className="nav-link" 
                     onClick={() => { 
                       setDrawerOpen(false); 
                       showSplash(); 
                       navigate('/projects/calma-tower'); 
                     }}
                   >
                     {t('nav.calmaTower')}
                   </button>
                 </>
               )}
             </div>
             
            <button 
              className="nav-link" 
              onClick={() => { 
                setDrawerOpen(false); 
                showSplash(); 
                navigate(isArabic ? '/ar/news' : '/news'); 
              }}
            >
               {t('nav.news')}
             </button>
             
             <button 
               className="nav-link" 
               onClick={() => { 
                 setDrawerOpen(false); 
                 showSplash(); 
                 navigate(isArabic ? '/ar/contact' : '/contact'); 
               }}
             >
                {t('nav.contact')}
              </button>
           </nav>

          {/* Actions */}
          <div className="panel-actions">
            <div className="mobile-action-buttons" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label={tr('actions.call', 'Call', 'اتصل')}
                title={tr('actions.call', 'Call us', 'اتصل بنا')}
                onClick={() => (window.location.href = 'tel:+966920006553')}
              >
                <Phone className="icon" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="WhatsApp"
                title="WhatsApp"
                onClick={() => window.open('https://wa.me/966920006553', '_blank')}
              >
                <MessageCircle className="icon" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="language-toggle"
                onClick={() => {
                  setDrawerOpen(false);
                  showSplash();
                  setTimeout(() => toggleLanguage(), 100);
                }}
                aria-label={tr('language.switchTo', 'Switch language', 'تبديل اللغة')}
              >
                <Globe size={16} />
                {t('language.switch')}
              </Button>
            </div>
            <Button 
              className="register-button" 
              onClick={() => { 
                setDrawerOpen(false); 
                showSplash(); 
                navigate('/register');
              }}
            >
              {isArabic ? 'طلب استفسار' : 'Enquire'}
            </Button>
          </div>
        </div>
      </div>
    )}
     
     {/* Enhanced Dropdown Menu */}
    {dropdownOpen && createPortal(
      <div 
        ref={dropdownRef}
        className="dropdown-portal"
        style={{
          position: 'fixed',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          zIndex: 9999,
          minWidth: `${dropdownPosition.width}px`,
          width: `${dropdownPosition.width}px`,
          background: '#FFFFFF',
          border: '1px solid rgba(26, 26, 26, 0.12)',
          borderRadius: '10px',
          padding: '6px 0',
          boxShadow: '0 12px 24px rgba(7, 30, 31, 0.12)',
          overflow: 'hidden',
          opacity: 1,
          transform: 'none'
        }}
      >
        <nav role="menu" aria-label={tr('nav.projects', 'Projects', 'المشاريع')}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <button type="button" className="dropdown-item" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', fontSize: 14 }} onClick={() => handleDropdownNavigation(isArabic ? '/ar/projects' : '/projects')}>
                {tr('nav.allProjects', 'All Projects', 'كل المشاريع')}
              </button>
            </li>
            <li style={{ borderTop: '1px solid var(--color-border-light)' }}>
              <div style={{ fontSize: 12, opacity: 0.7, padding: '6px 12px' }}>{isArabic ? 'النوع' : 'Unit Types'}</div>
            </li>
            <li>
              <button type="button" className="dropdown-item" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 14 }} onClick={() => handleDropdownNavigation(isArabic ? '/ar/projects/calma-tower' : '/projects/villa')}>
                {isArabic ? 'فلل' : 'Villa'}
              </button>
            </li>
            <li>
              <button type="button" className="dropdown-item" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 14 }} onClick={() => handleDropdownNavigation(isArabic ? '/ar/projects/floor' : '/projects/floor')}>
                {isArabic ? 'أدوار' : 'Floor'}
              </button>
            </li>
            <li>
              <button type="button" className="dropdown-item" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 14 }} onClick={() => handleDropdownNavigation(isArabic ? '/ar/projects/townhouse' : '/projects/townhouse')}>
                {isArabic ? 'تاون هاوس' : 'Town House'}
              </button>
            </li>
            <li>
              <button type="button" className="dropdown-item" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 14 }} onClick={() => handleDropdownNavigation(isArabic ? '/ar/projects/office' : '/projects/office')}>
                {isArabic ? 'مكتبي' : 'Office'}
              </button>
            </li>
          </ul>
        </nav>
      </div>,
      document.body
    )}
    </>
  )
}
