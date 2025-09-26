import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProductPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Product <span className="gradient-text">Overview</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Everything you need to work together—without switching apps.
            </p>
          </div>
        </div>
      </section>

      {/* Product Sections - full width rows, images within margins and not cropped */}
      {/* Chat & Meetings - image left (mobile image first), desktop text on right */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-[60vh] overflow-hidden rounded-lg bg-foreground/2">
              <Image src="/product/updated_projects.png" alt="Chat & Meetings preview" fill className="object-contain" priority sizes="(min-width: 768px) 40vw, 90vw" />
            </div>
          </div>
          <div className="order-2">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Chat & Meetings</h3>
              <p className="body-text mb-4">
                Channels and DMs with mentions, threads, and file previews.<br/>
                Voice rooms and instant video calls with screen share.<br/>
                Focus mode and notification controls to protect deep work.
              </p>
              <a href="/product/chat-meetings" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore Chat & Meetings
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Files & Docs - image right on desktop */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1 md:order-2">
            <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-[60vh] overflow-hidden rounded-lg bg-foreground/2">
              <Image src="/product/updated_projects.png" alt="Files & Docs preview" fill className="object-contain" sizes="(min-width: 768px) 40vw, 90vw" />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Files & Docs</h3>
              <p className="body-text mb-4">
                Rich docs with comments, tasks, and version history.<br/>
                Shared drives and role‑based permissions down to the file.<br/>
                Fast global search across files, messages, and tasks.
              </p>
              <a href="/product/files-docs" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore Files & Docs
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AppBuilder - image left on desktop */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-[60vh] overflow-hidden rounded-lg bg-foreground/2">
              <Image src="/product/updated_projects.png" alt="AppBuilder preview" fill className="object-contain" sizes="(min-width: 768px) 40vw, 90vw" />
            </div>
          </div>
          <div className="order-2">
            <div className="w-full">
              <h3 className="heading-4 mb-3">AppBuilder</h3>
              <p className="body-text mb-4">
                Point‑and‑click interfaces for forms, requests, and internal tools.<br/>
                Connect to Google Sheets, Postgres, MySQL, and REST APIs.<br/>
                Trigger workflows: approvals, notifications, and data writes.
              </p>
              <a href="/product/appbuilder" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore AppBuilder
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Dashboards - image right on desktop */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1 md:order-2">
            <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-[60vh] overflow-hidden rounded-lg bg-foreground/2">
              <Image src="/product/updated_projects.png" alt="Data & Dashboards preview" fill className="object-contain" sizes="(min-width: 768px) 40vw, 90vw" />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Data & Dashboards</h3>
              <p className="body-text mb-4">
                Bring in CSVs, databases, and third‑party metrics.<br/>
                Build live charts, tables, and alerts in minutes.<br/>
                AI summaries to spot trends and anomalies.
              </p>
              <a href="/product/data-dashboards" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                Explore Data & Dashboards
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Admin & Security - image left on desktop */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-[60vh] overflow-hidden rounded-lg bg-foreground/2">
              <Image src="/product/updated_projects.png" alt="Admin & Security preview" fill className="object-contain" sizes="(min-width: 768px) 40vw, 90vw" />
            </div>
          </div>
          <div className="order-2">
            <div className="w-full">
              <h3 className="heading-4 mb-3">Admin & Security</h3>
              <p className="body-text mb-4">
                SSO/SAML, SCIM provisioning, MFA, and granular roles.<br/>
                Audit logs, retention policies, legal hold.<br/>
                Bring‑your‑own‑key (BYOK) encryption (Business/Enterprise).
              </p>
              <a href="/product/admin-security" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                View Security
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


