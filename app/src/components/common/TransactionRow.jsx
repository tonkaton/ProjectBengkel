import React from 'react';
import { Bike, Ticket, Calendar, Clock, UserX } from 'lucide-react';
import { useAuth } from '../../contexts';
import { formatRupiah, formatDateTime } from '../../utils/formatters';

const TransactionRow = ({
  transaction,
  onToggleStatus,
  onDelete,
  showDelete = true,
  showStatusButton = true,
}) => {
  const { isAdmin } = useAuth();

  let customerName = 'Unknown';
  let isDeletedUser = false;

  if (transaction.User) {
    customerName = transaction.User.name;
  } else if (transaction.customer) {
    customerName = transaction.customer.name;
  } else if (transaction.owner) {
    customerName = transaction.owner.name;
  } else {
    customerName = 'User (Dihapus)';
    isDeletedUser = true;
  }

  const serviceName =
    transaction.Service?.name || transaction.service?.name || transaction.note || 'Servis Rutin';

  const mainTitle = isAdmin ? customerName : serviceName;
  const subTitle = isAdmin ? serviceName : transaction.note || 'Perawatan Kendaraan';

  const displayDate = transaction.status === 'Selesai' ? transaction.updatedAt : transaction.createdAt;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai':
        return 'text-emerald-600 border-emerald-200 bg-emerald-50';
      case 'Proses':
        return 'text-amber-600 border-amber-200 bg-amber-50';
      case 'Menunggu':
        return 'text-ink2 border-slate-200 bg-slate-100';
      default:
        return 'text-ink2 border-slate-200 bg-slate-100';
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-all hover:shadow-soft-lg sm:flex-row">
      {/* 1. SLOT ANTRIAN */}
      {transaction.queue_number ? (
        <div className="flex shrink-0 flex-row items-center justify-center gap-2 border-b border-dashed border-hair bg-base p-4 sm:w-24 sm:flex-col sm:border-b-0 sm:border-r">
          <div className="flex flex-col items-center">
            <span className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-accent/70">Antrian</span>
            <div className="font-mono text-2xl font-bold leading-none text-accent sm:text-3xl">
              {transaction.queue_number.split('-')[1] || transaction.queue_number}
            </div>
            <div className="mt-1 hidden font-mono text-[10px] text-muted sm:block">
              {transaction.queue_number.split('-')[0] || ''}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden shrink-0 items-center justify-center border-r border-hair sm:flex sm:w-24">
          <Ticket className="h-8 w-8 text-slate-300" />
        </div>
      )}

      {/* 2. INFO UTAMA */}
      <div className="flex min-w-0 flex-1 items-center gap-4 p-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${
            isDeletedUser ? 'bg-red-100 text-red-500' : 'bg-base text-ink2 shadow-soft-in-sm'
          }`}
        >
          {isDeletedUser ? <UserX className="h-5 w-5 sm:h-6 sm:w-6" /> : <Bike className="h-5 w-5 sm:h-6 sm:w-6" />}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className={`mb-0.5 truncate text-base font-semibold sm:text-lg ${isDeletedUser ? 'italic text-accent' : 'text-ink'}`}>
            {mainTitle}
          </h4>
          <p className="mb-1 flex items-center gap-2 truncate text-sm">
            <span className={isAdmin ? 'font-medium text-accent' : 'text-muted'}>{subTitle}</span>
          </p>
          <div className="flex items-center gap-3 text-[10px] text-muted sm:text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDateTime(displayDate).split(',')[0]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(displayDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
            </span>
          </div>
        </div>
      </div>

      {/* 3. HARGA & ACTION */}
      <div className="flex flex-row items-center justify-between gap-3 border-t border-hair p-4 sm:flex-col sm:items-end sm:justify-center sm:gap-1 sm:border-t-0 sm:pl-0">
        <p className={`font-mono text-lg font-bold tracking-tight ${parseInt(transaction.amount) === 0 ? 'text-muted' : 'text-emerald-600'}`}>
          {formatRupiah(transaction.amount)}
        </p>

        <div className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(transaction.status)}`}>
          {transaction.status || 'Menunggu'}
        </div>

        {isAdmin && (
          <div className="mt-2 flex gap-2 sm:mt-3">
            {showStatusButton && onToggleStatus && (
              <button
                onClick={() => onToggleStatus(transaction.id, transaction.status)}
                className="rounded-full bg-base px-3 py-1.5 text-xs font-medium text-ink2 shadow-soft-sm transition active:shadow-soft-in-sm"
              >
                Status
              </button>
            )}
            {showDelete && onDelete && (
              <button
                onClick={() => onDelete(transaction.id)}
                className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-100"
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
