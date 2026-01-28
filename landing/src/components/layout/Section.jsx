import PropTypes from 'prop-types';
import { cn } from '../../utils';

/**
 * Section wrapper component for consistent section styling
 */
export function Section({
  id,
  children,
  className = '',
  gradient = 'default',
  padding = 'default',
  ...props
}) {
  const gradients = {
    default: 'bg-gradient-to-b from-black to-gray-900',
    dark: 'bg-gradient-to-b from-gray-900 to-black',
    hero: 'bg-gradient-to-b from-black via-gray-900 to-red-900',
  };

  const paddings = {
    default: 'py-24 px-6 md:px-12',
    hero: 'min-h-screen pt-24',
    compact: 'py-12 px-4',
  };

  return (
    <section
      id={id}
      className={cn(
        'text-white relative overflow-hidden',
        gradients[gradient],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gradient: PropTypes.oneOf(['default', 'dark', 'hero']),
  padding: PropTypes.oneOf(['default', 'hero', 'compact']),
};
