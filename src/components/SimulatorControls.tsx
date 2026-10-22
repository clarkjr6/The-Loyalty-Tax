import React from 'react';
import { Sliders, RotateCcw, Sparkles, TrendingUp, DollarSign, Percent } from 'lucide-react';
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-stone-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#CEB888] shrink-0" />
          <div>
            <h3 className="font-extrabold text-sm text-stone-100 flex items-center gap-2">
              <span>Dynamic Trajectory Simulator</span>
              <span className="text-[10px] bg-[#CEB888]/20 text-[#CEB888] font-bold px-2 py-0.5 rounded border border-[#CEB888]/30">
                LIVE
              </span>
            </h3>
            <p className="text-xs text-stone-400">
              Adjust variables to test career compensation scenarios and watch the graphic recalculate in real-time.
            </p>
          </div>
        </div>

        {/* Actions: Activate Solution Curve & Reset Button */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Solution Curve Toggle Button */}
          <button
            onClick={() => onToggleBoilermakerCurve(!showBoilermakerCurve)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md ${
              showBoilermakerCurve
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-400 shadow-emerald-900/30'
                : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${showBoilermakerCurve ? 'text-yellow-200' : 'text-[#CEB888]'}`} />
            <span>
              {showBoilermakerCurve ? '✓ Strategy Active' : 'Activate Solution Curve'}
            </span>
            <span className="text-[10px] opacity-80 font-normal hidden sm:inline">(Eliminates 10% cap + 4.8% merit)</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={() => onChangeConfig({ ...DEFAULT_SALARY_CONFIG })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition border border-stone-700"
            title="Reset to default infographic numbers"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        </div>
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
