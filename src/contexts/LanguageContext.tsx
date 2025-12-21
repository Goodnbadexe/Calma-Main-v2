import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toLanguagePath } from '@/utils/i18nPaths'

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.register': 'Register',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.menu': 'Menu',
    
    // Home page
    'home.hero.title': 'Luxury Real Estate',
    'home.hero.subtitle': 'Discover exceptional properties',
    
    // About page
    'about.title': 'About CALMA',
    'about.subtitle': 'Excellence in Real Estate',
    
    // Projects
    'projects.title': 'Our Projects',
    'projects.subtitle': 'Exceptional Developments',
    
    // Language switcher
    'language.switch': 'العربية',
    'language.current': 'English',
    'language.switchTo': 'Switch language',
    // Actions
    'actions.call': 'Call',
    'actions.whatsapp': 'WhatsApp',
    'actions.register': 'Register Your Interest',
    'actions.openMenu': 'Open menu',
    'actions.closeMenu': 'Close menu',
    // Projects menu
    'nav.allProjects': 'All Projects',
    'nav.commercials': 'Commercials',
    'nav.residential': 'Residential',
    'nav.calmaTower': 'Calma Tower',
    
    // Footer
    'footer.vision': 'Where vision takes shape',
    'footer.description': 'Premium real estate crafted with precision, sustainability, and timeless elegance.',
    'footer.explore': 'Explore',
    'footer.connect': 'Connect',
    'footer.newsletter': 'Newsletter',
    'footer.subscribeDesc': 'Subscribe to receive updates on our latest projects.',
    'footer.emailPlaceholder': 'Email address',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'Calma. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Settings'
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عن كالما',
    'nav.projects': 'المشاريع',
    'nav.news': 'الأخبار',
    'nav.contact': 'تواصل معنا',
    'nav.register': 'التسجيل',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.close': 'إغلاق',
    'common.open': 'فتح',
    'common.menu': 'القائمة',
    
    // Home page
    'home.hero.title': 'العقارات الفاخرة',
    'home.hero.subtitle': 'اكتشف العقارات الاستثنائية',
    
    // About page
    'about.title': 'عن كالما',
    'about.subtitle': 'التميز في العقارات',
    
    // Projects
    'projects.title': 'مشاريعنا',
    'projects.subtitle': 'تطويرات استثنائية',
    
    // Language switcher
    'language.switch': 'English',
    'language.current': 'العربية',
    'language.switchTo': 'تبديل اللغة',
    // Actions
    'actions.call': 'اتصل',
    'actions.whatsapp': 'واتساب',
    'actions.register': 'سجل اهتمامك',
    
    // Footer
    'footer.vision': 'حيث تتشكل الرؤية',
    'footer.description': 'عقارات فاخرة مصممة بدقة واستدامة وأناقة خالدة.',
    'footer.explore': 'استكشف',
    'footer.connect': 'تواصل معنا',
    'footer.newsletter': 'النشرة البريدية',
    'footer.subscribeDesc': 'اشترك لاستلام آخر تحديثات مشاريعنا.',
    'footer.emailPlaceholder': 'البريد الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.rights': 'كالما. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.cookies': 'إعدادات ملفات تعريف الارتباط',
    'actions.openMenu': 'فتح القائمة',
    'actions.closeMenu': 'إغلاق القائمة',
    // Projects menu
    'nav.allProjects': 'كل المشاريع',
    'nav.commercials': 'تجارية',
    'nav.residential': 'سكنية',
    'nav.calmaTower': 'برج كالما'
  }
};



interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize language from URL or localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('calma-language') as Language;
    const isArabicRoute = location.pathname.startsWith('/ar');
    
    if (isArabicRoute && language !== 'ar') {
      setLanguageState('ar');
    } else if (!isArabicRoute && language !== 'en') {
      setLanguageState('en');
    } else if (savedLanguage && savedLanguage !== language) {
      setLanguageState(savedLanguage);
    }
  }, [location.pathname]);

  // Update document direction and language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('calma-language', language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    const currentPath = location.pathname;
    const newPath = toLanguagePath(newLanguage, currentPath)

    setLanguageState(newLanguage);
    navigate(newPath);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      isRTL,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
