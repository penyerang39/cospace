import { Building2, Users, Briefcase, Mail, ArrowRight } from "lucide-react";
import CTAButton from "../components/CTAButton";
import CTALink from "../components/CTALink";
import ScrollHint from "../components/ScrollHint";

export default function CompanyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Meet <span className="gradient-text">NEO14 Technologies</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              We're building the calm, complete workspace. Creating secure, integrated tools that help teams move faster with less noise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CTAButton variant="primary" text="get started" />
              <CTAButton variant="secondary" text="book a demo" />
            </div>
            <p className="body-small">
              Cospace is our answer to app‑sprawl.
            </p>
          </div>
        </div>
        <ScrollHint text="Learn more" />
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our focus areas</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything we do is centered around helping teams work better together.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">About us</h3>
              <p className="body-text mb-4">
                Our mission, values, and what drives us to build better workspace tools.
              </p>
              <CTALink href="/company/about" text="Learn about our mission" />
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Careers</h3>
              <p className="body-text mb-4">
                Join our remote-friendly team. We hire globally and value ownership, clarity, and empathy.
              </p>
              <CTALink href="/company/careers" text="View open positions" />
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Contact</h3>
              <p className="body-text mb-4">
                Get in touch with our sales, support, or press teams.
              </p>
              <CTALink href="/company/contact" text="Contact us" />
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Community</h3>
              <p className="body-text mb-4">
                Join thousands of teams sharing tips, templates, and best practices.
              </p>
              <CTALink href="/community" text="Join the community" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Preview */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Our values guide everything</h2>
              <div className="space-y-4">
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Ownership</h4>
                  <p className="body-text">We take responsibility for outcomes and see projects through.</p>
                </div>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Clarity</h4>
                  <p className="body-text">Clear communication and transparent processes at every level.</p>
                </div>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Security</h4>
                  <p className="body-text">Privacy and security by design, never as an afterthought.</p>
                </div>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Customer empathy</h4>
                  <p className="body-text">We build solutions for real problems real teams face.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="heading-4 mb-4">Ready to join us?</h3>
              <p className="body-text mb-6">
                We're always looking for talented individuals who share our values and want to help build the future of work.
              </p>
              <div className="space-y-3">
                <CTALink href="/company/careers" text="View open positions" />
                <CTALink href="/company/about" text="Learn more about us" />
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
              Join thousands of teams who've already made the switch to Cospace.
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


