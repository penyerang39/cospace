import type { Metadata } from "next";
import Image from "next/image";
import { TrendingUp, Target, Calendar, Users, BarChart3, Megaphone, Share2, ArrowRight } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export const metadata: Metadata = {
  title: "Marketing Solutions — Campaign Planning & Analytics",
  description: "Plan campaigns, track assets, centralize briefs, and review creatives all in one place. Connect ad spend data and build ROAS dashboards.",
  openGraph: {
    title: "Marketing Solutions — Campaign Planning & Analytics",
    description: "Plan campaigns, track assets, centralize briefs, and review creatives all in one place. Connect ad spend data and build ROAS dashboards.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Marketing Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Solutions — Campaign Planning & Analytics",
    description: "Plan campaigns, track assets, centralize briefs, and review creatives all in one place. Connect ad spend data and build ROAS dashboards.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Marketing</span> Solutions
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Plan campaigns, track assets, centralize briefs, and review creatives all in one place. Connect ad spend data and build ROAS dashboards.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Key Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Everything marketing teams need</h2>
            <p className="body-large max-w-2xl mx-auto">
              From campaign planning to performance analysis, keep your entire marketing operation organized.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Campaign planning</h3>
                <p className="body-text">
                  Centralize briefs, timelines, and creative assets for every campaign.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Asset management</h3>
                <p className="body-text">
                  Store, organize, and share creatives with version control and approval workflows.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Performance tracking</h3>
                <p className="body-text">
                  Connect ad platforms and build custom ROAS dashboards with real-time data.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Team collaboration</h3>
                <p className="body-text">
                  Review creatives, discuss strategy, and get approvals without email chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Workflow Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="pr-8">
              <h3 className="heading-3 mb-4">Campaign planning made simple</h3>
              <p className="body-text mb-6">
                Create campaign briefs with built-in templates, assign tasks to team members, and track progress from ideation to launch.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="body-text">Campaign calendars & deadlines</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="body-text">Brief templates & checklists</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="body-text">Task assignments & approvals</span>
                </div>
              </div>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/files_main_screen.png"
                  alt="Campaign planning interface"
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
                    alt="Marketing analytics dashboard"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Data-driven decisions</h3>
              <p className="body-text mb-6">
                Connect Google Ads, Facebook, LinkedIn, and other platforms to build comprehensive ROAS dashboards with automated reporting.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="body-text">Multi-channel attribution</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <span className="body-text">Custom ROAS calculations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Megaphone className="w-5 h-5 text-accent" />
                  <span className="body-text">Automated performance alerts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">How marketing teams use Cospace</h2>
            <p className="body-large max-w-2xl mx-auto">
              Real workflows that help you move faster and make better decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Content creation</h4>
                <p className="body-text mb-4">
                  Plan content calendars, manage creative assets, and streamline approval workflows.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Campaign management</h4>
                <p className="body-text mb-4">
                  Track multi-channel campaigns from brief to performance analysis.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Performance reporting</h4>
                <p className="body-text mb-4">
                  Automate reports for stakeholders with real-time data from all platforms.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Callout */}
      <section className="py-12 bg-accent/5">
        <div className="max-width container-padding">
          <div className="text-center">
            <p className="body-large text-foreground font-italic">
              Connect Google Ads, Facebook, LinkedIn, HubSpot, and 50+ other marketing tools in one dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to streamline your marketing?</h2>
            <p className="body-large mb-8">
              Join marketing teams who've reduced planning time by 60% and improved campaign ROI.
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


