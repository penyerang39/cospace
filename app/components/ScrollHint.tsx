'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScrollHintProps {
  text?: string;
  targetSelector?: string;
  className?: string;
}

export default function ScrollHint({ 
  text = 'See more', 
  targetSelector = 'section:nth-of-type(2)',
  className = ''
}: ScrollHintProps) {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToNext = () => {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide hint when user has scrolled past the first section
      if (scrollTop > windowHeight * 0.3) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 ${className}`}>
      <button
        onClick={scrollToNext}
        className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label={`${text} - scroll down`}
      >
        <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {text}
        </span>
        <ChevronDown 
          className="w-5 h-5 animate-bounce group-hover:animate-none color-muted transition-all duration-300" 
          style={{
            animationDuration: '2s',
            animationIterationCount: 'infinite'
          }}
        />
      </button>
    </div>
  );
}
