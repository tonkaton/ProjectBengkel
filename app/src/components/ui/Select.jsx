import React from 'react';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih...',
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-medium text-ink2">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-2xl bg-base px-4 py-3 text-ink shadow-soft-in outline-none"
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default Select;
