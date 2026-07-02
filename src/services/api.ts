import axios from 'axios';
import { Capacitor } from '@capacitor/core';

let API_URL = process.env.API_URL || 'http://localhost:3005';

// Determinar la IP/Host de forma dinámica si no está hardcodeada
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  
  if (Capacitor.isNativePlatform()) {
    if (Capacitor.getPlatform() === 'android') {
      // En el emulador de Android de Android Studio, 10.0.2.2 redirige al localhost de tu PC
      API_URL = 'http://10.0.2.2:3005';
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
    console.warn('❌ Error API:', error.message);
    return Promise.reject(error);
  }
);

export default api;
