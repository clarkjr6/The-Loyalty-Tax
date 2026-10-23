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
import { SolutionPillars } from './components/SolutionPillars';
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
            onToggleBoilermakerCurve={handleToggleBoilermaker}
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

            {/* THE SOLUTION: CLOSING THE DISTANCE (Horizontal Across Bottom) */}
            <div className="bg-stone-900/90 border border-[#CEB888]/40 rounded-xl p-5 sm:p-6 text-stone-200 shadow-xl">
              <div className="border-b border-stone-800 pb-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#CEB888] block">
                  THE SOLUTION:
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-stone-100 uppercase">
                  CLOSING THE DISTANCE
                </h3>
              </div>

              <SolutionPillars
                theme="dark"
                orientation="horizontal"
                activePillar={activePillar}
                onSelectPillar={(idx) => setActivePillar(activePillar === idx ? null : idx)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
