import React from 'react';
import { Plus, Gift, Search, Trash2, Edit } from 'lucide-react';
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
    if (!confirm('Yakin mau hapus reward ini?')) return;
    const result = await deleteReward(id);
    if (!result.success) {
      alert('Gagal hapus reward');
    }
  };

  const handleExchange = async (reward) => {
    if (currentUser?.role !== 'user') return alert('Hanya customer yang bisa tukar');
    if ((currentUser.points || 0) < reward.points_needed) return alert('Poin tidak cukup');
    if (reward.stock <= 0) return alert('Stok habis');

    if (confirm(`Tukar ${reward.points_needed} poin dengan ${reward.name}?`)) {
        const result = await exchangeReward(reward.id);
        if (result.success) {
          alert(`Berhasil menukar ${reward.name}!`);
        } else {
          alert(result.message || 'Gagal tukar');
        }
    }
  };

  return (
    // pb-32 penting biar list paling bawah gak ketutupan Widget Chatbot di HP
    <div className="space-y-6 pb-32 md:pb-12">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
             <div className="p-2 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg shadow-lg shadow-red-500/20">
                <Gift className="w-6 h-6 md:w-8 md:h-8 text-white" />
             </div>
             {isAdmin ? 'Kelola Reward' : 'Tukar Poin'}
           </h2>
           <p className="text-zinc-400 text-sm mt-1 ml-1">
             {isAdmin ? 'Atur stok dan jenis hadiah' : 'Tukarkan poin membermu dengan hadiah menarik!'}
           </p>
        </div>

        {/* User Points Badge (Mobile & Desktop) */}
        {!isAdmin && (
           <div className="md:hidden flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
              <span className="text-zinc-400 text-sm">Poin Kamu</span>
              <span className="text-yellow-400 font-bold text-xl">{currentUser?.points || 0}</span>
           </div>
        )}
      </div>

      {/* --- TOOLBAR (Search & Add) --- */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
           <SearchInput
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Cari hadiah..."
             className="w-full"
           />
        </div>

        {isAdmin ? (
            <Button
              onClick={() => onOpenModal('addReward')}
              icon={Plus}
              className="w-full md:w-auto shadow-lg shadow-red-600/20"
            >
              Tambah Reward
            </Button>
        ) : (
            // Desktop Point Badge
            <div className="hidden md:flex items-center gap-3 px-6 py-2 bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm">
               <span className="text-zinc-400 text-sm">Poin Kamu:</span>
               <span className="text-yellow-400 font-bold text-xl">{currentUser?.points || 0}</span>
            </div>
        )}
      </div>

      {/* --- GRID REWARDS --- */}
      {filteredRewards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
             <Gift className="w-10 h-10 text-zinc-700 mb-3" />
             <p className="text-zinc-500">Reward tidak ditemukan</p>
          </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredRewards.map((r) => {
            const canAfford = (currentUser?.points || 0) >= r.points_needed;
            const isOutOfStock = r.stock <= 0;

            return (
              <div
                key={r.id}
                className={`
                    group relative flex flex-col justify-between
                    bg-zinc-900 border transition-all duration-300 rounded-2xl p-5 overflow-hidden
                    ${isOutOfStock 
                        ? 'border-zinc-800 opacity-70 grayscale' 
                        : 'border-zinc-800 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-900/10 hover:-translate-y-1'
                    }
                `}
              >
                {/* Background Glow */}
                {!isOutOfStock && (
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-red-500/20 to-yellow-500/20 blur-2xl rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></div>
                )}

                <div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={`p-3 rounded-xl ${isOutOfStock ? 'bg-zinc-800' : 'bg-zinc-950 border border-zinc-800 group-hover:border-yellow-500/30'}`}>
                            <Gift className={`w-6 h-6 ${isOutOfStock ? 'text-zinc-600' : 'text-yellow-500'}`} />
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                            isOutOfStock 
                                ? 'bg-zinc-800 text-red-500 border-red-900/30' 
                                : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                        }`}>
                            Stok: {r.stock}
                        </span>
                    </div>

                    <h4 className="text-white font-bold text-lg mb-1 leading-tight line-clamp-2">{r.name}</h4>
                    <p className="text-yellow-500 font-mono font-bold text-xl mb-4">
                        {r.points_needed} Poin
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-zinc-800 mt-auto">
                   {isAdmin ? (
                       <div className="flex gap-2">
                           <Button
                             variant="secondary"
                             size="sm"
                             className="flex-1 text-xs"
                             onClick={() => onOpenModal('editReward', r)}
                           >
                             <Edit className="w-3 h-3 mr-1" /> Edit
                           </Button>
                           <Button
                             variant="danger"
                             size="sm"
                             className="w-10 px-0 flex items-center justify-center"
                             onClick={() => handleDelete(r.id)}
                           >
                             <Trash2 className="w-4 h-4" />
                           </Button>
                       </div>
                   ) : (
                       <Button
                         variant={isOutOfStock ? "secondary" : (canAfford ? "primary" : "secondary")}
                         className={`w-full ${!canAfford && !isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                         onClick={() => handleExchange(r)}
                         disabled={isOutOfStock || !canAfford}
                       >
                         {isOutOfStock ? 'Stok Habis' : (canAfford ? 'Tukar Sekarang' : 'Poin Kurang')}
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