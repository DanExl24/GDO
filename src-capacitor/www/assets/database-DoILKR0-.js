const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./esm-CdXItFak.js","./dist-DAO462gx.js","./preload-helper-iIio8xkS.js"])))=>i.map(i=>d[i]);
import { t as Capacitor } from "./dist-DAO462gx.js";
import { t as __vitePreload } from "./preload-helper-iIio8xkS.js";
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region src/services/database.ts
/**
* Servicio de base de datos local SQLite
*
* Maneja todas las operaciones CRUD locales y la tabla de cambios_pendientes
* para sincronización offline-online.
*
* NOTA: En modo web (development), usa localStorage como fallback.
* En modo Capacitor (Android), usa SQLite nativo.
*/
var LS_PREFIX = "ofonline_";
var DatabaseService = class {
	constructor() {
		_defineProperty(this, "isNative", false);
		_defineProperty(this, "db", null);
	}
	async initialize() {
		this.isNative = Capacitor.isNativePlatform();
		if (this.isNative) try {
			const { CapacitorSQLite } = await __vitePreload(async () => {
				const { CapacitorSQLite } = await import("./esm-CdXItFak.js");
				return { CapacitorSQLite };
			}, __vite__mapDeps([0,1,2]), import.meta.url);
			await CapacitorSQLite.createConnection({
				database: "ofonline_db",
				version: 1,
				encrypted: false,
				mode: "no-encryption"
			});
			await CapacitorSQLite.open({ database: "ofonline_db" });
			await CapacitorSQLite.execute({
				database: "ofonline_db",
				statements: `
            CREATE TABLE IF NOT EXISTS usuario (
              id INTEGER PRIMARY KEY,
              documento TEXT UNIQUE NOT NULL,
              nombre TEXT NOT NULL,
              apellido TEXT NOT NULL,
              telefono TEXT,
              direccion TEXT,
              password TEXT
            );

            CREATE TABLE IF NOT EXISTS historial_local (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              usuario_id INTEGER NOT NULL,
              campo TEXT NOT NULL,
              valor TEXT NOT NULL,
              version INTEGER NOT NULL DEFAULT 1,
              es_actual INTEGER NOT NULL DEFAULT 1,
              origen TEXT NOT NULL DEFAULT 'OFFLINE',
              fecha_creacion TEXT NOT NULL,
              fecha_ultima_activacion TEXT,
              veces_reutilizado INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS cambios_pendientes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              usuario_id INTEGER NOT NULL,
              campo TEXT NOT NULL,
              valor TEXT NOT NULL,
              fecha_creacion TEXT NOT NULL,
              sincronizado INTEGER NOT NULL DEFAULT 0
            );
          `
			});
			this.db = CapacitorSQLite;
			console.log("✅ SQLite inicializado correctamente");
		} catch (error) {
			console.error("❌ Error inicializando SQLite:", error);
			this.isNative = false;
		}
		if (!this.isNative) {
			console.log("📦 Usando localStorage como almacenamiento local (modo web)");
			this.initLocalStorage();
		}
	}
	initLocalStorage() {
		if (!localStorage.getItem(`${LS_PREFIX}usuarios`)) localStorage.setItem(`${LS_PREFIX}usuarios`, JSON.stringify([]));
		if (!localStorage.getItem(`${LS_PREFIX}historial`)) localStorage.setItem(`${LS_PREFIX}historial`, JSON.stringify([]));
		if (!localStorage.getItem(`${LS_PREFIX}pendientes`)) localStorage.setItem(`${LS_PREFIX}pendientes`, JSON.stringify([]));
	}
	async getUsuarios() {
		if (this.isNative && this.db) return (await this.db.query({
			database: "ofonline_db",
			statement: "SELECT * FROM usuario ORDER BY id ASC",
			values: []
		})).values || [];
		return JSON.parse(localStorage.getItem(`${LS_PREFIX}usuarios`) || "[]");
	}
	async getUsuarioByDocumento(documento) {
		return (await this.getUsuarios()).find((u) => u.documento === documento) || null;
	}
	async saveUsuarios(usuarios) {
		if (this.isNative && this.db) {
			await this.db.execute({
				database: "ofonline_db",
				statements: "DELETE FROM usuario"
			});
			for (const u of usuarios) await this.db.run({
				database: "ofonline_db",
				statement: "INSERT OR REPLACE INTO usuario (id, documento, nombre, apellido, telefono, direccion, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
				values: [
					u.id,
					u.documento,
					u.nombre,
					u.apellido,
					u.telefono || "",
					u.direccion || "",
					u.password || ""
				]
			});
			return;
		}
		localStorage.setItem(`${LS_PREFIX}usuarios`, JSON.stringify(usuarios));
	}
	async getHistorialLocal(usuarioId) {
		if (this.isNative && this.db) return ((await this.db.query({
			database: "ofonline_db",
			statement: "SELECT * FROM historial_local WHERE usuario_id = ? ORDER BY campo, version DESC",
			values: [usuarioId]
		})).values || []).map((r) => ({
			...r,
			es_actual: r.es_actual === 1
		}));
		return JSON.parse(localStorage.getItem(`${LS_PREFIX}historial`) || "[]").filter((h) => h.usuario_id === usuarioId).sort((a, b) => {
			if (a.campo !== b.campo) return a.campo.localeCompare(b.campo);
			return b.version - a.version;
		});
	}
	async getDatosActuales(usuarioId) {
		return (await this.getHistorialLocal(usuarioId)).filter((h) => h.es_actual);
	}
	async saveHistorialLocal(registros) {
		if (this.isNative && this.db) {
			for (const r of registros) await this.db.run({
				database: "ofonline_db",
				statement: `INSERT OR REPLACE INTO historial_local
            (usuario_id, campo, valor, version, es_actual, origen, fecha_creacion, fecha_ultima_activacion, veces_reutilizado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				values: [
					r.usuario_id,
					r.campo,
					r.valor,
					r.version,
					r.es_actual ? 1 : 0,
					r.origen,
					r.fecha_creacion,
					r.fecha_ultima_activacion || null,
					r.veces_reutilizado || 0
				]
			});
			return;
		}
		const currentHistorial = JSON.parse(localStorage.getItem(`${LS_PREFIX}historial`) || "[]");
		for (const r of registros) {
			const idx = currentHistorial.findIndex((h) => h.id === r.id);
			if (idx >= 0) currentHistorial[idx] = r;
			else currentHistorial.push(r);
		}
		localStorage.setItem(`${LS_PREFIX}historial`, JSON.stringify(currentHistorial));
	}
	async syncLocalHistoryWithServer(usuarioId, serverHistory) {
		if (this.isNative && this.db) {
			await this.db.run({
				database: "ofonline_db",
				statement: "DELETE FROM historial_local WHERE usuario_id = ?",
				values: [usuarioId]
			});
			for (const r of serverHistory) await this.db.run({
				database: "ofonline_db",
				statement: `INSERT OR REPLACE INTO historial_local
            (id, usuario_id, campo, valor, version, es_actual, origen, fecha_creacion, fecha_ultima_activacion, veces_reutilizado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				values: [
					r.id,
					r.usuario_id,
					r.campo,
					r.valor,
					r.version,
					r.es_actual ? 1 : 0,
					r.origen,
					r.fecha_creacion,
					r.fecha_ultima_activacion || null,
					r.veces_reutilizado || 0
				]
			});
			return;
		}
		const updatedHistory = [...JSON.parse(localStorage.getItem(`${LS_PREFIX}historial`) || "[]").filter((h) => h.usuario_id !== usuarioId), ...serverHistory];
		localStorage.setItem(`${LS_PREFIX}historial`, JSON.stringify(updatedHistory));
	}
	async updateUsuarioColumnaLocal(usuarioId, campo, valor) {
		if (![
			"documento",
			"nombre",
			"apellido",
			"telefono",
			"direccion",
			"password"
		].includes(campo)) return;
		if (this.isNative && this.db) await this.db.run({
			database: "ofonline_db",
			statement: `UPDATE usuario SET ${campo} = ? WHERE id = ?`,
			values: [valor, usuarioId]
		});
		else {
			const usuarios = JSON.parse(localStorage.getItem(`${LS_PREFIX}usuarios`) || "[]");
			const uIdx = usuarios.findIndex((u) => u.id === usuarioId);
			if (uIdx >= 0) {
				usuarios[uIdx][campo] = valor;
				localStorage.setItem(`${LS_PREFIX}usuarios`, JSON.stringify(usuarios));
			}
		}
	}
	async updateDatoLocal(usuarioId, campo, valor) {
		const fechaCreacion = (/* @__PURE__ */ new Date()).toISOString();
		await this.updateUsuarioColumnaLocal(usuarioId, campo, valor);
		await this.addCambioPendiente({
			usuario_id: usuarioId,
			campo,
			valor,
			fecha_creacion: fechaCreacion,
			sincronizado: false
		});
	}
	async addCambioPendiente(cambio) {
		if (this.isNative && this.db) {
			await this.db.run({
				database: "ofonline_db",
				statement: `INSERT INTO cambios_pendientes (usuario_id, campo, valor, fecha_creacion, sincronizado)
                     VALUES (?, ?, ?, ?, 0)`,
				values: [
					cambio.usuario_id,
					cambio.campo,
					cambio.valor,
					cambio.fecha_creacion
				]
			});
			return;
		}
		const pendientes = JSON.parse(localStorage.getItem(`${LS_PREFIX}pendientes`) || "[]");
		pendientes.push({
			...cambio,
			id: Date.now()
		});
		localStorage.setItem(`${LS_PREFIX}pendientes`, JSON.stringify(pendientes));
	}
	async getCambiosPendientes() {
		if (this.isNative && this.db) return (await this.db.query({
			database: "ofonline_db",
			statement: "SELECT * FROM cambios_pendientes WHERE sincronizado = 0 ORDER BY id ASC",
			values: []
		})).values || [];
		return JSON.parse(localStorage.getItem(`${LS_PREFIX}pendientes`) || "[]").filter((p) => !p.sincronizado);
	}
	async marcarSincronizados() {
		if (this.isNative && this.db) {
			await this.db.execute({
				database: "ofonline_db",
				statements: "DELETE FROM cambios_pendientes WHERE sincronizado = 0"
			});
			return;
		}
		localStorage.setItem(`${LS_PREFIX}pendientes`, JSON.stringify([]));
	}
	async contarPendientes() {
		return (await this.getCambiosPendientes()).length;
	}
};
var databaseService = new DatabaseService();
//#endregion
export { _defineProperty as n, databaseService as t };

//# sourceMappingURL=database-DoILKR0-.js.map