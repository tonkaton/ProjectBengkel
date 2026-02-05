import { API_URL } from '../constants';

/**
 * Create headers with optional authorization token
 * @param {string|null} token - JWT token
 * @returns {Object} Headers object
 */
const createHeaders = (token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @param {string|null} token - JWT token
 * @returns {Promise<Object>} Response data
 */
const apiRequest = async (endpoint, options = {}, token = null) => {
  const url = `${API_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...createHeaders(token),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

/**
 * API service object with CRUD methods
 */
export const api = {
  get: (endpoint, token) => apiRequest(endpoint, { method: 'GET' }, token),
  
  post: (endpoint, body, token) =>
    apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) }, token),
  
  put: (endpoint, body, token) =>
    apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body) }, token),
  
  delete: (endpoint, token) => apiRequest(endpoint, { method: 'DELETE' }, token),
};

export default api;