import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'black' | 'white';
}

export const PurdueMotionP: React.FC<LogoProps> = ({ className = '', size = 36, variant = 'gold' }) => {
  const fillColor = variant === 'black' ? '#000000' : variant === 'white' ? '#FFFFFF' : '#CEB888';
  const strokeColor = variant === 'gold' ? '#9E7A1C' : '#000000';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="Purdue Motion P Logo"
    >
      <defs>
        <linearGradient id="purdueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EAD8A4" />
          <stop offset="50%" stopColor="#CEB888" />
          <stop offset="100%" stopColor="#A88B4B" />
        </linearGradient>
        <filter id="boilerShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Purdue Athletic Block 'P' with motion slant */}
      <g filter="url(#boilerShadow)">
        <path
          d="M22 18 H76 C94 18 106 28 106 48 C106 67 93 78 76 78 H46 V104 H22 Z"
          fill="#000000"
          stroke={variant === 'gold' ? '#CEB888' : '#333333'}
          strokeWidth="4"
        />
        <path
          d="M26 22 H74 C89 22 98 30 98 48 C98 63 87 74 74 74 H42 V100 H26 Z"
          fill="url(#purdueGoldGrad)"
        />
        {/* Inner cutout of P */}
        <path
          d="M48 38 H70 C78 38 82 42 82 48 C82 54 78 58 70 58 H48 Z"
          fill="#000000"
        />
      </g>
    </svg>
  );
};

export const BoilermakerSpecialTrainIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Boilermaker Special Locomotive Icon"
    >
      {/* Cowcatcher / Pilot */}
      <polygon points="4,50 16,38 16,50" fill="#CEB888" stroke="#000" strokeWidth="2" />
      {/* Locomotive Boiler & Cab */}
      <rect x="14" y="30" width="30" height="20" rx="3" fill="#1C1C1C" stroke="#CEB888" strokeWidth="2" />
      <rect x="40" y="20" width="18" height="30" rx="2" fill="#000" stroke="#CEB888" strokeWidth="2" />
      {/* Cab Window */}
      <rect x="46" y="24" width="8" height="8" rx="1" fill="#CEB888" />
      {/* Smokestack with gold ring */}
      <rect x="20" y="18" width="8" height="12" fill="#1C1C1C" stroke="#CEB888" strokeWidth="1.5" />
      <polygon points="18,18 30,18 28,14 20,14" fill="#CEB888" />
      {/* Headlight */}
      <circle cx="12" cy="34" r="3.5" fill="#FFF4BD" stroke="#CEB888" strokeWidth="1.5" />
      {/* Steam puffs */}
      <circle cx="26" cy="10" r="3" fill="#EAD8A4" fillOpacity="0.8" />
      <circle cx="34" cy="7" r="4.5" fill="#EAD8A4" fillOpacity="0.5" />
      {/* Wheels */}
      <circle cx="22" cy="52" r="6" fill="#CEB888" stroke="#000" strokeWidth="2" />
      <circle cx="34" cy="52" r="6" fill="#CEB888" stroke="#000" strokeWidth="2" />
      <circle cx="48" cy="50" r="8" fill="#CEB888" stroke="#000" strokeWidth="2" />
      {/* Connecting rod */}
      <line x1="22" y1="52" x2="48" y2="50" stroke="#000" strokeWidth="3" />
      {/* Rail */}
      <line x1="2" y1="58" x2="62" y2="58" stroke="#CEB888" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
};

export const SledgehammerIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Purdue Pete Sledgehammer Icon"
    >
      <defs>
        <linearGradient id="hammerHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DFDFDF" />
          <stop offset="50%" stopColor="#8C8C8C" />
          <stop offset="100%" stopColor="#4A4A4A" />
        </linearGradient>
      </defs>
      {/* Hammer Head */}
      <rect
        x="22"
        y="4"
        width="20"
        height="12"
        rx="2"
        transform="rotate(45 22 4)"
        fill="url(#hammerHead)"
        stroke="#CEB888"
        strokeWidth="2"
      />
      {/* Handle */}
      <line
        x1="18"
        y1="18"
        x2="6"
        y2="42"
        stroke="#CEB888"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="6"
        y1="42"
        x2="10"
        y2="34"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Impact burst */}
      <circle cx="34" cy="14" r="1.5" fill="#CEB888" />
      <line x1="38" y1="10" x2="44" y2="6" stroke="#CEB888" strokeWidth="1.5" />
      <line x1="42" y1="16" x2="47" y2="17" stroke="#CEB888" strokeWidth="1.5" />
    </svg>
  );
};
