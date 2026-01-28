import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { ANIMATION, APP_URL } from '../../constants';

/**
 * Mobile menu component with navigation and login
 */
export function MobileMenu({
  isOpen,
  links,
  onLinkClick,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={ANIMATION.dropdownIn.initial}
          animate={ANIMATION.dropdownIn.animate}
          exit={ANIMATION.dropdownIn.exit}
          className="md:hidden bg-black border-t border-gray-700 text-center py-5"
        >
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block py-3 text-gray-300 hover:text-yellow-400"
              onClick={onLinkClick}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Login Button */}
          <div className="mt-4">
            <a
              href={APP_URL}
              className="inline-block px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-yellow-400 hover:text-black transition"
              onClick={onLinkClick}
            >
              Login
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLinkClick: PropTypes.func.isRequired,
};
