import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management
 * @param {Object} initialValues - Initial form values
 * @returns {Object} - Form state, handlers, and utilities
 */
export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setError(null);
  }, [initialValues]);

  const setFieldError = useCallback((errorMessage) => {
    setError(errorMessage);
  }, []);

  return {
    values,
    loading,
    error,
    handleChange,
    setValue,
    setValues,
    setLoading,
    setError: setFieldError,
    reset,
  };
}
