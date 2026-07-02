import { useLayoutEffect } from 'react';
import { gsap } from '../lib/gsapConfig';

/**
 * Custom hook to apply vertical parallax scrolling effects to an element.
 * 
 * @param {React.RefObject} ref The element target ref.
 * @param {number} speed Scroll offset intensity speed factor. Default: 80.
 */
export function useParallax(ref, speed = 80) {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [ref, speed]);
}
