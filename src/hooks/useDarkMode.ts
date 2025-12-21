/**
 * Dark Mode Management Hook
 * Supreme Design System - Universal Edition
 * 
 * Comprehensive dark mode management with user preference detection,
 * local storage persistence, and system theme synchronization.
 */

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface UseDarkModeReturn {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemPrefersDark: boolean;
}

const STORAGE_KEY = 'calma-theme-preference';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * Custom hook for managing dark mode state and preferences
 */
export function useDarkMode(): UseDarkModeReturn {
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Check system preference
  const checkSystemPreference = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }, []);

  // Get stored theme preference
  const getStoredTheme = useCallback((): Theme => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as Theme;
      }
    }
    return 'system';
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme, systemDark: boolean) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Remove existing theme attributes
    root.removeAttribute(THEME_ATTRIBUTE);
    
    // Determine actual theme to apply
    let actualTheme: 'light' | 'dark';
    if (newTheme === 'system') {
      actualTheme = systemDark ? 'dark' : 'light';
    } else {
      actualTheme = newTheme;
    }

    // Apply theme attribute
    if (actualTheme === 'dark') {
      root.setAttribute(THEME_ATTRIBUTE, 'dark');
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        actualTheme === 'dark' ? '#0F0F0F' : '#FFFFFF'
      );
    }

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: newTheme, actualTheme, systemPrefersDark: systemDark }
    }));
  }, []);

  // Set theme with persistence
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Store preference
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
    
    // Apply theme
    applyTheme(newTheme, systemPrefersDark);
  }, [applyTheme, systemPrefersDark]);

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(() => {
    const currentActual = theme === 'system' 
      ? (systemPrefersDark ? 'dark' : 'light')
      : theme;
    
    setTheme(currentActual === 'dark' ? 'light' : 'dark');
  }, [theme, systemPrefersDark, setTheme]);

  // Calculate if current theme is dark
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  // Initialize theme on mount
  useEffect(() => {
    const initialSystemPreference = checkSystemPreference();
    setSystemPrefersDark(initialSystemPreference);
    
    const storedTheme = getStoredTheme();
    setThemeState(storedTheme);
    
    // Apply initial theme
    applyTheme(storedTheme, initialSystemPreference);
  }, [checkSystemPreference, getStoredTheme, applyTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
      
      // If using system theme, update immediately
      if (theme === 'system') {
        applyTheme('system', e.matches);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, applyTheme]);

  // Update theme when dependencies change
  useEffect(() => {
    applyTheme(theme, systemPrefersDark);
  }, [theme, systemPrefersDark, applyTheme]);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    systemPrefersDark
  };
}

/**
 * Hook for components that need to react to theme changes
 */
export function useThemeListener(callback: (theme: Theme, isDark: boolean) => void) {
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      const { theme, actualTheme } = event.detail;
      callback(theme, actualTheme === 'dark');
    };

    window.addEventListener('themechange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themechange', handleThemeChange as EventListener);
  }, [callback]);
}

/**
 * Utility function to get current theme without hook
 */
export function getCurrentTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
    return stored as Theme;
  }
  return 'system';
}

/**
 * Utility function to check if current theme is dark
 */
export function getIsDark(): boolean {
  if (typeof window === 'undefined') return false;
  
  const theme = getCurrentTheme();
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  
  // System theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default useDarkMode;