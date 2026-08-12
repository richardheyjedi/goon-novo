import { useLayoutEffect } from 'react';
import { gsap } from '../lib/gsapConfig';

/**
 * Custom hook to create a premium magnetic attract effect on buttons/interactive targets.
 * 
 * @param {React.RefObject} ref The element target ref.
 * @param {number} range Maximum cursor distance to trigger pull in pixels. Default: 50.
 * @param {number} strength Magnetic pull multiplier. Default: 0.3.
 */
export function useMagneticButton(ref, range = 50, strength = 0.3) {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !supportsHover) return;

    const xTo = gsap.quickTo(element, 'x', { duration: 0.3, ease: 'power2.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.3, ease: 'power2.out' });

    const onMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < range) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('pointermove', onMouseMove, { passive: true });
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('pointermove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [ref, range, strength]);
}
