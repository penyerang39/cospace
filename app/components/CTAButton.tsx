'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CTAButtonProps {
  variant: 'primary' | 'secondary';
  text: 'book a demo' | 'request pricing' | 'see more' | 'get started' | 'talk to sales';
  className?: string;
}

const textVariants = {
  'book a demo': 'Book a demo',
  'request pricing': 'Request pricing',
  'see more': 'See more',
  'get started': 'Get started',
  'talk to sales': 'Talk to sales',
};

export default function CTAButton({ variant, text, className = '' }: CTAButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

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

    const current = buttonRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const baseClasses = 'btn-primary flex items-center gap-2 group transition-all duration-300';
  const variantClasses = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  const targetHref = (() => {
    switch (text) {
      case 'book a demo':
        return '/demo';
      case 'request pricing':
        return '/request';
      case 'see more':
        return '/demo';
      case 'get started':
        return '/request';
      case 'talk to sales':
        return '/request';
      default:
        return '/demo';
    }
  })();

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={() => {
        if (targetHref) router.push(targetHref);
      }}
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
