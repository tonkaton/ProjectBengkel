import PropTypes from 'prop-types';
import { cn } from '../../utils';

/**
 * Container component for consistent max-width and padding
 */
export function Container({ children, className = '', size = 'default', ...props }) {
  const sizes = {
    default: 'max-w-6xl',
    sm: 'max-w-4xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('mx-auto px-6 md:px-12', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'full']),
};
