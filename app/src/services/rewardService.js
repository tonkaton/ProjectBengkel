import api from './api';

export const rewardService = {
  /**
   * Get all rewards
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Rewards data
   */
  getAll: async (token) => {
    return api.get('/rewards', token);
  },

  /**
   * Create a new reward
   * @param {Object} rewardData - Reward data
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Created reward
   */
  create: async (rewardData, token) => {
    return api.post('/rewards', rewardData, token);
  },

  /**
   * Update a reward
   * @param {number} id - Reward ID
   * @param {Object} rewardData - Reward data
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Updated reward
   */
  update: async (id, rewardData, token) => {
    return api.put(`/rewards/${id}`, rewardData, token);
  },

  /**
   * Delete a reward
   * @param {number} id - Reward ID
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Delete result
   */
  delete: async (id, token) => {
    return api.delete(`/rewards/${id}`, token);
  },

  /**
   * Exchange a reward
   * @param {number} id - Reward ID
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Exchange result
   */
  exchange: async (id, token) => {
    return api.post(`/rewards/exchange/${id}`, {}, token);
  },
};

export default rewardService;
