import React from 'react';
import { Clock, ArrowUpRight, Wrench } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { formatDateTime } from '../../utils/formatters';

const HistoryPage = () => {
  const { currentUser } = useAuth();
  const { transactions } = useData();

  const userTransactions = transactions
    .filter((t) => t.UserId === currentUser?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <span className="eyebrow">Aktivitas</span>
        <h1 className="mt-1 flex items-center gap-3 font-display text-4xl tracking-wide text-ink">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-soft-sm">
            <Clock className="h-6 w-6" />
          </span>
          RIWAYAT SERVIS
        </h1>
        <p className="mt-1 text-sm text-muted">Catatan perawatan motor Anda</p>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {userTransactions.length === 0 ? (
          <div className="rounded-4xl border-2 border-dashed border-black/10 py-16 text-center text-muted">
            Belum ada riwayat servis.
          </div>
        ) : (
          userTransactions.map((t) => {
            const isService = t.points_earned >= 0;
            return (
              <div
                key={t.id}
                className="flex flex-col justify-between rounded-3xl border border-white/70 bg-card p-5 shadow-soft transition-all hover:shadow-soft-lg sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-soft-sm ${
                      isService ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    {isService ? <Wrench className="h-7 w-7" /> : <ArrowUpRight className="h-7 w-7" />}
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-semibold text-ink">{t.Service?.name || t.note || 'Servis Umum'}</h4>
                    <p className="text-sm font-medium text-muted">
                      {t.vehicle ? `${t.vehicle.model} • ${t.vehicle.plate}` : 'Detail Kendaraan'}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                      <span className="rounded-md bg-base px-2 py-1 shadow-soft-in-sm">{formatDateTime(t.createdAt)}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          t.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4 text-right sm:mt-0 sm:block sm:border-none sm:pt-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">Poin Didapat</p>
                  <span className="font-mono text-2xl font-bold tracking-tight text-emerald-600">+{t.points_earned} XP</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
