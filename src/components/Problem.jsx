import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';
import { gsap } from '../lib/gsapConfig';

export default function Problem() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const paneRef = useRef(null);

  useEffect(() => {
    if (paneRef.current) {
      gsap.fromTo(paneRef.current,
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const getActiveTabContent = () => {
    switch (activeTab) {
      case 0:
        return {
          idx: "01",
          title: t('problem.p1.title'),
          desc: t('problem.p1.desc'),
          solution: t('problem.p1.solution')
        };
      case 1:
        return {
          idx: "02",
          title: t('problem.p2.title'),
          desc: t('problem.p2.desc'),
          solution: t('problem.p2.solution')
        };
      case 2:
        return {
          idx: "03",
          title: t('problem.p3.title'),
          desc: t('problem.p3.desc'),
          solution: t('problem.p3.solution')
        };
      case 3:
        return {
          idx: "04",
          title: t('problem.p4.title'),
          desc: t('problem.p4.desc'),
          solution: t('problem.p4.solution')
        };
      default:
        return {};
    }
  };

  const activeContent = getActiveTabContent();

  return (
    <section className="section problem" id="problem">
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">{t('problem.title')}</h2>
          <p className="lead">
            {t('problem.lead')}
          </p>
        </ScrollReveal>
        
        <ScrollReveal stagger={0.1} once>
          <div className="problem-tabs">
            <button 
              className={`problem-tab-btn ${activeTab === 0 ? 'active' : ''}`} 
              onClick={() => setActiveTab(0)}
            >
              {t('problem.tab1')}
            </button>
            <button 
              className={`problem-tab-btn ${activeTab === 1 ? 'active' : ''}`} 
              onClick={() => setActiveTab(1)}
            >
              {t('problem.tab2')}
            </button>
            <button 
              className={`problem-tab-btn ${activeTab === 2 ? 'active' : ''}`} 
              onClick={() => setActiveTab(2)}
            >
              {t('problem.tab3')}
            </button>
            <button 
              className={`problem-tab-btn ${activeTab === 3 ? 'active' : ''}`} 
              onClick={() => setActiveTab(3)}
            >
              {t('problem.tab4')}
            </button>
          </div>
          
          <div className="problem-pane">
            <div className="problem-pane-glow" />
            <div ref={paneRef} className="problem-pane-inner">
              <div className="pane-left">
                <span className="idx">{t('problem.label')} {activeContent.idx}</span>
                <h3>{activeContent.title}</h3>
              </div>
              <div className="pane-right">
                <p>{activeContent.desc}</p>
                <div className="solution">
                  {activeContent.solution}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
