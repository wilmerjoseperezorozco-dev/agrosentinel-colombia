// AgroSentinel Colombia — Motor agronómico
// Cálculos basados en FAO-56 (Allen et al.) adaptados a lat 10.9°N (Tubará, Atlántico)
'use strict';

// ---------------------------------------------------------------------------
// Tabla de cultivos — el activo agronómico del negocio.
// rojo/amarillo/exceso: % humedad volumétrica calibrada del suelo
// kc: coeficiente de cultivo etapa media (FAO-56 tabla 12)
// tBase: temperatura base para grados-día (°C)
// ---------------------------------------------------------------------------
const CULTIVOS = {
  melon:  { nombre: 'Melón',  rojo: 45, amarillo: 55, exceso: 88, kc: 1.05, tBase: 12, cicloDias: 75 },
  aji:    { nombre: 'Ají',    rojo: 40, amarillo: 50, exceso: 90, kc: 1.05, tBase: 10, cicloDias: 120 },
  tomate: { nombre: 'Tomate', rojo: 45, amarillo: 55, exceso: 88, kc: 1.15, tBase: 10, cicloDias: 110 },
  maiz:   { nombre: 'Maíz',   rojo: 35, amarillo: 45, exceso: 92, kc: 1.20, tBase: 10, cicloDias: 110 },
  yuca:   { nombre: 'Yuca',   rojo: 25, amarillo: 35, exceso: 95, kc: 0.80, tBase: 13, cicloDias: 300 },
};

// Radiación extraterrestre Ra (MJ/m²/día) para latitud ~11°N, por mes (FAO-56 anexo 2)
const RA_MENSUAL = [33.0, 34.8, 36.4, 36.9, 36.2, 35.6, 35.7, 36.3, 36.2, 34.9, 33.2, 32.3];

const MS_HORA = 3600 * 1000;
const MS_DIA = 24 * MS_HORA;

// ---------------------------------------------------------------------------
// Micro-clima instantáneo
// ---------------------------------------------------------------------------

/** Presión de vapor de saturación (kPa) — ec. 11 FAO-56 */
function presionSaturacion(tempC) {
  return 0.6108 * Math.exp((17.27 * tempC) / (tempC + 237.3));
}

/** Déficit de presión de vapor VPD (kPa). Rango óptimo hortalizas: 0.4–1.2 */
function vpd(tempC, hrPct) {
  const es = presionSaturacion(tempC);
  const ea = es * (hrPct / 100);
  return Math.max(0, es - ea);
}

/** Punto de rocío (°C) — Magnus. Si T nocturna se acerca al rocío → hoja mojada → hongos */
function puntoRocio(tempC, hrPct) {
  const g = Math.log(Math.max(hrPct, 1) / 100) + (17.27 * tempC) / (237.3 + tempC);
  return (237.3 * g) / (17.27 - g);
}

function clasificarVpd(v) {
  if (v < 0.4) return { nivel: 'BAJO', nota: 'Aire muy húmedo: poca transpiración, riesgo de hongos' };
  if (v <= 1.2) return { nivel: 'ÓPTIMO', nota: 'Transpiración y absorción de nutrientes ideales' };
  if (v <= 2.0) return { nivel: 'ALTO', nota: 'Demanda hídrica alta: vigilar humedad del suelo' };
  return { nivel: 'CRÍTICO', nota: 'Estrés atmosférico severo: cierre estomático probable' };
}

// ---------------------------------------------------------------------------
// Evapotranspiración y balance hídrico
// ---------------------------------------------------------------------------

/** ET₀ diaria (mm/día) — Hargreaves-Samani (ec. 52 FAO-56), ideal cuando solo hay temperatura */
function et0Hargreaves(tMax, tMin, mes /* 0-11 */) {
  if (tMax == null || tMin == null || tMax <= tMin) return null;
  const raMm = RA_MENSUAL[mes] * 0.408; // MJ/m²/día → mm/día
  const tMedia = (tMax + tMin) / 2;
  return 0.0023 * raMm * (tMedia + 17.8) * Math.sqrt(tMax - tMin);
}

