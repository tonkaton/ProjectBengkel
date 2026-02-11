import React from 'react';
import { Wrench, Calendar, Clock, UserX, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts';
import { formatDate } from '../../utils/formatters';

const MaintenanceCard = ({ item, onDelete }) => {
  const { isAdmin } = useAuth();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const serviceDate = new Date(item.next_service);

  // Logic Status
  const isOverdue = serviceDate < today;
  const isUrgent = serviceDate <= new Date(new Date().setDate(today.getDate() + 5));

  // Logic Customer Data
  const customerData = item.User || item.customer || item.owner || item.Vehicle?.owner;
  const isDeletedUser = !customerData;
  const customerName = isDeletedUser ? 'User (Dihapus)' : customerData.name;

  // Motor Name
  const motorName = item.motor_name || 
    (item.Vehicle ? `${item.Vehicle.brand} ${item.Vehicle.model}` : 'Motor');

  // Status Color Helper
  const getStatusColor = () => {
    if (isOverdue) {
      return 'text-red-400 border-red-500/30 bg-red-500/10';
    }
    if (isUrgent) {
      return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
    }
    return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
  };

  const getStatusText = () => {
    if (isOverdue) return 'Terlewat';
    if (isUrgent) return 'Urgent';
    return 'Terjadwal';
  };

  return (
    <div className="group relative flex flex-col sm:flex-row bg-zinc-900/50 hover:bg-zinc-800/50 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden">
      
      {/* 1. STATUS INDICATOR */}
      <div className={`flex flex-row sm:flex-col items-center justify-center gap-2 p-4 border-b sm:border-b-0 sm:border-r border-dashed border-zinc-700 sm:w-24 shrink-0 ${
        isOverdue ? 'bg-red-500/5' : isUrgent ? 'bg-orange-500/5' : 'bg-yellow-500/5'
      }`}>
        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${
            isOverdue ? 'text-red-600/70' : isUrgent ? 'text-orange-600/70' : 'text-yellow-600/70'
          }`}>
            Service
          </span>
          <div className={`text-2xl sm:text-3xl font-mono font-bold leading-none ${
            isOverdue ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-yellow-500'
          }`}>
            {new Date(item.next_service).getDate()}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono hidden sm:block">
            {new Date(item.next_service).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()}
          </div>
        </div>
      </div>

      {/* 2. INFO UTAMA */}
      <div className="flex-1 p-4 flex items-center gap-4 min-w-0">
        
        {/* Icon Bulat */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${
          isDeletedUser 
            ? 'bg-red-900/20 border-red-900/30' 
            : isOverdue
              ? 'bg-red-800/20 border-red-700/30'
              : 'bg-zinc-800 border-zinc-700 group-hover:border-zinc-600'
        }`}>
          {isDeletedUser ? (
            <UserX className="w-5 h-5 sm:w-6 sm:h-6 text-red-500/70" />
          ) : (
            <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 group-hover:text-white transition-colors" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Judul Utama - Motor Name */}
          <h4 className="font-bold truncate text-base sm:text-lg mb-0.5 text-white">
            {motorName}
          </h4>
          
          {/* Sub Judul - Note */}
          <p className="text-sm truncate flex items-center gap-2 mb-1">
            <span className="text-zinc-400">
              {item.note || 'Perawatan Berkala'}
            </span>
          </p>

          {/* Admin: Customer Name */}
          {isAdmin && (
            <p className="text-xs flex items-center gap-1 mb-1">
              <span className="text-zinc-500">Pelanggan:</span>
              <span className={`font-medium ${isDeletedUser ? 'text-red-400 italic' : 'text-yellow-500/90'}`}>
                {customerName}
              </span>
            </p>
          )}

          {/* Tanggal Detail */}
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> 
              {formatDate(item.next_service)}
            </span>
            {item.createdAt && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Dibuat {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. STATUS & ACTION */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center p-4 sm:pl-0 gap-3 sm:gap-1 bg-zinc-900/30 sm:bg-transparent border-t sm:border-t-0 border-zinc-800/50">

        {/* Status Badge */}
        <div className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusColor()}`}>
          {getStatusText()}
        </div>

        {/* Hari Tersisa / Terlewat */}
        {!isOverdue && (
          <p className="text-xs text-zinc-500 font-mono">
            {Math.ceil((serviceDate - today) / (1000 * 60 * 60 * 24))} hari lagi
          </p>
        )}
        {isOverdue && (
          <p className="text-xs text-red-400 font-mono font-bold">
            {Math.abs(Math.ceil((serviceDate - today) / (1000 * 60 * 60 * 24)))} hari lewat
          </p>
        )}

        {/* Delete Button (Admin + Overdue) */}
        {isAdmin && isOverdue && onDelete && (
          <button
            onClick={() => {
              if (window.confirm('Hapus jadwal yang terlewat ini?')) {
                onDelete(item.id);
              }
            }}
            className="flex items-center gap-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-1.5 rounded transition mt-2"
          >
            <Trash2 className="w-3 h-3" />
            <span>Hapus</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MaintenanceCard;