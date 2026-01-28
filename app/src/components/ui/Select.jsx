import React from 'react';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih...',
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm text-gray-300 mb-1">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white outline-none focus:border-yellow-500 transition-colors"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
