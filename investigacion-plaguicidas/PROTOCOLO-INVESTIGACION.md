# Protocolo de Investigación Científica
## Exposición a Plaguicidas en Comunidades Agrícolas del Atlántico: Riesgos para la Salud Humana, Residuos en Alimentos y Estrategias de Reducción mediante Tecnología IoT

**Tipo de estudio:** Investigación observacional de cohorte transversal + intervención tecnológica  
**Nivel de evidencia objetivo:** Nivel III (estudio de cohorte observacional con datos primarios)  
**Registro prospectivo:** Zenodo DOI (pendiente de asignación)  
**Versión del protocolo:** 1.0 — 14 septiembre 2026  
**Autor principal:** Wilmer Pérez Orozco  
**Institución:** Proyecto AgroMonitor Tubará — Atlántico, Colombia  

---

## Resumen ejecutivo

Los plaguicidas son la primera causa de intoxicación reportada en Colombia (INS 2023: 6.555 casos, 86 muertes). Las comunidades agrícolas del Atlántico utilizan mezclas de herbicidas, insecticidas y fungicidas con escasa protección personal, sin registro digital de aplicaciones y con exposición directa de poblaciones vulnerables (niños, mujeres embarazadas, adultos mayores). La evidencia científica global documenta asociaciones consistentes entre exposición crónica a organofosforados, carbamatos y herbicidas de amplio espectro con genotoxicidad, alteraciones endocrinas, trastornos neurológicos y canceres hematológicos.

Esta investigación propone un estudio integrado que combine (1) vigilancia epidemiológica de exposición en campo mediante AgroMonitor, (2) análisis de residuos en alimentos producidos localmente, y (3) evaluación de síntomas en agricultores, para generar evidencia local que oriente políticas de reducción de uso y protección de la salud en la Costa Caribe colombiana.

---

## 1. Introducción y justificación

### 1.1 Carga global de enfermedad por plaguicidas

La Organización Mundial de la Salud (OMS) estima que **385 millones de personas** sufren intoxicaciones agudas por plaguicidas cada año, con 11.000 muertes confirmadas —aunque la subnotificación en países de ingresos bajos y medios (PIBM) podría elevar esta cifra en un orden de magnitud. La carga crónica es más difícil de cuantificar: una revisión de 3.908 publicaciones (2005–2024) en IJERPH confirma tendencia de crecimiento en la asociación documentada entre exposición a plaguicidas y cáncer.

El estudio más reciente de mayor impacto (ScienceDaily, abril 2026) evaluó 150.000 pacientes oncológicos en Perú (país con condiciones comparables a Colombia): la exposición simultánea a ~12 plaguicidas en entornos agrícolas eleva el riesgo de cáncer hasta un **150%** respecto a poblaciones no expuestas, incluso cuando cada compuesto individual se considera dentro de límites "seguros". Este hallazgo cuestiona radicalmente la metodología de evaluación de riesgo basada en sustancia única que usan los marcos regulatorios actuales, incluyendo el colombiano.

### 1.2 Situación en Colombia: datos verificados

**Intoxicaciones agudas (INS/SIVIGILA 2023):**
- **6.555 personas intoxicadas** — primera causa de intoxicación en el país
- **86 muertes confirmadas** por intoxicación con plaguicidas
- Grupos más afectados: hombres rurales, 15–39 años, con intoxicación aguda (suicida o accidental)
- Entre 1998 y 2011: 4.835 muertes acumuladas, tasa ajustada 2,38/100.000 habitantes

**Principios activos más usados en Colombia (ICA, estudio epidemiológico 7 departamentos):**

