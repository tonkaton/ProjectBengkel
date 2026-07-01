import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-4xl border border-line bg-card p-6 shadow-soft-lg">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-ink">{title}</h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-base text-ink2 shadow-soft-in-sm transition active:scale-95"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
