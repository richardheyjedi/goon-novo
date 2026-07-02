import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/languageContext';

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [revenue, setRevenue] = useState('');
  const [instagram, setInstagram] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-lead-modal', handleOpen);
    return () => window.removeEventListener('open-lead-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message template
    const template = t('leadForm.waTemplate');
    const formattedMsg = template
      .replace('{name}', name)
      .replace('{phone}', phone)
      .replace('{revenue}', revenue)
      .replace('{instagram}', instagram);

    const WHATSAPP_NUM = "5541998394841";
    const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(formattedMsg)}`;
    
    // Redirect user to WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    // Close modal & reset fields
    setIsOpen(false);
    setName('');
    setPhone('');
    setRevenue('');
    setInstagram('');
  };

  if (!isOpen) return null;

  return (
    <div className="lead-modal-overlay" onClick={handleClose}>
      <div className="lead-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="lead-modal-close" onClick={handleClose} aria-label="Close modal">
          &times;
        </button>
        <h3 className="chrome">{t('leadForm.title')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="lead-modal-field">
            <label htmlFor="lead-name">{t('leadForm.name')}</label>
            <input
              type="text"
              id="lead-name"
              required
              placeholder="Ex: Richard Hey"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="lead-modal-input"
            />
          </div>

          <div className="lead-modal-field">
            <label htmlFor="lead-phone">{t('leadForm.phone')}</label>
            <input
              type="tel"
              id="lead-phone"
              required
              placeholder="Ex: +55 (54) 99451-8000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="lead-modal-input"
            />
          </div>

          <div className="lead-modal-field">
            <label htmlFor="lead-revenue">{t('leadForm.revenue')}</label>
            <input
              type="text"
              id="lead-revenue"
              required
              placeholder="Ex: R$ 100k - 500k / mês"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="lead-modal-input"
            />
          </div>

          <div className="lead-modal-field">
            <label htmlFor="lead-instagram">{t('leadForm.instagram')}</label>
            <input
              type="text"
              id="lead-instagram"
              required
              placeholder="Ex: @goonglobal"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="lead-modal-input"
            />
          </div>

          <button type="submit" className="btn btn-primary lead-modal-submit">
            {t('leadForm.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