| Principio activo | Categoría | % de uso reportado | Categoría toxicológica OMS |
|-----------------|-----------|-------------------|---------------------------|
| Carbofuran | Insecticida/nematicida | 15,4% | Ia — Extremadamente peligroso |
| Malatión | Insecticida organofosforado | 10,5% | III — Ligeramente peligroso |
| Endosulfán | Insecticida organoclorado | 8,4% | II — Moderadamente peligroso |
| Clorpirifós | Insecticida organofosforado | 7,0% | II — Moderadamente peligroso |
| Mancozeb | Fungicida ditiocarbamato | Amplio uso | U — Peligro desconocido |
| Glifosato | Herbicida | Primer lugar | U (IARC: 2A probable carcinógeno) |
| Paraquat | Herbicida | Alta frecuencia suicida | Ib — Muy peligroso |
| Metamidofós | Organofosforado | Restringido, aún en uso | Ib — Muy peligroso |

**Nota crítica:** El endosulfán y el carbofuran están prohibidos en la Unión Europea y en varios países de América Latina, pero Colombia aún permite su uso o lo hace bajo restricciones parciales.

**Glifosato — el caso más documentado en Colombia:**
- Usado masivamente en erradicación de coca (fumigación aérea hasta 2015, en debate de retorno)
- 12 estudios sistemáticos en Colombia documentan: daño dermatológico, respiratorio, aumento de abortos espontáneos en zonas de fumigación, alteraciones cromosómicas
- IARC/OMS 2015: clasificado como "probable carcinógeno humano" (Grupo 2A)
- Colombia suspendió la fumigación aérea en 2015 tras fallo de la Corte Constitucional — debate no resuelto a septiembre 2026

**Brecha de información (ScienceDirect, Colombia 2021):**
> *"Colombia exemplifies the necessity to narrow this information gap in LMICs. Colombia produces and exports pesticide products to different countries from Ecuador to Japan."*

Colombia importa, produce Y exporta plaguicidas, pero carece de un sistema de vigilancia de residuos en alimentos a escala nacional comparable al de la Unión Europea o EE.UU.

### 1.3 Contexto en el Atlántico

El departamento del Atlántico combina:
- **Bosque seco tropical** con déficit hídrico estacional → mayor presión de plagas y hongos → mayor uso de plaguicidas
- **Cultivos predominantes en el estudio:** melón, ají, tomate, maíz, yuca — todos con historial de uso intensivo de fungicidas e insecticidas
- **Acceso limitado a equipos de protección personal (EPP)** en productores de subsistencia
- **Agua de consumo de pozos o acueductos locales** con riesgo potencial de contaminación por lixiviación
- **Ausencia de laboratorio de residuos en alimentos** con cobertura rural en el departamento

---

## 2. Pregunta de investigación

> **¿Qué relación existe entre las prácticas de manejo de plaguicidas en productores agrícolas del Atlántico (Colombia), la exposición humana medida mediante síntomas e inhibición de colinesterasa, y la presencia de residuos de plaguicidas en los alimentos producidos localmente (melón, ají, tomate, maíz)?**

**Subpreguntas:**
1. ¿Cuáles son los plaguicidas más usados en los cultivos de ciclo corto del Atlántico y en qué dosis/frecuencia se aplican?
2. ¿Existe correlación entre la frecuencia de aplicación de organofosforados (registrada en AgroMonitor) y la inhibición de acetilcolinesterasa en agricultores expuestos?
3. ¿Los residuos de plaguicidas detectados en alimentos cosechados superan los Límites Máximos de Residuos (LMR) del Codex Alimentarius?
4. ¿Las prácticas de uso racional de plaguicidas (MIP — Manejo Integrado de Plagas) mediadas por las alertas IoT del AgroMonitor reducen el número de aplicaciones y la exposición?

---

## 3. Objetivos

### Objetivo general

Caracterizar la exposición a plaguicidas en comunidades agrícolas del Atlántico, determinar su asociación con indicadores de salud en trabajadores rurales, cuantificar residuos en alimentos producidos localmente, y evaluar la efectividad de un sistema IoT de alertas agronómicas para reducir el uso injustificado de plaguicidas.

### Objetivos específicos

