# AgroSentinel Colombia — Roadmap IA + Visión por Computadora

> Fase 0 (actual): sensores de suelo y clima, motor agronómico FAO-56, dashboard.
> Este documento define las fases 1–4: visión, plagas, drones e IA predictiva.
> Cada fase es independiente y agrega valor sin romper la anterior.

---

## Por qué fotografía + IA es el siguiente salto natural

El sistema actual mide **lo que pasa bajo tierra** (humedad, temperatura) y **en el aire**
(T, HR, VPD). Lo que ocurre **en la planta** — la parte más importante para el agricultor —
sigue siendo invisible: cambios de color en hojas, manchas, defoliación, presencia de insectos.
Un agrónomo experto ve eso en 30 segundos. Una cámara conectada a un modelo de visión lo puede
hacer las 24 horas, sin cansarse, desde el celular del agricultor.

El otro punto clave: Colombia tiene ~2.8 millones de productores agropecuarios.
Menos del 15% tiene acceso regular a asistencia técnica presencial (fuente: DANE ENCTA 2019).
**La IA de visión puede ser el agrónomo de cabecera del otro 85%.**

---

## Fase 1 — Diagnóstico fitosanitario desde fotografía (celular)

### Qué hace
El agricultor abre la app, apunta el celular a una hoja o fruto sospechoso y recibe
en segundos: condición detectada, severidad (0–100%), manejo recomendado y umbral de acción.

### Condiciones priorizadas para el Atlántico

| Cultivo | Condición | Señal visual |
|---------|-----------|--------------|
| Melón / patilla | Mildeo velloso (*Pseudoperonospora cubensis*) | Manchas angulares amarillas, polvo gris envés |
| Melón / patilla | Antracnosis (*Colletotrichum orbiculare*) | Lesiones hundidas con halo amarillo en fruto |
| Ají / tomate | Marchitez por *Phytophthora* | Lesiones oscuras en tallo a nivel del suelo |
| Ají / tomate | Virus del mosaico (TMV/CMV) | Mosaico clorótico, distorsión foliar |
| Maíz | Roya (*Puccinia polysora*) | Pústulas anaranjadas en ambas caras de la hoja |
| Maíz | Cogollero (*Spodoptera frugiperda*) | Orificio central, excremento granular en cogollo |
| General | Minador de hojas (*Liriomyza*) | Galerías sinuosas en el mesófilo |
| General | Trips (*Frankliniella*) | Plateado en envés, deformación floral |
| General | Deficiencias nutricionales | Clorosis internerval, necrosis de bordes, etc. |

### Stack técnico

```
Celular del agricultor
    ↓ foto
    ↓ POST /api/vision/diagnosticar
Servidor AgroMonitor
    ↓ pre-procesado (resize 640×640, normalización)
    ↓
Modelo YOLO v11 (ya disponible en yolov11-vision/)
    fine-tuned sobre:
    - PlantDoc dataset (27 condiciones, 2.598 imágenes)
    - PlantVillage (54.000 imágenes, 38 condiciones)
    - Fotos propias del piloto en Tubará (gold standard local)
    ↓
Clasificador por región + severidad (0–1)
    ↓
Motor de recomendaciones (árbol de decisión por condición + historial del lote)
    ↓
Respuesta JSON → tarjeta en el dashboard + alerta WhatsApp
```

**YOLOv11 ya está en el workspace** (`yolov11-vision/`). El fine-tuning sobre PlantDoc
toma ~4 h en Google Colab gratuito (T4 GPU). No se necesita GPU propia.

### Precisión objetivo
- Top-1 accuracy ≥ 80% para las 9 condiciones priorizadas.
- Si confianza < 60%: "No estoy seguro — envía la foto al técnico de la UMATA".
  (Es mejor decir "no sé" que recomendar un agroquímico equivocado.)

### Costo adicional
- Entrenamiento: $0 (Colab gratuito).
- Inferencia en servidor local: $0.
- Inferencia en nube (si se escala): ~$0.0007 por imagen en Replicate.
- Para el agricultor: ninguno adicional — usa el celular que ya tiene.

---

## Fase 2 — Conteo y seguimiento de plagas en trampas

### El problema
Las trampas pegajosas y cromotrópicas (amarillas para moscas blancas / azules para trips)
son la herramienta estándar para el monitoreo de poblaciones de insectos. El técnico debe
ir físicamente a contarlos. Con cámara, esto se automatiza.

### Qué hace
- Cámara fija (ESP32-CAM, $25.000 COP) apunta a la trampa cada 6 horas.
- Modelo YOLO detecta y cuenta insectos por especie.
- Dashboard muestra curva de población → el agricultor aplica solo cuando supera el umbral económico de daño (TED), no por calendario.

### Ventaja agronómica
El uso de plaguicidas por calendario (ej. "cada 8 días") es el estándar actual en la zona.
El monitoreo por TED reduce aplicaciones en 30–50% (verificado en estudios con MIP en hortalizas, CORPOICA/Agrosavia).
**Esto se puede demostrar en el piloto de Fase 2 y es el argumento más fuerte ante Gobernación / SENA.**

### Stack técnico
- **ESP32-CAM**: $25.000 COP, integra cámara OV2640 + WiFi. Se agrega al nodo existente.
- Envía imagen comprimida al servidor vía HTTP POST.
- El servidor corre el modelo de conteo (YOLO v11 + NMS) y devuelve conteo por clase.
- Historial de capturas guardado por lote y semana.

---

## Fase 3 — Mapa de variabilidad espacial con dron + NDVI

