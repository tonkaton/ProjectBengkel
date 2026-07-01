import React from 'react';
import { Plus, Gift, Trash2, Edit } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { useSearch } from '../../hooks';
import { SearchInput, Button } from '../ui';

const RewardsPage = ({ onOpenModal }) => {
  const { isAdmin, currentUser } = useAuth();
  const { rewards, deleteReward, exchangeReward } = useData();
  const { searchQuery, setSearchQuery, filteredData: filteredRewards } = useSearch(rewards, ['name']);

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus reward ini?')) return;
    const result = await deleteReward(id);
    if (!result.success) alert('Gagal hapus reward');
  };

  const handleExchange = async (reward) => {
    if (currentUser?.role !== 'user') return alert('Hanya customer yang bisa tukar');
    if ((currentUser.points || 0) < reward.points_needed) return alert('Poin tidak cukup');
    if (reward.stock <= 0) return alert('Stok habis');

    if (confirm(`Tukar ${reward.points_needed} poin dengan ${reward.name}?`)) {
      const result = await exchangeReward(reward.id);
      if (result.success) alert(`Berhasil menukar ${reward.name}!`);
      else alert(result.message || 'Gagal tukar');
    }
  };

  const PointBadge = () => (
    <div className="flex items-center gap-3 rounded-2xl bg-card px-6 py-3 shadow-soft">
      <span className="text-sm text-muted">Poin Kamu:</span>
      <span className="font-mono text-xl font-bold text-accent">{currentUser?.points || 0}</span>
    </div>
  );

  return (
    <div className="space-y-6 pb-32 md:pb-12">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">{isAdmin ? 'Master data' : 'Loyalti'}</span>
          <h1 className="mt-1 flex items-center gap-3 font-display text-4xl tracking-wide text-ink">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-accent shadow-soft-sm">
              <Gift className="h-6 w-6" />
            </span>
            {isAdmin ? 'KELOLA REWARD' : 'TUKAR POIN'}
          </h1>
        </div>
        {!isAdmin && <div className="md:hidden"><PointBadge /></div>}
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col gap-3 md:flex-row">
        <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari hadiah..." className="flex-1" />
        {isAdmin ? (
          <Button onClick={() => onOpenModal('addReward')} icon={Plus} className="w-full md:w-auto">
            Tambah Reward
          </Button>
        ) : (
          <div className="hidden md:block"><PointBadge /></div>
        )}
      </div>

      {/* GRID */}
      {filteredRewards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-4xl border-2 border-dashed border-black/10 px-4 py-16 text-center">
          <Gift className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-muted">Reward tidak ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRewards.map((r) => {
            const canAfford = (currentUser?.points || 0) >= r.points_needed;
            const isOutOfStock = r.stock <= 0;

            return (
              <div
                key={r.id}
                className={`flex flex-col justify-between rounded-4xl border border-white/70 bg-card p-5 shadow-soft transition-all ${
                  isOutOfStock ? 'opacity-70' : 'hover:shadow-soft-lg'
                }`}
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isOutOfStock ? 'bg-base text-slate-400' : 'bg-amber-100 text-amber-600'} shadow-soft-sm`}>
                      <Gift className="h-6 w-6" />
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isOutOfStock ? 'bg-red-50 text-red-500' : 'bg-base text-muted shadow-soft-in-sm'}`}>
                      Stok: {r.stock}
                    </span>
                  </div>
                  <h4 className="mb-1 line-clamp-2 text-lg font-semibold leading-tight text-ink">{r.name}</h4>
                  <p className="mb-4 font-mono text-xl font-bold text-accent">{r.points_needed} Poin</p>
                </div>

                <div className="mt-auto border-t border-black/5 pt-4">
                  {isAdmin ? (
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1 text-xs" onClick={() => onOpenModal('editReward', r)}>
                        <Edit className="mr-1 h-3 w-3" /> Edit
                      </Button>
                      <Button variant="danger" size="sm" className="flex w-10 items-center justify-center px-0" onClick={() => handleDelete(r.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant={canAfford && !isOutOfStock ? 'primary' : 'secondary'}
                      className={`w-full ${!canAfford && !isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                      onClick={() => handleExchange(r)}
                      disabled={isOutOfStock || !canAfford}
                    >
                      {isOutOfStock ? 'Stok Habis' : canAfford ? 'Tukar Sekarang' : 'Poin Kurang'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RewardsPage;
