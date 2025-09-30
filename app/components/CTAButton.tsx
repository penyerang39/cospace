'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CTAButtonProps {
  variant: 'primary' | 'secondary';
  text: 'book a demo' | 'request pricing' | 'see more' | 'get started' | 'talk to sales' | 'contact us';
  className?: string;
}

const textVariants = {
  'book a demo': 'Book a demo',
  'request pricing': 'Request pricing',
  'see more': 'See more',
  'get started': 'Get started',
  'talk to sales': 'Talk to sales',
  'contact us': 'Contact Us',
};

export default function CTAButton({ variant, text, className = '' }: CTAButtonProps) {
  const CONTACT_MAILTO = 'mailto:sales@neo14.ai';
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
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

    const current = iconRef.current;
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
      case 'contact us':
        return CONTACT_MAILTO;
      default:
        return '/demo';
    }
  })();
  const isMailto = targetHref.startsWith('mailto:');

  if (isMailto) {
    return (
      <a
        href={targetHref}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        <span>{textVariants[text]}</span>
        <span ref={iconRef}>
          <ArrowRight 
            className={`w-4 h-4 transition-all duration-500 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-2'
            }`}
          />
        </span>
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={() => {
        if (!targetHref) return;
        router.push(targetHref);
      }}
    >
      <span>{textVariants[text]}</span>
      <span ref={iconRef}>
        <ArrowRight 
          className={`w-4 h-4 transition-all duration-500 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-2'
          }`}
        />
      </span>
    </button>
  );
}
