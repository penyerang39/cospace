import { BookOpen, ArrowRight, Users, MessageSquare, FileText, Blocks, BarChart3, Shield, Code, Zap } from "lucide-react";
import CTAButton from "../components/CTAButton";
import CTALink from "../components/CTALink";

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Guides to get productive fast. Everything you need to master Cospace and build better workflows for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <CTAButton variant="primary" text="get started" />
              <CTAButton variant="secondary" text="book a demo" />
            </div>
            <p className="body-small">
              Updated daily • Searchable • Available in multiple languages
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Quick start guides</h2>
            <p className="body-large max-w-2xl mx-auto">
              Get up and running in minutes with our step-by-step guides.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Getting started</h3>
              <p className="body-text mb-4">
                Set up your workspace, invite your team, and configure basic settings in under 10 minutes.
              </p>
              <CTALink href="#" text="Read guide" />
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Workspaces & teams</h3>
              <p className="body-text mb-4">
                Organize your workspace, manage members, and set up roles and permissions.
              </p>
              <CTALink href="#" text="Read guide" />
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">First steps</h3>
              <p className="body-text mb-4">
                Create your first channel, upload files, and start your first project in minutes.
              </p>
              <CTALink href="#" text="Read guide" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Documentation */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Feature documentation</h2>
            <p className="body-large max-w-2xl mx-auto">
              Deep dive into each feature with detailed guides and best practices.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-accent" />
                <h3 className="heading-4">Chat & Meetings</h3>
              </div>
              <p className="body-text mb-4">
                Master channels, threads, mentions, and video calls. Learn keyboard shortcuts and advanced features.
              </p>
              <div className="space-y-2 mb-4">
                <CTALink href="#" text="Channel management" />
                <CTALink href="#" text="Video meetings & screen share" />
                <CTALink href="#" text="Keyboard shortcuts" />
                <CTALink href="#" text="Notification settings" />
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-accent" />
                <h3 className="heading-4">Files & Docs</h3>
              </div>
              <p className="body-text mb-4">
                Create rich documents, manage versions, set permissions, and collaborate in real-time.
              </p>
              <div className="space-y-2 mb-4">
                <CTALink href="#" text="Document collaboration" />
                <CTALink href="#" text="Version control & history" />
                <CTALink href="#" text="File sharing & permissions" />
                <CTALink href="#" text="Templates & formatting" />
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Blocks className="w-6 h-6 text-accent" />
                <h3 className="heading-4">AppBuilder</h3>
              </div>
              <p className="body-text mb-4">
                Build internal tools, connect data sources, and create workflows without code.
              </p>
              <div className="space-y-2 mb-4">
                <CTALink href="#" text="Building your first app" />
                <CTALink href="#" text="Connecting data sources" />
                <CTALink href="#" text="Workflow automation" />
                <CTALink href="#" text="App permissions & sharing" />
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
                <h3 className="heading-4">Data & Dashboards</h3>
              </div>
              <p className="body-text mb-4">
                Import data, create visualizations, set up alerts, and build comprehensive dashboards.
              </p>
              <div className="space-y-2 mb-4">
                <CTALink href="#" text="Data connections" />
                <CTALink href="#" text="Chart types & customization" />
                <CTALink href="#" text="Dashboard building" />
                <CTALink href="#" text="Alerts & notifications" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Advanced topics</h2>
            <p className="body-large max-w-2xl mx-auto">
              Enterprise features, integrations, and advanced configuration options.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-accent" />
                <h3 className="heading-4">Admin & Security</h3>
              </div>
              <p className="body-text mb-4">
                Configure SSO, manage security policies, set up audit logging, and ensure compliance.
              </p>
              <div className="space-y-2 mb-4">
                <CTALink href="#" text="SSO/SAML configuration" />
                <CTALink href="#" text="User management & SCIM" />
                <CTALink href="#" text="Security policies & MFA" />
                <CTALink href="#" text="Audit logs & compliance" />
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-accent" />
                <h3 className="heading-4">API & Webhooks</h3>
              </div>
              <p className="body-text mb-4">
                Integrate with external systems, automate workflows, and build custom applications.
              </p>
              <div className="space-y-2 mb-4">
                <CTALink href="#" text="REST API reference" />
                <CTALink href="#" text="Webhook configuration" />
                <CTALink href="#" text="Authentication & rate limits" />
                <CTALink href="#" text="SDK & code examples" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Need more help?</h2>
            <p className="body-large max-w-2xl mx-auto">
              Can't find what you're looking for? We're here to help.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h4 className="heading-4 mb-3">Community Forum</h4>
              <p className="body-text mb-4">
                Ask questions and get answers from other Cospace users and our team.
              </p>
              <CTALink href="/community" text="Visit forum" />
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h4 className="heading-4 mb-3">Live Support</h4>
              <p className="body-text mb-4">
                Chat with our support team for immediate help with technical issues.
              </p>
              <CTALink href="#" text="Start chat" />
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h4 className="heading-4 mb-3">Video Tutorials</h4>
              <p className="body-text mb-4">
                Watch step-by-step video guides for common tasks and workflows.
              </p>
              <CTALink href="#" text="Watch videos" />
            </div>
          </div>
        </div>
      </section>

      {/* Search CTA */}
      <section className="py-12 bg-accent/5">
        <div className="max-width container-padding">
          <div className="text-center">
            <p className="body-large text-foreground font-italic">
              Search across 1000+ documentation pages, video tutorials, and community discussions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to explore Cospace?</h2>
            <p className="body-large mb-8">
              Start with our documentation or jump right in with a free account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="get started" />
              <CTALink href="#" text="Open documentation" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


