'u`s`e client';

import { useEffect, useRef } from 'react';

export default function MovingUnderline({ containerRef }: { containerRef: React.RefObject<HTMLUListElement | null> }) {
  const barElementRef = useRef<HTMLDivElement | null>(null);
  const glowElementRef = useRef<HTMLDivElement | null>(null);

  const targetLeftRef = useRef(0);
  const targetWidthRef = useRef(0);
  const currentLeftRef = useRef(0);
  const currentWidthRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isVisibleRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const linearInterpolation = (startValue: number, endValue: number, weight: number) =>
    startValue + (endValue - startValue) * weight;

  const stepAnimation = () => {
    if (!barElementRef.current) return;

    const easingFactor = prefersReducedMotion ? 1 : 0.14;
    currentLeftRef.current = linearInterpolation(currentLeftRef.current, targetLeftRef.current, easingFactor);
    currentWidthRef.current = linearInterpolation(currentWidthRef.current, targetWidthRef.current, easingFactor);

    barElementRef.current.style.transform = `translateX(${currentLeftRef.current}px)`;
    barElementRef.current.style.width = `${currentWidthRef.current}px`;

    if (glowElementRef.current) {
      glowElementRef.current.style.transform = `translateX(${currentLeftRef.current}px)`;
      glowElementRef.current.style.width = `${currentWidthRef.current}px`;
    }

    const closeEnoughX = Math.abs(currentLeftRef.current - targetLeftRef.current) < 0.5;
    const closeEnoughWidth = Math.abs(currentWidthRef.current - targetWidthRef.current) < 0.5;

    if (!closeEnoughX || !closeEnoughWidth) {
      requestAnimationFrame(stepAnimation);
    } else {
      isAnimatingRef.current = false;
    }
  };

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const getRelativeLeft = (childRect: DOMRect) => {
      const containerRect = containerElement.getBoundingClientRect();
      return childRect.left - containerRect.left;
    };

    const setTargetFromTrigger = (triggerElement: HTMLElement) => {
      const triggerRect = triggerElement.getBoundingClientRect();
      targetLeftRef.current = Math.round(getRelativeLeft(triggerRect));
      targetWidthRef.current = Math.round(triggerRect.width);

      if (!isVisibleRef.current) {
        currentLeftRef.current = targetLeftRef.current;
        currentWidthRef.current = targetWidthRef.current;
        isVisibleRef.current = true;

        if (barElementRef.current) barElementRef.current.style.opacity = '1';
        if (glowElementRef.current) glowElementRef.current.style.opacity = '1';
      }

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        requestAnimationFrame(stepAnimation);
      }
    };

    const findTriggerElement = (event: Event) =>
      (event.target as HTMLElement).closest<HTMLElement>('[data-nav-item]');

    const handlePointerEnter = (event: Event) => {
      const triggerElement = findTriggerElement(event);
      if (triggerElement) setTargetFromTrigger(triggerElement);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const triggerElement = findTriggerElement(event);
      if (triggerElement) setTargetFromTrigger(triggerElement);
    };

    const handlePointerLeaveContainer = () => {
      isVisibleRef.current = false;
      if (barElementRef.current) barElementRef.current.style.opacity = '0';
      if (glowElementRef.current) glowElementRef.current.style.opacity = '0';
    };

    containerElement.addEventListener('pointerenter', handlePointerEnter, true);
    containerElement.addEventListener('pointermove', handlePointerMove, true);
    containerElement.addEventListener('pointerleave', handlePointerLeaveContainer, true);

    const handleResize = () => {
      if (isVisibleRef.current) requestAnimationFrame(stepAnimation);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      containerElement.removeEventListener('pointerenter', handlePointerEnter, true);
      containerElement.removeEventListener('pointermove', handlePointerMove, true);
      containerElement.removeEventListener('pointerleave', handlePointerLeaveContainer, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return (
    <>
      <div
        ref={barElementRef}
        className="pointer-events-none absolute bottom-[-1px] left-0 h-0.5 bg-accent opacity-0 transition-opacity duration-150 will-change-transform"
        style={{ zIndex: 1 }}
      />
      <div
        ref={glowElementRef}
        className="pointer-events-none absolute bottom-[-2px] left-0 h-[3px] bg-accent/40 blur-sm opacity-0 transition-opacity duration-150 will-change-transform"
        style={{ zIndex: 0 }}
      />
    </>
  );
}

