# The Loyalty Tax

**Why standard raises can't catch the market.** An interactive one-page infographic from Purdue University HR Compensation. It shows how traditional merit and promotion increases fall further behind market pay over a career, and three ways to close the gap.

**Live site:** https://clarkjr6.github.io/The-Loyalty-Tax/

## What it shows

- **The problem: the perpetual delta.** A 15-year chart of internal pay against external market growth, with the gap between them shaded. It reports the year-15 salary lag and the cumulative lost earnings.
- **The causes:**
  - **Initial market lag:** hired below the market midpoint.
  - **The promotion stepping delta:** a capped promotion raise against the larger market jump for the next role.
  - **Stagnant merit vs. market movement:** merit budgets that barely beat market inflation.
- **The solution: closing the distance.**
  1. Eliminate promotional caps.
  2. Lead the moving target with proactive market adjustments.
  3. Differentiate merit for high performers.

## Using it

- **Dynamic Trajectory Simulator:** sliders for starting salary, initial market lag, merit raise, market inflation, promotion raise and market jump. Every chart and figure recalculates as you move them.
- **Activate Solution Curve:** overlays the "Boilermaker Outpace Strategy" line, with uncapped promotions and differentiated merit.
- **Toolbar:**
  - **Copy Summary:** copies a text summary of the current scenario.
  - **Print / PDF**
  - **Present:** full-screen mode.
  - **Export High-Res PNG:** for decks and email.

The default figures are example assumptions:
- $90,000 starting salary, 10% below market
- 3% merit against 2.5% market inflation
- Promotions in years 5 and 10, at +10% internally against a +15% market jump

## Sharing it

| Option | How |
| --- | --- |
| Link | Send the live site above. It updates automatically on every push to `main`. |
| Single HTML file | Run `npm run build:single`, then send `dist-single/the-loyalty-tax.html`. Recipients double-click it to open it in any browser, with nothing to install. Fonts load from Google Fonts, so offline it uses fallback fonts. |

## Running it locally

You need [Node.js](https://nodejs.org/) 22 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server on port 3000 with hot reload |
| `npm run build` | Builds the site into `dist/` |
| `npm run build:single` | Builds one self-contained HTML file into `dist-single/` |
| `npm run preview` | Serves the `dist/` build locally |
| `npm run lint` | Type-checks the project |
| `npx tsx src/utils/salaryCalculations.test.ts` | Runs the salary-model tests |

No API keys or environment variables are needed.

## Deployment

`.github/workflows/deploy-pages.yml` builds the site and publishes it to GitHub Pages on every push to `main`. It can also be run by hand from the **Actions** tab. The build sets `BASE_PATH=/The-Loyalty-Tax/` so assets load from the project's Pages path.

## Project structure

```
src/
  App.tsx                    Page layout and state
  utils/salaryCalculations.ts  The salary trajectory model and its defaults
  components/
    PurdueGraphic.tsx        The infographic (the part that is exported)
    TrajectoryChart.tsx      15-year internal vs. market chart
    InitialMarketLag.tsx     Hiring-lag panel
    PromotionLadder.tsx      Promotion stepping-delta panel
    Gauges.tsx               Merit vs. market gauges
    SolutionPillars.tsx      The three solution pillars
    SimulatorControls.tsx    Simulator sliders
    ExportToolbar.tsx        Copy, print, present and PNG export
```

Built with React 19, TypeScript, Vite 8 and Tailwind CSS 4. The project was started in Google AI Studio; the `.aistudio/` folder holds files from that tool.
