# AgroSentinel Colombia

<div align="center">

[![Zenodo](https://zenodo.org/badge/DOI/10.5281/zenodo.pending.svg)](https://zenodo.org/badge/latestdoi/agrosentinel-colombia)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open Science](https://img.shields.io/badge/Open%20Science-CC%20BY%204.0-blue.svg)](investigacion-plaguicidas/)
[![Study n=44](https://img.shields.io/badge/Cohort-n%3D44%20farmers-orange.svg)](#scientific-research)
[![30 months](https://img.shields.io/badge/Study%20period-30%20months-blueviolet.svg)](#timeline)
[![HPLC-MS/MS](https://img.shields.io/badge/Lab-HPLC--MS%2FMS%2088%20samples-red.svg)](#methods)

**Low-cost IoT agronomic monitoring · Pesticide exposure cohort study · Open dataset**

[English](#english-abstract) · [Español](#resumen) · [Research Protocol](investigacion-plaguicidas/PROTOCOLO-INVESTIGACION.md) · [Issues](https://github.com/wilmerjoseperezorozco-dev/agrosentinel-colombia/issues) · [Releases](https://github.com/wilmerjoseperezorozco-dev/agrosentinel-colombia/releases)

</div>

---

## English Abstract

**AgroSentinel Colombia** is an open-science platform that couples a **low-cost ESP32 IoT soil/climate monitoring system** with a **30-month prospective cohort study** investigating organophosphate and carbamate pesticide exposure and human health outcomes in smallholder farming communities of the Atlántico department, Caribbean Colombia.

### Why this study

Colombia applies **~60 000 tonnes of pesticides per year** — among the highest rates in Latin America — yet systematic epidemiological data on small-scale producers are virtually absent from peer-reviewed literature. Existing monitoring infrastructure costs USD 2 200–5 500 per field point, placing it beyond the reach of 0.5–5 ha farms. This project bridges both gaps simultaneously: the IoT platform generates continuous agronomic data at a **field-node cost of USD 36–49** (130 000–180 000 COP), while the research protocol generates the epidemiological evidence that Colombia's public-health agencies lack.

### Key numbers

| Metric | Value |
|--------|-------|
| Study design | Prospective cohort (2 crop cycles) |
| Participants | n = 44 smallholder farmers |
| Study period | 30 months · Nov 2026 – May 2029 |
| IoT nodes deployed | 12 (1 per ~4 farmers) |
| Food samples (HPLC-MS/MS) | 88 (tomato, pepper, melon) |
| AChE inhibition measurements | 88 blood samples, paired |
| Spirometry assessments | 44 × 4 timepoints = 176 |
| Groundwater sampling points | ≥ 6 wells |
| Hypotheses | 4 (H1–H4) |
| Field-node cost | USD 36–49 vs USD 2 200–5 500 commercial |
| Cost reduction | **98%** |
| Supported crops | 5 (melón, ají, tomate, maíz, yuca) |
| Agronomic alert types | 6 |

### Research Hypotheses

| ID | Hypothesis | Primary endpoint |
|----|-----------|------------------|
| **H1** | Organophosphate/carbamate application events are associated with ≥ 20% AChE inhibition at 48 h | Blood AChE (Ellman method) |
| **H2** | Pesticide residues in harvest samples exceed Codex Alimentarius MRL in ≥ 20% of cases | HPLC-MS/MS (88 food samples) |
| **H3** | Cumulative pesticide exposure is associated with a ≥ 10% reduction in FEV₁ / FVC ratio at 30 months | Portable spirometry (4 timepoints) |
| **H4** | Adoption of bio-pesticide alternatives reduces AChE inhibition events by ≥ 40% relative to control group | AChE biomarker comparison, intervention arm |

### Methods snapshot

- **Exposure assessment**: IoT digital logs of application events (product, dose, duration, re-entry interval) via the AgroSentinel Android module; cross-validated against self-reported questionnaires.
- **Biomarker**: Erythrocyte and plasma AChE inhibition (Ellman colorimetric, standardized to baseline at enrolment).
- **Residue analysis**: HPLC-MS/MS, 88 food matrix samples (≥ 100 g each), analysed against 150+ pesticide panel; quantification limits aligned with EU EFSA and Codex Alimentarius MRLs.
- **Respiratory function**: Portable digital spirometer (FVC, FEV₁, FEV₁/FVC, PEF) at baseline, 6, 18, and 30 months.
- **Water quality**: Groundwater nitrate, organochlorine, and glyphosate analysis, ≥ 6 sampling points per crop cycle.
- **Statistical analysis**: R (Mann-Whitney U, multivariate logistic regression, ROC curves, mixed effects models for longitudinal data). Code: `investigacion-plaguicidas/ANALISIS-R/`.
- **Ethics**: Institutional ethics committee review pending (CUC / UMATA Atlántico). Informed consent protocol in `investigacion-plaguicidas/PROTOCOLO-INVESTIGACION.md`.

### Timeline

```
2026-Q4   Phase 0  — Ethics approval · farmer recruitment · node deployment
2027-Q1   Phase 1  — Crop cycle 1: AChE baselines, HPLC-MS/MS batch 1 (44 samples),
                      spirometry round 1, groundwater sampling
2027-Q4   Phase 1  — Crop cycle 1 end: HPLC-MS/MS batch 2 (44 samples), AChE follow-up
2028-Q2   Phase 2  — Crop cycle 2: bio-pesticide intervention arm, full repeat of
                      biomarker and residue measurements, longitudinal spirometry
2028-Q4   Phase 2  — Interim analysis; statistical pipeline (R), ROC curves
2029-Q2   Phase 3  — Manuscript submission (Computers & Electronics in Agriculture, IF 8.3)
                      Dataset deposit: Zenodo (open access, CC BY 4.0)
```

---

## Resumen

**AgroSentinel Colombia** es una plataforma de ciencia abierta que combina un **sistema de monitoreo agronómico IoT de bajo costo** (nodos ESP32, motor FAO-56, dashboard en tiempo real) con un **estudio de cohorte prospectivo de 30 meses** sobre exposición a plaguicidas organofosforados y carbamatos y efectos en salud humana en comunidades agrícolas del departamento del Atlántico, Colombia.

**El doble problema que resuelve:**
1. Las soluciones profesionales de monitoreo de suelo cuestan $8–20 millones COP por punto; este sistema baja ese costo a $130.000–180.000 COP (**reducción del 98%**).
2. Colombia carece de datos epidemiológicos sistemáticos sobre exposición a plaguicidas en pequeños productores del Caribe, a pesar de aplicar ~60.000 toneladas/año de plaguicidas.

**El estudio:** n = 44 agricultores · 30 meses · 12 nodos IoT · 88 muestras HPLC-MS/MS · 4 hipótesis (H1–H4) · protocolo completo en `investigacion-plaguicidas/`.

---

## IoT System — Quick Start

### No hardware needed (simulator mode)

```bash
git clone https://github.com/wilmerjoseperezorozco-dev/agrosentinel-colombia.git
cd agrosentinel-colombia

# Terminal 1 — server + dashboard
node servidor/server.js

# Terminal 2 — physical simulator (7-day backfill + live mode)
node simulador/simulador.js

# Open in browser
start http://localhost:3300
```

Requires: Node.js ≥ 18. Zero npm dependencies.

### Agronomic engine (FAO-56)

| Module | Calculation | Detail |
|--------|-------------|--------|
| ET₀ | Hargreaves-Samani | Calibrated for 11°N latitude (Atlántico) |
| ETc | ET₀ × Kc | Crop coefficients for 5 crops |
| VPD | Tetens equation | Stomatal closure detection |
| GDD | Base temperature by crop | Phenological stage tracking |
| Irrigation forecast | Linear regression on drying rate | "N days to irrigate" |
| Alert engine | 6 types | Drought, saturation, heat stress, fungal risk, critical VPD, wet-leaf night |

### Field Node Hardware

| Component | Function | Price COP |
|-----------|----------|-----------|
| ESP32 DevKit | MCU + WiFi | $28 000–38 000 |
| Capacitive soil sensor v2.0 | Volumetric moisture | $8 000–15 000 |
| SHT31 / DHT22 | Temperature + RH | $14 000–25 000 |
| DS18B20 (waterproof) | Soil temperature | $8 000–12 000 |
| OLED SSD1306 128×64 | Offline semaphore | $12 000 |
| 6V solar + TP4056 + 18650 | Autonomous power | $35 000–50 000 |
| IP65 enclosure | Field protection | $25 000–40 000 |
| **Node total** | | **$130 000–190 000** |

See `firmware/agromonitor_esp32/agromonitor_esp32.ino` for the complete calibrated sketch.

### API

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/nodos` | Current state of all nodes |
| GET | `/api/analisis?nodo=X&horas=96` | Full agronomic analysis for one node |
| GET | `/api/alertas?nodo=X` | Alert history (last 50) |
| GET | `/api/cultivos` | Crop thresholds table |
| POST | `/api/lecturas` | Receive reading from ESP32 or simulator |

---

## Project Structure

```
agrosentinel-colombia/
├── servidor/
│   ├── server.js              # HTTP API + dashboard serving (pure Node, zero deps)
│   ├── agronomia.js           # FAO-56 engine: ET₀, ETc, VPD, GDD, alerts, forecast
│   └── public/index.html      # Real-time dashboard (Chart.js)
├── simulador/
│   └── simulador.js           # Physical node simulator (backfill + live)
├── firmware/
│   └── agromonitor_esp32/
│       └── agromonitor_esp32.ino   # ESP32 firmware (calibrated + ready to flash)
├── investigacion-plaguicidas/
│   ├── PROTOCOLO-INVESTIGACION.md  # Full research protocol (n=44, 30 months)
│   ├── CRONOGRAMA.md               # 30-month Gantt timeline
│   ├── REFERENCIAS.md              # 25 peer-reviewed references
│   └── EXPORTACIONES-INCIDENTES.md # RASFF/FDA alert registry + 12 systematic studies
├── .zenodo.json               # Zenodo metadata
├── CITATION.cff               # Standard citation file (CFF 1.2)
├── PLAN-AGROMONITOR.md        # Business and cost factorization analysis
├── ROADMAP-IA-AGRICULTURA.md  # AI roadmap: YOLOv11, ESP32-CAM, drone NDVI, WhatsApp
└── package.json
```

---

## Data Availability & Open Science

| Dataset component | Format | License | Where |
|-------------------|--------|---------|-------|
| Anonymised IoT sensor data (per-lot) | CSV / JSON | CC BY 4.0 | Zenodo (post-Phase 1) |
| Pesticide application digital logs | CSV | CC BY 4.0 | Zenodo (post-Phase 1) |
| AChE inhibition results (anonymised) | CSV | CC BY 4.0 | Zenodo (post-Phase 2) |
| HPLC-MS/MS results | CSV | CC BY 4.0 | Zenodo (post-Phase 2) |
| Spirometry results (anonymised) | CSV | CC BY 4.0 | Zenodo (post-Phase 2) |
| Full source code (firmware, server, R) | GitHub | MIT | This repository |
| Research protocol | Markdown / PDF | CC BY 4.0 | `investigacion-plaguicidas/` |

**DOI:** Dataset registered on Zenodo. DOI badge at the top of this file will update automatically on each release.

---

## Roadmap

| Phase | Capability | Period | Status |
|-------|-----------|--------|--------|
| **0** | IoT system + FAO-56 engine + research protocol + ethics approval + recruitment | Nov 2026 | 🟡 In progress |
| **1** | Crop cycle 1: HPLC-MS/MS, AChE, spirometry, groundwater | Nov 2026 – Jun 2027 | 🔜 Planned |
| **2** | Crop cycle 2 + bio-pesticide intervention + longitudinal analysis | Jul 2027 – Jun 2028 | 🔜 Planned |
| **3** | Manuscript + Zenodo open dataset | Jul 2028 – May 2029 | 🔜 Planned |
| **AI-1** | YOLOv11 pest and disease detection from photographs | TBD | 🔜 Planned |
| **AI-2** | ESP32-CAM trap counting (automated) | TBD | 🔜 Planned |
| **AI-3** | Drone NDVI mapping + OpenDroneMap | TBD | 🔜 Planned |
| **AI-4** | WhatsApp AI assistant + yield prediction | TBD | 🔜 Planned |

See open issues for detailed task tracking: [github.com/…/issues](https://github.com/wilmerjoseperezorozco-dev/agrosentinel-colombia/issues)

---

## Citation

If you use this system or protocol, please cite:

```bibtex
@software{perez_orozco_2026_agrosentinel,
  author       = {Pérez Orozco, Wilmer José},
  title        = {AgroSentinel Colombia: Low-Cost IoT Precision Agriculture
                  and Pesticide Exposure Research in Caribbean Colombian
                  Smallholder Farmers},
  month        = sep,
  year         = 2026,
  publisher    = {Zenodo},
  version      = {1.0.0},
  url          = {https://github.com/wilmerjoseperezorozco-dev/agrosentinel-colombia}
}
```

See also [`CITATION.cff`](CITATION.cff) for machine-readable citation metadata.

---

## License

- **Source code** (firmware, server, simulator, agronomic engine): [MIT](LICENSE)
- **Research protocol and data** (`investigacion-plaguicidas/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

---

<div align="center">

Developed in **Tubará, Atlántico, Colombia** · Caribbean dry tropical forest · 11°N

*An open-science initiative to generate the epidemiological evidence that Colombia's smallholder farming communities deserve.*

</div>
