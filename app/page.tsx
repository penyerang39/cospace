import Image from "next/image";
import { LayoutDashboard, Zap, ShieldCheck, Sparkles, Users, Activity, Globe, MessageSquare, Video, FileText, Blocks, BarChart3 } from "lucide-react";
import CTAButton from "./components/CTAButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center">
        <div className="max-width container-padding w-full">
          <div className="grid md:grid-cols-2 gap-10 items-end md:items-center">
            {/* Image - shown first on mobile, second on desktop */}
            <div className="order-1 md:order-2">
              <div className="relative w-full h-flex md:h-[50vh]">
                <Image
                  src="/product/updated_projects.png"
                  alt="Cospace projects overview"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Text content - shown second on mobile, first on desktop */}
            <div className="order-2 md:order-1">
              <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
                <h1 className="heading-1 mb-6">
                  Meet <span className="gradient-text">Cospace</span> by NEO14
                </h1>
                <p className="body-large mb-8 max-w-2xl md:max-w-xl mx-auto md:mx-0">
                  Imagine running all your work from one calm, powerful place. Chat, meet, plan, share files, and track data—without the app‑hopping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-6">
                  <CTAButton variant="primary" text="get started" />
                  <CTAButton variant="secondary" text="book a demo" />
                </div>
                <p className="body-small">
                  Free plan available. No credit card required.
                </p>
              </div>
            </div>
          </div>
          
          {/* Static Grid for Mobile, Carousel for Desktop */}
          <div className="mt-16">
            {/* Static Grid - visible on sm and below */}
            <div className="block md:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <Users className="w-4 h-4 text-accent" />
                  <span>10,000+ workspaces created</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <Activity className="w-4 h-4 text-accent" />
                  <span>99.95% uptime</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <Globe className="w-4 h-4 text-accent" />
                  <span>EU & US hosting</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <Zap className="w-4 h-4 text-accent" />
                  <span>Real-time sync</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>AI-powered features</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>AES-256 encryption</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <Users className="w-4 h-4 text-accent" />
                  <span>SSO/SAML</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Granular access control</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
                  <FileText className="w-4 h-4 text-accent" />
                  <span>Audit logs</span>
                </div>
              </div>
            </div>

            {/* Carousel - visible on md and above */}
            <div className="hidden md:block overflow-hidden">
              <div className="flex animate-scroll">
                <div className="flex space-x-8 whitespace-nowrap">
                  {/* First set */}
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>10,000+ workspaces created</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Activity className="w-4 h-4 text-accent" />
                    <span>99.95% uptime</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Real-time sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>AI-powered features</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>AES-256 encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>SSO/SAML</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Granular access control</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Audit logs</span>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>10,000+ workspaces created</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Activity className="w-4 h-4 text-accent" />
                    <span>99.95% uptime</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Real-time sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>AI-powered features</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>AES-256 encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>SSO/SAML</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Granular access control</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Audit logs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Value Pillars Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Built for modern teams</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything you need to work together, securely and efficiently.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <LayoutDashboard className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">One workspace, zero chaos</h3>
              <p className="body-text">
                Messages, docs, tasks, and dashboards stay linked to the work.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">Fast by default</h3>
              <p className="body-text">
                Real‑time sync, lightning search, and clean UI keep teams moving.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">Secure for serious teams</h3>
              <p className="body-text">
                End‑to‑end encryption at rest and in transit, SSO/SAML, roles, and audit trails.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">AI‑assisted where it matters</h3>
              <p className="body-text">
                Draft docs, summarize threads, and surface trends in your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Capabilities Section */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Featured capabilities</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything you need to collaborate, create, and manage your work.
            </p>
          </div>
          <div className="grid-capabilities">
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
              </div>
              <h3 className="heading-4 mb-3">Real‑Time Chat & Video Meetings</h3>
              <p className="body-text">
                Direct messages, channels, file drops, threads, and 1‑click huddles.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">Files & Docs</h3>
              <p className="body-text">
                Versioning, comments, shared folders, and granular permissions.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Blocks className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">AppBuilder</h3>
              <p className="body-text">
                Build internal tools and forms without code. Connect data, trigger workflows.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">Data & Dashboards</h3>
              <p className="body-text">
                Bring spreadsheets, databases, and APIs together. Create live charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Use cases</h2>
            <p className="body-large max-w-2xl mx-auto">
              See how teams across industries use Cospace to get work done.
            </p>
          </div>
          <div className="grid-use-cases">
            <div className="card">
              <div className="accent-border pl-4">
                <h3 className="heading-4 mb-2">Marketing</h3>
                <p className="body-text">plan campaigns, share assets, track KPIs.</p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4">
                <h3 className="heading-4 mb-2">Design</h3>
                <p className="body-text">collect feedback, manage versions, ship on time.</p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4">
                <h3 className="heading-4 mb-2">Software</h3>
                <p className="body-text">plan sprints, ship releases, document decisions.</p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4">
                <h3 className="heading-4 mb-2">Government</h3>
                <p className="body-text">secure collaboration, document exchange, and audit logs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callout Banner */}
      <section className="py-12 bg-accent/5">
        <div className="max-width container-padding">
          <div className="text-center">
            <p className="body-large text-foreground font-italic">
              Private by design — choose EU or US hosting. Keep sensitive work in a space you control.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to get started?</h2>
            <p className="body-large mb-8">
              Join thousands of teams who've already made the switch to Cospace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="get started" />
              <CTAButton variant="secondary" text="request pricing" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