1. **Inventariar** los plaguicidas utilizados en cultivos de ciclo corto en Tubará y municipios vecinos mediante registro digital en AgroMonitor
2. **Determinar** la frecuencia y magnitud de inhibición de acetilcolinesterasa en agricultores expuestos a organofosforados y carbamatos
3. **Cuantificar** residuos de plaguicidas prioritarios en muestras de alimentos cosechados en lotes monitoreados
4. **Analizar** la correlación entre condiciones microclimáticas (temperatura, HR, VPD del suelo) y la frecuencia de aplicación de plaguicidas
5. **Evaluar** si el uso de alertas agronómicas IoT (AgroMonitor) se asocia a una reducción estadísticamente significativa en el número de aplicaciones de plaguicidas por ciclo de cultivo

---

## 4. Marco teórico — Evidencia científica de soporte

### 4.1 Mecanismos de toxicidad de los plaguicidas prioritarios

```
ORGANOFOSFORADOS (clorpirifós, malatión, metamidofós)
└── Mecanismo: inhibición de acetilcolinesterasa → acumulación de acetilcolina
    → síndrome colinérgico: miosis, bradycardia, broncospasmo, hipersecreción
    → exposición crónica: neurotoxicidad retardada, daño cognitivo
    → estudios 2024: asociación con leucemia, linfoma No-Hodgkin

CARBAMATOS (carbofuran)
└── Mecanismo: inhibición reversible de colinesterasa (menos persistente que OF)
    → síntomas similares a organofosforados pero más breves
    → carbofuran prohibido en EU, EEUU, aún registrado en Colombia
    → ICA categoría Ia: extremadamente peligroso

HERBICIDAS (glifosato, paraquat)
└── Glifosato: IARC Grupo 2A (probable carcinógeno), daño oxidativo
    → 12 estudios en Colombia: genotoxicidad, abortividad, daño cromosómico
└── Paraquat: causa principal de muertes suicidas por plaguicida en Colombia
    → fibrosis pulmonar irreversible, no tiene antídoto efectivo

FUNGICIDAS (mancozeb)
└── Metabolito ETU (etilentiourea): disruptor tiroideo, posible carcinógeno
    → uso masivo en tomate, papa, melón → residuos frecuentes en alimentos

ORGANOCLORADOS (endosulfán)
└── Disruptor endocrino, persistente en suelo y agua
    → prohibido en 144 países bajo el Convenio de Estocolmo
    → Colombia: presencia histórica en cultivos del Caribe
```

### 4.2 Exposición mixta — el problema que los marcos regulatorios ignoran

La evidencia emergente (ScienceDaily 2026, Perú, n=150.000) documenta que la exposición **simultánea a 12 plaguicidas** en comunidades rurales genera riesgos que no son predecibles sumando los riesgos individuales. Los mecanismos propuestos incluyen:
- **Sinergia toxicológica:** un compuesto inhibe la enzima que metaboliza otro
- **Contaminación de agua subterránea:** mezcla de residuos en pozos rurales
- **Bioconcentración en cadena alimentaria:** residuos en hortalizas + insectos + suelo

Este es el argumento científico más fuerte para instaurar monitoreo de campo: ningún sistema regulatorio puede predecir el riesgo sin datos de exposición real medidos en el terreno.

### 4.3 Limitaciones metodológicas previas y cómo superarlas

| Limitación de estudios anteriores | Solución de esta investigación |
|----------------------------------|-------------------------------|
| Datos de exposición autorreportados (sesgados) | Registro digital en AgroMonitor (objetivo, tiempo real) |
| Sin datos microclimáticos | Sensores de temp, HR, VPD ya desplegados |
| Sin grupo control documentado | 3 lotes con AgroMonitor vs. 3 sin él |
| Residuos en alimentos no cuantificados | Muestras para análisis cromatográfico (HPLC-MS) |
| Sin seguimiento longitudinal | Mínimo 2 ciclos de cultivo (6–8 meses) |

