# BizAutopsy AI — frontend

Frontend for the "AI Business Autopsy Tool for SMEs" HND final project. Built with
React + Vite, Tailwind CSS, React Router, and Recharts. All data is mocked in
`src/data/mockData.js` so you can run the whole thing with no backend yet — swap
that file for real API calls once the Chapter 2 backend (Python/MySQL) is ready.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

To build for deployment:

```bash
npm run build
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  components/
    Sidebar.jsx        main + analysis navigation, from the use-case diagram
    Layout.jsx          sidebar + scrollable content shell used by every route
    PageHeader.jsx       page title / subtitle / actions
    HealthGauge.jsx      circular business-health gauge (signature "vitals" element)
    EKGStrip.jsx         animated heartbeat waveform accent
    ui.jsx               SectionCard, StatCard, RiskBar, PriorityBadge
  pages/
    Dashboard.jsx        overview: health score, revenue chart, risk snapshot
    Upload.jsx            data import + analysis settings (maps to "Upload business data")
    Diagnostics.jsx        full report: risk assessment, root causes, recommendations
    SalesTrends.jsx        revenue vs target
    Expenses.jsx            category breakdown vs industry benchmark
    Customers.jsx            retention / new vs returning
  data/
    mockData.js           stand-in for the AI Analysis Engine + Business Database
```

## Design system

- Colors, type scale and spacing are defined in `tailwind.config.js` (palette:
  deep "void" sidebar, warm paper canvas, teal "vital" accent for healthy
  signals, coral/amber for risk).
- Fonts: Space Grotesk (headings/display), Inter (body), IBM Plex Mono (scores,
  currency, data-heavy numbers) — loaded via Google Fonts in `index.html`.
- The health score gauge + scrolling EKG waveform is the app's signature visual,
  echoing the "autopsy/diagnosis" concept from the project brief.

## Wiring up the real backend

Replace the exports in `src/data/mockData.js` with `fetch`/axios calls to your
Python backend once it's ready (e.g. `GET /api/business/:id/diagnostics`), and
the pages will keep working unchanged since they only consume the shaped data,
not the mock module directly by name.
