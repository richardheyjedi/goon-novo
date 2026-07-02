import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

export default function Systems() {
  const { t } = useLanguage();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: -6,
      borderColor: '#C7F900',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: 0,
      borderColor: '#2A2A30',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section className="section" id="systems">
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">{t('systems.title')}</h2>
          <p className="lead">
            {t('systems.lead')}
          </p>
        </ScrollReveal>
        
        <ScrollReveal className="systems" stagger={0.08} once>
          <div 
            className="system" 
            onMouseMove={handleMouseMove} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
          >
            <span className="idx">S1</span>
            <h3>{t('systems.s1.title')}</h3>
            <p>{t('systems.s1.desc')}</p>
          </div>
          <div 
            className="system" 
            onMouseMove={handleMouseMove} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
          >
            <span className="idx">S2</span>
            <h3>{t('systems.s2.title')}</h3>
            <p>{t('systems.s2.desc')}</p>
          </div>
          <div 
            className="system" 
            onMouseMove={handleMouseMove} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
          >
            <span className="idx">S3</span>
            <h3>{t('systems.s3.title')}</h3>
            <p>{t('systems.s3.desc')}</p>
          </div>
          <div 
            className="system" 
            onMouseMove={handleMouseMove} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
          >
            <span className="idx">S4</span>
            <h3>{t('systems.s4.title')}</h3>
            <p>{t('systems.s4.desc')}</p>
          </div>
          <div 
            className="system" 
            onMouseMove={handleMouseMove} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
          >
            <span className="idx">S5</span>
            <h3>{t('systems.s5.title')}</h3>
            <p>{t('systems.s5.desc')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
