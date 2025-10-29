'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { observeElement } from '@/app/utils/intersectionObserverManager';

interface CTALinkProps {
  href: string;
  text: string;
  className?: string;
}

export default function CTALink({ href, text, className = '' }: CTALinkProps) {
  const [isVisible, setIsVisible] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const current = linkRef.current;
    if (!current) return;

    return observeElement(
      current,
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

  const baseClasses = 'inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-all duration-300';

  return (
    <Link
      ref={linkRef}
      href={href}
      className={`${baseClasses} ${className}`}
    >
      <span>{text}</span>
      <ArrowRight 
        className={`w-4 h-4 transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-2'
        }`}
      />
    </Link>
  );
}
