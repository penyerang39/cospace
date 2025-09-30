import { Globe, Heart, Shield, Lightbulb, CheckCircle, Code, Brush, Server, Users, MapPin, Clock, ExternalLink } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function CareersPage() {
  const openRoles = [
    {
      title: "Product Engineer",
      location: "Remote (Global)",
      type: "Full-time",
      icon: Code,
      description: "Build the core features that make Cospace powerful yet simple. Full-stack development with React, TypeScript, and modern backend technologies.",
      skills: ["React/TypeScript", "Node.js/Python", "Database design", "API development"]
    },
    {
      title: "Security Engineer",
      location: "Remote (US/EU)",
      type: "Full-time", 
      icon: Shield,
      description: "Ensure Cospace meets the highest security standards. Work on encryption, compliance, threat modeling, and secure development practices.",
      skills: ["Security auditing", "Compliance (SOC2, FedRAMP)", "Cryptography", "Penetration testing"]
    },
    {
      title: "Product Designer",
      location: "Remote (Global)",
      type: "Full-time",
      icon: Brush,
      description: "Shape the user experience that makes complex workflows feel effortless. Design systems, user research, and interaction design.",
      skills: ["User research", "Design systems", "Figma/Sketch", "Prototyping"]
    },
    {
      title: "Solutions Architect",
      location: "Remote (US/EU)",
      type: "Full-time",
      icon: Server,
      description: "Help enterprise customers deploy and scale Cospace. Technical consulting, integration planning, and solution design.",
      skills: ["Enterprise architecture", "Cloud platforms", "Integration patterns", "Customer facing"]
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Join us in building the <span className="gradient-text">future of work</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              We hire globally, remote‑friendly. Our values: ownership, clarity, security, and customer empathy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CTAButton variant="primary" text="view open roles" />
              <CTAButton variant="secondary" text="learn about us" />
            </div>
            <p className="body-small">
              Building a team that's as distributed and diverse as the customers we serve.
            </p>
          </div>
        </div>
        <ScrollHint text="Open positions" />
      </section>

      {/* Values as a Team */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our values in action</h2>
            <p className="body-large max-w-2xl mx-auto">
              These aren't just words on a wall—they guide how we work, hire, and treat each other every day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Ownership</h3>
              <p className="body-text">
                We take responsibility for outcomes and see projects through. No "that's not my job" mentality—if you see something that needs fixing, you own making it better.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Clarity</h3>
              <p className="body-text">
                Clear communication and transparent processes at every level. We write things down, explain our decisions, and keep everyone in the loop.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Security</h3>
              <p className="body-text">
                Privacy and security by design, never as an afterthought. We build for the most security-conscious customers first.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Customer empathy</h3>
              <p className="body-text">
                We build solutions for real problems real teams face. Every feature starts with understanding what our customers actually need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Working at NEO14 */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="heading-2 mb-6">How we work</h2>
              <div className="space-y-4">
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Remote-first, globally distributed</h4>
                  <p className="body-text">We hire the best people regardless of location. Our team spans continents and time zones, bringing diverse perspectives to everything we build.</p>
                </div>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Async by default</h4>
                  <p className="body-text">Documentation over meetings. Written communication that lets everyone contribute their best work on their schedule, with overlap when collaboration is needed.</p>
                </div>
                <div className="accent-border pl-4">
                  <h4 className="heading-4 mb-2">Ship and iterate</h4>
                  <p className="body-text">We build in public, ship frequently, and improve based on real customer feedback. Perfect is the enemy of better—we optimize for learning and speed.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="heading-4 mb-4">What we offer</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-accent" />
                  <span className="body-text">Competitive salary + equity</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-accent" />
                  <span className="body-text">Health, dental, vision insurance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="body-text">Unlimited PTO (and we mean it)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="body-text">$2K annual learning budget</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="body-text">Home office setup stipend</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <span className="body-text">Annual team retreat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Open roles</h2>
            <p className="body-large max-w-2xl mx-auto">
              We're looking for talented individuals who want to help shape the future of collaborative work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {openRoles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="heading-4 mb-2">{role.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {role.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="body-text mb-4">{role.description}</p>
                  <div className="mb-6">
                    <p className="body-small text-muted mb-2">Key skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-accent/10 text-accent rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <CTAButton 
                    variant="primary" 
                    text="apply now" 
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <div className="card max-w-2xl mx-auto">
              <h3 className="heading-4 mb-4">Don't see your role?</h3>
              <p className="body-text mb-6">
                We're always open to exceptional talent. If you think you'd be a great fit for our team, we'd love to hear from you.
              </p>
              <CTALink href="/company/contact" text="Get in touch" />
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our hiring process</h2>
            <p className="body-large max-w-2xl mx-auto">
              We respect your time and aim to make the process as transparent and efficient as possible.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">1</span>
              </div>
              <h3 className="heading-4 mb-3">Apply</h3>
              <p className="body-text">
                Send us your resume and a brief note about why you're interested. We read every application personally.
              </p>
            </div>
            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">2</span>
              </div>
              <h3 className="heading-4 mb-3">Chat</h3>
              <p className="body-text">
                30-minute video call to get to know each other. We'll discuss the role, your background, and answer any questions.
              </p>
            </div>
            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">3</span>
              </div>
              <h3 className="heading-4 mb-3">Practical</h3>
              <p className="body-text">
                A short, paid project that reflects real work you'd do. Usually 2-4 hours, compensated at your target hourly rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to join us?</h2>
            <p className="body-large mb-8">
              Help us build the workspace that teams actually want to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="view open roles" />
              <CTAButton variant="secondary" text="learn about our culture" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
