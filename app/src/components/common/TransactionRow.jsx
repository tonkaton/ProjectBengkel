import React from 'react';
import { Bike } from 'lucide-react';
import { useAuth } from '../../contexts';
import { formatRupiah, formatDateTime } from '../../utils/formatters';

const TransactionRow = ({ transaction, onToggleStatus, onDelete }) => {
  const { isAdmin } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai':
        return 'text-green-400';
      case 'Proses':
        return 'text-yellow-400';
       case 'Menunggu':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-red-500 transition-all mb-3">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
          <Bike className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-white font-semibold">
            {transaction.customer?.name || 'Customer'}
          </h4>
          <p className="text-gray-400 text-sm">
            {transaction.service?.name || transaction.note || 'Servis'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <p className={`font-bold ${getStatusColor(transaction.status)}`}>
          {formatRupiah(transaction.amount)}
        </p>
        <p className="text-sm text-gray-400">
          {transaction.points_earned} poin • {formatDateTime(transaction.createdAt)}
        </p>
        {isAdmin && onToggleStatus && (
          <button
            onClick={() => onToggleStatus(transaction.id, transaction.status)}
            className="mt-100 text-xs bg-zinc-600 px-3 py-1 rounded hover:bg-zinc-600 transition-colors"
          >
            Ubah Status ({transaction.status})
          </button>  
        )}
        {isAdmin && (
        <button 
        onClick={() => onDelete(transaction.id)}
        className="hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm">
        Hapus
        </button>
        )}
      </div>
    </div>
    
  );
};

export default TransactionRow;
