import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/languageContext';
import { saveLead } from '../lib/leadStorage';

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [revenue, setRevenue] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const nameInputRef = useRef(null);
  const openerRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleOpen = () => {
      openerRef.current = document.activeElement;
      setError('');
      setIsOpen(true);
    };
    window.addEventListener('open-lead-modal', handleOpen);
    return () => window.removeEventListener('open-lead-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nameInputRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !isSubmittingRef.current) setIsOpen(false);
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled)');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      openerRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleClose = () => {
    if (isSubmitting) return;
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError('');
    try {
      await saveLead({ name: name.trim(), phone: phone.trim(), revenue: revenue.trim(), instagram: instagram.trim() });
    
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
    } catch {
      setError('Não foi possível concluir o envio. Tente novamente.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="lead-modal-overlay" onClick={handleClose}>
      <div ref={dialogRef} className="lead-modal-content" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="lead-modal-close" onClick={handleClose} aria-label="Close modal">
          &times;
        </button>
        <h3 className="chrome" id="lead-modal-title">{t('leadForm.title')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="lead-modal-field">
            <label htmlFor="lead-name">{t('leadForm.name')}</label>
            <input
              ref={nameInputRef}
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

          {error && <p className="lead-modal-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary lead-modal-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando…' : t('leadForm.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
