import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/navbar.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from '@/config/routes.config'

// English Pages
import EnglishHome from './pages/english/Home/Home'
const AboutImproved = lazy(() => import('./pages/english/About/AboutImproved'))
const News = lazy(() => import('./pages/english/News/News'))
const ProjectsPage = lazy(() => import('./pages/english/Projects/ProjectsPage'))
const ProjectPage = lazy(() => import('./pages/english/Projects/ProjectDetails'))
const Register = lazy(() => import('./pages/english/Register/Register'))
const Contact = lazy(() => import('./pages/english/Contact/Contact'))

// Arabic Pages
const ArabicHome = lazy(() => import('./pages/arabic/الرئيسية/الرئيسية'))
const ArabicAbout = lazy(() => import('./pages/arabic/عن كالما/عن كالما'))
const ArabicProjects = lazy(() => import('./pages/arabic/المشاريع/ProjectsDisplay'))
const ArabicContact = lazy(() => import('./pages/arabic/تواصل معنا/تواصل معنا'))
const ArabicNews = lazy(() => import('./pages/arabic/الأخبار/الأخبار'))
const ArabicRegister = lazy(() => import('./pages/arabic/التسجيل/التسجيل'))
const ArabicCommercials = lazy(() => import('./pages/arabic/المشاريع/تجارية'))
const ArabicResidential = lazy(() => import('./pages/arabic/المشاريع/سكنية'))
const ArabicCalmaTower = lazy(() => import('./pages/arabic/المشاريع/CalmaTower'))

// English Categories
const ProjectsVilla = lazy(() => import('./pages/english/Projects/categories/Villa'))
const ProjectsFloor = lazy(() => import('./pages/english/Projects/categories/Floor'))
const ProjectsTownHouse = lazy(() => import('./pages/english/Projects/categories/TownHouse'))
const ProjectsOffice = lazy(() => import('./pages/english/Projects/categories/Office'))

// Arabic Categories
const ArabicProjectsVilla = lazy(() => import('./pages/arabic/المشاريع/categories/Villa'))
const ArabicProjectsFloor = lazy(() => import('./pages/arabic/المشاريع/categories/Floor'))
const ArabicProjectsTownHouse = lazy(() => import('./pages/arabic/المشاريع/categories/TownHouse'))
const ArabicProjectsOffice = lazy(() => import('./pages/arabic/المشاريع/categories/Office'))

// Test and System Components
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import AppLayout from '@/layouts/AppLayout'

import { LoadingScreen } from '@/components/system/LoadingScreen'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider defaultLanguage="en">
          <SplashProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route element={<AppLayout />}>
                  {/* English Routes (from config) */}
                  <Route path={routes.home.en} element={<EnglishHome />} />
                  <Route path={routes.about.en} element={<AboutImproved />} />
                  <Route path={routes.news.en} element={<News />} />
                  <Route path={routes.projects.en} element={<ProjectsPage />} />
                  <Route path={routes.projectDynamic.en} element={<ProjectPage />} />
                  <Route path={routes.projectCategories.villa.en} element={<ProjectsVilla />} />
                  <Route path={routes.projectCategories.floor.en} element={<ProjectsFloor />} />
                  <Route path={routes.projectCategories.townhouse.en} element={<ProjectsTownHouse />} />
                  <Route path={routes.projectCategories.office.en} element={<ProjectsOffice />} />
                  <Route path={routes.contact.en} element={<Contact />} />

                  {/* Arabic Routes (from config) */}
                  <Route path={routes.home.ar} element={<ArabicHome />} />
                  <Route path={routes.about.arNative} element={<ArabicAbout />} />
                  <Route path={routes.projects.arNative} element={<ArabicProjects />} />
                  <Route path={routes.contact.arNative} element={<ArabicContact />} />
                  {/* Arabic slug aliases for improved usability */}
                  <Route path={routes.about.ar} element={<ArabicAbout />} />
                  <Route path={routes.projects.ar} element={<ArabicProjects />} />
                  <Route path={routes.contact.ar} element={<ArabicContact />} />
                  <Route path={routes.news.ar} element={<ArabicNews />} />
                  <Route path={routes.register.arNative} element={<ArabicRegister />} />
                  <Route path={routes.register.ar} element={<ArabicRegister />} />
                  {/* Arabic projects subroutes mirroring EN */}
                  <Route path={routes.projectCategories.commercials.ar} element={<ArabicCommercials />} />
                  <Route path={routes.projectCategories.residential.ar} element={<ArabicResidential />} />
                  <Route path={routes.projectCategories.calmaTower.ar} element={<ArabicCalmaTower />} />
                  <Route path={routes.projectCategories.villa.ar} element={<ArabicProjectsVilla />} />
                  <Route path={routes.projectCategories.floor.ar} element={<ArabicProjectsFloor />} />
                  <Route path={routes.projectCategories.townhouse.ar} element={<ArabicProjectsTownHouse />} />
                  <Route path={routes.projectCategories.office.ar} element={<ArabicProjectsOffice />} />

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
