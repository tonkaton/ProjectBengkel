import { useState, useCallback, useMemo } from 'react';
import { filterByQuery } from '../utils/filters';

/**
 * Custom hook for search/filter functionality
 * @param {Array} data - Data to filter
 * @param {Array<string>} keys - Keys to search in
 * @returns {Object} Search state and filtered data
 */
export const useSearch = (data, keys) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(
    () => filterByQuery(data, searchQuery, keys),
    [data, searchQuery, keys]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    clearSearch,
  };
};

export default useSearch;
