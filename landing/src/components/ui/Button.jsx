import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils';

const VARIANTS = {
  primary: 'bg-gradient-to-r from-yellow-400 to-red-500 text-black hover:from-red-500 hover:to-yellow-400',
  secondary: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black',
  danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-yellow-400 hover:to-yellow-300 hover:text-black',
  outline: 'border-2 border-gray-400 text-gray-400 hover:border-yellow-400 hover:text-yellow-400',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Reusable Button component with multiple variants
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  as = 'button',
  href,
  onClick,
  type = 'button',
  animate = false,
  ...props
}) {
  const baseClasses = cn(
    'rounded-lg font-bold shadow-lg transition-all duration-300',
    'transform hover:-translate-y-1',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const content = loading ? 'Memproses...' : children;

  // Render as link
  if (as === 'a' || href) {
    if (animate) {
      return (
        <motion.a
          href={href}
          className={baseClasses}
          whileHover={{ scale: 1.05 }}
          {...props}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <a href={href} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  // Render as button
  if (animate) {
    return (
      <motion.button
        type={type}
        className={baseClasses}
        disabled={disabled || loading}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  as: PropTypes.oneOf(['button', 'a']),
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  animate: PropTypes.bool,
};
