import React, { useState } from 'react';
import { TrajectoryResult, formatCurrency } from '../utils/salaryCalculations';

interface TrajectoryChartProps {
  trajectory: TrajectoryResult;
  showBoilermakerCurve?: boolean;
  onToggleBoilermakerCurve?: (val: boolean) => void;
  theme?: 'dark' | 'light' | 'blueprint';
}

export const TrajectoryChart: React.FC<TrajectoryChartProps> = ({
  trajectory,
  showBoilermakerCurve = false,
  onToggleBoilermakerCurve,
  theme = 'dark',
}) => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const points = trajectory.timeline;
  if (!points || points.length === 0) return null;

  const crossover = trajectory.crossover;

  // SVG viewBox coordinates
  const width = 760;
  const height = 380;
  const padding = { top: 45, right: 35, bottom: 55, left: 45 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const minSalary = Math.min(...points.map((p) => p.internalSalary)) * 0.95;
  const maxSalary = Math.max(...points.map((p) => p.marketSalary)) * 1.06;

  const getX = (year: number) => padding.left + (year / 15) * plotWidth;
  const getY = (val: number) => padding.top + plotHeight - ((val - minSalary) / (maxSalary - minSalary)) * plotHeight;

  // Path coordinates
  const marketCoords = points.map((p) => ({ x: getX(p.year), y: getY(p.marketSalary) }));
  const internalCoords = points.map((p) => ({ x: getX(p.year), y: getY(p.internalSalary) }));

  // Boilermaker (Outpace Strategy) coords: Stop at crossover if crossed!
  const boilermakerCoords: { x: number; y: number }[] = [];
  if (showBoilermakerCurve) {
    if (crossover.hasCrossover && crossover.crossoverYear < 15) {
      const floorYr = Math.floor(crossover.crossoverYear);
      for (let y = 0; y <= floorYr; y++) {
        const pt = points[y];
        boilermakerCoords.push({
          x: getX(pt.year),
          y: getY(pt.boilermakerSalary ?? pt.internalSalary),
        });
      }
      if (crossover.crossoverYear > floorYr || floorYr === 0) {
        boilermakerCoords.push({
          x: getX(crossover.crossoverYear),
          y: getY(crossover.crossoverSalary),
        });
      }
    } else {
      for (let y = 0; y < points.length; y++) {
        const pt = points[y];
        boilermakerCoords.push({
          x: getX(pt.year),
          y: getY(pt.boilermakerSalary ?? pt.internalSalary),
        });
      }
    }
  }

  const buildPath = (coords: { x: number; y: number }[]) => {
    return coords.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');
  };

  const marketLinePath = buildPath(marketCoords);
  const internalLinePath = buildPath(internalCoords);
  const boilermakerLinePath = buildPath(boilermakerCoords);

  // Shaded polygon between Market and Internal
  const deltaAreaPath = `
    ${marketLinePath}
    ${internalCoords
      .slice()
      .reverse()
      .reduce((acc, pt) => `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '')}
    Z
  `;

  const isLight = theme === 'light';
  const isBlueprint = theme === 'blueprint';

  const axisColor = isLight ? '#78716C' : isBlueprint ? '#60A5FA' : '#A8A29E';
  const gridColor = isLight ? '#E7E5E4' : isBlueprint ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.08)';
  const marketColor = isLight ? '#2563EB' : '#38BDF8'; // Distinct cyan/blue as in original graphic, accented with Purdue Gold
  const internalColor = '#FB923C'; // Salmon/Orange as in original graphic
  const textColor = isLight ? '#1C1917' : '#F5F5F4';

  const hoveredPoint = hoveredYear !== null ? points[hoveredYear] : null;

  return (
    <div className="relative w-full select-none" data-testid="trajectory-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        aria-label="15-Year Career Salary Trajectory Chart"
      >
        <defs>
          {/* Salmon / Soft Orange Shading matching original graphic */}
          <linearGradient id="deltaShadingSoft" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FB923C" stopOpacity={isLight ? 0.4 : 0.3} />
            <stop offset="60%" stopColor="#F87171" stopOpacity={isLight ? 0.45 : 0.35} />
            <stop offset="100%" stopColor="#EF4444" stopOpacity={isLight ? 0.5 : 0.4} />
          </linearGradient>

          {/* Purdue Railroad pattern */}
          <pattern id="purdueRailPattern" width="16" height="16" patternTransform="rotate(35 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="16" stroke="#CEB888" strokeWidth="1" strokeOpacity={isLight ? 0.3 : 0.18} />
          </pattern>
        </defs>

        {/* Vertical Grid Lines at Year 0, 5, 10, 15 */}
        {[0, 5, 10, 15].map((year) => (
          <line
            key={`grid-x-${year}`}
            x1={getX(year)}
            y1={padding.top}
            x2={getX(year)}
            y2={height - padding.bottom}
            stroke={gridColor}
            strokeDasharray={year === 0 ? undefined : '4 4'}
          />
        ))}

        {/* Shaded Delta Region between Market and Internal */}
        <path d={deltaAreaPath} fill="url(#deltaShadingSoft)" />
        <path d={deltaAreaPath} fill="url(#purdueRailPattern)" />

        {/* Central Label in Delta Area: "WIDENING DELTA: THE 'CATCH-UP' MYTH" */}
        {/* Positioned between Year 11 and 13 where space is widest */}
        <g transform={`translate(${getX(11.8)}, ${(getY(points[11].marketSalary) + getY(points[11].internalSalary)) / 2})`}>
          <rect
            x="-78"
            y="-18"
            width="156"
            height="36"
            rx="5"
            fill={isLight ? '#FFFFFF' : '#111111'}
            fillOpacity={isLight ? 0.95 : 0.92}
            stroke="#CEB888"
            strokeWidth="1.2"
          />
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fill="#CEB888"
            fontSize="9.5"
            fontWeight="900"
            letterSpacing="0.08em"
            fontFamily="Inter, sans-serif"
          >
            WIDENING DELTA:
          </text>
          <text
            x="0"
            y="9"
            textAnchor="middle"
            fill={textColor}
            fontSize="8.5"
            fontWeight="800"
            fontFamily="Inter, sans-serif"
          >
            THE "CATCH-UP" MYTH
          </text>
        </g>

        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top - 15}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke={axisColor}
          strokeWidth="1.5"
        />
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right + 10}
          y2={height - padding.bottom}
          stroke={axisColor}
          strokeWidth="1.5"
        />
        <polygon
          points={`${width - padding.right + 14},${height - padding.bottom} ${width - padding.right + 5},${height - padding.bottom - 4} ${width - padding.right + 5},${height - padding.bottom + 4}`}
          fill={axisColor}
        />

        {/* UPPER LEFT METRIC BOXES: TIME TO OVERTAKE & ADDITIONAL DOLLARS */}
        <g
          className="transition-all duration-300 cursor-pointer"
          onClick={() => onToggleBoilermakerCurve?.(!showBoilermakerCurve)}
          role="button"
          tabIndex={0}
        >
          {/* Box 1: Time to Overtake */}
          <g>
            <rect
              x="62"
              y="50"
              width="142"
              height="58"
              rx="8"
              fill={isLight ? '#FFFFFF' : '#121212'}
              fillOpacity={isLight ? 0.98 : 0.94}
              stroke={showBoilermakerCurve ? '#10B981' : isLight ? '#D6D3D1' : '#3F3F46'}
              strokeWidth={showBoilermakerCurve ? 1.5 : 1}
              strokeDasharray={showBoilermakerCurve ? undefined : '3 3'}
            />
            {/* Top accent bar */}
            <rect
              x="62"
              y="50"
              width="142"
              height="3"
              rx="1.5"
              fill={showBoilermakerCurve ? '#10B981' : isLight ? '#A8A29E' : '#52525B'}
            />
            <text
              x="72"
              y="67"
              fill={showBoilermakerCurve ? '#10B981' : isLight ? '#78716C' : '#A1A1AA'}
              fontSize="7.8"
              fontWeight="800"
              letterSpacing="0.06em"
              fontFamily="Inter, sans-serif"
            >
              TIME TO OVERTAKE
            </text>
            <text
              x="72"
              y="88"
              fill={
                showBoilermakerCurve
                  ? crossover.hasCrossover
                    ? textColor
                    : '#F87171'
                  : isLight
                  ? '#78716C'
                  : '#71717A'
              }
              fontSize={showBoilermakerCurve && crossover.hasCrossover ? '16' : '12.5'}
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {showBoilermakerCurve
                ? crossover.hasCrossover
                  ? crossover.formattedTime
                  : '> 15 Years'
                : 'Never (Lag Widens)'}
            </text>
            <text
              x="72"
              y="100"
              fill={isLight ? '#78716C' : '#71717A'}
              fontSize="7.2"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {showBoilermakerCurve
                ? crossover.hasCrossover
                  ? 'Reaches Market Parity'
                  : 'Raise pace too slow'
                : 'Click to activate solution'}
            </text>
          </g>

          {/* Box 2: Additional Dollars */}
          <g>
            <rect
              x="214"
              y="50"
              width="146"
              height="58"
              rx="8"
              fill={isLight ? '#FFFFFF' : '#121212'}
              fillOpacity={isLight ? 0.98 : 0.94}
              stroke={showBoilermakerCurve ? '#CEB888' : isLight ? '#D6D3D1' : '#3F3F46'}
              strokeWidth={showBoilermakerCurve ? 1.5 : 1}
              strokeDasharray={showBoilermakerCurve ? undefined : '3 3'}
            />
            {/* Top accent bar */}
            <rect
              x="214"
              y="50"
              width="146"
              height="3"
              rx="1.5"
              fill={showBoilermakerCurve ? '#CEB888' : isLight ? '#A8A29E' : '#52525B'}
            />
            <text
              x="224"
              y="67"
              fill={showBoilermakerCurve ? '#CEB888' : isLight ? '#78716C' : '#A1A1AA'}
              fontSize="7.8"
              fontWeight="800"
              letterSpacing="0.06em"
              fontFamily="Inter, sans-serif"
            >
              ADDITIONAL DOLLARS
            </text>
            <text
              x="224"
              y="88"
              fill={
                showBoilermakerCurve
                  ? crossover.hasCrossover
                    ? '#CEB888'
                    : '#A1A1AA'
                  : isLight
                  ? '#78716C'
                  : '#71717A'
              }
              fontSize={showBoilermakerCurve && crossover.hasCrossover ? '16' : '12.5'}
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              {showBoilermakerCurve
                ? crossover.hasCrossover
                  ? crossover.formattedAdditionalDollars
                  : 'N/A'
                : '$0 (Standard Pay)'}
            </text>
            <text
              x="224"
              y="100"
              fill={isLight ? '#78716C' : '#71717A'}
              fontSize="7.2"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {showBoilermakerCurve
                ? crossover.hasCrossover
                  ? 'Cumulative extra to parity'
                  : 'No catch-up investment'
                : 'Click to calculate cost'}
            </text>
          </g>
        </g>

        {/* External Market Growth Line (Blue / Cyan with Gold nodes) */}
        <path
          d={marketLinePath}
          fill="none"
          stroke={marketColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Internal Growth Line (Standard Salmon / Orange) */}
        <path
          d={internalLinePath}
          fill="none"
          stroke={internalColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Outpace Strategy Line (stops at crossover point if active) */}
        {showBoilermakerCurve && (
          <>
            <path
              d={boilermakerLinePath}
              fill="none"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
            {crossover.hasCrossover && (
              <g
                transform={`translate(${getX(crossover.crossoverYear)}, ${getY(crossover.crossoverSalary)})`}
                className="transition-all"
              >
                <circle cx="0" cy="0" r="10" fill="#10B981" fillOpacity="0.25" className="animate-pulse" />
                <circle cx="0" cy="0" r="5.5" fill="#10B981" stroke="#000000" strokeWidth="2" />
                <circle cx="0" cy="0" r="2" fill="#FFFFFF" />

                {/* Label to the left of the crossover node */}
                <text
                  x={crossover.crossoverYear < 2 ? 10 : -10}
                  y="-14"
                  textAnchor={crossover.crossoverYear < 2 ? 'start' : 'end'}
                  fill="#10B981"
                  fontSize="10"
                  fontWeight="900"
                  letterSpacing="0.02em"
                  fontFamily="Inter, sans-serif"
                >
                  Outpace Strategy
                </text>
                <text
                  x={crossover.crossoverYear < 2 ? 10 : -10}
                  y="-4"
                  textAnchor={crossover.crossoverYear < 2 ? 'start' : 'end'}
                  fill="#CEB888"
                  fontSize="8"
                  fontWeight="800"
                  letterSpacing="0.04em"
                  fontFamily="Inter, sans-serif"
                >
                  PARITY (Yr {crossover.crossoverYear})
                </text>
              </g>
            )}
            {!crossover.hasCrossover && (
              <text
                x={getX(14.8)}
                y={getY(points[15].boilermakerSalary ?? 0) - 10}
                textAnchor="end"
                fill="#10B981"
                fontSize="10.5"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
              >
                Outpace Strategy
              </text>
            )}
          </>
        )}

        {/* --- CALLOUTS --- */}

        {/* 1. Year 2: 2.5% Market Inflation Annual Increase */}
        <g transform={`translate(${getX(2.2)}, ${getY(points[2].marketSalary)})`}>
          <circle cx="0" cy="0" r="5" fill={isLight ? '#FFFFFF' : '#141414'} stroke={marketColor} strokeWidth="2.5" />
          <line x1="0" y1="-5" x2="0" y2="-18" stroke={marketColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="-2" y="-32" fill={textColor} fontSize="11" fontWeight="900" textAnchor="middle">
            2.5%
          </text>
          <text x="-2" y="-22" fill={isLight ? '#44403C' : '#D1D5DB'} fontSize="8" fontWeight="700" textAnchor="middle">
            Market Inflation
          </text>
          <text x="-2" y="-13" fill={isLight ? '#44403C' : '#D1D5DB'} fontSize="8" fontWeight="600" textAnchor="middle">
            Annual Increase
          </text>
        </g>

        {/* 2. Year 2: 3% Merit Annual Increase */}
        <g transform={`translate(${getX(2.2)}, ${getY(points[2].internalSalary)})`}>
          <circle cx="0" cy="0" r="5" fill={isLight ? '#FFFFFF' : '#141414'} stroke={internalColor} strokeWidth="2.5" />
          <line x1="0" y1="5" x2="0" y2="18" stroke={internalColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="2" y="28" fill={textColor} fontSize="11" fontWeight="900" textAnchor="middle">
            3%
          </text>
          <text x="2" y="38" fill={isLight ? '#44403C' : '#D1D5DB'} fontSize="8" fontWeight="700" textAnchor="middle">
            Merit Annual Increase
          </text>
        </g>

        {/* 3. Year 5: 15% Market Value Increase */}
        <g transform={`translate(${getX(5)}, ${getY(points[5].marketSalary)})`}>
          <circle cx="0" cy="0" r="6" fill={marketColor} stroke="#000" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="-22" stroke={marketColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="-16" y="-36" fill={textColor} fontSize="12" fontWeight="900">
            15%
          </text>
          <text x="-16" y="-25" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Market Value
          </text>
          <text x="-16" y="-16" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Increase
          </text>
        </g>

        {/* 4. Year 5: 10% Promotional Raise */}
        <g transform={`translate(${getX(5)}, ${getY(points[5].internalSalary)})`}>
          <circle cx="0" cy="0" r="6" fill={internalColor} stroke="#000" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="20" stroke={internalColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="-6" y="32" fill={textColor} fontSize="12" fontWeight="900">
            10%
          </text>
          <text x="-6" y="42" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Promotional
          </text>
          <text x="-6" y="51" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Raise
          </text>
        </g>

        {/* 5. Year 10: 15% Market Value Increase */}
        <g transform={`translate(${getX(10)}, ${getY(points[10].marketSalary)})`}>
          <circle cx="0" cy="0" r="6" fill={marketColor} stroke="#000" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="-22" stroke={marketColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="-16" y="-36" fill={textColor} fontSize="12" fontWeight="900">
            15%
          </text>
          <text x="-16" y="-25" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Market Value
          </text>
          <text x="-16" y="-16" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Increase
          </text>
        </g>

        {/* 6. Year 10: 10% Promotional Raise (Placed cleanly below Year 10 node) */}
        <g transform={`translate(${getX(10)}, ${getY(points[10].internalSalary)})`}>
          <circle cx="0" cy="0" r="6" fill={internalColor} stroke="#000" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="20" stroke={internalColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="-6" y="32" fill={textColor} fontSize="12" fontWeight="900">
            10%
          </text>
          <text x="-6" y="42" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Promotional
          </text>
          <text x="-6" y="51" fill={isLight ? '#44403C' : '#E7E5E4'} fontSize="8.5" fontWeight="700">
            Raise
          </text>
        </g>

        {/* End of line labels */}
        <g transform={`translate(${getX(15)}, ${getY(points[15].marketSalary)})`}>
          <text
            x="-4"
            y="-12"
            textAnchor="end"
            fill={marketColor}
            fontSize="11"
            fontWeight="900"
            letterSpacing="0.02em"
          >
            External Market Growth
          </text>
        </g>

        <g transform={`translate(${getX(15)}, ${getY(points[15].internalSalary)})`}>
          <text
            x="-6"
            y="32"
            textAnchor="end"
            fill={internalColor}
            fontSize="11"
            fontWeight="900"
            letterSpacing="0.02em"
          >
            <tspan x="-6" dy="0">Internal</tspan>
            <tspan x="-6" dy="14">Growth</tspan>
          </text>
        </g>

        {/* X Axis Year Labels */}
        {[0, 5, 10, 15].map((year) => (
          <g key={`xtick-${year}`} transform={`translate(${getX(year)}, ${height - padding.bottom})`}>
            <line x1="0" y1="0" x2="0" y2="6" stroke={axisColor} strokeWidth="1.5" />
            <text
              x="0"
              y="18"
              textAnchor="middle"
              fill={isLight ? '#44403C' : '#A8A29E'}
              fontSize="10.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              {year === 0 ? 'Yr 0' : `Yr ${year}`}
            </text>
          </g>
        ))}

        {/* Interactive Hit Targets */}
        {points.map((p) => (
          <rect
            key={`hit-${p.year}`}
            x={getX(p.year) - 14}
            y={padding.top}
            width="28"
            height={plotHeight}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredYear(p.year)}
            onMouseLeave={() => setHoveredYear(null)}
          />
        ))}

        {/* Hover Highlight */}
        {hoveredPoint && (
          <g>
            <line
              x1={getX(hoveredPoint.year)}
              y1={padding.top}
              x2={getX(hoveredPoint.year)}
              y2={height - padding.bottom}
              stroke="#CEB888"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx={getX(hoveredPoint.year)} cy={getY(hoveredPoint.marketSalary)} r="6" fill={marketColor} stroke="#000" strokeWidth="2" />
            <circle cx={getX(hoveredPoint.year)} cy={getY(hoveredPoint.internalSalary)} r="6" fill={internalColor} stroke="#000" strokeWidth="2" />
            {showBoilermakerCurve && (!crossover.hasCrossover || hoveredPoint.year <= Math.ceil(crossover.crossoverYear)) && (
              <circle cx={getX(hoveredPoint.year)} cy={getY(hoveredPoint.boilermakerSalary ?? 0)} r="6" fill="#10B981" stroke="#000" strokeWidth="2" />
            )}
          </g>
        )}
      </svg>

      {/* Axis title */}
      <div className="mt-1 text-center font-extrabold text-[11px] tracking-wider uppercase text-stone-400">
        CAREER TIMELINE (15 YEARS)
      </div>

      {/* Interactive Tooltip Card */}
      {hoveredPoint && (
        <div className="absolute top-2 right-4 bg-stone-900/95 border border-[#CEB888]/60 shadow-xl rounded-lg p-2.5 text-xs z-20 backdrop-blur-md pointer-events-none min-w-[180px]">
          <div className="font-bold text-[#CEB888] border-b border-stone-800 pb-1 mb-1.5 flex justify-between">
            <span>Year {hoveredPoint.year} Breakdown</span>
            {hoveredPoint.isPromotionYear && (
              <span className="bg-[#CEB888] text-black text-[9px] px-1 rounded font-black">PROMOTION</span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-stone-300">
              <span>Market Value:</span>
              <span className="font-semibold text-stone-100">{formatCurrency(hoveredPoint.marketSalary)}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Standard Internal:</span>
              <span className="font-semibold text-orange-400">{formatCurrency(hoveredPoint.internalSalary)}</span>
            </div>
            <div className="flex justify-between border-t border-stone-800 pt-1 text-[#CEB888] font-bold">
              <span>Lag Delta:</span>
              <span>
                -{formatCurrency(hoveredPoint.deltaAmount)} ({hoveredPoint.deltaPercent}%)
              </span>
            </div>
            {showBoilermakerCurve && hoveredPoint.boilermakerSalary && (!crossover.hasCrossover || hoveredPoint.year <= Math.ceil(crossover.crossoverYear)) && (
              <div className="flex justify-between text-emerald-400 font-bold border-t border-stone-800 pt-1">
                <span>Strategy Pay:</span>
                <span>{formatCurrency(hoveredPoint.boilermakerSalary)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
