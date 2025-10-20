'use client'

import { usePathname } from 'next/navigation'

export default function FormProgressBar() {
  const pathname = usePathname()
  
  // Only show progress bar on demo and request pages
  const shouldShow = pathname === '/demo' || pathname === '/request'
  
  if (!shouldShow) {
    return null
  }

  return (
    <div
      className="fixed left-0 z-40 h-[2px] w-full bg-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
      style={{ top: '4rem' }}
    >
      <div
        className="h-full bg-accent shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-[width] duration-300"
        style={{ width: 'var(--demo-progress, 0%)' }}
      />
    </div>
  )
}
