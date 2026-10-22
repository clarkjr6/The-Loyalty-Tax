import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const comparisonPoints = [
    {
      feature: 'Title & Framing',
      original: '"The Salary Gap: Why Standard Raises Can\'t Catch the Market"',
      purdue: 'Purdue University - HR Compensation: "The Legacy Tax: Why Standard Raises Can\'t Catch the Market"',
    },
    {
      feature: 'Trajectory Chart',
      original: '15-Year timeline with 2.5% inflation, 3% merit, and +20% / +10% promo nodes',
      purdue: 'Authentic Old Gold & Black SVG chart with dynamic real-time data, hover points, and Purdue rail track pattern',
    },
    {
      feature: 'The Promotion Disparity',
      original: 'Comparison of 10% promotional raise vs 20% market platform jump',
      purdue: 'Clean step-tier architecture highlighting the 10% internal promotion ceiling vs. 20% market value tower with uncaptured delta bracket',
    },
    {
      feature: 'Merit Gauges',
      original: 'Twin dial gauges for 3% merit vs 2.5% & up market movement',
      purdue: 'Industrial brass & gold gauges with reactive needles and dynamic percent updates',
    },
    {
      feature: 'The 3 Solutions',
      original: 'Eliminate caps (broken chain), Lead moving target (rocket), Differentiate top talent (podium)',
      purdue: 'Sledgehammer breaking the cap, Apollo/Saturn V Purdue Astronaut Rocket, and Boilermaker podium',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      data-testid="compare-modal"
    >
      <div className="relative w-full max-w-5xl bg-stone-900 border border-[#CEB888]/60 rounded-2xl p-6 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h2 className="text-xl font-black text-[#CEB888] flex items-center gap-2">
              <span>Original Graphic vs. Purdue Boilermakers Edition</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Side-by-side design audit ensuring complete fidelity to the original infographic structure.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-Side Images Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-start">
          {/* Original Attachment */}
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs uppercase tracking-wider text-stone-400">
                Original Reference Graphic
              </span>
              <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded font-bold">
                User Attachment
              </span>
            </div>
            <div className="rounded-lg overflow-hidden border border-stone-800/80 bg-stone-900">
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/image_4b166ba9.png`}
                alt="Original Salary Gap Graphic"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Design Mapping Breakdown */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#CEB888]">
                Purdue Adaptation Highlights
              </span>
              <span className="text-[10px] bg-[#CEB888]/20 text-[#CEB888] px-2 py-0.5 rounded font-bold border border-[#CEB888]/30">
                100% Layout Parity
              </span>
            </div>

            <div className="space-y-2.5">
              {comparisonPoints.map((pt, i) => (
                <div key={i} className="p-3 bg-stone-950/80 rounded-lg border border-stone-800 text-xs">
                  <div className="font-bold text-stone-200 flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#CEB888] shrink-0" />
                    <span>{pt.feature}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1.5 pl-6 text-[11px]">
                    <div className="text-stone-400">
                      <span className="block text-[9.5px] uppercase font-bold text-stone-400">Original:</span>
                      {pt.original}
                    </div>
                    <div className="text-[#EAD8A4]">
                      <span className="block text-[9.5px] uppercase font-bold text-[#CEB888]">Purdue Edition:</span>
                      {pt.purdue}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-2 w-full py-2.5 bg-gradient-to-r from-[#9E7A1C] to-[#CEB888] text-black font-extrabold rounded-lg hover:opacity-95 transition text-xs tracking-wider uppercase"
            >
              Back to Graphic & Simulator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
