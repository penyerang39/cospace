'use client';

import { useState, useEffect } from 'react';

interface DebugInfo {
  trackedElements: Array<{
    tagName: string;
    className: string;
    id: string;
    weight: number;
    intersectionRatio: number;
    area: number;
    centerX: number;
    centerY: number;
    isVisible: boolean;
  }>;
  blobPosition: { x: number; y: number; scale: number; intensity: number };
  totalWeight: number;
  maxIntersection: number;
}

interface BlobDebugPanelProps {
  debugInfo: DebugInfo;
}

export default function BlobDebugPanel({ debugInfo }: BlobDebugPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Toggle with Ctrl+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  const topElements = debugInfo.trackedElements.slice(0, 5);
  const visibleElements = debugInfo.trackedElements.filter(el => el.isVisible);
  const hiddenElements = debugInfo.trackedElements.filter(el => !el.isVisible);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 text-white text-xs font-mono">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-3 border-b border-white/20 cursor-pointer"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-semibold">Blob Debug Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60">Ctrl+D to toggle</span>
            <button className="text-white/60 hover:text-white">
              {isMinimized ? '▼' : '▲'}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-3 space-y-4 max-h-96 overflow-y-auto">
            {/* Blob Status */}
            <div>
              <h3 className="font-semibold mb-2 text-green-400">Blob Status</h3>
              <div className="space-y-1 text-white/80">
                <div>Position: {debugInfo.blobPosition.x.toFixed(1)}%, {debugInfo.blobPosition.y.toFixed(1)}%</div>
                <div>Scale: {debugInfo.blobPosition.scale.toFixed(2)}</div>
                <div>Intensity: {debugInfo.blobPosition.intensity.toFixed(2)}</div>
                <div>Total Weight: {debugInfo.totalWeight}</div>
                <div>Max Intersection: {debugInfo.maxIntersection}</div>
              </div>
            </div>

            {/* Top Attractors */}
            <div>
              <h3 className="font-semibold mb-2 text-yellow-400">
                Top Attractors ({topElements.length})
              </h3>
              <div className="space-y-2">
                {topElements.map((element, index) => (
                  <div 
                    key={index}
                    className={`p-2 rounded border ${
                      element.isVisible 
                        ? 'border-green-400/50 bg-green-400/10' 
                        : 'border-red-400/50 bg-red-400/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {element.tagName}
                        {element.id && `#${element.id}`}
                      </span>
                      <span className="text-yellow-400">
                        {element.weight.toFixed(3)}
                      </span>
                    </div>
                    <div className="text-white/60 text-xs mt-1">
                      <div>Area: {element.area}px²</div>
                      <div>Intersection: {(element.intersectionRatio * 100).toFixed(1)}%</div>
                      <div>Center: ({element.centerX}, {element.centerY})</div>
                      {element.className && (
                        <div className="truncate">Class: {element.className}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility Summary */}
            <div>
              <h3 className="font-semibold mb-2 text-blue-400">Visibility Summary</h3>
              <div className="space-y-1 text-white/80">
                <div className="flex justify-between">
                  <span>Visible Elements:</span>
                  <span className="text-green-400">{visibleElements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hidden Elements:</span>
                  <span className="text-red-400">{hiddenElements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Tracked:</span>
                  <span>{debugInfo.trackedElements.length}</span>
                </div>
              </div>
            </div>

            {/* Hidden Elements (if any) */}
            {hiddenElements.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-red-400">
                  Hidden Elements ({hiddenElements.length})
                </h3>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {hiddenElements.map((element, index) => (
                    <div key={index} className="text-white/60 text-xs">
                      {element.tagName}
                      {element.id && `#${element.id}`}
                      <span className="ml-2">({element.weight.toFixed(3)})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="pt-2 border-t border-white/20">
              <div className="text-white/60 text-xs">
                <div>• Scroll to see elements enter/exit viewport</div>
                <div>• Higher weight = stronger attraction</div>
                <div>• Green = visible, Red = hidden</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
