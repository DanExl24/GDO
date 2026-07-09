import { onMounted, onUnmounted } from 'vue';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { useNetworkStore } from 'stores/network';
import { databaseService } from 'src/services/database';
import { connectSocket, disconnectSocket, getSocket } from 'src/services/socket';

export function useNetwork() {
  const networkStore = useNetworkStore();
  let listenerHandle: { remove: () => void } | null = null;

  async function checkStatus() {
    try {
      let physicalConnected = true;

      if (Capacitor.isNativePlatform()) {
        const status = await Network.getStatus();
        physicalConnected = status.connected;
      } else {
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          physicalConnected = false;
        }
      }

      if (!physicalConnected) {
        if (networkStore.isOnline) {
          await networkStore.setOnline(false);
        }
        return;
      }

      // Si hay conexión física reportada, conectar el socket si no lo está
      const socket = getSocket();
      if (!socket || !socket.connected) {
        connectSocket();
      }
    } catch (error) {
      console.warn('Error checking physical network status:', error);
      if (networkStore.isOnline) {
        await networkStore.setOnline(false);
      }
    }

    // Actualizar contador de pendientes local
    const count = await databaseService.contarPendientes();
    networkStore.updatePendingCount(count);
  }

  function startListening() {
    // Listener nativo (Capacitor)
    if (Capacitor.isNativePlatform()) {
      Network.addListener('networkStatusChange', (status) => {
        checkStatus();
      }).then((handle) => {
        listenerHandle = handle;
      });
    } else {
      window.addEventListener('online', () => checkStatus());
      window.addEventListener('offline', () => networkStore.setOnline(false));
    }

    // Conectar WebSocket
    connectSocket();
  }

  function stopListening() {
    if (listenerHandle) {
      listenerHandle.remove();
    }
    if (!Capacitor.isNativePlatform()) {
      window.removeEventListener('online', () => checkStatus());
      window.removeEventListener('offline', () => networkStore.setOnline(false));
    }
    // Desconectar WebSocket
    disconnectSocket();
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
  };
}
