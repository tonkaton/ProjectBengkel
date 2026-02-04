import api from './api';

export const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  // 👇 PERBAIKAN: Langsung kirim token (string), bukan object headers
  getCurrentUser: async (token) => {
    return api.get('/auth/me', token);
  },

  getUsers: async (token) => {
    return api.get('/auth/users', token);
  },

  createUser: async (userData, token) => {
    return api.post('/auth/users', userData, token);
  },
};

export default authService;