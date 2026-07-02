import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3005';

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
