import React from 'react';
import { Plus, Bike } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { Button } from '../ui';

const VehiclesPage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { vehicles } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          {isAdmin ? 'Data Kendaraan' : 'Motor Saya'}
        </h2>
        {isAdmin && (
          <Button
            onClick={() => onOpenModal('addVehicle')}
            icon={Plus}
            size="lg"
          >
            Tambah Motor
          </Button>
        )}
      </div>

      {vehicles.length === 0 ? (
        <p className="text-gray-400">Belum ada motor terdaftar</p>
      ) : (
        vehicles.map((v) => (
          <div
            key={v.id}
            className="p-5 bg-zinc-900 rounded-xl border border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold text-lg">
                  {v.brand} {v.model}
                </h4>
                <p className="text-gray-400 text-sm">
                  {v.plate} • Tahun {v.year}
                </p>
                {isAdmin && v.User && (
                  <p className="text-gray-500 text-xs mt-1">
                    Pemilik: {v.User.name}
                  </p>
                )}
              </div>
              <Bike className="w-8 h-8 text-red-400" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VehiclesPage;
