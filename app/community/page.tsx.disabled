import { Users, MessageCircle, Calendar, BookOpen, Lightbulb, Star, ArrowRight } from "lucide-react";
import CTAButton from "../components/CTAButton";
import CTALink from "../components/CTALink";
import PageMain from "../components/PageMain";

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <PageMain
        title={<><span className="gradient-text">Build better workflows</span> with others</>}
        subtitle={
          <>
            Join thousands of teams sharing tips, templates, and best practices. Get inspired, get help, and help others succeed.
          </>
        }
      />

      {/* Community Features */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">What you'll find in our community</h2>
            <p className="body-large max-w-2xl mx-auto">
              A vibrant ecosystem of users sharing knowledge, templates, and best practices.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Discussion forum</h3>
              <p className="body-text">
                Ask questions, share tips, and connect with other Cospace users worldwide.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Templates gallery</h3>
              <p className="body-text">
                Browse and share workflow templates for every team and use case.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Release notes & roadmap</h3>
              <p className="body-text">
                Stay updated on new features and influence our product direction.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Events & webinars</h3>
              <p className="body-text">
                Join live sessions, workshops, and networking events with fellow users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="heading-3 mb-4">Popular discussions</h3>
              <p className="body-text mb-6">
                Learn from real users sharing their workflows, challenges, and solutions. Our community has answers to your questions.
              </p>
              <div className="space-y-4">
                <div className="card">
                  <div className="accent-border pl-4">
                    <h4 className="heading-4 mb-2">How we use AppBuilder for HR workflows</h4>
                    <p className="body-small text-muted">Sarah M. • 142 replies • Marketing Team Lead</p>
                  </div>
                </div>
                <div className="card">
                  <div className="accent-border pl-4">
                    <h4 className="heading-4 mb-2">Best practices for data dashboard design</h4>
                    <p className="body-small text-muted">Mike R. • 89 replies • Data Analyst</p>
                  </div>
                </div>
                <div className="card">
                  <div className="accent-border pl-4">
                    <h4 className="heading-4 mb-2">Setting up SSO for government compliance</h4>
                    <p className="body-small text-muted">Jennifer L. • 67 replies • IT Director</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="heading-3 mb-4">Featured templates</h3>
              <p className="body-text mb-6">
                Jump-start your workflows with templates created and refined by the community.
              </p>
              <div className="space-y-4">
                <div className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="heading-4">Sprint Planning Template</span>
                  </div>
                  <p className="body-text mb-3">Complete Agile sprint planning workflow with backlog grooming and retrospectives.</p>
                  <div className="flex items-center gap-4">
                    <span className="body-small text-accent">1,240 downloads</span>
                    <CTALink href="#" text="Use template" />
                  </div>
                </div>
                <div className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    <span className="heading-4">Campaign Planning Kit</span>
                  </div>
                  <p className="body-text mb-3">End-to-end marketing campaign planning with creative briefs and approval workflows.</p>
                  <div className="flex items-center gap-4">
                    <span className="body-small text-accent">890 downloads</span>
                    <CTALink href="#" text="Use template" />
                  </div>
                </div>
                <div className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-accent" />
                    <span className="heading-4">Design System Starter</span>
                  </div>
                  <p className="body-text mb-3">Component library documentation and design token management system.</p>
                  <div className="flex items-center gap-4">
                    <span className="body-small text-accent">675 downloads</span>
                    <CTALink href="#" text="Use template" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Upcoming events</h2>
            <p className="body-large max-w-2xl mx-auto">
              Join live sessions and connect with fellow Cospace users.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">AppBuilder Workshop</h4>
                <p className="body-text mb-3">Build your first internal tool in 30 minutes with our experts.</p>
                <p className="body-small text-muted mb-3">March 15, 2024 • 2:00 PM EST</p>
                <CTALink href="#" text="Register free" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Data Dashboard Best Practices</h4>
                <p className="body-text mb-3">Learn visualization techniques from data experts.</p>
                <p className="body-small text-muted mb-3">March 22, 2024 • 1:00 PM EST</p>
                <CTALink href="#" text="Register free" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Security & Compliance Q&A</h4>
                <p className="body-text mb-3">Government and enterprise security questions answered.</p>
                <p className="body-small text-muted mb-3">March 29, 2024 • 3:00 PM EST</p>
                <CTALink href="#" text="Register free" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-accent/5">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">15,000+</div>
              <p className="body-text">Active members</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <p className="body-text">Shared templates</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">50+</div>
              <p className="body-text">Events per month</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
              <p className="body-text">Community support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Join the conversation</h2>
            <p className="body-large mb-8">
              Connect with thousands of teams building better workflows. Share your experience and learn from others.
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


