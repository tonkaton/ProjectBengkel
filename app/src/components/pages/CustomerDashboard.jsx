import React, { useState, useEffect } from 'react';
import { Star, Bike } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { formatRupiah, formatDateTime } from '../../utils/formatters';
import { maintenanceService } from '../../services';
import ServiceAssistant from '../ui/ServiceAssistant'; 

const CustomerDashboard = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { transactions, vehicles } = useData(); 
  
  const [latestMaintenance, setLatestMaintenance] = useState(null);
  const [loadingMaintenance, setLoadingMaintenance] = useState(true);

  // 1. Filter Transaksi User Ini
  const myTransactions = transactions
    .filter((t) => t.UserId === currentUser?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // 2. Filter Motor User Ini
  const myVehicles = vehicles.filter((v) => {
     return v.UserId === currentUser?.id || v.userId === currentUser?.id; 
  });

  // 3. Fetch Data 'Next Service' Khusus untuk Assistant
  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const token = localStorage.getItem('token'); 
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

    fetchMaintenance();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto relative pb-32 md:pb-24">
      
      {/* --- WELCOME BANNER --- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 p-6 md:p-8 rounded-2xl md:rounded-3xl text-white shadow-2xl border border-red-400/30">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-red-100 font-medium mb-1 tracking-wide text-sm md:text-base">Selamat Datang Kembali,</p>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              {currentUser?.name || 'Ameng'}! 👋
            </h2>
          </div>
          
          <div className="w-full md:w-auto bg-black/20 backdrop-blur-md rounded-2xl p-4 pl-5 pr-8 border border-white/10 flex items-center gap-4 cursor-default transition-transform active:scale-95 md:hover:scale-105">
            <div className="bg-yellow-400/20 p-3 rounded-full shadow-inner flex-shrink-0">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 fill-yellow-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-red-100 tracking-wider">
                Member Points
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-none mt-0.5">
                {currentUser?.points || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
        
        {/* KOLOM KIRI: MOTOR SAYA */}
        <div className="bg-zinc-900 rounded-2xl p-5 md:p-6 border border-zinc-800 shadow-xl flex flex-col min-h-[300px] md:min-h-[400px]">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Bike className="w-5 h-5 text-red-500" /> 
              <span>Motor Saya</span>
            </h3>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
              {myVehicles.length} Unit
            </span>
          </div>
          
          <div className="space-y-3 flex-1">
            {myVehicles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-950/30 text-zinc-500 p-8">
                <Bike className="w-10 h-10 mb-3 opacity-50" />
                <p className="text-sm">Belum ada motor terdaftar</p>
              </div>
            ) : (
              myVehicles.map((v) => (
                <div key={v.id} className="group p-4 bg-zinc-950/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-200 flex items-center justify-between active:bg-zinc-800">
                  <div>
                    <h4 className="text-zinc-100 font-bold text-base md:text-lg tracking-tight group-hover:text-white transition-colors">
                      {v.brand} {v.model}
                    </h4>
                    <p className="text-zinc-500 text-xs font-mono mt-1 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">{v.year}</span>
                      <span className="text-zinc-600">•</span>
                      <span>{v.plate}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* KOLOM KANAN: RIWAYAT TRANSAKSI */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden flex flex-col min-h-[300px] md:min-h-[400px]">
          <div className="p-5 md:p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
            <h3 className="text-lg md:text-xl font-bold text-white">Riwayat Transaksi</h3>
            <span className="text-xs font-medium text-zinc-500">
              Terbaru
            </span>
          </div>
          
          <div className="divide-y divide-zinc-800/50 flex-1 overflow-y-auto max-h-[400px] md:max-h-[500px] scrollbar-thin scrollbar-thumb-zinc-700">
            {myTransactions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 p-10">
                <p className="text-sm">Belum ada riwayat transaksi</p>
              </div>
            ) : (
              myTransactions.slice(0, 5).map((t) => (
                <div key={t.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-green-400 group-hover:bg-green-400/10 transition-all hidden md:block">
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm group-hover:text-green-300 transition-colors line-clamp-1 max-w-[150px] md:max-w-none">
                        {t.Service?.name || t.note || 'Servis Umum'}
                      </h4>
                      <p className="text-zinc-500 text-[10px] mt-1 font-mono">{formatDateTime(t.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <p className="text-white font-bold font-mono tracking-tight text-sm">{formatRupiah(t.amount)}</p>
                    <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 mt-1 border border-green-500/20">
                      +{t.points_earned}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- SERVICE ASSISTANT --- */}
      {/* UPDATE DISINI: Arahkan ke 'schedule', bukan 'maintenance' */}
      <ServiceAssistant 
        maintenanceData={latestMaintenance} 
        onViewDetail={() => onNavigate && onNavigate('schedule')}
      />

    </div>
  );
};

export default CustomerDashboard;