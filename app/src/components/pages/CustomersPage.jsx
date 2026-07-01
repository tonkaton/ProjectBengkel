import React from 'react';
import { Plus, Trash2, User, Mail, Coins } from 'lucide-react';
import { useData } from '../../contexts';
import { Button } from '../ui';

const CustomersPage = ({ onOpenModal }) => {
  const { customers, deleteCustomer } = useData();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Yakin hapus pelanggan ini?')) return;
    const result = await deleteCustomer(id);
    if (result.success) alert('Pelanggan berhasil dihapus!');
    else alert('Gagal: ' + result.message);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Master data</span>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">DAFTAR PELANGGAN</h1>
          <p className="mt-1 text-sm text-muted">Kelola data user dan pantau loyalty points mereka.</p>
        </div>
        <Button onClick={() => onOpenModal('addUser')} icon={Plus}>
          Tambah Pelanggan
        </Button>
      </div>

      {customers.length === 0 ? (
        <div className="rounded-4xl border-2 border-dashed border-hair py-12 text-center text-muted">
          Belum ada data pelanggan.
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((c) => (
            <div
              key={c.id}
              onClick={() => onOpenModal('editUser', c)}
              className="group flex cursor-pointer items-center justify-between rounded-3xl border border-line bg-card p-4 shadow-soft transition-all hover:shadow-soft-lg"
            >
              {/* KIRI */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-base text-accent shadow-soft-in-sm">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold leading-tight text-ink">{c.name}</h4>
                  <div className="mt-1 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:items-center sm:gap-4">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> {c.email}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-600">
                      <Coins className="h-3.5 w-3.5" /> {c.points || 0} Poin
                    </span>
                  </div>
                </div>
              </div>

              {/* KANAN */}
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                    c.role === 'admin' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                  }`}
                >
                  {c.role}
                </span>
                <button
                  onClick={(e) => handleDelete(e, c.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                  title="Hapus Pelanggan"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
