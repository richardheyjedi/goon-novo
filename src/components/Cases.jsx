import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/languageContext';

function BrandBuildVisual() {
  return (
    <div className="visual-brand-board">
      <div className="brand-layout-grid">
        <div className="brand-grid-header">A U R A</div>
        <div className="brand-grid-hero">
          <div className="brand-hero-tag">FALL / WINTER</div>
          <div className="brand-hero-title">COLLECTION</div>
        </div>
        <div className="brand-grid-sidebar">
          <div className="color-swatch-list">
            <span className="swatch s1"></span>
            <span className="swatch s2"></span>
            <span className="swatch s3"></span>
          </div>
        </div>
      </div>
      {/* Floating elements */}
      <div className="floating-el el-1">POSICIONAMENTO</div>
      <div className="floating-el el-2">HIGH DESIRE</div>
      <div className="floating-el el-3">GLOBAL SCALE</div>
      <div className="floating-el el-card">
        <div className="card-lbl">LTV PREDICTION</div>
        <div className="card-val">+180%</div>
      </div>
    </div>
  );
}

function CommerceScaleVisual() {
  const [sales, setSales] = useState([
    { id: 1, text: "Order #8491: $280.00 (Miami)", time: "Just now" },
    { id: 2, text: "Order #8492: €189.50 (Munich)", time: "1s ago" },
    { id: 3, text: "Order #8493: R$ 420,00 (SP)", time: "3s ago" }
  ]);

  useEffect(() => {
    const locations = ["London", "Paris", "New York", "São Paulo", "Tokyo", "Berlin", "Milan"];
    const currencies = ["$", "€", "£", "R$ "];
    const interval = setInterval(() => {
      const loc = locations[Math.floor(Math.random() * locations.length)];
      const cur = currencies[Math.floor(Math.random() * currencies.length)];
      const amt = (Math.random() * 200 + 80).toFixed(2);
      const id = Date.now();
      setSales(prev => [
        { id, text: `Order #${Math.floor(Math.random() * 8000 + 1000)}: ${cur}${amt} (${loc})`, time: "Just now" },
        ...prev.slice(0, 2)
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="visual-commerce-dashboard">
      <div className="dashboard-header">
        <span>LIVE GMV TRACKER</span>
        <span className="live-badge">● LIVE</span>
      </div>
      <div className="chart-container">
        <svg viewBox="0 0 400 150" className="chart-svg">
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M 0,130 Q 80,110 160,80 T 280,50 T 400,15" fill="none" stroke="var(--signal)" strokeWidth="3" className="chart-line-path" />
          <path d="M 0,130 Q 80,110 160,80 T 280,50 T 400,15 L 400,150 L 0,150 Z" fill="url(#chartGlow)" />
          <circle cx="400" cy="15" r="5" fill="var(--signal)" className="chart-pulse-point" />
        </svg>
      </div>
      <div className="live-feed">
        {sales.map(sale => (
          <div key={sale.id} className="live-sale-item">
            <span className="sale-text">{sale.text}</span>
            <span className="sale-time">{sale.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationSystemVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="visual-operation-pipeline">
      <div className="pipeline-header">GOON OPERATIONAL SYSTEM</div>
      <div className="pipeline-flow">
        {[
          { name: "SUPPLY", desc: "Cadeia" },
          { name: "HUB", desc: "Estoque" },
          { name: "FULFILL", desc: "Logística" },
          { name: "SCALE", desc: "Vendas" }
        ].map((node, index) => (
          <React.Fragment key={node.name}>
            <div className={`pipeline-node ${activeStep === index ? 'active' : ''}`}>
              <div className="node-icon">{index + 1}</div>
              <div className="node-name">{node.name}</div>
              <div className="node-desc">{node.desc}</div>
            </div>
            {index < 3 && (
              <div className={`pipeline-link ${activeStep === index ? 'active' : ''}`}>
                <div className="link-pulse"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="pipeline-metrics">
        <div className="p-metric">
          <span className="p-metric-val">-42%</span>
          <span className="p-metric-lbl">Lead Time</span>
        </div>
        <div className="p-metric">
          <span className="p-metric-val">+35%</span>
          <span className="p-metric-lbl">Estoque</span>
        </div>
        <div className="p-metric">
          <span className="p-metric-val">100%</span>
          <span className="p-metric-lbl">Rituais</span>
        </div>
      </div>
    </div>
  );
}

export default function Cases() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in'); // 'in' or 'out'
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const autoPlayDuration = 6000; // 6 seconds per slide
  const stepTime = 50; // update progress every 50ms

  // Handles smooth slide switching
  const handleSlideChange = (index) => {
    if (index === activeIndex) return;
    setFadeState('out');
    setTimeout(() => {
      setActiveIndex(index);
      setProgress(0);
      setFadeState('in');
    }, 300);
  };

  // Auto-play progress bar interval
  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + (stepTime / autoPlayDuration) * 100;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [isHovering, activeIndex]);

  // When progress hits 100, trigger slide change
  useEffect(() => {
    if (progress >= 100) {
      const nextIndex = (activeIndex + 1) % 3;
      setFadeState('out');
      const timeout = setTimeout(() => {
        setActiveIndex(nextIndex);
        setProgress(0);
        setFadeState('in');
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, activeIndex]);

  const caseKeys = ['c1', 'c2', 'c3'];
  const activeKey = caseKeys[activeIndex];

  return (
    <section className="section" id="cases">
      <div className="inner">
        <ScrollReveal className="section-head" stagger={0.15} once>
          <h2 className="chrome">{t('cases.title')}</h2>
          <p className="lead">
            {t('cases.lead')}
          </p>
        </ScrollReveal>

        <ScrollReveal className="cases-carousel-reveal" once>
          <div 
            className="cases-carousel-wrap"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="cases-carousel-grid">
              
              {/* Left Column: Case Text Content */}
              <div className={`cases-carousel-info fade-${fadeState}`}>
                <span className="cases-tag">{t(`cases.${activeKey}.tag`)}</span>
                <h3 className="cases-carousel-title">{t(`cases.${activeKey}.title`)}</h3>
                <p className="cases-carousel-desc">{t(`cases.${activeKey}.desc`)}</p>

                {/* Metrics Grid */}
                <div className="cases-metrics-grid">
                  <div className="cases-metric-card">
                    <span className="metric-val">{t(`cases.${activeKey}.m1v`)}</span>
                    <span className="metric-lbl">{t(`cases.${activeKey}.m1l`)}</span>
                  </div>
                  <div className="cases-metric-card">
                    <span className="metric-val">{t(`cases.${activeKey}.m2v`)}</span>
                    <span className="metric-lbl">{t(`cases.${activeKey}.m2l`)}</span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="cases-quote-card">
                  <p className="quote-text">"{t(`cases.${activeKey}.quote`)}"</p>
                  <span className="quote-author">— {t(`cases.${activeKey}.name`)} Founder</span>
                </div>
              </div>

              {/* Right Column: Visual Dashboard Bezel */}
              <div className="cases-visual-container">
                <div className="bezel-bar">
                  <div className="bezel-dots">
                    <div className="bezel-dot d1"></div>
                    <div className="bezel-dot d2"></div>
                    <div className="bezel-dot d3"></div>
                  </div>
                  <div className="bezel-url">goon.global/cases/{t(`cases.${activeKey}.name`).toLowerCase()}</div>
                  <div style={{ width: '30px' }}></div>
                </div>
                <div className="bezel-content">
                  <div className={`cases-visual-slide ${activeIndex === 0 ? 'active' : ''}`}>
                    <BrandBuildVisual />
                  </div>
                  <div className={`cases-visual-slide ${activeIndex === 1 ? 'active' : ''}`}>
                    <CommerceScaleVisual />
                  </div>
                  <div className={`cases-visual-slide ${activeIndex === 2 ? 'active' : ''}`}>
                    <OperationSystemVisual />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom: Tabs Navigation */}
            <div className="cases-nav-tabs">
              {caseKeys.map((key, index) => (
                <button
                  key={key}
                  className={`cases-tab-btn ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => handleSlideChange(index)}
                  type="button"
                >
                  <div className="tab-btn-content">
                    <span className="tab-num">0{index + 1}</span>
                    <span className="tab-title">{t(`cases.${key}.name`)}</span>
                  </div>
                  <div className="cases-tab-progress-bar">
                    <div 
                      className="cases-tab-progress-fill"
                      style={{ 
                        width: activeIndex === index ? `${progress}%` : '0%',
                        transition: activeIndex === index && progress > 0 ? 'width 0.05s linear' : 'none'
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
