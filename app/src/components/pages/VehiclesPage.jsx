import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Bike, Search, User } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { Button } from '../ui';

const VehiclesPage = ({ onOpenModal }) => {
  const { isAdmin, currentUser } = useAuth();
  const { vehicles } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const displayedVehicles = useMemo(() => {
    let result = vehicles.filter((v) => v.owner || v.User);
    if (!isAdmin) {
      result = result.filter((v) => v.UserId === currentUser?.id || v.userId === currentUser?.id);
    }
    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase().trim();
      result = result.filter((v) =>
        [v.brand, v.model, v.plate, String(v.year), v.color, v.owner?.name, v.User?.name].some((field) =>
          field?.toLowerCase().includes(keyword)
        )
      );
    }
    return result;
  }, [vehicles, isAdmin, currentUser, searchTerm]);

  const totalPages = Math.ceil(displayedVehicles.length / itemsPerPage);
  const paginatedVehicles = displayedVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(1);
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-6 pb-32 md:pb-12">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">{isAdmin ? 'Master data' : 'Garasi'}</span>
          <h1 className="mt-1 flex items-center gap-3 font-display text-4xl tracking-wide text-ink">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-accent shadow-soft-sm">
              <Bike className="h-6 w-6" />
            </span>
            {isAdmin ? 'DATA KENDARAAN' : 'GARASI SAYA'}
          </h1>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Cari motor atau pemilik..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-full bg-base py-3 pl-11 pr-4 text-sm text-ink shadow-soft-in outline-none placeholder:text-muted"
            />
          </div>
          {isAdmin && (
            <Button onClick={() => onOpenModal('addVehicle')} icon={Plus} className="w-full sm:w-auto">
              Tambah Motor
            </Button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      {paginatedVehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-4xl border-2 border-dashed border-black/10 px-4 py-16 text-center">
          <Bike className="mb-5 h-12 w-12 text-slate-300" />
          <h3 className="mb-2 text-xl font-semibold text-ink">Data kosong</h3>
          <p className="max-w-md text-sm text-muted">
            {searchTerm ? 'Pencarian tidak ditemukan.' : 'Tidak ada data kendaraan yang valid.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedVehicles.map((v) => (
            <div key={v.id} className="rounded-4xl border border-white/70 bg-card p-6 shadow-soft transition-shadow hover:shadow-soft-lg">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-base text-slate-500 shadow-soft-in-sm">
                  <Bike className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-base px-3 py-1 text-xs font-medium text-muted shadow-soft-in-sm">{v.year}</span>
              </div>

              <h4 className="mb-2 truncate text-lg font-semibold tracking-tight text-ink md:text-xl">
                {v.brand} {v.model}
              </h4>

              <div className="mb-4 inline-block rounded-lg bg-base px-3 py-1 shadow-soft-in-sm">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">{v.plate}</p>
              </div>

              <div className="flex items-center justify-between border-t border-black/5 pt-3 text-xs">
                <div className="flex items-center gap-2 text-muted">
                  <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: v.color?.toLowerCase() || '#cbd5e1' }} />
                  <span className="capitalize">{v.color || 'N/A'}</span>
                </div>
                {isAdmin && (
                  <div className="flex max-w-[160px] items-center gap-1.5 rounded-full bg-base px-2.5 py-1 shadow-soft-in-sm">
                    <User className="h-3.5 w-3.5 text-muted" />
                    <span className="truncate text-slate-600">{v.owner?.name || v.User?.name || 'Error'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum;
            if (totalPages <= 7) pageNum = i + 1;
            else if (currentPage <= 4) pageNum = i + 1;
            else if (currentPage >= totalPages - 3) pageNum = totalPages - 6 + i;
            else pageNum = currentPage - 3 + i;

            const active = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`min-w-[40px] rounded-full px-4 py-2 text-sm transition ${
                  active ? 'bg-accent font-bold text-white shadow-[0_6px_14px_rgba(224,70,59,0.30)]' : 'bg-panel text-slate-600 shadow-soft'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;
