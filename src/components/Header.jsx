import React, { useState, useEffect, useRef } from 'react';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { useLanguage } from '../context/languageContext';

export default function Header({ waLink }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const waBtnRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();

  useMagneticButton(waBtnRef, 50, 0.25);

  useEffect(() => {
    const sections = ['home', 'ecosystem', 'contact'];
    
    const handleScroll = () => {
      let currentSection = 'home';
      const scrollPosition = window.scrollY + 180; // Offset for header overlap

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run immediately on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top ${scrolled ? 'scrolled' : ''}`} id="top">
      <a href="#home" aria-label="GOON">
        <img src="https://i.ibb.co/YByNBDCy/BRANCO-05.png" alt="GOON" className="logo" />
      </a>
      <nav id="nav" className={menuOpen ? 'open' : ''}>
        <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setMenuOpen(false)}>{t('nav.home') || 'Home'}</a>
        <a href="#ecosystem" className={activeSection === 'ecosystem' ? 'active' : ''} onClick={() => setMenuOpen(false)}>{t('nav.ecosystem')}</a>
        <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => setMenuOpen(false)}>{t('nav.contact')}</a>
        <a
          ref={waBtnRef}
          className="btn btn-wa cta-mini"
          id="navWa"
          href="#"
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-lead-modal')); }}
        >
          <svg viewBox="0 0 24 24">
            <use href="#wa" />
          </svg>{' '}
          WhatsApp
        </a>
      </nav>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div className="lang-switcher">
          <button className="lang-btn" aria-label="Language Selector">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
            {language.toUpperCase()}
          </button>
          <div className="lang-dropdown">
            <button onClick={() => setLanguage('pt')}>PORTUGUÊS</button>
            <button onClick={() => setLanguage('en')}>ENGLISH</button>
            <button onClick={() => setLanguage('es')}>ESPAÑOL</button>
          </div>
        </div>

        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          id="burger"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
