import React from 'react';

interface PromotionLadderProps {
  promoRaisePct?: number; // default 10%
  marketJumpPct?: number; // default 20%
  theme?: 'dark' | 'light' | 'blueprint';
}

export const PromotionLadder: React.FC<PromotionLadderProps> = ({
  promoRaisePct = 10,
  marketJumpPct = 20,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div className="flex flex-col items-center w-full" data-testid="promotion-ladder">
      <div className="relative w-full max-w-[360px] h-[200px]">
        <svg
          viewBox="0 0 360 200"
          className="w-full h-full overflow-visible"
          aria-label="Diagram showing the disparity between internal promotion raise and market value jump"
        >
          <defs>
            <linearGradient id="platformTealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="40%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>

            <linearGradient id="promoBlockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="goldHatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CEB888" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#CEB888" stopOpacity="0.05" />
            </linearGradient>

            <filter id="stepShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity={isLight ? 0.15 : 0.4} />
            </filter>
          </defs>

          {/* Ground Baseline */}
          <line
            x1="15"
            y1="175"
            x2="345"
            y2="175"
            stroke={isLight ? '#D6D3D1' : '#3F3F46'}
            strokeWidth="2.5"
          />

          {/* Base Step 1 (Current Role Baseline) */}
          <g transform="translate(25, 155)">
            <rect
              x="0"
              y="0"
              width="70"
              height="20"
              fill={isLight ? '#E7E5E4' : '#27272A'}
              stroke={isLight ? '#A8A29E' : '#52525B'}
              strokeWidth="1.5"
              rx="2"
            />
            <text
              x="35"
              y="13"
              textAnchor="middle"
              fill={isLight ? '#78716C' : '#A1A1AA'}
              fontSize="8.5"
              fontWeight="800"
              letterSpacing="0.04em"
              fontFamily="Inter, sans-serif"
            >
              BASE ROLE
            </text>
          </g>

          {/* Step 2 (Internal Promotion Step - 10%) */}
          <g transform="translate(115, 105)" filter="url(#stepShadow)">
            {/* Step Block */}
            <rect
              x="0"
              y="0"
              width="95"
              height="70"
              fill="url(#promoBlockGrad)"
              stroke="#B45309"
              strokeWidth="2"
              rx="4"
            />
            {/* Rivets / Industrial accents */}
            <circle cx="8" cy="8" r="1.8" fill="#78350F" />
            <circle cx="87" cy="8" r="1.8" fill="#78350F" />
            <circle cx="8" cy="62" r="1.8" fill="#78350F" />
            <circle cx="87" cy="62" r="1.8" fill="#78350F" />

            {/* 10% Badge on step */}
            <rect x="25" y="10" width="45" height="22" fill="#FFFFFF" rx="4" stroke="#B45309" strokeWidth="1.2" />
            <text
              x="47.5"
              y="25"
              textAnchor="middle"
              fill="#92400E"
              fontSize="13"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {promoRaisePct}%
            </text>

            {/* Promotion Banner */}
            <rect x="8" y="38" width="79" height="22" fill="#78350F" rx="3" />
            <text
              x="47.5"
              y="53"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0.08em"
              fontFamily="Inter, sans-serif"
            >
              PROMOTION
            </text>
          </g>

          {/* Step 3 (External Market Value Target Platform - 20% Next Level) */}
          <g transform="translate(235, 40)" filter="url(#stepShadow)">
            {/* Tower Pillar */}
            <rect
              x="0"
              y="0"
              width="100"
              height="135"
              fill="url(#platformTealGrad)"
              stroke="#115E59"
              strokeWidth="2"
              rx="4"
            />
            {/* Architectural details / Rivets */}
            <circle cx="8" cy="8" r="2" fill="#99F6E4" />
            <circle cx="92" cy="8" r="2" fill="#99F6E4" />
            <circle cx="8" cy="127" r="2" fill="#99F6E4" />
            <circle cx="92" cy="127" r="2" fill="#99F6E4" />

            {/* Market Value Badge Header */}
            <rect x="22" y="-16" width="56" height="24" fill="#042F2E" rx="4" stroke="#2DD4BF" strokeWidth="1.8" />
            <text
              x="50"
              y="1"
              textAnchor="middle"
              fill="#2DD4BF"
              fontSize="14"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {marketJumpPct}%
            </text>

            <text
              x="50"
              y="32"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="900"
              letterSpacing="0.06em"
              fontFamily="Inter, sans-serif"
            >
              MARKET
            </text>
            <text
              x="50"
              y="48"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="900"
              letterSpacing="0.06em"
              fontFamily="Inter, sans-serif"
            >
              VALUE
            </text>
            <text
              x="50"
              y="66"
              textAnchor="middle"
              fill="#CCFBF1"
              fontSize="9"
              fontWeight="800"
              letterSpacing="0.04em"
              fontFamily="Inter, sans-serif"
            >
              (NEW ROLE)
            </text>

            {/* Subtle internal grid bars */}
            <line x1="15" y1="84" x2="85" y2="84" stroke="#2DD4BF" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />
            <text
              x="50"
              y="102"
              textAnchor="middle"
              fill="#99F6E4"
              fontSize="8.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              Full Market Parity
            </text>
          </g>

          {/* Disparity Gap Visualizer between 10% step and 20% platform */}
          {/* Dotted line extending from top of Promotion step (Y=105) to market platform */}
          <line
            x1="210"
            y1="105"
            x2="235"
            y2="105"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Vertical Gap Bracket showing uncaptured value */}
          <g transform="translate(216, 40)">
            {/* Upward double arrow */}
            <line x1="8" y1="6" x2="8" y2="60" stroke="#F43F5E" strokeWidth="2" strokeDasharray="2 2" />
            <polygon points="8,0 4,8 12,8" fill="#F43F5E" />
            <polygon points="8,65 4,57 12,57" fill="#F43F5E" />
          </g>

          {/* Floating Tag: Uncaptured Gap */}
          <g transform="translate(162, 58)">
            <rect
              x="-42"
              y="-10"
              width="84"
              height="20"
              rx="3"
              fill={isLight ? '#FFFFFF' : '#18181B'}
              stroke="#F43F5E"
              strokeWidth="1"
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fill="#F43F5E"
              fontSize="8"
              fontWeight="900"
              letterSpacing="0.04em"
              fontFamily="Inter, sans-serif"
            >
              +10% LAG DELTA
            </text>
          </g>

          {/* Left Callout Annotation: "10% Promotional Raise" */}
          <g transform="translate(18, 80)">
            <text
              x="0"
              y="0"
              fill={isLight ? '#111827' : '#F9FAFB'}
              fontSize="15"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {promoRaisePct}%
            </text>
            <text
              x="0"
              y="16"
              fill={isLight ? '#44403C' : '#D1D5DB'}
              fontSize="10"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              Promotional
            </text>
            <text
              x="0"
              y="29"
              fill={isLight ? '#44403C' : '#D1D5DB'}
              fontSize="10"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              Raise
            </text>

            {/* Stepping arrow indicator pointing to promotion step */}
            <path
              d="M35 15 C55 15 65 30 75 30"
              fill="none"
              stroke={isLight ? '#78716C' : '#71717A'}
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <polygon
              points="78,30 72,27 72,33"
              fill={isLight ? '#78716C' : '#71717A'}
            />
          </g>
        </svg>
      </div>

      {/* Caption text matching the reference graphic */}
      <p
        className={`mt-2 text-center text-xs leading-snug px-3 ${
          isLight ? 'text-stone-700' : 'text-stone-300'
        }`}
      >
        While a promotion typically grants a{' '}
        <span className="font-extrabold text-amber-500">{promoRaisePct}% raise</span>, the market value for that next
        level jumps by <span className="font-extrabold text-teal-400">{marketJumpPct}%</span>.
      </p>
    </div>
  );
};
