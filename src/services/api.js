import axios from 'axios';

export const apiClient = axios.create({
  baseURL: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach the JWT token to API requests.
apiClient.interceptors.request.use(
  (config) => {
    // If running in demo admin mode, explicitly ensure NO authorization token is attached.
    // This prevents fake credentials or placeholder tokens from hitting protected endpoints.
    const isDemoAdmin = sessionStorage.getItem('foodbridgeIsDemoAdmin') === 'true';
    if (isDemoAdmin) {
      if (config.headers?.Authorization) {
        delete config.headers.Authorization;
      }
      return config;
    }

    const token = sessionStorage.getItem('foodbridgeToken');

    // Only attach real backend JWT tokens; never placeholder or demo tokens
    if (token && token !== 'prototype-demo-token') {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;