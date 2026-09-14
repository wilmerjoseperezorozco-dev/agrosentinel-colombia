/*
 * AgroSentinel Colombia — Firmware nodo de campo v1.0
 * Placa: ESP32 Dev Module (Arduino IDE 2.x, core esp32 by Espressif)
 *
 * Sensores:
 *   - Humedad de suelo capacitivo v2.0  → GPIO 34 (ADC1, salida analógica AOUT)
 *   - DHT22 temp/HR ambiente            → GPIO 4  (con resistencia 10k a 3.3V si el módulo no la trae)
 *   - DS18B20 temperatura de suelo      → GPIO 15 (resistencia 4.7k entre DATA y 3.3V)
 *   - OLED SSD1306 128x64 I2C           → SDA 21, SCL 22
 *
 * Librerías (Gestor de librerías del IDE):
 *   "DHT sensor library" (Adafruit) + "Adafruit Unified Sensor"
 *   "OneWire" + "DallasTemperature"
 *   "Adafruit SSD1306" + "Adafruit GFX"
 *
 * El nodo funciona SOLO (semáforo en pantalla) y ADEMÁS reporta al servidor
 * si hay WiFi. Sin WiFi sigue funcionando y midiendo.
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ================= CONFIGURACIÓN — EDITAR ESTAS LÍNEAS =================
const char* WIFI_SSID     = "TU_WIFI";          // nombre de tu red
const char* WIFI_PASS     = "TU_CLAVE";         // contraseña
const char* SERVIDOR_URL  = "http://192.168.1.15:3300/api/lecturas"; // IP de tu PC (ipconfig)
const char* NOMBRE_NODO   = "matera-aji";       // identificador único de este nodo
const char* CULTIVO       = "aji";              // melon | aji | tomate | maiz | yuca

// Calibración del sensor capacitivo (ver GUIA: sensor al aire y en agua)
const int   CAL_AIRE      = 2850;  // lectura ADC con el sensor seco al aire
const int   CAL_AGUA      = 1150;  // lectura ADC con el sensor sumergido en agua

// Umbrales del cultivo (deben coincidir con la tabla del servidor)
const float UMBRAL_ROJO     = 40.0;  // < esto → REGAR
const float UMBRAL_AMARILLO = 50.0;  // < esto → PRONTO
const float UMBRAL_EXCESO   = 90.0;  // > esto → EXCESO

const unsigned long INTERVALO_MEDICION_MS = 15UL * 60UL * 1000UL; // 15 min
const unsigned long INTERVALO_PANTALLA_MS = 4000;                 // rota pantallas cada 4 s
// ========================================================================

#define PIN_SUELO_ADC   34
#define PIN_DHT         4
#define PIN_DS18B20     15
#define DHT_TIPO        DHT22

DHT dht(PIN_DHT, DHT_TIPO);
OneWire oneWire(PIN_DS18B20);
DallasTemperature ds18b20(&oneWire);
Adafruit_SSD1306 oled(128, 64, &Wire, -1);

struct Lectura {
  float humedadSuelo = -1;  // % calibrado
  float tempAire     = NAN;
  float humAire      = NAN;
  float tempSuelo    = NAN;
  bool  valida       = false;
};

Lectura ultima;
unsigned long tUltimaMedicion = 0;
unsigned long tUltimaPantalla = 0;
int pantallaActual = 0;
bool wifiOk = false;

// ---------- lectura robusta del sensor de suelo: mediana de 15 muestras ----------
float leerHumedadSuelo() {
  const int N = 15;
  int muestras[N];
  for (int i = 0; i < N; i++) { muestras[i] = analogRead(PIN_SUELO_ADC); delay(20); }
  // ordenamiento por inserción (N pequeño) → mediana descarta picos de ruido
  for (int i = 1; i < N; i++) {
    int v = muestras[i], j = i - 1;
    while (j >= 0 && muestras[j] > v) { muestras[j + 1] = muestras[j]; j--; }
    muestras[j + 1] = v;
  }
  int mediana = muestras[N / 2];
  float pct = 100.0f * (CAL_AIRE - mediana) / (float)(CAL_AIRE - CAL_AGUA);
  return constrain(pct, 0.0f, 100.0f);
}

Lectura medir() {
  Lectura l;
  l.humedadSuelo = leerHumedadSuelo();
  l.tempAire = dht.readTemperature();
  l.humAire  = dht.readHumidity();
  ds18b20.requestTemperatures();
  float ts = ds18b20.getTempCByIndex(0);
  l.tempSuelo = (ts > -50 && ts < 80) ? ts : NAN;  // -127 = sensor desconectado
  l.valida = l.humedadSuelo >= 0;
  Serial.printf("[medicion] suelo=%.1f%%  Taire=%.1fC  HR=%.0f%%  Tsuelo=%.1fC\n",
                l.humedadSuelo, l.tempAire, l.humAire, l.tempSuelo);
  return l;
}

// ---------- semáforo local (funciona sin WiFi) ----------
const char* estadoSemaforo(float h) {
  if (h > UMBRAL_EXCESO)   return "EXCESO";
  if (h < UMBRAL_ROJO)     return "REGAR";
  if (h < UMBRAL_AMARILLO) return "PRONTO";
  return "OK";
}

// ---------- pantalla ----------
void mostrarPantalla(const Lectura& l) {
  oled.clearDisplay();
  oled.setTextColor(SSD1306_WHITE);
  if (pantallaActual == 0) {
    // Pantalla 1: el semáforo — lo único que el agricultor necesita
    oled.setTextSize(1);
    oled.setCursor(0, 0);
    oled.printf("%s  %s", NOMBRE_NODO, wifiOk ? "WiFi" : "----");
    oled.setTextSize(3);
    oled.setCursor(8, 20);
    oled.print(estadoSemaforo(l.humedadSuelo));
    oled.setTextSize(2);
    oled.setCursor(30, 48);
    oled.printf("%.0f%%", l.humedadSuelo);
  } else {
    // Pantalla 2: detalle técnico
    oled.setTextSize(1);
    oled.setCursor(0, 0);  oled.printf("Suelo:  %.1f %%", l.humedadSuelo);
    oled.setCursor(0, 14); oled.printf("T aire: %.1f C", l.tempAire);
    oled.setCursor(0, 28); oled.printf("HR:     %.0f %%", l.humAire);
    oled.setCursor(0, 42); oled.printf("T suelo:%.1f C", l.tempSuelo);
    oled.setCursor(0, 56); oled.printf("WiFi: %s", wifiOk ? WiFi.localIP().toString().c_str() : "sin conexion");
  }
  oled.display();
}

// ---------- WiFi con reintento no bloqueante ----------
void conectarWifi() {
  if (WiFi.status() == WL_CONNECTED) { wifiOk = true; return; }
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  unsigned long inicio = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - inicio < 10000) delay(250);
  wifiOk = WiFi.status() == WL_CONNECTED;
  Serial.printf("[wifi] %s\n", wifiOk ? WiFi.localIP().toString().c_str() : "sin conexion (el nodo sigue solo)");
}

// ---------- envío al servidor con 2 reintentos ----------
void enviarLectura(const Lectura& l) {
  if (!wifiOk) return;
  char json[240];
  snprintf(json, sizeof(json),
    "{\"nodo\":\"%s\",\"cultivo\":\"%s\",\"humedad_suelo\":%.1f,\"temp_aire\":%.1f,"
    "\"hum_aire\":%.1f,\"temp_suelo\":%.1f}",
    NOMBRE_NODO, CULTIVO, l.humedadSuelo,
    isnan(l.tempAire) ? 0 : l.tempAire,
    isnan(l.humAire) ? 0 : l.humAire,
    isnan(l.tempSuelo) ? 0 : l.tempSuelo);

  for (int intento = 1; intento <= 3; intento++) {
    HTTPClient http;
    http.begin(SERVIDOR_URL);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(5000);
    int codigo = http.POST((uint8_t*)json, strlen(json));
    http.end();
    Serial.printf("[envio] intento %d → HTTP %d\n", intento, codigo);
    if (codigo == 200) return;
    delay(1500 * intento);
  }
}

void setup() {
  Serial.begin(115200);
  analogSetPinAttenuation(PIN_SUELO_ADC, ADC_11db);  // rango completo 0-3.3V
  dht.begin();
  ds18b20.begin();
  if (!oled.begin(SSD1306_SWITCHCAPVCC, 0x3C))
    Serial.println("[oled] no detectada en 0x3C (probar 0x3D)");
  oled.clearDisplay();
  oled.setTextColor(SSD1306_WHITE);
  oled.setTextSize(2);
  oled.setCursor(0, 24);
  oled.print("AgroMon v1");
  oled.display();

  conectarWifi();
  ultima = medir();
  enviarLectura(ultima);
  tUltimaMedicion = millis();
}

void loop() {
  // medir y reportar cada 15 min
  if (millis() - tUltimaMedicion >= INTERVALO_MEDICION_MS) {
    tUltimaMedicion = millis();
    conectarWifi();
    ultima = medir();
    enviarLectura(ultima);
  }
  // rotar pantallas cada 4 s
  if (millis() - tUltimaPantalla >= INTERVALO_PANTALLA_MS) {
    tUltimaPantalla = millis();
    pantallaActual = (pantallaActual + 1) % 2;
    mostrarPantalla(ultima);
  }
  delay(50);
}

/*
 * MODO BATERÍA (etapa 2): para autonomía de meses con panel pequeño,
 * quitar la OLED permanente y usar deep sleep:
 *   esp_sleep_enable_timer_wakeup(15ULL * 60ULL * 1000000ULL);
 *   esp_deep_sleep_start();
 * al final de setup() (todo el trabajo se hace en setup, loop queda vacío).
 * Consumo: ~10 µA dormido vs ~80 mA despierto.
 */
