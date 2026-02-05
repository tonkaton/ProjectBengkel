import React from 'react';
import { Bike, Ticket } from 'lucide-react'; // 👈 Tambah icon Ticket
import { useAuth } from '../../contexts';
import { formatRupiah, formatDateTime } from '../../utils/formatters';

const TransactionRow = ({ 
  transaction, 
  onToggleStatus, 
  onDelete,
  showDelete = true,   
  showStatusButton = true 
}) => {
  const { isAdmin } = useAuth();

  // Logic Nama
  const customerName = transaction.User?.name || transaction.customer?.name || transaction.owner?.name || 'Customer';
  const serviceName = transaction.Service?.name || transaction.service?.name || transaction.note || 'Servis Rutin';

  const mainTitle = isAdmin ? customerName : serviceName;
  const subTitle = isAdmin ? serviceName : (transaction.note || 'Perawatan Kendaraan');

  // Logic Tanggal (CreatedAt vs UpdatedAt)
  const displayDate = transaction.status === 'Selesai' 
    ? transaction.updatedAt 
    : transaction.createdAt;

  // Warna Status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Proses': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Menunggu': return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
      default: return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-800/70 rounded-xl border border-zinc-700 hover:border-zinc-600 transition gap-4">

      {/* LEFT: ICON & DETAILS */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        
        {/* ICON WRAPPER (Sekarang pake Relative biar bisa tempel badge) */}
        <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 flex-shrink-0 border border-red-500/20">
              <Bike className="w-6 h-6 text-white" />
            </div>
            
            {/* 🔥 BADGE ANTRIAN (Muncul kalau ada queue_number) */}
            {transaction.queue_number && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-400 shadow-sm flex items-center gap-1 z-10">
                    <Ticket className="w-3 h-3" />
                    {transaction.queue_number}
                </div>
            )}
        </div>

        <div className="min-w-0">
          <h4 className="text-white font-bold truncate text-base flex items-center gap-2">
            {mainTitle}
          </h4>
          
          <p className="text-sm text-zinc-400 truncate flex items-center gap-2">
            <span className={isAdmin ? "text-red-400 font-medium" : "text-zinc-500"}>
              {subTitle}
            </span>
          </p>

          <p className="text-[10px] text-zinc-500 mt-0.5 sm:hidden">
            {formatDateTime(displayDate)}
          </p>
        </div>
      </div>

      {/* RIGHT: AMOUNT & ACTIONS */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-1 min-w-[140px]">

        {/* HARGA */}
        <p className={`font-mono font-bold text-lg tracking-tight ${parseInt(transaction.amount) === 0 ? 'text-zinc-500' : 'text-white'}`}>
          {formatRupiah(transaction.amount)}
        </p>

        {/* STATUS */}
        <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(transaction.status)}`}>
          {transaction.status || 'Menunggu'}
        </div>

        {/* TANGGAL DESKTOP */}
        <p className="text-[10px] text-zinc-500 hidden sm:block mt-1">
          +{transaction.points_earned} XP • {formatDateTime(displayDate)}
        </p>

        {isAdmin && (
          <div className="flex gap-2 mt-2">
             {showStatusButton && onToggleStatus && (
              <button
                onClick={() => onToggleStatus(transaction.id, transaction.status)}
                className="text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-3 py-1.5 rounded-lg transition border border-zinc-600"
              >
                Ubah Status
              </button>
            )}
            
            {showDelete && onDelete && (
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-xs bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 px-3 py-1.5 rounded-lg transition"
              >
                Hapus
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default TransactionRow;