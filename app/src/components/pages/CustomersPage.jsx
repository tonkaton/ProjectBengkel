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
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold text-white">Daftar Pelanggan</h2>
           <p className="text-zinc-400 mt-1">Kelola data user dan pantau loyalty points mereka.</p>
        </div>
        <Button
          onClick={() => onOpenModal('addUser')}
          icon={Plus}
          size="lg"
        >
          Tambah Pelanggan
        </Button>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 bg-zinc-800/50 border border-dashed border-zinc-700 rounded-xl">
          Belum ada data pelanggan.
        </div>
      ) : (
        <div className="space-y-3"> 
          {customers.map((c) => (
            <div
              key={c.id}
              onClick={() => onOpenModal('editUser', c)}
              className="group flex items-center justify-between p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-yellow-500 hover:bg-zinc-800/80 transition-all cursor-pointer"
            >
              {/* KIRI: INFO USER */}
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-zinc-900 rounded-lg text-yellow-500">
                    <User className="w-5 h-5" />
                 </div>
                 
                 <div>
                    <h4 className="text-white font-bold text-lg leading-tight">{c.name}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-zinc-400 mt-1">
                        <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" /> {c.email}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500 font-semibold bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                            <Coins className="w-3.5 h-3.5" /> {c.points || 0} Loyalty Points
                        </span>
                    </div>
                 </div>
              </div>

              {/* KANAN: ROLE & DELETE */}
              <div className="flex items-center gap-4">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    c.role === 'admin' 
                      ? 'bg-red-900/20 text-red-400 border-red-900/30' 
                      : 'bg-blue-900/20 text-blue-400 border-blue-900/30'
                 }`}>
                    {c.role}
                 </span>

                 <button
                    onClick={(e) => handleDelete(e, c.id)}
                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Hapus Pelanggan"
                 >
                    <Trash2 className="w-5 h-5" />
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