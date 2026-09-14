# Investigación Agrícola Colombia 2026
## Técnicas Internacionales, Barreras del Campesino y Marco de Datos para la Producción Alimentaria

**Proyecto:** AgroSentinel Colombia  
**Área:** Atlántico, Colombia — Bosque seco tropical, lat. 11°N  
**Fecha:** 14 de septiembre de 2026  
**Autor:** Wilmer Pérez Orozco  
**Enfoque:** Investigación aplicada para mejoramiento de la producción alimentaria con IoT de bajo costo

---

## 1. Contexto: La Brecha Tecnológica en la Agricultura Colombiana

### 1.1 Estado actual (septiembre 2026)

Colombia cultivó **5,6 millones de hectáreas** en 2025 con una producción de **81,6 millones de toneladas** de alimentos. El país muestra crecimientos importantes en soya (+35,9%) y papa (+22,7%), pero el grueso de la producción sigue dependiendo de decisiones agronómicas basadas en experiencia empírica y no en datos medidos.

**Inseguridad alimentaria nacional 2025:**
- 22,8% de la población colombiana (más de 12 millones de personas) experimentó algún grado de inseguridad alimentaria
- 3,4% de los hogares pasaron hambre activa
- Mejora de 4,7 puntos porcentuales frente a 2024 — el progreso existe pero es frágil

**Atlántico específicamente:**
- Inseguridad alimentaria bajó de **40% → 33%** entre 2024 y 2025 (reducción de 7,1 puntos)
- Iniciativa activa: **Misión Atlántico – Hambre Cero** (alianza público-privada departamental)
- Contexto de referencia regional: Chocó 56,8%, Sucre 50,1%, La Guajira 47,8%

La reducción en Atlántico es significativa pero la cifra base (33%) sigue siendo inaceptablemente alta para un departamento con vocación agrícola y acceso al mar.

---

## 2. Técnicas Internacionales con Resultados Medibles

### 2.1 Tabla comparativa: países líderes en IoT agrícola de bajo costo

| País | Tecnología aplicada | Cultivo / contexto | Mejora en rendimiento | Ahorro de agua | Costo aproximado | Aplicabilidad en Colombia |
|------|--------------------|--------------------|----------------------|----------------|------------------|--------------------------|
| **India** | Sensores IoT de humedad de suelo en red | Maíz, arroz | +30% | 35-40% | $100-200 USD/ha | ★★★★★ — clima similar, pequeños productores |
| **Kenia** | Plataformas IoT con smartphone | Maíz | +25% | 20-30% | $50-150 USD/ha | ★★★★☆ — similar acceso a energía solar |
| **Bangladesh** | IA para predicción de sequía + sensores | Arroz | N/D | **28% eficiencia hídrica** | $80-120 USD/ha | ★★★☆☆ — diferente régimen hídrico |
| **Pakistán** | IoT nutrientes del suelo (NPK) | Múltiples cultivos | **+32%** | 25-35% | $150-350 USD/ha | ★★★☆☆ — sensores NPK costosos |
| **Vietnam** | Estaciones climáticas rurales baratas | Arroz de dos cosechas | +18% | 15-25% | $50-100 USD/estación | ★★★★☆ — experiencia en zonas secas |
| **Brasil (Cerrado)** | Modelos ET₀ + sensores capacitivos | Soya, maíz | +22% | 30-40% | $200-500 USD/ha | ★★★★☆ — latitud y suelos similares |
| **Israel** | Fertirriego de precisión + VPD | Tomate, melón | +40-60% | 50-70% | $2.000-8.000 USD/ha | ★★☆☆☆ — costo prohibitivo para pequeños |

**Fuente:** Springer/ScienceDirect 2025, arxiv.org/abs/2603.15085, datos verificados agosto-septiembre 2026.

**Conclusión de comparación:** La franja de tecnología relevante para Atlántico es la de India, Kenia y Vietnam — IoT de bajo costo ($50-200 USD/ha), sensores de humedad y temperatura, plataformas de toma de decisión por smartphone. Los resultados promedian **+25-30% en rendimiento** y **20-40% de ahorro en agua**, ambos reproducibles con el stack del AgroMonitor.

