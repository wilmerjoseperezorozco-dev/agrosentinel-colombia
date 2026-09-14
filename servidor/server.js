// AgroSentinel Colombia — servidor local (cero dependencias, solo Node)
// Ejecutar:  node server.js   →  http://localhost:3300
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { CULTIVOS, evaluarSemaforo, evaluarAlertas, analizarNodo } = require('./agronomia');

const PUERTO = 3300;
const DIR_DATOS = path.join(__dirname, 'datos');
const ARCHIVO_LECTURAS = path.join(DIR_DATOS, 'lecturas.json');
const ARCHIVO_ALERTAS = path.join(DIR_DATOS, 'alertas.json');
const MAX_LECTURAS_POR_NODO = 8000;
const MAX_ALERTAS = 500;
const DEDUPE_ALERTA_MS = 6 * 3600 * 1000; // no repetir la misma alerta del mismo nodo en 6 h

// ---------- estado ----------
let lecturas = {};      // { nodo: [ {ts, humedad_suelo, temp_suelo, temp_aire, hum_aire, bateria, cultivo} ] }
let historialAlertas = []; // [ {ts, nodo, tipo, severidad, mensaje} ]

function cargar(archivo, porDefecto) {
  try { return JSON.parse(fs.readFileSync(archivo, 'utf8')); } catch { return porDefecto; }
}

const guardadosPendientes = new Set();
function guardar(archivo, obtenerDatos) {
  if (guardadosPendientes.has(archivo)) return;
  guardadosPendientes.add(archivo);
  setTimeout(() => {
    guardadosPendientes.delete(archivo);
    fs.mkdir(DIR_DATOS, { recursive: true }, () => {
      fs.writeFile(archivo, JSON.stringify(obtenerDatos()), (err) => {
        if (err) console.error('Error guardando', path.basename(archivo), err.message);
      });
    });
  }, 2000);
}

// ---------- alertas con dedupe ----------
function registrarAlertas(nodo, nuevas) {
  const ahora = Date.now();
  let cambio = false;
  for (const a of nuevas) {
    const repetida = historialAlertas.some(
      (h) => h.nodo === nodo && h.tipo === a.tipo && ahora - h.ts < DEDUPE_ALERTA_MS
    );
    if (!repetida) {
      historialAlertas = historialAlertas.concat({ ts: ahora, nodo, ...a }).slice(-MAX_ALERTAS);
      cambio = true;
    }
  }
  if (cambio) guardar(ARCHIVO_ALERTAS, () => historialAlertas);
}

// ---------- validación de frontera ----------
function validarLectura(l) {
  if (typeof l.nodo !== 'string' || !l.nodo.trim()) return 'nodo requerido';
  const num = (v, min, max) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
  if (!num(l.humedad_suelo, 0, 100)) return 'humedad_suelo fuera de rango 0-100';
  if (l.temp_suelo != null && !num(l.temp_suelo, -5, 60)) return 'temp_suelo fuera de rango';
  if (l.temp_aire != null && !num(l.temp_aire, -5, 55)) return 'temp_aire fuera de rango';
  if (l.hum_aire != null && !num(l.hum_aire, 0, 100)) return 'hum_aire fuera de rango';
  if (l.bateria != null && !num(l.bateria, 0, 100)) return 'bateria fuera de rango';
  if (l.ts != null && !num(l.ts, 0, Date.now() + 60000)) return 'ts inválido';
  return null;
}

// ---------- helpers http ----------
function json(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(obj));
}

function servirArchivo(res, archivo, tipo) {
  fs.readFile(path.join(__dirname, 'public', archivo), (err, data) => {
    if (err) { res.writeHead(404); res.end('No encontrado'); return; }
    res.writeHead(200, { 'Content-Type': tipo });
    res.end(data);
  });
}

// ---------- rutas ----------
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html'))
    return servirArchivo(res, 'index.html', 'text/html; charset=utf-8');

  if (req.method === 'GET' && url.pathname === '/api/cultivos')
    return json(res, 200, { ok: true, cultivos: CULTIVOS });

  if (req.method === 'GET' && url.pathname === '/api/nodos') {
    const nodos = Object.keys(lecturas).map((n) => {
      const serie = lecturas[n];
      const ultima = serie[serie.length - 1] || null;
      return {
        nodo: n,
        lecturas: serie.length,
        ultima,
        cultivo: ultima ? (CULTIVOS[ultima.cultivo]?.nombre || ultima.cultivo) : null,
        semaforo: evaluarSemaforo(serie, ultima?.cultivo),
        enLinea: ultima ? Date.now() - ultima.ts < 45 * 60 * 1000 : false,
      };
    });
    return json(res, 200, { ok: true, nodos });
  }

  if (req.method === 'GET' && url.pathname === '/api/analisis') {
    const nodo = url.searchParams.get('nodo');
    const serie = lecturas[nodo];
    if (!serie || serie.length === 0) return json(res, 404, { ok: false, error: 'nodo sin datos' });
    const cultivo = serie[serie.length - 1].cultivo;
    const horas = parseFloat(url.searchParams.get('horas') || '72');
    const desde = Date.now() - horas * 3600000;
    let datos = serie.filter((l) => l.ts >= desde);
    if (datos.length < 2) datos = serie.slice(-800);
    return json(res, 200, { ok: true, nodo, analisis: analizarNodo(serie, cultivo), datos });
  }

  if (req.method === 'GET' && url.pathname === '/api/alertas') {
    const nodo = url.searchParams.get('nodo');
    const filtradas = nodo ? historialAlertas.filter((a) => a.nodo === nodo) : historialAlertas;
    return json(res, 200, { ok: true, alertas: filtradas.slice(-50).reverse() });
  }

  if (req.method === 'POST' && url.pathname === '/api/lecturas') {
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 10000) req.destroy(); });
    req.on('end', () => {
      let l;
      try { l = JSON.parse(body); } catch { return json(res, 400, { ok: false, error: 'JSON inválido' }); }
      const error = validarLectura(l);
      if (error) return json(res, 400, { ok: false, error });

      const nodo = l.nodo.trim().slice(0, 40);
      const registro = {
        ts: typeof l.ts === 'number' ? l.ts : Date.now(),
        humedad_suelo: l.humedad_suelo,
        temp_suelo: l.temp_suelo ?? null,
        temp_aire: l.temp_aire ?? null,
        hum_aire: l.hum_aire ?? null,
        bateria: l.bateria ?? null,
        cultivo: CULTIVOS[l.cultivo] ? l.cultivo : 'aji',
      };
      const serie = (lecturas[nodo] || []).concat(registro)
        .sort((a, b) => a.ts - b.ts)
        .slice(-MAX_LECTURAS_POR_NODO);
      lecturas = { ...lecturas, [nodo]: serie };
      guardar(ARCHIVO_LECTURAS, () => lecturas);

      const alertas = evaluarAlertas(serie, registro.cultivo);
      registrarAlertas(nodo, alertas);
      json(res, 200, { ok: true, semaforo: evaluarSemaforo(serie, registro.cultivo), alertas });
    });
    return;
  }

  json(res, 404, { ok: false, error: 'ruta no encontrada' });
});

lecturas = cargar(ARCHIVO_LECTURAS, {});
historialAlertas = cargar(ARCHIVO_ALERTAS, []);
server.listen(PUERTO, () => {
  console.log('🌱 AgroSentinel Colombia — http://localhost:' + PUERTO);
  console.log('   Nodos ESP32/simulador → POST http://<IP-de-este-PC>:' + PUERTO + '/api/lecturas');
});
