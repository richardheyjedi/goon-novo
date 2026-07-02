import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from './lib/gsapConfig';
import { useTextReveal } from './hooks/useTextReveal';
import { useLanguage } from './context/languageContext';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Ecosystem from './components/Ecosystem';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';

// First Statement section with marker highlight sweep
function StatementReveal() {
  const markRef = useRef(null);
  const { t, language } = useLanguage();

  useLayoutEffect(() => {
    const mark = markRef.current;
    if (!mark) return;
    mark.classList.remove('revealed');
    const ctx = gsap.context(() => {
      gsap.delayedCall(0.05, () => {
        const rect = mark.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          mark.classList.add('revealed');
        }
      });
      const trigger = gsap.to({}, {
        scrollTrigger: {
          trigger: mark,
          start: 'top 88%',
          onEnter: () => mark.classList.add('revealed'),
          onLeaveBack: () => mark.classList.remove('revealed'),
        }
      });
    });
    return () => ctx.revert();
  }, [language]);

  return (
    <section className="section">
      <div className="inner">
        <p className="statement">
          {t('statements.one.text')}{' '}
          <mark ref={markRef} className="stmt-mark">{t('statements.one.span')}</mark>
        </p>
      </div>
    </section>
  );
}

// Second Statement section with marker highlight sweep
function SecondStatementReveal() {
  const markRef = useRef(null);
  const { t, language } = useLanguage();

  useLayoutEffect(() => {
    const mark = markRef.current;
    if (!mark) return;
    mark.classList.remove('revealed');
    const ctx = gsap.context(() => {
      gsap.delayedCall(0.05, () => {
        const rect = mark.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          mark.classList.add('revealed');
        }
      });
      const trigger = gsap.to({}, {
        scrollTrigger: {
          trigger: mark,
          start: 'top 88%',
          onEnter: () => mark.classList.add('revealed'),
          onLeaveBack: () => mark.classList.remove('revealed'),
        }
      });
    });
    return () => ctx.revert();
  }, [language]);

  return (
    <section className="section">
      <div className="inner">
        <p className="statement">
          {t('statements.two.text')}{' '}
          <mark ref={markRef} className="stmt-mark">{t('statements.two.span')}</mark>
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const progressBarRef = useRef(null);
  const waFloatRef = useRef(null);
  const [showFloat, setShowFloat] = useState(false);
  const { language, t } = useLanguage();

  // Configuration for WhatsApp CTA link
  const WHATSAPP_NUM = "5554994518000";
  const waLink = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(t('contact.waMsg'))}`;

  // Page Scroll Progress Bar & Floating Bubble Listener
  useLayoutEffect(() => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // WhatsApp Floating Button Threshold Trigger
  useEffect(() => {
    const handleScrollThreshold = () => {
      setShowFloat(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScrollThreshold, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollThreshold);
  }, []);

  // Ambient mouse position tracking for spotlight and dotted highlight
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const spot = document.getElementById('spot');
    const root = document.documentElement;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      current.x += (mouse.x - current.x) * 0.08;
      current.y += (mouse.y - current.y) * 0.08;

      if (spot) {
        gsap.set(spot, {
          x: current.x,
          y: current.y
        });
      }

      root.style.setProperty('--mouse-x', `${current.x}px`);
      root.style.setProperty('--mouse-y', `${current.y}px`);
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '0%',
          height: '3px',
          backgroundColor: 'var(--signal)',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient background layers */}
      <div className="bg-layer bg-dots"></div>
      <div className="bg-layer bg-dots-hover"></div>
      <div className="bg-layer bg-grid"></div>
      <div className="bg-layer bg-noise"></div>
      <div className="spotlight" id="spot"></div>

      {/* SVG Symbol Definitions (Logo definitions to ensure cross-component availability) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.18" stopColor="#C9C9D2" />
            <stop offset="0.40" stopColor="#7B7B85" />
            <stop offset="0.50" stopColor="#F4F4F8" />
            <stop offset="0.60" stopColor="#9A9AA4" />
            <stop offset="0.82" stopColor="#6E6E78" />
            <stop offset="1" stopColor="#EDEDF2" />
          </linearGradient>
          <linearGradient id="gleam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.46" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="0.54" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <symbol id="goon" viewBox="0 0 122 28">
            <path d="M 38.16,13.07 L 38.12,15.23 L 38.28,16.42 L 38.55,17.52 L 38.92,18.52 L 39.46,19.62 L 40.06,20.58 L 40.83,21.56 L 42.58,23.22 L 43.58,23.92 L 44.53,24.44 L 45.53,24.87 L 46.62,25.19 L 48.88,25.47 L 50.58,25.41 L 52.03,25.18 L 53.38,24.77 L 54.78,24.13 L 56.17,23.21 L 57.20,22.25 L 57.74,21.41 L 57.89,20.52 L 57.70,19.79 L 57.24,19.12 L 56.60,18.63 L 55.92,18.40 L 55.28,18.41 L 54.58,18.62 L 52.38,19.97 L 51.38,20.43 L 50.42,20.69 L 49.28,20.79 L 47.92,20.62 L 46.58,20.14 L 45.41,19.39 L 44.40,18.39 L 43.53,17.08 L 42.98,15.57 L 42.83,13.98 L 43.07,12.52 L 43.73,11.08 L 44.76,9.76 L 46.12,8.70 L 47.53,8.08 L 48.92,7.84 L 50.38,7.92 L 51.78,8.33 L 53.17,9.11 L 55.42,11.04 L 65.22,20.82 L 67.18,22.61 L 68.47,23.59 L 69.88,24.43 L 71.22,24.99 L 72.53,25.32 L 73.82,25.46 L 75.28,25.48 L 76.38,25.39 L 77.57,25.16 L 78.62,24.82 L 79.68,24.35 L 80.68,23.77 L 81.72,23.01 L 83.37,21.41 L 84.11,20.42 L 84.66,19.48 L 85.22,18.23 L 85.57,17.17 L 85.83,15.98 L 85.94,14.73 L 85.80,12.52 L 85.27,10.52 L 84.30,8.52 L 84.30,8.52 L 84.30,8.52 L 84.30,8.52 L 84.30,8.52 L 84.30,8.52 L 84.30,8.52 Z M 3.25,8.90 L 2.62,10.65 L 2.37,12.65 L 2.49,15.25 L 2.70,16.30 L 3.05,17.30 L 3.96,19.00 L 5.43,20.77 L 7.15,22.21 L 9.00,23.22 L 10.85,23.87 L 13.40,24.53 L 15.05,24.79 L 16.95,24.85 L 21.50,24.81 L 22.95,24.65 L 25.65,23.97 L 26.80,23.55 L 28.35,22.83 L 29.03,22.67 L 29.49,22.70 L 29.94,22.90 L 31.56,24.26 L 32.65,24.56 L 33.85,24.57 L 34.66,24.37 L 35.31,23.95 L 35.74,23.31 L 35.93,22.60 L 36.02,21.35 L 36.02,21.35 L 35.95,14.05 L 35.80,13.37 L 35.49,12.80 L 35.07,12.39 L 34.48,12.09 L 33.80,11.95 L 32.75,11.90 L 21.85,11.96 L 20.80,12.05 L 20.04,12.34 L 19.65,12.64 L 19.33,13.08 L 19.14,13.56 L 19.06,14.10 L 19.11,14.65 L 19.30,15.19 L 19.57,15.61 L 19.93,15.94 L 20.52,16.23 L 21.25,16.37 L 25.80,16.45 L 26.39,16.63 L 26.71,16.96 L 26.73,17.27 L 26.56,17.62 L 26.24,17.94 L 25.75,18.25 L 24.30,18.76 L 22.50,19.07 L 20.65,19.19 L 17.35,19.16 L 16.00,19.01 L 14.70,18.65 L 13.40,18.00 L 12.11,16.98 L 11.22,15.85 L 10.73,14.70 L 10.54,13.45 L 10.64,12.20 L 10.97,11.15 L 11.62,10.14 L 12.56,9.22 L 13.60,8.56 L 14.90,8.05 L 16.50,7.68 L 18.25,7.48 L 20.25,7.46 L 21.65,7.55 L 23.30,7.83 L 25.10,8.40 L 28.05,10.19 L 28.80,10.50 L 29.55,10.67 L 33.45,10.72 L 34.19,10.61 L 34.80,10.34 L 35.30,9.82 L 35.47,9.09 L 35.31,8.30 L 34.82,7.35 L 34.82,7.35 Z M 88.67,2.71 L 88.38,3.38 L 88.30,4.32 L 88.31,21.77 L 88.51,22.91 L 88.75,23.32 L 89.10,23.65 L 89.63,23.90 L 90.32,24.03 L 93.97,24.02 L 94.97,23.74 L 95.32,23.49 L 95.60,23.12 L 95.82,22.57 L 95.90,21.77 L 95.94,12.18 L 96.03,11.68 L 96.22,11.28 L 96.46,11.06 L 96.46,11.06 L 96.78,10.98 L 97.43,11.15 L 98.28,11.77 L 108.72,21.18 L 110.62,22.80 L 111.72,23.56 L 112.47,23.88 L 113.28,24.02 L 117.12,24.04 L 118.25,23.81 L 118.66,23.55 L 118.98,23.20 L 119.27,22.48 L 119.35,21.48 L 119.34,4.12 L 119.14,3.00 L 118.89,2.58 L 118.55,2.26 L 118.02,2.00 L 117.38,1.88 L 113.78,1.87 L 112.76,2.12 L 112.41,2.37 L 112.11,2.73 L 111.85,3.38 L 111.76,4.28 L 111.74,12.93 L 111.46,13.76 L 111.24,13.96 L 110.92,14.05 L 110.22,13.86 L 109.43,13.26 L 98.22,3.22 L 96.97,2.33 L 96.18,2.01 L 95.32,1.88 L 90.57,1.87 L 89.44,2.08 L 89.02,2.33 Z" />
          </symbol>
          <symbol id="wa" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.099 1.51 5.828L0 24l6.335-1.483A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.882 9.882 0 01-5.037-1.378l-.361-.214-3.741.876.892-3.658-.235-.374A9.859 9.859 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118c5.467 0 9.882 4.415 9.882 9.882 0 5.467-4.415 9.882-9.882 9.882z" />
          </symbol>
        </defs>
      </svg>

      {/* Custom Fluid Cursor */}
      <CustomCursor />

      {/* Lead capture modal form */}
      <LeadModal />

      {/* Floating WhatsApp Bubble */}
      <a
        ref={waFloatRef}
        className={`wa-float ${showFloat ? 'show' : ''}`}
        id="waFloat"
        href="#"
        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-lead-modal')); }}
        aria-label="Falar no WhatsApp"
      >
        <span className="bubble">Fale com a GOON</span>
        <span className="btn-round">
          <svg viewBox="0 0 24 24">
            <use href="#wa" />
          </svg>
        </span>
      </a>

      {/* Header section */}
      <Header waLink={waLink} />

      {/* Main sections container */}
      <main>
        <Hero waLink={waLink} />

        {/* Marquee component */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map(i => (
              <span key={i}>
                <b>Branding</b><i className="dotx"></i>
                <b>Produto</b><i className="dotx"></i>
                <b>Operação</b><i className="dotx"></i>
                <b>Growth</b><i className="dotx"></i>
                <b>TikTok Shop</b><i className="dotx"></i>
                <b>Gestão</b><i className="dotx"></i>
                <b>Supply Chain</b><i className="dotx"></i>
                <b>Posicionamento</b><i className="dotx"></i>
                <b>Performance</b><i className="dotx"></i>
                <b>Escala Global</b><i className="dotx"></i>
              </span>
            ))}
          </div>
        </div>

        <StatementReveal />

        <Timeline />

        <Ecosystem />

        <Stats />

        <SecondStatementReveal />

        <Contact waLink={waLink} />
      </main>

      <Footer waLink={waLink} />
    </>
  );
}
