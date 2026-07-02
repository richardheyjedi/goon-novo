import React from 'react';
import { useLanguage } from '../context/languageContext';

export default function Footer({ waLink }) {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <svg className="logo" viewBox="0 0 122 28">
        <use href="#goon" />
      </svg>
      <div>GLOBAL OR NOTHING</div>
      <div className="socials">
        <a href="https://instagram.com/goonglobal" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
      <div>{t('footer.rights')}</div>
    </footer>
  );
}
