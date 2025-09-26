'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CTAButtonProps {
  variant: 'primary' | 'secondary';
  text: 'book a demo' | 'request pricing' | 'see more' | 'get started';
  className?: string;
}

const textVariants = {
  'book a demo': 'Book a demo',
  'request pricing': 'Request pricing',
  'see more': 'See more',
  'get started': 'Get started',
};

export default function CTAButton({ variant, text, className = '' }: CTAButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  const baseClasses = 'btn-primary flex items-center gap-2 group transition-all duration-300';
  const variantClasses = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <span>{textVariants[text]}</span>
      <ArrowRight 
        className={`w-4 h-4 transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-2'
        }`}
      />
    </button>
  );
}
