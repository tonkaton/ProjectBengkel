import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Search } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { MaintenanceCard } from '../common';
import { Button } from '../ui';
import { API_URL } from '../../constants';

const ITEMS_PER_PAGE = 10;

const MaintenancePage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { maintenance } = useData();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/maintenance/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Gagal menghapus data dari server');
      window.location.reload();
    } catch (error) {
      console.error('Gagal menghapus:', error);
      alert('Gagal menghapus jadwal. Pastikan server berjalan dan token valid.');
    }
  };

  const filteredMaintenance = useMemo(() => {
    return maintenance.filter((m) =>
      `${m.customer?.name || ''} ${m.owner?.name || ''} ${m.vehicle || ''} ${m.note || ''}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [maintenance, search]);

  const totalPages = Math.ceil(filteredMaintenance.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMaintenance.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMaintenance, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Perawatan</span>
          <h1 className="mt-1 flex items-center gap-3 font-display text-4xl tracking-wide text-ink">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-soft-sm">
              <Calendar className="h-6 w-6" />
            </span>
            JADWAL SERVIS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Cari customer / kendaraan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-64 rounded-full bg-base py-3 pl-11 pr-4 text-sm text-ink shadow-soft-in outline-none placeholder:text-muted"
            />
          </div>
          {isAdmin && (
            <Button onClick={() => onOpenModal('addMaintenance')} icon={Plus}>
              Tambah Jadwal
            </Button>
          )}
        </div>
      </div>

      {/* LIST */}
      {paginatedData.length === 0 ? (
        <p className="py-10 text-center text-muted">Tidak ada jadwal maintenance ditemukan</p>
      ) : (
        <div className="space-y-4">
          {paginatedData.map((m) => (
            <MaintenanceCard key={m.id} item={m} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition disabled:opacity-40"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`min-w-[40px] rounded-full px-4 py-2 text-sm transition ${
                currentPage === i + 1
                  ? 'bg-accent font-bold text-white shadow-[0_6px_14px_rgba(224,70,59,0.30)]'
                  : 'bg-panel text-slate-600 shadow-soft'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
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

export default MaintenancePage;
