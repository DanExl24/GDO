**Sistema de Gestión de Datos Offline-Online**

**1. Objetivo**

Desarrollar un sistema de gestión de información personal que permita a
los usuarios trabajar tanto **sin conexión a Internet (Offline)** como
**con conexión (Online)**.

El sistema deberá sincronizar automáticamente la información almacenada
localmente con la base de datos global cuando se recupere la conexión,
garantizando la integridad de los datos y conservando el historial
completo de modificaciones realizadas por cada usuario.

---

**2. Tecnologías**

---

**Componente** **Tecnología**

---

Frontend Quasar Framework

Aplicación móvil Capacitor

Lenguaje TypeScript

Base de datos SQLite
local

Base de datos PostgreSQL
global (Render)

Comunicación API REST

---

---

**3. Arquitectura General**

El sistema funcionará bajo dos estados.

**3.1 Modo Offline**

Cuando el dispositivo no disponga de conexión a Internet, todas las
operaciones realizadas por el usuario serán almacenadas en SQLite.

**Flujo**

Usuario\
│\
▼\
Interfaz (Quasar)\
│\
▼\
SQLite\
│\
▼\
Datos pendientes de sincronización

Durante este modo el usuario podrá:

- Consultar información previamente sincronizada.

- Modificar su información personal.

- Registrar nuevos cambios.

- Continuar utilizando la aplicación sin conexión.

Los cambios permanecerán almacenados localmente hasta que exista
conexión.

---

**3.2 Modo Online**

Cuando el dispositivo detecte acceso a Internet, iniciará
automáticamente el proceso de sincronización.

**Flujo**

SQLite\
│\
▼\
Obtención de cambios pendientes\
│\
▼\
API REST\
│\
▼\
Validación\
│\
▼\
Aplicación de reglas de negocio\
│\
▼\
PostgreSQL

Durante la sincronización:

1.  Se recuperan todos los cambios almacenados en SQLite.

2.  Los cambios son enviados al servidor.

3.  El servidor valida la información recibida.

4.  Se actualiza la base de datos global.

5.  Los registros sincronizados se marcan como enviados en SQLite.

---

**4. Regla General de Negocio**

"Toda modificación realizada en modo Offline será considerada la modificación más reciente realizada por el usuario. Sin embargo, el número de versión correspondiente será asignado únicamente por el servidor durante el proceso de sincronización

Cuando durante la sincronización un dato ya exista en PostgreSQL:

1.  El registro actual dejará de ser el vigente.

2.  Dicho registro permanecerá almacenado como parte del historial.

3.  El nuevo dato recibido desde SQLite se convertirá en el registro
    vigente.

4.  Ningún dato será eliminado físicamente.

Esta estrategia garantiza la conservación completa del historial de
modificaciones realizadas por el usuario.

---

**5. Modelo de Datos**

**Tabla Usuario**

---

**Campo** **Tipo**

---

id SERIAL

documento VARCHAR(50) (Unique)

nombre VARCHAR(100)

apellido VARCHAR(100)

telefono VARCHAR(20)

direccion VARCHAR(100)

password VARCHAR(100)

---

Esta tabla almacena la información principal del usuario, incluyendo los datos de contacto y la contraseña de autenticación.

**Tabla Historial_Usuario**

Esta tabla almacenará todos los cambios realizados sobre cualquier dato
personal del usuario.

---

**Campo** **Tipo**

---

id SERIAL

usuario_id INTEGER

campo VARCHAR(50)

valor TEXT

version INTEGER

es_actual BOOLEAN

origen VARCHAR(20)

fecha_creacion TIMESTAMPTZ

fecha_sincronizacion TIMESTAMPTZ

---

---

**Descripción de los campos**

**usuario_id**

Identificador del usuario propietario del dato.

---

**campo**

Indica qué atributo está siendo almacenado.

Ejemplos:

telefono\
direccion\
nombre\
apellido\
documento\
password

**valor**

Contiene el valor correspondiente al atributo.

Ejemplos:

3104567890\
\
Cra 12 #45-67\
\
correo@correo.com\
\
Florencia

---

**version**

Número de versión del dato.

Cada modificación incrementará este valor.

---

**es_actual**

Indica si el registro representa la versión vigente del dato.

Valores posibles:

TRUE\
FALSE

Solo podrá existir un registro con **es_actual = TRUE** para cada
combinación:

(usuario_id, campo)

---

**fecha_creacion**

Fecha en la que fue registrada la modificación.

---

**6. Sincronización**

Cuando exista conexión:

SQLite\
\
↓\
\
Cambios pendientes\
\
↓\
\
API REST\
\
↓\
\
Servidor\
\
↓\
\
Historial_Usuario\
\
↓\
\
Actualizar registro vigente

Proceso realizado por el servidor:

1.  Recibir el cambio.

2.  Buscar el registro actual del mismo campo.

3.  Marcar dicho registro como **es_actual = FALSE**.

4.  Insertar el nuevo valor como **es_actual = TRUE**.