---

## 5. Variables del estudio

### 5.1 Variables independientes (exposición)

| Variable | Indicador | Método de medición | Fuente |
|----------|-----------|-------------------|--------|
| Tipo de plaguicida aplicado | Nombre comercial + principio activo | Registro digital en AgroMonitor | Agricultor (asistido) |
| Dosis aplicada | mL/L o g/L de producto comercial | Registro en app | Agricultor |
| Frecuencia de aplicación | Aplicaciones/ciclo | Registro en app | Agricultor |
| Forma de aplicación | Bomba de espalda / aspersora / aérea | Encuesta | Agricultor |
| EPP usado | Sí/No por componente (guantes, máscara, traje) | Observación / encuesta | Investigador |
| Condición microclimática en aplicación | Temperatura, HR, VPD, velocidad viento | Sensor AgroMonitor | Automático |
| Intervalo pre-cosecha respetado | Días entre última aplicación y cosecha | Registro cruzado | AgroMonitor + agricultor |

### 5.2 Variables de resultado — Salud humana

| Variable | Indicador | Método | Periodicidad |
|----------|-----------|--------|--------------|
| Inhibición de acetilcolinesterasa | % inhibición vs. basal | Test de campo (Test de Tintómetro o EQM) | Antes y después de cada ciclo |
| Síntomas neurológicos agudos | Puntaje en escala WHO | Encuesta validada | Mensual |
| Síntomas crónicos | Cefalea, temblor, visión, memoria | Escala SF-36 adaptada | Trimestral |
| Dermatitis de contacto | Presencia/extensión (cm²) | Examen médico fotodocumentado | Mensual |
| Función pulmonar (eventual) | FEV1/FVC por espirometría | Espirometría portátil | Inicio y fin del estudio |

### 5.3 Variables de resultado — Residuos en alimentos

| Alimento | Compuestos a cuantificar | Método analítico | LMR Codex |
|---------|--------------------------|-----------------|-----------|
| Melón | Clorpirifós, malatión, mancozeb | HPLC-MS/MS | Clorpirifós 0,05 mg/kg |
| Ají | Metamidofós, clorpirifós, endosulfán | HPLC-MS/MS | Metamidofós 0,01 mg/kg |
| Tomate | Mancozeb (ETU), glifosato | HPLC-MS/MS | Mancozeb 0,1 mg/kg |
| Maíz | Clorpirifós, carbofuran, glifosato | HPLC-MS/MS | Carbofuran 0,02 mg/kg |

### 5.4 Variables de resultado — Efectividad AgroMonitor en reducción de uso

| Variable | Indicador | Método |
|----------|-----------|--------|
| N° aplicaciones/ciclo | Conteo por registro digital | AgroMonitor |
| Días de intervención oportuna | Alertas VPD/riesgo fúngico antes de síntomas visibles | AgroMonitor |
| Reducción de aplicaciones preventivas innecesarias | Diferencia grupo control vs. monitoreado | Comparación directa |
| Correlación condición microclimática ↔ decisión de aplicar | VPD, temperatura, HR vs. registro de aplicación | Análisis de series de tiempo |

---

## 6. Hipótesis

**H1 — Exposición y acetilcolinesterasa:**  
Los agricultores que aplican organofosforados o carbamatos más de 2 veces por semana presentan inhibición de acetilcolinesterasa ≥20% respecto a su valor basal al final del ciclo de cultivo.

**H2 — Residuos y LMR:**  
Al menos el 30% de las muestras de alimentos cosechados en lotes sin monitoreo IoT presentan concentraciones de plaguicidas que superan los LMR del Codex Alimentarius para al menos un compuesto.

**H3 — IoT y reducción de uso:**  
Los agricultores en el grupo con AgroMonitor realizan ≥25% menos aplicaciones de plaguicidas por ciclo respecto al grupo control, sin diferencia estadísticamente significativa en el rendimiento final (ton/ha).

