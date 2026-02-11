import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Bike, Search, User } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { Button } from '../ui';

const VehiclesPage = ({ onOpenModal }) => {
  const { isAdmin, currentUser } = useAuth();
  const { vehicles } = useData();

  // ─── Search & Pagination State ─────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 👈 UPDATE: Sekarang cuma 6 biar pagination muncul

  // ─── Combined Filter Logic ─────────────────────────────────────────
  const displayedVehicles = useMemo(() => {
    // 🔥 STEP 1: SAPU BERSIH - Cuma ambil motor yang ada pemiliknya
    let result = vehicles.filter((v) => v.owner || v.User);

    // STEP 2: Filter berdasarkan role (User cuma liat motor sendiri)
    if (!isAdmin) {
      result = result.filter((v) => v.UserId === currentUser?.id || v.userId === currentUser?.id);
    }

    // STEP 3: Terapkan search
    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase().trim();
      result = result.filter((v) =>
        [
          v.brand,
          v.model,
          v.plate,
          String(v.year),
          v.color,
          v.owner?.name,
          v.User?.name,
        ].some((field) => field?.toLowerCase().includes(keyword))
      );
    }

    return result;
  }, [vehicles, isAdmin, currentUser, searchTerm]);

  // ─── Pagination Slice ──────────────────────────────────────────────
  const totalPages = Math.ceil(displayedVehicles.length / itemsPerPage);
  const paginatedVehicles = displayedVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-6 pb-32 md:pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-red-600/20 rounded-lg">
              <Bike className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
            </div>
            {isAdmin ? 'Data Kendaraan' : 'Garasi Saya'}
          </h2>
          <p className="text-zinc-400 text-sm mt-1 ml-1">
            {isAdmin ? 'Kelola semua kendaraan pelanggan' : 'Daftar motor yang terdaftar di bengkel'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Cari motor atau pemilik..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900/60 text-white border border-zinc-700 focus:border-red-500/60 outline-none transition"
            />
          </div>

          {isAdmin && (
            <Button
              onClick={() => onOpenModal('addVehicle')}
              icon={Plus}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            >
              Tambah Motor
            </Button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      {paginatedVehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
          <Bike className="w-12 h-12 text-zinc-600 mb-5" />
          <h3 className="text-white font-bold text-xl mb-2">Data Kosong</h3>
          <p className="text-zinc-400 text-sm max-w-md">
            {searchTerm ? 'Pencarian tidak ditemukan.' : 'Tidak ada data kendaraan yang valid.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {paginatedVehicles.map((v) => (
            <div
              key={v.id}
              className="group relative bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-red-600/40 rounded-2xl p-5 transition-all duration-300 shadow-md overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-red-600/10 to-transparent blur-3xl opacity-70" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 group-hover:border-red-600/30">
                    <Bike className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <span className="px-3 py-1 bg-zinc-800/80 rounded-md text-xs font-medium text-zinc-300 border border-zinc-700">
                    {v.year}
                  </span>
                </div>

                <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1 truncate">
                  {v.brand} {v.model}
                </h4>

                <div className="inline-block bg-black/50 border border-zinc-700/60 rounded px-3 py-1 mb-4">
                  <p className="text-xs font-mono font-bold text-yellow-400/90 tracking-wider uppercase">
                    {v.plate}
                  </p>
                </div>

                <div className="border-t border-zinc-800 pt-3 mt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <div
                      className="w-4 h-4 rounded-full border border-zinc-600 shadow-sm"
                      style={{ backgroundColor: v.color?.toLowerCase() || '#666' }}
                    />
                    <span className="capitalize">{v.color || 'N/A'}</span>
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-full border border-zinc-800 max-w-[160px]">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="truncate text-zinc-300">
                        {v.owner?.name || v.User?.name || 'Error'} 
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION NOMOR */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 transition shadow-md"
          >
            Prev
          </button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum;
            if (totalPages <= 7) pageNum = i + 1;
            else if (currentPage <= 4) pageNum = i + 1;
            else if (currentPage >= totalPages - 3) pageNum = totalPages - 6 + i;
            else pageNum = currentPage - 3 + i;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 rounded-lg border min-w-[40px] transition shadow-md ${
                  currentPage === pageNum
                    ? 'bg-red-600 text-white border-red-600 font-bold'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 transition shadow-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;