import type { Metadata } from "next";
import Image from "next/image";
import { Blocks, Database, Zap, Shield, Workflow, Settings, Play, Users } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export const metadata: Metadata = {
  title: "AppBuilder — Build Internal Tools Without Code",
  description: "Internal tools without ticketing the dev team. Build forms, dashboards, and workflows visually in minutes with no coding required.",
  openGraph: {
    title: "AppBuilder — Build Internal Tools Without Code",
    description: "Internal tools without ticketing the dev team. Build forms, dashboards, and workflows visually in minutes with no coding required.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace AppBuilder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AppBuilder — Build Internal Tools Without Code",
    description: "Internal tools without ticketing the dev team. Build forms, dashboards, and workflows visually in minutes with no coding required.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function AppBuilderPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">AppBuilder</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Internal tools without ticketing the dev team. Build forms, dashboards, and workflows visually in minutes.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Build powerful apps visually</h2>
            <p className="body-large max-w-2xl mx-auto">
              Drag, drop, connect. No code required to create tools your team actually wants to use.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Blocks className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Visual builder</h3>
                <p className="body-text">
                  Point-and-click interface for forms, tables, and dashboards. No coding needed.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Connect any data</h3>
                <p className="body-text">
                  Google Sheets, Postgres, MySQL, REST APIs—bring your data together.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Workflow className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Trigger workflows</h3>
                <p className="body-text">
                  Automate approvals, send notifications, write back to databases.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Granular permissions</h3>
                <p className="body-text">
                  Control access per app, page, component, or user role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="pr-8">
              <h3 className="heading-3 mb-4">Data sources made simple</h3>
              <p className="body-text mb-6">
                Connect to spreadsheets, databases, and APIs without writing SQL or code. Real-time sync keeps everything current.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-accent" />
                  <span className="body-text">Google Sheets & Excel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-accent" />
                  <span className="body-text">Postgres & MySQL</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="body-text">REST APIs & webhooks</span>
                </div>
              </div>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/datamodel.png"
                  alt="Data connections interface"
                  width={1600}
                  height={1200}
                  className="w-full h-auto rounded-inherit"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="gradient-border rounded-lg">
                <div className="image-frame-inner rounded-inherit">
                  <Image
                    src="/product/dashboards.png"
                    alt="App templates"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Start with templates</h3>
              <p className="body-text mb-6">
                Skip the setup with pre-built apps for common workflows. Customize them to fit your exact needs in minutes.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="body-text">PTO request forms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-accent" />
                  <span className="body-text">Vendor intake & approval</span>
                </div>
                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5 text-accent" />
                  <span className="body-text">Asset tracker & inventory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Common use cases</h2>
            <p className="body-large max-w-2xl mx-auto">
              From simple forms to complex workflows, see how teams use AppBuilder.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">HR workflows</h4>
                <p className="body-text">
                  Employee onboarding, PTO requests, expense reports with approval chains.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Operations</h4>
                <p className="body-text">
                  Inventory tracking, vendor management, incident reporting.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Customer tools</h4>
                <p className="body-text">
                  Support ticket portals, feedback forms, feature request voting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">More than just app building</h2>
            <p className="body-large max-w-2xl mx-auto">
              Your apps integrate seamlessly with chat, files, and data—everything works together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Chat notifications</h4>
                <p className="body-text">
                  Send updates to team channels when forms are submitted or approvals are needed.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">File attachments</h4>
                <p className="body-text">
                  Attach files from your workspace or let users upload directly to forms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to build your first app?</h2>
            <p className="body-large mb-8">
              Stop waiting for dev resources. Create the tools your team needs, today.
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


