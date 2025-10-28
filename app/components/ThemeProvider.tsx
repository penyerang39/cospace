"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get saved theme from localStorage or default to system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to system preference if no saved theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme === theme) return;

    // Start transition
    setIsTransitioning(true);
    document.body.classList.add('theme-transitioning');

    // Show overlay
    const overlay = document.getElementById('theme-transition-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }

    // Change theme after a brief delay to ensure overlay is visible
    setTimeout(() => {
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Hide overlay and end transition after theme change
      setTimeout(() => {
        if (overlay) {
          overlay.classList.remove('active');
        }
        
        // Remove transition class and reset state
        setTimeout(() => {
          document.body.classList.remove('theme-transitioning');
          setIsTransitioning(false);
        }, 50);
      }, 300); // Match CSS transition duration
    }, 50);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}
