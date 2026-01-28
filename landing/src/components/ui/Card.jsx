import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils';
import { ANIMATION } from '../../constants';

/**
 * Reusable Card component with animation support
 */
export function Card({
  children,
  className = '',
  animate = false,
  hoverScale = false,
  delay = 0,
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'bg-gray-800/60 border-gray-700 hover:border-yellow-400',
    glass: 'bg-white/10 backdrop-blur-md border-white/20 hover:shadow-yellow-500/30',
    solid: 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700',
  };

  const baseClasses = cn(
    'p-6 rounded-2xl shadow-lg border transition-all duration-300',
    variants[variant],
    className
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={ANIMATION.fadeInUp.initial}
        whileInView={ANIMATION.fadeInUp.whileInView}
        whileHover={hoverScale ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
  hoverScale: PropTypes.bool,
  delay: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'glass', 'solid']),
};
