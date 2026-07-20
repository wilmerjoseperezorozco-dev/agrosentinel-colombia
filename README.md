# AgroMonitor Tubará

Sistema de monitoreo agronómico IoT de bajo costo para pequeños productores del departamento del Atlántico, Colombia. Desarrollado en el municipio de Tubará como respuesta a la necesidad de asistencia técnica accesible en zonas de bosque seco tropical con déficit hídrico estacional.

## El problema que resuelve

En el Atlántico llueve 800–1.200 mm/año concentrados en dos períodos. El resto del año los agricultores riegan "a ojo", generando pérdidas de 30–60% de rendimiento por estrés hídrico o lavado de nutrientes. Las soluciones profesionales de monitoreo de suelo cuestan $8–20 millones COP por punto más suscripción mensual — fuera del alcance del productor de 0.5–5 ha.

Este sistema lleva el mismo análisis agronómico a un kit ensamblable por $83.000–180.000 COP.

## Funcionalidades (Fase 0)

- **Motor agronómico FAO-56**: evapotranspiración ET₀ por Hargreaves-Samani con radiación extraterrestre para latitud 11°N, demanda del cultivo (ETc = ET₀ × Kc), balance hídrico diario.
- **VPD (déficit de presión de vapor)**: detecta cuándo la planta cierra estomas aunque haya agua en el suelo.
- **Grados-día acumulados (GDD)**: seguimiento del desarrollo fenológico por cultivo.
- **Proyección de riego**: regresión sobre tasa de secado → "te quedan N días antes de regar".
- **Detección de eventos de agua**: identifica riegos y lluvias automáticamente por saltos en la curva de humedad.
- **Semáforo REGAR / PRONTO / OK / EXCESO**: funciona en pantalla OLED sin internet.
- **6 tipos de alerta agronómica**: estrés hídrico, suelo saturado, estrés térmico (≥35°C), riesgo fúngico (HR>85% sostenida 6 h), VPD crítico, hoja mojada nocturna.
- **Dashboard en tiempo real**: gráficas de humedad con umbrales del cultivo, temperatura, HR, historial de alertas, tabla diaria ET₀/ETc/GDD.
- **Simulador físico**: 7 días de historia + modo en vivo con ciclo día/noche, secado real y eventos aleatorios — permite desarrollar y demostrar sin hardware.

## Cultivos soportados

Melón · Ají · Tomate · Maíz · Yuca

Umbrales de humedad volumétrica calibrados para suelos franco-arenosos y franco-arcillosos del Atlántico.

## Arquitectura

```
ESP32 (campo)                    PC / Servidor local                  Agricultor
┌─────────────────┐              ┌──────────────────────────────┐     ┌────────────┐
│ Sensor suelo    │   WiFi HTTP  │ server.js (Node, sin deps)   │     │ Dashboard  │
│ DHT22 temp/HR   │ ──────────►  │ agronomia.js (motor FAO-56)  │──►  │ Navegador  │
│ DS18B20 t.suelo │   POST JSON  │ datos/ (persistencia local)  │     │ localhost  │
│ OLED semáforo   │              └──────────────────────────────┘     └────────────┘
└─────────────────┘                           │
                                              ▼ (Fase 2)
                                     n8n → WhatsApp alerts
```

## Inicio rápido (sin hardware)

```bash
# Clonar el repositorio
git clone https://github.com/wilmerjperez/agromonitor-tubara.git
cd agromonitor-tubara

# Terminal 1 — servidor
node servidor/server.js

# Terminal 2 — simulador (genera 7 días de historia + modo en vivo)
node simulador/simulador.js

# Abrir en el navegador
start http://localhost:3300
```

Requisitos: Node.js ≥ 18. Sin dependencias npm.

## Hardware del nodo de campo

| Componente | Función | Precio COP aprox. |
|---|---|---|
| ESP32 DevKit | Microcontrolador + WiFi | $28.000–38.000 |
| Sensor capacitivo suelo v2.0 | Humedad volumétrica | $8.000–15.000 |
| SHT31 / DHT22 | Temperatura y HR del aire | $14.000–25.000 |
| DS18B20 sumergible | Temperatura del suelo | $8.000–12.000 |
| OLED SSD1306 128×64 | Semáforo sin internet | $12.000 |
| Panel solar 6V + TP4056 + 18650 | Autonomía indefinida | $35.000–50.000 |
| Caja estanca IP65 | Protección campo | $25.000–40.000 |
| **Total nodo** | | **$130.000–190.000** |

Ver `firmware/agromonitor_esp32/` para el sketch Arduino completo con instrucciones de calibración.

## Estructura del proyecto

```
agromonitor-tubara/
├── servidor/
│   ├── server.js          # API HTTP + sirviendo el dashboard (Node puro)
│   ├── agronomia.js       # Motor FAO-56: ET₀, VPD, GDD, alertas, proyecciones
│   └── public/
│       └── index.html     # Dashboard en tiempo real (Chart.js)
├── simulador/
│   └── simulador.js       # Simulador físico de nodos (backfill + en vivo)
├── firmware/
│   └── agromonitor_esp32/
│       └── agromonitor_esp32.ino   # Firmware ESP32 listo para flashear
├── PLAN-AGROMONITOR.md    # Análisis de negocio y factorización de costos
├── ROADMAP-IA-AGRICULTURA.md  # Fases 1–4: visión, plagas, drones, IA predictiva
└── package.json
```

## API del servidor

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/nodos` | Estado actual de todos los nodos |
| GET | `/api/analisis?nodo=X&horas=96` | Análisis agronómico completo de un nodo |
| GET | `/api/alertas?nodo=X` | Historial de alertas (últimas 50) |
| GET | `/api/cultivos` | Tabla de cultivos y umbrales |
| POST | `/api/lecturas` | Recibir lectura de un ESP32 o simulador |

El ESP32 y el simulador usan el mismo endpoint — el servidor no los distingue. Cuando llegue el hardware, aparece como un nodo más sin cambiar una línea del servidor.

## Roadmap

| Fase | Capacidad | Estado |
|------|-----------|--------|
| 0 | Sensores suelo/clima + motor FAO-56 + dashboard | ✅ Completa |
| 1 | Diagnóstico fitosanitario por fotografía (YOLOv11) | 🔜 Planificada |
| 2 | Conteo de plagas en trampas con ESP32-CAM | 🔜 Planificada |
| 3 | Mapa NDVI del lote con dron + OpenDroneMap | 🔜 Planificada |
| 4 | Asistente WhatsApp + predicción de rendimiento | 🔜 Planificada |

Ver [`ROADMAP-IA-AGRICULTURA.md`](ROADMAP-IA-AGRICULTURA.md) para la especificación técnica completa de cada fase.

## Licencia

MIT — libre para usar, modificar y distribuir. Si lo usas en un proyecto agrícola en Colombia, comparte los resultados.

---

Desarrollado en Tubará, Atlántico, Colombia.
