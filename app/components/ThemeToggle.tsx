"use client";

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, isTransitioning } = useTheme();

  const toggleTheme = () => {
    if (!isTransitioning) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  // Show the icon of the theme we'll switch TO (opposite of current)
  const getIcon = () => {
    return theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
  };

  const getLabel = () => {
    if (isTransitioning) {
      return 'Switching theme...';
    }
    return theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors duration-200 ${
        isTransitioning 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:text-foreground/80'
      }`}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}
