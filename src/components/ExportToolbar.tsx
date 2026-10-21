import React, { useState } from 'react';
import { Download, Printer, Copy, Check, Eye, Maximize2, Minimize2, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { TrajectoryResult, SalaryConfig, formatCurrency } from '../utils/salaryCalculations';

interface ExportToolbarProps {
  graphicRef: React.RefObject<HTMLDivElement | null>;
  trajectory: TrajectoryResult;
  config: SalaryConfig;
  onOpenCompare: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  graphicRef,
  trajectory,
  config,
  onOpenCompare,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadPng = async () => {
    if (!graphicRef.current) return;
    setIsExporting(true);
    try {
      // Small timeout to ensure fonts are rendered
      const dataUrl = await toPng(graphicRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution for presentation
        backgroundColor: '#0B0B0B',
      });
      const link = document.createElement('a');
      link.download = `purdue-legacy-tax-graphic-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image export:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopySummary = async () => {
    const text = `
PURDUE UNIVERSITY - HR COMPENSATION | The Legacy Tax: Why Standard Raises Can't Catch the Market
=============================================================================
• Starting Base: ${formatCurrency(config.startingSalary)} (-${config.initialLagPercent}% market lag)
• 15-Year Standard Internal Salary: ${formatCurrency(trajectory.endInternalSalary)}
• 15-Year External Market Value: ${formatCurrency(trajectory.endMarketSalary)}
• 15-Year Salary Lag: -${formatCurrency(trajectory.finalDeltaAmount)} / yr (-${trajectory.finalDeltaPercent}%)
• Cumulative Lifetime Earnings Lost to Delta: ${formatCurrency(trajectory.cumulativeLostIncome)}

Key Drivers:
1. Internal Merit (${config.annualMeritPercent}%) barely exceeds Market Inflation (${config.annualMarketInflationPercent}%)
2. Promotional Cap (+${config.promoRaisePercent}%) fails to match Next-Level Market Jump (+${config.marketPromoJumpPercent}%)

The Boilermaker Solutions:
1. Eliminate Promotional Caps (Hammer down the 10% ceiling)
2. Lead the Moving Target (Aggressive market adjustments)
3. Differentiate for High Performers (5%-8%+ merit rewards)
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Failed to copy text', e);
    }
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-2.5 py-3 px-4 bg-stone-900 border border-stone-800 rounded-xl">
      {/* Left items: Compare & Status */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCompare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-[#CEB888]/20 hover:text-[#CEB888] text-stone-200 rounded-lg text-xs font-bold transition border border-stone-700"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Compare With Original Attachment</span>
        </button>

        <span className="hidden sm:inline-block text-[11px] text-stone-400 border-l border-stone-800 pl-3">
          15-Yr Gap: <span className="text-orange-400 font-bold">-{formatCurrency(trajectory.finalDeltaAmount)}</span>
        </span>
      </div>

      {/* Right items: Export actions */}
      <div className="flex items-center gap-2">
        {/* Copy text */}
        <button
          onClick={handleCopySummary}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition border border-stone-700"
          title="Copy executive data summary to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
        </button>

        {/* Print */}
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition border border-stone-700"
          title="Print or save as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print / PDF</span>
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={onToggleFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition border border-stone-700"
          title="Toggle Fullscreen Presentation"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Present'}</span>
        </button>

        {/* Export PNG */}
        <button
          onClick={handleDownloadPng}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#9E7A1C] to-[#CEB888] text-black font-extrabold rounded-lg text-xs transition shadow-md hover:opacity-95 disabled:opacity-50"
          title="Export high-resolution PNG image"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Exporting...' : 'Export High-Res PNG'}</span>
        </button>
      </div>
    </div>
  );
};
