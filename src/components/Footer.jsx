import React from 'react';
import { useLanguage } from '../context/languageContext';

export default function Footer({ waLink }) {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <img src="https://i.ibb.co/YByNBDCy/BRANCO-05.png" alt="GOON Logo" className="logo" />
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