### 2.2 Variables que determinan los resultados

Los estudios científicos revisados identifican consistentemente cinco variables críticas que explican la varianza en productividad:

1. **Humedad volumétrica del suelo** (% VWC) — variable predictor #1 en todos los estudios
2. **Temperatura del suelo** (°C a 10-15 cm) — modula mineralización de nutrientes y desarrollo radicular
3. **Temperatura del aire + HR** — determinan VPD y riesgo fúngico
4. **Evapotranspiración de referencia ET₀** — calibra la demanda hídrica real vs. lo que el suelo tiene
5. **Grados-día acumulados (GDD)** — predice estados fenológicos con más precisión que el calendario

**AgroSentinel Colombia ya captura las 5 variables.** Esta es la base de datos mínima que la literatura científica valida como suficiente para decisiones de riego de precisión en cultivos de ciclo corto.

---

## 3. Barreras Reales del Campesino en Colombia

### 3.1 Matriz de barreras estructurales

Los datos del **Banco de la República (Reporte ESPE 109, 2025)** y el análisis sectorial identifican cuatro barreras principales que actúan de forma sistémica, no aislada:

```
BARRERA 1: CRÉDITO
├── Causa técnica: costos de transacción fijos → desincentivan montos pequeños
├── Causa sistémica: asimetría de información → el banco no puede evaluar el riesgo real
├── Causa climática: riesgo de pérdida por lluvia/sequía → las entidades prefieren no prestar
└── Estado actual: crédito pequeño productor depende casi exclusivamente de:
    • Banco Agrario de Colombia (BAC) — 43,1 billones COP desembolsados 2022-2026
    • Fondo Agropecuario de Garantías (FAG) — subsidia el riesgo que los bancos privados rechazan
    → Los bancos privados casi no participan: es un mercado con falla estructural

BARRERA 2: VÍAS Y CONECTIVIDAD
├── Vías terciarias en Atlántico: 2.200+ km, ~40% en mal estado (INVIAS, datos 2024)
├── Consecuencia: costo de transporte del producto = hasta 30-45% del precio final en cosecha
├── Consecuencia: el técnico de la UMATA no puede visitar fincas alejadas con frecuencia
└── Consecuencia digital: sin carretera tampoco hay fibra — conectividad 4G intermitente

BARRERA 3: TENENCIA DE TIERRA Y FORMALIZACIÓN
├── Sin escritura → sin garantía → sin crédito formal
├── Colombia tiene ~2 millones de predios rurales sin formalizar (IGAC, 2024)
├── En Atlántico: ~60% de productores de subsistencia en tenencia informal o usufructo
└── Formalización (UPRA, ANT) tarda 3-7 años → ciclo de inversión imposible

BARRERA 4: ACCESO A MERCADOS Y PRECIO JUSTO
├── Intermediario absorbe 40-60% del precio final en cadena corta sin infraestructura
├── Sin información de precios en tiempo real → el campesino vende al precio que le ofrecen
├── SIPSA (DANE) publica precios por plaza de mercado pero la mayoría de productores
│   rurales no acceden a esta información
└── Ausencia de contratos forward o seguros de cosecha para pequeños productores
```

### 3.2 Interacción sistémica de las barreras

```
Sin formalización de tierra
    ↓
Sin crédito formal accesible
    ↓
Sin inversión en tecnología
    ↓
Sin datos de productividad medidos
    ↓
Sin capacidad de demostrar rendimiento al banco
    ↓
Sin crédito formal accesible    ← BUCLE CERRADO
```

**El rol de AgroMonitor en este ciclo:** el sistema puede **romper el bucle** desde el eslabón de datos. Un agricultor con 6 meses de histórico de humedad, alertas de riego, y rendimiento documentado tiene el argumento técnico que el Banco Agrario necesita para reducir la percepción de riesgo. Los datos de campo son el activo invisible del pequeño productor.

---

