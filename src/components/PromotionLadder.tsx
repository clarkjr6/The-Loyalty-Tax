import React from 'react';

interface PromotionLadderProps {
  promoRaisePct?: number; // default 10%
  marketJumpPct?: number; // default 15%
  theme?: 'dark' | 'light' | 'blueprint';
}

export const PromotionLadder: React.FC<PromotionLadderProps> = ({
  promoRaisePct = 10,
  marketJumpPct = 15,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const lagDelta = Math.max(0, marketJumpPct - promoRaisePct);
  // Compact proportional geometry
  // Baseline ground is at Y = 126
  // Promotion step top is at Y = 74 (height = 52)
  // When lagDelta = 5, gap is 24px (marketTopY = 50, marketHeight = 76)
  const gapHeight = (lagDelta / 10) * 48;
  const marketTopY = Math.max(20, 74 - gapHeight);
  const marketHeight = 126 - marketTopY;
  const badgeY = (marketTopY + 74) / 2;

  return (
    <div className="flex flex-col items-center w-full" data-testid="promotion-ladder">
      <div className="relative w-full max-w-[340px] h-[138px]">
        <svg
          viewBox="0 0 360 142"
          className="w-full h-full overflow-visible"
          aria-label="Diagram showing the disparity between internal promotion raise and market value jump"
        >
          <defs>
            <linearGradient id="platformTealGradTight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="40%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>

            <linearGradient id="promoBlockGradTight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <filter id="stepShadowTight" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity={isLight ? 0.15 : 0.4} />
            </filter>
          </defs>

          {/* Ground Baseline */}
          <line
            x1="15"
            y1="126"
            x2="345"
            y2="126"
            stroke={isLight ? '#D6D3D1' : '#3F3F46'}
            strokeWidth="2"
          />

          {/* Base Step 1 (Current Role Baseline) */}
          <g transform="translate(25, 110)">
            <rect
              x="0"
              y="0"
              width="68"
              height="16"
              fill={isLight ? '#E7E5E4' : '#27272A'}
              stroke={isLight ? '#A8A29E' : '#52525B'}
              strokeWidth="1.2"
              rx="2"
            />
            <text
              x="34"
              y="11"
              textAnchor="middle"
              fill={isLight ? '#78716C' : '#A1A1AA'}
              fontSize="7.5"
              fontWeight="800"
              letterSpacing="0.04em"
              fontFamily="Inter, sans-serif"
            >
              BASE ROLE
            </text>
          </g>

          {/* Step 2 (Internal Promotion Step - 10%) */}
          <g transform="translate(115, 74)" filter="url(#stepShadowTight)">
            <rect
              x="0"
              y="0"
              width="90"
              height="52"
              fill="url(#promoBlockGradTight)"
              stroke="#B45309"
              strokeWidth="1.5"
              rx="3"
            />
            <circle cx="6" cy="6" r="1.5" fill="#78350F" />
            <circle cx="84" cy="6" r="1.5" fill="#78350F" />
            <circle cx="6" cy="46" r="1.5" fill="#78350F" />
            <circle cx="84" cy="46" r="1.5" fill="#78350F" />

            {/* 10% Badge on step */}
            <rect x="24" y="6" width="42" height="18" fill="#FFFFFF" rx="3" stroke="#B45309" strokeWidth="1" />
            <text
              x="45"
              y="19"
              textAnchor="middle"
              fill="#92400E"
              fontSize="11.5"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {promoRaisePct}%
            </text>

            {/* Promotion Banner */}
            <rect x="8" y="28" width="74" height="18" fill="#78350F" rx="2" />
            <text
              x="45"
              y="40.5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="8.5"
              fontWeight="900"
              letterSpacing="0.06em"
              fontFamily="Inter, sans-serif"
            >
              PROMOTION
            </text>
          </g>

          {/* Step 3 (External Market Value Target Platform - 15% Next Level) */}
          <g transform={`translate(235, ${marketTopY})`} filter="url(#stepShadowTight)">
            <rect
              x="0"
              y="0"
              width="95"
              height={marketHeight}
              fill="url(#platformTealGradTight)"
              stroke="#115E59"
              strokeWidth="1.5"
              rx="3"
            />
            <circle cx="6" cy="6" r="1.5" fill="#99F6E4" />
            <circle cx="89" cy="6" r="1.5" fill="#99F6E4" />
            <circle cx="6" cy={Math.max(12, marketHeight - 6)} r="1.5" fill="#99F6E4" />
            <circle cx="89" cy={Math.max(12, marketHeight - 6)} r="1.5" fill="#99F6E4" />

            {/* Market Value Badge Header */}
            <rect x="22" y="-13" width="50" height="20" fill="#042F2E" rx="3" stroke="#2DD4BF" strokeWidth="1.5" />
            <text
              x="47"
              y="1.5"
              textAnchor="middle"
              fill="#2DD4BF"
              fontSize="12"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {marketJumpPct}%
            </text>

            <text
              x="47.5"
              y="20"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="9.5"
              fontWeight="900"
              letterSpacing="0.05em"
              fontFamily="Inter, sans-serif"
            >
              MARKET
            </text>
            <text
              x="47.5"
              y="32"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="9.5"
              fontWeight="900"
              letterSpacing="0.05em"
              fontFamily="Inter, sans-serif"
            >
              VALUE
            </text>
            <text
              x="47.5"
              y="44"
              textAnchor="middle"
              fill="#CCFBF1"
              fontSize="7.5"
              fontWeight="800"
              letterSpacing="0.03em"
              fontFamily="Inter, sans-serif"
            >
              (NEW ROLE)
            </text>

            <line x1="12" y1="53" x2="83" y2="53" stroke="#2DD4BF" strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="2 2" />
            <text
              x="47.5"
              y="65"
              textAnchor="middle"
              fill="#99F6E4"
              fontSize="7.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              Full Market Parity
            </text>
          </g>

          {/* Dotted guide line from top of Promotion step (Y=74) to market platform */}
          <line
            x1="205"
            y1="74"
            x2="235"
            y2="74"
            stroke="#F59E0B"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />

          {/* Vertical Gap Bracket */}
          {gapHeight > 4 && (
            <g transform={`translate(216, ${marketTopY})`}>
              <line x1="6" y1="5" x2="6" y2={gapHeight - 5} stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 2" />
              <polygon points="6,0 3,5 9,5" fill="#F43F5E" />
              <polygon points={`6,${gapHeight} 3,${gapHeight - 5} 9,${gapHeight - 5}`} fill="#F43F5E" />
            </g>
          )}

          {/* Floating Tag */}
          <g transform={`translate(162, ${badgeY})`}>
            <rect
              x="-36"
              y="-8"
              width="72"
              height="16"
              rx="2.5"
              fill={isLight ? '#FFFFFF' : '#18181B'}
              stroke="#F43F5E"
              strokeWidth="0.8"
            />
            <text
              x="0"
              y="2.5"
              textAnchor="middle"
              fill="#F43F5E"
              fontSize="7.5"
              fontWeight="900"
              letterSpacing="0.03em"
              fontFamily="Inter, sans-serif"
            >
              +{lagDelta}% LAG DELTA
            </text>
          </g>

          {/* Left Callout Annotation: "10% Promotional Raise" */}
          <g transform="translate(18, 55)">
            <text
              x="0"
              y="0"
              fill={isLight ? '#111827' : '#F9FAFB'}
              fontSize="12.5"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {promoRaisePct}%
            </text>
            <text
              x="0"
              y="13"
              fill={isLight ? '#44403C' : '#D1D5DB'}
              fontSize="8.5"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              Promotional
            </text>
            <text
              x="0"
              y="23"
              fill={isLight ? '#44403C' : '#D1D5DB'}
              fontSize="8.5"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              Raise
            </text>

            <path
              d="M32 12 C50 12 60 24 70 24"
              fill="none"
              stroke={isLight ? '#78716C' : '#71717A'}
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            <polygon
              points="73,24 67,21.5 67,26.5"
              fill={isLight ? '#78716C' : '#71717A'}
            />
          </g>
        </svg>
      </div>

      <p
        className={`mt-0.5 text-center text-[10.5px] leading-snug px-2 ${
          isLight ? 'text-stone-700' : 'text-stone-300'
        }`}
      >
        Promotion gives <span className="font-extrabold text-amber-500">{promoRaisePct}%</span>, but next role market value jumps <span className="font-extrabold text-teal-400">{marketJumpPct}%</span>.
      </p>
    </div>
  );
};
