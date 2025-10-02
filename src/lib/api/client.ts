import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adiciona token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - trata erros 401/403
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Limpa sessão
      localStorage.removeItem('hub_token');
      localStorage.removeItem('hub_user');
      
      // Redireciona para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
