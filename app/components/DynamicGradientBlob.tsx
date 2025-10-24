'use client';

import { useEffect, useRef, useState } from 'react';

interface BlobPosition {
  x: number;
  y: number;
  scale: number;
  intensity: number;
}

interface DynamicGradientBlobProps {
  /**
   * CSS selector for target elements. Elements matching this selector will attract the blob.
   * Only actual HTML elements (img, button, h1-h6, etc.) are tracked, not generic divs.
   */
  targetSelector?: string;
  
  /**
   * Enable mouse tracking mode - blob follows cursor
   */
  followMouse?: boolean;
  
  /**
   * Sensitivity to viewport intersection (0-1). Higher = more weight to elements in view
   */
  intersectionWeight?: number;
  
  /**
   * Animation smoothness (in milliseconds)
   */
  smoothness?: number;
  
  /**
   * Base blur amount in pixels
   */
  blurAmount?: number;
  
  /**
   * Container ref to constrain blob movement
   */
  containerRef?: React.RefObject<HTMLElement>;
  
  /**
   * Callback to receive debug information
   */
  onDebugInfo?: (info: { x: number; y: number; scale: number; rotation: number }) => void;
  
  /**
   * Default weight multiplier for all tracked elements (overrides data-blob-weight when not set)
   */
  defaultWeight?: number;
}