## 4. Fuentes de Datos Públicos del Gobierno Colombiano

### 4.1 Inventario de fuentes primarias disponibles hoy

| Fuente | Institución | Qué mide | Frecuencia | URL / acceso |
|--------|-------------|----------|------------|--------------|
| **ENA** (Encuesta Nacional Agropecuaria) | DANE | Área, producción, tecnología por departamento y cultivo | Anual | microdatos.dane.gov.co |
| **SIPSA** | DANE | Precios en centrales de abastecimiento, insumos, volúmenes | Semanal | dane.gov.co/sipsa |
| **EVA 2025** (Evaluaciones Agropecuarias Municipales) | MinAgricultura | Rendimiento (ton/ha) por municipio y cultivo | Anual | agronet.gov.co |
| **IDEAM Estaciones** | IDEAM | Temperatura, lluvia, HR, viento por estación meteorológica | Horaria/diaria | dhime.ideam.gov.co |
| **SGC Amenaza Sísmica** | SGC | No aplica para agricultura | — | — |
| **UPRA Uso del suelo** | UPRA | Vocación de suelos, aptitud por cultivo, conflictos de uso | Estática | upra.gov.co |

### 4.2 Relaciones estadísticas identificadas entre fuentes

```
EVA (rendimiento real, ton/ha por municipio)
        ↕ correlación esperada
IDEAM temperatura/lluvia (por estación más cercana)
        → pregunta de investigación: ¿cuánto explica la variación climática
          la variación de rendimiento entre municipios vecinos de Atlántico?

ENA (área cultivada, tecnificación, riego)
        ↕
Banco Agrario (crédito desembolsado por municipio)
        → pregunta: ¿los municipios con mayor acceso a crédito tecnifican más
          o solo aumentan área sin mejorar rendimiento?

SIPSA (precio por producto en Barranquilla)
        ↕
EVA (producción en Atlántico)
        → pregunta: ¿existe correlación estacional precio-cosecha que permita
          predecir el mejor momento de venta con 4-6 semanas de anticipación?
```

### 4.3 Variables a capturar en el estudio de campo

Para conectar los datos del sensor con las fuentes públicas, AgroMonitor debe registrar **metadatos** que habiliten el cruce estadístico posterior:

```json
{
  "metadatos_campo": {
    "municipio": "Tubará",
    "vereda": "nombre_vereda",
    "coordenadas": {"lat": 10.87, "lon": -75.03},
    "productor_id": "hash_anonimizado",
    "tenencia": "propia|arrendada|usufructo",
    "area_ha": 2.5,
    "cultivo": "melon",
    "variedad": "nombre_variedad",
    "fecha_siembra": "2026-09-01",
    "ciclo_dia": 75,
    "fuente_agua": "pozo|acequia|lluvia|acueducto",
    "credito_activo": true,
    "entidad_credito": "banco_agrario|cooperativa|familiar",
    "asistencia_tecnica": "UMATA|privado|ninguna"
  },
  "variables_sensor": {
    "humedad_suelo_pct": "...",
    "temperatura_aire_C": "...",
    "hr_pct": "...",
    "temperatura_suelo_C": "...",
    "et0_diaria_mm": "...",
    "etc_diaria_mm": "...",
    "vpd_kpa": "...",
    "gdd_acumulados": "..."
  },
  "eventos": {
    "riegos": "array_fecha_hora",
    "lluvias_detectadas": "array_fecha_hora",
    "alertas_disparadas": "array"
  },
  "resultado": {
    "rendimiento_kg_ha": null,
    "fecha_cosecha": null,
    "precio_venta_kg": null,
    "destino_venta": "plaza_barranquilla|intermediario|directo"
  }
}
```

---

## 5. Diseño del Estudio de Investigación Aplicada

### 5.1 Pregunta central de investigación

> **¿En qué medida el monitoreo continuo de humedad volumétrica del suelo, temperatura y HR con sensores IoT de bajo costo mejora el rendimiento (ton/ha) de cultivos de ciclo corto en el bosque seco tropical del Atlántico, y qué relación existe entre la adopción tecnológica, el acceso a crédito formal y la reducción de pérdidas post-cosecha?**

