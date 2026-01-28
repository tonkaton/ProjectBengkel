/**
 * Formatting utility functions
 */

/**
 * Format number as Indonesian Rupiah currency
 * @param {number|string} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount) {
  const numAmount = Number(amount);
  if (isNaN(numAmount)) return 'Rp 0';
  return `Rp ${numAmount.toLocaleString('id-ID')}`;
}

/**
 * Format phone number for display
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export function formatPhone(phone) {
  // Remove non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format as XXX-XXXX-XXXX
  if (digits.length >= 10) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  }
  
  return phone;
}

/**
 * Get current year
 * @returns {number} - Current year
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}
