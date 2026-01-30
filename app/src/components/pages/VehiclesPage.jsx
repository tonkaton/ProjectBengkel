import React, { useState, useMemo } from 'react';
import { Plus, Bike, Search } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { Button } from '../ui';

const VehiclesPage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { vehicles } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔍 SEARCH FILTER
  const filteredVehicles = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return vehicles.filter((v) =>
      v.brand?.toLowerCase().includes(keyword) ||
      v.model?.toLowerCase().includes(keyword) ||
      v.plate?.toLowerCase().includes(keyword) ||
      String(v.year).includes(keyword) ||
      v.User?.name?.toLowerCase().includes(keyword)
    );
  }, [vehicles, searchTerm]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">
          {isAdmin ? 'Data Kendaraan' : 'Motor Saya'}
        </h2>

        <div className="flex gap-3 w-full md:w-auto">
          {/* SEARCH */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari brand, plat, pemilik..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            />
          </div>

          {/* BUTTON TAMBAH */}
          {isAdmin && (
            <Button onClick={() => onOpenModal('addVehicle')} icon={Plus} size="lg">
              Tambah Motor
            </Button>
          )}
        </div>
      </div>

      {/* DATA LIST */}
      {paginatedVehicles.length === 0 ? (
        <p className="text-gray-400 text-center py-10">Data kendaraan tidak ditemukan</p>
      ) : (
        paginatedVehicles.map((v) => (
          <div
            key={v.id}
            className="p-5 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-yellow-500 transition"
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
              <Bike className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        ))
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          {/* PREV */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-zinc-800 text-white rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40"
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === i + 1
                  ? 'bg-yellow-500 text-black border-yellow-500 font-bold'
                  : 'bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-zinc-800 text-white rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;