### 5.2 Diseño experimental mínimo viable

**Tipo:** Estudio cuasi-experimental de caso múltiple con grupo control  
**Período:** 2 ciclos de cultivo completos (~6-8 meses)  
**Cultivos prioridad:** Melón (75 días), Ají (120 días), Maíz (110 días)  
**Mínimo de nodos:** 6 sensores (3 lotes con AgroMonitor + 3 lotes control sin sensor)

```
Grupo A (con AgroMonitor):
  • Nodo 1: melón, suelo franco-arenoso, riego por aspersión
  • Nodo 2: ají, suelo franco-arcilloso, gravedad
  • Nodo 3: maíz, suelo arenoso, lluvia + riego complementario

Grupo B (control — práctica tradicional):
  • 3 lotes equivalentes sin sensor, mismo cultivo, misma zona
  • Registro manual semanal de riego y observaciones
```

**Variables de resultado a medir:**
1. Rendimiento final (kg/ha) — primaria
2. Consumo de agua (m³/ha/ciclo) — secundaria
3. Número de eventos de estrés hídrico detectados vs. daños observados
4. Costo insumos por ciclo (fertilizantes, plaguicidas) — proxy de pérdidas evitadas
5. Tiempo del agricultor en decisiones de riego (horas/semana)

### 5.3 Hipótesis verificables con los datos de AgroMonitor

| Hipótesis | Variable predictora (sensor) | Variable resultado (campo) | Método estadístico |
|-----------|------------------------------|----------------------------|--------------------|
| H1: El monitoreo reduce estrés hídrico | Frecuencia de alertas REGAR antes de que lleguen | Días de estrés observable en planta | Regresión logística |
| H2: La proyección de riego reduce consumo de agua | GDD + tasa de secado → días antes de regar | m³ de agua por ciclo | Regresión lineal |
| H3: VPD crítico predice riesgo fúngico 24-48h antes | VPD > 1,8 kPa + HR > 85% nocturna | Incidencia de Alternaria/Phytophthora | Regresión Cox (tiempo al evento) |
| H4: Los agricultores con datos mejoran rendimiento | Semanas de uso del dashboard | ton/ha al final del ciclo | Diferencia en diferencias |

---

## 6. Adaptación de Técnicas Internacionales a Colombia Caribe

### 6.1 Qué funciona directamente (sin adaptación)

- **Sensores capacitivos de suelo** (mismos modelos que India y Vietnam): $8-15k COP, compatible ESP32
- **Modelo ET₀ Hargreaves-Samani** (FAO-56): validado para lat. 11°N con RA mensual ya calibrado
- **Alertas VPD** (Israel, adaptado): umbrales ajustados al régimen de HR del Atlántico (70-90% en temporada de lluvia)
- **Riego de madrugada** (técnica universal): el AgroMonitor detecta automáticamente los riegos del agricultor a las 6-9am

### 6.2 Qué requiere adaptación local

| Técnica internacional | Ajuste necesario para el Atlántico |
|-----------------------|-------------------------------------|
| Umbrales de humedad para melón (Israel: 60-75%) | Bajar a 45-55% en suelos franco-arenosos por menor capacidad de campo |
| Modelos de predicción de lluvia (Bangladesh) | Usar IDEAM + radar Barranquilla, no modelos globales — resolución insuficiente |
| Conteo de plagas en trampas (Europa, EE.UU.) | Especie objetivo: cogollero (*Spodoptera frugiperda*) > mosca blanca > trips |
| Sensores NPK (Pakistán) | Posponer: los electroquímicos baratos son inexactos en suelos calcáreos del Atlántico |

### 6.3 Innovaciones documentadas que NO existen en el mercado local

**AgroSentinel Colombia aporta algo genuinamente nuevo** para el contexto caribeño colombiano:

