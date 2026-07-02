import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

const CARDS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

export default function Ecosystem() {
  const { t } = useLanguage();

  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: -6,
      borderColor: '#C7F900',
      backgroundColor: '#191919',
      boxShadow: '0 0 25px rgba(199, 249, 0, 0.25)',
      duration: 0.3,
    });
    const applyBtn = card.querySelector('.apply');
    if (applyBtn) gsap.to(applyBtn, { color: '#C7F900', x: 5, duration: 0.2 });
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: 0,
      borderColor: '#2A2A30',
      backgroundColor: '#1E1E1E',
      boxShadow: 'none',
      duration: 0.4,
    });
    const applyBtn = card.querySelector('.apply');
    if (applyBtn) gsap.to(applyBtn, { color: '#F2F2F2', x: 0, duration: 0.3 });
  };

  return (
    <section className="section" id="ecosystem">
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">{t('ecosystem.title')}</h2>
          <p className="lead">{t('ecosystem.lead')}</p>
        </ScrollReveal>

        <ScrollReveal className="ecosystem" stagger={0.08} once>
          {CARDS.map((key, i) => (
            <div
              key={key}
              className="eco"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div>
                <div className="num">0{i + 1}</div>
                <h3>{t(`ecosystem.${key}.title`)}</h3>
                <p>{t(`ecosystem.${key}.desc`)}</p>
              </div>
              <a className="apply eco-cta" href="#contact">{t(`ecosystem.${key}.action`)}</a>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
