# Arquitectura de Sincronización en Tiempo Real (WebSockets)

Este documento describe el funcionamiento de la capa de comunicación bidireccional implementada en el sistema mediante **Socket.io**. Esta solución reemplaza el antiguo modelo de *HTTP Polling* continuo, reduciendo drásticamente la carga de red, ahorrando batería en dispositivos móviles y permitiendo que la interfaz de usuario reaccione instantáneamente a los cambios.

## 1. Conceptos Core del Sistema de Eventos

La arquitectura de WebSockets se encarga **exclusivamente de notificar y escuchar eventos** de estado en tiempo real, delegando el peso de la transferencia de información a las rutas REST convencionales (`/api/sync` y `/api/usuarios`). El socket actúa únicamente como el "timbre" que avisa cuándo hay que reaccionar.

### 1.1 Conexión y Autenticación
- Cuando un usuario inicia sesión (en web o móvil), el layout principal abre automáticamente una conexión WebSocket contra el servidor de NodeJS.
- Se emite el evento `register`, en el cual el cliente envía al servidor su `usuario_id`, `nombre` y su `role` (admin o user).
- El servidor guarda el estado del socket en memoria y notifica al resto de clientes sobre esta nueva conexión.

## 2. Eventos Principales Emitidos y Escuchados

### 🟢 Eventos de Red y Base de Datos
| Evento | Dirección | Descripción |
| :--- | :--- | :--- |
| `db-status` | Servidor -> Cliente | Informa a todos los clientes conectados si la base de datos de PostgreSQL está online o si ha caído (ej: DNS error en Render). Permite que la app cambie al modo *Offline* visualmente, incluso si hay internet pero la BD no responde. |

### 👤 Eventos de Usuarios y Presencia
| Evento | Dirección | Descripción |
| :--- | :--- | :--- |
| `register` | Cliente -> Servidor | Registra la identidad del usuario actual en la memoria del WebSocket del servidor. |
| `active-users` | Servidor -> Admin | Envía la lista completa de usuarios conectados. Escuchado únicamente por los administradores (AdminPage) para mostrar indicadores en vivo (`🟢`) sobre los avatares. |
| `user-connected` | Servidor -> Admin | Alerta puntual (Notificación Toast) indicando que "Juan Perez está en línea". |
| `user-disconnected` | Servidor -> Admin | Alerta puntual indicando que un usuario acaba de cerrar sesión o perdió su conexión de red. |

### 🔄 Eventos de Sincronización (Sync)
| Evento | Dirección | Descripción |
| :--- | :--- | :--- |
| `sync-status` | Cliente -> Servidor | El cliente que está ejecutando una sincronización avisa en qué paso va (`started`, `completed` o `error`), junto con la cantidad de cambios subidos. |
| `sync-started` | Servidor -> Admin | Transmite a los administradores que alguien comenzó a subir datos. |
| `sync-completed` | Servidor -> Admin | Muestra una notificación al administrador confirmando que un dispositivo X terminó de vaciar su cola offline con éxito. |

### 📊 Eventos de Re-hidratación de Datos (El Reemplazo del Polling)
| Evento | Dirección | Descripción |
| :--- | :--- | :--- |
| `data-updated` | Servidor -> Todos | **El evento más crítico.** Cuando cualquier usuario crea, modifica o elimina un dato vía API REST, o cuando se completa una sincronización offline exitosa (`sync-status: completed`), el servidor emite globalmente este evento. |

**¿Cómo reacciona el cliente a `data-updated`?**
Cuando el cliente (Vue/Quasar) escucha `data-updated` en el componente `UserPage` o `AdminPage`, ejecuta inmediatamente la función `loadUserData()` o `loadUsers()`, haciendo un fetch a la base de datos para traer los datos más frescos sin necesidad de que el usuario recargue manualmente el navegador.

## 3. Beneficios sobre el Polling Tradicional

1. **Eficiencia Extrema:** En lugar de hacer una petición HTTP (`GET /api/sync/pull`) cada 5 segundos y generar miles de consultas por hora, el sistema permanece 100% inactivo hasta que el servidor emite un pulso real.
2. **Logs Limpios:** Desaparecieron los logs ruidosos de la consola (`native CapacitorSQLite.run`, `setInterval` spam) ya que el chequeo constante dejó de existir.
3. **Consistencia Inmediata:** Si el administrador cambia un dato, la pantalla del celular del usuario (si está conectado) se actualizará en milisegundos, ofreciendo una experiencia mágica e imperceptible.
4. **Consciencia del Entorno (Presence):** Por primera vez, el administrador puede saber en tiempo real quién de sus trabajadores está actualmente conectado a la aplicación.
