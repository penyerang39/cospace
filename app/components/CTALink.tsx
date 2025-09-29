'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface CTALinkProps {
  href: string;
  text: string;
  className?: string;
}

export default function CTALink({ href, text, className = '' }: CTALinkProps) {
  const [isVisible, setIsVisible] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

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

    const current = linkRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
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
