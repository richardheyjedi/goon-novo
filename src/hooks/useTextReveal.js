import { useLayoutEffect } from 'react';
import { gsap } from '../lib/gsapConfig';

/**
 * Reusable hook to reveal text characters or words dynamically on mount or scroll.
 * 
 * @param {React.RefObject} ref The element target ref to split and animate.
 * @param {Object} options Configuration parameters.
 * @param {string} options.type Split text behavior ('words' | 'chars'). Default: 'words'.
 * @param {number} options.stagger Easing cascade duration delay. Default: 0.03.
 * @param {number} options.delay Animation start delay. Default: 0.
 * @param {number} options.y Vertial translation offset. Default: 30.
 * @param {number} options.blur Initial filter blur radius in pixels. Default: 10.
 * @param {Object} options.scrollTrigger ScrollTrigger config override, if any.
 */
export function useTextReveal(ref, options = {}) {
  const {
    type = 'words',
    stagger = 0.03,
    delay = 0,
    y = 30,
    blur = 10,
    glow = false,
    trigger = null,
    scrollTrigger = null,
  } = options;

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Acessibility: check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const originalText = element.textContent.trim();
    
    // Set accessibility attributes
    element.setAttribute('aria-label', originalText);
    element.innerHTML = '';
    
    const targets = [];
    
    if (type === 'words') {
      const words = originalText.split(/\s+/);
      words.forEach((word, idx) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';
        wordSpan.setAttribute('aria-hidden', 'true');
        wordSpan.textContent = word;
        
        element.appendChild(wordSpan);
        targets.push(wordSpan);
        
        if (idx < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
      });
    } else {
      const chars = originalText.split('');
      chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.style.display = 'inline-block';
        if (char === ' ') {
          charSpan.innerHTML = '&nbsp;';
        } else {
          charSpan.textContent = char;
        }
        charSpan.setAttribute('aria-hidden', 'true');
        element.appendChild(charSpan);
        targets.push(charSpan);
      });
    }

    // Configure initial positions
    gsap.set(targets, {
      opacity: 0,
      y: y,
      filter: `blur(${blur}px)`,
      textShadow: glow ? '0 0 0px rgba(199, 249, 0, 0)' : 'none',
    });

    const ctx = gsap.context(() => {
      const animParams = {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        textShadow: glow ? '0 0 20px rgba(199, 249, 0, 0.45)' : 'none',
        stagger: stagger,
        delay: delay,
        ease: 'power3.out',
        duration: 1,
        onStart: () => {
          gsap.set(targets, { willChange: 'transform, opacity, filter' });
        },
        onComplete: () => {
          gsap.set(targets, { clearProps: 'willChange' });
        },
      };

      if (scrollTrigger) {
        animParams.scrollTrigger = {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...scrollTrigger,
        };
      }

      gsap.to(targets, animParams);
    }, element);

    return () => {
      ctx.revert();
      element.innerHTML = originalText;
    };
  }, [ref, type, stagger, delay, y, blur, scrollTrigger, trigger]);
}
