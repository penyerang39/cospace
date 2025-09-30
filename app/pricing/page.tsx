'use client';

import * as React from 'react';
import { Check, X, ArrowRight, Users, HardDrive, Video, Database, Shield, Zap, ChevronDown } from "lucide-react";
import CTAButton from "../components/CTAButton";

export default function PricingPage() {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes core chat, file sharing, basic documents, and dashboards for up to 5 users with 5GB storage. Perfect for small teams to get started."
    },
    {
      question: "Do you offer discounts for nonprofits and education?",
      answer: "Yes, we offer special pricing for qualified nonprofit organizations and educational institutions. Contact our sales team for details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, ACH transfers, and can work with purchase orders for Enterprise customers."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-[80vh] flex items-center">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Simple plans that <span className="gradient-text">scale with you</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Choose the plan that fits your team. All plans include our core collaboration features with transparent, usage-based pricing.
            </p>
            <p className="body-text mb-12">
              Annual discount ~20% • Monthly billing available • Nonprofit & education discounts on request
            </p>
            <div className="max-w-2xl mx-auto p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="body-small text-muted-foreground text-center">
                Pricing is tailored to your company size, deployment type, and use case. As a guideline, most Cospace clients invest between $12–$60 per user/month, depending on configuration. For enterprises and white-label partners, we provide custom plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="card flex flex-col justify-between">
              <div>
              <div className="mb-6">
                <h3 className="heading-4 mb-2">Free</h3>
                <div className="mb-4 justify-between">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted"> forever</span>
                </div>
                <p className="body-small text-muted">Perfect for small teams getting started</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Up to 5 users</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">5 GB storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Core chat & docs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Basic dashboards</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-muted flex-shrink-0" />
                  <span className="body-text text-muted">Video meetings</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-muted flex-shrink-0" />
                  <span className="body-text text-muted">AppBuilder</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="secondary" text="get started" className="w-full" />
            </div>

            {/* Pro Plan */}
            <div className="card border-accent/20 relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">Most popular</span>
              </div>
              
              <div>
              <div className="mb-6">
                <h3 className="heading-4 mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$9</span>
                  <span className="text-muted">/user/month</span>
                </div>
                <p className="body-small text-muted">For growing teams that need more features</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Unlimited users</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">100 GB storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Meetings & Huddles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">AppBuilder (standard)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Data refresh hourly</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Guest access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Basic SSO</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="primary" text="get started" className="w-full" />
            </div>

            {/* Business Plan */}
            <div className="card flex flex-col justify-between">
              <div>
              <div className="mb-6">
                <h3 className="heading-4 mb-2">Business</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$18</span>
                  <span className="text-muted">/user/month</span>
                </div>
                <p className="body-small text-muted">For teams that need advanced security & controls</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">1 TB storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Advanced AppBuilder</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Database connectors</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">Data refresh 5-min</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">SSO/SAML</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">SCIM & Audit logs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="body-text">DLP & BYOK (add-on)</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="primary" text="get started" className="w-full" />
            </div>

            {/* Enterprise Plan */}
            <div className="card flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="heading-4 mb-2">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                  <p className="body-small text-muted">For organizations with complex requirements</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Enterprise security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">BYOK encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Private cloud/VPC</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">EU/US data residency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Uptime SLA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Dedicated support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Custom onboarding</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="primary" text="request pricing" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Compare all features</h2>
            <p className="body-large max-w-2xl mx-auto">
              See exactly what's included in each plan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Core Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="body-text">Team collaboration & chat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-4 h-4 text-accent" />
                    <span className="body-text">File storage & sharing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-accent" />
                    <span className="body-text">Video meetings (Pro+)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Advanced Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-accent" />
                    <span className="body-text">Database connections (Business+)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="body-text">SSO/SAML (Pro+)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="body-text">Real-time data refresh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Frequently asked questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h4 className="heading-4">{faq.question}</h4>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="body-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to get started?</h2>
            <p className="body-large mb-8">
              Start with our free plan or book a demo to see how Cospace can transform your team's workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="request pricing" />
              <CTAButton variant="secondary" text="talk to sales" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


