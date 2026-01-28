import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { useSearch } from '../../hooks';
import { formatRupiah } from '../../utils/formatters';
import { SearchInput, Button } from '../ui';

const ServicesPage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { services, deleteService } = useData();
  const { searchQuery, setSearchQuery, filteredData: filteredServices } = useSearch(
    services,
    ['name', 'duration']
  );

  const handleDelete = async (id) => {
    if (!confirm('Hapus layanan?')) return;
    const result = await deleteService(id);
    if (!result.success) {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Kelola Layanan</h2>
        <div className="flex items-center space-x-3">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari layanan..."
          />
          {isAdmin && (
            <Button
              onClick={() => onOpenModal('addService')}
              icon={Plus}
              size="lg"
            >
              Tambah Layanan
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((s) => (
          <div
            key={s.id}
            className="bg-zinc-800 p-5 rounded-xl border border-zinc-700 hover:border-yellow-500 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-white font-bold text-lg mb-1">{s.name}</h4>
                <p className="text-gray-400 text-sm">{s.duration}</p>
              </div>
              {isAdmin && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onOpenModal('editService', s)}
                    className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
              <span className="text-yellow-400 font-bold text-xl">
                {formatRupiah(s.price)}
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full text-white text-sm font-semibold">
                {s.points} Poin
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
