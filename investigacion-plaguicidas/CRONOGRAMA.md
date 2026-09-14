# Cronograma de Ejecución
## Proyecto: Exposición a Plaguicidas, Residuos en Alimentos y Salud Humana en el Atlántico

**Duración total:** 30 meses  
**Inicio proyectado:** Diciembre 2026  
**Fin proyectado:** Mayo 2029  

---

## Vista general por fases

```
2026  |  2027                          |  2028                          |  2029
──────┼────────────────────────────────┼────────────────────────────────┼─────────
Nov   │ Dic Ene Feb Mar Abr May Jun Jul│ Ago Sep Oct Nov Dic Ene Feb Mar│ Abr May
──────┼────────────────────────────────┼────────────────────────────────┼─────────
[F0]  │[────────────── FASE 1 ────────]│[──────── FASE 2 ────────]      │[─ F3 ─]
Prep  │         Campo (24 agricultores)│   Análisis + 2do ciclo         │ Difusión
```

---

## Fase 0 — Preparación y aprobación ética (Nov–Dic 2026)

| # | Actividad | Responsable | Duración | Entregable |
|---|-----------|-------------|----------|------------|
| 0.1 | Contactar UMATA Tubará para identificar agricultores | Investigador principal | 2 sem | Lista de candidatos |
| 0.2 | Presentar protocolo a comité de ética (Uni Atlántico o SENA) | Investigador | 2 sem | Radicación protocolo |
| 0.3 | Construir y calibrar 12 nodos AgroMonitor de campo | Técnico + investigador | 3 sem | 12 nodos funcionando |
| 0.4 | Desarrollar módulo de registro de aplicaciones en app | Desarrollador | 2 sem | Pull request en GitHub |
| 0.5 | Diseñar encuesta basal y formularios de seguimiento | Investigador + epidemiólogo | 1 sem | Formularios digitales |
| 0.6 | Capacitación a asistente de investigación | Investigador | 3 días | Protocolo de campo |
| 0.7 | Acuerdo con laboratorio certificado para HPLC-MS | Investigador | 2 sem | Carta de intención |
| 0.8 | Postulación MAPFRE Larramendi 2026 | Investigador | — | Aplicación enviada |

**Hito Fase 0:** Aprobación ética + primer nodo en campo antes del 15 enero 2027

---

## Fase 1 — Trabajo de campo, Ciclo 1 (Ene–Jun 2027)

### Mes 1 — Línea base y siembra (Enero 2027)

| Actividad | Duración | Entregable |
|-----------|----------|------------|
| Reclutamiento y consentimiento (44 agricultores) | 2 sem | Base de datos basal firmada |
| Inventario de plaguicidas en bodega de cada agricultor | 1 sem | Tabla de inventario (tipo, volumen, antigüedad) |
| Muestra de sangre basal — acetilcolinesterasa | 1 sem | Resultados AChE basal |
| Instalación de nodos en 22 lotes (grupo intervención) | 1 sem | 22 nodos activos reportando |
| Fotografía documental EPP disponible | 1 sem | Portafolio fotográfico |
| Primer envío de datos al servidor AgroMonitor | Continuo | Dashboard activo |

### Meses 2–3 — Seguimiento durante ciclo (Feb–Mar 2027)

| Actividad | Periodicidad | Método |
|-----------|-------------|--------|
| Registro de aplicaciones de plaguicidas | Cada aplicación (en app) | Digital en AgroMonitor |
| Encuesta síntomas WHO Pesticide Illness | Mensual | Formulario digital |
| Revisión dermatológica fotodocumentada | Mensual | Fotodocumentación |
| Lectura automática microclima | Cada 5 min | AgroMonitor |
| Alerta IoT riesgo fúngico/VPD (solo grupo IoT) | Tiempo real | Push notification |
| Visita de campo del asistente | Semanal | Verificación in situ |

### Meses 4 — Cosecha Ciclo 1 (Abr 2027)

| Actividad | Entregable |
|-----------|------------|
| Toma de muestras de alimento (250g × 3 puntos × 22 lotes monitoreados + 22 control) | 44 muestras cadena frío |
| Acetilcolinesterasa final post-ciclo | Resultados AChE final |
| Peso de cosecha y precio real de venta | Base de datos de rendimiento |
| Encuesta de satisfacción y usabilidad del sistema | Retroalimentación del agricultor |

### Meses 5–6 — Análisis parcial + ajuste (May–Jun 2027)

| Actividad | Entregable |
|-----------|------------|
| Análisis HPLC-MS/MS muestras Ciclo 1 (laboratorio externo) | Reporte de residuos Ciclo 1 |
| Análisis estadístico preliminar (H1, H2, H3) | Resultados parciales |
| Informe de progreso a financiadores | Informe semestral |
| Ajuste de protocolo si es necesario | Enmienda protocolo v1.1 |
| Capacitación en MIP a agricultores de ambos grupos | Taller MIP (material entregado) |

**Hito Fase 1:** Datos Ciclo 1 completos + muestras en análisis antes del 30 jun 2027

---

## Fase 2 — Ciclo 2 y análisis final (Jul 2027–Jun 2028)

### Meses 7–12 — Campo Ciclo 2 (Jul–Dic 2027)

Replicación del Ciclo 1 con ajustes metodológicos:
- Incorporar encuesta de escala SF-36 (calidad de vida)
- Añadir medición de residuos en agua de pozo en lotes seleccionados
- Espirometría portátil (si se consigue equipo en préstamo)
- Ampliar panel de plaguicidas en laboratorio si Ciclo 1 detecta positivos inesperados

