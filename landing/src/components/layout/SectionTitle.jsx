import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ANIMATION } from '../../constants';

/**
 * Animated section title component
 */
export function SectionTitle({ 
  title, 
  highlight,
  subtitle,
  className = '',
  align = 'center',
}) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 ${alignments[align]} ${className}`}>
      <motion.h2
        initial={ANIMATION.fadeInDown.initial}
        whileInView={ANIMATION.fadeInUp.whileInView}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold mb-4"
      >
        {title} {highlight && <span className="text-yellow-400">{highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={ANIMATION.fadeInUp.initial}
          whileInView={ANIMATION.fadeInUp.whileInView}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  highlight: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};
