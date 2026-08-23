import axios from 'axios';
import { Capacitor } from '@capacitor/core';
export let API_URL = process.env.API_URL || process.env.VITE_API_URL || 'https://api-gdo.adsoproject.dev';

// Determinar la IP/Host de forma dinámica si estamos en localhost o desarrollo local
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  if (isLocalhost) {
    if (Capacitor.isNativePlatform()) {
      if (Capacitor.getPlatform() === 'android') {
        // En emulador Android o dispositivo móvil local
        API_URL = process.env.API_URL || 'https://api-gdo.adsoproject.dev';
      } else {
        API_URL = 'http://localhost:3000';
      }
    } else {
      API_URL = 'http://localhost:3000';
    }
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
