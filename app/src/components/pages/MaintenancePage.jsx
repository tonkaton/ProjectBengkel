import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { MaintenanceCard } from '../common';
import { Button } from '../ui';

const MaintenancePage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { maintenance } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-yellow-400" /> Semua Jadwal Maintenance
        </h2>
        {isAdmin && (
          <Button
            onClick={() => onOpenModal('addMaintenance')}
            icon={Plus}
            size="lg"
          >
            Tambah Jadwal
          </Button>
        )}
      </div>
      {maintenance.length === 0 ? (
        <p className="text-gray-400">Tidak ada jadwal maintenance</p>
      ) : (
        maintenance.map((m) => <MaintenanceCard key={m.id} item={m} />)
      )}
    </div>
  );
};

export default MaintenancePage;
