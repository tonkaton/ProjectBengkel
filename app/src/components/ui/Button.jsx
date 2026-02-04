import React from 'react';
import { Loader2 } from 'lucide-react'; // Pastikan import ini ada

const variants = {
  primary:
    'bg-gradient-to-r from-red-600 to-yellow-500 text-black font-semibold hover:brightness-110 disabled:opacity-70',
  secondary: 'bg-zinc-700 text-white hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
  warning: 'bg-yellow-500 text-black hover:bg-yellow-600 disabled:bg-yellow-300',
  ghost: 'text-gray-400 hover:bg-zinc-800 hover:text-white disabled:text-gray-600',
};

const sizes = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false, // 👈 1. Ambil isLoading di sini
  disabled,
  ...props // 👈 2. Sisanya masuk ke props (isLoading gak ikut lagi)
}) => {
  const baseClasses = 'rounded-lg transition-all flex items-center justify-center disabled:cursor-not-allowed';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={isLoading || disabled} // 👈 3. Disable kalau lagi loading
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
        </>
      )}
    </button>
  );
};

export default Button;