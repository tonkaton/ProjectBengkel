import React from 'react';
import { Bike } from 'lucide-react';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai': return 'text-emerald-400';
      case 'Proses': return 'text-yellow-400';
      case 'Menunggu': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800/70 rounded-xl border border-zinc-700 hover:border-zinc-600 transition">

      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
          <Bike className="w-6 h-6 text-white" />
        </div>

        <div className="min-w-0">
          <h4 className="text-white font-semibold truncate">
            {transaction.customer?.name || 'Customer'}
          </h4>
          <p className="text-sm text-zinc-400 truncate">
            {transaction.service?.name || transaction.note || 'Servis'}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end text-right gap-1 min-w-[160px]">

        <p className={`font-bold text-base ${getStatusColor(transaction.status)}`}>
          {formatRupiah(transaction.amount)}
        </p>

        <p className="text-xs text-zinc-400">
          {transaction.points_earned} poin • {formatDateTime(transaction.createdAt)}
        </p>

        {isAdmin && showStatusButton && onToggleStatus && (
          <button
            onClick={() => onToggleStatus(transaction.id, transaction.status)}
            className="mt-2 text-xs bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-lg transition"
          >
            Ubah Status
          </button>
        )}

        {isAdmin && showDelete && onDelete && (
          <button
            onClick={() => onDelete(transaction.id)}
            className="mt-1 text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition"
          >
            Hapus
          </button>
        )}

      </div>
    </div>
  );
};

export default TransactionRow;
