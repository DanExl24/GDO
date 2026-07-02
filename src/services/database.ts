/**
 * Servicio de base de datos local SQLite
 *
 * Maneja todas las operaciones CRUD locales y la tabla de cambios_pendientes
 * para sincronización offline-online.
 *
 * NOTA: En modo web (development), usa localStorage como fallback.
 * En modo Capacitor (Android), usa SQLite nativo.
 */

import { Capacitor } from '@capacitor/core';

export interface Usuario {
  id: number;
  documento: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  direccion?: string;
  password?: string;
}
export interface HistorialUsuario {
  id: number;
  usuario_id: number;
  campo: string;
  valor: string;
  version: number;
  es_actual: boolean;
  origen: string;
  fecha_creacion: string;
  fecha_sincronizacion?: string | null;
  fecha_ultima_activacion?: string | null;
  veces_reutilizado?: number;
}

export interface CambioPendiente {
  id?: number;
  usuario_id: number;
  campo: string;
  valor: string;
  fecha_creacion: string;
  sincronizado: boolean;
}

// Key prefix for localStorage fallback
const LS_PREFIX = 'ofonline_';

class DatabaseService {
  private isNative = false;
  private db: unknown = null;

  async initialize(): Promise<void> {
    this.isNative = Capacitor.isNativePlatform();

    if (this.isNative) {
      try {
        const { CapacitorSQLite } = await import('@capacitor-community/sqlite');

        await CapacitorSQLite.createConnection({
          database: 'ofonline_db',
          version: 1,
          encrypted: false,
          mode: 'no-encryption',
        });

        await CapacitorSQLite.open({ database: 'ofonline_db' });

        // Crear tablas
        await CapacitorSQLite.execute({
          database: 'ofonline_db',
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
          `,
        });

        this.db = CapacitorSQLite;
        console.log('✅ SQLite inicializado correctamente');
      } catch (error) {
        console.error('❌ Error inicializando SQLite:', error);
        this.isNative = false;
      }
    }

    if (!this.isNative) {
      console.log('📦 Usando localStorage como almacenamiento local (modo web)');
      this.initLocalStorage();
    }
  }

  private initLocalStorage(): void {
    if (!localStorage.getItem(`${LS_PREFIX}usuarios`)) {
      localStorage.setItem(`${LS_PREFIX}usuarios`, JSON.stringify([]));
    }
    if (!localStorage.getItem(`${LS_PREFIX}historial`)) {
      localStorage.setItem(`${LS_PREFIX}historial`, JSON.stringify([]));
    }
    if (!localStorage.getItem(`${LS_PREFIX}pendientes`)) {
      localStorage.setItem(`${LS_PREFIX}pendientes`, JSON.stringify([]));
    }
  }

  // ==============================
  // Usuarios
  // ==============================

  async getUsuarios(): Promise<Usuario[]> {
    if (this.isNative && this.db) {
      const result = await (this.db as { query: Function }).query({
        database: 'ofonline_db',
        statement: 'SELECT * FROM usuario ORDER BY id ASC',
        values: [],
      });
      return result.values || [];
    }

    return JSON.parse(localStorage.getItem(`${LS_PREFIX}usuarios`) || '[]');
  }

  async getUsuarioByDocumento(documento: string): Promise<Usuario | null> {
    const usuarios = await this.getUsuarios();
    return usuarios.find(u => u.documento === documento) || null;
  }

  async saveUsuarios(usuarios: Usuario[]): Promise<void> {
    if (this.isNative && this.db) {
      // Limpiar y reinsertar
      await (this.db as { execute: Function }).execute({
        database: 'ofonline_db',
        statements: 'DELETE FROM usuario',
      });

      for (const u of usuarios) {
        await (this.db as { run: Function }).run({
          database: 'ofonline_db',
          statement: 'INSERT OR REPLACE INTO usuario (id, documento, nombre, apellido, telefono, direccion, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
          values: [u.id, u.documento, u.nombre, u.apellido, u.telefono || '', u.direccion || '', u.password || ''],
        });
      }
      return;
    }

    localStorage.setItem(`${LS_PREFIX}usuarios`, JSON.stringify(usuarios));
  }


  // ==============================
  // Historial Local
  // ==============================

  async getHistorialLocal(usuarioId: number): Promise<HistorialUsuario[]> {
    if (this.isNative && this.db) {
      const result = await (this.db as { query: Function }).query({
        database: 'ofonline_db',
        statement: 'SELECT * FROM historial_local WHERE usuario_id = ? ORDER BY campo, version DESC',
        values: [usuarioId],
      });
      return (result.values || []).map((r: Record<string, unknown>) => ({
        ...r,
        es_actual: r.es_actual === 1,
      }));
    }

    const historial: HistorialUsuario[] = JSON.parse(
      localStorage.getItem(`${LS_PREFIX}historial`) || '[]'
    );
    return historial
      .filter(h => h.usuario_id === usuarioId)
      .sort((a, b) => {
        if (a.campo !== b.campo) return a.campo.localeCompare(b.campo);
        return b.version - a.version;
      });
  }

  async getDatosActuales(usuarioId: number): Promise<HistorialUsuario[]> {
    const historial = await this.getHistorialLocal(usuarioId);
    return historial.filter(h => h.es_actual);
  }

  async saveHistorialLocal(registros: HistorialUsuario[]): Promise<void> {
    if (this.isNative && this.db) {
      for (const r of registros) {
        await (this.db as { run: Function }).run({
          database: 'ofonline_db',
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
          ],
        });
      }
      return;
    }

    const currentHistorial: HistorialUsuario[] = JSON.parse(
      localStorage.getItem(`${LS_PREFIX}historial`) || '[]'
    );
    for (const r of registros) {
      const idx = currentHistorial.findIndex(h => h.id === r.id);
      if (idx >= 0) {
        currentHistorial[idx] = r;
      } else {
        currentHistorial.push(r);
      }
    }
    localStorage.setItem(`${LS_PREFIX}historial`, JSON.stringify(currentHistorial));
  }

  async syncLocalHistoryWithServer(usuarioId: number, serverHistory: HistorialUsuario[]): Promise<void> {
    if (this.isNative && this.db) {
      // 1. Limpiar historial local existente para este usuario
      await (this.db as { run: Function }).run({
        database: 'ofonline_db',
        statement: 'DELETE FROM historial_local WHERE usuario_id = ?',
        values: [usuarioId],
      });

      // 2. Insertar todos los registros del servidor con sus IDs y valores oficiales
      for (const r of serverHistory) {
        await (this.db as { run: Function }).run({
          database: 'ofonline_db',
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
          ],
        });
      }
      return;
    }

    // En ambiente web (localStorage), limpiar registros viejos del usuario e inyectar copia del servidor
    const allHistory: HistorialUsuario[] = JSON.parse(
      localStorage.getItem(`${LS_PREFIX}historial`) || '[]'
    );
    const otherUsersHistory = allHistory.filter(h => h.usuario_id !== usuarioId);
    const updatedHistory = [...otherUsersHistory, ...serverHistory];
    localStorage.setItem(`${LS_PREFIX}historial`, JSON.stringify(updatedHistory));
  }

  async updateUsuarioColumnaLocal(usuarioId: number, campo: string, valor: string): Promise<void> {
    const validColumns = ['documento', 'nombre', 'apellido', 'telefono', 'direccion', 'password'];
    if (!validColumns.includes(campo)) return;

    if (this.isNative && this.db) {
      await (this.db as { run: Function }).run({
        database: 'ofonline_db',
        statement: `UPDATE usuario SET ${campo} = ? WHERE id = ?`,
        values: [valor, usuarioId],
      });
    } else {
      const usuarios: Usuario[] = JSON.parse(localStorage.getItem(`${LS_PREFIX}usuarios`) || '[]');
      const uIdx = usuarios.findIndex(u => u.id === usuarioId);
      if (uIdx >= 0) {
        (usuarios[uIdx] as any)[campo] = valor;
        localStorage.setItem(`${LS_PREFIX}usuarios`, JSON.stringify(usuarios));
      }
    }
  }

  async updateDatoLocal(
    usuarioId: number,
    campo: string,
    valor: string
  ): Promise<void> {
    const fechaCreacion = new Date().toISOString();

    // 1. Actualizar columnas locales del usuario si aplica (para visualización local inmediata)
    await this.updateUsuarioColumnaLocal(usuarioId, campo, valor);

    // 2. Agregar a cambios pendientes para sincronizar con el servidor (quien asigna la versión definitiva)
    await this.addCambioPendiente({
      usuario_id: usuarioId,
      campo,
      valor,
      fecha_creacion: fechaCreacion,
      sincronizado: false,
    });
  }

  // ==============================
  // Cambios Pendientes
  // ==============================

  async addCambioPendiente(cambio: CambioPendiente): Promise<void> {
    if (this.isNative && this.db) {
      await (this.db as { run: Function }).run({
        database: 'ofonline_db',
        statement: `INSERT INTO cambios_pendientes (usuario_id, campo, valor, fecha_creacion, sincronizado)
                     VALUES (?, ?, ?, ?, 0)`,
        values: [cambio.usuario_id, cambio.campo, cambio.valor, cambio.fecha_creacion],
      });
      return;
    }

    const pendientes: CambioPendiente[] = JSON.parse(
      localStorage.getItem(`${LS_PREFIX}pendientes`) || '[]'
    );
    pendientes.push({ ...cambio, id: Date.now() });
    localStorage.setItem(`${LS_PREFIX}pendientes`, JSON.stringify(pendientes));
  }

  async getCambiosPendientes(): Promise<CambioPendiente[]> {
    if (this.isNative && this.db) {
      const result = await (this.db as { query: Function }).query({
        database: 'ofonline_db',
        statement: 'SELECT * FROM cambios_pendientes WHERE sincronizado = 0 ORDER BY id ASC',
        values: [],
      });
      return result.values || [];
    }

    const pendientes: CambioPendiente[] = JSON.parse(
      localStorage.getItem(`${LS_PREFIX}pendientes`) || '[]'
    );
    return pendientes.filter(p => !p.sincronizado);
  }

  async marcarSincronizados(): Promise<void> {
    if (this.isNative && this.db) {
      await (this.db as { execute: Function }).execute({
        database: 'ofonline_db',
        statements: 'DELETE FROM cambios_pendientes WHERE sincronizado = 0',
      });
      return;
    }

    localStorage.setItem(`${LS_PREFIX}pendientes`, JSON.stringify([]));
  }

  async contarPendientes(): Promise<number> {
    const pendientes = await this.getCambiosPendientes();
    return pendientes.length;
  }
}

// Singleton
export const databaseService = new DatabaseService();
