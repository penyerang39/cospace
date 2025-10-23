import Image from "next/image";
import { Code, GitBranch, Bug, Rocket, FileText, MessageSquare, CheckCircle, Users } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function SoftwarePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Software</span> Solutions
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Roadmaps, sprints, release notes, and on-call runbooks. Link issues, PRDs, and docs to the code or service.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Key Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Ship faster, ship smarter</h2>
            <p className="body-large max-w-2xl mx-auto">
              Connect planning to execution with tools that actually help your dev team move faster.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Connected roadmaps</h3>
                <p className="body-text">
                  Link epics, user stories, and tasks to actual code commits and deployments.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Sprint planning</h3>
                <p className="body-text">
                  Plan sprints with story points, track velocity, and adapt based on real data.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Bug className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Issue tracking</h3>
                <p className="body-text">
                  Track bugs and feature requests with context from code, logs, and user reports.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Release management</h3>
                <p className="body-text">
                  Automated release notes, deployment tracking, and incident runbooks.
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
              <h3 className="heading-3 mb-4">Documentation that stays current</h3>
              <p className="body-text mb-6">
                Technical docs, API specs, and runbooks that automatically update with your code. No more outdated documentation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="body-text">API docs from code comments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-accent" />
                  <span className="body-text">Architecture decision records</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bug className="w-5 h-5 text-accent" />
                  <span className="body-text">Incident response runbooks</span>
                </div>
              </div>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/Picture5.png"
                  alt="Documentation interface"
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
                    src="/product/Picture6.png"
                    alt="Release planning dashboard"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Release planning made simple</h3>
              <p className="body-text mb-6">
                Plan releases with automatic dependency mapping, track progress in real-time, and generate release notes from commit messages.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-accent" />
                  <span className="body-text">Automated release notes</span>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="w-5 h-5 text-accent" />
                  <span className="body-text">Dependency tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="body-text">Feature flag management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">How dev teams use Cospace</h2>
            <p className="body-large max-w-2xl mx-auto">
              From startups to enterprise, see how engineering teams stay organized.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Agile planning</h4>
                <p className="body-text mb-4">
                  Sprint planning, backlog grooming, and velocity tracking with real-time updates.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Incident response</h4>
                <p className="body-text mb-4">
                  On-call runbooks, incident tracking, and post-mortem documentation.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">API documentation</h4>
                <p className="body-text mb-4">
                  Auto-generated docs from code with examples and testing tools.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Integrates with your dev stack</h2>
            <p className="body-large max-w-2xl mx-auto">
              Connect GitHub, Jira, CI/CD pipelines, and monitoring tools seamlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Code integration</h4>
                <p className="body-text">
                  Sync with GitHub, GitLab, and Bitbucket for automatic progress tracking.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Deployment tracking</h4>
                <p className="body-text">
                  Monitor deployments and connect releases to monitoring and error tracking.
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
              Reduce context switching by 70% with all your dev tools connected in one workspace.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to accelerate your dev workflow?</h2>
            <p className="body-large mb-8">
              Join engineering teams who've improved deployment frequency by 3x and reduced bugs by 40%.
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


