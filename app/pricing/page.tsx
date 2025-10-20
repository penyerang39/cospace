/**
 * Pricing Page - CMS Managed
 * 
 * This page dynamically renders pricing tiers, features, and categories from content/pricing.json
 * which is managed through TinaCMS at /admin when running the dev server.
 * 
 * To edit pricing data:
 * 1. Run: pnpm dev
 * 2. Navigate to: /admin
 * 3. Edit the "Pricing" collection
 * 
 * Data structure:
 * - Categories: Feature groupings (appbuilder, chat, data, collaborate, security, support)
 * - Tiers: Pricing plans with name, price, description, and order
 * - Features: Individual features with tier availability (1 = enabled, -1 = disabled)
 */

import { Check, X, ArrowRight, Users, HardDrive, Video, Database, Shield, Zap, ChevronDown } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import PageMain from '../components/PageMain';
import fs from 'fs';
import path from 'path';

interface TierStatus {
  tierSlug: string;
  status: number;
}

interface Feature {
  name: string;
  description?: string;
  category: string;
  order: number;
  tierStatus: TierStatus[];
}

interface Tier {
  name: string;
  slug: string;
  pricing: string;
  pricePerUser: number;
  userLimit?: string;
  description?: string;
  isPopular: boolean;
  order: number;
}

interface Category {
  name: string;
  slug: string;
  description?: string;
}

interface PricingData {
  categories: Category[];
  tiers: Tier[];
  features: Feature[];
}

export default async function PricingPage() {
  const pricingPath = path.join(process.cwd(), 'content', 'pricing.json');
  const pricingContent = fs.readFileSync(pricingPath, 'utf-8');
  const pricing: PricingData = JSON.parse(pricingContent);

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
      <PageMain
        title={<>Simple plans that <span className="gradient-text">scale with you</span></>}
        subtitle={
          <>
            Choose the plan that fits your team. All plans include our core collaboration features with transparent, usage-based pricing.
          </>
        }
      />

      {/* Pricing Plans */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-5 gap-8">
            {pricing.tiers.sort((a, b) => a.order - b.order).map((tier) => {
              const tierFeatures = pricing.features.filter(feature => 
                feature.tierStatus.some(ts => ts.tierSlug === tier.slug && ts.status === 1)
              ).slice(0, 7);
              
              return (
                <div 
                  key={tier.slug} 
                  className={`card flex flex-col justify-between ${tier.isPopular ? 'border-accent/20 relative' : ''}`}
                >
                  {tier.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">Most popular</span>
              </div>
                  )}
              
              <div>
              <div className="mb-6">
                      <h3 className="heading-4 mb-2">{tier.name}</h3>
                <div className="mb-4">
                        <span className="text-3xl font-bold">
                          {tier.pricePerUser === 0 ? '$0' : 
                           tier.pricePerUser === -1 ? 'Custom' : 
                           `$${tier.pricePerUser}`}
                        </span>
                        {tier.pricePerUser > 0 && <span className="text-muted">/user/month</span>}
                        {tier.pricePerUser === 0 && <span className="text-muted"> forever</span>}
                </div>
                      {tier.description && <p className="body-small text-muted">{tier.description}</p>}
                      {tier.userLimit && <p className="body-small text-muted mt-2">{tier.userLimit}</p>}
              </div>
              
              <div className="space-y-3 mb-8">
                      {tierFeatures.map((feature) => (
                        <div key={feature.name} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="body-text">{feature.name}</span>
                </div>
                      ))}
                </div>
              </div>
              
                  <CTAButton 
                    variant={tier.isPopular ? 'primary' : 'secondary'} 
                    text="get started" 
                    className="w-full" 
                  />
                </div>
              );
            })}
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
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 body-text font-semibold">Feature</th>
                  <th className="text-left py-4 px-4 body-text font-semibold">Category</th>
                  {pricing.tiers.sort((a, b) => a.order - b.order).map(tier => (
                    <th key={tier.slug} className="text-center py-4 px-4 body-text font-semibold">{tier.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricing.categories.map(category => {
                  const categoryFeatures = pricing.features.filter(f => f.category === category.slug).sort((a, b) => a.order - b.order);
                  if (categoryFeatures.length === 0) return null;
                  
                  return categoryFeatures.map((feature, idx) => (
                    <tr key={feature.name} className="border-b border-border/50 hover:bg-foreground/5">
                      <td className="py-3 px-4 body-text">{feature.name}</td>
                      <td className="py-3 px-4 body-small text-muted">{idx === 0 ? category.name : ''}</td>
                      {pricing.tiers.sort((a, b) => a.order - b.order).map(tier => {
                        const status = feature.tierStatus.find(ts => ts.tierSlug === tier.slug)?.status || -1;
                        return (
                          <td key={tier.slug} className="py-3 px-4 text-center">
                            {status === 1 ? (
                              <Check className="w-5 h-5 text-accent mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ));
                })}
              </tbody>
            </table>
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
              <details key={index} className="card group">
                <summary className="w-full flex items-center justify-between text-left cursor-pointer list-none">
                  <h4 className="heading-4">{faq.question}</h4>
                  <ChevronDown className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="faq-content">
                  <div className="pt-4 border-t border-border">
                    <p className="body-text">{faq.answer}</p>
                  </div>
                </div>
              </details>
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


