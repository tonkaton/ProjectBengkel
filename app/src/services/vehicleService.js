import api from './api';

export const vehicleService = {
  /**
   * Get all vehicles
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Vehicles data
   */
  getAll: async (token) => {
    return api.get('/vehicles', token);
  },

  /**
   * Create a new vehicle
   * @param {Object} vehicleData - Vehicle data
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Created vehicle
   */
  create: async (vehicleData, token) => {
    return api.post('/vehicles', vehicleData, token);
  },
};

export default vehicleService;
