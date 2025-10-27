'use client';

import { Info } from 'lucide-react';

interface FeatureTooltipProps {
  description: string;
}

export default function FeatureTooltip({ description }: FeatureTooltipProps) {
  return (
    <div className="relative">
      <button className="p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center group">
        <Info className="w-4 h-4 text-muted hover:text-foreground focus:text-foreground transition-colors cursor-help" />
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
        {description}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
      </div>
    </div>
  );
}





