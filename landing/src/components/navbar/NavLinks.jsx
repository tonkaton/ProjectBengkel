import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Desktop navigation links component
 */
export function NavLinks({ links, className = '' }) {
  return (
    <nav className={`hidden md:flex flex-1 justify-center space-x-10 ${className}`}>
      {links.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          className="text-gray-300 hover:text-yellow-400 transition"
          whileHover={{ scale: 1.08 }}
        >
          {link.label}
        </motion.a>
      ))}
    </nav>
  );
}

NavLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};
