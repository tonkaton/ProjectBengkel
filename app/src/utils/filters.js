/**
 * Filter a list of items based on a search query
 * @param {Array} list - The list to filter
 * @param {string} query - The search query
 * @param {Array<string>} keys - The keys to search in
 * @returns {Array} Filtered list
 */
export const filterByQuery = (list, query, keys = []) => {
  if (!query?.trim()) return list;
  
  const normalizedQuery = query.toLowerCase();
  
  return list.filter((item) =>
    keys.some((key) =>
      String(item[key] || '').toLowerCase().includes(normalizedQuery)
    )
  );
};
