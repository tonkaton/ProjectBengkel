import { useState, useCallback } from 'react';

/**
 * Custom hook for modal management
 * @returns {Object} Modal state and handlers
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const openModal = useCallback((type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalType(null);
    setEditingItem(null);
  }, []);

  return {
    isOpen,
    modalType,
    editingItem,
    openModal,
    closeModal,
  };
};

export default useModal;
