import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { APP_URL } from '../../constants';

/**
 * Mobile menu — kartu Soft UI di bawah handlebar
 */
export function MobileMenu({ isOpen, links, onLinkClick }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-2 rounded-4xl border border-line bg-panel p-3 shadow-soft md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink2 transition hover:bg-base hover:text-ink hover:shadow-soft-in-sm"
              onClick={onLinkClick}
            >
              {link.label}
            </a>
          ))}

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-full bg-accent py-3 text-center text-sm font-semibold text-white shadow-[0_8px_18px_rgba(224,70,59,0.35)] transition active:scale-[0.98]"
            onClick={onLinkClick}
          >
            Login
          </a>
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
