import React, { forwardRef } from 'react';
import { TrajectoryChart } from './TrajectoryChart';
import { PromotionLadder } from './PromotionLadder';
import { Gauges } from './Gauges';
import { InitialMarketLag } from './InitialMarketLag';
import { TrajectoryResult, SalaryConfig, formatCurrency } from '../utils/salaryCalculations';

interface PurdueGraphicProps {
  trajectory: TrajectoryResult;
  config: SalaryConfig;
  theme?: 'dark' | 'light' | 'blueprint';
  showBoilermakerCurve?: boolean;
  onToggleBoilermakerCurve?: (val: boolean) => void;
  activePillar?: number | null;
  onSelectPillar?: (idx: number) => void;
}

export const PurdueGraphic = forwardRef<HTMLDivElement, PurdueGraphicProps>(
  (
    {
      trajectory,
      config,
      theme = 'dark',
      showBoilermakerCurve = false,
      onToggleBoilermakerCurve,
      activePillar,
      onSelectPillar,
    },
    ref
  ) => {
    const isLight = theme === 'light';
    const isBlueprint = theme === 'blueprint';

    // Theme container styling
    const containerClasses = isLight
      ? 'bg-[#FDFBF7] text-stone-900 border-stone-300 shadow-2xl'
      : isBlueprint
      ? 'bg-[#0B1528] text-blue-50 border-blue-900/80 shadow-2xl'
      : 'bg-[#0B0B0B] text-stone-100 border-[#CEB888]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)]';

    return (
      <div
        ref={ref}
        id="purdue-salary-graphic"
        data-testid="purdue-salary-graphic"
        className={`w-full max-w-[1280px] mx-auto rounded-2xl border p-5 sm:p-7 md:p-8 transition-colors duration-300 relative overflow-hidden font-sans ${containerClasses}`}
      >
        {/* Subtle Watermark or Engineering Grid */}
        {isBlueprint && (
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'radial-gradient(#60A5FA 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {/* Top Purdue Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#9E7A1C] via-[#CEB888] to-[#9E7A1C]" />

        {/* --- HEADER SECTION --- */}
        <header className="mb-4 border-b pb-3 relative border-stone-800/80">
          {/* Main Title & Subtitle Matching Original Graphic Exactly */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              The Loyalty Tax:{' '}
              <span
                className={`text-transparent bg-clip-text ${
                  isLight
                    ? 'bg-gradient-to-r from-stone-900 via-[#9E7A1C] to-amber-700'
                    : 'bg-gradient-to-r from-stone-100 via-[#CEB888] to-amber-300'
                }`}
              >
                Why Standard Raises Can't Catch the Market
              </span>
            </h1>
            <p
              className={`text-sm sm:text-base mt-1.5 max-w-4xl font-normal leading-relaxed ${
                isLight ? 'text-stone-700' : 'text-stone-300'
              }`}
            >
              Traditional merit and promotional increases fail to keep pace with market growth over a career, creating a
              widening delta.
            </p>
          </div>
        </header>

        {/* --- CORE PANELS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* PANEL 1 (LEFT): THE PROBLEM: THE PERPETUAL DELTA */}
          <div
            className={`lg:col-span-8 flex flex-col justify-between p-4 sm:p-5 rounded-xl border ${
              isLight
                ? 'bg-stone-50 border-stone-200'
                : isBlueprint
                ? 'bg-blue-950/40 border-blue-900/60'
                : 'bg-stone-900/60 border-stone-800'
            }`}
          >
            <div>
              <div className="border-b border-stone-800 pb-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#CEB888] block">
                  THE PROBLEM:
                </span>
                <h2 className="text-base sm:text-lg font-black tracking-tight">THE PERPETUAL DELTA</h2>
              </div>

              {/* Trajectory SVG Chart */}
              <div className="my-1">
                <TrajectoryChart
                  trajectory={trajectory}
                  showBoilermakerCurve={showBoilermakerCurve}
                  onToggleBoilermakerCurve={onToggleBoilermakerCurve}
                  theme={theme}
                />
              </div>
            </div>

            {/* Bottom Callout Box */}
            <div
              className={`mt-4 p-3 rounded-lg border text-xs leading-relaxed ${
                isLight
                  ? 'bg-amber-50/80 border-amber-200 text-stone-800'
                  : 'bg-stone-950/90 border-[#CEB888]/40 text-stone-200'
              }`}
            >
              <p>
                Even starting only{' '}
                <span className="font-black text-[#CEB888]">{config.initialLagPercent}% below market</span>, an
                employee's salary gap grows continually over {config.totalYears} years, resulting in a significant{' '}
                <strong className="text-amber-400 font-extrabold">{config.totalYears}-Year Salary Lag</strong>{' '}
                (Gap: <span className="font-bold text-orange-400">-{formatCurrency(trajectory.finalDeltaAmount)}</span> /
                yr, cumulative lost career earnings:{' '}
                <span className="font-extrabold text-[#CEB888]">{formatCurrency(trajectory.cumulativeLostIncome)}</span>).
              </p>
            </div>
          </div>

          {/* PANEL 2 (RIGHT): THREE CAUSES */}
          <div
            className={`lg:col-span-4 flex flex-col justify-between p-3 sm:p-4 rounded-xl border ${
              isLight
                ? 'bg-stone-50 border-stone-200'
                : isBlueprint
                ? 'bg-blue-950/40 border-blue-900/60'
                : 'bg-stone-900/60 border-stone-800'
            }`}
          >
            {/* Header: THE CAUSES */}
            <div className="border-b border-stone-800 pb-1.5 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#CEB888] block">
                THE CAUSES:
              </span>
            </div>

            {/* Cause 1: Initial Market Lag */}
            <div className="pb-2.5 border-b border-stone-800/70">
              <div className="mb-1 text-center">
                <h3 className="text-xs sm:text-sm font-black tracking-tight uppercase">
                  INITIAL MARKET LAG
                </h3>
              </div>
              <InitialMarketLag
                lagPct={config.initialLagPercent}
                theme={theme}
              />
            </div>

            {/* Cause 2: Stepping Up Promotion Ladder */}
            <div className="py-2.5 border-b border-stone-800/70">
              <div className="mb-1 text-center">
                <h3 className="text-xs sm:text-sm font-black tracking-tight uppercase">
                  THE PROMOTION STEPPING DELTA
                </h3>
              </div>
              <PromotionLadder
                promoRaisePct={config.promoRaisePercent}
                marketJumpPct={config.marketPromoJumpPercent}
                theme={theme}
              />
            </div>

            {/* Cause 3: Stagnant Merit vs Market Movement Gauges */}
            <div className="pt-2">
              <div className="mb-1 text-center">
                <h3 className="text-xs sm:text-sm font-black tracking-tight uppercase">
                  STAGNANT MERIT VS. MARKET MOVEMENT
                </h3>
              </div>
              <Gauges
                meritPct={config.annualMeritPercent}
                marketGrowthPct={config.annualMarketInflationPercent}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