/**
 * Agua útil disponible (%): posición de la humedad actual entre el punto crítico
 * del cultivo (umbral rojo ≈ agotamiento permitido) y capacidad de campo (~85%).
 */
function aguaUtilDisponible(humedad, cultivo) {
  const cc = 85;
  const critico = cultivo.rojo;
  return Math.max(0, Math.min(100, ((humedad - critico) / (cc - critico)) * 100));
}

// ---------------------------------------------------------------------------
// Análisis de la serie histórica
// ---------------------------------------------------------------------------

/** Agrupa lecturas por día local y calcula estadísticos + ET₀ + ETc + GDD */
function resumenDiario(serie, cultivo) {
  const porDia = new Map();
  for (const l of serie) {
    const clave = new Date(l.ts).toLocaleDateString('es-CO');
    if (!porDia.has(clave)) porDia.set(clave, []);
    porDia.get(clave).push(l);
  }
  const dias = [];
  let gddAcumulado = 0;
  for (const [fecha, ls] of porDia) {
    const hum = ls.map((l) => l.humedad_suelo);
    const tAire = ls.map((l) => l.temp_aire).filter((v) => v != null);
    const tMax = tAire.length ? Math.max(...tAire) : null;
    const tMin = tAire.length ? Math.min(...tAire) : null;
    const mes = new Date(ls[0].ts).getMonth();
    const et0 = et0Hargreaves(tMax, tMin, mes);
    const gdd = tMax != null ? Math.max(0, (tMax + tMin) / 2 - cultivo.tBase) : 0;
    gddAcumulado += gdd;
    dias.push({
      fecha,
      lecturas: ls.length,
      humMin: round1(Math.min(...hum)),
      humMax: round1(Math.max(...hum)),
      humMedia: round1(hum.reduce((a, b) => a + b, 0) / hum.length),
      tMax: round1(tMax), tMin: round1(tMin),
      et0: round2(et0),
      etc: et0 != null ? round2(et0 * cultivo.kc) : null, // demanda real del cultivo mm/día
      gdd: round1(gdd),
      gddAcumulado: round1(gddAcumulado),
    });
  }
  return dias.slice(-14);
}

/**
 * Detección de eventos de riego/lluvia: salto de humedad ≥ +6 puntos entre
 * lecturas consecutivas (< 2 h de separación). Permite auditar cuánta agua entra.
 */
function detectarEventosAgua(serie) {
  const eventos = [];
  for (let i = 1; i < serie.length; i++) {
    const salto = serie[i].humedad_suelo - serie[i - 1].humedad_suelo;
    const dt = serie[i].ts - serie[i - 1].ts;
    if (salto >= 6 && dt <= 2 * MS_HORA) {
      const ultimo = eventos[eventos.length - 1];
      if (ultimo && serie[i].ts - ultimo.ts < 3 * MS_HORA) {
        ultimo.magnitud = round1(ultimo.magnitud + salto); // mismo evento continuado
        ultimo.humedadFinal = round1(serie[i].humedad_suelo);
      } else {
        eventos.push({
          ts: serie[i].ts,
          magnitud: round1(salto),
          humedadInicial: round1(serie[i - 1].humedad_suelo),
          humedadFinal: round1(serie[i].humedad_suelo),
        });
      }
    }
  }
  return eventos.slice(-20);
}

