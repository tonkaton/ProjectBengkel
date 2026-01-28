import { Menu, X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Mobile menu toggle button
 */
export function MobileMenuButton({ isOpen, onClick }) {
  return (
    <div className="md:hidden">
      <button 
        onClick={onClick} 
        className="text-yellow-400"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
}

MobileMenuButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
