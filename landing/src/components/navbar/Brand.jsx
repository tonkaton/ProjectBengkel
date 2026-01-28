import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Brand logo component
 */
export function Brand({ href = '#hero', name }) {
  return (
    <motion.a
      href={href}
      className="text-white font-extrabold text-lg md:text-2xl"
      whileHover={{ scale: 1.05 }}
    >
      {name}
    </motion.a>
  );
}

Brand.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string.isRequired,
};
