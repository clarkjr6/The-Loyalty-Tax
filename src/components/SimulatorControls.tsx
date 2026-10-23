import React from 'react';
import { Sliders, RotateCcw, Sparkles, TrendingUp, DollarSign, Percent, Check } from 'lucide-react';
import { SalaryConfig, DEFAULT_SALARY_CONFIG, formatCurrency } from '../utils/salaryCalculations';

interface SimulatorControlsProps {
  config: SalaryConfig;
  onChangeConfig: (newConfig: SalaryConfig) => void;
  showBoilermakerCurve: boolean;
  onToggleBoilermakerCurve: (val: boolean) => void;
}

export const SimulatorControls: React.FC<SimulatorControlsProps> = ({
  config,
  onChangeConfig,
  showBoilermakerCurve,
  onToggleBoilermakerCurve,
}) => {
  const updateField = (field: keyof SalaryConfig, value: number) => {
    onChangeConfig({
      ...config,
      [field]: value,
    });
  };

  return (
    <div
      className="w-full bg-stone-900/90 border border-stone-800 rounded-xl p-4 text-stone-200 shadow-xl"
      data-testid="simulator-controls"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4 border-b border-stone-800 pb-3 mb-4">
        {/* Title and 2-line description */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Sliders className="w-5 h-5 text-[#CEB888] shrink-0" />
          <div>
            <h3 className="font-extrabold text-sm text-stone-100 flex items-center gap-2">
              <span>Dynamic Trajectory Simulator</span>
              <span className="text-[10px] bg-[#CEB888]/20 text-[#CEB888] font-bold px-2 py-0.5 rounded border border-[#CEB888]/30">
                LIVE
              </span>
            </h3>
            <div className="text-[11px] text-stone-400 leading-tight mt-0.5">
              <div>Adjust variables to test career compensation scenarios</div>
              <div>and watch the graphic recalculate in real-time.</div>
            </div>
          </div>
        </div>

        {/* Faint gold vertical divider between Title and Solution Curve group */}
        <div
          className="hidden lg:block w-px h-10 bg-gradient-to-b from-[#CEB888]/5 via-[#CEB888]/35 to-[#CEB888]/5 shrink-0 self-center"
          aria-hidden="true"
        />

        {/* Grouped Solution Curve controls (Promo Cap slider + Merit Amount slider + Activate Button) */}
        <div
          className={`flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl border transition-all duration-300 ${
            showBoilermakerCurve
              ? 'bg-emerald-950/30 border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/25'
              : 'bg-emerald-950/20 border-emerald-700/30 hover:border-emerald-600/40'
          }`}
        >
          {/* Subtle association indicator/badge */}
          <div className="hidden xl:flex items-center gap-1.5 pr-1 border-r border-emerald-800/40 text-emerald-400/90 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
              Solution Curve
            </span>
          </div>

          {/* Solution Promotion Cap Slider */}
          <div className="bg-stone-950/90 px-2.5 py-1.5 rounded-lg border border-emerald-900/70 w-32 sm:w-36 lg:w-36 xl:w-40 shadow-inner">
            <div className="flex justify-between items-center text-[10px] mb-0.5">
              <span className="text-emerald-400 font-bold truncate">Promo Cap</span>
              <span className="font-extrabold text-emerald-300">
                +{config.boilermakerPromoRaisePercent ?? 20}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={30}
              step={1}
              value={config.boilermakerPromoRaisePercent ?? 20}
              onChange={(e) => updateField('boilermakerPromoRaisePercent', Number(e.target.value))}
              className="w-full accent-emerald-400 h-1 bg-stone-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-stone-400 mt-0.5">
              <span>10%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Solution Merit Amount Slider */}
          <div className="bg-stone-950/90 px-2.5 py-1.5 rounded-lg border border-emerald-900/70 w-32 sm:w-36 lg:w-36 xl:w-40 shadow-inner">
            <div className="flex justify-between items-center text-[10px] mb-0.5">
              <span className="text-emerald-400 font-bold truncate">Merit Amount</span>
              <span className="font-extrabold text-emerald-300">
                +{(config.boilermakerMeritPercent ?? 4.8).toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min={3.0}
              max={8.0}
              step={0.1}
              value={config.boilermakerMeritPercent ?? 4.8}
              onChange={(e) => updateField('boilermakerMeritPercent', Number(e.target.value))}
              className="w-full accent-emerald-400 h-1 bg-stone-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-stone-400 mt-0.5">
              <span>3.0%</span>
              <span>8.0%</span>
            </div>
          </div>

          {/* Solution Curve Toggle Button */}
          <button
            onClick={() => onToggleBoilermakerCurve(!showBoilermakerCurve)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer ${
              showBoilermakerCurve
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-300 shadow-emerald-900/40 ring-1 ring-emerald-400/50'
                : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400/60'
            }`}
          >
            {showBoilermakerCurve ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Solution Active</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Activate Solution Curve</span>
              </>
            )}
          </button>
        </div>

        {/* Faint gold vertical divider between Solution Curve group and Reset Sliders */}
        <div
          className="hidden lg:block w-px h-10 bg-gradient-to-b from-[#CEB888]/5 via-[#CEB888]/35 to-[#CEB888]/5 shrink-0 self-center"
          aria-hidden="true"
        />

        {/* Reset Button */}
        <button
          onClick={() => onChangeConfig({ ...DEFAULT_SALARY_CONFIG })}
          className="flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 rounded-lg text-xs font-semibold transition border border-stone-700 shrink-0 cursor-pointer self-center"
          title="Reset to default infographic numbers"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sliders</span>
        </button>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Starting Salary */}
        <div className="bg-stone-950/70 p-3 rounded-lg border border-stone-800/80">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-stone-400 font-medium">Starting Salary</span>
            <span className="font-extrabold text-[#CEB888]">{formatCurrency(config.startingSalary)}</span>
          </div>
          <input
            type="range"
            min={50000}
            max={180000}
            step={5000}
            value={config.startingSalary}
            onChange={(e) => updateField('startingSalary', Number(e.target.value))}
            className="w-full accent-[#CEB888] h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>$50k</span>
            <span>$180k</span>
          </div>
        </div>

        {/* Initial Lag */}
        <div className="bg-stone-950/70 p-3 rounded-lg border border-stone-800/80">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-stone-400 font-medium">Initial Market Lag</span>
            <span className="font-extrabold text-amber-400">-{config.initialLagPercent}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={25}
            step={1}
            value={config.initialLagPercent}
            onChange={(e) => updateField('initialLagPercent', Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>0% (Equal)</span>
            <span>-25% Lag</span>
          </div>
        </div>

        {/* Merit Annual Raise */}
        <div className="bg-stone-950/70 p-3 rounded-lg border border-stone-800/80">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-stone-400 font-medium">Internal Merit Raise</span>
            <span className="font-extrabold text-orange-400">+{config.annualMeritPercent}% / yr</span>
          </div>
          <input
            type="range"
            min={1.5}
            max={6.0}
            step={0.1}
            value={config.annualMeritPercent}
            onChange={(e) => updateField('annualMeritPercent', Number(e.target.value))}
            className="w-full accent-orange-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>1.5%</span>
            <span>6.0%</span>
          </div>
        </div>

        {/* Market Inflation */}
        <div className="bg-stone-950/70 p-3 rounded-lg border border-stone-800/80">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-stone-400 font-medium">Market Inflation</span>
            <span className="font-extrabold text-teal-400">+{config.annualMarketInflationPercent}% / yr</span>
          </div>
          <input
            type="range"
            min={1.5}
            max={6.0}
            step={0.1}
            value={config.annualMarketInflationPercent}
            onChange={(e) => updateField('annualMarketInflationPercent', Number(e.target.value))}
            className="w-full accent-teal-400 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>1.5%</span>
            <span>6.0%</span>
          </div>
        </div>

        {/* Standard Promo Raise */}
        <div className="bg-stone-950/70 p-3 rounded-lg border border-stone-800/80">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-stone-400 font-medium">Internal Promo Raise</span>
            <span className="font-extrabold text-amber-300">+{config.promoRaisePercent}%</span>
          </div>
          <input
            type="range"
            min={5}
            max={20}
            step={1}
            value={config.promoRaisePercent}
            onChange={(e) => updateField('promoRaisePercent', Number(e.target.value))}
            className="w-full accent-amber-400 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>5%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Market Jump at Next Level */}
        <div className="bg-stone-950/70 p-3 rounded-lg border border-stone-800/80">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-stone-400 font-medium">Market Jump (Next Level)</span>
            <span className="font-extrabold text-teal-300">+{config.marketPromoJumpPercent}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={35}
            step={1}
            value={config.marketPromoJumpPercent}
            onChange={(e) => updateField('marketPromoJumpPercent', Number(e.target.value))}
            className="w-full accent-teal-400 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>10%</span>
            <span>35%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
