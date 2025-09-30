import { Mail, Phone, MapPin, Clock, MessageCircle, HeadphonesIcon, Newspaper, Building, ExternalLink, ArrowRight } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function ContactPage() {
  const contactMethods = [
    {
      title: "Sales",
      email: "sales@neo14.ai",
      description: "Questions about plans, pricing, or custom solutions? Our sales team will help you find the right fit for your team.",
      icon: Building,
      responseTime: "Response within 4 hours"
    },
    {
      title: "Support",
      email: "support@neo14.ai", 
      description: "Need help with your account, technical issues, or product questions? Our support team is here to help.",
      icon: HeadphonesIcon,
      responseTime: "Response within 2 hours"
    },
    {
      title: "Press",
      email: "press@neo14.ai",
      description: "Media inquiries, partnership opportunities, or company information requests.",
      icon: Newspaper,
      responseTime: "Response within 24 hours"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Get in <span className="gradient-text">touch</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Whether you're exploring Cospace for your team, need support with your account, or want to partner with us—we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CTAButton variant="primary" text="book a demo" />
              <CTAButton variant="secondary" text="get started free" />
            </div>
            <p className="body-small">
              We typically respond within a few hours during business hours.
            </p>
          </div>
        </div>
        <ScrollHint text="Contact options" />
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">How can we help?</h2>
            <p className="body-large max-w-2xl mx-auto">
              Choose the best way to reach us based on what you need.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="card-feature">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="heading-4 mb-3">{method.title}</h3>
                  <p className="body-text mb-4">{method.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-accent" />
                      <a 
                        href={`mailto:${method.email}`}
                        className="body-text text-accent hover:text-accent/80 transition-colors"
                      >
                        {method.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted" />
                      <span className="body-small text-muted">{method.responseTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">We're remote-first</h2>
              <div className="space-y-4">
                <p className="body-text">
                  While we're a distributed team working from around the world, we maintain a registered business address for official correspondence and legal requirements.
                </p>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Business Address</h4>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="body-text">651 N Broad St, Suite 201</p>
                      <p className="body-text">Middletown, DE 19709</p>
                      <p className="body-text">United States</p>
                    </div>
                  </div>
                </div>
                <p className="body-small text-muted">
                  Please note: This is our registered address for business purposes. All communication should go through our digital channels for the fastest response.
                </p>
              </div>
            </div>
            <div className="card">
              <h3 className="heading-4 mb-4">Prefer to chat?</h3>
              <p className="body-text mb-6">
                Book a 15-minute call with our team to discuss your needs, ask questions, or see a demo of Cospace in action.
              </p>
              <div className="space-y-4">
                <CTAButton variant="primary" text="book a demo call" className="w-full" />
                <div className="pt-4 border-t border-foreground/10">
                  <p className="body-small text-muted mb-2">Other ways to connect:</p>
                  <div className="space-y-2">
                    <CTALink href="/community" text="Join our community forum" />
                    <CTALink href="/docs" text="Browse our documentation" />
                    <CTALink href="/company/careers" text="Explore career opportunities" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Looking for something specific?</h2>
            <p className="body-large max-w-2xl mx-auto">
              Here are some quick links to common requests and information.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <h4 className="heading-4 mb-3">Getting started</h4>
              <div className="space-y-2">
                <CTALink href="/pricing" text="View pricing plans" />
                <CTALink href="/docs" text="Setup guides" />
                <CTALink href="/demo" text="Try the demo" />
              </div>
            </div>
            <div className="card">
              <h4 className="heading-4 mb-3">Product info</h4>
              <div className="space-y-2">
                <CTALink href="/product" text="Feature overview" />
                <CTALink href="/security" text="Security details" />
                <CTALink href="/solutions" text="Use cases" />
              </div>
            </div>
            <div className="card">
              <h4 className="heading-4 mb-3">Support</h4>
              <div className="space-y-2">
                <CTALink href="/docs" text="Documentation" />
                <CTALink href="/community" text="Community forum" />
                <CTALink href="/request" text="Feature requests" />
              </div>
            </div>
            <div className="card">
              <h4 className="heading-4 mb-3">Company</h4>
              <div className="space-y-2">
                <CTALink href="/company/about" text="About us" />
                <CTALink href="/company/careers" text="Join our team" />
                <CTALink href="/legal" text="Legal & privacy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center">
            <div className="card max-w-2xl mx-auto bg-accent/5 border-accent/20">
              <h3 className="heading-4 mb-4">Security or urgent issues?</h3>
              <p className="body-text mb-6">
                If you've discovered a security vulnerability or are experiencing a critical system issue, please reach out immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:security@neo14.ai"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  security@neo14.ai
                </a>
                <p className="body-small text-muted">Response within 1 hour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to get started?</h2>
            <p className="body-large mb-8">
              Don't wait—start building better workflows with your team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="get started free" />
              <CTAButton variant="secondary" text="book a demo" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
