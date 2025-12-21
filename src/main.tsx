import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/navbar.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// English Pages
import EnglishHome from './pages/english/Home/Home'
const AboutImproved = lazy(() => import('./pages/english/About/AboutImproved'))
const News = lazy(() => import('./pages/english/News/News'))
const ProjectsPage = lazy(() => import('./pages/english/Projects/ProjectsPage'))
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const Register = lazy(() => import('./pages/english/Register/Register'))
const Contact = lazy(() => import('./pages/english/Contact/Contact'))

// Arabic Pages
const ArabicHome = lazy(() => import('./pages/arabic/الرئيسية/الرئيسية'))
const ArabicAbout = lazy(() => import('./pages/arabic/عن كالما/عن كالما'))
const ArabicProjects = lazy(() => import('./pages/arabic/المشاريع/عرض المشاريع'))
const ArabicContact = lazy(() => import('./pages/arabic/تواصل معنا/تواصل معنا'))
const ArabicNews = lazy(() => import('./pages/arabic/الأخبار/الأخبار'))
const ArabicRegister = lazy(() => import('./pages/arabic/التسجيل/التسجيل'))
const ArabicCommercials = lazy(() => import('./pages/arabic/المشاريع/تجارية'))
const ArabicResidential = lazy(() => import('./pages/arabic/المشاريع/سكنية'))
const ArabicCalmaTower = lazy(() => import('./pages/arabic/المشاريع/برج كالما'))
const ProjectsVilla = lazy(() => import('./pages/english/Projects/categories/Villa'))
const ProjectsFloor = lazy(() => import('./pages/english/Projects/categories/Floor'))
const ProjectsTownHouse = lazy(() => import('./pages/english/Projects/categories/TownHouse'))
const ProjectsOffice = lazy(() => import('./pages/english/Projects/categories/Office'))

// Test and System Components
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import AppLayout from '@/layouts/AppLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider defaultLanguage="en">
          <SplashProvider>
            <Suspense fallback={
              <div className="page-loading" aria-busy="true" aria-live="polite">
                <div className="skeleton-page">
                  <div className="skeleton-bar" />
                  <div className="skeleton-grid">
                    <div className="skeleton-card" />
                    <div className="skeleton-card" />
                    <div className="skeleton-card" />
                  </div>
                </div>
              </div>
            }>
              <Routes>
                <Route element={<AppLayout />}>
                  {/* English Routes */}
                  <Route path="/" element={<EnglishHome />} />
                  <Route path="/about" element={<AboutImproved />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectPage />} />
                  <Route path="/projects/villa" element={<ProjectsVilla />} />
                  <Route path="/projects/floor" element={<ProjectsFloor />} />
                  <Route path="/projects/townhouse" element={<ProjectsTownHouse />} />
                  <Route path="/projects/office" element={<ProjectsOffice />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/register" element={<Register />} />

                  {/* Arabic Routes */}
                  <Route path="/ar" element={<ArabicHome />} />
                  <Route path="/ar/عن كالـما" element={<ArabicAbout />} />
                  <Route path="/ar/المشاريع" element={<ArabicProjects />} />
                  <Route path="/ar/تواصل معنا" element={<ArabicContact />} />
                  {/* Arabic slug aliases for improved usability */}
                  <Route path="/ar/about" element={<ArabicAbout />} />
                  <Route path="/ar/projects" element={<ArabicProjects />} />
                  <Route path="/ar/contact" element={<ArabicContact />} />
                  <Route path="/ar/news" element={<ArabicNews />} />
                  <Route path="/ar/التسجيل" element={<ArabicRegister />} />
                  <Route path="/ar/register" element={<ArabicRegister />} />
                  {/* Arabic projects subroutes mirroring EN */}
                  <Route path="/ar/projects/commercials" element={<ArabicCommercials />} />
                  <Route path="/ar/projects/residential" element={<ArabicResidential />} />
                  <Route path="/ar/projects/calma-tower" element={<ArabicCalmaTower />} />
                  <Route path="/ar/projects/villa" element={<ProjectsVilla />} />
                  <Route path="/ar/projects/floor" element={<ProjectsFloor />} />
                  <Route path="/ar/projects/townhouse" element={<ProjectsTownHouse />} />
                  <Route path="/ar/projects/office" element={<ProjectsOffice />} />

                  {/* Test Routes */}
                </Route>
              </Routes>
            </Suspense>
          </SplashProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
