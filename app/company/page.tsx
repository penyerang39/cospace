import { Building2, Users, Mail, ChevronDown } from "lucide-react";
import CTAButton from "../components/CTAButton";
import CTALink from "../components/CTALink";
import ScrollHint from "../components/ScrollHint";
import PageMain from "../components/PageMain";

export default function CompanyPage() {
  return (
    <main className="min-h-screen">
      <PageMain
        title={<>Meet the team building <span className="gradient-text">the future of work</span></>}
        subtitle={
          <>NEO14 Technologies creates secure, integrated tools that help teams move faster with less noise. We're building the calm, complete workspace for modern teams.</>
        }
      >
        <ScrollHint />
      </PageMain>

      {/* Company Sections Overview */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Learn more about NEO14</h2>
            <p className="body-large max-w-2xl mx-auto">
              Our story, our people, and how to get in touch.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">About us</h3>
              <p className="body-text mb-4">
                We're building the calm, complete workspace. Learn about our mission to solve app‑sprawl and create better ways to work.
              </p>
              <CTALink href="/company/about" text="Learn our story" />
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Careers</h3>
              <p className="body-text mb-4">
                We hire globally, remote‑friendly. Join our team of engineers, designers, and architects building the future of work.
              </p>
              <CTALink href="/company/careers" text="View open roles" />
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Contact</h3>
              <p className="body-text mb-4">
                Get in touch with our sales, support, or press teams. We're here to help with any questions about Cospace.
              </p>
              <CTALink href="/company/contact" text="Get in touch" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our values</h2>
            <p className="body-large max-w-2xl mx-auto">
              The principles that guide everything we build and how we work together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Ownership</h4>
                <p className="body-text">
                  Take responsibility for outcomes, not just tasks. We build with pride and ship with confidence.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Clarity</h4>
                <p className="body-text">
                  Clear communication leads to better products. We say what we mean and build what makes sense.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Security</h4>
                <p className="body-text">
                  Privacy and security aren't features—they're foundations. We protect user data like it's our own.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Customer empathy</h4>
                <p className="body-text">
                  We build for real problems, not theoretical ones. Understanding our users drives every decision.
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
            <h2 className="heading-2 mb-6">Ready to join us?</h2>
            <p className="body-large mb-8">
              Whether you're looking to work with us or work for us, we'd love to hear from you.
            </p>
            <div className="flex justify-center">
              <CTAButton variant="primary" text="contact us" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


