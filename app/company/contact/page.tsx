import { Mail, Phone, MapPin, MessageCircle, Briefcase, Newspaper, HelpCircle, Clock } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Briefcase,
      title: "Sales",
      email: "sales@neo14.ai",
      description: "Questions about pricing, features, or enterprise needs? Our sales team is here to help.",
      responseTime: "Response within 4 hours"
    },
    {
      icon: HelpCircle,
      title: "Support",
      email: "support@neo14.ai", 
      description: "Technical issues, account questions, or need help getting started? We've got you covered.",
      responseTime: "Response within 2 hours"
    },
    {
      icon: Newspaper,
      title: "Press",
      email: "press@neo14.ai",
      description: "Media inquiries, press kit requests, or interview opportunities with our team.",
      responseTime: "Response within 24 hours"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Let's <span className="gradient-text">talk</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Whether you're interested in Cospace for your team, have questions about our platform, 
              or want to explore partnership opportunities—we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <CTAButton variant="primary" text="book a demo" />
              <CTAButton variant="secondary" text="start free trial" />
            </div>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Get in touch</h2>
            <p className="body-large max-w-2xl mx-auto">
              Choose the best way to reach us based on what you need.
            </p>
          </div>
          
          <div className="grid-features">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="card-feature">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="heading-4 mb-3">{method.title}</h3>
                  <p className="body-text mb-4">{method.description}</p>
                  <div className="mb-4">
                    <a 
                      href={`mailto:${method.email}`}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      {method.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Clock className="w-4 h-4" />
                    <span>{method.responseTime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our office</h2>
            <p className="body-large max-w-2xl mx-auto">
              While we're a remote-first company, we maintain a registered office for official correspondence.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="heading-4 mb-2">NEO14 Technologies</h3>
                  <div className="body-text space-y-1">
                    <p>651 N Broad St, Suite 201</p>
                    <p>Middletown, DE 19709</p>
                    <p className="text-muted text-sm mt-2">
                      * This is our registered business address. For all inquiries, please use the email contacts above.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Quick answers</h2>
            <p className="body-large max-w-2xl mx-auto">
              Looking for something specific? These links might help you find what you need faster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Product questions</h4>
                <p className="body-text mb-4">
                  Features, pricing, security, and technical specifications.
                </p>
                <div className="space-y-2">
                  <CTALink href="/pricing" text="View pricing plans" />
                  <br />
                  <CTALink href="/security" text="Security overview" />
                  <br />
                  <CTALink href="/docs" text="Product documentation" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Company information</h4>
                <p className="body-text mb-4">
                  About NEO14, careers, and partnership opportunities.
                </p>
                <div className="space-y-2">
                  <CTALink href="/company/about" text="Our story" />
                  <br />
                  <CTALink href="/company/careers" text="Open positions" />
                  <br />
                  <CTALink href="/solutions" text="Enterprise solutions" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to get started?</h2>
            <p className="body-large mb-8">
              The best way to understand Cospace is to see it in action. Book a demo or start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <CTAButton variant="primary" text="book a demo" />
              <CTAButton variant="secondary" text="start free" />
            </div>
            <p className="body-text">
              <CTALink href="/pricing" text="View pricing" /> • <CTALink href="/company/careers" text="Join our team" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
