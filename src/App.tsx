/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { PurdueMotionP, BoilermakerSpecialTrainIcon, SledgehammerIcon } from './components/PurdueLogo';
import { PurdueGraphic } from './components/PurdueGraphic';
import { SimulatorControls } from './components/SimulatorControls';
import { ExportToolbar } from './components/ExportToolbar';
import {
  DEFAULT_SALARY_CONFIG,
  SalaryConfig,
  calculateSalaryTrajectories,
  formatCurrency,
} from './utils/salaryCalculations';
import {
  TrendingUp,
  Award,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SalaryConfig>(DEFAULT_SALARY_CONFIG);
  const [showBoilermakerCurve, setShowBoilermakerCurve] = useState<boolean>(false);
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const graphicRef = useRef<HTMLDivElement | null>(null);

  // Compute calculated values
  const trajectory = useMemo(() => {
    return calculateSalaryTrajectories(config);
  }, [config]);

  // Confetti celebration function in Purdue colors (Old Gold, Black, White)
  const fireBoilermakerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#CEB888', '#DFC17B', '#000000', '#FFFFFF', '#9E7A1C'],
    });
  };

  const handleToggleBoilermaker = (val: boolean) => {
    setShowBoilermakerCurve(val);
    if (val) {
      fireBoilermakerConfetti();
    }
  };

  return (
    <div className={`min-h-screen ${isFullscreen ? 'p-2 sm:p-4 bg-black' : 'p-3 sm:p-6 lg:p-8'} transition-colors duration-200`}>
      {/* Main Content Area */}
      <main className="max-w-[1280px] mx-auto space-y-6">
        {/* Export and Action Toolbar */}
        <ExportToolbar
          graphicRef={graphicRef}
          trajectory={trajectory}
          config={config}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        {/* The Graphic (Primary Canvas) */}
        <div className="relative">
          <PurdueGraphic
            ref={graphicRef}
            trajectory={trajectory}
            config={config}
            theme="dark"
            showBoilermakerCurve={showBoilermakerCurve}
            activePillar={activePillar}
            onSelectPillar={(idx) => setActivePillar(activePillar === idx ? null : idx)}
          />
        </div>

        {/* Controls & Simulator (Collapsible or visible) */}
        {!isFullscreen && (
          <div className="space-y-6">
            <SimulatorControls
              config={config}
              onChangeConfig={setConfig}
              showBoilermakerCurve={showBoilermakerCurve}
              onToggleBoilermakerCurve={handleToggleBoilermaker}
            />

            {/* Purdue Boilermaker Strategic Analysis Insights Card */}
            <div className="bg-stone-900/90 border border-[#CEB888]/40 rounded-xl p-5 text-stone-200 shadow-xl">
              <div className="flex items-center gap-2 border-b border-stone-800 pb-3 mb-4">
                <SledgehammerIcon size={24} />
                <h3 className="font-black text-sm uppercase tracking-wider text-[#CEB888]">
                  THE LOYALTY TAX AND THE BOILERMAKER RESOLUTION
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
                <div className="bg-stone-950 p-4 rounded-lg border border-stone-800/80">
                  <div className="flex items-center gap-2 font-bold text-stone-100 mb-2">
                    <span className="w-5 h-5 rounded-full bg-orange-950 text-orange-400 flex items-center justify-center font-black text-[10px]">
                      1
                    </span>
                    <span>The Compound Effect of Merit vs. Inflation</span>
                  </div>
                  <p className="text-stone-400">
                    With an internal merit budget of <strong className="text-stone-200">{config.annualMeritPercent}%</strong>{' '}
                    and external market growth of <strong className="text-teal-400">{config.annualMarketInflationPercent}%</strong>,
                    the net compounding margin is barely 0.5% per year. Over a 15-year timeline, this fails to overcome initial
                    market disparities.
                  </p>
                </div>

                <div className="bg-stone-950 p-4 rounded-lg border border-stone-800/80">
                  <div className="flex items-center gap-2 font-bold text-stone-100 mb-2">
                    <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center font-black text-[10px]">
                      2
                    </span>
                    <span>The Promotion Stepping Paradox</span>
                  </div>
                  <p className="text-stone-400">
                    The single largest widening event happens at promotion milestones. Standard corporate policy enforces an
                    artificial cap of <strong className="text-amber-400">+{config.promoRaisePercent}%</strong>, while the open
                    market revalues that new title at <strong className="text-teal-400">+{config.marketPromoJumpPercent}%</strong>.
                    Each promotion ironically widens the dollar gap.
                  </p>
                </div>

                <div className="bg-stone-950 p-4 rounded-lg border border-stone-800/80">
                  <div className="flex items-center gap-2 font-bold text-stone-100 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#CEB888]/20 text-[#CEB888] flex items-center justify-center font-black text-[10px]">
                      3
                    </span>
                    <span>The Boilermaker Resolution</span>
                  </div>
                  <p className="text-stone-400">
                    By benchmarking promotions to market rates and providing 5%+ merit awards to the top performers, Purdue will become a national leader in eliminating the &ldquo;loyalty tax,&rdquo; thus rewarding the sustained contributions of employees who have dedicated years of service to the university&rsquo;s long-term success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
