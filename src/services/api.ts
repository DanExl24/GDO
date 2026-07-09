import axios from 'axios';
import { Capacitor } from '@capacitor/core';
export let API_URL = process.env.API_URL || 'http://localhost:3005';

// Determinar la IP/Host de forma dinámica si no está hardcodeada
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  
  if (Capacitor.isNativePlatform()) {
    if (Capacitor.getPlatform() === 'android') {
      // Usar la IP de tu PC en la red local para pruebas en celular físico
      API_URL = 'http://192.168.1.13:3005';
    } else {
      API_URL = 'http://localhost:3005';
    }
  } else if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
    // Si estás en la web y no en localhost, usar la IP local de tu máquina
    API_URL = `http://${hostname}:3005`;
  }
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Interceptor para logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Evitar loguear errores de salud de la red para no saturar la consola cuando esté offline
    const isHealthCheck = error.config?.url?.includes('/health') || error.config?.url?.includes('health');
    if (!isHealthCheck && (!error.response || error.response.status >= 500)) {
      console.warn('❌ Error API:', error.message);
    }
    return Promise.reject(error);
  }
);
export default api;
