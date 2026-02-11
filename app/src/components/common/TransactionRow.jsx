import React from 'react';
import { Bike, Ticket, Calendar, Clock, UserX } from 'lucide-react'; // Tambah UserX icon
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

  // 🔥 LOGIC NAMA BARU (Lebih Pintar)
  let customerName = 'Unknown';
  let isDeletedUser = false;

  if (transaction.User) {
    customerName = transaction.User.name;
  } else if (transaction.customer) {
    customerName = transaction.customer.name;
  } else if (transaction.owner) {
    customerName = transaction.owner.name;
  } else {
    // Kalau User-nya NULL (karena udah dihapus)
    customerName = 'User (Dihapus)';
    isDeletedUser = true;
  }

  const serviceName = transaction.Service?.name || transaction.service?.name || transaction.note || 'Servis Rutin';

  const mainTitle = isAdmin ? customerName : serviceName;
  const subTitle = isAdmin ? serviceName : (transaction.note || 'Perawatan Kendaraan');

  // Logic Tanggal
  const displayDate = transaction.status === 'Selesai' 
    ? transaction.updatedAt 
    : transaction.createdAt;

  // Warna Status Helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Proses': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Menunggu': return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
      default: return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
    }
  };

  return (
    <div className="group relative flex flex-col sm:flex-row bg-zinc-900/50 hover:bg-zinc-800/50 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden">
      
      {/* 1. SLOT ANTRIAN */}
      {transaction.queue_number ? (
        <div className="flex flex-row sm:flex-col items-center justify-center gap-2 p-4 bg-yellow-500/5 border-b sm:border-b-0 sm:border-r border-dashed border-zinc-700 sm:w-24 shrink-0">
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-bold text-yellow-600/70 uppercase tracking-widest mb-0.5">Antrian</span>
             <div className="text-2xl sm:text-3xl font-mono font-bold text-yellow-500 leading-none">
                {transaction.queue_number.split('-')[1] || transaction.queue_number} 
             </div>
             <div className="text-[10px] text-zinc-500 mt-1 font-mono hidden sm:block">
                {transaction.queue_number.split('-')[0] || ''}
             </div>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex items-center justify-center sm:w-24 shrink-0 border-r border-zinc-800/50">
           <Ticket className="w-8 h-8 text-zinc-800" />
        </div>
      )}

      {/* 2. INFO UTAMA */}
      <div className="flex-1 p-4 flex items-center gap-4 min-w-0">
        
        {/* Icon Bulat */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${
             isDeletedUser 
                ? 'bg-red-900/20 border-red-900/30' 
                : 'bg-zinc-800 border-zinc-700 group-hover:border-zinc-600'
        }`}>
          {isDeletedUser ? (
             <UserX className="w-5 h-5 sm:w-6 sm:h-6 text-red-500/70" />
          ) : (
             <Bike className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 group-hover:text-white transition-colors" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Judul Utama */}
          <h4 className={`font-bold truncate text-base sm:text-lg mb-0.5 ${isDeletedUser ? 'text-red-400 italic' : 'text-white'}`}>
            {mainTitle}
          </h4>
          
          {/* Sub Judul */}
          <p className="text-sm truncate flex items-center gap-2 mb-1">
            <span className={isAdmin ? "text-yellow-500/90 font-medium" : "text-zinc-400"}>
              {subTitle}
            </span>
          </p>

          {/* Tanggal */}
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-zinc-500">
             <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> 
                {formatDateTime(displayDate).split(',')[0]} 
             </span>
             <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(displayDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
             </span>
          </div>
        </div>
      </div>

      {/* 3. HARGA & ACTION */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center p-4 sm:pl-0 gap-3 sm:gap-1 bg-zinc-900/30 sm:bg-transparent border-t sm:border-t-0 border-zinc-800/50">

        <p className={`font-mono font-bold text-lg tracking-tight ${parseInt(transaction.amount) === 0 ? 'text-zinc-600' : 'text-emerald-400'}`}>
          {formatRupiah(transaction.amount)}
        </p>

        <div className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusColor(transaction.status)}`}>
          {transaction.status || 'Menunggu'}
        </div>

        {isAdmin && (
          <div className="flex gap-2 mt-2 sm:mt-3">
             {showStatusButton && onToggleStatus && (
              <button
                onClick={() => onToggleStatus(transaction.id, transaction.status)}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded border border-zinc-700 transition"
              >
                Status
              </button>
            )}
            
            {showDelete && onDelete && (
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-1.5 rounded transition"
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