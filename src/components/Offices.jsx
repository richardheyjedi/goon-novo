import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

export default function Offices() {
  const { t } = useLanguage();

  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: -6,
      borderColor: '#C7F900',
      boxShadow: '0 0 25px rgba(199, 249, 0, 0.25)',
      duration: 0.3,
    });
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: 0,
      borderColor: '#2A2A30',
      boxShadow: 'none',
      duration: 0.4,
    });
  };

  return (
    <section className="section" id="offices">
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">{t('offices.title')}</h2>
          <p className="lead">{t('offices.lead')}</p>
        </ScrollReveal>
        {/* Office cards */}
        <ScrollReveal className="offices-grid" stagger={0.1} once>
          <div className="office-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <span className="num">BR</span>
            <h3>{t('offices.br')}</h3>
            <p className="city">Caxias do Sul / São Paulo</p>
            <a href="tel:+5554994518000" className="phone">+55 (54) 99451-8000</a>
          </div>

          <div className="office-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <span className="num">PY</span>
            <h3>{t('offices.py')}</h3>
            <p className="city">Asunción</p>
            <a href="tel:+595981555123" className="phone">+595 981 555-123</a>
          </div>

          <div className="office-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <span className="num">US</span>
            <h3>{t('offices.us')}</h3>
            <p className="city">Miami, FL</p>
            <a href="tel:+13055550199" className="phone">+1 (305) 555-0199</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
