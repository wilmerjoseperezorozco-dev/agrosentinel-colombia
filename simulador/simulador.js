// AgroSentinel Colombia — Simulador de nodos de campo
// Simula 3 nodos con física realista: ciclo térmico día/noche, secado del suelo
// por evapotranspiración, riegos del agricultor y lluvias aleatorias.
// Al iniciar hace "backfill" de 7 días de historia y luego emite en vivo.
//
// Ejecutar (con el servidor ya corriendo):  node simulador.js
'use strict';

const http = require('http');

const HOST = process.env.AGRO_HOST || 'localhost';
const PUERTO = 3300;
const PASO_SIMULADO_MIN = 15;          // cada lectura = 15 min de campo
const DIAS_HISTORIA = 7;
const INTERVALO_VIVO_MS = 5000;        // en vivo: 1 lectura cada 5 s

// Estado inicial de cada nodo (parcelas distintas = suelos y cultivos distintos)
const NODOS = [
  { nodo: 'matera-aji',  cultivo: 'aji',   humedad: 72, tBase: 27.5, ampTermica: 5.0, secadoBase: 0.09, bateria: 100 },
  { nodo: 'lote-melon',  cultivo: 'melon', humedad: 80, tBase: 28.5, ampTermica: 6.0, secadoBase: 0.12, bateria: 88 },
  { nodo: 'lote-maiz',   cultivo: 'maiz',  humedad: 55, tBase: 28.0, ampTermica: 5.5, secadoBase: 0.07, bateria: 95 },
];

const azar = (min, max) => min + Math.random() * (max - min);

/** Un paso de simulación de 15 min para un nodo, en el instante ts */
function pasoFisico(n, ts) {
  const fecha = new Date(ts);
  const hora = fecha.getHours() + fecha.getMinutes() / 60;

  // Ciclo térmico: mínimo ~5 am, máximo ~2 pm (senoide desfasada)
  const fase = ((hora - 8.5) / 24) * 2 * Math.PI;
  const tempAire = n.tBase + n.ampTermica * Math.sin(fase) + azar(-0.4, 0.4);

  // HR inversa a la temperatura (costa Atlántico: noches muy húmedas)
  const humAire = Math.max(45, Math.min(97, 96 - (tempAire - 22) * 3.6 + azar(-3, 3)));

  // Temperatura del suelo: amortiguada y con retraso ~2 h
  const faseSuelo = ((hora - 10.5) / 24) * 2 * Math.PI;
  const tempSuelo = n.tBase - 0.8 + (n.ampTermica * 0.45) * Math.sin(faseSuelo) + azar(-0.2, 0.2);

  // Secado por ET: más fuerte con sol alto y suelo húmedo
  const factorDia = Math.max(0.15, Math.sin(((hora - 6) / 12) * Math.PI)); // 0 de noche, 1 al mediodía
  const factorHumedad = 0.4 + 0.6 * (n.humedad / 100);                     // suelo húmedo evapora más
  n.humedad -= n.secadoBase * factorDia * factorHumedad * (1 + (tempAire - 26) * 0.06);

  // Lluvia aleatoria (~1 evento cada 3-4 días en época seca simulada)
  if (Math.random() < 0.0035) {
    const lluvia = azar(8, 22);
    n.humedad += lluvia;
    n.ultimoEvento = `lluvia +${lluvia.toFixed(0)}pts`;
  }

  // El agricultor riega en la mañana (6-9 am) cuando el suelo está muy seco
  if (hora >= 6 && hora <= 9 && n.humedad < umbralRiego(n.cultivo) - 3 && Math.random() < 0.35) {
    const riego = azar(22, 32);
    n.humedad += riego;
    n.ultimoEvento = `riego +${riego.toFixed(0)}pts`;
  }

  n.humedad = Math.max(8, Math.min(96, n.humedad));
  n.bateria = Math.max(15, n.bateria - 0.002 + (factorDia > 0.5 ? 0.004 : 0)); // panel solar recarga de día

  return {
    nodo: n.nodo,
    cultivo: n.cultivo,
    ts,
    humedad_suelo: round1(n.humedad),
    temp_aire: round1(tempAire),
    hum_aire: round1(humAire),
    temp_suelo: round1(tempSuelo),
    bateria: Math.round(n.bateria),
  };
}

function umbralRiego(cultivo) {
  return { melon: 45, aji: 40, tomate: 45, maiz: 35, yuca: 25 }[cultivo] ?? 40;
}

function round1(v) { return Math.round(v * 10) / 10; }

/** POST sin dependencias (compatible con cualquier versión de Node) */
function postLectura(lectura) {
  return new Promise((resolve) => {
    const cuerpo = JSON.stringify(lectura);
    const req = http.request(
      { host: HOST, port: PUERTO, path: '/api/lecturas', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(cuerpo) } },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, data }));
      }
    );
    req.on('error', (e) => resolve({ status: 0, error: e.message }));
    req.end(cuerpo);
  });
}

async function main() {
  console.log(`🛰  Simulador AgroMonitor → http://${HOST}:${PUERTO}`);
  console.log(`   Generando ${DIAS_HISTORIA} días de historia (${NODOS.length} nodos, paso ${PASO_SIMULADO_MIN} min)…`);

  // ---- Backfill: 7 días de historia hasta ahora ----
  const pasos = (DIAS_HISTORIA * 24 * 60) / PASO_SIMULADO_MIN;
  const inicio = Date.now() - DIAS_HISTORIA * 24 * 3600 * 1000;
  let enviadas = 0, fallidas = 0;
  for (let i = 0; i < pasos; i++) {
    const ts = inicio + i * PASO_SIMULADO_MIN * 60 * 1000;
    for (const n of NODOS) {
      const r = await postLectura(pasoFisico(n, ts));
      r.status === 200 ? enviadas++ : fallidas++;
    }
    if (i % 100 === 0) process.stdout.write(`\r   progreso: ${Math.round((i / pasos) * 100)}%  (${enviadas} lecturas)`);
  }
  console.log(`\r   ✔ Historia lista: ${enviadas} lecturas enviadas${fallidas ? `, ${fallidas} fallidas` : ''}          `);
  console.log(`   Modo en vivo: 1 lectura cada ${INTERVALO_VIVO_MS / 1000}s por nodo. Abre http://localhost:${PUERTO}`);

  // ---- Modo en vivo ----
  setInterval(async () => {
    for (const n of NODOS) {
      const lectura = pasoFisico(n, Date.now());
      const r = await postLectura(lectura);
      const sem = r.status === 200 ? JSON.parse(r.data).semaforo.estado : 'ERROR';
      console.log(`   ${new Date().toLocaleTimeString('es-CO')}  ${lectura.nodo.padEnd(12)} hum=${String(lectura.humedad_suelo).padStart(5)}%  T=${lectura.temp_aire}°C  → ${sem}${n.ultimoEvento ? '  (' + n.ultimoEvento + ')' : ''}`);
      n.ultimoEvento = null;
    }
  }, INTERVALO_VIVO_MS);
}

main();
