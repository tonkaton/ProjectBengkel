import PropTypes from 'prop-types';
import { cn } from '../../utils';

/**
 * Loading spinner component
 */
export function LoadingSpinner({ size = 'md', className = '', text }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div
        className={cn(
          'rounded-full border-yellow-400 border-t-transparent animate-spin',
          sizes[size]
        )}
      />
      {text && (
        <p className="text-yellow-400 mt-3 text-sm">{text}</p>
      )}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  text: PropTypes.string,
};

/**
 * Loading state for sections
 */
export function LoadingSection({ text = 'Memuat...' }) {
  return (
    <div className="text-center py-12">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

LoadingSection.propTypes = {
  text: PropTypes.string,
};
