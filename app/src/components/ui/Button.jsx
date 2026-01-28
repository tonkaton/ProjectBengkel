import React from 'react';

const variants = {
  primary:
    'bg-gradient-to-r from-red-600 to-yellow-500 text-black font-semibold hover:brightness-110',
  secondary: 'bg-zinc-700 text-white hover:bg-zinc-600',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
  ghost: 'text-gray-400 hover:bg-zinc-800 hover:text-white',
};

const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseClasses = 'rounded-lg transition-all flex items-center justify-center';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" />}
    </button>
  );
};

export default Button;
