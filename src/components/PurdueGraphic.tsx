import React, { forwardRef } from 'react';
import { PurdueMotionP, BoilermakerSpecialTrainIcon } from './PurdueLogo';
import { TrajectoryChart } from './TrajectoryChart';
import { PromotionLadder } from './PromotionLadder';
import { Gauges } from './Gauges';
import { SolutionPillars } from './SolutionPillars';
import { TrajectoryResult, SalaryConfig, formatCurrency } from '../utils/salaryCalculations';

interface PurdueGraphicProps {
  trajectory: TrajectoryResult;
  config: SalaryConfig;
  theme?: 'dark' | 'light' | 'blueprint';
  showBoilermakerCurve?: boolean;
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
        <header className="mb-6 border-b pb-5 relative border-stone-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            {/* Purdue Brand Badge */}
            <div className="flex items-center gap-3">
              <PurdueMotionP size={44} variant="gold" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs uppercase tracking-widest text-[#CEB888] bg-black/60 px-2 py-0.5 rounded border border-[#CEB888]/30">
                    PURDUE BOILERMAKERS
                  </span>
                  <span className="text-[11px] font-semibold text-stone-400 hidden sm:inline">
                    INSTITUTE FOR CAREER & MARKET BENCHMARKS
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CEB888]" />
                  <span>The Persistent Pursuit of Compensation Parity</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-[#CEB888] font-bold">1869</span>
                </div>
              </div>
            </div>

            {/* Locomotive Mascot Ribbon */}
            <div className="flex items-center gap-2.5 self-start md:self-auto bg-stone-900/70 border border-[#CEB888]/30 px-3 py-1.5 rounded-lg text-xs">
              <BoilermakerSpecialTrainIcon size={28} />
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-stone-400">BENCHMARK MODEL</div>
                <div className="font-extrabold text-[#CEB888] text-xs tracking-wide">BOILER UP EDITION</div>
              </div>
            </div>
          </div>

          {/* Main Title & Subtitle Matching Original Graphic Exactly */}
          <div className="mt-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              The Salary Gap:{' '}
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
              className={`text-sm sm:text-base mt-2 max-w-4xl font-normal leading-relaxed ${
                isLight ? 'text-stone-700' : 'text-stone-300'
              }`}
            >
              Traditional merit and promotional increases fail to keep pace with market growth over a career, creating a
              widening delta.
            </p>
          </div>
        </header>

        {/* --- THREE CORE PANELS (Exact Layout Homage) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* PANEL 1 (LEFT): THE PROBLEM: THE PERPETUAL DELTA */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-xl border ${
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

          {/* PANEL 2 (MIDDLE): TWO INSIGHT BLOCKS */}
          <div
            className={`lg:col-span-4 flex flex-col justify-between p-4 sm:p-5 rounded-xl border ${
              isLight
                ? 'bg-stone-50 border-stone-200'
                : isBlueprint
                ? 'bg-blue-950/40 border-blue-900/60'
                : 'bg-stone-900/60 border-stone-800'
            }`}
          >
            {/* Top Section: Stepping Up Promotion Ladder */}
            <div className="pb-5 border-b border-stone-800">
              <div className="mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#CEB888] block">
                  PROMOTION DISPARITY:
                </span>
                <h3 className="text-sm font-black tracking-tight">THE PROMOTION STEPPING DELTA</h3>
              </div>
              <PromotionLadder
                promoRaisePct={config.promoRaisePercent}
                marketJumpPct={config.marketPromoJumpPercent}
                theme={theme}
              />
            </div>

            {/* Bottom Section: Stagnant Merit vs Market Movement Gauges */}
            <div className="pt-4">
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

          {/* PANEL 3 (RIGHT): THE SOLUTION: CLOSING THE DISTANCE */}
          <div
            className={`lg:col-span-3 flex flex-col p-4 sm:p-5 rounded-xl border ${
              isLight
                ? 'bg-stone-50 border-stone-200'
                : isBlueprint
                ? 'bg-blue-950/40 border-blue-900/60'
                : 'bg-stone-900/60 border-stone-800'
            }`}
          >
            <div className="border-b border-stone-800 pb-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#CEB888] block">
                THE SOLUTION:
              </span>
              <h2 className="text-base sm:text-lg font-black tracking-tight">CLOSING THE DISTANCE</h2>
              <p className="text-[11px] text-stone-400 mt-0.5">The Boilermaker 3-Pillar Compensation Strategy</p>
            </div>

            {/* The 3 Solution Pillars */}
            <div className="flex-1 flex flex-col justify-around">
              <SolutionPillars
                theme={theme}
                activePillar={activePillar}
                onSelectPillar={onSelectPillar}
              />
            </div>

            {/* Purdue Tagline & Slogan */}
            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
              <span className="font-extrabold text-[#CEB888] tracking-wider uppercase">BOILER UP!</span>
              <span className="text-stone-400 italic">HAMMER DOWN!</span>
            </div>
          </div>
        </div>

        {/* --- FOOTER STRIP --- */}
        <footer className="mt-6 pt-4 border-t border-stone-800/70 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#CEB888]">PURDUE UNIVERSITY</span>
            <span>•</span>
            <span>Engineering & STEM Career Compensation Dynamics</span>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span>Market Inflation Benchmark: 2.5%</span>
            <span>•</span>
            <span>Standard Merit: 3.0%</span>
            <span>•</span>
            <span className="text-[#CEB888] font-bold">15-Year Delta Divergence Model</span>
          </div>
        </footer>
      </div>
    );
  }
);
