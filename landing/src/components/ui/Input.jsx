import PropTypes from 'prop-types';
import { cn } from '../../utils';

/**
 * Reusable Input component
 */
export function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = '',
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'border-gray-700 focus:border-yellow-400',
    admin: 'border-gray-700 focus:border-red-500',
  };

  const inputClasses = cn(
    'w-full mt-2 px-4 py-3 rounded-lg',
    'bg-gray-900 text-white',
    'border focus:outline-none transition-colors',
    variants[variant],
    error && 'border-red-500',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="text-gray-300 text-sm">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'admin']),
};
