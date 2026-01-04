import '@/index.css'
import type { AppProps } from 'next/app'
import { HelmetProvider } from 'react-helmet-async'
import { SplashProvider } from '@/components/system/SplashProvider'
import AppLayout from '@/layouts/AppLayout'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <LanguageProvider defaultLanguage="en">
        <SplashProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </SplashProvider>
      </LanguageProvider>
    </HelmetProvider>
  )
}
