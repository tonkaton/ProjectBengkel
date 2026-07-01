import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { useSearch } from '../../hooks';
import { formatRupiah } from '../../utils/formatters';
import { SearchInput, Button } from '../ui';

const ServicesPage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { services, deleteService } = useData();
  const { searchQuery, setSearchQuery, filteredData: filteredServices } = useSearch(services, ['name', 'duration']);

  const handleDelete = async (id) => {
    if (!confirm('Hapus layanan?')) return;
    const result = await deleteService(id);
    if (!result.success) alert('Gagal hapus');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Master data</span>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">KELOLA LAYANAN</h1>
        </div>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari layanan..." className="flex-1 sm:w-64" />
          {isAdmin && (
            <Button onClick={() => onOpenModal('addService')} icon={Plus}>
              Tambah
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((s) => (
          <div key={s.id} className="rounded-4xl border border-white/70 bg-card p-6 shadow-soft transition-shadow hover:shadow-soft-lg">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-ink">{s.name}</h4>
                <p className="text-sm text-muted">{s.duration || 'Estimasi —'}</p>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenModal('editService', s)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-base text-slate-500 shadow-soft-sm transition active:shadow-soft-in-sm"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-black/5 pt-4">
              <span className="font-mono text-xl font-semibold text-accent">{formatRupiah(s.price)}</span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">{s.points} Poin</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
