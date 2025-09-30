import { Shield, Zap, Users, Target, Globe } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              We're building the <span className="gradient-text">calm, complete workspace</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              NEO14 Technologies creates secure, integrated tools that help teams move faster with less noise. 
              Cospace is our answer to app‑sprawl—bringing everything you need into one powerful, intuitive place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <CTAButton variant="primary" text="try cospace" />
              <CTAButton variant="secondary" text="book a demo" />
            </div>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our mission</h2>
            <p className="body-large max-w-2xl mx-auto">
              To eliminate the chaos of switching between dozens of apps and create a single, secure place where teams can do their best work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="accent-border pl-6 mb-6">
                <h3 className="heading-3 mb-4">The problem we're solving</h3>
                <p className="body-text mb-4">
                  Modern teams are drowning in app‑sprawl. The average knowledge worker switches between 
                  10+ applications daily, losing context and momentum with every transition.
                </p>
                <p className="body-text">
                  We believe there's a better way—one unified workspace that brings together chat, 
                  files, data, and workflows without sacrificing security or performance.
                </p>
              </div>
            </div>
            
            <div>
              <div className="accent-border pl-6">
                <h3 className="heading-3 mb-4">Our approach</h3>
                <p className="body-text mb-4">
                  We start with security and build up. Every feature is designed with privacy-first 
                  principles, end-to-end encryption, and enterprise-grade compliance in mind.
                </p>
                <p className="body-text">
                  Rather than bolting on features, we architect integrated experiences that feel 
                  natural and help teams maintain their flow state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">What drives us</h2>
            <p className="body-large max-w-2xl mx-auto">
              The principles that guide our product decisions and shape our company culture.
            </p>
          </div>
          
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Security first</h3>
              <p className="body-text">
                We believe privacy and security aren't features—they're foundations. Your data stays yours, always.
              </p>
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Built for speed</h3>
              <p className="body-text">
                Every interaction should feel instant. We optimize ruthlessly for performance and user experience.
              </p>
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Human-centered</h3>
              <p className="body-text">
                Technology should amplify human potential, not overwhelm it. We design for real people solving real problems.
              </p>
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Focus over features</h3>
              <p className="body-text">
                We'd rather build fewer things exceptionally well than many things adequately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">NEO14 by the numbers</h2>
            <p className="body-large max-w-2xl mx-auto">
              A growing company focused on sustainable growth and customer success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Founded 2023</h4>
                <p className="body-text">
                  Started with a simple mission: eliminate app‑sprawl and create better ways for teams to collaborate.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Remote-first</h4>
                <p className="body-text">
                  Distributed team across multiple time zones, proving that great work happens everywhere.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">10,000+ workspaces</h4>
                <p className="body-text">
                  Trusted by teams from startups to enterprises who've made the switch to unified workflows.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">99.95% uptime</h4>
                <p className="body-text">
                  Reliable infrastructure with EU and US hosting options for data residency requirements.
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
            <h2 className="heading-2 mb-6">Ready to experience the difference?</h2>
            <p className="body-large mb-8">
              See how Cospace can transform your team's workflow. Start with our free plan or book a personalized demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <CTAButton variant="primary" text="start free trial" />
              <CTAButton variant="secondary" text="schedule demo" />
            </div>
            <p className="body-text">
              <CTALink href="/company/careers" text="Want to join our team?" /> • <CTALink href="/company/contact" text="Get in touch" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
