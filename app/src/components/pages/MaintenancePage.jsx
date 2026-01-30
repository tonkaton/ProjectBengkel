import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Search } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { MaintenanceCard } from '../common';
import { Button } from '../ui';
import { API_URL } from '../../constants'; // [UPDATE] Import API_URL buat fetch manual

const ITEMS_PER_PAGE = 10;

const MaintenancePage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { maintenance } = useData();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token'); // Ambil token dari session
      
      const response = await fetch(`${API_URL}/maintenance/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus data dari server');
      }
      
      // Reload simpel biar data ke-refresh otomatis
      window.location.reload(); 
    } catch (error) {
      console.error('Gagal menghapus:', error);
      alert('Gagal menghapus jadwal. Pastikan server berjalan dan token valid.');
    }
  };

  // 🔍 FILTER DATA
  const filteredMaintenance = useMemo(() => {
    return maintenance.filter((m) =>
      `${m.customer?.name || ''} ${m.owner?.name || ''} ${m.vehicle || ''} ${m.note || ''}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [maintenance, search]);

  // 📄 PAGINATION LOGIC
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-yellow-400" />
          Semua Jadwal Maintenance
        </h2>

        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari customer / kendaraan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-zinc-800 text-white pl-9 pr-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-yellow-500 w-64"
            />
          </div>

          {isAdmin && (
            <Button
              onClick={() => onOpenModal('addMaintenance')}
              icon={Plus}
              size="lg"
            >
              Tambah Jadwal
            </Button>
          )}
        </div>
      </div>

      {/* LIST */}
      {paginatedData.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          Tidak ada jadwal maintenance ditemukan
        </p>
      ) : (
        <div className="space-y-4">
          {paginatedData.map((m) => (
            <MaintenanceCard 
                key={m.id} 
                item={m} 
                onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-3 py-1 bg-zinc-800 text-white rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === i + 1
                  ? 'bg-yellow-500 text-black border-yellow-500 font-bold'
                  : 'bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-3 py-1 bg-zinc-800 text-white rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;