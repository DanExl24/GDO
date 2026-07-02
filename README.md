# Sistema de Gestión de Datos Offline-Online (GDO)

Este proyecto es una aplicación híbrida (Web + Móvil Nativa Android) desarrollada con **Quasar Framework (Vue 3)** y **Capacitor**, soportada por un backend en **Express (Node.js)** con sincronización inteligente bidireccional entre una base de datos local (**SQLite / LocalStorage**) y una base de datos en la nube (**PostgreSQL**).

---

## 🛠️ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
* **Node.js** (v18 o superior recomendado)
* **Android Studio** (con SDK de Android configurado y un Emulador Android listo)
* Acceso a internet para conectar con la base de datos de PostgreSQL en la nube.

---

## 📋 Guía de Comandos para Desarrollo

El sistema consta de dos partes: el **Servidor (Backend)** y la **Aplicación (Frontend)**. El servidor debe estar siempre encendido para permitir la sincronización.

### 🔌 0. La Constante: El Servidor Backend
En una terminal independiente, inicia siempre el servidor:
```bash
npm run server
```
* *Nota:* El servidor escuchará en `0.0.0.0:3005`, permitiendo recibir peticiones locales de la PC y conexiones virtuales del emulador Android al mismo tiempo.

---

### 🖥️ Opción 1: Trabajar solo en PC (Modo Web)
Ideal para desarrollo ágil de la interfaz de usuario, maquetación y pruebas de lógica básica.

1. **Terminal 1:** Inicia el servidor:
   ```bash
   npm run server
   ```
2. **Terminal 2:** Inicia el frontend web en modo desarrollo:
   ```bash
   npx quasar dev
   ```
   * *Acceso:* Abre automáticamente tu navegador en `http://localhost:9000` (o similar) con recarga en vivo (*Hot Reload*).

---

### 📱 Opción 2: Trabajar solo en Móvil (Emulador Android)
Ideal para probar el comportamiento de almacenamiento local SQLite, estados de red nativos y diseño adaptado a celulares.

#### A) Modo Rápido (Desarrollo con Live-Reload ⚡ - Recomendado para programar)
Cualquier cambio guardado en el código se reflejará inmediatamente en el emulador sin necesidad de recompilar en Android Studio.

1. **Terminal 1:** Inicia el servidor:
   ```bash
   npm run server
   ```
2. **Terminal 2:** Levanta el entorno de desarrollo móvil:
   ```bash
   npx quasar dev -m capacitor -T android
   ```
3. **Android Studio:** Haz clic en el botón de **Play (Triángulo verde ▶️)** en la parte superior derecha para desplegar la app en tu emulador.

#### B) Modo Producción / Standalone (Pruebas Offline Reales 📴)
Instala la app de manera aislada en el dispositivo móvil, ideal para probar la sincronización desconectando físicamente el Wi-Fi del emulador.

1. **Terminal 1:** Inicia el servidor:
   ```bash
   npm run server
   ```
2. **Terminal 2:** Compila el bundle de producción nativo:
   ```bash
   npx quasar build -m capacitor -T android --ide
   ```
3. **Android Studio:** Haz clic en **Stop (Cuadrado rojo 🟥)** si tenías la app abierta, y luego en **Play (Triángulo verde ▶️)** para instalar la compilación final.

---

### 👥 Opción 3: Trabajar con PC y Móvil Simultáneamente
Ideal para verificar la consistencia de los datos y la reactivación/sincronización bidireccional en tiempo real entre múltiples dispositivos.

1. **Terminal 1 (Backend):** `npm run server`
2. **Terminal 2 (Frontend Web):** `npx quasar dev`
3. **Terminal 3 (Frontend Móvil):** `npx quasar dev -m capacitor -T android` *(o correr la app ya instalada en tu emulador)*.

---

## ⚙️ Arquitectura de Conectividad & Ajustes Realizados

Para garantizar el correcto funcionamiento del ecosistema híbrido local, se aplicaron las siguientes configuraciones de infraestructura móvil:

1. **Resolución Dinámica de API ([src/services/api.ts](src/services/api.ts)):**
   * En navegadores PC, conecta a `http://localhost:3005`.
   * En el Emulador de Android, detecta la plataforma nativa y redirige a la IP de bucle de retorno de Android Studio `http://10.0.2.2:3005`.

