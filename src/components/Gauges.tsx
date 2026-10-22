import React from 'react';

interface GaugesProps {
  meritPct?: number; // default 3%
  marketGrowthPct?: number; // default 2.5%
  theme?: 'dark' | 'light' | 'blueprint';
}

export const Gauges: React.FC<GaugesProps> = ({
  meritPct = 3.0,
  marketGrowthPct = 2.5,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div className="w-full flex flex-col items-center" data-testid="stagnant-merit-gauges">
      <div className="w-full flex items-center justify-center gap-3 sm:gap-5 my-0.5">
        {/* Gauge 1: Internal Merit Budgets */}
        <div className="flex-1 flex flex-col items-center max-w-[140px]">
          <span
            className={`text-[9.5px] font-bold tracking-tight mb-0.5 text-center h-3.5 ${
              isLight ? 'text-stone-700' : 'text-stone-300'
            }`}
          >
            Barely exceeds
          </span>
          <div className="relative w-28 h-15">
            <svg viewBox="0 0 120 72" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="meritArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
              </defs>
              {/* Outer dial track */}
              <path
                d="M 15 62 A 45 45 0 0 1 105 62"
                fill="none"
                stroke={isLight ? '#E5E7EB' : '#27272A'}
                strokeWidth="13"
                strokeLinecap="round"
              />
              {/* Active filled arc */}
              <path
                d="M 15 62 A 45 45 0 0 1 45 23"
                fill="none"
                stroke="url(#meritArcGrad)"
                strokeWidth="13"
                strokeLinecap="round"
              />
              {/* Needle pointing at 3% */}
              <line
                x1="60"
                y1="62"
                x2="35"
                y2="28"
                stroke="#EF4444"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="62" r="5.5" fill={isLight ? '#1F2937' : '#FFFFFF'} stroke="#EF4444" strokeWidth="1" />
              {/* Center text reading */}
              <text
                x="60"
                y="54"
                textAnchor="middle"
                fill={isLight ? '#111827' : '#F9FAFB'}
                fontSize="18"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
              >
                {meritPct}%
              </text>
            </svg>
          </div>
          <span
            className={`text-[10px] font-black uppercase tracking-wider text-center mt-2 leading-tight ${
              isLight ? 'text-stone-900' : 'text-stone-100'
            }`}
          >
            INTERNAL MERIT
            <br />
            BUDGETS
          </span>
        </div>

        {/* Gauge 2: Market Growth */}
        <div className="flex-1 flex flex-col items-center max-w-[140px]">
          <span
            className={`text-[9.5px] font-bold tracking-tight mb-0.5 text-center h-3.5 leading-none flex items-center justify-center ${
              isLight ? 'text-stone-700' : 'text-stone-300'
            }`}
          >
            Keeps employees locked
          </span>
          <div className="relative w-28 h-15">
            <svg viewBox="0 0 120 72" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="marketArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="50%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#CEB888" />
                </linearGradient>
              </defs>
              {/* Outer dial track */}
              <path
                d="M 15 62 A 45 45 0 0 1 105 62"
                fill="none"
                stroke={isLight ? '#E5E7EB' : '#27272A'}
                strokeWidth="13"
                strokeLinecap="round"
              />
              {/* Active filled arc */}
              <path
                d="M 15 62 A 45 45 0 0 1 52 20"
                fill="none"
                stroke="url(#marketArcGrad)"
                strokeWidth="13"
                strokeLinecap="round"
              />
              {/* Needle pointing at 2.5% & up */}
              <line
                x1="60"
                y1="62"
                x2="50"
                y2="20"
                stroke="#14B8A6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="62" r="5.5" fill={isLight ? '#1F2937' : '#FFFFFF'} stroke="#14B8A6" strokeWidth="1" />
              {/* Center text reading */}
              <text
                x="60"
                y="50"
                textAnchor="middle"
                fill={isLight ? '#111827' : '#F9FAFB'}
                fontSize="16"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
              >
                {marketGrowthPct}%
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                fill="#14B8A6"
                fontSize="8.5"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
              >
                & UP
              </text>
            </svg>
          </div>
          <span
            className={`text-[9.5px] font-black uppercase tracking-wider text-center mt-1.5 leading-tight ${
              isLight ? 'text-stone-900' : 'text-stone-100'
            }`}
          >
            MARKET
            <br />
            GROWTH
          </span>
        </div>
      </div>

      {/* Under-gauge summary description matching original graphic */}
      <p
        className={`text-center text-[10.5px] leading-snug px-2 mt-0.5 ${
          isLight ? 'text-stone-700' : 'text-stone-300'
        }`}
      >
        <span className="font-extrabold text-stone-200">{meritPct}% merit</span> barely exceeds{' '}
        <span className="font-extrabold text-teal-400">{marketGrowthPct}% market inflation</span>, locking percentiles.
      </p>
    </div>
  );
};
