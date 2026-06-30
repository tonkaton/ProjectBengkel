import { Menu, X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Mobile menu toggle button
 */
export function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-base text-ink shadow-soft-in transition active:shadow-soft-in-sm"
      aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}

MobileMenuButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
