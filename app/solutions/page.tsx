import React from 'react';
import Image from 'next/image';
import CTALink from '../components/CTALink';

type Solution = {
  slug: 'marketing' | 'design' | 'software' | 'government';
  title: string;
  points: string[];
};

const solutions: Solution[] = [
  {
    slug: 'marketing',
    title: 'Marketing Teams',
    points: [
      'Plan campaigns, track assets, centralize briefs, review creatives.',
      'Connect ad spend data and build ROAS dashboards.',
    ],
  },
  {
    slug: 'design',
    title: 'Design Teams',
    points: [
      'Manage versions, share mocks, collect feedback, and ship on time.',
      'Link design tasks and specs to the latest files.',
    ],
  },
  {
    slug: 'software',
    title: 'Software Teams',
    points: [
      'Roadmaps, sprints, release notes, on‑call runbooks.',
      'Link issues, PRDs, and docs to the code or service.',
    ],
  },
  {
    slug: 'government',
    title: 'Government & Public Sector',
    points: [
      'Secure document exchange, private file storage, and safe communication.',
      'Fine‑grained access controls, audit logs, and data residency.',
    ],
  },
];

function buildPlaceholderDataUri(label: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='#111827'/>
        <stop offset='100%' stop-color='#1f2937'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <g fill='white' fill-opacity='0.08'>
      <circle cx='150' cy='120' r='80'/>
      <circle cx='1050' cy='560' r='120'/>
      <circle cx='600' cy='300' r='140'/>
    </g>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
      font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
      font-size='44' fill='white' fill-opacity='0.9'>${label}</text>
  </svg>`;
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

export default function Page() {
  return (
    <main className='px-6 py-12 md:py-16 lg:py-20'>
      <div className='mx-auto max-w-6xl'>
        <header className='mb-10 md:mb-12'>
          <h1 className='text-3xl font-semibold tracking-tight md:text-4xl'>Solutions</h1>
          <p className='mt-2 text-muted-foreground'>Choose your team to see how it works.</p>
        </header>

        <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {solutions.map(({ slug, title, points }) => (
            <article key={slug} className='overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md'>
              <div className='relative'>
                <Image
                  src={buildPlaceholderDataUri(title)}
                  alt={`${title} placeholder`}
                  width={1200}
                  height={675}
                  className='h-auto w-full aspect-[16/9] object-cover'
                  priority={slug === 'marketing'}
                  sizes='(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw'
                />
              </div>

              <div className='p-5 md:p-6'>
                <h2 className='text-xl font-medium tracking-tight'>{title}</h2>
                <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
                  {points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className='mt-4'>
                  <CTALink href={`/solutions/${slug}`} text='See how it works' />
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}


