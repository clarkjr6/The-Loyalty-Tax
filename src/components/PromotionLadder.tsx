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
      <div className="relative w-full max-w-[360px] h-[210px]">
        <svg
          viewBox="0 0 360 210"
          className="w-full h-full overflow-visible"
          aria-label="Illustration showing the disparity between internal promotion raise and market value jump"
        >
          <defs>
            <linearGradient id="peteGoldHead" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DF9E" />
              <stop offset="50%" stopColor="#CEB888" />
              <stop offset="100%" stopColor="#9E7A1C" />
            </linearGradient>

            <linearGradient id="platformTealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="40%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>

            <linearGradient id="promoBlockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <filter id="peteDropShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
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

          {/* Base Step 1 (Current Role) */}
          <rect
            x="25"
            y="164"
            width="75"
            height="11"
            fill={isLight ? '#E7E5E4' : '#27272A'}
            stroke={isLight ? '#A8A29E' : '#52525B'}
            strokeWidth="1.5"
            rx="1"
          />

          {/* Step 2 (Internal Promotion Step - 10%) */}
          <g transform="translate(130, 115)">
            {/* Step Block */}
            <rect
              x="0"
              y="0"
              width="85"
              height="60"
              fill="url(#promoBlockGrad)"
              stroke="#B45309"
              strokeWidth="2"
              rx="3"
            />
            {/* Rivets */}
            <circle cx="6" cy="6" r="1.5" fill="#78350F" />
            <circle cx="79" cy="6" r="1.5" fill="#78350F" />
            <circle cx="6" cy="54" r="1.5" fill="#78350F" />
            <circle cx="79" cy="54" r="1.5" fill="#78350F" />

            {/* Promotion Banner */}
            <rect x="5" y="34" width="75" height="20" fill="#92400E" rx="2" />
            <text
              x="42.5"
              y="48"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="9.5"
              fontWeight="900"
              letterSpacing="0.08em"
              fontFamily="Inter, sans-serif"
            >
              PROMOTION
            </text>

            {/* 10% Badge on step */}
            <rect x="23" y="10" width="39" height="20" fill="#FFFFFF" rx="3" stroke="#B45309" strokeWidth="1" />
            <text
              x="42.5"
              y="24"
              textAnchor="middle"
              fill="#92400E"
              fontSize="12"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {promoRaisePct}%
            </text>
          </g>

          {/* Step 3 (External Market Value Target Platform - 20% Next Level) */}
          <g transform="translate(240, 48)">
            {/* Tower Pillar */}
            <rect
              x="0"
              y="0"
              width="90"
              height="127"
              fill="url(#platformTealGrad)"
              stroke="#115E59"
              strokeWidth="2"
              rx="3"
            />
            {/* Engineering Grid / Rivets */}
            <circle cx="8" cy="8" r="2" fill="#99F6E4" />
            <circle cx="82" cy="8" r="2" fill="#99F6E4" />
            <circle cx="8" cy="119" r="2" fill="#99F6E4" />
            <circle cx="82" cy="119" r="2" fill="#99F6E4" />

            {/* Market Value Badge Header */}
            <rect x="20" y="-16" width="50" height="22" fill="#042F2E" rx="4" stroke="#2DD4BF" strokeWidth="1.8" />
            <text
              x="45"
              y="0"
              textAnchor="middle"
              fill="#2DD4BF"
              fontSize="13"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {marketJumpPct}%
            </text>

            <text
              x="45"
              y="32"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0.06em"
              fontFamily="Inter, sans-serif"
            >
              MARKET
            </text>
            <text
              x="45"
              y="46"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0.06em"
              fontFamily="Inter, sans-serif"
            >
              VALUE
            </text>
            <text
              x="45"
              y="62"
              textAnchor="middle"
              fill="#CCFBF1"
              fontSize="8.5"
              fontWeight="800"
              letterSpacing="0.04em"
              fontFamily="Inter, sans-serif"
            >
              (NEW ROLE)
            </text>
          </g>

          {/* Boilermaker Pete Character Striding Confidently */}
          <g transform="translate(78, 38)" filter="url(#peteDropShadow)">
            {/* Hard Hat */}
            <g transform="translate(62, 8)">
              {/* Hat dome */}
              <path d="M-10 6 C-10 -2 10 -2 10 6 Z" fill="url(#peteGoldHead)" stroke="#000" strokeWidth="1.5" />
              {/* Hat brim */}
              <ellipse cx="0" cy="6" rx="14" ry="3.5" fill="url(#peteGoldHead)" stroke="#000" strokeWidth="1.5" />
              {/* Motion P badge on hat */}
              <text x="0" y="4" textAnchor="middle" fill="#000" fontSize="6" fontWeight="900">
                P
              </text>
            </g>

            {/* Pete Face & Jaw */}
            <circle cx="62" cy="18" r="7" fill="#F8D3B0" stroke="#000" strokeWidth="1.5" />
            {/* Eye looking upward toward the 20% target */}
            <circle cx="65" cy="16" r="1.2" fill="#000" />
            <circle cx="65.5" cy="15.5" r="0.4" fill="#FFF" />
            <path d="M63 21 Q66 22 68 20" stroke="#000" strokeWidth="1" fill="none" />

            {/* Pete Torso (Athletic Dark Suit / Jacket with Purdue Gold Lapel & Tie) */}
            <path
              d="M52 25 L72 25 L76 60 L48 60 Z"
              fill="#18181B"
              stroke="#000"
              strokeWidth="2"
            />
            {/* Shirt Collar */}
            <polygon points="59,25 62,31 65,25" fill="#FFFFFF" />
            {/* Purdue Gold Tie */}
            <polygon points="61,25 63,25 64,44 62,48 60,44" fill="#CEB888" stroke="#9E7A1C" strokeWidth="0.8" />

            {/* Left Arm reaching boldly up and forward */}
            <path
              d="M71 30 L96 20 L110 22"
              fill="none"
              stroke="#18181B"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Hand */}
            <circle cx="110" cy="22" r="3.5" fill="#F8D3B0" stroke="#000" strokeWidth="1.2" />

            {/* Right Arm swinging back with momentum */}
            <path
              d="M53 30 L40 44 L34 46"
              fill="none"
              stroke="#18181B"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="34" cy="46" r="3.5" fill="#F8D3B0" stroke="#000" strokeWidth="1.2" />

            {/* Left Leg: Powerful step onto the Promotion stair */}
            <path
              d="M66 60 L78 80 L96 84 L96 108"
              fill="none"
              stroke="#1E3A8A"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left Shoe on step */}
            <rect x="92" y="108" width="18" height="7" rx="2" fill="#000000" stroke="#CEB888" strokeWidth="0.8" />

            {/* Right Leg: Planted trailing on lower step */}
            <path
              d="M52 60 L42 84 L30 114"
              fill="none"
              stroke="#1E3A8A"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Shoe */}
            <rect x="22" y="114" width="18" height="7" rx="2" fill="#000000" stroke="#CEB888" strokeWidth="0.8" />
          </g>

          {/* Left Callout Annotation: "10% Promotional Raise" */}
          <g transform="translate(18, 75)">
            <text
              x="0"
              y="0"
              fill={isLight ? '#111827' : '#F9FAFB'}
              fontSize="14"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {promoRaisePct}%
            </text>
            <text
              x="0"
              y="15"
              fill={isLight ? '#44403C' : '#D1D5DB'}
              fontSize="9.5"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              Promotional
            </text>
            <text
              x="0"
              y="27"
              fill={isLight ? '#44403C' : '#D1D5DB'}
              fontSize="9.5"
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              Raise
            </text>
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
