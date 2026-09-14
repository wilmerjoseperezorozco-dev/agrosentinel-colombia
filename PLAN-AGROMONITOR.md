# AgroSentinel Colombia — Monitoreo de suelo y clima low-cost para agricultores del Atlántico

> Análisis técnico-agronómico. Enfoque: partir del costo/tecnología profesional (lo difícil)
> y factorizar hacia una solución casera, económica y demostrable en Colombia.
> Precios en COP a julio 2026, verificar en Vistronica, Sigma Electrónica, I+D Electrónica, MercadoLibre.

---

## 1. Contexto agronómico (por qué esto tiene potencial real)

**Tubará / Atlántico:**
- Clima: bosque seco tropical. Lluvia ~800–1.200 mm/año concentrada en 2 picos (abr–jun, ago–nov). Déficit hídrico severo dic–mar.
- Suelos predominantes: franco-arcillosos y franco-arenosos, baja materia orgánica (<2%), pH 6.0–7.5, algunos con problemas de salinidad cerca de la costa.
- Cultivos típicos del pequeño productor: yuca, maíz, guandú, ahuyama, melón, patilla, ají, mango, ciruela costeña; hortalizas de patio.
- **El problema #1 no es fertilidad, es AGUA**: el agricultor riega "a ojo" o depende de lluvia. Riega de más (lava nutrientes, gasta agua cara) o de menos (estrés hídrico = pérdida de 30–60% de rendimiento en hortalizas).

**La propuesta de valor agronómica es simple y demostrable:**
> "Saber cuándo regar y cuándo no" — con un sensor de $30.000 COP se puede ahorrar 20–40% de agua y subir rendimiento. Eso se demuestra en una parcela en un ciclo de melón (75 días).

## 2. Variables a medir (priorizadas por impacto agronómico)

| Prioridad | Variable | Por qué importa | Sensor low-cost |
|---|---|---|---|
| ⭐⭐⭐ | Humedad del suelo | Decisión de riego. Mayor impacto directo en producción | Capacitivo v2.0 |
| ⭐⭐⭐ | Temperatura ambiente + HR | Estrés térmico, ventana de aplicación de agroquímicos, riesgo de hongos (mildeo en melón/patilla) | DHT22 / SHT31 |
| ⭐⭐ | Temperatura del suelo | Germinación (maíz necesita >18°C), actividad radicular | DS18B20 sumergible |
| ⭐⭐ | Lluvia | Descontar riego, registro histórico | Pluviómetro de balancín |
| ⭐ | Luminosidad | Sombrío, densidad de siembra | BH1750 |
| ⭐ | pH / EC del suelo | Salinidad (relevante en zona costera), fertilización | Sonda pH/EC (etapa 2, sensores baratos son imprecisos) |

**Decisión técnica:** el MVP mide humedad de suelo + temperatura/HR ambiente + temperatura de suelo. pH/EC se hace con kit manual de laboratorio en etapa 2 — los sensores baratos de pH mienten y dañan la credibilidad del producto.

---

## 3. NIVEL 1 — La referencia profesional (lo más difícil / caro)

Lo que compite en el mercado, para saber qué estamos "factorizando":

| Solución | Qué hace | Costo aprox |
|---|---|---|
| Estación Davis Vantage Pro2 + sensores suelo | Estación meteorológica completa, telemetría | $8–14 millones COP |
| Sentek Drill & Drop (sonda multiprofundidad) | Humedad/temp/salinidad a 6 profundidades | $12–20 millones COP + suscripción |
| Arable Mark 3 | Clima + NDVI + modelo de cultivo, satelital | ~USD 2.000 + USD 500/año |
| Servicios agtech colombianos (SIOMA, etc.) | Plataforma + hardware en arriendo | $500.000–2M COP/mes por finca |

**Conclusión del análisis:** nadie de estos llega al pequeño productor de Tubará (0.5–5 ha). El mercado está vacío por debajo de $500.000 COP. Ahí está la oportunidad. La tecnología de fondo (sensor capacitivo + radio + nube) es la misma; lo caro es la marca, la robustez industrial y la suscripción.

## 4. NIVEL 2 — Solución intermedia IoT (el producto vendible)

**Nodo de campo (por punto de monitoreo):**

| Componente | Ref | Precio COP aprox |
|---|---|---|
| MCU con WiFi/BLE | ESP32 DevKit | $28.000–38.000 |
| Sensor humedad suelo capacitivo | v2.0 (no usar resistivos, se corroen en semanas) | $8.000–15.000 |
| Temp/HR ambiente | SHT31 (mejor que DHT22 en trópico húmedo) | $18.000–25.000 |
| Temp suelo | DS18B20 encapsulado | $8.000–12.000 |
| Panel solar 6V 2W + TP4056 + batería 18650 | autonomía indefinida | $35.000–50.000 |
| Caja estanca IP65 + prensaestopas + tubo PVC | protección | $25.000–40.000 |
| **Total nodo** | | **$120.000–180.000** |

**Conectividad — el problema real en zona rural del Atlántico:**

| Opción | Alcance | Costo | Veredicto |
|---|---|---|---|
| WiFi de la casa del agricultor | 50–100 m | $0 | ✅ MVP: la parcela demo cerca de la casa |
| LoRa punto a punto (2× módulo RFM95) | 2–10 km campo abierto | +$40.000/nodo + gateway | ✅ Etapa 2: fincas sin señal |
| SIM 4G (ESP32 + SIM7600) | donde haya celular | +$120.000 + plan datos | Solo para gateway central |
| Sin conectividad: pantalla + SD | 0 | +$25.000 | ✅ Versión "offline" — no todo agricultor tiene datos |

