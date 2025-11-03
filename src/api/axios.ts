import axios from 'axios';

export const API_BASE = import.meta.env.VITE_APP_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send cookies automatically
});

// Optionally add interceptors if you want
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle 401 globally
    if (error.response?.status === 401) {
      // maybe auto logout
    }
    return Promise.reject(error);
  },
);
