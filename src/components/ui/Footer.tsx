import { Link } from 'react-router-dom'
import logoC from '@/assets/Logos/BRANDMARK_01-p-2000.png'
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t, language } = useLanguage()
  
  const getPath = (path: string) => {
    if (language === 'ar') {
      return path === '/' ? '/ar' : `/ar${path}`
    }
    return path
  }

  return (
    <footer className="site-footer" aria-label="Footer" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-brand">
            <img src={logoC} alt="Calma" className="footer-logo" />
            <div>
              <div className="footer-title">Calma</div>
              <div className="footer-subtitle">{t('footer.vision')}</div>
            </div>
          </div>
          <p className="footer-text">
            {t('footer.description')}
          </p>
        </div>
        
        <nav className="footer-col" aria-label="Footer navigation">
          <div className="footer-heading">{t('footer.explore')}</div>
          <ul className="footer-links">
            <li><Link to={getPath('/')}>{t('nav.home')}</Link></li>
            <li><Link to={getPath('/about')}>{t('nav.about')}</Link></li>
            <li><Link to={getPath('/projects')}>{t('nav.projects')}</Link></li>
            <li><Link to={getPath('/news')}>{t('nav.news')}</Link></li>
            <li><Link to={getPath('/register')}>{t('nav.contact')}</Link></li>
          </ul>
        </nav>

        <div className="footer-col">
          <div className="footer-heading">{t('footer.connect')}</div>
          <div className="footer-social">
            <a href="https://facebook.com" aria-label="Facebook" className="footer-icon" target="_blank" rel="noreferrer">
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="footer-icon" target="_blank" rel="noreferrer">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="footer-icon" target="_blank" rel="noreferrer">
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a href="https://x.com" aria-label="X" className="footer-icon" target="_blank" rel="noreferrer">
              <Twitter size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-heading">{t('footer.newsletter')}</div>
          <div className="footer-newsletter">
            <p className="footer-text" style={{ fontSize: '14px', marginBottom: '8px' }}>
              {t('footer.subscribeDesc')}
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="newsletter-input" 
                aria-label="Email for newsletter"
              />
              <button type="submit" className="newsletter-button" aria-label="Subscribe">
                {language === 'ar' ? <ArrowRight size={18} className="rotate-180" /> : <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-note">© {new Date().getFullYear()} {t('footer.rights')}</div>
        <div className="footer-legal">
          <Link to={getPath('/privacy')}>{t('footer.privacy')}</Link>
          <Link to={getPath('/terms')}>{t('footer.terms')}</Link>
          <Link to={getPath('/cookies')}>{t('footer.cookies')}</Link>
        </div>
      </div>
    </footer>
  )
}
