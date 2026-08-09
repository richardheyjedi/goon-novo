import React, { useEffect, useRef } from 'react';

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

    const mouse = { x: -40, y: -40 };
    const ringPos = { x: -40, y: -40 };
    let frameId = 0;

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(mouse.x - ringPos.x) > 0.2 || Math.abs(mouse.y - ringPos.y) > 0.2) {
        frameId = requestAnimationFrame(tick);
      } else {
        frameId = 0;
      }
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      if (!frameId) frameId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMouseMove, { passive: true });

    // Hover transformations
    const onMouseEnterInteractive = () => {
      ring.classList.add('is-interactive');
      dot.classList.add('is-interactive');
    };

    const onMouseLeaveInteractive = () => {
      ring.classList.remove('is-interactive');
      dot.classList.remove('is-interactive');
    };

    // Attach listeners to generic selectors
    const interactiveSelector = 'a, button, .btn, .magnet, .system, .card, .panel, .case, .contact-card';
    const onPointerOver = (event) => {
      if (event.target.closest(interactiveSelector)) onMouseEnterInteractive();
    };
    const onPointerOut = (event) => {
      const from = event.target.closest(interactiveSelector);
      const to = event.relatedTarget?.closest?.(interactiveSelector);
      if (from && from !== to) onMouseLeaveInteractive();
    };
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="cursor-dot"
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
        className="cursor-ring"
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
