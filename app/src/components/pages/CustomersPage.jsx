import React from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../../contexts';
import { Button } from '../ui';

const CustomersPage = ({ onOpenModal }) => {
  const { customers } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Daftar Pelanggan</h2>
        <Button
          onClick={() => onOpenModal('addUser')}
          icon={Plus}
          size="lg"
        >
          Tambah Pelanggan
        </Button>
      </div>
      {customers.map((c) => (
        <div
          key={c.id}
          className="p-5 bg-zinc-800 rounded-xl border border-zinc-700 flex justify-between items-center"
        >
          <div>
            <h4 className="text-white font-bold">{c.name}</h4>
            <p className="text-gray-400 text-sm">{c.email}</p>
          </div>
          <div className="text-yellow-500 font-bold">{c.role}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomersPage;
