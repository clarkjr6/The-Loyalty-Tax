import React from 'react';
import { SledgehammerIcon } from './PurdueLogo';

interface SolutionPillarsProps {
  theme?: 'dark' | 'light' | 'blueprint';
  activePillar?: number | null;
  onSelectPillar?: (index: number) => void;
}

export const SolutionPillars: React.FC<SolutionPillarsProps> = ({
  theme = 'dark',
  activePillar,
  onSelectPillar,
}) => {
  const isLight = theme === 'light';

  const pillars = [
    {
      id: 1,
      title: 'ELIMINATE PROMOTIONAL CAPS',
      subtitle: 'Break The 10% Ceiling',
      desc: 'Remove rigid 10% caps that create disparity between pay, the market, and internal peers.',
      boilerTip: 'Hammer down artificial promotion caps: align internal promotion compensation directly with market value.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
            {/* Broken Chain Link with Purdue Hammer impact */}
            <path
              d="M12 28 C6 28 4 22 8 16 C12 10 18 10 22 14"
              stroke="#F97316"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M36 20 C42 20 44 26 40 32 C36 38 30 38 26 34"
              stroke="#0D9488"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Break shards */}
            <circle cx="24" cy="24" r="2" fill="#CEB888" />
            <line x1="20" y1="20" x2="16" y2="16" stroke="#CEB888" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="28" x2="32" y2="32" stroke="#CEB888" strokeWidth="2" strokeLinecap="round" />
            <line x1="26" y1="18" x2="28" y2="14" stroke="#CEB888" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      title: 'LEAD THE MOVING TARGET',
      subtitle: 'The Next Giant Leap',
      desc: 'Utilize aggressive market adjustments to elevate the salary floor for entry-level and transitioning roles.',
      boilerTip: "In the spirit of Purdue's Cradle of Astronauts: proactively adjust salary bands ahead of inflation curves.",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
            {/* Purdue Astronaut Rocket */}
            <defs>
              <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
            {/* Exhaust Flame */}
            <polygon points="17,35 12,44 20,38 24,45 28,38 36,44 31,35" fill="#EF4444" />
            <polygon points="19,35 24,42 29,35" fill="#FBBF24" />
            {/* Rocket Fins */}
            <polygon points="14,28 8,36 18,34" fill="#CEB888" stroke="#000" strokeWidth="1" />
            <polygon points="34,28 40,36 30,34" fill="#CEB888" stroke="#000" strokeWidth="1" />
            {/* Rocket Hull */}
            <path
              d="M24 6 C17 14 17 28 17 34 L31 34 C31 28 31 14 24 6 Z"
              fill="url(#rocketBody)"
              stroke="#000"
              strokeWidth="1.5"
            />
            {/* Nose Cone Tip Purdue Gold */}
            <path d="M24 6 C21 11 20 16 20 16 L28 16 C28 16 27 11 24 6 Z" fill="#CEB888" />
            {/* Porthole Window with Purdue Pete Helmet Reflection */}
            <circle cx="24" cy="22" r="4.5" fill="#0284C7" stroke="#CEB888" strokeWidth="1.5" />
            <circle cx="23" cy="21" r="1.5" fill="#FFFFFF" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: 'DIFFERENTIATE FOR HIGH PERFORMERS',
      subtitle: 'Reward The Boilermaker Grit',
      desc: 'Ensure merit guidelines reward top talent with increases substantially higher than the 3% average.',
      boilerTip: 'Allocate merit disproportionately (5% to 8%+) to retain high-impact engineers and leaders.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
            {/* Podium */}
            {/* Center #1 Gold */}
            <rect x="18" y="24" width="12" height="20" fill="#CEB888" stroke="#000" strokeWidth="1.2" rx="1" />
            <text x="24" y="37" textAnchor="middle" fill="#000" fontSize="8" fontWeight="900">
              1
            </text>
            {/* Left #2 Silver */}
            <rect x="7" y="30" width="11" height="14" fill="#94A3B8" stroke="#000" strokeWidth="1.2" rx="1" />
            <text x="12.5" y="40" textAnchor="middle" fill="#000" fontSize="7" fontWeight="900">
              2
            </text>
            {/* Right #3 Bronze */}
            <rect x="30" y="33" width="11" height="11" fill="#D97706" stroke="#000" strokeWidth="1.2" rx="1" />
            <text x="35.5" y="41" textAnchor="middle" fill="#000" fontSize="7" fontWeight="900">
              3
            </text>
            {/* Top Performer Boilermaker Pete with Trophy */}
            <circle cx="24" cy="11" r="3.5" fill="#F8D3B0" stroke="#000" strokeWidth="1" />
            {/* Hard Hat */}
            <rect x="21" y="6" width="6" height="3" rx="1" fill="#CEB888" stroke="#000" strokeWidth="0.8" />
            {/* Trophy in hand */}
            <path
              d="M20 18 L28 18 L27 24 L21 24 Z"
              fill="#18181B"
            />
            {/* Golden Star / Trophy above */}
            <polygon
              points="24,2 25.5,5.5 29,5.5 26,7.5 27.2,11 24,8.8 20.8,11 22,7.5 19,5.5 22.5,5.5"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full" data-testid="solution-pillars">
      {pillars.map((pillar, idx) => {
        const isSelected = activePillar === idx;
        return (
          <div
            key={pillar.id}
            onClick={() => onSelectPillar?.(idx)}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border-[#CEB888] bg-[#CEB888]/10 shadow-lg'
                : isLight
                ? 'border-stone-200 hover:border-[#CEB888] hover:bg-stone-50 bg-white'
                : 'border-stone-800 hover:border-[#CEB888]/60 hover:bg-stone-800/40 bg-stone-900/60'
            }`}
          >
            {/* Icon Column */}
            <div className="shrink-0 mt-0.5">{pillar.icon}</div>

            {/* Content Column */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4
                  className={`text-[12px] font-black tracking-tight uppercase leading-snug ${
                    isLight ? 'text-stone-900' : 'text-stone-100'
                  }`}
                >
                  {pillar.title}
                </h4>
              </div>
              <p
                className={`text-[11.5px] leading-relaxed mt-1 ${
                  isLight ? 'text-stone-600' : 'text-stone-300'
                }`}
              >
                {pillar.desc}
              </p>
              {isSelected && (
                <div className="mt-2 pt-2 border-t border-[#CEB888]/30 flex items-center gap-1.5 text-[10px] text-[#CEB888] font-bold">
                  <span>🚂 Boilermaker Rule:</span>
                  <span className={isLight ? 'text-stone-800' : 'text-stone-200'}>{pillar.boilerTip}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
