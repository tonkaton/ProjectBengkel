import React from 'react';
import { DollarSign, TrendingUp, Users, Gift } from 'lucide-react';
import { useData } from '../../contexts';
import { formatRupiah } from '../../utils/formatters';
import { StatCard } from '../ui';
import { TransactionRow, MaintenanceCard } from '../common';

const AdminDashboard = () => {
  const { transactions, customers, rewards, maintenance } = useData();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="Pendapatan Hari Ini"
          value={formatRupiah(0)}
          color="bg-red-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Transaksi Hari Ini"
          value={transactions.length}
          color="bg-yellow-600"
        />
        <StatCard
          icon={Users}
          label="Total Pelanggan"
          value={customers.length}
          color="bg-zinc-700"
        />
        <StatCard
          icon={Gift}
          label="Reward Aktif"
          value={rewards.length}
          color="bg-red-600"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Transactions */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Transaksi Terbaru
            </h2>
            <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
              5 Terakhir
            </span>
          </div>

          {transactions.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">Belum ada transaksi</p>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 5).map((t) => (
                <TransactionRow
                  key={t.id}
                  transaction={t}
                  showActions={false} // ⬅️ biar tombol tidak muncul di dashboard
                />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h2 className="text-2xl font-bold text-white mb-6">
            Jadwal Servis Mendatang
          </h2>
          {maintenance.length === 0 ? (
            <p className="text-gray-500 text-center">Tidak ada jadwal servis</p>
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
