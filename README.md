# 🗺️ Nepal Remittance Vulnerability Atlas

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-green)

> **Live App:** https://nepal-remittance-atlas-js.vercel.app/

A full-stack interactive web application 
mapping migration intensity and structural 
vulnerability across Nepal's 75 districts.
Built on original economic research using 
PCA-based composite indices and real 
government data.

---

## ✨ What Makes This Different

Most data dashboards display one index.
This app displays two — and shows they 
measure completely different things.

Toggle between **RDI (Migration Intensity)** 
and **RVI (Structural Vulnerability)** on 
the same map and watch Nepal's vulnerability 
story change completely. The near-zero 
correlation (r = 0.049) between the two 
indices is the central finding — made 
visible in one click.

---

## 🖥️ Pages

| Page | Description |
|---|---|
| 🗺️ The Atlas | Interactive choropleth map with RDI/RVI toggle, district sidebar, tier rankings |
| 🔍 District Explorer | Full vulnerability profile — both indices, radar chart, gauge, indicators |
| 🏔️ Provincial Analysis | Province-level comparison, bubble chart, summary table |
| 📈 Migration Patterns | 20-year NRB time series, destination shift, escalation evidence |
| 📋 The Research | Full working paper — abstract, methods, findings, policy matrix, references |

---

## 🔬 Research Foundation

This application is built on original 
economic research. The underlying analysis — 
PCA-based index construction, Moran's I 
spatial autocorrelation, robustness testing 
across 3 weighting schemes, and a full 
working paper — is documented in the 
research repository.

| | Link |
|---|---|
| 🔬 Research Repository | [nepal-remittance-atlas](https://github.com/tprasanna086-droi/Nepal-remittance-atlas) |
| 📊 Streamlit Dashboard | [Open Research App](https://nepal-remittance-atlas-bgric42dfa7wg5nqjm5zsf.streamlit.app/) |
| 📄 Full Methodology | [METHODOLOGY.md](https://github.com/tprasanna086-droi/Nepal-remittance-atlas/blob/main/data/processed/METHODOLOGY.md) |

---

## 🧮 The Two Indices

### Migration Dependency Index (RDI)
Measures active migration intensity.
Three indicators: absent household rate,
absent population rate, education inverse.

### Remittance Vulnerability Index (RVI)
Measures structural vulnerability using PCA.
Three structural indicators: MPI poverty,
literacy rate (inverse), secondary education
(inverse). Migration variables deliberately
excluded to avoid circularity.

**Central finding:** Spearman r = 0.049
(p > 0.05) — the two indices are
statistically independent.

---

## 📊 Data Sources

| Source | Data | Year |
|---|---|---|
| CBS Nepal Census | Absentee population, literacy, education | 2021 |
| OPHI/DHS via HDX | Provincial MPI headcount ratios | 2022 |
| NRB Macroeconomic Tables | Labour permits by destination | 2024 |
| World Bank | GDP, remittance % of GDP | 2023 |
| GeoJSON Nepal | District boundary shapefiles | — |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Maps | Leaflet / React-Leaflet |
| Charts | Recharts |
| Data | Static JSON from Python pipeline |
| Hosting | Vercel |

---

## 🚀 Run Locally

```bash
git clone https://github.com/tprasanna086-droi/nepal-remittance-atlas-js.git
cd nepal-remittance-atlas-js
npm install
npm run dev
```

Opens at `http://localhost:3000`

---

## 👤 Author

**Prasanna Thapa**
Nepal · 2026

Independent research project on Nepal's
remittance economy.

🔬 [Research Repository](https://github.com/tprasanna086-droi/Nepal-remittance-atlas) ·
🌐 [Live App](https://nepal-remittance-atlas-js.vercel.app/) ·
📊 [Streamlit Version](https://nepal-remittance-atlas-bgric42dfa7wg5nqjm5zsf.streamlit.app/)

---

## 📄 License
MIT License