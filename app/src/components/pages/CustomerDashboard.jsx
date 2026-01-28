import React, { useState, useEffect } from 'react';
import { Star, Bike, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts';
import { formatRupiah, formatDateTime, formatDate } from '../../utils/formatters';
import { maintenanceService } from '../../services';

const CustomerDashboard = () => {
  const { currentUser, token } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [latestMaintenance, setLatestMaintenance] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data for customer dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        
        // Fetch from services
        const { vehicleService, transactionService } = await import('../../services');
        
        const [vehiclesRes, transactionsRes, maintenanceRes] = await Promise.all([
          vehicleService.getAll(token),
          transactionService.getAll(token),
          maintenanceService.getLatestUpcoming(token),
        ]);

        setVehicles(vehiclesRes.data || []);
        setTransactions(transactionsRes.data?.filter((t) => t.UserId === currentUser?.id) || []);
        setLatestMaintenance(maintenanceRes.data || null);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, currentUser]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 p-8 rounded-2xl text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-2">
          Halo, {currentUser?.name || 'Ameng'}! 👋
        </h2>
        <div className="mt-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 inline-block">
          <p className="text-xs uppercase font-bold text-red-100 mb-1">
            Poin Loyalitas
          </p>
          <h3 className="text-5xl font-black flex items-center">
            <Star className="w-10 h-10 mr-3 fill-yellow-400 text-yellow-400" />
            {currentUser?.points || 0}
          </h3>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Vehicles */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Bike className="w-6 h-6 mr-2 text-red-400" /> Motor Saya
          </h3>
          {vehicles.length === 0 ? (
            <p className="text-gray-400">Belum ada motor terdaftar</p>
          ) : (
            vehicles.map((v) => (
              <div
                key={v.id}
                className="p-4 bg-zinc-800 rounded-lg border border-zinc-700 mb-3"
              >
                <h4 className="text-white font-semibold">
                  {v.brand} {v.model}
                </h4>
                <p className="text-gray-400 text-sm">
                  {v.plate} • {v.year}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Service Schedule */}
        <div className={`bg-zinc-900 p-6 rounded-xl ${latestMaintenance ? 'border-4 border-yellow-400/60 shadow-lg shadow-yellow-400/30' : 'border border-zinc-700'}`}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-yellow-400" /> Jadwal Servis
          </h3>
          {loading ? (
            <p className="text-gray-400">Memuat...</p>
          ) : !latestMaintenance ? (
            <p className="text-gray-400">Belum ada jadwal servis</p>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-xs text-yellow-400 font-semibold uppercase mb-1">
                  Motor
                </p>
                <p className="text-white font-bold text-lg">
                  {latestMaintenance.motor_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-yellow-400 font-semibold uppercase mb-1">
                  Jenis Servis
                </p>
                <p className="text-white font-semibold">
                  {latestMaintenance.note || 'Maintenance terjadwal'}
                </p>
              </div>
              <div>
                <p className="text-xs text-yellow-400 font-semibold uppercase mb-1">
                  Jadwal
                </p>
                <p className="text-white font-semibold">
                  {formatDate(latestMaintenance.next_service)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
        <h3 className="text-xl font-bold text-white mb-6">
          Riwayat Transaksi Terakhir
        </h3>
        {transactions.slice(0, 5).map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700 mb-3"
          >
            <div>
              <h4 className="text-white font-semibold">
                {t.Service?.name || t.note}
              </h4>
              <p className="text-gray-400 text-sm">{formatDateTime(t.createdAt)}</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 font-bold">{formatRupiah(t.amount)}</p>
              <p className="text-sm text-green-400">+{t.points_earned} poin</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
