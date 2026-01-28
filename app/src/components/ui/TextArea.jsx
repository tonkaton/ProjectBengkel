import React from 'react';

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm text-gray-300 mb-1">{label}</label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white outline-none focus:border-yellow-500 transition-colors resize-none"
        {...props}
      />
    </div>
  );
};

export default TextArea;
