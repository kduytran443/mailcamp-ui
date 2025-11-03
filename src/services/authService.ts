import axios from 'axios';

const API_BASE = import.meta.env.VITE_APP_URL || 'http://localhost:3001';

export interface LoginDto {
  email: string;
  password: string;
}

export const AuthService = {
  login: async (data: LoginDto) => {
    const res = await axios.post(`${API_BASE}/auth/login`, data, { withCredentials: true });
    return res.data;
  },

  getMe: async () => {
    const res = await axios.get(`${API_BASE}/users/me`, { withCredentials: true });
    return res.data;
  },

  logout: async () => {
    await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
  },
};
