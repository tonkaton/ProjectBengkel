import React from 'react';
import { Calendar, Clock, Wrench, AlertCircle, Bike } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { formatDate } from '../../utils/formatters';

const SchedulePage = () => {
  const { currentUser } = useAuth();
  const { maintenance } = useData();

  const mySchedules = maintenance
    .filter((m) => m.UserId === currentUser?.id)
    .sort((a, b) => new Date(a.next_service) - new Date(b.next_service));

  const getDaysUntil = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 pb-32 md:pb-12">
      {/* HEADER */}
      <div>
        <span className="eyebrow">Perawatan</span>
        <h1 className="mt-1 flex items-center gap-3 font-display text-4xl tracking-wide text-ink">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-soft-sm">
            <Calendar className="h-6 w-6" />
          </span>
          JADWAL SERVIS
        </h1>
        <p className="mt-1 text-sm text-muted">Jangan lewatin jadwal servis motor kesayangan lu.</p>
      </div>

      {/* CONTENT */}
      {mySchedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-4xl border-2 border-dashed border-black/10 px-4 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-base text-slate-400 shadow-soft-in">
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-ink">Jadwal kosong</h3>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">Belum ada jadwal servis yang terdaftar untuk saat ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {mySchedules.map((m) => {
            const daysLeft = getDaysUntil(m.next_service);
            const isUrgent = daysLeft <= 3 && daysLeft >= 0;
            const isOverdue = daysLeft < 0;
            const vehicleObj = m.Vehicle || m.vehicle || {};
            const brandModel = vehicleObj.brand && vehicleObj.model ? `${vehicleObj.brand} ${vehicleObj.model}` : null;
            const vehicleName = brandModel || m.motor_name || 'Motor Tidak Dikenal';
            const alert = isUrgent || isOverdue;

            return (
              <div key={m.id} className="flex h-full flex-col rounded-4xl border border-white/70 bg-card p-5 shadow-soft transition-all hover:shadow-soft-lg">
                <div className="mb-4 flex items-start gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-soft-sm ${alert ? 'bg-red-100 text-red-500' : 'bg-base text-slate-500'}`}>
                    <Bike className="h-5 w-5" />
                  </div>
                  <h4 className="line-clamp-1 text-base font-semibold leading-tight text-ink md:text-lg">{vehicleName}</h4>
                </div>

                <div className="mb-4">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">Tanggal Servis</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    <span className="font-mono text-xl font-bold text-ink">{formatDate(m.next_service)}</span>
                  </div>
                </div>

                <div className="mb-4 flex-1 rounded-2xl bg-base p-3 shadow-soft-in-sm">
                  <div className="flex items-start gap-2">
                    <Wrench className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" />
                    <p className="line-clamp-2 text-sm text-slate-600">{m.note || 'Cek rutin berkala'}</p>
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  {isOverdue ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                      <AlertCircle className="h-3 w-3" /> Terlewat {Math.abs(daysLeft)} Hari
                    </span>
                  ) : isUrgent ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                      <Clock className="h-3 w-3" /> {daysLeft} Hari Lagi
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      <Clock className="h-3 w-3" /> Masih Aman
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
