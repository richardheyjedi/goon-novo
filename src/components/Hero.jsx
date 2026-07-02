import React, { useRef, useLayoutEffect } from 'react';
import { useTextReveal } from '../hooks/useTextReveal';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { useParallax } from '../hooks/useParallax';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

export default function Hero() {
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const leadRef = useRef(null);

  const btnConversaRef = useRef(null);
  const btnMetodoRef = useRef(null);

  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const videoWrapRef = useRef(null);
  
  const { language, t } = useLanguage();

  // Text Reveal animations for other elements
  useTextReveal(subRef, { type: 'chars', stagger: 0.03, delay: 0, trigger: language });
  useTextReveal(leadRef, { type: 'words', stagger: 0.02, delay: 0.4, trigger: language });

  // Custom layout effect to animate headline words
  useLayoutEffect(() => {
    const element = h1Ref.current;
    if (!element) return;

    const words = element.querySelectorAll('.hero-word');
    if (!words.length) return;

    // Reset styles
    gsap.set(words, {
      opacity: 0,
      y: 30,
      filter: 'blur(25px)',
    });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.05,
        delay: 0.1,
        ease: 'power3.out',
        duration: 1,
        onStart: () => {
          gsap.set(words, { willChange: 'transform, opacity, filter' });
        },
        onComplete: () => {
          gsap.set(words, { clearProps: 'willChange' });
        }
      });
    }, element);

    return () => ctx.revert();
  }, [language]);

  // Magnetic elements
  useMagneticButton(btnConversaRef, 50, 0.3);
  useMagneticButton(btnMetodoRef, 50, 0.3);

  // Parallax on orbs and video
  useParallax(orb1Ref, -100);
  useParallax(orb2Ref, 120);
  useParallax(videoWrapRef, 60);

  const titleText = t('hero.title') || "";
  const titleWords = titleText.split(' ');

  return (
    <section className="hero" id="home">
      <div ref={orb1Ref} className="orb orb-1"></div>
      <div ref={orb2Ref} className="orb orb-2"></div>
      <div className="frame"></div>
      <span className="tick t1"></span>
      <span className="tick t2"></span>
      <span className="tick t3"></span>
      <span className="tick t4"></span>
      
      <div className="hero-inner">
        <img src="https://i.ibb.co/ycpNN8gb/LOGO-PNG.png" alt="GOON Logo" className="logo" />
        <div ref={subRef} className="sub">{t('hero.sub')}</div>
        <h1 ref={h1Ref} className="chrome">
          {titleWords.map((word, idx) => {
            let content = word;
            if (word.includes('[')) {
              const match = word.match(/([^\[]*)\[(.*?)\](.*)/);
              if (match) {
                const leading = match[1] || "";
                const markContent = match[2] || "";
                const trailing = match[3] || "";
                content = (
                  <>
                    {leading}
                    <span className="accent">{markContent}</span>
                    {trailing}
                  </>
                );
              }
            }
            return (
              <React.Fragment key={idx}>
                <span className="hero-word" style={{ display: 'inline-block' }}>
                  {content}
                </span>
                {idx < titleWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            );
          })}
        </h1>
        <p ref={leadRef}>
          {t('hero.lead')}
        </p>
        <div className="actions">
          <a
            ref={btnConversaRef}
            className="btn btn-primary"
            href="#"
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-lead-modal')); }}
          >
            {t('hero.talkBtn')}{' '}
            <span style={{ display: 'inline-block', marginLeft: '6px', transition: 'transform 0.25s' }} className="arrow">→</span>
          </a>
          <a ref={btnMetodoRef} className="btn btn-ghost" href="#timeline">
            {t('hero.methodBtn')}
          </a>
        </div>
      </div>

      <div ref={videoWrapRef} className="hero-video-wrap">
        <div className="hero-video-bezel">
          <div className="bezel-bar">
            <div className="bezel-dots">
              <span className="bezel-dot d1"></span>
              <span className="bezel-dot d2"></span>
              <span className="bezel-dot d3"></span>
            </div>
            <div className="bezel-url">GOON_CORE_SYSTEMS.sh</div>
            <div style={{ width: '33px' }} />
          </div>
          <div className="bezel-content">
            <video
              src="https://www.image2url.com/r2/default/videos/1782942730128-296c36bc-701a-4a76-ba19-4727c891e120.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="hero-video-glow-orb" />
            <div className="video-glow-overlay" />
          </div>
        </div>
      </div>


      <div className="side">GOON-GLOBAL.COM</div>
    </section>
  );
}
