import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import ScrollHint from '../components/ScrollHint';
import PageMain from '../components/PageMain';

export const metadata: Metadata = {
  title: "Solutions for Marketing, Design, Software & Government",
  description: "Workflows that fit your team—with security and speed built in.",
  openGraph: {
    title: "Solutions for Marketing, Design, Software & Government",
    description: "Workflows that fit your team—with security and speed built in.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions for Marketing, Design, Software & Government",
    description: "Workflows that fit your team—with security and speed built in.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen">
      <PageMain
        title={<>Solutions <span className="gradient-text">Overview</span></>}
        subtitle={<>Tailored workflows for every team: marketing, design, software, and government. Explore how Cospace unifies chat, files, docs, and data.</>}
      >
        <ScrollHint />
      </PageMain>

      {/* Marketing - image left */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/updated_data1.png" alt="Marketing preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Marketing</h3>
              <p className="body-text mb-4">
                Plan campaigns, track assets, centralize briefs, and review creatives. Connect ad platforms and build ROAS dashboards.
              </p>
              <a href="/solutions/marketing" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore Marketing
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Design - image right */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1 md:order-2">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/Picture1.png" alt="Design preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Design</h3>
              <p className="body-text mb-4">
                Manage versions, share mocks, collect feedback, and ship on time. Keep specs linked to the latest files.
              </p>
              <a href="/solutions/design" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore Design
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Software - image left */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/Picture4.png" alt="Software preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Software</h3>
              <p className="body-text mb-4">
                Roadmaps, sprints, release notes, and on‑call runbooks. Link issues, PRDs, and docs to code.
              </p>
              <a href="/solutions/software" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore Software
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Government - image right */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1 md:order-2">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/Picture7.png" alt="Government preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Government</h3>
              <p className="body-text mb-4">
                Secure document exchange, private file storage, and safe communication. Fine‑grained access controls and audit logs.
              </p>
              <a href="/solutions/government" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore Government
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to explore solutions?</h2>
            <p className="body-large mb-8">
              See how Cospace adapts to your team's workflow with shared context across chat, files, docs, and data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="get started" />
              <CTAButton variant="secondary" text="book a demo" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


