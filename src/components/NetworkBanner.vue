<template>
  <transition name="sync-progress">
    <div
      class="network-banner"
      :class="bannerClass"
    >
      <q-icon :name="iconName" size="16px" />
      <span>{{ statusText }}</span>
      <template v-if="networkStore.isSyncing">
        <q-spinner-dots size="16px" class="q-ml-xs" />
      </template>
      <template v-if="networkStore.pendingChanges > 0 && !networkStore.isSyncing">
        <span class="pending-badge q-ml-sm">
          {{ networkStore.pendingChanges }} pendiente{{ networkStore.pendingChanges > 1 ? 's' : '' }}
        </span>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNetworkStore } from 'stores/network';

const networkStore = useNetworkStore();

const bannerClass = computed(() => {
  if (networkStore.isSyncing) return 'network-banner--syncing';
  if (networkStore.isOnline) return 'network-banner--online';
  return 'network-banner--offline';
});

const iconName = computed(() => {
  if (networkStore.isSyncing) return 'sync';
  if (networkStore.isOnline) return 'wifi';
  return 'wifi_off';
});

const statusText = computed(() => {
  if (networkStore.isSyncing) {
    const { current, total } = networkStore.syncProgress;
    if (total > 0) return `Sincronizando ${current}/${total}...`;
    return 'Sincronizando...';
  }
  if (networkStore.isOnline) return 'Online';
  return 'Offline';
});
</script>

<style scoped>
.network-banner .q-icon {
  animation: none;
}

.network-banner--syncing .q-icon {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
