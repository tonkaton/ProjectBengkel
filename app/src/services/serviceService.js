import api from './api';

export const serviceService = {
  /**
   * Get all services
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Services data
   */
  getAll: async (token) => {
    return api.get('/services', token);
  },

  /**
   * Create a new service
   * @param {Object} serviceData - Service data
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Created service
   */
  create: async (serviceData, token) => {
    return api.post('/services', serviceData, token);
  },

  /**
   * Update a service
   * @param {number} id - Service ID
   * @param {Object} serviceData - Service data
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Updated service
   */
  update: async (id, serviceData, token) => {
    return api.put(`/services/${id}`, serviceData, token);
  },

  /**
   * Delete a service
   * @param {number} id - Service ID
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Delete result
   */
  delete: async (id, token) => {
    return api.delete(`/services/${id}`, token);
  },
};

export default serviceService;