### El problema
Un lote de 1 ha tiene zonas con diferentes texturas de suelo, compactación y drenaje.
Con un sensor puntual no se ve eso. Con un dron y una cámara multiespectral, sí.

### Qué hace
- Vuelo de dron cada 2–4 semanas durante el ciclo.
- Cámara RGB (celular) o multiespectral → mapa NDVI (índice de vegetación).
- El motor identifica zonas de estrés (rojo en el mapa) y correlaciona con datos del sensor de suelo.
- Recomendación de fertilización/riego diferenciado por zona (agricultura de precisión básica).

### Por qué es viable para el pequeño productor
- Drones de consumo con cámara RGB ya permiten calcular NDVI aproximado (índice ExG con visión normal).
- No se necesita cámara multiespectral costosa para detectar estrés hídrico moderado a severo.
- Servicio de vuelo por contrato: una asociación de productores comparte un dron.
  Costo estimado: $50.000–80.000 COP por vuelo/lote.

### Stack técnico
- OpenDroneMap (código abierto) → ortomosaico y modelo 3D.
- Python + rasterio → cálculo NDVI / ExG.
- Capa GeoJSON en el dashboard (Leaflet.js) → el agricultor ve su lote con el mapa de calor.

---

## Fase 4 — IA predictiva y asistente conversacional

### 4A — Predicción de riesgo de plagas y enfermedades

Los patógenos foliares tienen condiciones climáticas favorables bien documentadas:

| Condición | Clima favorecedor | Modelo |
|-----------|-------------------|--------|
| Mildeo velloso | T 15–22°C + HR > 85% por >6h | Ya implementado como alerta (Fase 0) |
| Antracnosis | T 24–30°C + lluvia + heridas de granizo | Reglas sobre datos del sensor + lluvia detectada |
| Roya del maíz | T 20–30°C + rocío nocturno + >12 h húmedo | Punto de rocío ya calculado |

La Fase 0 ya alerta sobre HR sostenida y punto de rocío. Fase 4A conecta esos datos con
modelos de riesgo publicados (CABI, Agrios) y genera alertas de riesgo proactivas
("En las próximas 48 h las condiciones serán favorables para mildeo — considera aplicar
preventivo antes de la lluvia").

### 4B — Asistente por WhatsApp (LLM + contexto del lote)

El agricultor escribe (o dice, con STT): "mi melón tiene las hojas amarillas en los bordes".
El asistente:
1. Lee el contexto del lote: cultivo, fenología (grados-día), últimas alertas, VPD, eventos de agua.
2. Genera hipótesis: "Podría ser deficiencia de potasio (frecuente en suelos arenosos de la zona
   con riegos intensos) o quemadura de bordes por salinidad. ¿Puedes enviar una foto?"
3. Si llega la foto → diagnóstico por visión (Fase 1).
4. Responde en el dialecto y vocabulario del agricultor costeño.

**Stack**: n8n (ya en el workspace) + modelo de lenguaje (API Anthropic claude-haiku-4-5 = < $0.001 por consulta)
+ contexto del lote inyectado como system prompt.

### 4C — Predicción de rendimiento

Con grados-día acumulados (GDD ya calculados en Fase 0) + humedad histórica + datos de eventos
de agua → modelo de regresión simple (scikit-learn, 50 líneas) que estima el rendimiento
esperado al final del ciclo. Herramienta de negociación del agricultor con el intermediario.

---

## Tabla de ventajas competitivas acumuladas por fase

| Fase | Capacidad añadida | Diferencial en el mercado |
|------|-------------------|--------------------------|
| 0 (actual) | Sensor suelo + motor FAO-56 + alertas WhatsApp | Único sistema < $200k COP con análisis agronómico |
| 1 | Diagnóstico fitosanitario por foto | Agrónomo virtual 24/7 desde el celular |
| 2 | Conteo de plagas en trampa (ESP32-CAM) | MIP automatizado, reduce plaguicidas 30–50% |
| 3 | Mapa NDVI del lote con dron | Prescripción diferenciada por zona |
| 4 | Asistente WhatsApp + predicción de rendimiento | Producto SaaS defensible, datos propietarios |

---

## Lista de compras para Fase 1 (diagnóstico por foto)

| Item | Precio COP |
|------|-----------|
| ESP32-CAM (para captura automática en campo) | $28.000 |
| Fine-tuning dataset PlantDoc — descarga | $0 |
| Google Colab Pro (1 mes, entrenamiento) | ~$13.000 (USD 10) |
| Tiempo de ingeniería: integración YOLO→servidor | 2–3 semanas |
| **Total inversión Fase 1** | **~$41.000 + trabajo** |

---

## Propiedad intelectual que se construye con cada fase

1. **Fase 0**: Tabla de umbrales de riego calibrada para suelos del Atlántico por cultivo.
2. **Fase 1**: Dataset de imágenes de enfermedades etiquetadas en condiciones tropicales costeñas
   (diferente a PlantDoc que es mayormente clima templado).
3. **Fase 2**: Serie temporal de poblaciones de insectos plaga en la zona — base de datos que
   nadie más tiene localmente.
4. **Fase 3**: Mapas de variabilidad espacial de lotes de la región → correlación suelo/rendimiento.
5. **Fase 4**: Conversaciones del asistente → aprendizaje del vocabulario y problemas reales
   del agricultor costeño (imposible de replicar sin presencia en campo).

Cada fase hace el producto más difícil de copiar. El hardware lo copia cualquiera.
Los datos propietarios de campo, no.
