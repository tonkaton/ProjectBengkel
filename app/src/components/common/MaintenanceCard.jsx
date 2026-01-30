import React from 'react';
import { useAuth } from '../../contexts';
import { formatDate } from '../../utils/formatters';
import { Trash2 } from 'lucide-react'; // [TAMBAH] Icon Hapus

// [TAMBAH] Terima prop 'onDelete' dari parent
const MaintenanceCard = ({ item, onDelete }) => {
  const { isAdmin } = useAuth();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset jam biar perbandingan tanggal akurat
  const serviceDate = new Date(item.next_service);

  // Logic Urgent (5 hari ke depan)
  const isUrgent = serviceDate <= new Date(new Date().setDate(today.getDate() + 5));
  
  // [LOGIC BARU] Cek apakah sudah terlewat (Tanggal servis < Hari ini)
  const isOverdue = serviceDate < today;

  const customerData = item.User || item.customer || item.owner || item.Vehicle?.owner;

  return (
    <div
      className={`p-4 rounded-xl border mb-3 transition-all ${
        // Kalau terlewat, kasih border merah menyala biar notice
        isOverdue 
            ? 'bg-red-950/30 border-red-500/80' 
            : isUrgent
                ? 'bg-red-900/20 border-red-500'
                : 'bg-zinc-800 border-zinc-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* Nama Motor */}
          <h4 className="text-white font-semibold mb-1 truncate">
            {item.motor_name || item.Vehicle?.brand + ' ' + item.Vehicle?.model || 'Motor'}
          </h4>
          
          {/* Catatan Maintenance */}
          <p className="text-gray-400 text-sm line-clamp-2">{item.note}</p>
          
          {isAdmin && customerData && (
            <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
              <span className="opacity-70">Pelanggan:</span>
              <span className="text-gray-300 font-medium">{customerData.name}</span>
            </p>
          )}

          {/* [INFO TERLEWAT] Tambahan teks kecil biar jelas */}
          {isOverdue && (
             <p className="text-red-400 text-xs mt-2 font-bold italic">
                ⚠️ Jadwal Terlewat
             </p>
          )}
        </div>

        {/* Bagian Kanan: Tanggal & Delete */}
        <div className="flex flex-col items-end gap-2">
            {/* Tanggal Next Service */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                isOverdue 
                    ? 'bg-red-600 text-white animate-pulse' // Merah banget kalau lewat
                    : isUrgent 
                        ? 'bg-red-500 text-white' 
                        : 'bg-yellow-500 text-black'
              }`}
            >
              {formatDate(item.next_service)}
            </span>

            {/* [TOMBOL DELETE] Hanya muncul jika Admin DAN Terlewat */}
            {isAdmin && isOverdue && onDelete && (
                <button 
                    onClick={() => {
                        if(window.confirm('Hapus jadwal yang terlewat ini?')) {
                            onDelete(item.id);
                        }
                    }}
                    className="flex items-center gap-1 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 px-3 py-1.5 rounded-lg text-xs transition-all border border-red-500/30"
                >
                    <Trash2 size={14} />
                    <span>Hapus</span>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCard;