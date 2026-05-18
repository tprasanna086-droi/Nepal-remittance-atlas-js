[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

# Nepal Remittance Atlas

An interactive data atlas mapping migration intensity and structural vulnerability across Nepal's 75 districts. Built on original economic research using PCA-based composite indices and real government census data.

Live site: https://nepal-remittance-atlas-js.vercel.app

---

## What Makes This Different

Most data dashboards display one index. This atlas displays two — and shows they measure completely different things.

Toggle between RDI (Migration Dependency Index) and RVI (Remittance Vulnerability Index) on the same choropleth map and watch Nepal's vulnerability story change completely. The near-zero Spearman correlation (r = 0.049, p > 0.05) between the two indices is the central research finding — made visible in one click.

---

## Pages

| Page | Description |
|------|-------------|
| The Atlas | Interactive choropleth map with RDI/RVI toggle, district sidebar, tier rankings |
| District Explorer | Full vulnerability profile — both indices, radar chart, gauge, indicators |
| Provincial Analysis | Province-level comparison, scatter plot, summary cards |
| Migration Patterns | 15-year NRB time series, destination breakdown, labour permit trends |
| The Research | Full working paper — abstract, methodology, findings, policy implications, references |

---

## Research Foundation

This application is built on original economic research. The underlying analysis includes PCA-based index construction, Moran's I spatial autocorrelation testing (I = 0.571, p < 0.05), robustness testing across three weighting schemes, and a full working paper documented in the research repository.

| Resource | Link |
|----------|------|
| Research Repository | https://github.com/tprasanna086-droi/Nepal-remittance-atlas |
| Original Streamlit Dashboard | https://nepal-remittance-atlas-bgric42dfa7wg5nqjm5zsf.streamlit.app |

---

## The Two Indices

**Migration Dependency Index (RDI)**

Measures active migration intensity across three indicators: absent household rate (weight 0.40), absent population rate (weight 0.35), and inverse education score (weight 0.25). Theory-driven weights, min-max normalized to 0-100.

**Remittance Vulnerability Index (RVI)**

Measures structural vulnerability using Principal Component Analysis on three indicators: MPI poverty rate, literacy rate (inverted), and secondary education rate (inverted). Migration variables deliberately excluded to avoid circularity. PC1 explains 63.35% of variance. KMO = 0.58. Rescaled to 0-100.

**Central finding:** Spearman r = 0.049 (p > 0.05) — the two indices are statistically independent. A district's migration intensity does not predict its structural vulnerability.

---

## Data Sources

| Source | Data | Year |
|--------|------|------|
| CBS Nepal Census | Absentee population, literacy, education | 2021 |
| OPHI/DHS via HDX | Provincial MPI headcount ratios | 2022 |
| Nepal Rastra Bank | Labour permits, remittance inflows | 2024 |
| World Bank WDI | GDP, remittance as % of GDP | 2023 |
| GeoJSON Nepal | District boundary shapefiles | — |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React + Vite |
| Language | JavaScript (ES6) |
| Styling | CSS Modules |
| Maps | Leaflet.js |
| Charts | Recharts |
| Data parsing | PapaParse |
| Hosting | Vercel |

---

## Run Locally

```bash
git clone https://github.com/tprasanna086-droi/Nepal-remittance-atlas-js.git
cd Nepal-remittance-atlas-js
npm install
npm run dev
```

Opens at http://localhost:5173

---

## Author

Prasanna Thapa
Nepal · 2026
Independent research project on Nepal's remittance economy.

---

## License

MIT License — see [LICENSE](LICENSE) for details.
