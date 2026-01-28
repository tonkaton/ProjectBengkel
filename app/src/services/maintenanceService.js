import api from './api';

export const maintenanceService = {
  /**
   * Get all maintenance records
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Maintenance data
   */
  getAll: async (token) => {
    return api.get('/maintenance', token);
  },

  /**
   * Get latest upcoming maintenance for dashboard
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Latest maintenance data
   */
  getLatestUpcoming: async (token) => {
    return api.get('/maintenance/latest', token);
  },

  /**
   * Create a new maintenance record
   * @param {Object} maintenanceData - Maintenance data
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Created maintenance
   */
  create: async (maintenanceData, token) => {
    return api.post('/maintenance', maintenanceData, token);
  },
};

export default maintenanceService;
