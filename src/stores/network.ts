import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Notify } from 'quasar';
import { databaseService } from 'src/services/database';
import { syncService } from 'src/services/sync';

export const useNetworkStore = defineStore('network', () => {
  const isOnline = ref(true);
  const isSyncing = ref(false);
  const pendingChanges = ref(0);
  const lastSyncDate = ref<string | null>(null);
  const syncProgress = ref({ current: 0, total: 0 });
  const syncMessage = ref('');

  async function setOnline(status: boolean) {
    const wasOffline = !isOnline.value;
    isOnline.value = status;

    if (status && wasOffline) {
      Notify.create({
        type: 'positive',
        message: '🟢 Conexión restablecida',
        position: 'top',
        timeout: 2500,
        icon: 'wifi',
      });

      // Si no hay cambios pendientes, hacer un pull silencioso
      const pendingCount = await databaseService.contarPendientes();
      if (pendingCount === 0) {
        try {
          isSyncing.value = true;
          await syncService.pullFromServer();
          setSyncCompleted('Datos actualizados');
          Notify.create({
            type: 'info',
            message: '✅ Datos actualizados desde el servidor',
            position: 'top',
            timeout: 2000,
          });
        } catch (error) {
          console.error('Error al actualizar datos tras reconectar:', error);
          isSyncing.value = false;
        }
      }
    } else if (!status && !wasOffline) {
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

  function setSyncing(status: boolean) {
    isSyncing.value = status;
    if (!status) {
      syncProgress.value = { current: 0, total: 0 };
    }
  }

  function updatePendingCount(count: number) {
    pendingChanges.value = count;
  }

  function updateSyncProgress(current: number, total: number) {
    syncProgress.value = { current, total };
  }

  function setSyncCompleted(message: string) {
    lastSyncDate.value = new Date().toISOString();
    syncMessage.value = message;
    isSyncing.value = false;
    pendingChanges.value = 0;
    syncProgress.value = { current: 0, total: 0 };
  }

  return {
    isOnline,
    isSyncing,
    pendingChanges,
    lastSyncDate,
    syncProgress,
    syncMessage,
    setOnline,
    setSyncing,
    updatePendingCount,
    updateSyncProgress,
    setSyncCompleted,
  };
});
