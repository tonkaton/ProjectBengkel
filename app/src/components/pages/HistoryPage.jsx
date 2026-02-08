import React from 'react';
import { Clock, ArrowDownLeft, ArrowUpRight, Wrench } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { formatDateTime } from '../../utils/formatters';

const HistoryPage = () => {
  const { currentUser } = useAuth();
  const { transactions } = useData();

  // Filter punya user + urutkan terbaru
  const userTransactions = transactions
    .filter((t) => t.UserId === currentUser?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-3 bg-blue-600/20 rounded-xl shadow-lg shadow-blue-900/10 border border-blue-500/20">
                    <Clock className="w-7 h-7 text-blue-400" />
                </div>
                Riwayat Servis
            </h2>
            <p className="text-zinc-400 mt-1 ml-1">Catatan perawatan motor Anda</p>
        </div>
      </div>

      {/* LIST DATA (Sama Style dengan Admin) */}
      <div className="space-y-4">
        {userTransactions.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-2xl">
                <p className="text-zinc-500 text-lg">Belum ada riwayat servis.</p>
            </div>
        ) : (
            userTransactions.map((t) => {
                const isService = t.points_earned >= 0; // Asumsi servis poin positif
                
                return (
                    <div key={t.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-900/80 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all hover:shadow-lg hover:shadow-zinc-900/50">
                        
                        {/* Kiri: Icon & Info */}
                        <div className="flex items-center gap-5">
                            {/* Icon Kotak Besar */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                                isService
                                ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 text-blue-400' 
                                : 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 text-purple-400'
                            }`}>
                                {isService ? <Wrench className="w-7 h-7" /> : <ArrowUpRight className="w-7 h-7" />}
                            </div>

                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">
                                    {t.Service?.name || t.note || 'Servis Umum'}
                                </h4>
                                <p className="text-zinc-400 text-sm font-medium">
                                    {t.vehicle ? `${t.vehicle.model} • ${t.vehicle.plate}` : 'Detail Kendaraan'}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800">
                                        {formatDateTime(t.createdAt)}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold ${
                                        t.status === 'Selesai' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                        {t.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Poin yang didapat */}
                        <div className="mt-4 sm:mt-0 text-right pl-4 border-l border-zinc-800/50 sm:border-none flex items-center sm:block justify-between">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1 sm:mb-1">Poin Didapat</p>
                            <span className="font-mono font-bold text-2xl tracking-tight text-emerald-400">
                                +{t.points_earned} XP
                            </span>
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