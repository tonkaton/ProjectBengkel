import React from 'react';
import { Plus, Gift } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { useSearch } from '../../hooks';
import { SearchInput, Button } from '../ui';

const RewardsPage = ({ onOpenModal }) => {
  const { isAdmin, currentUser } = useAuth();
  const { rewards, deleteReward, exchangeReward } = useData();
  const { searchQuery, setSearchQuery, filteredData: filteredRewards } = useSearch(
    rewards,
    ['name']
  );

  const handleDelete = async (id) => {
    if (!confirm('Hapus reward?')) return;
    const result = await deleteReward(id);
    if (!result.success) {
      alert('Gagal hapus');
    }
  };

  const handleExchange = async (reward) => {
    if (currentUser?.role !== 'user') {
      return alert('Hanya customer yang bisa tukar');
    }
    if ((currentUser.points || 0) < reward.points_needed) {
      return alert('Poin tidak cukup');
    }
    if (reward.stock <= 0) {
      return alert('Stok habis');
    }

    const result = await exchangeReward(reward.id);
    if (result.success) {
      alert(`Berhasil menukar ${reward.name}!`);
    } else {
      alert(result.message || 'Gagal tukar');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          {isAdmin ? 'Kelola Reward' : 'Tukar Reward'}
        </h2>
        <div className="flex items-center space-x-3">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari reward..."
          />
          {isAdmin && (
            <Button
              onClick={() => onOpenModal('addReward')}
              icon={Plus}
              size="lg"
            >
              Tambah Reward
            </Button>
          )}
          {!isAdmin && (
            <div className="px-6 py-3 bg-zinc-800 rounded-lg border border-zinc-700">
              <span className="text-gray-400">Poin Anda: </span>
              <span className="text-yellow-400 font-bold text-xl">
                {currentUser?.points || 0}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRewards.map((r) => (
          <div
            key={r.id}
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700 hover:border-red-500 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <span className="px-3 py-1 bg-zinc-700 rounded-full text-gray-300 text-sm">
                Stok: {r.stock}
              </span>
            </div>
            <h4 className="text-white font-bold text-lg mb-2">{r.name}</h4>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
              <span className="text-yellow-400 font-bold text-xl">
                {r.points_needed} Poin
              </span>
              <div className="flex items-center space-x-2">
                {isAdmin ? (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onOpenModal('editReward', r)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(r.id)}
                    >
                      Hapus
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleExchange(r)}
                  >
                    Tukar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
