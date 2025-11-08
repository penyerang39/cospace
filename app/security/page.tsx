import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Lock, Eye, Globe, FileCheck, Users, Key, AlertTriangle } from "lucide-react";
import CTAButton from "../components/CTAButton";
import PageMain from "../components/PageMain";

export const metadata: Metadata = {
  title: "Cospace Security — Encryption, SSO, Audit Logs, BYOK",
  description: "Enterprise‑grade security and compliance, with EU/US data residency.",
  openGraph: {
    title: "Cospace Security — Encryption, SSO, Audit Logs, BYOK",
    description: "Enterprise‑grade security and compliance, with EU/US data residency.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cospace Security — Encryption, SSO, Audit Logs, BYOK",
    description: "Enterprise‑grade security and compliance, with EU/US data residency.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      <PageMain
        title={<><span className="gradient-text">Private</span> by Design</>}
        subtitle={<>Enterprise-grade security and compliance built into every layer. Your data stays protected, your team stays productive.</>}
      />

      {/* Encryption & Data Protection - image left */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/updated_data1.png" alt="Encryption and data protection visualization" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-full pl-8">
              <h3 className="heading-4 mb-3">Encryption & Data Protection</h3>
              <p className="body-text mb-4">
                <strong>AES-256 encryption at rest</strong> — Your files, messages, and data are encrypted using military-grade standards.<br/>
                <strong>TLS 1.2+ encryption in transit</strong> — All communications are secured end-to-end.<br/>
                <strong>Bring-Your-Own-Key (BYOK)</strong> — Business+ plans support customer-managed encryption keys for ultimate control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Control & Authentication - image right */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1 md:order-2">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/updated_chat.png" alt="Access control and authentication dashboard" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div className="w-full pr-8">
              <h3 className="heading-4 mb-3">Access Control & Authentication</h3>
              <p className="body-text mb-4">
                <strong>SSO/SAML integration</strong> — Connect with your existing identity provider.<br/>
                <strong>SCIM provisioning</strong> — Automated user and group management.<br/>
                <strong>Multi-Factor Authentication (MFA)</strong> — Add an extra layer of security with TOTP, SMS, or hardware keys.<br/>
                <strong>Granular role-based permissions</strong> — Control access down to individual files and conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit & Compliance - image left */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/dashboards.png" alt="Audit logs and compliance interface" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-full pl-8">
              <h3 className="heading-4 mb-3">Audit Logs & Compliance</h3>
              <p className="body-text mb-4">
                <strong>Comprehensive audit trails</strong> — Track all user actions, file access, and system changes.<br/>
                <strong>Configurable retention policies</strong> — Meet your organization's data retention requirements.<br/>
                <strong>Legal hold capabilities</strong> — Preserve data for litigation and regulatory purposes.<br/>
                <strong>GDPR & CCPA aligned</strong> — Built-in compliance with global privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Residency & Infrastructure - image right */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1 md:order-2">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/datamodel.png" alt="Global infrastructure and data residency map" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div className="w-full pr-8">
              <h3 className="heading-4 mb-3">Data Residency & Infrastructure</h3>
              <p className="body-text mb-4">
                <strong>Choose your data location</strong> — Host your data in EU or US regions to meet regulatory requirements.<br/>
                <strong>Standard Contractual Clauses (SCCs)</strong> — Compliant cross-border data transfers.<br/>
                <strong>99.95% uptime SLA</strong> — Redundant infrastructure across multiple availability zones.<br/>
                <strong>Business+ exclusive features</strong> — BYOK encryption and enhanced data sovereignty controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Testing & Monitoring - image left */}
      <section className="min-h-[80vh] flex items-stretch">
        <div className="max-width container-padding grid md:grid-cols-2 items-center gap-8 w-full">
          <div className="order-1">
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/Picture3.png" alt="Security testing and monitoring dashboard" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-full pl-8">
              <h3 className="heading-4 mb-3">Security Testing & Monitoring</h3>
              <p className="body-text mb-4">
                <strong>Regular penetration testing</strong> — Third-party security assessments conducted quarterly.<br/>
                <strong>Continuous security monitoring</strong> — 24/7 threat detection and incident response.<br/>
                <strong>Vulnerability management</strong> — Proactive identification and remediation of security issues.<br/>
                <strong>Bug bounty program</strong> — Responsible disclosure and rewards for security researchers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Resources Section */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Security Resources</h2>
            <p className="body-large max-w-2xl mx-auto">
              Access comprehensive documentation, reports, and tools to evaluate and implement our security measures.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-feature-with-gradient">
              <div className="card">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Security Documentation</h3>
                <p className="body-text mb-4">Detailed technical specifications, architecture diagrams, and implementation guides.</p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Legal & Compliance</h3>
                <p className="body-text mb-4">Data processing agreements, privacy policies, and compliance certifications.</p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h3 className="heading-4 mb-3">Security Testing</h3>
                <p className="body-text mb-4">Third-party penetration test results, vulnerability assessments, and security audits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Questions about security?</h2>
            <p className="body-large mb-8">
              Our security team is here to help. Schedule a dedicated security review or get answers to your compliance questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="get started" />
              <CTAButton variant="secondary" text="contact us" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


