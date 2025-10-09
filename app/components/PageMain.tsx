import React from 'react'
import ScrollHint from './ScrollHint'

interface PageMainProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
}

export default function PageMain({ title, subtitle, children }: PageMainProps) {
  return (
    <section className={`section-padding min-h-screen flex items-center relative`}>
      <div className="max-width container-padding w-full">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="heading-1 mb-6">{title}</h1>
          {subtitle ? (
            <p className="body-large mb-8 max-w-2xl mx-auto">{subtitle}</p>
          ) : null}
        </div>
        <ScrollHint />
      </div>
    </section>
  )
}
