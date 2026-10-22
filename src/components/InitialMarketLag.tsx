import React from 'react';

interface InitialMarketLagProps {
  lagPct?: number; // default 20%
  theme?: 'dark' | 'light' | 'blueprint';
}

export const InitialMarketLag: React.FC<InitialMarketLagProps> = ({
  lagPct = 20,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // SVG coordinates:
  // Band runs from x = 30 to x = 330 (width = 300)
  // Min = x: 30, Mid = x: 180, Max = x: 330
  // Employee hired at -20% lag from Mid (Mid is 180, -20% corresponds to x = 60)
  const minX = 30;
  const midX = 180;
  const maxX = 330;
  const hiredX = 60;

  return (
    <div className="flex flex-col items-center w-full" data-testid="initial-market-lag">
      <div className="relative w-full max-w-[340px] h-[82px]">
        <svg
          viewBox="0 0 360 82"
          className="w-full h-full overflow-visible"
          aria-label="Diagram showing pay band range with min, mid, max and employee hired with -20% market lag"
        >
          <defs>
            <linearGradient id="payBandGradTight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" stopOpacity="0.75" />
              <stop offset="35%" stopColor="#B45309" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#0F766E" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#115E59" stopOpacity="0.6" />
            </linearGradient>

            <filter id="lagMarkerShadowTight" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity={isLight ? 0.2 : 0.5} />
            </filter>
          </defs>

          {/* Pay Band Container Bar */}
          <rect
            x={minX}
            y="32"
            width={maxX - minX}
            height="14"
            rx="4"
            fill="url(#payBandGradTight)"
            stroke={isLight ? '#A8A29E' : '#3F3F46'}
            strokeWidth="1.2"
          />

          {/* Midpoint zone divider in band */}
          <line
            x1={midX}
            y1="32"
            x2={midX}
            y2="46"
            stroke="#2DD4BF"
            strokeWidth="1.8"
            strokeDasharray="2 1"
          />

          {/* Deficit Span Highlight (from Hired to Mid) */}
          <rect
            x={hiredX}
            y="34"
            width={midX - hiredX}
            height="10"
            fill="#F59E0B"
            fillOpacity="0.3"
            rx="2"
          />

          {/* --- GAP BRACKET BETWEEN HIRED AND MIDPOINT --- */}
          <g>
            <line
              x1={hiredX + 4}
              y1="20"
              x2={midX - 4}
              y2="20"
              stroke="#F43F5E"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            <line x1={hiredX + 4} y1="17" x2={hiredX + 4} y2="23" stroke="#F43F5E" strokeWidth="1" />
            <line x1={midX - 4} y1="17" x2={midX - 4} y2="23" stroke="#F43F5E" strokeWidth="1" />

            {/* Gap Delta Badge */}
            <rect
              x={(hiredX + midX) / 2 - 28}
              y="11"
              width="56"
              height="15"
              rx="2.5"
              fill={isLight ? '#FFFFFF' : '#18181B'}
              stroke="#F43F5E"
              strokeWidth="0.8"
            />
            <text
              x={(hiredX + midX) / 2}
              y="21.5"
              textAnchor="middle"
              fill="#F43F5E"
              fontSize="7.5"
              fontWeight="900"
              letterSpacing="0.03em"
              fontFamily="Inter, sans-serif"
            >
              -{lagPct}% DEFICIT
            </text>
          </g>

          {/* --- TICK: MIN (Left) --- */}
          <g transform={`translate(${minX}, 0)`}>
            <line x1="0" y1="29" x2="0" y2="49" stroke={isLight ? '#78716C' : '#71717A'} strokeWidth="1.2" />
            <text
              x="0"
              y="59"
              textAnchor="middle"
              fill={isLight ? '#57534E' : '#A1A1AA'}
              fontSize="8"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              MIN
            </text>
            <text
              x="0"
              y="68"
              textAnchor="middle"
              fill={isLight ? '#78716C' : '#71717A'}
              fontSize="6.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              (Entry)
            </text>
          </g>

          {/* --- TICK: MID / MARKET TARGET (Center) --- */}
          <g transform={`translate(${midX}, 0)`}>
            <line x1="0" y1="28" x2="0" y2="50" stroke="#2DD4BF" strokeWidth="2" />
            <circle cx="0" cy="28" r="2.5" fill="#2DD4BF" />

            <text
              x="0"
              y="59"
              textAnchor="middle"
              fill="#2DD4BF"
              fontSize="8.5"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              MID
            </text>
            <text
              x="0"
              y="68"
              textAnchor="middle"
              fill={isLight ? '#0F766E' : '#99F6E4'}
              fontSize="7"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              (Market Parity)
            </text>
          </g>

          {/* --- TICK: MAX (Right) --- */}
          <g transform={`translate(${maxX}, 0)`}>
            <line x1="0" y1="29" x2="0" y2="49" stroke={isLight ? '#78716C' : '#71717A'} strokeWidth="1.2" />
            <text
              x="0"
              y="59"
              textAnchor="middle"
              fill={isLight ? '#57534E' : '#A1A1AA'}
              fontSize="8"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              MAX
            </text>
            <text
              x="0"
              y="68"
              textAnchor="middle"
              fill={isLight ? '#78716C' : '#71717A'}
              fontSize="6.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              (Top)
            </text>
          </g>

          {/* --- EMPLOYEE HIRE MARKER (-20% LAG) --- */}
          <g transform={`translate(${hiredX}, 0)`} filter="url(#lagMarkerShadowTight)">
            <line x1="0" y1="12" x2="0" y2="39" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="0" cy="39" r="4.5" fill="#F59E0B" stroke="#000000" strokeWidth="1.5" />
            <circle cx="0" cy="39" r="1.5" fill="#FFFFFF" />

            {/* Top Badge: "HIRED: -20%" */}
            <g transform="translate(0, 1)">
              <rect
                x="-30"
                y="-5"
                width="60"
                height="15"
                rx="3"
                fill="#B45309"
                stroke="#FBBF24"
                strokeWidth="1"
              />
              <text
                x="0"
                y="5.5"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="7.5"
                fontWeight="900"
                letterSpacing="0.02em"
                fontFamily="Inter, sans-serif"
              >
                HIRED: -{lagPct}%
              </text>
            </g>
          </g>
        </svg>
      </div>

      <p
        className={`mt-0.5 text-center text-[10.5px] leading-snug px-2 ${
          isLight ? 'text-stone-700' : 'text-stone-300'
        }`}
      >
        Hired <span className="font-extrabold text-amber-500">-{lagPct}% below market midpoint</span>, starting in an immediate deficit.
      </p>
    </div>
  );
};
