import { io, Socket } from 'socket.io-client';
import { useAuthStore } from 'stores/auth';
import { useNetworkStore } from 'stores/network';
import { Notify } from 'quasar';
import { API_URL } from './api';

let socket: Socket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

export function getSocket(): Socket | null {
  return socket;
}

export function connectSocket() {
  const authStore = useAuthStore();
  const networkStore = useNetworkStore();

  if (socket) {
    socket.disconnect();
  }

  console.log(`🔌 Conectando WebSocket a: ${API_URL}`);

  socket = io(API_URL, {
    transports: ['polling', 'websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
  });

  socket.on('connect', () => {
    networkStore.setOnline(true);
    console.log('🔌 WebSocket conectado al servidor con éxito');

    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }

    // Registrar el dispositivo/usuario actual en el servidor
    if (authStore.user) {
      socket?.emit('register', {
        usuario_id: authStore.user.id,
        role: authStore.role,
        nombre: `${authStore.user.nombre} ${authStore.user.apellido}`,
      });
    } else if (authStore.role === 'admin') {
      socket?.emit('register', {
        usuario_id: 0,
        role: 'admin',
        nombre: 'Administrador',
      });
    }
  });

  socket.on('disconnect', (reason) => {
    // Si la desconexión fue manual (logout), no marcar como offline ni disparar notificación
    if (reason === 'io client disconnect') {
      console.log('🔌 WebSocket desconectado voluntariamente.');
      return;
    }
    networkStore.setOnline(false);
    console.warn(`🔌 WebSocket desconectado del servidor. Razón: ${reason}`);
  });

  socket.on('connect_error', (error) => {
    networkStore.setOnline(false);
    console.debug('🔌 Error en la conexión del WebSocket:', error.message);
  });

  // Escuchar estado de salud de la base de datos PostgreSQL
  socket.on('db-status', (data: { database: 'connected' | 'disconnected' }) => {
    const isDbOnline = data.database === 'connected';
    if (networkStore.isOnline !== isDbOnline) {
      networkStore.setOnline(isDbOnline);
    }
  });

  // Escuchar eventos globales del servidor
  socket.on('user-connected', (data: { nombre: string; role: string }) => {
    if (authStore.role === 'admin') {
      Notify.create({
        type: 'info',
        message: `👤 ${data.nombre} (${data.role}) está en línea`,
        position: 'bottom-right',
        timeout: 2000,
      });
    }
  });

  socket.on('user-disconnected', (data: { nombre: string }) => {
    if (authStore.role === 'admin') {
      Notify.create({
        type: 'info',
        message: `👤 ${data.nombre} se ha desconectado`,
        position: 'bottom-right',
        timeout: 2000,
      });
    }
  });

  socket.on('sync-started', (data: { nombre: string }) => {
    if (authStore.role === 'admin') {
      Notify.create({
        type: 'warning',
        message: `🔄 ${data.nombre} inició sincronización`,
        position: 'bottom-right',
        timeout: 2500,
      });
    }
  });

  socket.on('sync-completed', (data: { nombre: string; count: number }) => {
    if (authStore.role === 'admin') {
      Notify.create({
        type: 'positive',
        message: `✅ ${data.nombre} terminó sincronización`,
        caption: `${data.count} cambio(s) consolidado(s)`,
        position: 'bottom-right',
        timeout: 3000,
      });
    }
  });
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
