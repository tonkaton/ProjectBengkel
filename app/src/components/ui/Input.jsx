import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-ink2">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-base px-4 py-3 text-ink shadow-soft-in outline-none placeholder:text-muted"
        {...props}
      />
    </div>
  );
};

export default Input;
