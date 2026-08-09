import React from 'react';

const companies = [
  { name: 'Empresa 02', src: '/logos/empresa-02.svg' },
  { name: 'Empresa 03', src: '/logos/empresa-03.svg' },
  { name: 'Empresa 04', src: '/logos/empresa-04.svg' },
  { name: 'Empresa 05', src: '/logos/empresa-05.svg' },
  { name: 'Empresa 06', src: '/logos/empresa-06.svg' },
  { name: 'Empresa 07', src: '/logos/empresa-07.svg' },
];

function LogoItem({ company }) {
  return (
    <div className="logo-carousel-item">
      {company.src ? (
        <img
          src={company.src}
          alt={company.name}
          width="220"
          height="72"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="logo-carousel-placeholder">{company.name}</span>
      )}
    </div>
  );
}

export default function LogoCarousel() {
  return (
    <section className="logo-carousel-section" aria-labelledby="logo-carousel-title">
      <p className="logo-carousel-label" id="logo-carousel-title">
        Empresas que fazem parte do nosso ecossistema
      </p>

      <div className="logo-carousel" role="region" aria-label="Logos de empresas">
        <div className="logo-carousel-track">
          {[0, 1].map((copy) => (
            <div
              className="logo-carousel-group"
              key={copy}
              aria-hidden={copy === 1 ? 'true' : undefined}
            >
              {companies.map((company) => (
                <LogoItem company={company} key={`${copy}-${company.name}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
