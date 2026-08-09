import React from 'react';

// Troque cada item por { name: 'Empresa', src: '/logos/empresa.svg' }.
// Enquanto `src` estiver vazio, o carrossel exibe um placeholder de texto.
const companies = [
  { name: 'Sua marca 01', src: null },
  { name: 'Sua marca 02', src: null },
  { name: 'Sua marca 03', src: null },
  { name: 'Sua marca 04', src: null },
  { name: 'Sua marca 05', src: null },
  { name: 'Sua marca 06', src: null },
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
