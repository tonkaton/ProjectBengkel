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
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6 pb-32 md:pb-12">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
             <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
             </div>
             Jadwal Maintenance
           </h2>
           <p className="text-zinc-400 text-sm mt-1 ml-1">
             Jangan lewatin jadwal servis motor kesayangan lu.
           </p>
        </div>
      </div>

      {/* --- CONTENT --- */}
      {mySchedules.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
            <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
                <Clock className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-white font-bold text-lg">Jadwal Kosong</h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2">
                Belum ada jadwal servis yang terdaftar untuk saat ini.
            </p>
        </div>
      ) : (
        // Responsive Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mySchedules.map((m) => {
                const daysLeft = getDaysUntil(m.next_service);
                const isUrgent = daysLeft <= 3 && daysLeft >= 0;
                const isOverdue = daysLeft < 0;
                const vehicleObj = m.Vehicle || m.vehicle || {};
                
                // Rakit nama motor
                const brandModel = (vehicleObj.brand && vehicleObj.model) 
                    ? `${vehicleObj.brand} ${vehicleObj.model}` 
                    : null;
                
                const vehicleName = brandModel || m.motor_name || 'Motor Tidak Dikenal';
                return (
                    <div 
                        key={m.id} 
                        className={`
                            group relative bg-zinc-900 border rounded-2xl p-5 transition-all duration-300 overflow-hidden shadow-lg
                            ${isUrgent || isOverdue 
                                ? 'border-red-500/50 hover:bg-red-950/10' 
                                : 'border-zinc-800 hover:border-yellow-500/50 hover:bg-zinc-800/80'}
                        `}
                    >
                        {/* Decorative Background */}
                        <div className={`absolute top-0 right-0 w-32 h-32 blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-50 
                            ${isUrgent || isOverdue ? 'bg-red-600/10' : 'bg-yellow-500/10'}`}>
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Header Card: Motor Info */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl border ${isUrgent || isOverdue ? 'bg-red-500/10 border-red-500/30' : 'bg-zinc-950 border-zinc-800'}`}>
                                        <Bike className={`w-5 h-5 ${isUrgent || isOverdue ? 'text-red-500' : 'text-zinc-400'}`} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base md:text-lg leading-tight line-clamp-1">
                                            {vehicleName}
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            {/* Date Section (Main Focus) */}
                            <div className="mb-4">
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
                                    Tanggal Servis
                                </p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-yellow-500" />
                                    <span className="text-white font-mono font-bold text-xl">
                                        {formatDate(m.next_service)}
                                    </span>
                                </div>
                            </div>

                            {/* Note Section */}
                            <div className="bg-zinc-950/50 rounded-lg p-3 border border-zinc-800 mb-4 flex-1">
                                <div className="flex items-start gap-2">
                                    <Wrench className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-zinc-400 text-sm line-clamp-2">
                                        {m.note || 'Cek rutin berkala'}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge (Bottom) */}
                            <div className="mt-auto pt-2 flex items-center justify-between">
                                {isOverdue ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20 animate-pulse">
                                        <AlertCircle className="w-3 h-3" /> Terlewat {Math.abs(daysLeft)} Hari
                                    </span>
                                ) : isUrgent ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">
                                        <Clock className="w-3 h-3" /> {daysLeft} Hari Lagi
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                                        <Clock className="w-3 h-3" /> Masih Aman
                                    </span>
                                )}
                            </div>

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