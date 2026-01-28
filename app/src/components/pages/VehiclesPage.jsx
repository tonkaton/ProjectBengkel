import React from 'react';
import { Plus, Bike, Shield, User } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { Button } from '../ui';

const VehiclesPage = ({ onOpenModal }) => {
  const { isAdmin, currentUser } = useAuth();
  const { vehicles } = useData();

  // FILTER LOGIC:
  // Kalo Admin: Tampilin semua
  // Kalo Customer: Cuma tampilin yang UserId-nya sama kayak dia
  const displayedVehicles = isAdmin 
    ? vehicles 
    : vehicles.filter((v) => v.UserId === currentUser?.id || v.userId === currentUser?.id);

  return (
    // pb-32 penting biar list paling bawah gak ketutupan Widget Chatbot di HP
    <div className="space-y-6 pb-32 md:pb-12">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
             <div className="p-2 bg-red-600/20 rounded-lg">
                <Bike className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
             </div>
             {isAdmin ? 'Data Kendaraan' : 'Garasi Saya'}
           </h2>
           <p className="text-zinc-400 text-sm mt-1 ml-1">
             {isAdmin ? 'Kelola semua kendaraan pelanggan' : 'Daftar motor yang terdaftar di bengkel'}
           </p>
        </div>

        {/* Tombol Tambah (Cuma Admin yg bisa nambah manual biasanya, atau sesuai logic lu) */}
        {isAdmin && (
          <Button
            onClick={() => onOpenModal('addVehicle')}
            icon={Plus}
            className="w-full sm:w-auto shadow-lg shadow-red-600/20"
          >
            Tambah Motor
          </Button>
        )}
      </div>

      {/* --- CONTENT GRID --- */}
      {displayedVehicles.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
           <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
              <Bike className="w-10 h-10 text-zinc-600" />
           </div>
           <h3 className="text-white font-bold text-lg">Belum ada motor</h3>
           <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2">
             {isAdmin 
               ? 'Belum ada data kendaraan di sistem.' 
               : 'Lu belum nambahin motor nih, hubungi admin buat daftarin motor lu.'}
           </p>
        </div>
      ) : (
        // Grid Card
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedVehicles.map((v) => (
            <div
              key={v.id}
              className="group relative bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 hover:border-red-500/50 rounded-2xl p-5 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-red-900/20"
            >
              {/* Decorative Gradient Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600/10 to-transparent blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-75"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    {/* Icon Box */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 group-hover:border-red-500/30 transition-colors">
                        <Bike className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                    </div>
                    
                    {/* Tahun Badge */}
                    <span className="px-2.5 py-1 bg-zinc-800 rounded-md text-xs font-medium text-zinc-400 border border-zinc-700">
                        {v.year}
                    </span>
                </div>

                {/* Motor Info */}
                <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1 truncate">
                  {v.brand} {v.model}
                </h4>

                {/* Plat Nomor (Style Plat) */}
                <div className="inline-block bg-black/40 border border-zinc-700/50 rounded px-2 py-0.5 mb-4">
                    <p className="text-xs font-mono font-bold text-yellow-500/90 tracking-widest uppercase">
                        {v.plate}
                    </p>
                </div>

                <div className="border-t border-zinc-800 pt-3 mt-1 flex items-center justify-between text-xs">
                   {/* Info Warna */}
                   <div className="flex items-center gap-1.5 text-zinc-500">
                      <div 
                        className="w-3 h-3 rounded-full border border-zinc-600" 
                        style={{ backgroundColor: v.color?.toLowerCase() || '#555' }}
                      ></div>
                      <span className="capitalize">{v.color || 'Tidak diketahui'}</span>
                   </div>

                   {/* Info Pemilik (Khusus Admin) */}
                   {isAdmin && v.User && (
                     <div className="flex items-center gap-1.5 text-zinc-400 bg-zinc-950 px-2 py-1 rounded-full border border-zinc-800">
                        <User className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">{v.User.name}</span>
                     </div>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;