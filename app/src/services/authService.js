import api from './api';

export const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  getCurrentUser: async (token) => {
    return api.get('/auth/me', token);
  },

  getUsers: async (token) => {
    return api.get('/auth/users', token);
  },

  createUser: async (userData, token) => {
    return api.post('/auth/users', userData, token);
  },

  deleteUser: async (id, token) => {
    return api.delete(`/auth/users/${id}`, token);
  },

  updateUser: async (id, userData, token) => {
    return api.put(`/auth/users/${id}`, userData, token);
  },
};

export default authService;