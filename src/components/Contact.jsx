import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { gsap } from '../lib/gsapConfig';

export default function Contact({ waLink }) {
  const finalWaRef = useRef(null);
  const { t } = useLanguage();

  useMagneticButton(finalWaRef, 50, 0.3);

  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: -6,
      borderColor: '#C7F900',
      backgroundColor: '#191919',
      boxShadow: '0 0 25px rgba(199, 249, 0, 0.25)',
      duration: 0.3,
    });
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
  };

  return (
    <>
      <section className="section" id="contact">
        <div className="inner">
          <ScrollReveal className="section-head" stagger={0.15} once>
            <h2 className="chrome">{t('contact.title')}</h2>
            <p className="lead">{t('contact.lead')}</p>
          </ScrollReveal>

          <ScrollReveal className="contact-grid" stagger={0.1} once>
            {/* WhatsApp */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-lead-modal')); }}
              className="contact-card"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <use href="#wa" />
                </svg>
              </div>
              <h3>{t('contact.waTitle')}</h3>
              <p>{t('contact.waDesc')}</p>
              <span className="apply">{t('contact.waAction')}</span>
            </a>

            {/* E-mail */}
            <a
              href="mailto:contato@goon-global.com"
              className="contact-card"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="contact-icon">✉</div>
              <h3>{t('contact.mailTitle')}</h3>
              <p>{t('contact.mailDesc')}</p>
              <span className="apply">{t('contact.mailAction')}</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/goon.method/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <h3>{t('contact.igTitle')}</h3>
              <p>{t('contact.igDesc')}</p>
              <span className="apply">{t('contact.igAction')}</span>
            </a>
          </ScrollReveal>

          {/* Office numbers cards */}
          <ScrollReveal className="offices-grid" style={{ marginTop: '24px' }} stagger={0.1} once>
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

            <div className="office-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <span className="num">AE</span>
              <h3>{t('offices.ae')}</h3>
              <p className="city">Dubai, UAE</p>
              <a href="tel:+97145550199" className="phone">+971 4 555-0199</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final">
        <ScrollReveal className="inner" stagger={0.15} once>
          <h2 className="chrome">{t('contact.finalTitle1')}<br />{t('contact.finalTitle2')}</h2>
          <p>{t('contact.finalDesc')}</p>
          <div className="actions">
            <a
              ref={finalWaRef}
              className="btn btn-wa"
              id="finalWa"
              href="#"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-lead-modal')); }}
            >
              <svg viewBox="0 0 24 24"><use href="#wa" /></svg>{' '}
              {t('contact.finalWa')}
            </a>
            <a
              className="btn btn-primary"
              href="#"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-lead-modal')); }}
            >
              {t('contact.finalTalk')}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
