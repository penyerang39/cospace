'use client';

import { Check, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import CTAButton from './CTAButton';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
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

  // Click and drag horizontal scrolling (disabled on small screens)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!pricingContainerRef.current || window.innerWidth < 640) return; // Disable on sm and below
    
    // Don't start dragging if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"], details, summary') || target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'SUMMARY') {
      return;
    }
    
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
    if (!isDragging || !pricingContainerRef.current || window.innerWidth < 640) return; // Disable on sm and below
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
    <div className="w-full overflow-visible">
      <div 
        ref={pricingContainerRef}
        className={`flex flex-col py-5 sm:flex-row gap-8 sm:overflow-x-auto scrollbar-hide ${isDragging ? 'sm:cursor-grabbing' : 'sm:cursor-grab'} select-none`}
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
              className={`flex-shrink-0 w-full sm:w-80 flex flex-col ${tier.isPopular ? 'relative' : ''}`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="pricing-badge px-3 py-1 rounded-full text-sm font-medium">Most popular</span>
                </div>
              )}
              <div className={`card flex items-center flex-col overflow-visible border h-full ${tier.isPopular ? 'border-accent' : tier.pricePerUser === 0 ? 'border-foreground/5' : 'border-foreground/10'}`}>
                {tier.isPopular && (
                  <div className="absolute -inset-0.5 border border-accent/30 rounded-[0.875rem] pointer-events-none z-5"></div>
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
                          <Check className={`w-5 h-5 flex-shrink-0 ${tier.pricePerUser === 0 ? 'text-muted' : 'text-accent'}`} />
                        ) : (
                          <X className="w-5 h-5 text-muted flex-shrink-0" />
                        )}
                        <div className="flex items-center gap-2 flex-1">
                          <span className={`body-text ${feature.isEnabled ? '' : 'text-muted'}`}>{feature.name}</span>
                          {feature.description && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center" tabIndex={0}>
                                  <Info className="w-4 h-4 text-muted hover:text-foreground focus:text-foreground transition-colors cursor-help" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {feature.description}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
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
                          <ChevronDown className={`w-5 h-5 transition-transform duration-200 group-open:rotate-180 ${tier.pricePerUser === 0 ? 'text-muted' : 'text-accent'}`} />
                          <span className={`body-text ${tier.pricePerUser === 0 ? 'text-muted' : 'text-accent'}`}>
                            {isExpanded ? 'Show less' : `+${additionalEnabledFeatures.length} more features`}
                          </span>
                        </summary>
                        <div className="faq-content">
                          <div className="space-y-3">
                            {additionalFeatures.map((feature) => (
                              <div key={feature.name} className="flex items-center gap-3">
                                {feature.isEnabled ? (
                                  <Check className={`w-5 h-5 flex-shrink-0 ${tier.pricePerUser === 0 ? 'text-muted' : 'text-accent'}`} />
                                ) : (
                                  <X className="w-5 h-5 text-muted flex-shrink-0" />
                                )}
                                <div className="flex items-center gap-2 flex-1">
                                  <span className={`body-text ${feature.isEnabled ? '' : 'text-muted'}`}>{feature.name}</span>
                                  {feature.description && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button className="p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center" tabIndex={0}>
                                          <Info className="w-4 h-4 text-muted hover:text-foreground focus:text-foreground transition-colors cursor-help" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        {feature.description}
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Close button */}
                          <div className="mt-4 pt-3 border-t border-border">
                            <button
                              onClick={() => toggleTierExpansion(tier.slug)}
                              className={`flex items-center gap-2 transition-colors ${tier.pricePerUser === 0 ? 'text-muted hover:text-foreground' : 'text-accent hover:text-accent/80'}`}
                            >
                              <ChevronUp className="w-5 h-5" />
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
