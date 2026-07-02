import { onMounted, onUnmounted } from 'vue';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { useNetworkStore } from 'stores/network';
import { syncService } from 'src/services/sync';
import { databaseService } from 'src/services/database';
import api from 'src/services/api';
import { Notify } from 'quasar';

export function useNetwork() {
  const networkStore = useNetworkStore();
  let listenerHandle: { remove: () => void } | null = null;
  let pollingInterval: any = null;

  async function checkStatus() {
    try {
      if (Capacitor.isNativePlatform()) {
        const status = await Network.getStatus();
        if (status.connected !== networkStore.isOnline) {
          await onNetworkChange(status.connected);
        }
      } else {
        // En ambiente web, si el navegador indica que físicamente no hay red, marcar offline al instante
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          if (networkStore.isOnline) {
            await onNetworkChange(false);
          }
          return;
        }

        // Si hay red física, verificar contra el health check del servidor local
        try {
          const res = await api.get('/health', { timeout: 2500 });
          const isDbOnline = res.data?.status === 'ok' && res.data?.database === 'connected';
          if (isDbOnline !== networkStore.isOnline) {
            await onNetworkChange(isDbOnline);
          }
        } catch {
          if (networkStore.isOnline) {
            await onNetworkChange(false);
          }
        }
      }
    } catch {
      if (networkStore.isOnline) {
        await onNetworkChange(false);
      }
    }

    // Actualizar contador de pendientes
    const count = await databaseService.contarPendientes();
    networkStore.updatePendingCount(count);
  }

  async function onNetworkChange(connected: boolean) {
    const wasOffline = !networkStore.isOnline;
    networkStore.setOnline(connected);

    if (connected && wasOffline) {
      // Acabamos de volver a estar online
      Notify.create({
        type: 'positive',
        message: '🟢 Conexión restablecida',
        position: 'top',
        timeout: 2500,
        icon: 'wifi',
      });

      // Si NO hay cambios pendientes, hacer pull de datos silencioso.
      // Si hay cambios pendientes, el diálogo en MainLayout.vue asumirá el control de forma interactiva.
      const pendingCount = await databaseService.contarPendientes();
      if (pendingCount === 0) {
        await triggerSync();
      }
    } else if (!connected && !wasOffline) {
      Notify.create({
        type: 'negative',
        message: '🔴 Sin conexión',
        caption: 'Trabajando en modo offline',
        position: 'top',
        timeout: 3000,
        icon: 'wifi_off',
      });
    }
  }

  async function triggerSync() {
    const pendingCount = await databaseService.contarPendientes();

    if (pendingCount === 0 && networkStore.isOnline) {
      // Solo hacer pull si estamos online
      try {
        networkStore.setSyncing(true);
        await syncService.pullFromServer();
        networkStore.setSyncCompleted('Datos actualizados');
        Notify.create({
          type: 'info',
          message: '✅ Datos actualizados desde el servidor',
          position: 'top',
          timeout: 2000,
        });
      } catch {
        networkStore.setSyncing(false);
      }
      return;
    }

    if (!networkStore.isOnline) return;

    networkStore.setSyncing(true);
    networkStore.updateSyncProgress(0, pendingCount);

    try {
      const result = await syncService.fullSync((current, total) => {
        networkStore.updateSyncProgress(current, total);
      });

      networkStore.setSyncCompleted(result.message);

      Notify.create({
        type: 'positive',
        message: '✅ Sincronización completada',
        caption: result.message,
        position: 'top',
        timeout: 3000,
        icon: 'cloud_done',
      });
    } catch (error) {
      console.error('Error en sincronización:', error);
      networkStore.setSyncing(false);

      Notify.create({
        type: 'negative',
        message: '❌ Error en sincronización',
        caption: 'Se reintentará al reconectar',
        position: 'top',
        timeout: 3000,
      });
    }
  }

  function startListening() {
    // Listener nativo (Capacitor)
    if (Capacitor.isNativePlatform()) {
      Network.addListener('networkStatusChange', (status) => {
        onNetworkChange(status.connected);
      }).then((handle) => {
        listenerHandle = handle;
      });
    } else {
      // Fallback web: además de escuchar eventos del window, hacemos polling cada 3 segundos
      window.addEventListener('online', () => checkStatus());
      window.addEventListener('offline', () => onNetworkChange(false));
      pollingInterval = setInterval(checkStatus, 3000);
    }
  }

  function stopListening() {
    if (listenerHandle) {
      listenerHandle.remove();
    }
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    if (!Capacitor.isNativePlatform()) {
      window.removeEventListener('online', () => checkStatus());
      window.removeEventListener('offline', () => onNetworkChange(false));
    }
  }

  onMounted(() => {
    checkStatus();
    startListening();
  });

  onUnmounted(() => {
    stopListening();
  });

  return {
    checkStatus,
    triggerSync,
  };
}
