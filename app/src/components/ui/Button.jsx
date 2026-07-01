import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accentDark shadow-[0_8px_18px_rgba(224,70,59,0.30)] disabled:opacity-60',
  secondary:
    'bg-panel text-ink shadow-soft hover:shadow-soft-lg active:shadow-soft-in disabled:opacity-60',
  danger: 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-60',
  warning: 'bg-warn text-white hover:brightness-95 disabled:opacity-60',
  ghost: 'text-ink2 hover:bg-base hover:text-ink disabled:text-slate-300',
};

const sizes = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseClasses =
    'rounded-full font-semibold transition-all flex items-center justify-center disabled:cursor-not-allowed active:scale-[0.98]';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="mr-2 h-4 w-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="ml-2 h-4 w-4" />}
        </>
      )}
    </button>
  );
};

export default Button;
