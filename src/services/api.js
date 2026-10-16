import axios from 'axios';
import { formatApiError } from '@/utils/apiError';

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

// Response interceptor to normalize error responses and prevent crash from non-standard error formats
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error response data contains a structured error object like { error: { code, message } }
    // or { code, message }, normalize error.response.data.error to a string to protect legacy code
    // that uses `error.response?.data?.error` directly.
    if (error && error.response && error.response.data) {
      const data = error.response.data;
      if (typeof data === 'object') {
        if (data.error && typeof data.error === 'object') {
          const stringMessage =
            data.error.message ||
            data.error.detail ||
            data.error.code ||
            'Request failed with server error.';
          data._rawError = data.error;
          data.error = String(stringMessage);
        } else if (!data.error && typeof data.message === 'string') {
          // If data has message, set data.error as alias for safety
          data.error = data.message;
        }
      }
    }

    // Attach a standardized human-readable message to the error object
    if (error) {
      error.humanMessage = formatApiError(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
