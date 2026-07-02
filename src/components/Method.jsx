import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

export default function Method() {
  const { t } = useLanguage();

  const onMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const xc = (x / rect.width) - 0.5;
    const yc = (y / rect.height) - 0.5;
    
    // Tilt calculations
    const rotateXValue = -12 * yc;
    const rotateYValue = 12 * xc;

    gsap.to(card, {
      rotateX: rotateXValue,
      rotateY: rotateYValue,
      x: xc * 8,
      y: yc * 8,
      scale: 1.02,
      borderColor: '#C7F900',
      boxShadow: '0 0 25px rgba(199, 249, 0, 0.25)',
      duration: 0.3,
      ease: 'power2.out',
    });

    const bigNum = card.querySelector('.big');
    if (bigNum) {
      gsap.to(bigNum, {
        scale: 1.12,
        color: '#C7F900',
        duration: 0.3,
      });
    }
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1,
      borderColor: '#2A2A30',
      boxShadow: 'none',
      duration: 0.5,
      ease: 'power2.out',
    });

    const bigNum = card.querySelector('.big');
    if (bigNum) {
      gsap.to(bigNum, {
        scale: 1,
        color: 'rgba(255, 255, 255, 0.03)',
        duration: 0.4,
      });
    }
  };

  return (
    <section className="section" id="method" style={{ perspective: '1000px' }}>
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">{t('method.title')}</h2>
          <p className="lead">
            {t('method.lead')}
          </p>
        </ScrollReveal>
        
        <div className="method-wrap">
          <div className="method-connector"></div>
          <ScrollReveal className="method" stagger={0.1} once>
            <div
              className="card"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
            >
              <div className="big chrome" style={{ transform: 'translateZ(30px)', transition: 'color 0.25s' }}>01</div>
              <h3 style={{ transform: 'translateZ(20px)' }}>{t('method.p1.title')}</h3>
              <p style={{ transform: 'translateZ(10px)' }}>{t('method.p1.desc')}</p>
            </div>
            <div
              className="card"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
            >
              <div className="big chrome" style={{ transform: 'translateZ(30px)', transition: 'color 0.25s' }}>02</div>
              <h3 style={{ transform: 'translateZ(20px)' }}>{t('method.p2.title')}</h3>
              <p style={{ transform: 'translateZ(10px)' }}>{t('method.p2.desc')}</p>
            </div>
            <div
              className="card"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
            >
              <div className="big chrome" style={{ transform: 'translateZ(30px)', transition: 'color 0.25s' }}>03</div>
              <h3 style={{ transform: 'translateZ(20px)' }}>{t('method.p3.title')}</h3>
              <p style={{ transform: 'translateZ(10px)' }}>{t('method.p3.desc')}</p>
            </div>
            <div
              className="card"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
            >
              <div className="big chrome" style={{ transform: 'translateZ(30px)', transition: 'color 0.25s' }}>04</div>
              <h3 style={{ transform: 'translateZ(20px)' }}>{t('method.p4.title')}</h3>
              <p style={{ transform: 'translateZ(10px)' }}>{t('method.p4.desc')}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
