import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CTAButton from "../components/CTAButton";
import ScrollHint from "../components/ScrollHint";
import PageMain from "../components/PageMain";

export default function ProductPage() {
  return (
    <main className="min-h-screen">
      <PageMain
        title={<>Product <span className="gradient-text">Overview</span></>}
        subtitle={<>Everything you need to work together—without switching apps.</>}
      >
        <ScrollHint />
      </PageMain>

      {/* Product Sections - full width rows, images within margins and not cropped */}
      {/* Chat & Meetings - image left (mobile image first), desktop text on right */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/Picture2.png" alt="Chat & Meetings preview" width={1600} height={900} className="w-full h-auto rounded-inherit" priority />
              </div>
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
              <a href="/product/chat" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
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
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/files_main_screen.png" alt="Files & Docs preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
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
              <a href="/product/files" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
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
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/datamodel.png" alt="AppBuilder preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
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
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/dashboards.png" alt="Data & Dashboards preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
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
              <a href="/product/data" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
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
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/Picture6.png" alt="Admin & Security preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
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
              <a href="/security" className="inline-flex items-center gap-2 underline text-accent hover:text-accent/80 transition-colors">
                View Security
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
            <h2 className="heading-2 mb-6">Ready to get started?</h2>
            <p className="body-large mb-8">
              Bring chat, files, docs, and data into one calm workspace.
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