/** Tasa de secado (puntos %/día) de las últimas 24 h sin eventos → proyección de días hasta umbral */
function proyeccionRiego(serie, cultivo) {
  if (serie.length < 4) return null;
  const ultima = serie[serie.length - 1];
  const hace24h = ultima.ts - MS_DIA;
  const ventana = serie.filter((l) => l.ts >= hace24h);
  if (ventana.length < 3) return null;
  // regresión lineal simple sobre la ventana (ignora si hubo un evento de agua)
  let subio = false;
  for (let i = 1; i < ventana.length; i++)
    if (ventana[i].humedad_suelo - ventana[i - 1].humedad_suelo >= 6) subio = true;
  if (subio) return null;
  const n = ventana.length;
  const xs = ventana.map((l) => (l.ts - ventana[0].ts) / MS_DIA);
  const ys = ventana.map((l) => l.humedad_suelo);
  const xm = xs.reduce((a, b) => a + b) / n, ym = ys.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) { num += (xs[i] - xm) * (ys[i] - ym); den += (xs[i] - xm) ** 2; }
  if (den === 0) return null;
  const pendiente = num / den; // puntos por día (negativa = secando)
  if (pendiente >= -0.5) return { tasaSecado: round1(pendiente), diasHastaRiego: null };
  const dias = (ultima.humedad_suelo - cultivo.rojo) / -pendiente;
  return { tasaSecado: round1(pendiente), diasHastaRiego: dias > 0 ? round1(dias) : 0 };
}

// ---------------------------------------------------------------------------
// Semáforo + alertas profesionales
// ---------------------------------------------------------------------------

function evaluarSemaforo(serie, claveCultivo) {
  if (!serie || serie.length === 0) return { estado: 'SIN_DATOS', color: '#6b7280', mensaje: 'Sin lecturas todavía' };
  const cultivo = CULTIVOS[claveCultivo] || CULTIVOS.aji;
  const u = serie[serie.length - 1];
  const h = u.humedad_suelo;

  let inicioSeco = null;
  for (let i = serie.length - 1; i >= 0 && serie[i].humedad_suelo < cultivo.rojo; i--) inicioSeco = serie[i].ts;
  const horasSeco = inicioSeco ? (u.ts - inicioSeco) / MS_HORA : 0;

  if (h > cultivo.exceso)
    return { estado: 'EXCESO', color: '#3b82f6', mensaje: `Suelo saturado (${h.toFixed(0)}%). NO riegues: lavas nutrientes y asfixias raíces.` };
  if (h < cultivo.rojo)
    return { estado: 'REGAR', color: '#dc2626', mensaje: `Humedad ${h.toFixed(0)}% bajo el mínimo de ${cultivo.nombre} (${cultivo.rojo}%)${horasSeco >= 1 ? ` hace ${horasSeco.toFixed(0)} h` : ''}. Riega temprano en la mañana.` };
  if (h < cultivo.amarillo)
    return { estado: 'PRONTO', color: '#f59e0b', mensaje: `Humedad ${h.toFixed(0)}%: prepara riego en las próximas 24 h.` };
  return { estado: 'OK', color: '#16a34a', mensaje: `Humedad ${h.toFixed(0)}%: reserva hídrica adecuada. No riegues.` };
}