5.  Incrementar el número de versión.

---

**7. Ejemplo**

Estado inicial:

---

**Campo** **Valor** **Versión** **Actual**

---

teléfono 3101111111 1 TRUE

---

El usuario trabaja sin conexión y modifica el teléfono.

Nuevo valor:

3199999999

Después de sincronizar:

---

**Campo** **Valor** **Versión** **Actual**

---

teléfono 3101111111 1 FALSE

teléfono 3199999999 2 TRUE

---

Posteriormente realiza otra modificación:

3008888888

Resultado:

---

**Campo** **Valor** **Versión** **Actual**

---

teléfono 3101111111 1 FALSE

teléfono 3199999999 2 FALSE

teléfono 3008888888 3 TRUE

---

---

**8. Interfaces TypeScript**

export interface Usuario {\
id: number;\
documento: string;\
nombre: string;\
apellido: string;\
telefono?: string;\
direccion?: string;\
password?: string;\
}\
\
export interface HistorialUsuario {\
id: number;\
usuario_id: number;\
campo: string;\
valor: string;\
version: number;\
es_actual: boolean;\
origen: string;\
fecha_creacion: string;\
fecha_sincronizacion?: string | null;\
}

Estas interfaces garantizan el tipado de los datos entre el frontend y
el backend.

---

**9. Paneles del Sistema**

**Administrador**

Funciones:

- Consultar usuarios.

- Crear usuarios.

- Actualizar información de cualquier usuario.

- Eliminar usuarios.

---

**Usuario**

Funciones:

- Consultar su información personal.

- Actualizar su información.

- Validación mediante documento de identidad.

---

**10. Requisitos Funcionales**

**RF-01.** El sistema deberá permitir al administrador crear usuarios.

**RF-02.** El sistema deberá permitir al administrador consultar la
información de todos los usuarios.

**RF-03.** El sistema deberá permitir al administrador actualizar la
información de cualquier usuario.

**RF-04.** El sistema deberá permitir al administrador eliminar
usuarios.

**RF-05.** El sistema deberá permitir a cada usuario consultar su
información personal.

**RF-06.** El sistema deberá permitir a cada usuario actualizar sus
datos personales.

**RF-07.** El sistema deberá sincronizar automáticamente la información
almacenada en SQLite cuando exista conexión a Internet.

**RF-08.** El sistema deberá conservar el historial completo de
modificaciones realizadas sobre cada dato personal.

**RF-09.** El sistema deberá garantizar que únicamente exista un
registro vigente (es_actual = TRUE) por cada campo perteneciente a un
usuario.

**RF-10.** El sistema deberá mantener la integridad de la información
durante los procesos de sincronización.

**RF-11.** El sistema deberá contar con un sistema de autenticación
mediante inicio de sesión.

---

---

**Campo** **Tipo** **Propósito**

---

origen VARCHAR(20) Indica si el registro fue creado en
OFFLINE o ONLINE.

fecha_sincronizacion TIMESTAMPTZ Registra cuándo el cambio fue
NULL sincronizado con la base de datos
global.

---

---

**11. Características Avanzadas Implementadas**

- **Autenticación y Seguridad:** El sistema valida credenciales mediante contraseñas cifradas. Los administradores ingresan con contraseñas seguras y los usuarios regulares tienen una contraseña propia almacenada en la tabla `usuario` (`password`), la cual se valida de forma remota (modo online) o contrastando con la caché local cifrada (modo offline).
- **Monitoreo de Conexión en Caliente (Polling):** El frontend realiza una comprobación automatizada (polling) en segundo plano cada 6 segundos hacia el endpoint `/api/health` del servidor local, el cual verifica en vivo la conexión con el servidor y la base de datos PostgreSQL de Render. Esto permite que el navegador cambie entre estados Online/Offline instantáneamente y dispare auto-sincronizaciones en caliente sin necesidad de recargar la página.
- **Modal de Sincronización Interactivo:** Al pulsar sincronizar en el header, un cuadro de diálogo detallado muestra una consola de logs en tiempo real. Ésta enumera secuencialmente cada campo procesado, el valor subido y el número de versión generado, acompañado por una animación rotatoria de progreso.
- **Rango y Jerarquía de Versiones:** El historial de cambios calcula el rango cronológico relativo para cada campo: la última versión válida se etiqueta con un chip de color teal destacado (**PRINCIPAL**), mientras que los cambios anteriores se etiquetan con chips de color gris (**SECUNDARIO**, **TERCIARIO**, **CUATERNARIO**, etc.), manteniendo el historial ordenado e íntegro.

---

# Reglas de Negocio Generales del Sistemas

# RN-01. Prioridad de la información Offline

Toda modificación realizada por un usuario en modo Offline será considerada la versión más reciente de la información durante el proceso de sincronización.

Cuando el dispositivo recupere la conexión a Internet, el sistema enviará los cambios almacenados en SQLite a PostgreSQL. Si existe un conflicto entre la información local y la almacenada en la base de datos global, se dará prioridad a los datos provenientes del almacenamiento local, por representar la última modificación realizada por el usuario.

