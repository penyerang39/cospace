import Image from "next/image";
import { Palette, GitBranch, MessageCircle, Clock, Users, Share2, Eye, Layers } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function DesignPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Design</span> Solutions
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Manage versions, share mocks, collect feedback, and ship on time. Link design tasks and specs to the latest files.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Key Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Design workflow, perfected</h2>
            <p className="body-large max-w-2xl mx-auto">
              From first sketch to final handoff, keep your design process organized and collaborative.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Version control</h3>
                <p className="body-text">
                  Track design iterations with automatic versioning and visual diffs.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Contextual feedback</h3>
                <p className="body-text">
                  Collect comments directly on designs with thread-based discussions.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Smart sharing</h3>
                <p className="body-text">
                  Share mockups and prototypes with stakeholders via secure links.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Design handoff</h3>
                <p className="body-text">
                  Link design specs to tasks and keep developers in sync with latest assets.
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
              <h3 className="heading-3 mb-4">Feedback that makes sense</h3>
              <p className="body-text mb-6">
                No more scattered comments in email or Slack. Collect feedback directly on designs with context, resolve discussions, and keep everyone aligned.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  <span className="body-text">Pin comments to specific elements</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="body-text">@mention team members & stakeholders</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="body-text">Track feedback resolution status</span>
                </div>
              </div>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/Picture2.png"
                  alt="Design feedback interface"
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
                    src="/product/Picture3.png"
                    alt="Design system management"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Design system management</h3>
              <p className="body-text mb-6">
                Maintain consistency across projects with centralized component libraries, style guides, and asset management.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-accent" />
                  <span className="body-text">Component libraries & style guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-accent" />
                  <span className="body-text">Asset organization & tagging</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-accent" />
                  <span className="body-text">Usage tracking across projects</span>
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
            <h2 className="heading-2 mb-4">How design teams use Cospace</h2>
            <p className="body-large max-w-2xl mx-auto">
              Streamlined workflows that help you ship better designs faster.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">UI/UX projects</h4>
                <p className="body-text mb-4">
                  From wireframes to high-fidelity mockups, manage the entire design process.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Brand identity</h4>
                <p className="body-text mb-4">
                  Develop and maintain brand guidelines, logos, and visual identity systems.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Design systems</h4>
                <p className="body-text mb-4">
                  Build and evolve component libraries with proper documentation and governance.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Integration Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Works with your favorite tools</h2>
            <p className="body-large max-w-2xl mx-auto">
              Import from Figma, Adobe Creative Suite, and other design tools seamlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">File sync</h4>
                <p className="body-text">
                  Automatically sync the latest versions from Figma, Sketch, and Adobe XD.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Developer handoff</h4>
                <p className="body-text">
                  Export assets and specs directly to development tasks and documentation.
                </p>
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
              Reduce design review cycles by 50% with structured feedback and automated notifications.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to upgrade your design workflow?</h2>
            <p className="body-large mb-8">
              Join design teams who've cut handoff time in half and improved cross-team collaboration.
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


