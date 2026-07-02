import React from 'react';

/**
 * GlobeWireframe — converted from shadcn/Tailwind TypeScript component
 * to plain React JSX, compatible with the GOON design system.
 * All Tailwind arbitrary classes converted to inline style props.
 * Colors wired to the site's neon green design tokens.
 */
export default function GlobeWireframe({ fullGlobe = false, style = {} }) {
  const sectionVars = {
    '--line-color-1': '#C7F900',              /* neon green  */
    '--line-color-2': 'rgba(199,249,0,0.55)', /* mid green   */
    '--line-color-3': 'rgba(199,249,0,0.28)', /* faint green */
  };

  const svgTransform = fullGlobe
    ? 'translateY(0px) scale(1.002)'
    : 'translateY(-12.5%) scale(1.002)';

  const viewBox = fullGlobe ? '-1 -1 802 802' : '-1 -151 802 602';

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      minHeight: '320px',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      ...style,
    }}>
      <section style={{
        ...sectionVars,
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        aspectRatio: fullGlobe ? '1/1' : '2/1',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 5,
          marginLeft: '-0.5px',
          width: '100%',
        }}>
          <svg
            aria-hidden="true"
            height="100%"
            width="100%"
            viewBox={viewBox}
            style={{
              transform: svgTransform,
              '--guide-color': 'rgba(199,249,0,0.13)',
            }}
          >
            <defs>
              <clipPath id="half-globe-clip">
                <rect x="-1" y="-151" width="802" height="551" />
              </clipPath>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="globe-gradient"
                x1="0" x2="0" y1="0" y2="400"
              >
                <stop offset="0%"   stopColor="var(--guide-color)" />
                <stop offset="100%" stopColor="var(--guide-color)" />
              </linearGradient>
            </defs>

            {/* ── Globe wireframe grid ── */}
            <g
              data-testid="globe-wireframe"
              clipPath={fullGlobe ? 'none' : 'url(#half-globe-clip)'}
            >
              <circle cx="400" cy="400" fill="transparent" r="400" />
              {/* Meridians */}
              {[
                'M 400 800 A -400 400 0 0 0 400 0',
                'M 400 800 A -266.667 400 0 0 0 400 0',
                'M 400 800 A -133.333 400 0 0 0 400 0',
                'M 400 800 A 0 400 0 0 0 400 0',
                'M 400 0 A 133.333 400 0 0 0 400 800',
                'M 400 0 A 266.667 400 0 0 0 400 800',
                'M 400 0 A 400 400 0 0 0 400 800',
              ].map((d, i) => (
                <path key={i} d={d} fill="none" stroke="url(#globe-gradient)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
              {/* Parallels */}
              {[
                'M178.892,66.667 h442.217',
                'M101.858,133.333 h596.285',
                'M53.59,200 h692.82',
                'M22.876,266.667 h754.247',
                'M5.595,333.333 h788.811',
                'M0,400 h800',
              ].map((d, i) => (
                <path key={i} d={d} fill="none" stroke="url(#globe-gradient)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
              {fullGlobe && [
                'M5.595,466.667 h788.811',
                'M22.876,533.333 h754.247',
                'M53.59,600 h692.82',
                'M101.858,666.667 h596.285',
                'M178.892,733.333 h442.217',
              ].map((d, i) => (
                <path key={i} d={d} fill="none" stroke="url(#globe-gradient)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
            </g>

            {/* ── Animated data paths ── */}
            <g id="animated-paths">

              {/* Path group 1 — line-color-1 */}
              <g id="lllldll31" style={{ '--normal-color': 'var(--line-color-1)' }}>
                <path
                  d="M794.405,333.333 h-131.468M662.937,333.333 h-131.468M531.468,333.333 h-131.468M400,333.333 h-131.468M 268.532 333.333 A -133.333 400 0 0 0 266.667 400M266.667,400 h-133.333M133.333,400 h-133.333"
                  fill="none"
                  stroke="url(#lllldll31-gradient)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate attributeName="opacity" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="0;1;1;1;1;1;1;1;1;0;0" />
                </path>
                <defs>
                  <radialGradient cx="100" cy="100" gradientUnits="userSpaceOnUse" id="lllldll31-gradient" r="0" style={{ '--color': 'var(--normal-color)' }}>
                    <stop offset="0" stopColor="var(--color)" />
                    <stop offset="0.4" stopColor="var(--color)" />
                    <stop offset="1" stopColor="var(--color)" stopOpacity="0" />
                    <animate attributeName="cx" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="794.405;794.405;662.937;531.468;400;268.532;266.667;133.333;0;0;0" />
                    <animate attributeName="cy" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="333.333;333.333;333.333;333.333;333.333;333.333;400;400;400;400;0" />
                    <animate attributeName="r" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="0;100;100;100;100;100;100;100;100;0;0" />
                  </radialGradient>
                </defs>
              </g>

              {/* Path group 2 — line-color-2 */}
              <g id="llullldl34" style={{ '--normal-color': 'var(--line-color-2)' }}>
                <path
                  d="M698.142,133.333 h-99.381M598.762,133.333 h-99.381M 499.381 133.333 A 133.333 400 0 0 0 473.703 66.667M473.703,66.667 h-73.703M400,66.667 h-73.703M326.297,66.667 h-73.703M 252.594 66.667 A -266.667 400 0 0 0 201.238 133.333M201.238,133.333 h-99.381"
                  fill="none"
                  stroke="url(#llullldl34-gradient)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate attributeName="opacity" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="0;1;1;1;1;1;1;1;1;1;0;0" />
                </path>
                <defs>
                  <radialGradient cx="100" cy="100" gradientUnits="userSpaceOnUse" id="llullldl34-gradient" r="0" style={{ '--color': 'var(--normal-color)' }}>
                    <stop offset="0" stopColor="var(--color)" />
                    <stop offset="0.4" stopColor="var(--color)" />
                    <stop offset="1" stopColor="var(--color)" stopOpacity="0" />
                    <animate attributeName="cx" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="698.142;698.142;598.762;499.381;473.703;400;326.297;252.594;201.238;101.858;101.858;0" />
                    <animate attributeName="cy" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="133.333;133.333;133.333;133.333;66.667;66.667;66.667;66.667;133.333;133.333;133.333;0" />
                    <animate attributeName="r" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="0;50;50;50;50;50;50;50;50;50;0;0" />
                  </radialGradient>
                </defs>
              </g>

              {/* Path group 3 — line-color-1 */}
              <g id="llldlll35" style={{ '--normal-color': 'var(--line-color-1)' }}>
                <path
                  d="M621.108,66.667 h-73.703M547.406,66.667 h-73.703M473.703,66.667 h-73.703M 400 133.333 A 0 400 0 0 0 400 66.667M400,133.333 h-99.381M300.619,133.333 h-99.381M201.238,133.333 h-99.381"
                  fill="none"
                  stroke="url(#llldlll35-gradient)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate attributeName="opacity" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="0;1;1;1;1;1;1;1;1;0;0" />
                </path>
                <defs>
                  <radialGradient cx="100" cy="100" gradientUnits="userSpaceOnUse" id="llldlll35-gradient" r="0" style={{ '--color': 'var(--normal-color)' }}>
                    <stop offset="0" stopColor="var(--color)" />
                    <stop offset="0.4" stopColor="var(--color)" />
                    <stop offset="1" stopColor="var(--color)" stopOpacity="0" />
                    <animate attributeName="cx" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="621.108;621.108;547.406;473.703;400;400;300.619;201.238;101.858;101.858;0" />
                    <animate attributeName="cy" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="66.667;66.667;66.667;66.667;66.667;133.333;133.333;133.333;133.333;133.333;0" />
                    <animate attributeName="r" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="0;66.667;66.667;66.667;66.667;66.667;66.667;66.667;66.667;0;0" />
                  </radialGradient>
                </defs>
              </g>

              {/* Path group 4 — line-color-3 */}
              <g id="llddllll33" style={{ '--normal-color': 'var(--line-color-3)' }}>
                <path
                  d="M746.41,200 h-115.47M630.94,200 h-115.47M 525.708 266.667 A 133.333 400 0 0 0 515.47 200M 531.468 333.333 A 133.333 400 0 0 0 525.708 266.667M531.468,333.333 h-131.468M400,333.333 h-131.468M268.532,333.333 h-131.468M137.063,333.333 h-131.468"
                  fill="none"
                  stroke="url(#llddllll33-gradient)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate attributeName="opacity" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="0;1;1;1;1;1;1;1;1;1;0;0" />
                </path>
                <defs>
                  <radialGradient cx="100" cy="100" gradientUnits="userSpaceOnUse" id="llddllll33-gradient" r="0" style={{ '--color': 'var(--normal-color)' }}>
                    <stop offset="0" stopColor="var(--color)" />
                    <stop offset="0.4" stopColor="var(--color)" />
                    <stop offset="1" stopColor="var(--color)" stopOpacity="0" />
                    <animate attributeName="cx" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="746.41;746.41;630.94;515.47;525.708;531.468;400;268.532;137.063;5.595;5.595;0" />
                    <animate attributeName="cy" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="200;200;200;200;266.667;333.333;333.333;333.333;333.333;333.333;333.333;0" />
                    <animate attributeName="r" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="0;100;100;100;100;100;100;100;100;100;0;0" />
                  </radialGradient>
                </defs>
              </g>

              {/* Path group 5 — line-color-2 */}
              <g id="lllddlll34" style={{ '--normal-color': 'var(--line-color-2)' }}>
                <path
                  d="M698.142,133.333 h-99.381M598.762,133.333 h-99.381M499.381,133.333 h-99.381M 400 200 A 0 400 0 0 0 400 133.333M 400 266.667 A 0 400 0 0 0 400 200M400,266.667 h-125.708M274.292,266.667 h-125.708M148.584,266.667 h-125.708"
                  fill="none"
                  stroke="url(#lllddlll34-gradient)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate attributeName="opacity" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="0;1;1;1;1;1;1;1;1;1;0;0" />
                </path>
                <defs>
                  <radialGradient cx="100" cy="100" gradientUnits="userSpaceOnUse" id="lllddlll34-gradient" r="0" style={{ '--color': 'var(--normal-color)' }}>
                    <stop offset="0" stopColor="var(--color)" />
                    <stop offset="0.4" stopColor="var(--color)" />
                    <stop offset="1" stopColor="var(--color)" stopOpacity="0" />
                    <animate attributeName="cx" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="698.142;698.142;598.762;499.381;400;400;400;274.292;148.584;22.876;22.876;0" />
                    <animate attributeName="cy" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="133.333;133.333;133.333;133.333;133.333;200;266.667;266.667;266.667;266.667;266.667;0" />
                    <animate attributeName="r" dur="5.5s" keyTimes="0;0.082;0.164;0.245;0.327;0.409;0.491;0.573;0.655;0.736;0.818;1" repeatCount="indefinite" values="0;66.667;66.667;66.667;66.667;66.667;66.667;66.667;66.667;66.667;0;0" />
                  </radialGradient>
                </defs>
              </g>

              {/* Path group 6 — line-color-3 */}
              <g id="llullll32" style={{ '--normal-color': 'var(--line-color-3)' }}>
                <path
                  d="M777.124,266.667 h-125.708M651.416,266.667 h-125.708M 525.708 266.667 A 133.333 400 0 0 0 515.47 200M515.47,200 h-115.47M400,200 h-115.47M284.53,200 h-115.47M169.06,200 h-115.47"
                  fill="none"
                  stroke="url(#llullll32-gradient)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate attributeName="opacity" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="0;1;1;1;1;1;1;1;1;0;0" />
                </path>
                <defs>
                  <radialGradient cx="100" cy="100" gradientUnits="userSpaceOnUse" id="llullll32-gradient" r="0" style={{ '--color': 'var(--normal-color)' }}>
                    <stop offset="0" stopColor="var(--color)" />
                    <stop offset="0.4" stopColor="var(--color)" />
                    <stop offset="1" stopColor="var(--color)" stopOpacity="0" />
                    <animate attributeName="cx" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="777.124;777.124;651.416;525.708;515.47;400;284.53;169.06;53.59;53.59;0" />
                    <animate attributeName="cy" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="266.667;266.667;266.667;266.667;200;200;200;200;200;200;0" />
                    <animate attributeName="r" dur="5.5s" keyTimes="0;0.091;0.182;0.273;0.364;0.455;0.545;0.636;0.727;0.818;1" repeatCount="indefinite" values="0;50;50;50;50;50;50;50;50;0;0" />
                  </radialGradient>
                </defs>
              </g>

            </g>{/* end #animated-paths */}

            {/* Mirrored bottom hemisphere for fullGlobe */}
            {fullGlobe && (
              <g transform="translate(0,800) scale(1,-1)" style={{ opacity: 0.5 }}>
                <use href="#animated-paths" />
              </g>
            )}
          </svg>
        </div>
      </section>
    </div>
  );
}
