import { Heart, Users, Globe, Lightbulb, Code, Shield, Palette, Settings } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function CareersPage() {
  const openRoles = [
    {
      title: "Product Engineer",
      team: "Engineering",
      location: "Remote",
      description: "Build the core features that power Cospace. Full-stack development with React, Node.js, and modern infrastructure."
    },
    {
      title: "Security Engineer", 
      team: "Engineering",
      location: "Remote",
      description: "Ensure our platform meets the highest security standards. Experience with encryption, compliance, and threat modeling required."
    },
    {
      title: "Product Designer",
      team: "Design", 
      location: "Remote",
      description: "Shape the user experience across our platform. Create intuitive interfaces that make complex workflows feel simple."
    },
    {
      title: "Solutions Architect",
      team: "Customer Success",
      location: "Remote",
      description: "Help enterprise customers implement Cospace successfully. Technical consulting and solution design expertise required."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Build the future of <span className="gradient-text">work with us</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              We hire globally, remote‑friendly. Join our team of engineers, designers, and architects 
              who are creating the tools that will define how teams collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <CTAButton variant="primary" text="view open roles" />
              <CTAButton variant="secondary" text="learn about our culture" />
            </div>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our values</h2>
            <p className="body-large max-w-2xl mx-auto">
              The principles that guide how we work together and the standards we hold ourselves to.
            </p>
          </div>
          
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Ownership</h3>
              <p className="body-text">
                Take responsibility for outcomes, not just tasks. We build with pride and ship with confidence, 
                knowing our work directly impacts thousands of teams.
              </p>
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Clarity</h3>
              <p className="body-text">
                Clear communication leads to better products. We say what we mean, document our decisions, 
                and build what makes sense for our users.
              </p>
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Security</h3>
              <p className="body-text">
                Privacy and security aren't features—they're foundations. We protect user data like it's our own 
                and build trust through transparency.
              </p>
            </div>
            
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Customer empathy</h3>
              <p className="body-text">
                We build for real problems, not theoretical ones. Understanding our users' pain points 
                and workflows drives every product decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Working at NEO14 */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Working at NEO14</h2>
            <p className="body-large max-w-2xl mx-auto">
              What it's like to be part of our remote-first team building the next generation of workplace tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Remote-first, always</h4>
                <p className="body-text">
                  We've been distributed from day one. Flexible hours, async communication, and the freedom 
                  to work from anywhere that sparks your creativity.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Growth mindset</h4>
                <p className="body-text">
                  We invest in your learning and development. Conference budgets, book allowances, 
                  and time set aside for skill development and side projects.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Meaningful impact</h4>
                <p className="body-text">
                  Your work directly shapes how thousands of teams collaborate. Small team means big influence 
                  on product direction and company culture.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Competitive benefits</h4>
                <p className="body-text">
                  Comprehensive health coverage, equity participation, unlimited PTO, and a home office setup budget 
                  to create your ideal workspace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Open roles</h2>
            <p className="body-large max-w-2xl mx-auto">
              Join our growing team and help shape the future of team collaboration.
            </p>
          </div>
          
          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <div key={index} className="card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      {role.team === "Engineering" && <Code className="w-5 h-5 text-accent" />}
                      {role.team === "Design" && <Palette className="w-5 h-5 text-accent" />}
                      {role.team === "Customer Success" && <Settings className="w-5 h-5 text-accent" />}
                      <h3 className="heading-4">{role.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted mb-3">
                      <span>{role.team}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {role.location}
                      </span>
                    </div>
                    <p className="body-text max-w-2xl">{role.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <CTAButton variant="primary" text="apply now" className="w-full md:w-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="body-text mb-4">
              Don't see a role that fits? We're always interested in hearing from talented people.
            </p>
            <CTALink href="/company/contact" text="Get in touch anyway" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to join us?</h2>
            <p className="body-large mb-8">
              Be part of a team that's reimagining how work gets done. We're looking for people who want to build 
              something meaningful and have the skills to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <CTAButton variant="primary" text="view all openings" />
              <CTAButton variant="secondary" text="learn about our culture" />
            </div>
            <p className="body-text">
              <CTALink href="/company/about" text="Read our story" /> • <CTALink href="/company/contact" text="Questions? Get in touch" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