2. **Permisos de Texto Claro ([AndroidManifest.xml](src-capacitor/android/app/src/main/AndroidManifest.xml)):**
   * Se configuró `android:usesCleartextTraffic="true"` en la etiqueta `<application>` para permitir que el emulador Android se comunique vía HTTP tradicional con el servidor local de desarrollo (`http://10.0.2.2:3005`) sin ser bloqueado por las políticas de seguridad de red nativas de Android 9+.

3. **Esquema HTTP en WebView ([capacitor.config.json](src-capacitor/capacitor.config.json)):**
   * Se estableció `"androidScheme": "http"` dentro de la configuración del servidor local de Capacitor. Esto evita el error de **Mixed Content** (Contenido Mixto), permitiendo que la webapp cargada de forma local bajo HTTP pueda realizar peticiones API HTTP sin cifrar.

4. **Persistencia Híbrida con Fallback ([src/services/database.ts](src/services/database.ts)):**
   * La app utiliza SQLite nativo mediante `@capacitor-community/sqlite` al ejecutarse en dispositivos móviles Android.
   * Si por algún motivo el plugin nativo no está disponible o la app corre en navegador web de escritorio, el sistema hace un fallback automático y transparente hacia `localStorage`, asegurando que el flujo Offline-Online nunca se interrumpa.

---

## 🛠️ Resolución de Problemas Comunes (Troubleshooting)

### 🔴 Error: `EADDRINUSE: address already in use 0.0.0.0:3005`
* **Causa:** Ya tienes una instancia del servidor backend corriendo en segundo plano o en otra terminal en el puerto 3005.
* **Solución:** Cierra la terminal vieja o detén el proceso anterior presionando `Ctrl + C` antes de volver a ejecutar `npm run server`.

### 🟡 Advertencia Gradle: `Using flatDir should be avoided...`
* **Causa:** Es una advertencia estándar de Gradle generada por Capacitor para mantener compatibilidad con plugins antiguos de Cordova.
* **Solución:** Puede ignorarse de forma segura. No detendrá ni afectará de ninguna manera la compilación de la app nativa en Android Studio.

### 🔴 Error: `JAVA_HOME is not set and no 'java' command could be found`
* **Causa:** Intentaste compilar el proyecto Android directamente desde la terminal del sistema (`npx quasar build -m capacitor -T android`) pero tu sistema operativo no tiene la variable de entorno `JAVA_HOME` ni la ruta del compilador de Java (JDK) añadidas al `PATH`.
* **Solución 1 (Temporal - Solo en terminal actual de PowerShell):**
  Si deseas solucionar el error de forma inmediata en la terminal de comandos que tienes abierta, ejecuta:
  ```powershell
  $env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
  $env:Path += ";$env:JAVA_HOME\bin"
  ```
* **Solución 2 (Permanente para todo tu sistema Windows):**
  1. Presiona la tecla **Windows**, busca **"Variables de entorno"** y selecciona **"Editar las variables de entorno del sistema"**.
  2. Haz clic en el botón **"Variables de entorno..."** de la parte inferior.
  3. En **"Variables del sistema"** (lista de abajo), haz clic en **Nueva...**:
     * **Nombre:** `JAVA_HOME`
     * **Valor:** `C:\Program Files\Android\Android Studio\jbr` (esta es la ruta del JDK interno que trae Android Studio por defecto).
  4. Busca la variable **`Path`** en la misma lista del sistema, selecciónala, pulsa **Editar...**, haz clic en **Nuevo** e introduce: `%JAVA_HOME%\bin`.
  5. Haz clic en **Aceptar** en todas las ventanas, cierra todas las terminales abiertas y vuelve a abrir tu editor (VS Code o terminales) para recargar las variables del sistema.
* **Solución 3 (Compilación delegada por IDE):**
  Puedes compilar usando el parámetro `--ide`, lo cual delega la construcción del APK al entorno interno de Android Studio sin requerir variables globales en tu terminal:
  ```bash
  npx quasar build -m capacitor -T android --ide
  ```

