'use client';

import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import CTAButton from './CTAButton';
import { useState, useRef, useEffect } from 'react';

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

interface PricingData {
  categories: any[];
  tiers: Tier[];
  features: Feature[];
}

interface PricingCardsProps {
  pricing: PricingData;
}

export default function PricingCards({ pricing }: PricingCardsProps) {
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);
  const pricingContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Ensure hydration is complete before rendering interactive elements
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Click and drag horizontal scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!pricingContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - pricingContainerRef.current.offsetLeft);
    setScrollLeft(pricingContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !pricingContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - pricingContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    pricingContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const toggleTierExpansion = (tierSlug: string) => {
    const isCurrentlyExpanded = expandedTiers.has(tierSlug);
    
    setExpandedTiers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tierSlug)) {
        newSet.delete(tierSlug);
      } else {
        newSet.add(tierSlug);
      }
      return newSet;
    });

    // If collapsing (showing less), scroll to the card smoothly
    if (isCurrentlyExpanded) {
      // Find the card element and scroll to it
      setTimeout(() => {
        const cardElement = document.querySelector(`[data-tier-slug="${tierSlug}"]`);
        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 100); // Small delay to allow the collapse animation to start
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={pricingContainerRef}
        className={`flex gap-8 px-4 md:px-8 overflow-x-auto scrollbar-hide items-stretch ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {pricing.tiers.sort((a, b) => a.order - b.order).map((tier) => {
          // Get current tier index for comparison
          const currentTierIndex = pricing.tiers.findIndex(t => t.slug === tier.slug);
          
          // Get ALL features for this tier with custom ordering
          const allTierFeatures = pricing.features.map(feature => {
            const tierStatus = feature.tierStatus.find(ts => ts.tierSlug === tier.slug);
            const isEnabled = tierStatus ? tierStatus.status === 1 : false;
            
            // Check if this feature was disabled in previous tiers but enabled in current tier
            let isNewlyAvailable = false;
            if (isEnabled && currentTierIndex > 0) {
              const previousTier = pricing.tiers[currentTierIndex - 1];
              const previousTierStatus = feature.tierStatus.find(ts => ts.tierSlug === previousTier.slug);
              const wasDisabledInPrevious = previousTierStatus ? previousTierStatus.status === -1 : true;
              isNewlyAvailable = wasDisabledInPrevious;
            }
            
            return {
              ...feature,
              isEnabled,
              isNewlyAvailable
            };
          }).sort((a, b) => {
            // First sort by newly available features (highest priority)
            if (a.isNewlyAvailable && !b.isNewlyAvailable) return -1;
            if (!a.isNewlyAvailable && b.isNewlyAvailable) return 1;
            
            // Then sort by enabled vs disabled
            if (a.isEnabled && !b.isEnabled) return -1;
            if (!a.isEnabled && b.isEnabled) return 1;
            
            // Finally sort by original order
            return a.order - b.order;
          });
          
          // Separate enabled and disabled features
          const enabledFeatures = allTierFeatures.filter(feature => feature.isEnabled);
          const disabledFeatures = allTierFeatures.filter(feature => !feature.isEnabled);
          
          // Show first 7 enabled features initially
          const initialFeatures = enabledFeatures.slice(0, 7);
          const additionalEnabledFeatures = enabledFeatures.slice(7);
          
          // Include disabled features in additional features
          const additionalFeatures = [...additionalEnabledFeatures, ...disabledFeatures];
          
          const isExpanded = expandedTiers.has(tier.slug);
          const hasMoreFeatures = additionalFeatures.length > 0;
          
          return (
            <div 
              key={tier.slug} 
              data-tier-slug={tier.slug}
              className="flex-shrink-0 w-80 flex flex-col h-full"
            >
              <div className={`card flex flex-col border h-full ${tier.isPopular ? 'border-accent/20 relative' : 'border-foreground/10'}`}>
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="pricing-badge px-3 py-1 rounded-full text-sm font-medium">Most popular</span>
                  </div>
                )}
                
                <div className="flex flex-col h-full">
                  {/* Header */}
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
                  
                  {/* Features - This section will grow to fill available space */}
                  <div className="space-y-3 mb-8 flex-grow">
                    {initialFeatures.map((feature) => (
                      <div key={feature.name} className="flex items-center gap-3">
                        {feature.isEnabled ? (
                          <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted flex-shrink-0" />
                        )}
                        <span className={`body-text ${feature.isEnabled ? '' : 'text-muted'}`}>{feature.name}</span>
                      </div>
                    ))}
                    
                    {/* Additional features with dropdown */}
                    {hasMoreFeatures && (
                      <details 
                        {...(isHydrated && { open: isExpanded })}
                        className="group"
                        onToggle={(e) => {
                          if (e.currentTarget.open !== isExpanded) {
                            toggleTierExpansion(tier.slug);
                          }
                        }}
                      >
                        <summary className="flex items-center gap-3 cursor-pointer list-none">
                          <ChevronDown className="w-5 h-5 text-accent transition-transform duration-200 group-open:rotate-180" />
                          <span className="body-text text-accent">
                            {isExpanded ? 'Show less' : `+${additionalEnabledFeatures.length} more features`}
                          </span>
                        </summary>
                        <div className="faq-content">
                          <div className="space-y-3">
                            {additionalFeatures.map((feature) => (
                              <div key={feature.name} className="flex items-center gap-3">
                                {feature.isEnabled ? (
                                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                                ) : (
                                  <X className="w-5 h-5 text-muted flex-shrink-0" />
                                )}
                                <span className={`body-text ${feature.isEnabled ? '' : 'text-muted'}`}>{feature.name}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Close button */}
                          <div className="mt-4 pt-3 border-t border-border">
                            <button
                              onClick={() => toggleTierExpansion(tier.slug)}
                              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                            >
                              <ChevronUp className="w-4 h-4" />
                              <span className="body-small">Show less</span>
                            </button>
                          </div>
                        </div>
                      </details>
                    )}
                  </div>
                  
                  {/* CTA Button - Always positioned at bottom */}
                  <div className="mt-auto">
                    <CTAButton 
                      variant={tier.isPopular ? 'primary' : 'secondary'} 
                      text="get started" 
                      className="w-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
