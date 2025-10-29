'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observeElement } from '@/app/utils/intersectionObserverManager';

interface CTAButtonProps {
  variant: 'primary' | 'secondary';
  text: 'book a demo' | 'request pricing' | 'see more' | 'get started' | 'talk to sales' | 'contact us' | 'apply';
  className?: string;
}

const textVariants = {
  'book a demo': 'Book a demo',
  'request pricing': 'Request pricing',
  'see more': 'See more',
  'get started': 'Get started',
  'talk to sales': 'Talk to sales',
  'contact us': 'Contact Us',
  'apply': 'Apply',
};

export default function CTAButton({ variant, text, className = '' }: CTAButtonProps) {
  const CONTACT_MAILTO = 'mailto:sales@neo14.com';
  const APPLY_MAILTO = 'mailto:info@neo14.com';
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Check initial visibility
    const rect = button.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportHeight * 0.75 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    // Observe the button/link element (larger, more reliable than the small span)
    return observeElement(
      button,
      (isIntersecting) => {
        if (isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
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
      case 'apply':
        return APPLY_MAILTO;
      default:
        return '/demo';
    }
  })();
  const isMailto = targetHref.startsWith('mailto:');

  if (isMailto) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={targetHref}
        className={`${baseClasses} ${variantClasses} ${className}`}
        target="_self"
        rel="noopener noreferrer"
        onClick={(e) => {
          // Ensure native handler prompt by forcing a direct navigation
          // Some SPA routers or browser settings may ignore bare mailto anchors
          e.preventDefault();
          window.location.href = targetHref;
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
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
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
