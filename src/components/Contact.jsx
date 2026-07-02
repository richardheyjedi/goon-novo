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
              href="https://instagram.com/goonglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="contact-icon">◈</div>
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