**H4 — Clima y decisión de aplicación:**  
El VPD > 1,8 kPa y la HR nocturna > 85% (ambos alertados por AgroMonitor) predicen el 70% de los eventos de aplicación de fungicidas en el grupo control, sugiriendo que las alertas automáticas pueden reemplazar la aplicación preventiva de calendario.

---

## 7. Metodología

### 7.1 Diseño del estudio

**Tipo:** Estudio de cohorte prospectivo de intervención con grupo control (diseño en paralelo)  
**Duración:** 24 meses (Fase 1: 12 meses campo + Fase 2: 6 meses análisis + Fase 3: 6 meses difusión)  
**Población:** Agricultores productores de cultivos de ciclo corto en Tubará y municipios vecinos del Atlántico

### 7.2 Criterios de inclusión / exclusión

**Inclusión:**
- Agricultor mayor de 18 años con al menos 1 ha en producción activa
- Al menos 1 ciclo de cultivo previo con el mismo cultivo de estudio
- Residencia en la zona de estudio ≥6 meses
- Consentimiento informado firmado

**Exclusión:**
- Enfermedad hepática o renal crónica preexistente (interfiere con metabolismo de plaguicidas)
- Uso de medicamentos anticolinesterásicos
- Productor que utilice exclusivamente agricultura orgánica certificada

### 7.3 Tamaño de muestra

Para detectar diferencia de 25% en número de aplicaciones (H3) con poder estadístico del 80% y α=0,05:
- n mínimo por grupo: **18 agricultores** (9 cultivos de melón, 9 de maíz)
- Total: 36 agricultores (18 grupo AgroMonitor + 18 control)
- Ajuste por pérdida en seguimiento (20%): **n = 44 agricultores total**

### 7.4 Recolección de datos en campo

```
PASO 1 — Línea base (Mes 0):
  • Encuesta sociodemográfica
  • Inventario de plaguicidas en bodega del agricultor
  • Muestra de sangre para acetilcolinesterasa basal
  • Instalación del nodo AgroMonitor (grupo de intervención)
  • Fotografía de equipos de protección personal disponibles

PASO 2 — Seguimiento durante el ciclo (Meses 1-3 por ciclo):
  • Registro en app: cada aplicación de plaguicida (qué, cuándo, cuánto, cómo)
  • Encuesta de síntomas mensual (WHO Pesticide Illness Classification)
  • Lectura automática de condiciones microclimáticas (AgroMonitor, cada 5 min)
  • Alerta de riesgo fúngico/VPD (solo grupo de intervención)

PASO 3 — Cosecha (Mes 3-4):
  • Muestra de alimento (250g de 3 puntos diferentes del lote) → cadena de frío
  • Acetilcolinesterasa final
  • Rendimiento (kg pesados en campo)
  • Precio de venta real

PASO 4 — Análisis de laboratorio:
  • Muestras enviadas a laboratorio certificado (ICA o Universidad Nacional)
  • Cromatografía HPLC-MS/MS para residuos en alimento
  • Panel de 15 plaguicidas prioritarios
```

### 7.5 Análisis estadístico

| Objetivo | Análisis | Software |
|----------|----------|---------|
| Descripción de exposición | Frecuencias, medianas, IQR | R / Python |
| H1 (inhibición AChE) | Prueba t pareada o Wilcoxon | R |
| H2 (residuos vs. LMR) | Proporción con IC95% | R |
| H3 (aplicaciones IoT vs. control) | Prueba Mann-Whitney + efecto tamaño (d de Cohen) | R |
| H4 (VPD → aplicación) | Regresión logística, curva ROC | Python / scikit-learn |
| Correlación multi-variable | Regresión lineal múltiple, control por confusores | R |

---

## 8. Factores de análisis y relaciones a explorar

Este es el mapa de relaciones causales que el estudio documentará:

```
CONDICIONES AMBIENTALES          PRÁCTICAS AGRONÓMICAS           SALUD / ALIMENTO
─────────────────────────────────────────────────────────────────────────────────

Temperatura > 35°C ──────────────→ ↑ Uso insecticidas            → Inhibición AChE
HR nocturna > 85% ───────────────→ ↑ Uso fungicidas (mancozeb)   → Residuos en tomate
VPD crítico (>1.8 kPa) ──────────→ Estrés fisiológico planta     → ↑ susceptibilidad
                                    → Aplicación preventiva        → Residuos innecesarios

Sin datos microclimáticos ───────→ Aplicación de calendario       → Sobreexposición
(grupo control)                     (cada 7-10 días fijo)

Con AgroMonitor ─────────────────→ Aplicación basada en alerta    → Menos aplicaciones
(grupo intervención)                (solo cuando riesgo real)      → Menor residuo

Carbofuran + Clorpirifós ────────→ Sinergismo inhibidor AChE      → Mayor toxicidad aguda
(mezcla de tanque frecuente)

Paraquat + agua de pozo ─────────→ Contaminación fuente de agua   → Toxicidad crónica
                                    → Exposición no laboral         → Mujeres y niños
```

---

## 9. Consideraciones éticas

- Aprobación de comité de ética en investigación (Universidad del Atlántico / SENA regional)
- Consentimiento informado por escrito, con versión simplificada en lenguaje claro
- Devolución de resultados individuales: cada agricultor recibe su reporte de acetilcolinesterasa y los residuos detectados en su cosecha
- Notificación obligatoria a autoridades sanitarias si se detectan exposiciones de alto riesgo (inhibición AChE > 50%)
- Los datos personales se anonimizarán en la base pública; solo coordenadas de lote a nivel de municipio
- En caso de residuos en alimento que superen el LMR, se notifica al ICA y se asesora al agricultor

---

## 10. Impacto esperado

### Científico
- Primera base de datos integrada campo-exposición-residuos-salud para el Atlántico colombiano
- Validación local de los umbrales VPD/HR del AgroMonitor como predictores de aplicación fitosanitaria
- Aporte al debate de mezclas de plaguicidas (más allá del riesgo individual)

### Productivo
- Protocolo de Manejo Integrado de Plagas (MIP) adaptado al bosque seco tropical de Atlántico
- Reducción estimada 25–40% en gasto de plaguicidas por ciclo (basado en literatura similar en India/Kenia)
- Mejora de la trazabilidad: el productor tendrá registro de aplicaciones exportable para certificación

### En salud pública
- Argumento técnico para fortalecer la vigilancia SIVIGILA de intoxicaciones rurales en Atlántico
- Base de evidencia para solicitar restricción regional de carbofuran y paraquat
- Datos para la política departamental "Misión Atlántico – Hambre Cero" sobre seguridad química en alimentos

### Tecnológico
- Extensión del firmware del ESP32 para registro de aplicaciones
- Módulo de alertas MIP en el dashboard existente
- Dataset público anonimizado para reproducibilidad científica

---

## 11. Presupuesto estimado — Fase 1

| Rubro | Costo estimado (COP) | Justificación |
|-------|---------------------|---------------|
| Nodos AgroMonitor (12 unidades) | $1.800.000 | 12 × $150.000 (incluye caja estanca) |
| Análisis HPLC-MS/MS (88 muestras × 15 compuestos) | $26.400.000 | $300.000/muestra en laboratorio certificado |
| Test de acetilcolinesterasa en campo (44 ag × 4 test) | $3.520.000 | Kit EQM o Tintómetro $20.000/test |
| Transporte y viáticos (campo) | $4.200.000 | 12 meses × 1 visita/semana |
| Personal: asistente de investigación | $18.000.000 | 12 meses × $1.500.000/mes |
| Insumos de laboratorio campo | $800.000 | Neveras, bolsas, etiquetas, guantes |
| Comunicación y difusión | $1.500.000 | Publicación open access, material |
| **Total Fase 1** | **~$56.220.000** | (~$14.000 USD) |

