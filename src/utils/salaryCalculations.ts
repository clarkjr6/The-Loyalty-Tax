/**
 * Utility functions for calculating career salary trajectories,
 * market divergence, and the Boilermaker compensation acceleration models.
 */

export interface SalaryConfig {
  startingSalary: number;
  initialLagPercent: number; // e.g. 10 means internal starts 10% below market
  annualMeritPercent: number; // e.g. 3.0%
  annualMarketInflationPercent: number; // e.g. 2.5%
  promotionYears: number[]; // e.g. [5, 10]
  promoRaisePercent: number; // e.g. 10.0% internal promotion
  marketPromoJumpPercent: number; // e.g. 20.0% external promotion value jump
  totalYears: number; // default 15
  // Boilermaker Solution Overrides
  boilermakerPromoRaisePercent?: number; // e.g. 20.0% (no cap)
  boilermakerMeritPercent?: number; // e.g. 4.5% or 5.0% (differentiated)
}

export interface TrajectoryYearPoint {
  year: number;
  internalSalary: number;
  marketSalary: number;
  deltaAmount: number;
  deltaPercent: number;
  isPromotionYear: boolean;
  boilermakerSalary?: number;
  boilermakerDelta?: number;
}

export interface TrajectoryResult {
  timeline: TrajectoryYearPoint[];
  startMarketSalary: number;
  startInternalSalary: number;
  endInternalSalary: number;
  endMarketSalary: number;
  finalDeltaAmount: number;
  finalDeltaPercent: number;
  cumulativeLostIncome: number;
  endBoilermakerSalary?: number;
  cumulativeBoilermakerGain?: number;
}

export const DEFAULT_SALARY_CONFIG: SalaryConfig = {
  startingSalary: 90000,
  initialLagPercent: 10,
  annualMeritPercent: 3.0,
  annualMarketInflationPercent: 2.5,
  promotionYears: [5, 10],
  promoRaisePercent: 10.0,
  marketPromoJumpPercent: 15.0,
  totalYears: 15,
  boilermakerPromoRaisePercent: 20.0,
  boilermakerMeritPercent: 4.8,
};

export function calculateSalaryTrajectories(config: Partial<SalaryConfig> = {}): TrajectoryResult {
  const cfg = { ...DEFAULT_SALARY_CONFIG, ...config };
  const timeline: TrajectoryYearPoint[] = [];

  // Market salary starts higher if starting with an initial lag:
  // e.g. If lag is 10%, Internal = startingSalary, Market = startingSalary / (1 - 0.10)
  const initialMarket = cfg.initialLagPercent > 0 
    ? Math.round(cfg.startingSalary / (1 - cfg.initialLagPercent / 100))
    : cfg.startingSalary;

  let currentInternal = cfg.startingSalary;
  let currentMarket = initialMarket;
  let currentBoilermaker = cfg.startingSalary; // Boilermaker also starts here or at market

  let cumulativeLoss = 0;
  let cumulativeBoilermakerGain = 0;

  for (let year = 0; year <= cfg.totalYears; year++) {
    const isPromo = cfg.promotionYears.includes(year) && year > 0;

    if (year > 0) {
      if (isPromo) {
        // Promotion year: Promotional raise applied
        currentInternal = currentInternal * (1 + cfg.promoRaisePercent / 100);
        currentMarket = currentMarket * (1 + cfg.marketPromoJumpPercent / 100);
        
        const bmPromo = cfg.boilermakerPromoRaisePercent ?? cfg.marketPromoJumpPercent;
        currentBoilermaker = currentBoilermaker * (1 + bmPromo / 100);
      } else {
        // Standard year: Annual merit & inflation
        currentInternal = currentInternal * (1 + cfg.annualMeritPercent / 100);
        currentMarket = currentMarket * (1 + cfg.annualMarketInflationPercent / 100);

        const bmMerit = cfg.boilermakerMeritPercent ?? (cfg.annualMeritPercent + 1.8);
        currentBoilermaker = currentBoilermaker * (1 + bmMerit / 100);
      }
    }

    const roundedInternal = Math.round(currentInternal);
    const roundedMarket = Math.round(currentMarket);
    const roundedBoilermaker = Math.round(currentBoilermaker);

    const deltaAmount = roundedMarket - roundedInternal;
    const deltaPercent = Number(((deltaAmount / roundedMarket) * 100).toFixed(1));

    if (year > 0) {
      cumulativeLoss += Math.max(0, deltaAmount);
      cumulativeBoilermakerGain += (roundedBoilermaker - roundedInternal);
    }

    timeline.push({
      year,
      internalSalary: roundedInternal,
      marketSalary: roundedMarket,
      deltaAmount,
      deltaPercent,
      isPromotionYear: isPromo,
      boilermakerSalary: roundedBoilermaker,
      boilermakerDelta: roundedBoilermaker - roundedMarket,
    });
  }

  const finalPoint = timeline[timeline.length - 1];

  return {
    timeline,
    startMarketSalary: timeline[0].marketSalary,
    startInternalSalary: timeline[0].internalSalary,
    endInternalSalary: finalPoint.internalSalary,
    endMarketSalary: finalPoint.marketSalary,
    finalDeltaAmount: finalPoint.deltaAmount,
    finalDeltaPercent: finalPoint.deltaPercent,
    cumulativeLostIncome: cumulativeLoss,
    endBoilermakerSalary: finalPoint.boilermakerSalary,
    cumulativeBoilermakerGain,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(val: number): string {
  return `${val >= 0 ? '+' : ''}${val.toFixed(1)}%`;
}
