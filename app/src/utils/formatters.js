/**
 * Format number to Indonesian Rupiah currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatRupiah = (amount) => {
  return `Rp ${Number(amount || 0).toLocaleString('id-ID')}`;
};

/**
 * Format date to Indonesian locale
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID');
};

/**
 * Format date and time to Indonesian locale
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('id-ID');
};
