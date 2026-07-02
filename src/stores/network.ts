import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNetworkStore = defineStore('network', () => {
  const isOnline = ref(true);
  const isSyncing = ref(false);
  const pendingChanges = ref(0);
  const lastSyncDate = ref<string | null>(null);
  const syncProgress = ref({ current: 0, total: 0 });
  const syncMessage = ref('');

  function setOnline(status: boolean) {
    isOnline.value = status;
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
