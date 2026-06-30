import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils';

/**
 * Reusable Card component — Soft UI
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
    default: 'bg-card border-white/70 shadow-soft',
    glass: 'bg-white/70 backdrop-blur-md border-white/70 shadow-soft',
    solid: 'bg-card border-white/70 shadow-soft',
  };

  const baseClasses = cn(
    'rounded-4xl border p-6 transition-all duration-300',
    variants[variant],
    className
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={hoverScale ? { y: -4 } : undefined}
        transition={{ duration: 0.5, delay }}
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