export default function DynamicGradientBlob({
  targetSelector = 'img, button, h1, h2, h3, h4, h5, h6, [data-blob-image]',
  followMouse = false,
  intersectionWeight = 0.7,
  smoothness = 1000,
  blurAmount = 40,
  containerRef,
  onDebugInfo,
  defaultWeight = 1,
}: DynamicGradientBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<BlobPosition>({
    x: 50,
    y: 40,
    scale: 1,
    intensity: 1,
  });
  const [isClient, setIsClient] = useState(false);
  const [debugInfo, setDebugInfo] = useState<{
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
  }>({
    trackedElements: [],
    blobPosition: { x: 50, y: 40, scale: 1, intensity: 1 },
    totalWeight: 0,
    maxIntersection: 0,
  });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const container = containerRef?.current || document.documentElement;
    
    // Wait for elements to be available, with retry mechanism
    const initializeTracking = () => {
      const targets = container.querySelectorAll<HTMLElement>(targetSelector);
      
      if (targets.length === 0 && !followMouse) {
        // Update debug info to show no targets found
        // Calculate default position accounting for navbar height
        const defaultY = container ? 40 + (container.getBoundingClientRect().top / window.innerHeight) * 100 : 40;
        setDebugInfo({
          trackedElements: [],
          blobPosition: { x: 50, y: defaultY, scale: 0.7, intensity: 0.5 },
          totalWeight: 0,
          maxIntersection: 0,
        });
        onDebugInfo?.({
          x: 50,
          y: defaultY,
          scale: 0.7,
          rotation: 0,
        });
        // Retry after a delay
        setTimeout(initializeTracking, 500);
        return;
      }
      startTracking(targets);
    };

    const startTracking = (targets: NodeListOf<HTMLElement>) => {

      // Set up intersection observer for target elements
      const observerMap = new Map<Element, number>();
    
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            observerMap.set(entry.target, entry.intersectionRatio);
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      targets.forEach((target) => {
        intersectionObserver.observe(target);
        observerMap.set(target, 0);
      });

      // Mouse move handler for follow mode
      const handleMouseMove = (e: MouseEvent) => {
        if (!followMouse) return;
        
        const rect = container.getBoundingClientRect();
        mousePositionRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      };

      if (followMouse) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      }

      // Calculate weighted center of gravity
      const calculateBlobPosition = () => {
      if (followMouse) {
        const mouse = mousePositionRef.current;
        setPosition({
          x: mouse.x * 100,
          y: mouse.y * 100,
          scale: 1.2,
          intensity: 1.3,
        });
        return;
      }

      let totalWeight = 0;
      let weightedX = 0;
      let weightedY = 0;
      let maxIntersection = 0;

      const containerRect = container.getBoundingClientRect();

      const trackedElements: Array<{
        tagName: string;
        className: string;
        id: string;
        weight: number;
        intersectionRatio: number;
        area: number;
        centerX: number;
        centerY: number;
        isVisible: boolean;
      }> = [];

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const intersectionRatio = observerMap.get(target) || 0;
        
        // Skip generic divs - only track actual HTML elements
        const tagName = target.tagName.toLowerCase();
        const isGenericDiv = tagName === 'div' && !target.hasAttribute('data-blob-weight');
        
        // Skip elements that are inside the navbar/header
        const isInNavbar = target.closest('header') || target.closest('nav') || target.closest('[role="menu"]') || target.closest('[role="dialog"]');
        
        if (isGenericDiv || isInNavbar) {
          return; // Skip this element
        }
        
        // Calculate element area as a weight factor
        const area = rect.width * rect.height;
        const areaWeight = Math.min(area / (containerRect.width * containerRect.height), 1);
        
        // Get custom weight from data attribute, fallback to defaultWeight
        const customWeight = parseFloat(target.getAttribute('data-blob-weight') || defaultWeight.toString());
        
        // Calculate element center relative to container
        const centerX = (rect.left + rect.width / 2 - containerRect.left) / containerRect.width;
        
        // For Y coordinate, we need to account for the fact that the blob is rendered
        // in a fixed overlay that starts from the top of the viewport, while coordinates
        // are calculated relative to the main container which starts below the navbar
        const elementCenterY = rect.top + rect.height / 2;
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        
        // Calculate relative position within the main container
        const relativeY = (elementCenterY - containerTop) / containerHeight;
        
        // Convert to viewport coordinates by adding the navbar offset
        const navbarHeight = containerTop; // This is the distance from viewport top to main container top
        const viewportHeight = window.innerHeight;
        const centerY = (elementCenterY) / viewportHeight;
        
        // Combined weight: intersection × area × custom weight
        const weight = Math.pow(intersectionRatio, intersectionWeight) * areaWeight * customWeight;
        
        // Add to debug info
        trackedElements.push({
          tagName: target.tagName,
          className: target.className || '',
          id: target.id || '',
          weight,
          intersectionRatio,
          area: Math.round(area),
          centerX: Math.round(centerX * 100) / 100,
          centerY: Math.round(centerY * 100) / 100,
          isVisible: intersectionRatio > 0.1,
        });
        
        weightedX += centerX * weight;
        weightedY += centerY * weight;
        totalWeight += weight;
        maxIntersection = Math.max(maxIntersection, intersectionRatio);
      });

      // Default position should account for navbar height
      // Since the blob is in a fixed overlay, we need viewport-relative coordinates
      const defaultY = 40 + (containerRect.top / window.innerHeight) * 100;
      let blobPosition = { x: 50, y: defaultY, scale: 0.7, intensity: 0.5 };
      
      if (totalWeight > 0) {
        const targetX = (weightedX / totalWeight) * 100;
        const targetY = (weightedY / totalWeight) * 100;
        
        // Scale and intensity based on total weight
        const scale = 0.8 + (Math.min(totalWeight, 1) * 0.6);
        const intensity = 0.7 + (maxIntersection * 0.8);
        
        blobPosition = {
          x: targetX,
          y: targetY,
          scale,
          intensity,
        };
        
        setPosition(blobPosition);
      } else {
        // Default position when no targets are in view
        setPosition(blobPosition);
      }

      // Update debug info
      const newDebugInfo = {
        trackedElements: trackedElements.sort((a, b) => b.weight - a.weight), // Sort by weight descending
        blobPosition,
        totalWeight: Math.round(totalWeight * 100) / 100,
        maxIntersection: Math.round(maxIntersection * 100) / 100,
      };
      
      setDebugInfo(newDebugInfo);
        onDebugInfo?.({
          x: blobPosition.x,
          y: blobPosition.y,
          scale: blobPosition.scale,
          rotation: 0,
        });
      };

      // Animation loop
      const animate = () => {
        calculateBlobPosition();
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        intersectionObserver.disconnect();
        if (followMouse) {
          window.removeEventListener('mousemove', handleMouseMove);
        }
      };
    };

    // Start initialization with a small delay to ensure DOM is ready
    setTimeout(initializeTracking, 100);
  }, [isClient, targetSelector, followMouse, intersectionWeight, containerRef, defaultWeight]);

  // Don't render anything if not client-side
  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={blobRef}
      className="dynamic-gradient-blob"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${position.scale})`,
        opacity: debugInfo.trackedElements.length > 0 ? position.intensity * 0.8 : 0,
        filter: `blur(${blurAmount}px)`,
        transition: `all ${smoothness}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
      aria-hidden="true"
    />
  );
}