| Hito | Fecha |
|------|-------|
| Siembra Ciclo 2 | 1 jul 2027 |
| Cosecha Ciclo 2 | 30 sep 2027 |
| Muestras en laboratorio | 15 oct 2027 |
| Resultados laboratorio Ciclo 2 | 15 dic 2027 |

### Meses 13–18 — Análisis estadístico final (Ene–Jun 2028)

| Actividad | Duración | Entregable |
|-----------|----------|------------|
| Base de datos integrada y limpieza | 1 mes | Base de datos verificada |
| Análisis estadístico completo (H1–H4) | 2 meses | Tablas y figuras publicables |
| Análisis de series de tiempo microclima ↔ aplicaciones | 1 mes | Modelo predictivo IoT |
| Redacción del artículo científico | 2 meses | Manuscrito borrador |
| Revisión por pares internos | 1 mes | Manuscrito revisado |

---

## Fase 3 — Difusión y transferencia (Jul 2028–May 2029)

| Actividad | Fecha objetivo | Audiencia |
|-----------|---------------|-----------|
| Preprint arXiv (eess.SY o q-bio.QM) | Ago 2028 | Comunidad científica |
| Envío a *Computers & Electronics in Agriculture* | Sep 2028 | Ingeniería agrícola |
| Presentación ACOFI 2028 / INS simposio | Oct 2028 | Ingeniería / Salud pública |
| Envío a *Environmental Research* o *Chemosphere* | Nov 2028 | Toxicología ambiental |
| Dataset abierto en Zenodo (DOI) | Dic 2028 | Reproducibilidad |
| Talleres de retroalimentación con agricultores | Ene 2029 | Comunidad rural Atlántico |
| Reunión con ICA para socialización de hallazgos | Feb 2029 | Reguladores |
| Reunión con MinSalud / INS | Mar 2029 | Política pública |
| Informe técnico para Gobernación Atlántico | Abr 2029 | Política departamental |
| Protocolo MIP actualizado y publicado | May 2029 | Agricultores + UMATA |

---

## Retos y limitaciones

### Retos operativos

| Reto | Nivel | Estrategia de mitigación |
|------|-------|--------------------------|
| Reclutamiento de 44 agricultores dispuestos a registrar aplicaciones | Alto | UMATA como intermediario de confianza; incentivo: reporte de salud gratuito |
| Pérdida de seguimiento (abandono del cultivo, migración) | Medio | Sobreclutamiento inicial (n=50); protocolo de reemplazo |
| Costo del análisis HPLC-MS ($26M COP) | Alto | Alianza con universidad pública; gestión de financiación externa |
| Almacenamiento correcto de muestras (cadena de frío) | Medio | Protocolo estricto; neveras con termómetro de registro |
| Conectividad 4G para AgroMonitor en zonas rurales | Medio | Modo offline + sincronización al regresar a zona con señal |
| Resistencia del agricultor a registrar aplicaciones (perciben control) | Alto | Énfasis en beneficio: su propio reporte de salud; datos no compartidos sin consentimiento |
| Variabilidad climática (El Niño 2027 posible) | Medio | Registrar ENSO como covariable; análisis de sensibilidad |

### Limitaciones metodológicas

| Limitación | Impacto | Nota en el paper |
|------------|---------|-----------------|
| No es un ensayo clínico aleatorizado (ECA) | No se puede afirmar causalidad perfecta | Diseño observacional con controles históricos y grupo paralelo |
| Inhibición de AChE en sangre periférica ≠ AChE cerebral | Proxy, no medida directa de daño neurológico | Limitación estándar de la literatura |
| Análisis de residuos en el momento de cosecha, no en punto de venta | El consumidor puede recibir alimento con residuos diferentes | Planificar extensión en mercados de Barranquilla |
| Panel de 15 plaguicidas puede omitir compuestos no analizados | Subestimación de carga real | Ampliar panel si presupuesto lo permite |
| El registro de aplicaciones depende de la honestidad del agricultor | Sesgo de informe | Validar con inventario de botellas vacías + facturas |
| Sin medición de exposición por agua o inhalación (solo dérmica/ocupacional) | Subestima exposición total | Nota metodológica; añadir en Fase 2 si hay recursos |

### Limitaciones contextuales

| Factor | Descripción |
|--------|-------------|
| Regulación cambiante | Debate activo sobre glifosato/paraquat en Colombia puede alterar disponibilidad de plaguicidas durante el estudio |
| Inflación de insumos | Costo de plaguicidas puede cambiar, afectando comportamiento del agricultor (compran más barato = más tóxico) |
| Acceso a laboratorio HPLC | Único laboratorio certificado en Barranquilla; puede haber retrasos |
| Negativa del ICA a colaborar | Posible resistencia institucional a publicar datos negativos sobre productos que regulan |

---

## Indicadores de éxito del proyecto

| Indicador | Meta mínima | Meta ideal |
|-----------|------------|------------|
| Agricultores con ≥2 ciclos completos de registro | 30 | 40 |
| Muestras de alimento analizadas con HPLC | 60 | 88 |
| Artículos publicados (peer-reviewed) | 1 | 3 |
| Reducción de aplicaciones en grupo IoT | 20% | 35% |
| Agricultores capacitados en MIP | 40 | 60 |
| Dataset público en Zenodo | 1 | 1 |
| Entidades gubernamentales con informe entregado | 2 | 4 |

---

*Cronograma sujeto a revisión tras aprobación ética y confirmación de financiación. Versión 1.0 — septiembre 2026.*
