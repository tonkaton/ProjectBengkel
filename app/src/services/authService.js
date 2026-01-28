import api from './api';

export const authService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User data and token
   */
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  /**
   * Get current user information
   * @param {string} token - JWT token
   * @returns {Promise<Object>} User data
   */
  getCurrentUser: async (token) => {
    return api.get('/auth/me', token);
  },

  /**
   * Get all users (admin only)
   * @param {string} token - JWT token
   * @returns {Promise<Array>} List of users
   */
  getUsers: async (token) => {
    return api.get('/auth/users', token);
  },

  /**
   * Create a new user (admin only)
   * @param {Object} userData - User data (name, email, password, role)
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Created user
   */
  createUser: async (userData, token) => {
    return api.post('/auth/users', userData, token);
  },
};

export default authService;
