import React from 'react';
import { useAuth } from '../../contexts';
import { formatDate } from '../../utils/formatters';

const MaintenanceCard = ({ item }) => {
  const { isAdmin } = useAuth();
  
  const isUrgent =
    new Date(item.next_service) <=
    new Date(new Date().setDate(new Date().getDate() + 5));

  return (
    <div
      className={`p-4 rounded-xl border mb-3 ${
        isUrgent
          ? 'bg-red-900/20 border-red-500'
          : 'bg-zinc-800 border-zinc-700'
      } transition-all`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-white font-semibold mb-1">{item.motor_name}</h4>
          <p className="text-gray-400 text-sm">{item.note}</p>
          {isAdmin && item.User && (
            <p className="text-gray-500 text-xs mt-1">
              Pelanggan: {item.User.name}
            </p>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isUrgent ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
          }`}
        >
          {formatDate(item.next_service)}
        </span>
      </div>
    </div>
  );
};

export default MaintenanceCard;
