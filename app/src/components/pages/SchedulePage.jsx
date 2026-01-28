import React from 'react';
import { Calendar } from 'lucide-react';
import { useData } from '../../contexts';
import { MaintenanceCard } from '../common';

const SchedulePage = () => {
  const { maintenance } = useData();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-yellow-400" /> Jadwal Servis
      </h2>
      {maintenance.length === 0 ? (
        <p className="text-gray-400">Tidak ada jadwal servis terdaftar</p>
      ) : (
        maintenance.map((m) => <MaintenanceCard key={m.id} item={m} />)
      )}
    </div>
  );
};

export default SchedulePage;
