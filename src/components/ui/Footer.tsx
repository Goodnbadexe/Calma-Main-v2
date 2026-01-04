import logoC from '@/assets/Logos/BRANDMARK_01-p-2000.png'
import { getImgSrc } from '@/utils/getImgSrc'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRegisterOverlay } from '@/components/register/RegisterOverlayProvider'
import { useState } from 'react'

export default function Footer() {
  const { t, language } = useLanguage()
  const overlay = useRegisterOverlay()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const getPath = (path: string) => {
    if (language === 'ar') {
      const map: Record<string, string> = {
        '/': '/ar/home',
        '/about': '/ar/about',
        '/projects': '/ar/projects',
        '/news': '/ar/news',
        '/register': '/ar/register',
      }
      return map[path] ?? path
    }
    const map: Record<string, string> = {
      '/': '/en/home',
      '/about': '/en/about',
      '/projects': '/en/projects',
      '/news': '/en/news',
      '/register': '/en/register',
    }
    return map[path] ?? path
  }

  return (
    <footer className="site-footer" aria-label="Footer" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-brand">
            <img src={getImgSrc(logoC)} alt="Calma" className="footer-logo" />
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
            <li><Link href={getPath('/')}>{t('nav.home')}</Link></li>
            <li><Link href={getPath('/about')}>{t('nav.about')}</Link></li>
            <li><Link href={getPath('/projects')}>{t('nav.projects')}</Link></li>
            <li><Link href={getPath('/news')}>{t('nav.news')}</Link></li>
            <li><Link href={getPath('/register')}>{t('nav.contact')}</Link></li>
          </ul>
        </nav>

        <div className="footer-col">
          <div className="footer-heading">{t('footer.connect')}</div>
          <div className="footer-social">
            <a href="https://facebook.com/calmasa" aria-label="Facebook" className="footer-icon" target="_blank" rel="noreferrer">
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a href="https://instagram.com/calmasa" aria-label="Instagram" className="footer-icon" target="_blank" rel="noreferrer">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="https://www.linkedin.com/company/calmasa" aria-label="LinkedIn" className="footer-icon" target="_blank" rel="noreferrer">
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a href="https://x.com/calmasa" aria-label="X" className="footer-icon" target="_blank" rel="noreferrer">
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
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault()
                const valid = /\S+@\S+\.\S+/.test(email)
                if (!valid) {
                  setStatus('error')
                  return
                }
                setStatus('success')
              }}
            >
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="newsletter-input" 
                aria-label="Email for newsletter"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
              />
              <button type="submit" className="newsletter-button" aria-label="Subscribe">
                {language === 'ar' ? <ArrowRight size={18} className="rotate-180" /> : <ArrowRight size={18} />}
              </button>
            </form>
            {status === 'success' && (
              <div className="footer-text" style={{ fontSize: 12, marginTop: 8 }}>{t('footer.subscribeSuccess')}</div>
            )}
            {status === 'error' && (
              <div className="footer-text" style={{ fontSize: 12, marginTop: 8 }}>{t('footer.subscribeInvalid')}</div>
            )}
          </div>
        </div>
      </div>
      
      
      
      <div className="footer-bottom">
        <div className="footer-note">© {new Date().getFullYear()} {t('footer.rights')}</div>
        <div className="footer-legal">
          <Link href={getPath('/privacy')}>{t('footer.privacy')}</Link>
          <Link href={getPath('/terms')}>{t('footer.terms')}</Link>
          <Link href={getPath('/cookies')}>{t('footer.cookies')}</Link>
        </div>
      </div>
    </footer>
  )
}