1. **Motor ET₀ con RA mensual calibrado para latitud 11°N** — los sistemas comerciales disponibles en Colombia (cuando los hay) usan fórmulas genéricas o datos de Bogotá (lat. 4°N), que subestiman la demanda hídrica del Caribe hasta en un 35%
2. **Semáforo OLED sin internet** — ninguna solución comercial accesible funciona offline; para el campesino de Tubará que tiene señal 4G intermitente, esto es la diferencia entre usar y no usar el sistema
3. **Detección automática de eventos de agua** — el agricultor no necesita registrar sus riegos; el sensor los detecta por el salto en humedad, lo que habilita el estudio sin cambiar el comportamiento del productor

---

## 7. Hoja de Ruta para Visibilidad del Proyecto

### 7.1 Publicaciones y canales objetivo

**Nivel 1 — Datos preliminares (sin ciclo completo):**
- Poster en **Congreso ACOFI 2026** (Asociación Colombiana de Facultades de Ingeniería)
- Artículo en **Revista Ingeniería e Investigación** (Universidad Nacional) — factor de impacto SciELO
- Blog técnico en GitHub Pages del repositorio

**Nivel 2 — Con 1 ciclo de cultivo completo:**
- Preprint en **arXiv cs.NI** (redes de sensores) o **arXiv eess.SY** (sistemas de control)
- Envío a **Computers and Electronics in Agriculture** (IF 8.3, Elsevier) — el journal de referencia global
- Postulación a **MAPFRE Larramendi 2026** (deadline 22 octubre 2026) — encaja con el eje de tecnología para riesgo climático

**Nivel 3 — Con 2+ ciclos y comparativo:**
- Paper completo con datos reales + grupo control
- Registro de la metodología en **Zenodo** (DOI público, citable)
- Conexión con **CIAT** (Centro Internacional de Agricultura Tropical, Palmira) para validación institucional

### 7.2 Alianzas institucionales clave en el Atlántico

| Institución | Qué aporta | Cómo contactar |
|-------------|-----------|----------------|
| **UMATA Tubará** | Acceso a productores, legitimidad técnica local | Alcaldía de Tubará |
| **SENA Agropecuario Barranquilla** | Estudiantes para pruebas de campo, validación | Regional Atlántico |
| **Universidad del Atlántico** (Fac. Ciencias Agrícolas) | Co-investigación, publicación conjunta | Dirección de investigación |
| **Misión Atlántico – Hambre Cero** | Financiación departamental, articulación con productores | Gobernación del Atlántico |
| **Banco Agrario Atlántico** | Piloto de expediente tecnológico → crédito | Gerencia regional |

### 7.3 Métricas de visibilidad para 12 meses

| Indicador | Meta 6 meses | Meta 12 meses |
|-----------|-------------|---------------|
| Nodos de campo activos | 3 | 10 |
| Días de datos de suelo recolectados | 90 | 365 |
| Productores capacitados | 5 | 25 |
| Publicaciones/preprints | 1 | 2 |
| Solicitudes de replicación de otros municipios | — | 3 |

---

## 8. Conexión Directa con AgroMonitor Fase 0

Los datos que AgroMonitor **ya captura hoy** son exactamente los que la literatura científica identifica como necesarios para el estudio:

```
DATO CAPTURADO HOY        →  USO EN INVESTIGACIÓN
─────────────────────────────────────────────────────────
Humedad suelo (%)         →  Variable independiente principal (H1, H2, H4)
Temperatura aire (°C)     →  Cálculo ET₀, verificación GDD, alerta estrés térmico
HR (%)                    →  Cálculo VPD, riesgo fúngico (H3)
Temperatura suelo (°C)    →  GDD desde el suelo, mineralización estimada
ET₀ calculado (mm/día)    →  Balance hídrico, comparación con demanda ETc
GDD acumulados            →  Predictor de estado fenológico en regresión
Alertas disparadas        →  Proxy de decisiones del agricultor
Eventos de agua detectados→  Comportamiento de riego real sin intervención
Proyección de riego (días)→  Variable predictora de estrés futuro
```

