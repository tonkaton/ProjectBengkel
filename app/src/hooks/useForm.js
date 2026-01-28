import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management
 * @param {Object} initialState - Initial form state
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback((newState = {}) => {
    setForm(newState);
  }, []);

  const setFormData = useCallback((data) => {
    setForm(data);
  }, []);

  return {
    form,
    handleChange,
    resetForm,
    setFormData,
  };
};

export default useForm;
