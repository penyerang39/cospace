'use client';

import { useEffect, useRef, useState } from 'react';

interface StickyTableHeaderProps {
  headerContent: React.ReactNode;
  bodyContent: React.ReactNode;
  topOffset?: number;
}

export default function StickyTableHeader({ headerContent, bodyContent, topOffset = 3.75 }: StickyTableHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyScrollContainerRef = useRef<HTMLDivElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const staticHeaderRef = useRef<HTMLTableSectionElement>(null);
  const stickyHeaderRef = useRef<HTMLTableSectionElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyStyles, setStickyStyles] = useState<{
    left: number;
    width: number;
    columnWidths: number[];
  }>({ left: 0, width: 0, columnWidths: [] });

  useEffect(() => {
    const observerTarget = observerTargetRef.current;
    const tableElement = tableRef.current;
    const staticHeader = staticHeaderRef.current;
    const stickyHeader = stickyHeaderRef.current;
    const containerElement = containerRef.current;
    const stickyScrollContainer = stickyScrollContainerRef.current;
    
    if (!observerTarget || !tableElement || !staticHeader || !containerElement) return;

    // Create an intersection observer for the sentinel element
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel goes out of view upward, make header sticky
        setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    observer.observe(observerTarget);

    // Sync dimensions from static header to sticky header
    const syncDimensions = () => {
      if (!staticHeader || !tableElement || !containerElement || !stickyHeader) return;
      
      // Get container position for sticky positioning
      const containerRect = containerElement.getBoundingClientRect();
      const tableRect = tableElement.getBoundingClientRect();
      
      // Get column widths from the static header (the source of truth)
      const staticCells = staticHeader.querySelectorAll('th');
      const columnWidths: number[] = [];
      
      staticCells.forEach((cell) => {
        const width = cell.getBoundingClientRect().width;
        columnWidths.push(width);
      });

      // Update sticky positioning to match container
      setStickyStyles({
        left: containerRect.left,
        width: tableRect.width,
        columnWidths
      });

      // Apply widths to sticky header cells
      if (isSticky) {
        const stickyCells = stickyHeader.querySelectorAll('th');
        stickyCells.forEach((cell, index) => {
          if (columnWidths[index]) {
            (cell as HTMLElement).style.width = `${columnWidths[index]}px`;
            (cell as HTMLElement).style.minWidth = `${columnWidths[index]}px`;
            (cell as HTMLElement).style.maxWidth = `${columnWidths[index]}px`;
          }
        });
      }
    };

    // Sync horizontal scroll between main container and sticky header
    let isScrollingStickyHeader = false;
    let isScrollingContainer = false;

    const handleContainerScroll = () => {
      if (!containerElement || !stickyScrollContainer || isScrollingStickyHeader) return;
      
      isScrollingContainer = true;
      stickyScrollContainer.scrollLeft = containerElement.scrollLeft;
      
      // Reset flag after a brief delay
      requestAnimationFrame(() => {
        isScrollingContainer = false;
      });
    };

    const handleStickyScroll = () => {
      if (!containerElement || !stickyScrollContainer || isScrollingContainer) return;
      
      isScrollingStickyHeader = true;
      containerElement.scrollLeft = stickyScrollContainer.scrollLeft;
      
      // Reset flag after a brief delay
      requestAnimationFrame(() => {
        isScrollingStickyHeader = false;
      });
    };

    // Sync dimensions whenever sticky state changes or dimensions change
    const handleUpdate = () => {
      syncDimensions();
    };

    // Initial sync with a small delay to ensure layout is settled
    setTimeout(syncDimensions, 0);
    
    // Sync on resize and scroll (vertical)
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });

    // Sync horizontal scroll
    containerElement.addEventListener('scroll', handleContainerScroll, { passive: true });
    if (stickyScrollContainer) {
      stickyScrollContainer.addEventListener('scroll', handleStickyScroll, { passive: true });
    }

    // Use ResizeObserver for more accurate tracking of the static header
    const resizeObserver = new ResizeObserver(handleUpdate);
    resizeObserver.observe(staticHeader);
    resizeObserver.observe(containerElement);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
      containerElement.removeEventListener('scroll', handleContainerScroll);
      if (stickyScrollContainer) {
        stickyScrollContainer.removeEventListener('scroll', handleStickyScroll);
      }
    };
  }, [isSticky]);

  return (
    <div ref={containerRef} className="overflow-x-auto relative">
      {/* Sentinel element for intersection observer */}
      <div ref={observerTargetRef} className="absolute top-0 h-px w-full pointer-events-none" />
      
      <table ref={tableRef} className="w-full">
        {/* Static header - always present and defines the layout */}
        <thead
          ref={staticHeaderRef}
          className={isSticky ? 'invisible' : ''}
        >
          {headerContent}
        </thead>
        
        {/* Sticky header - only visible when scrolled, conforms to static header dimensions */}
        {isSticky && (
          <div
            className="fixed left-0 right-0 z-50 bg-background shadow-lg transition-all duration-200"
            style={{
              top: `${topOffset}rem`,
            }}
          >
            <div 
              ref={stickyScrollContainerRef}
              className="overflow-x-auto"
              style={{
                paddingLeft: `${stickyStyles.left}px`,
              }}
            >
              <table style={{ width: `${stickyStyles.width}px` }}>
                <thead ref={stickyHeaderRef}>
                  {headerContent}
                </thead>
              </table>
            </div>
          </div>
        )}
        
        <tbody>
          {bodyContent}
        </tbody>
      </table>
    </div>
  );
}

