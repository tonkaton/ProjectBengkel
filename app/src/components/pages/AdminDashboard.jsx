import React, { useMemo } from 'react';
import { DollarSign, TrendingUp, Users, Gift } from 'lucide-react';
import { useData } from '../../contexts';
import { formatRupiah } from '../../utils/formatters';
import { StatCard } from '../ui';
import { TransactionRow, MaintenanceCard } from '../common';

const AdminDashboard = () => {
  const { transactions, customers, rewards, maintenance } = useData();

  const todayIncome = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return transactions
      .filter((t) => {
        if (t.status !== 'Selesai') return false;
        const finishDate = new Date(t.updatedAt).toISOString().split('T')[0];
        return finishDate === today;
      })
      .reduce((total, t) => total + Number(t.amount || 0), 0);
  }, [transactions]);

  const todayTransactionsCount = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return transactions.filter(
      (t) => new Date(t.createdAt).toISOString().split('T')[0] === today
    ).length;
  }, [transactions]);

  const todayLabel = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Executive overview</span>
          <h1 className="mt-1 font-display text-5xl tracking-wide text-ink">DASHBOARD</h1>
        </div>
        <span className="rounded-full bg-card px-4 py-2 text-sm font-medium text-ink2 shadow-soft-sm">
          {todayLabel}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Pendapatan Hari Ini" value={formatRupiah(todayIncome)} color="bg-red-600" />
        <StatCard icon={TrendingUp} label="Transaksi Hari Ini" value={todayTransactionsCount} color="bg-yellow-600" />
        <StatCard icon={Users} label="Total Pelanggan" value={customers.length} color="bg-zinc-700" />
        <StatCard icon={Gift} label="Reward Aktif" value={rewards.length} color="bg-red-600" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <div className="rounded-4xl border border-line bg-card p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Transaksi Terbaru</h2>
            <span className="rounded-full bg-base px-3 py-1 text-xs font-medium text-muted shadow-soft-in-sm">
              5 Terakhir
            </span>
          </div>

          {transactions.length === 0 ? (
            <p className="py-8 text-center text-muted">Belum ada transaksi</p>
          ) : (
            <div className="space-y-4">
              {[...transactions]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((t) => (
                  <TransactionRow key={t.id} transaction={t} showStatusButton={false} showDelete={false} />
                ))}
            </div>
          )}
        </div>

        {/* Upcoming Maintenance */}
        <div className="rounded-4xl border border-line bg-card p-6 shadow-soft">
          <h2 className="mb-6 text-lg font-semibold text-ink">Jadwal Servis Mendatang</h2>
          {maintenance.length === 0 ? (
            <p className="py-8 text-center text-muted">Tidak ada jadwal servis</p>
          ) : (
            <div className="space-y-4">
              {maintenance.slice(0, 5).map((m) => (
                <MaintenanceCard key={m.id} item={m} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
