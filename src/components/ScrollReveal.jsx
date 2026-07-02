import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from '../lib/gsapConfig';

/**
 * Reusable animation wrapper that reveals its child elements on scroll.
 */
export default function ScrollReveal({
  children,
  stagger = 0.15,
  delay = 0,
  y = 35,
  blur = 6,
  start = 'top 85%',
  once = true,
  toggleActions = 'play none none reverse',
  className = '',
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animElements = Array.from(container.children);
    if (animElements.length === 0) return;

    // Set initial states to avoid flicker (FOUC)
    gsap.set(animElements, {
      opacity: 0,
      y: y,
      filter: blur ? `blur(${blur}px)` : 'none',
    });

    const ctx = gsap.context(() => {
      gsap.to(animElements, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: stagger,
        delay: delay,
        duration: 0.8,
        ease: 'power3.out',
        onStart: () => {
          gsap.set(animElements, { willChange: 'transform, opacity, filter' });
        },
        onComplete: () => {
          gsap.set(animElements, { clearProps: 'willChange' });
        },
        scrollTrigger: {
          trigger: container,
          start: start,
          toggleActions: once ? 'play none none none' : toggleActions,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [stagger, delay, y, blur, start, once, toggleActions]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
