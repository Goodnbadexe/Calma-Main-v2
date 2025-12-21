/**
 * Theme Toggle Component
 * Supreme Design System - Universal Edition
 * 
 * Accessible theme toggle with smooth animations and multiple theme options.
 */

import React from 'react';
import { useDarkMode, type Theme } from '@/hooks/useDarkMode';
import './ThemeToggle.css';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  'aria-label'?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  showLabel = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const { theme, isDark, setTheme, toggleTheme } = useDarkMode();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const getIcon = (currentTheme: Theme, isActive: boolean = false) => {
    const iconClass = `theme-icon ${isActive ? 'active' : ''}`;
    
    switch (currentTheme) {
      case 'light':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        );
      case 'dark':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        );
      case 'system':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (variant === 'button') {
    return (
      <button
        className={`theme-toggle theme-toggle--${size} ${className}`}
        onClick={toggleTheme}
        aria-label={ariaLabel || `Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Current theme: ${theme}${theme === 'system' ? ` (${isDark ? 'dark' : 'light'})` : ''}`}
        type="button"
      >
        <span className="theme-toggle__icon">
          {getIcon(isDark ? 'light' : 'dark')}
        </span>
        {showLabel && (
          <span className="theme-toggle__label">
            {isDark ? 'Light' : 'Dark'} Mode
          </span>
        )}
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <label className={`theme-switch theme-switch--${size} ${className}`}>
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          className="theme-switch__input sr-only"
          aria-label={ariaLabel || 'Toggle dark mode'}
        />
        <span className="theme-switch__slider">
          <span className="theme-switch__thumb">
            {getIcon(theme, true)}
          </span>
        </span>
        {showLabel && (
          <span className="theme-switch__label">
            Dark Mode
          </span>
        )}
      </label>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`theme-dropdown theme-dropdown--${size} ${className}`}>
        <button
          className="theme-dropdown__trigger"
          aria-label={ariaLabel || 'Select theme'}
          aria-haspopup="listbox"
          aria-expanded="false"
          type="button"
        >
          <span className="theme-dropdown__icon">
            {getIcon(theme, true)}
          </span>
          {showLabel && (
            <span className="theme-dropdown__label">
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>
          )}
          <svg className="theme-dropdown__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </button>
        
        <div className="theme-dropdown__menu" role="listbox">
          {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
            <button
              key={themeOption}
              className={`theme-dropdown__option ${theme === themeOption ? 'active' : ''}`}
              onClick={() => handleThemeChange(themeOption)}
              role="option"
              aria-selected={theme === themeOption}
              type="button"
            >
              <span className="theme-dropdown__option-icon">
                {getIcon(themeOption)}
              </span>
              <span className="theme-dropdown__option-label">
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </span>
              {theme === themeOption && (
                <svg className="theme-dropdown__check" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ThemeToggle;