# RN-02. Conservación del historial

El sistema no eliminará físicamente ninguna modificación realizada sobre los datos personales del usuario.

Cada cambio permanecerá registrado en la tabla Historial_Usuario, permitiendo mantener un historial completo de la evolución de cada atributo.

# RN-03. Existencia de un único registro vigente

Para cada combinación (usuario, campo) únicamente podrá existir un registro marcado como vigente.

Esto se representará mediante el atributo:

es_actual = TRUE

Todos los registros restantes deberán permanecer con:

es_actual = FALSE

# RN-04. Creación de nuevas versiones

Cuando un usuario actualice un dato personal cuyo valor no exista previamente en el historial correspondiente, el sistema deberá:

Marcar el registro actualmente vigente como histórico (es_actual = FALSE).
Crear un nuevo registro en Historial_Usuario.
Asignar un nuevo número de versión consecutivo.
Marcar el nuevo registro como vigente (es_actual = TRUE).

De esta manera, cada versión representará la primera aparición de un valor único dentro del historial del usuario.

# RN-05. Reutilización de valores históricos

Cuando un usuario intente registrar un valor que ya exista previamente en su historial para el mismo campo, el sistema no generará una nueva versión.

En su lugar deberá:

Identificar el registro histórico correspondiente.
Informar al usuario que dicho valor ya fue utilizado anteriormente, indicando como mínimo:
Número de versión.
Estado actual del registro.
Solicitar confirmación para reutilizar el valor.
Si el usuario confirma:
El registro histórico conservará su número de versión original.
El registro histórico será marcado como vigente (es_actual = TRUE).
El registro que anteriormente era vigente será marcado como histórico (es_actual = FALSE).
No se creará un nuevo registro en la base de datos.

Esta regla evita la duplicación de información y garantiza que cada versión represente un valor único dentro del historial del usuario.

# RN-06. Reactivación de registros históricos

Cada vez que un registro histórico vuelva a convertirse en el registro vigente, el sistema deberá actualizar su información de reutilización.

Para ello se propone incorporar los siguientes atributos en la tabla Historial_Usuario:

Campo Descripción
fecha_ultima_activacion Fecha y hora en que el registro fue reactivado como vigente por última vez.
veces_reutilizado Número de veces que el registro ha sido reactivado como dato vigente.

Estos atributos permitirán mantener un historial más completo del ciclo de vida de cada valor registrado.

# RN-07. Integridad del historial

El número de versión asignado a un registro será permanente e inmutable.

La reutilización de un valor histórico no modificará su número de versión, ya que este representa el momento en que dicho valor fue registrado por primera vez.

En consecuencia, un registro de versión antigua podrá convertirse nuevamente en el registro vigente sin alterar la secuencia histórica del sistema.

# RN-08. Asignación centralizada de versiones

El número de versión de un registro será asignado exclusivamente por el servidor durante el proceso de sincronización.

Los registros creados o modificados en modo Offline no deberán generar ni modificar el número de versión mientras permanezcan almacenados en SQLite.

Durante este estado, SQLite únicamente conservará la información necesaria para identificar el cambio realizado por el usuario y marcarlo como pendiente de sincronización.

Cuando el dispositivo recupere la conexión a Internet y el servidor procese el cambio, este deberá:

Verificar si el valor recibido ya existe en el historial del usuario.
Si el valor ya existe, aplicar la RN-05 (Reutilización de valores históricos).
Si el valor no existe, generar una nueva versión consecutiva.
Registrar el origen del cambio (OFFLINE u ONLINE).
Retornar al dispositivo la información actualizada del registro.

De esta manera, el servidor será el único responsable de mantener la secuencia histórica de versiones, garantizando que no existan versiones duplicadas ni inconsistencias entre los dispositivos sincronizados.

# RN-09. Trazabilidad del origen de los cambios

El sistema deberá registrar el origen desde el cual fue creada cada versión del historial.

Para ello, cada registro de la tabla Historial_Usuario deberá almacenar el atributo:

Campo Descripción
origen Indica si el registro fue generado en modo OFFLINE o ONLINE.

El atributo origen tendrá fines de auditoría y trazabilidad, por lo que no participará en la asignación del número de versión ni modificará la secuencia histórica del registro.

En consecuencia:

La secuencia de versiones será única, continua e independiente del origen del cambio.
El origen permitirá conocer el contexto en el que fue creada cada versión sin afectar la integridad del historial.

# Internal API:

postgresql://ofonline_user:ByVHdFGasYDHWbDg6Ro4ZYg8SeO7Fa8H@dpg-d8vf4orsq97s7389lgog-a/ofonline

# External API:

postgresql://ofonline_user:ByVHdFGasYDHWbDg6Ro4ZYg8SeO7Fa8H@dpg-d8vf4orsq97s7389lgog-a.virginia-postgres.render.com/ofonline
