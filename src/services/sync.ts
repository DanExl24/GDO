/**
 * Motor de sincronización offline-online
 *
 * Detecta cambios pendientes en la BD local, los envía al servidor,
 * y descarga datos actualizados del servidor a la BD local.
 */

import api from './api';
import { databaseService, type CambioPendiente } from './database';

export interface SyncResult {
  totalChanges: number;
  syncedChanges: number;
  failedChanges: number;
  message: string;
}

class SyncService {
  private isSyncing = false;

  /**
   * Ejecuta la sincronización completa:
   * 1. Sube cambios pendientes al servidor
   * 2. Descarga datos actualizados del servidor
   */
  async fullSync(
    onProgress?: (current: number, total: number) => void
  ): Promise<SyncResult> {
    if (this.isSyncing) {
      return {
        totalChanges: 0,
        syncedChanges: 0,
        failedChanges: 0,
        message: 'Sincronización ya en progreso',
      };
    }

    this.isSyncing = true;

    try {
      // Paso 1: Obtener cambios pendientes
      const pendientes = await databaseService.getCambiosPendientes();

      if (pendientes.length === 0) {
        // Sin cambios pendientes, solo hacer pull
        await this.pullFromServer();
        return {
          totalChanges: 0,
          syncedChanges: 0,
          failedChanges: 0,
          message: 'Sin cambios pendientes. Datos actualizados.',
        };
      }

      // Paso 2: Enviar cambios al servidor
      const total = pendientes.length;
      let synced = 0;

      // Enviar todos los cambios de una vez
      try {
        const response = await api.post('/sync', {
          cambios: pendientes.map((p: CambioPendiente) => ({
            usuario_id: p.usuario_id,
            campo: p.campo,
            valor: p.valor,
            fecha_creacion: p.fecha_creacion,
          })),
        });

        if (response.data.results) {
          synced = response.data.results.filter(
            (r: { success: boolean }) => r.success
          ).length;
        }

        // Marcar como sincronizados
        await databaseService.marcarSincronizados();

        // Reportar progreso
        if (onProgress) {
          onProgress(synced, total);
        }
      } catch (error) {
        console.error('Error enviando cambios:', error);
      }

      // Paso 3: Descargar datos actualizados
      await this.pullFromServer();

      return {
        totalChanges: total,
        syncedChanges: synced,
        failedChanges: total - synced,
        message: `Sincronización completada: ${synced}/${total} cambios`,
      };
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Descarga todos los usuarios y sus datos actuales del servidor
   * y los guarda en la BD local.
   */
  async pullFromServer(): Promise<void> {
    try {
      // Pull all users
      const usersResponse = await api.get('/usuarios');
      await databaseService.saveUsuarios(usersResponse.data);

      // Pull all data for all users
      const allDataResponse = await api.get('/sync/pull-all');
      for (const item of allDataResponse.data) {
        if (item.datos && item.datos.length > 0) {
          // Convertir y guardar historial local utilizando los IDs y estados reales de la nube
          const historialItems = item.datos.map(
            (d: any) => ({
              id: d.id,
              usuario_id: item.usuario.id,
              campo: d.campo,
              valor: d.valor,
              version: d.version,
              es_actual: d.es_actual,
              origen: d.origen,
              fecha_creacion: d.fecha_creacion,
              fecha_ultima_activacion: d.fecha_ultima_activacion,
              veces_reutilizado: d.veces_reutilizado
            })
          );
          await databaseService.saveHistorialLocal(historialItems);
        }
      }
    } catch (error) {
      console.error('Error en pull desde servidor:', error);
      throw error;
    }
  }

  /**
   * Verifica si hay cambios pendientes
   */
  async hasPendingChanges(): Promise<boolean> {
    const count = await databaseService.contarPendientes();
    return count > 0;
  }

  get syncing(): boolean {
    return this.isSyncing;
  }
}

export const syncService = new SyncService();
