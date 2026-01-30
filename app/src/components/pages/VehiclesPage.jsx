import React, { useState, useMemo } from 'react';
import { Plus, Bike, Search, User } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { Button } from '../ui';

const VehiclesPage = ({ onOpenModal }) => {
  const { isAdmin, currentUser } = useAuth();
  const { vehicles } = useData();

  // ─── Search & Pagination State ─────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ─── Combined Filter Logic ─────────────────────────────────────────
  const displayedVehicles = useMemo(() => {
    // Step 1: Filter berdasarkan role (admin vs user)
    let result = isAdmin
      ? vehicles
      : vehicles.filter((v) => v.UserId === currentUser?.id || v.userId === currentUser?.id);

    // Step 2: Terapkan search jika ada kata kunci
    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase().trim();
      result = result.filter((v) =>
        [
          v.brand,
          v.model,
          v.plate,
          String(v.year),
          v.color,
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

  // Reset page ke 1 kalau search berubah & hasil < page sekarang
  React.useEffect(() => {
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
            {isAdmin
              ? 'Kelola semua kendaraan pelanggan'
              : 'Daftar motor yang terdaftar di bengkel'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Cari brand, model, plat, tahun, warna, pemilik..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900/60 text-white border border-zinc-700 focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 outline-none transition"
            />
          </div>

          {/* Tombol Tambah (hanya admin) */}
          {isAdmin && (
            <Button
              onClick={() => onOpenModal('addVehicle')}
              icon={Plus}
              className="w-full sm:w-auto shadow-lg shadow-red-900/20 bg-red-600 hover:bg-red-700 text-white"
            >
              Tambah Motor
            </Button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      {paginatedVehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
          <div className="bg-zinc-800/60 p-5 rounded-full mb-5">
            <Bike className="w-12 h-12 text-zinc-600" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Belum ada motor</h3>
          <p className="text-zinc-400 text-sm max-w-md">
            {isAdmin ? (
              searchTerm ? (
                'Tidak ditemukan kendaraan dengan kata kunci tersebut.'
              ) : (
                'Belum ada data kendaraan di sistem.'
              )
            ) : searchTerm ? (
              'Tidak ada motor yang cocok dengan pencarianmu.'
            ) : (
              'Kamu belum punya motor terdaftar. Hubungi admin untuk mendaftarkan motor kamu.'
            )}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {paginatedVehicles.map((v) => (
            <div
              key={v.id}
              className="group relative bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-red-600/40 rounded-2xl p-5 transition-all duration-300 shadow-md hover:shadow-red-900/20 overflow-hidden"
            >
              {/* Gradient decorative */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-red-600/10 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 group-hover:border-red-600/30 transition-colors">
                    <Bike className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <span className="px-3 py-1 bg-zinc-800/80 rounded-md text-xs font-medium text-zinc-300 border border-zinc-700">
                    {v.year}
                  </span>
                </div>

                <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1 line-clamp-1">
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
                    <span className="capitalize">{v.color || 'Tidak diketahui'}</span>
                  </div>

                  {isAdmin && v.User && (
                    <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-full border border-zinc-800 max-w-[160px]">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="truncate text-zinc-300">{v.User.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            // Simple pagination: tampilkan max 7 page number
            let pageNum;
            if (totalPages <= 7) {
              pageNum = i + 1;
            } else if (currentPage <= 4) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNum = totalPages - 6 + i;
            } else {
              pageNum = currentPage - 3 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 rounded-lg border min-w-[40px] transition ${
                  currentPage === pageNum
                    ? 'bg-red-600 text-white border-red-600 font-semibold'
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
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;