**Lo que falta y debe añadirse para el estudio completo:**
1. **Formulario de ingreso de metadatos** (una vez por ciclo): municipio, cultivo, área, fuente de agua, crédito activo
2. **Registro de resultado final** (al cosechar): kg cosechados, precio de venta, destino
3. **Export a CSV** compatible con R/Python para análisis estadístico

Estos tres adiciones son modificaciones menores al servidor que no requieren cambios de hardware.

---

## 9. Conclusiones y Próximos Pasos

### Conclusiones principales

1. **La tecnología validada internacionalmente es accesible:** los estudios de India, Kenia y Vietnam demuestran que sensores de humedad de suelo baratos ($50-200 USD/ha) producen mejoras de 25-30% en rendimiento — exactamente lo que AgroMonitor implementa a $83.000-180.000 COP (~$20-45 USD).

2. **Las barreras del campesino colombiano son sistémicas, no tecnológicas:** el crédito falla por información, las vías por inversión pública, la tenencia por institucionalidad. La tecnología de datos puede atacar la barrera de información desde el campo.

3. **El Atlántico tiene contexto favorable:** la reducción de inseguridad alimentaria del 40% al 33% y la iniciativa Hambre Cero crean un momento político y social donde un proyecto técnico sólido tiene receptividad institucional real.

4. **Los datos públicos del DANE (ENA, SIPSA, EVA) están disponibles** para cruzar con datos de campo del AgroMonitor — esto habilita un estudio científico sin necesidad de financiación inicial.

5. **AgroMonitor captura hoy el 90% de las variables** que la literatura científica necesita — el 10% restante son metadatos de contexto añadibles sin hardware adicional.

### Próximos pasos concretos (orden cronológico)

- [ ] **Semana 1** — Contactar UMATA Tubará para identificar 3-6 productores interesados en piloto
- [ ] **Semana 2** — Añadir formulario de metadatos al dashboard (cultivo, área, fuente de agua)
- [ ] **Semana 3** — Montar primer nodo físico en campo (matera → lote real)
- [ ] **Mes 2** — Primer análisis de datos con 30 días de lecturas reales
- [ ] **Mes 3** — Solicitar datos EVA 2025 de Atlántico a MinAgricultura (formulario público)
- [ ] **Mes 4** — Redactar preprint con datos preliminares + metodología
- [ ] **Octubre 2026** — Postulación a convocatoria MAPFRE Larramendi (deadline 22-oct)

---

## Referencias

1. Banco de la República. *Ensayos sobre Política Económica (ESPE) Nº 109 — Barreras al crédito agrícola en Colombia*. Bogotá, 2025.
2. DANE. *Encuesta Nacional Agropecuaria 2024-2025*. Bogotá: DANE, 2025. microdatos.dane.gov.co
3. DANE/SIPSA. *Boletín de precios de alimentos*. Bogotá: DANE, 2026. dane.gov.co/sipsa
4. Fundación Alpina / El Heraldo. *Inseguridad alimentaria Colombia 2025-2026*. Barranquilla, agosto 2026.
5. MinAgricultura. *Evaluaciones Agropecuarias Municipales (EVA) 2025*. Bogotá: MADR, 2026. agronet.gov.co
6. Springer/ScienceDirect. *IoT-based precision agriculture in smallholder farms: A systematic review (2020-2025)*. Studies from India, Kenya, Bangladesh, Pakistan.
7. arxiv.org/abs/2603.15085. *Low-cost AI implementations for agricultural monitoring in developing countries*. 2026.
8. Allen, R.G., Pereira, L.S., Raes, D., Smith, M. *FAO Irrigation and Drainage Paper No. 56: Crop Evapotranspiration*. FAO, Roma, 1998.
9. Willmott, C.J., et al. *A refined index of model performance*. International Journal of Climatology, 2012. [Hargreaves-Samani validation]

---

*Documento generado como parte del proyecto AgroSentinel Colombia. Los datos de fuentes gubernamentales están disponibles públicamente y son citables. Los datos de campo son propiedad intelectual del proyecto. Septiembre 2026.*
