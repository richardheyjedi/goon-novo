import React, { useState, useEffect, useRef } from 'react';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { useLanguage } from '../context/languageContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const waBtnRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();

  useMagneticButton(waBtnRef, 50, 0.25);

  useEffect(() => {
    const sectionElements = ['home', 'ecosystem', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let frameId = 0;
    
    const handleScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        let currentSection = 'home';
        const scrollPosition = window.scrollY + 180;
        for (const element of sectionElements) {
          if (element.offsetTop <= scrollPosition) currentSection = element.id;
        }
        setActiveSection((current) => current === currentSection ? current : currentSection);
        const nextScrolled = window.scrollY > 40;
        setScrolled((current) => current === nextScrolled ? current : nextScrolled);
        frameId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run immediately on load
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 920) setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <header className={`top ${scrolled ? 'scrolled' : ''}`} id="top">
      <a href="#home" aria-label="GOON">
        <img src="/goon-logo-white-512.png" alt="GOON" className="logo" width="512" height="512" decoding="async" fetchPriority="high" />
      </a>
      <nav id="nav" className={menuOpen ? 'open' : ''} aria-label="Navegação principal">
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
          aria-expanded={menuOpen}
          aria-controls="nav"
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
