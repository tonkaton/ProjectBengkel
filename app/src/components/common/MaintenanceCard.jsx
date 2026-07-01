import React from 'react';
import { Wrench, Calendar, Clock, UserX, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts';
import { formatDate } from '../../utils/formatters';

const MaintenanceCard = ({ item, onDelete }) => {
  const { isAdmin } = useAuth();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const serviceDate = new Date(item.next_service);

  const isOverdue = serviceDate < today;
  const isUrgent = serviceDate <= new Date(new Date().setDate(today.getDate() + 5));

  const customerData = item.User || item.customer || item.owner || item.Vehicle?.owner;
  const isDeletedUser = !customerData;
  const customerName = isDeletedUser ? 'User (Dihapus)' : customerData.name;

  const motorName =
    item.motor_name || (item.Vehicle ? `${item.Vehicle.brand} ${item.Vehicle.model}` : 'Motor');

  const tone = isOverdue
    ? { slot: 'bg-red-50', label: 'text-red-500', num: 'text-red-500', pill: 'text-red-600 border-red-200 bg-red-50' }
    : isUrgent
    ? { slot: 'bg-orange-50', label: 'text-orange-500', num: 'text-orange-500', pill: 'text-orange-600 border-orange-200 bg-orange-50' }
    : { slot: 'bg-amber-50', label: 'text-amber-500', num: 'text-amber-500', pill: 'text-amber-600 border-amber-200 bg-amber-50' };

  const getStatusText = () => {
    if (isOverdue) return 'Terlewat';
    if (isUrgent) return 'Urgent';
    return 'Terjadwal';
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-all hover:shadow-soft-lg sm:flex-row">
      {/* 1. STATUS INDICATOR */}
      <div className={`flex shrink-0 flex-row items-center justify-center gap-2 border-b border-dashed border-hair p-4 sm:w-24 sm:flex-col sm:border-b-0 sm:border-r ${tone.slot}`}>
        <div className="flex flex-col items-center">
          <span className={`mb-0.5 text-[10px] font-bold uppercase tracking-widest ${tone.label}`}>Service</span>
          <div className={`font-mono text-2xl font-bold leading-none sm:text-3xl ${tone.num}`}>
            {new Date(item.next_service).getDate()}
          </div>
          <div className="mt-1 hidden font-mono text-[10px] text-muted sm:block">
            {new Date(item.next_service).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()}
          </div>
        </div>
      </div>

      {/* 2. INFO UTAMA */}
      <div className="flex min-w-0 flex-1 items-center gap-4 p-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${
            isDeletedUser ? 'bg-red-100 text-red-500' : 'bg-base text-ink2 shadow-soft-in-sm'
          }`}
        >
          {isDeletedUser ? <UserX className="h-5 w-5 sm:h-6 sm:w-6" /> : <Wrench className="h-5 w-5 sm:h-6 sm:w-6" />}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="mb-0.5 truncate text-base font-semibold text-ink sm:text-lg">{motorName}</h4>
          <p className="mb-1 flex items-center gap-2 truncate text-sm">
            <span className="text-muted">{item.note || 'Perawatan Berkala'}</span>
          </p>

          {isAdmin && (
            <p className="mb-1 flex items-center gap-1 text-xs">
              <span className="text-muted">Pelanggan:</span>
              <span className={`font-medium ${isDeletedUser ? 'italic text-accent' : 'text-ink2'}`}>
                {customerName}
              </span>
            </p>
          )}

          <div className="flex items-center gap-3 text-[10px] text-muted sm:text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(item.next_service)}
            </span>
            {item.createdAt && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Dibuat {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. STATUS & ACTION */}
      <div className="flex flex-row items-center justify-between gap-3 border-t border-hair p-4 sm:flex-col sm:items-end sm:justify-center sm:gap-1 sm:border-t-0 sm:pl-0">
        <div className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${tone.pill}`}>
          {getStatusText()}
        </div>

        {!isOverdue && (
          <p className="font-mono text-xs text-muted">
            {Math.ceil((serviceDate - today) / (1000 * 60 * 60 * 24))} hari lagi
          </p>
        )}
        {isOverdue && (
          <p className="font-mono text-xs font-bold text-red-500">
            {Math.abs(Math.ceil((serviceDate - today) / (1000 * 60 * 60 * 24)))} hari lewat
          </p>
        )}

        {isAdmin && isOverdue && onDelete && (
          <button
            onClick={() => {
              if (window.confirm('Hapus jadwal yang terlewat ini?')) {
                onDelete(item.id);
              }
            }}
            className="mt-2 flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-100"
          >
            <Trash2 className="h-3 w-3" />
            <span>Hapus</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MaintenanceCard;
