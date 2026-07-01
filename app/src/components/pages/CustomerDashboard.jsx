import React, { useState, useEffect, useMemo } from 'react';
import { Star, Bike } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { formatRupiah, formatDateTime } from '../../utils/formatters';
import { maintenanceService } from '../../services';
import ServiceAssistant from '../ui/ServiceAssistant';

const CustomerDashboard = ({ onNavigate }) => {
  const { currentUser, token } = useAuth();
  const { transactions, vehicles } = useData();

  const [latestMaintenance, setLatestMaintenance] = useState(null);
  const [, setLoadingMaintenance] = useState(true);

  const myTransactions = useMemo(() => {
    if (!currentUser || !transactions) return [];
    return transactions
      .filter((t) => t.UserId === currentUser.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [currentUser, transactions]);

  const myVehicles = useMemo(() => {
    if (!currentUser || !vehicles) return [];
    return vehicles.filter((v) => v.UserId === currentUser.id || v.userId === currentUser.id);
  }, [currentUser, vehicles]);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        if (!token) return;
        setLoadingMaintenance(true);
        const res = await maintenanceService.getLatestUpcoming(token);
        setLatestMaintenance(res.data || null);
      } catch (error) {
        console.error('Error fetching maintenance:', error);
      } finally {
        setLoadingMaintenance(false);
      }
    };
    if (token) fetchMaintenance();
  }, [token]);

  return (
    <div className="relative mx-auto max-w-7xl space-y-6 pb-32 md:space-y-8 md:pb-24">
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-4xl bg-accent p-6 text-white shadow-[0_16px_36px_rgba(224,70,59,0.30)] md:p-8">
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-sm font-medium tracking-wide text-white/80">Selamat datang kembali,</p>
            <h2 className="font-display text-4xl tracking-wide md:text-5xl">{currentUser?.name || 'User'}</h2>
          </div>

          <div className="flex w-full items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-4 pr-8 backdrop-blur-md md:w-auto">
            <div className="flex-shrink-0 rounded-2xl bg-white/15 p-3">
              <Star className="h-7 w-7 fill-yellow-300 text-yellow-300" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">Member Points</p>
              <h3 className="mt-0.5 font-mono text-3xl font-bold leading-none">{currentUser?.points || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-2">
        {/* MOTOR SAYA */}
        <div className="flex min-h-[300px] flex-col rounded-4xl border border-line bg-card p-5 shadow-soft md:min-h-[400px] md:p-6">
          <div className="mb-4 flex items-center justify-between md:mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-ink md:text-xl">
              <Bike className="h-5 w-5 text-accent" />
              <span>Motor Saya</span>
            </h3>
            <span className="rounded-full bg-base px-3 py-1 text-xs font-medium text-muted shadow-soft-in-sm">
              {myVehicles.length} Unit
            </span>
          </div>

          <div className="flex-1 space-y-3">
            {myVehicles.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-hair p-8 text-muted">
                <Bike className="mb-3 h-10 w-10 opacity-50" />
                <p className="text-sm">Belum ada motor terdaftar</p>
              </div>
            ) : (
              myVehicles.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between rounded-2xl bg-base p-4 shadow-soft-in-sm"
                >
                  <div>
                    <h4 className="text-base font-semibold tracking-tight text-ink md:text-lg">
                      {v.brand} {v.model}
                    </h4>
                    <p className="mt-1 flex items-center gap-2 font-mono text-xs text-muted">
                      <span className="rounded bg-card px-1.5 py-0.5 text-ink2 shadow-soft-sm">{v.year}</span>
                      <span>•</span>
                      <span>{v.plate}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIWAYAT TRANSAKSI */}
        <div className="flex min-h-[300px] flex-col overflow-hidden rounded-4xl border border-line bg-card shadow-soft md:min-h-[400px]">
          <div className="flex items-center justify-between border-b border-hair p-5 md:p-6">
            <h3 className="text-lg font-semibold text-ink md:text-xl">Riwayat Transaksi</h3>
            <span className="text-xs font-medium text-muted">Terbaru</span>
          </div>

          <div className="scrollbar-hide max-h-[400px] flex-1 divide-y divide-hair overflow-y-auto md:max-h-[500px]">
            {myTransactions.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-10 text-muted">
                <p className="text-sm">Belum ada riwayat transaksi</p>
              </div>
            ) : (
              myTransactions.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 md:p-5">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="mt-1 hidden rounded-xl bg-base p-2 text-emerald-500 shadow-soft-in-sm md:block">
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <div>
                      <h4 className="line-clamp-1 max-w-[150px] text-sm font-semibold text-ink md:max-w-none">
                        {t.Service?.name || t.note || 'Servis Umum'}
                      </h4>
                      <p className="mt-1 font-mono text-[10px] text-muted">{formatDateTime(t.createdAt)}</p>
                    </div>
                  </div>
                  <div className="pl-2 text-right">
                    <p className="font-mono text-sm font-bold tracking-tight text-ink">{formatRupiah(t.amount)}</p>
                    <span className="mt-1 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                      +{t.points_earned}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ServiceAssistant
        maintenanceData={latestMaintenance}
        onViewDetail={() => onNavigate && onNavigate('schedule')}
      />
    </div>
  );
};

export default CustomerDashboard;
