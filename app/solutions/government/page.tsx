import Image from "next/image";
import { Shield, Lock, FileCheck, Users, Globe, Eye, Clock, CheckCircle } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function GovernmentPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Government</span> Solutions
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Secure document exchange, private file storage, and safe communication. Fine-grained access controls, audit logs, and data residency options.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Security Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Security by design</h2>
            <p className="body-large max-w-2xl mx-auto">
              Built from the ground up to meet government security and compliance requirements.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">ATO ready</h3>
              <p className="body-text">
                FedRAMP authorized with comprehensive security documentation and controls.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">End-to-end encryption</h3>
              <p className="body-text">
                AES-256 encryption at rest and TLS 1.3 in transit with key management options.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Comprehensive auditing</h3>
              <p className="body-text">
                Detailed audit logs for all user actions, file access, and system changes.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Data sovereignty</h3>
              <p className="body-text">
                Choose US-only data residency with isolated infrastructure and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="heading-3 mb-4">Compliance made simple</h3>
              <p className="body-text mb-6">
                Meet FISMA, CJIS, ITAR, and other government requirements with built-in controls and automated reporting.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="body-text">FedRAMP Moderate ATO</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="body-text">FISMA & CJIS compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="body-text">ITAR & CUI support</span>
                </div>
              </div>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/Picture8.png"
                  alt="Compliance dashboard"
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
                    src="/product/datamodel.png"
                    alt="Access control interface"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="heading-3 mb-4">Granular access control</h3>
              <p className="body-text mb-6">
                Role-based permissions, need-to-know access, and automatic clearance level enforcement for classified information handling.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="body-text">Role-based access control (RBAC)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent" />
                  <span className="body-text">Classification level enforcement</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="body-text">Time-based access controls</span>
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
            <h2 className="heading-2 mb-4">Government use cases</h2>
            <p className="body-large max-w-2xl mx-auto">
              Secure collaboration solutions for every level of government.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Classified projects</h4>
                <p className="body-text mb-4">
                  Secure document sharing and collaboration for classified and controlled information.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Inter-agency coordination</h4>
                <p className="body-text mb-4">
                  Secure communication and file sharing between agencies and contractors.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Public services</h4>
                <p className="body-text mb-4">
                  Citizen portals, case management, and internal operations with privacy protection.
                </p>
                <CTALink href="#" text="See how it works" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Flexible deployment options</h2>
            <p className="body-large max-w-2xl mx-auto">
              Cloud, on-premises, or hybrid—deploy where your security requirements demand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">FedRAMP Cloud</h4>
                <p className="body-text">
                  Fully managed FedRAMP authorized cloud service with US-only data residency.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">On-premises deployment</h4>
                <p className="body-text">
                  Install within your existing infrastructure with air-gapped network support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Callout */}
      <section className="py-12 bg-accent/5">
        <div className="max-width container-padding">
          <div className="text-center">
            <p className="body-large text-foreground font-italic">
              Accelerate your ATO process with pre-built security documentation and continuous monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready for secure government collaboration?</h2>
            <p className="body-large mb-8">
              Join government agencies who've reduced compliance overhead by 60% while improving security posture.
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


