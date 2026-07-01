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
      {label && <label className="mb-1.5 block text-sm font-medium text-ink2">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-2xl bg-base px-4 py-3 text-ink shadow-soft-in outline-none placeholder:text-muted"
        {...props}
      />
    </div>
  );
};

export default TextArea;