**Fuentes de financiación posibles:**
- Convocatoria MAPFRE Larramendi 2026 (deadline 22 oct 2026)
- MinSalud / INS — convocatorias de investigación en salud ambiental
- SENA — programa de investigación aplicada con estudiantes
- Gobernación del Atlántico — Misión Atlántico Hambre Cero
- Universidad del Atlántico — proyectos de extensión

---

## Referencias

1. INS/SIVIGILA. *Informe de Evento: Intoxicaciones por plaguicidas, Colombia 2023.* Bogotá: Instituto Nacional de Salud, 2024.
2. Idrovo AJ, et al. *Mortalidad debida a intoxicación por plaguicidas en Colombia entre 1998 y 2011.* Biomédica. 2015;35(Supl.2):90-102. http://www.scielo.org.co/scielo.php?pid=S0120-41572015000500010
3. Varona ME, et al. *Estudio epidemiológico de exposición a plaguicidas organofosforados y carbamatos en siete departamentos colombianos, 1998-2001.* Biomédica. 2005;25(2):170-180. http://www.scielo.org.co/scielo.php?pid=S0120-41572005000200003
4. Aguilar-Garduño C, et al. *Assessment of genomic instability using the CBMN cytome assay in mother-newborn pairs prenatally exposed to pesticides in Colombia.* PMC 2026. https://pmc.ncbi.nlm.nih.gov/articles/PMC13259614/
5. Murcia-Murcia NE, et al. *Profile of Chromosomal Alterations, Chromosomal Instability and Clonal Heterogeneity in Colombian Farmers Exposed to Pesticides.* PMC 2022. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8908452/
6. Ramos de Souza D, et al. *Agrochemical pesticide production, trade, and hazard: Narrowing the information gap in Colombia.* Environmental Research. 2021;201:111540. https://doi.org/10.1016/j.envres.2021.111540
7. Pesticide Action Network. *Comprehensive assessment of pesticide use patterns and increased cancer risk.* Frontiers in Cancer Control and Society. 2024. https://doi.org/10.3389/fcacs.2024.1368086
8. ScienceDaily. *Pesticide exposure linked to 150% higher cancer risk in major study.* April 2026. https://www.sciencedaily.com/releases/2026/04/260426012314.htm
9. WHO. *Pesticide residues in food.* Fact sheet. Geneva: World Health Organization, 2025. https://www.who.int/news-room/fact-sheets/detail/pesticide-residues-in-food
10. WHO/FAO. *Pesticide residues in food: report 2025.* Geneva: WHO, 2025. https://www.who.int/publications/i/item/9789240122963
11. Muñoz-Quijano T, et al. *Research Trends on Pesticide Exposure and Cancer Development: A Global Literature Review (2005–2024).* IJERPH. 2025;23(4):493. https://doi.org/10.3390/ijerph23040493
12. Jurewicz J, et al. *A systematic review of pesticide exposure, associated risks, and long-term human health impacts.* PubMed 2024. https://pubmed.ncbi.nlm.nih.gov/39717852/
13. INS. *Análisis descriptivo de intoxicaciones por paraquat en Colombia, 2007–2023.* Reporte Epidemiológico Nacional. 2024. https://epidemiologiains.org/index.php/ren/article/view/162
14. Allen RG, et al. *FAO Irrigation and Drainage Paper No. 56: Crop Evapotranspiration.* FAO, 1998. [Marco ET₀ de AgroMonitor]
15. ICA. *Listados de Plaguicidas Químicos de Uso Agrícola registrados en Colombia.* Bogotá: ICA, 2025. https://www.ica.gov.co/areas/agricola/servicios/regulacion-y-control-de-plaguicidas-quimicos/listados
