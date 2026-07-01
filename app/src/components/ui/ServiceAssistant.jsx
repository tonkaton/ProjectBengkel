import React, { useState } from 'react';
import { MessageSquare, X, Wrench, Calendar, ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const ServiceAssistant = ({ maintenanceData, onViewDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!maintenanceData) return null;

  const handleDetailClick = () => {
    setIsOpen(false);
    if (onViewDetail) onViewDetail();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* EXPANDED WINDOW */}
      <div
        className={`origin-bottom-right transform overflow-hidden rounded-4xl border border-white/70 bg-card shadow-soft-lg transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-10 scale-90 opacity-0'
        } w-[90vw] md:w-[350px]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-[0_6px_14px_rgba(224,70,59,0.30)]">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-ok" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink">Asisten Servis</h4>
              <p className="text-xs text-muted">Reminder Servis</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-base text-slate-500 shadow-soft-in-sm transition active:scale-95">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] space-y-4 overflow-y-auto p-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-base text-slate-500 shadow-soft-in-sm">
              <Wrench className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-base p-3 text-sm text-slate-600 shadow-soft-in-sm">
              <p>Halo boss! 👋 Jangan lupa ya, motor kesayangan lu ada jadwal bentar lagi.</p>
            </div>
          </div>

          <div className="ml-11 rounded-2xl border border-white/70 bg-white p-4 shadow-soft-sm">
            <h5 className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">Upcoming Schedule</h5>
            <h3 className="mb-1 text-lg font-semibold text-ink">{maintenanceData.motor_name}</h3>
            <p className="mb-3 flex items-center gap-1 text-xs text-muted">
              <Wrench className="h-3 w-3" />
              {maintenanceData.note || 'General Checkup'}
            </p>
            <div className="flex items-center justify-between rounded-xl bg-base p-3 shadow-soft-in-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted" />
                <span className="font-mono font-bold text-ink">{formatDate(maintenanceData.next_service)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleDetailClick}
              className="flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-[0_6px_14px_rgba(224,70,59,0.30)] transition active:scale-95"
            >
              Lihat Detail <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* LAUNCHER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_24px_rgba(224,70,59,0.35)] transition-all duration-300 ${
          isOpen ? 'rotate-90 bg-slate-600' : 'rotate-0 bg-accent hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6 text-white" />
            <span className="absolute right-0 top-0 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-amber-500" />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default ServiceAssistant;
