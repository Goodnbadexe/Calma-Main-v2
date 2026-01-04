/* eslint-disable react/jsx-no-undef */
'use client'
import './globals.css'
import '@/index.css'
import AppLayout from '@/layouts/AppLayout'
import { HelmetProvider } from 'react-helmet-async'
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <HelmetProvider>
          <LanguageProvider defaultLanguage="en">
            <SplashProvider>
              <AppLayout>{children}</AppLayout>
            </SplashProvider>
          </LanguageProvider>
        </HelmetProvider>
      </body>
    </html>
  )
}
