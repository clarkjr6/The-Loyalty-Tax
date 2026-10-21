import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSalaryTrajectories, formatCurrency, formatPercent } from './salaryCalculations.ts';

test('calculateSalaryTrajectories computes correct 15-year baseline', () => {
  const result = calculateSalaryTrajectories({
    startingSalary: 100000,
    initialLagPercent: 10,
    annualMeritPercent: 3.0,
    annualMarketInflationPercent: 2.5,
    promotionYears: [5, 10],
    promoRaisePercent: 10.0,
    marketPromoJumpPercent: 20.0,
    totalYears: 15,
  });

  // Verify year length
  assert.equal(result.timeline.length, 16); // Year 0 to 15
  assert.equal(result.startInternalSalary, 100000);
  assert.equal(result.startMarketSalary, 111111); // 100000 / 0.9

  // Market jumps at year 5 and year 10 should widen the delta significantly
  const y4 = result.timeline[4];
  const y5 = result.timeline[5];
  assert.equal(y5.isPromotionYear, true);
  assert.equal(y4.isPromotionYear, false);

  // End market should be notably higher than end internal
  assert.ok(result.endMarketSalary > result.endInternalSalary);
  assert.ok(result.finalDeltaAmount > 0);
  assert.ok(result.cumulativeLostIncome > 100000);

  // Boilermaker strategy outpaces standard internal
  assert.ok((result.endBoilermakerSalary ?? 0) > result.endInternalSalary);
});

test('formatCurrency formats values properly without decimals', () => {
  assert.equal(formatCurrency(125000), '$125,000');
  assert.equal(formatCurrency(0), '$0');
});

test('formatPercent handles signs and decimals', () => {
  assert.equal(formatPercent(3.5), '+3.5%');
  assert.equal(formatPercent(-10), '-10.0%');
});
