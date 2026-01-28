/**
 * CSS class utility functions
 */

/**
 * Conditionally join class names
 * @param {...(string|undefined|null|false)} classes - Class names to join
 * @returns {string} - Joined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
