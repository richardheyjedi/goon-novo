import React, { useLayoutEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

const STEP_META = [
  { num: '01', icon: '◎', badge: 'SCAN',  color: 'rgba(199,249,0,1)' },
  { num: '02', icon: '⊹', badge: 'PLAN',  color: 'rgba(199,249,0,1)' },
  { num: '03', icon: '◈', badge: 'START', color: 'rgba(199,249,0,1)' },
  { num: '04', icon: '⊛', badge: 'EXEC',  color: 'rgba(199,249,0,1)' },
];

export default function Timeline() {
  const roadmapRef  = useRef(null);
  const { t }       = useLanguage();

  useLayoutEffect(() => {
    const container = roadmapRef.current;
    if (!container) return;

    const steps      = container.querySelectorAll('.rm-step');
    const connectors = container.querySelectorAll('.rm-connector');
    const fills      = container.querySelectorAll('.rm-bar-fill');

    gsap.set(steps,      { opacity: 0, x: 36 });
    gsap.set(connectors, { scaleY: 0, transformOrigin: 'top center' });
    gsap.set(fills,      { width: '0%' });

    const ctx = gsap.context(() => {
      steps.forEach((step, i) => {
        // Card slide-in
        gsap.to(step, {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
            onEnter:     () => step.classList.add('rm-active'),
            onLeaveBack: () => step.classList.remove('rm-active'),
          },
        });

        // Connector line growth toward next node
        if (connectors[i]) {
          gsap.to(connectors[i], {
            scaleY: 1, duration: 0.55, ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 72%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // Progress bar fill inside card
        if (fills[i]) {
          gsap.to(fills[i], {
            width: '100%', duration: 1.1, ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.25,
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const stepsData = STEP_META.map((m, i) => ({
    ...m,
    title:  t(`timeline.step${i + 1}.title`),
    desc:   t(`timeline.step${i + 1}.desc`),
  }));

  return (
    <section className="section" id="timeline">
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">{t('timeline.title')}</h2>
          <p className="lead">{t('timeline.lead')}</p>
        </ScrollReveal>

        <div ref={roadmapRef} className="roadmap">
          {stepsData.map((step, i) => (
            <div key={step.num} className="rm-step">

              {/* ── Left rail: node + connector ── */}
              <div className="rm-rail">
                <div className="rm-node">
                  <span className="rm-icon">{step.icon}</span>
                  <div className="rm-pulse" />
                </div>
                {i < stepsData.length - 1 && (
                  <div className="rm-connector" />
                )}
              </div>

              {/* ── Right: card ── */}
              <div className="rm-card">
                <div className="rm-card-top">
                  <span className="rm-label">
                    {t('timeline.step')} {step.num}
                  </span>
                  <span className="rm-badge">{step.badge}</span>
                </div>

                <h3 className="rm-title">{step.title}</h3>
                <p  className="rm-desc">{step.desc}</p>

                <div className="rm-bar">
                  <div className="rm-bar-fill" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
