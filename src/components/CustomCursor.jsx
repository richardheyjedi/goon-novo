import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapConfig';

/**
 * Custom dual-element cursor component that tracks the mouse with easing and scales
 * on hover of interactive elements using GSAP ticker.
 */
export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Disable custom cursor on mobile/touch interfaces
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Small internal dot moves instantly
      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Smooth outer ring tracking using the GSAP ticker loop
    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;

      gsap.set(ring, {
        x: ringPos.x,
        y: ringPos.y,
      });
    };

    gsap.ticker.add(tick);

    // Hover transformations
    const onMouseEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.8,
        backgroundColor: 'rgba(199, 249, 0, 0.15)',
        borderColor: '#C7F900',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 0.6,
        duration: 0.3,
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(199, 249, 0, 0.5)',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Attach listeners to generic selectors
    const attachHoverEvents = () => {
      const selectors = 'a, button, .btn, .magnet, .system, .card, .panel, .case, .contact-card';
      document.querySelectorAll(selectors).forEach((elem) => {
        elem.removeEventListener('mouseenter', onMouseEnterInteractive);
        elem.removeEventListener('mouseleave', onMouseLeaveInteractive);
        elem.addEventListener('mouseenter', onMouseEnterInteractive);
        elem.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    // Track dynamic DOM mutations to attach elements loaded later
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    attachHoverEvents();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(tick);
      observer.disconnect();
      document.querySelectorAll('a, button, .btn, .magnet').forEach((elem) => {
        elem.removeEventListener('mouseenter', onMouseEnterInteractive);
        elem.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#C7F900',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          border: '1.5px solid rgba(199, 249, 0, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          transition: 'background-color 0.3s, border-color 0.3s',
        }}
      />
    </>
  );
}