/** Alertas agronómicas adicionales sobre la última lectura + contexto */
function evaluarAlertas(serie, claveCultivo) {
  const alertas = [];
  if (!serie || serie.length === 0) return alertas;
  const cultivo = CULTIVOS[claveCultivo] || CULTIVOS.aji;
  const u = serie[serie.length - 1];

  const sem = evaluarSemaforo(serie, claveCultivo);
  if (sem.estado === 'REGAR' || sem.estado === 'EXCESO')
    alertas.push({ tipo: sem.estado, severidad: 'ALTA', mensaje: sem.mensaje });

  if (u.temp_aire != null && u.temp_aire >= 35)
    alertas.push({ tipo: 'ESTRES_TERMICO', severidad: 'ALTA', mensaje: `Temperatura ${u.temp_aire.toFixed(1)}°C: aborto floral probable en ${cultivo.nombre}. No apliques agroquímicos ahora.` });

  if (u.temp_aire != null && u.hum_aire != null) {
    const horas6 = serie.filter((l) => u.ts - l.ts <= 6 * MS_HORA && l.hum_aire != null);
    const hrAlta = horas6.length >= 3 && horas6.every((l) => l.hum_aire >= 85);
    if (hrAlta && u.temp_aire >= 22 && u.temp_aire <= 32)
      alertas.push({ tipo: 'RIESGO_FUNGICO', severidad: 'MEDIA', mensaje: `HR > 85% sostenida por 6 h con ${u.temp_aire.toFixed(0)}°C: condiciones para mildeo/antracnosis. Inspecciona el envés de las hojas.` });

    const v = vpd(u.temp_aire, u.hum_aire);
    if (v > 2.0)
      alertas.push({ tipo: 'VPD_CRITICO', severidad: 'MEDIA', mensaje: `VPD ${v.toFixed(1)} kPa: la planta cierra estomas aunque haya agua en el suelo. Considera riego refrescante o sombrío.` });

    const rocio = puntoRocio(u.temp_aire, u.hum_aire);
    if (u.temp_aire - rocio < 2 && esNoche(u.ts))
      alertas.push({ tipo: 'HOJA_MOJADA', severidad: 'BAJA', mensaje: `Temperatura a ${(u.temp_aire - rocio).toFixed(1)}°C del punto de rocío: habrá condensación nocturna en el follaje.` });
  }

  if (u.temp_suelo != null && u.temp_suelo < 18 && claveCultivo === 'maiz')
    alertas.push({ tipo: 'SUELO_FRIO', severidad: 'BAJA', mensaje: `Suelo a ${u.temp_suelo.toFixed(1)}°C: germinación de maíz lenta (<18°C). Espera para sembrar.` });

  if (u.bateria != null && u.bateria < 20)
    alertas.push({ tipo: 'BATERIA', severidad: 'MEDIA', mensaje: `Batería del nodo al ${u.bateria}%. Revisa panel solar o recarga.` });

  return alertas;
}

/** Análisis integral de un nodo — lo que consume el dashboard */
function analizarNodo(serie, claveCultivo) {
  const cultivo = CULTIVOS[claveCultivo] || CULTIVOS.aji;
  const u = serie[serie.length - 1] || {};
  const tieneClima = u.temp_aire != null && u.hum_aire != null;
  const vpdActual = tieneClima ? vpd(u.temp_aire, u.hum_aire) : null;
  const dias = resumenDiario(serie, cultivo);
  const hoy = dias[dias.length - 1] || {};
  return {
    cultivo: { clave: claveCultivo, ...cultivo },
    semaforo: evaluarSemaforo(serie, claveCultivo),
    alertas: evaluarAlertas(serie, claveCultivo),
    instantaneo: {
      vpd: round2(vpdActual),
      vpdClase: vpdActual != null ? clasificarVpd(vpdActual) : null,
      puntoRocio: tieneClima ? round1(puntoRocio(u.temp_aire, u.hum_aire)) : null,
      aguaUtil: u.humedad_suelo != null ? round1(aguaUtilDisponible(u.humedad_suelo, cultivo)) : null,
    },
    hoy: {
      et0: hoy.et0 ?? null,          // demanda atmosférica mm/día
      etc: hoy.etc ?? null,          // demanda del cultivo mm/día (≙ litros/m²/día)
      gddAcumulado: hoy.gddAcumulado ?? null,
      avanceCiclo: hoy.gddAcumulado != null ? round1(Math.min(100, (dias.length / cultivo.cicloDias) * 100)) : null,
    },
    proyeccion: proyeccionRiego(serie, cultivo),
    eventosAgua: detectarEventosAgua(serie),
    resumenDiario: dias,
  };
}

// ---------------------------------------------------------------------------
function esNoche(ts) { const h = new Date(ts).getHours(); return h >= 19 || h <= 6; }
function round1(v) { return v == null ? null : Math.round(v * 10) / 10; }
function round2(v) { return v == null ? null : Math.round(v * 100) / 100; }

module.exports = { CULTIVOS, vpd, puntoRocio, et0Hargreaves, evaluarSemaforo, evaluarAlertas, analizarNodo };