**Decisión:** arquitectura en 2 modos — **modo standalone** (pantalla OLED en el nodo: el agricultor ve "REGAR / NO REGAR" sin celular ni internet) y **modo conectado** (WiFi → dashboard en el celular). El modo standalone es clave: derriba la barrera de adopción #1 en el campo colombiano.

## 5. NIVEL 3 — La solución casera accesible (la meta de factorización)

Versión mínima demostrable, ensamblable en casa con cautín:

| Componente | Precio COP |
|---|---|
| ESP32 (o ESP8266 D1 Mini para bajar aún más: $18.000) | $28.000 |
| Sensor capacitivo humedad suelo | $9.000 |
| DHT22 | $14.000 |
| Pantalla OLED 0.96" | $12.000 |
| Powerbank reciclado / 18650 + cargador | $15.000 |
| Tarro plástico + silicona (caja "casera" IP-algo) | $5.000 |
| **Total kit casero** | **~$83.000** |

- **Precio objetivo de venta del kit armado: $150.000–200.000 COP** (margen ~50%, comparable a un bulto y medio de úrea — el agricultor puede razonarlo).
- Alternativa freemium: app/dashboard gratis, hardware al costo, cobrar por alertas + recomendaciones por cultivo.

**Calibración (esto es lo que un ingeniero agrónomo aporta y la competencia barata no hace):**
1. El sensor capacitivo entrega valores crudos (ej. 1200 = agua, 2800 = aire). Hay que calibrar **por tipo de suelo**: tomar muestra, saturar, pesar, secar al horno → curva de retención simplificada.
2. Definir umbrales por cultivo y etapa fenológica. Ej. melón: mantener 60–80% de capacidad de campo en floración-llenado; yuca tolera hasta 40%.
3. Los umbrales por cultivo son la **propiedad intelectual real** del negocio — el hardware cualquiera lo copia, la tabla agronómica calibrada para suelos del Atlántico no.

## 6. Software (de lo complejo a lo mínimo)

**Arquitectura completa (etapa 2):**
```
Nodo ESP32 → MQTT (Mosquitto) → backend (Supabase/Postgres) → PWA dashboard
                                      ↓
                          motor de reglas por cultivo → alertas WhatsApp (Twilio/n8n)
```

**MVP de software (2–3 semanas de trabajo):**
1. **Firmware** (Arduino/PlatformIO): leer sensores cada 15 min, media móvil, mostrar en OLED semáforo `🟢 OK / 🟡 PRONTO / 🔴 REGAR`, deep sleep para batería. ~300 líneas.
2. **Dashboard PWA** (mismo stack que Construdata: PWA + Supabase): gráfica de humedad 7 días, umbral del cultivo, botón "registré un riego". El ESP32 postea directo a Supabase REST — **sin servidor propio, costo de nube $0** en tier gratis.
3. **Alertas WhatsApp** vía n8n (ya tienes n8n-patterns en el workspace): "Tu lote de melón lleva 2 días bajo el umbral. Riega hoy en la mañana."

**Regla de riego v1 (suficiente para demostrar valor):**
```
si humedad_suelo < umbral_cultivo[etapa] durante > 6h
y no llovió en últimas 12h  →  alerta REGAR
si humedad > 90% capacidad de campo  →  alerta NO RIEGUES (ahorro)
```
Etapa 3: reemplazar por balance hídrico FAO-56 (ET₀ con datos de temp/HR que ya medimos) — eso ya es nivel agrónomo profesional con hardware de $80.000.

## 7. Costos consolidados del proyecto

| Fase | Qué incluye | Inversión |
|---|---|---|
| F1 — Prototipo banco (2 sem) | 1 kit casero + firmware + calibración en matera | ~$120.000 |
| F2 — Piloto campo (1 ciclo, 75 días) | 3 nodos en parcela real (melón o ají), dashboard, comparar lote con/sin monitoreo | ~$500.000 + transporte |
| F3 — Demo comercial | 10 kits, landing, video del piloto con datos reales | ~$2.000.000 |

**El activo de venta de F2:** "En este lote medimos, en este no. Mismo cultivo, misma semilla: X% menos agua, Y% más producción." Con eso se le vende a UMATA de Tubará, asociaciones de productores, Gobernación del Atlántico (líneas de agricultura 4.0), y SENA.

## 8. Riesgos honestos (agronómicos, no de software)

1. **Un sensor en un punto no representa la parcela** — el suelo es heterogéneo. Mitigación: protocolo de instalación (zona de raíces, profundidad 15–20 cm, punto representativo) y vender de a 2–3 nodos por hectárea.
2. **Corrosión y trópico**: la electrónica barata muere en campo en 3–6 meses. Mitigación: conformal coating (barniz), caja IP65, prueba de campo real en F2 antes de vender nada.
3. **Adopción**: el agricultor mayor no usa apps. Mitigación: el semáforo en pantalla + alertas WhatsApp (que sí usan todos) — nunca obligar a abrir un dashboard.
4. **Robo del equipo en campo**: caja discreta, tubo PVC enterrado, valor bajo por nodo es en sí la mitigación.
5. Sensores de pH baratos = datos falsos. No incluirlos hasta tener sondas decentes; la credibilidad es el activo.

## 9. Siguiente paso inmediato

Comprar la lista F1 (~$120.000 en Vistronica o MercadoLibre) y montar el prototipo en una matera con ají o tomate en la casa: en 2 semanas hay demo funcionando con datos reales para mostrar.
