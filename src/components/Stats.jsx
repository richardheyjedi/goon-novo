import React, { useLayoutEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

const LOCATIONS = [
  { key: 'us', xPct: 18, yPct: 28, delay: 0.8 },
  { key: 'br', xPct: 34, yPct: 60, delay: 0 },
  { key: 'py', xPct: 33, yPct: 68, delay: 0.4 },
  { key: 'eu', xPct: 52, yPct: 26, delay: 1.2 },
  { key: 'af', xPct: 50, yPct: 50, delay: 1.6 },
  { key: 'as', xPct: 72, yPct: 24, delay: 2.0 },
  { key: 'oc', xPct: 79, yPct: 68, delay: 2.4 },
];

export default function Stats() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Set static default values for accessibility/fallback
      const counters = container.querySelectorAll('[data-count]');
      counters.forEach((el) => {
        const targetValue = el.getAttribute('data-count');
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = targetValue + suffix;
      });
      return;
    }

    const counterElements = container.querySelectorAll('[data-count]');
    
    const ctx = gsap.context(() => {
      counterElements.forEach((el) => {
        const targetValue = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const countObj = { val: 0 };
        
        gsap.to(countObj, {
          val: targetValue,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(countObj.val) + suffix;
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="about">
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">
            {t('stats.title1')}
            <br />
            {t('stats.title2')}
          </h2>
          <p className="lead">
            {t('stats.lead')}
          </p>
        </ScrollReveal>
        
        <div ref={containerRef} className="stats">
          <div className="stat">
            <div className="value chrome" data-count="20" data-suffix="+">0</div>
            <div className="label">{t('stats.s1')}</div>
          </div>
          <div className="stat">
            <div className="value chrome" data-count="40" data-suffix="+">0</div>
            <div className="label">{t('stats.s2')}</div>
          </div>
          <div className="stat">
            <div className="value chrome" data-count="1" data-suffix="B+">0</div>
            <div className="label">{t('stats.s3')}</div>
          </div>
          <div className="stat">
            <div className="value chrome">∞</div>
            <div className="label">{t('stats.s4')}</div>
          </div>
        </div>

        {/* Pulsing global map with multiple continents presence */}
        <ScrollReveal once>
          <div className="offices-map-wrap" style={{ marginTop: '40px' }}>
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              xmlns="http://www.w3.org/2000/svg"
              className="offices-map-svg"
            >
              <defs>
                <pattern id="dotGridMap" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="var(--signal)" opacity="0.32" />
                </pattern>
                <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing neon background edge trails */}
              <g opacity="0.22" filter="url(#mapGlow)">
                <path fill="none" stroke="var(--signal)" strokeWidth="3.5" d="M 80,100 L 100,80 L 140,80 L 160,60 L 180,75 L 200,90 L 250,90 L 270,110 L 290,130 L 310,140 L 325,160 L 320,175 L 295,200 L 280,210 L 255,225 L 240,220 L 210,215 L 185,200 L 160,185 L 145,160 L 130,135 Z" />
                <path fill="none" stroke="var(--signal)" strokeWidth="3.5" d="M 250,40 L 285,35 L 295,50 L 270,80 L 245,75 Z" />
                <path fill="none" stroke="var(--signal)" strokeWidth="3.5" d="M 290,230 L 325,225 L 350,235 L 360,250 L 390,270 L 395,290 L 385,320 L 370,350 L 350,380 L 330,400 L 315,405 L 300,395 L 285,370 L 275,340 L 265,310 L 268,280 L 276,250 Z" />
                <path fill="none" stroke="var(--signal)" strokeWidth="3.5" d="M 460,85 L 480,75 L 500,85 L 530,80 L 560,70 L 600,60 L 640,65 L 680,60 L 720,70 L 760,80 L 800,75 L 840,65 L 860,80 L 880,95 L 870,120 L 850,135 L 830,155 L 800,165 L 770,160 L 740,155 L 710,170 L 680,185 L 660,205 L 640,225 L 610,230 L 580,235 L 550,220 L 520,205 L 500,190 L 480,175 L 460,165 L 440,155 L 420,160 L 400,165 L 390,150 L 380,135 L 395,115 L 410,95 L 435,80 Z" />
                <path fill="none" stroke="var(--signal)" strokeWidth="3.5" d="M 440,210 L 468,190 L 510,183 L 545,200 L 565,215 L 570,245 L 558,270 L 541,295 L 515,303 L 489,311 L 468,298 L 447,285 L 440,260 Z" />
                <path fill="none" stroke="var(--signal)" strokeWidth="3.5" d="M 750,300 L 780,290 L 820,305 L 845,320 L 850,350 L 835,370 L 815,390 L 780,392 L 755,375 L 735,348 Z" />
              </g>

              {/* Dotted matrix infill and subtle borders */}
              <g opacity="0.6">
                <path fill="url(#dotGridMap)" stroke="rgba(199,249,0,0.3)" strokeWidth="1.2" d="M 80,100 L 100,80 L 140,80 L 160,60 L 180,75 L 200,90 L 250,90 L 270,110 L 290,130 L 310,140 L 325,160 L 320,175 L 295,200 L 280,210 L 255,225 L 240,220 L 210,215 L 185,200 L 160,185 L 145,160 L 130,135 Z" />
                <path fill="url(#dotGridMap)" stroke="rgba(199,249,0,0.3)" strokeWidth="1.2" d="M 250,40 L 285,35 L 295,50 L 270,80 L 245,75 Z" />
                <path fill="url(#dotGridMap)" stroke="rgba(199,249,0,0.3)" strokeWidth="1.2" d="M 290,230 L 325,225 L 350,235 L 360,250 L 390,270 L 395,290 L 385,320 L 370,350 L 350,380 L 330,400 L 315,405 L 300,395 L 285,370 L 275,340 L 265,310 L 268,280 L 276,250 Z" />
                <path fill="url(#dotGridMap)" stroke="rgba(199,249,0,0.3)" strokeWidth="1.2" d="M 460,85 L 480,75 L 500,85 L 530,80 L 560,70 L 600,60 L 640,65 L 680,60 L 720,70 L 760,80 L 800,75 L 840,65 L 860,80 L 880,95 L 870,120 L 850,135 L 830,155 L 800,165 L 770,160 L 740,155 L 710,170 L 680,185 L 660,205 L 640,225 L 610,230 L 580,235 L 550,220 L 520,205 L 500,190 L 480,175 L 460,165 L 440,155 L 420,160 L 400,165 L 390,150 L 380,135 L 395,115 L 410,95 L 435,80 Z" />
                <path fill="url(#dotGridMap)" stroke="rgba(199,249,0,0.3)" strokeWidth="1.2" d="M 440,210 L 468,190 L 510,183 L 545,200 L 565,215 L 570,245 L 558,270 L 541,295 L 515,303 L 489,311 L 468,298 L 447,285 L 440,260 Z" />
                <path fill="url(#dotGridMap)" stroke="rgba(199,249,0,0.3)" strokeWidth="1.2" d="M 750,300 L 780,290 L 820,305 L 845,320 L 850,350 L 835,370 L 815,390 L 780,392 L 755,375 L 735,348 Z" />
              </g>
            </svg>

            <div className="map-dots-container">
              {LOCATIONS.map(loc => (
                <div
                  key={loc.key}
                  className="map-pin"
                  style={{
                    left: `${loc.xPct}%`,
                    top: `${loc.yPct}%`,
                    animationDelay: `${loc.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
