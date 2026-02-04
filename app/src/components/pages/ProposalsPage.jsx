import React, { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { ProposalForm } from '../forms';
import { proposalService } from '../../services'; // 👈 IMPORT SERVICE
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { 
  Plus, FileText, CheckCircle, XCircle, 
  Clock, Eye, AlertCircle, Search, Loader2 
} from 'lucide-react';
import { formatDate, formatRupiah } from '../../utils/formatters';

const ITEMS_PER_PAGE = 10;

const ProposalsPage = () => {
  const { userRole, token } = useAuth();
  const { proposals, acceptProposal, rejectProposal } = useData();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false); // 👈 STATE LOADING
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // SEARCH & FILTER
  const filteredProposals = useMemo(() => {
    return proposals.filter((p) =>
      `${p.title || ''} ${p.vehicle?.plate || ''} ${p.admin_note || ''}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [proposals, search]);

  // PAGINATION
  const totalPages = Math.ceil(filteredProposals.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProposals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProposals, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 👇 FUNGSI BARU: TARIK DATA DETAIL
  const handleViewDetail = async (proposal) => {
    // 1. Tampilkan modal dengan data seadanya dulu
    setSelectedProposal(proposal);
    setIsLoadingDetail(true);

    try {
      // 2. Request data lengkap (items) ke server
      const response = await proposalService.getDetail(proposal.id, token);
      const fullData = response.data || response; // Handle struktur response
      
      // 3. Update data di modal dengan yang lengkap
      setSelectedProposal(fullData);
    } catch (error) {
      console.error("Gagal ambil detail:", error);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Accepted': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Converted': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'Rejected': return 'text-red-400 border-red-500/30 bg-red-500/10';
      default: return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold text-white flex items-center">
             <FileText className="w-6 h-6 mr-2 text-blue-400" />
             {userRole === 'admin' ? 'Project Custom' : 'Penawaran Saya'}
           </h2>
           <p className="text-zinc-400 text-sm mt-1">
             {userRole === 'admin' 
               ? 'Kelola penawaran modifikasi dan estimasi.' 
               : 'Daftar estimasi biaya untuk project motor Anda.'}
           </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul / plat nomor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-zinc-800 text-white pl-9 pr-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-blue-500 w-64 placeholder-zinc-500"
            />
          </div>

          {userRole === 'admin' && (
            <Button icon={Plus} onClick={() => setIsCreateOpen(true)} size="lg">
              Buat Proposal
            </Button>
          )}
        </div>
      </div>

      {/* LIST PROPOSALS */}
      <div className="space-y-3">
        {paginatedData.length === 0 ? (
          <div className="p-10 text-center border border-dashed border-zinc-700 rounded-xl bg-zinc-800/30">
            <FileText className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
            <p className="text-zinc-500">Belum ada data proposal ditemukan.</p>
          </div>
        ) : (
          paginatedData.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-800/70 rounded-xl border border-zinc-700 hover:border-zinc-500 transition gap-4 group"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 flex-shrink-0 border border-blue-400/20 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold truncate text-base">{item.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="bg-zinc-700/50 px-2 py-0.5 rounded text-zinc-300 text-xs border border-zinc-600">
                        {item.vehicle ? `${item.vehicle.model} (${item.vehicle.plate})` : 'Tanpa Kendaraan'}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-1 min-w-[140px]">
                <p className="font-mono font-bold text-lg text-white tracking-tight">
                  {formatRupiah(item.grand_total)}
                </p>
                <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(item.status)}`}>
                  {item.status === 'Converted' ? 'Jadi Transaksi' : item.status}
                </div>
                <div className="mt-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 text-xs"
                    onClick={() => handleViewDetail(item)} // 👈 PAKE FUNGSI BARU
                  >
                    <Eye size={14} className="mr-1" /> Detail
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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
                  ? 'bg-blue-600 text-white border-blue-500 font-bold'
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

      {/* MODAL 1: CREATE FORM */}
      <Modal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Buat Proposal Project Baru"
      >
        <ProposalForm onClose={() => setIsCreateOpen(false)} />
      </Modal>

      {/* MODAL 2: DETAIL VIEW */}
      <Modal
        open={!!selectedProposal}
        onClose={() => setSelectedProposal(null)}
        title="Rincian Penawaran"
      >
        {selectedProposal && (
          <div className="space-y-5">
            {/* Header Detail Card */}
            <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 relative overflow-hidden">
              <h3 className="font-bold text-xl text-white mb-1">{selectedProposal.title}</h3>
              <div className="flex justify-between items-center text-sm text-zinc-400 border-b border-zinc-700 pb-3 mb-3">
                <span>Ref: #{selectedProposal.id}</span>
                <span>{formatDate(selectedProposal.createdAt)}</span>
              </div>
              <div className="text-sm space-y-2">
                <p className="flex justify-between">
                    <span className="text-zinc-500">Kendaraan:</span> 
                    <span className="text-zinc-200 font-medium">
                        {selectedProposal.vehicle?.brand} {selectedProposal.vehicle?.model} ({selectedProposal.vehicle?.plate})
                    </span>
                </p>
                {selectedProposal.admin_note && (
                  <div className="mt-2 bg-zinc-900/50 p-2 rounded text-zinc-400 italic text-xs border border-zinc-700/50">
                     " {selectedProposal.admin_note} "
                  </div>
                )}
              </div>
            </div>

            {/* List Items Table (SCROLLABLE & STICKY) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-zinc-300 flex items-center gap-2 text-sm">
                  <FileText size={16} className="text-blue-400" /> Rincian Biaya
                </h4>
                {isLoadingDetail && (
                  <span className="text-xs text-blue-400 flex items-center animate-pulse">
                    <Loader2 size={12} className="mr-1 animate-spin" /> Memuat Item...
                  </span>
                )}
              </div>
              
              <div className="border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900">
                {/* 👇 WRAPPER INI YANG BIKIN SCROLL */}
                <div className="max-h-60 overflow-y-auto custom-scrollbar relative">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-950 text-zinc-500 sticky top-0 z-10 shadow-sm border-b border-zinc-800">
                      <tr>
                        <th className="px-3 py-3 text-left font-medium text-xs uppercase tracking-wider">Deskripsi</th>
                        <th className="px-3 py-3 text-center font-medium text-xs uppercase tracking-wider">Tipe</th>
                        <th className="px-3 py-3 text-right font-medium text-xs uppercase tracking-wider">Harga</th>
                        <th className="px-3 py-3 text-center font-medium text-xs uppercase tracking-wider">Qty</th>
                        <th className="px-3 py-3 text-right font-medium text-xs uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-900">
                      {/* Cek Item: Kalau loading pake skeleton/loading text, kalau ada render, kalau kosong warning */}
                      {!selectedProposal.items && isLoadingDetail ? (
                         <tr><td colSpan="5" className="text-center py-8 text-zinc-500">Mengambil data...</td></tr>
                      ) : !selectedProposal.items || selectedProposal.items.length === 0 ? (
                         <tr><td colSpan="5" className="text-center py-8 text-zinc-500 italic">Tidak ada item (atau gagal memuat)</td></tr>
                      ) : (
                        selectedProposal.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800 transition-colors">
                            <td className="px-3 py-2 text-zinc-300">{item.description}</td>
                            <td className="px-3 py-2 text-center">
                              <span className={`text-[10px] px-2 py-0.5 rounded border ${item.type === 'Part' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                {item.type}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-right text-zinc-500 text-xs">{formatRupiah(item.price)}</td>
                            <td className="px-3 py-2 text-center text-zinc-500 text-xs">{item.qty}</td>
                            <td className="px-3 py-2 text-right font-mono font-medium text-zinc-200">{formatRupiah(item.subtotal)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* FOOTER TOTAL */}
                <div className="bg-zinc-800 border-t border-zinc-700 p-3 flex justify-between items-center z-20 relative">
                   <span className="text-zinc-400 text-sm font-medium">Total Estimasi:</span>
                   <span className="text-blue-400 text-xl font-bold font-mono">
                      {formatRupiah(selectedProposal.grand_total)}
                   </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            {userRole === 'user' && selectedProposal.status === 'Sent' && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                <div className="flex gap-3 items-start mb-4">
                  <AlertCircle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                  <p className="text-xs text-yellow-200/80 leading-relaxed">
                    Dengan menyetujui penawaran ini, transaksi akan otomatis dibuat dan masuk ke antrian bengkel.
                  </p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => {
                      rejectProposal(selectedProposal.id);
                      setSelectedProposal(null);
                    }}
                    icon={XCircle}
                    className="h-9 text-xs"
                  >
                    Tolak
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                      acceptProposal(selectedProposal.id);
                      setSelectedProposal(null);
                    }}
                    icon={CheckCircle}
                    className="h-9 text-xs"
                  >
                    Setujui
                  </Button>
                </div>
              </div>
            )}
            
            {/* CONVERTED INFO */}
            {selectedProposal.status === 'Converted' && (
              <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl text-center">
                <p className="text-sm text-blue-300 font-medium">
                  ✅ Penawaran ini sudah disetujui.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProposalsPage;