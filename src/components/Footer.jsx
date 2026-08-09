import React from 'react';
import { useLanguage } from '../context/languageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#home" aria-label="Voltar ao início">
          <img src="/goon-logo-white-512.png" alt="GOON" className="logo" width="512" height="512" loading="lazy" decoding="async" />
          <span>Global or Nothing</span>
        </a>

        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <a href="#home">Home</a>
          <a href="#ecosystem">Ecossistema</a>
          <a href="#contact">Contato</a>
        </nav>

        <div className="footer-socials">
          <span>Social</span>
          <a href="https://www.instagram.com/goon.method/" target="_blank" rel="noopener noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <a href="#admin">Admin</a>
        </div>

        <div className="footer-bottom">
          <span>{t('footer.rights')}</span>
          <span>GOON — Global Company Builder</span>
        </div>
      </div>
    </footer>
  );
}
