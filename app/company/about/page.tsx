import { Target, Shield, Zap, Users, Heart, Globe, Lightbulb, CheckCircle } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              We're building the <span className="gradient-text">calm, complete workspace</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              NEO14 Technologies creates secure, integrated tools that help teams move faster with less noise. Cospace is our answer to app‑sprawl.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CTAButton variant="primary" text="get started" />
              <CTAButton variant="secondary" text="book a demo" />
            </div>
            <p className="body-small">
              Founded with the belief that great work happens when tools get out of the way.
            </p>
          </div>
        </div>
        <ScrollHint text="Our story" />
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our mission</h2>
            <p className="body-large max-w-2xl mx-auto">
              To create the workspace tools teams actually want to use—secure, fast, and beautifully simple.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="heading-3 mb-6">The problem we solve</h3>
              <div className="space-y-4">
                <p className="body-text">
                  Modern teams juggle dozens of apps, losing context and wasting time switching between tools. Important conversations get lost in chat threads. Critical documents live in silos. Data lives everywhere except where decisions are made.
                </p>
                <p className="body-text">
                  We believe there's a better way. Instead of adding another app to the stack, we're building the workspace that brings everything together—without the chaos.
                </p>
              </div>
            </div>
            <div className="card">
              <h4 className="heading-4 mb-4">What drives us</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Focus over fragmentation</h5>
                    <p className="body-small">Context should travel with the work, not get lost between apps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Security from day one</h5>
                    <p className="body-small">Privacy and security built into every feature, never bolted on later.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Speed without sacrifice</h5>
                    <p className="body-small">Powerful features that don't slow teams down or complicate workflows.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our values</h2>
            <p className="body-large max-w-2xl mx-auto">
              These principles guide how we build, how we work, and how we treat each other.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Ownership</h3>
              <p className="body-text">
                We take responsibility for outcomes and see projects through. When something breaks, we fix it. When something can be better, we make it better. No "that's not my job" here.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Clarity</h3>
              <p className="body-text">
                Clear communication and transparent processes at every level. We write things down, explain our decisions, and keep everyone in the loop. Ambiguity is the enemy of good work.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Security</h3>
              <p className="body-text">
                Privacy and security by design, never as an afterthought. We build for the most security-conscious customers first, which makes the product better for everyone.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Customer empathy</h3>
              <p className="body-text">
                We build solutions for real problems real teams face. Every feature starts with understanding what our customers actually need, not what we think is cool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">How we work</h2>
              <div className="space-y-4">
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Remote-first, globally distributed</h4>
                  <p className="body-text">We hire the best people regardless of location. Our team spans time zones, bringing diverse perspectives to everything we build.</p>
                </div>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Async by default</h4>
                  <p className="body-text">Documentation over meetings. Clear written communication that lets everyone contribute their best work on their schedule.</p>
                </div>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Ship and iterate</h4>
                  <p className="body-text">We build in public, ship frequently, and improve based on real customer feedback. Perfect is the enemy of better.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="heading-4 mb-4">Want to join us?</h3>
              <p className="body-text mb-6">
                We're always looking for talented individuals who share our values and want to help build the future of work.
              </p>
              <div className="space-y-4">
                <CTALink href="/company/careers" text="View open positions" />
                <div className="pt-4 border-t border-foreground/10">
                  <p className="body-small text-muted mb-2">Current focus areas:</p>
                  <div className="space-y-1">
                    <p className="body-small">• Product Engineering</p>
                    <p className="body-small">• Security Engineering</p>
                    <p className="body-small">• Product Design</p>
                    <p className="body-small">• Solutions Architecture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to experience Cospace?</h2>
            <p className="body-large mb-8">
              See how our values translate into a product that teams actually love using.
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
