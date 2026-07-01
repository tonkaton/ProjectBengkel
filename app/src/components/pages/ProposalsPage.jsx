import React, { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { ProposalForm } from '../forms';
import { proposalService } from '../../services';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Plus, FileText, CheckCircle, XCircle, AlertCircle, Search, Loader2 } from 'lucide-react';
import { formatDate, formatRupiah } from '../../utils/formatters';

const ITEMS_PER_PAGE = 10;

const ProposalsPage = () => {
  const { userRole, token } = useAuth();
  const { proposals, acceptProposal, rejectProposal } = useData();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) =>
      `${p.title || ''} ${p.vehicle?.plate || ''} ${p.admin_note || ''}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [proposals, search]);

  const totalPages = Math.ceil(filteredProposals.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProposals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProposals, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleViewDetail = async (proposal) => {
    setSelectedProposal(proposal);
    setIsLoadingDetail(true);
    try {
      const response = await proposalService.getDetail(proposal.id, token);
      setSelectedProposal(response.data || response);
    } catch (error) {
      console.error('Gagal memuat detail proposal:', error);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'text-amber-600 bg-amber-50';
      case 'Accepted': return 'text-emerald-600 bg-emerald-50';
      case 'Converted': return 'text-blue-600 bg-blue-50';
      case 'Rejected': return 'text-red-500 bg-red-50';
      default: return 'text-ink2 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Project custom</span>
          <h1 className="mt-1 flex items-center gap-3 font-display text-4xl tracking-wide text-ink">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-soft-sm">
              <FileText className="h-6 w-6" />
            </span>
            {userRole === 'admin' ? 'PENAWARAN' : 'PENAWARAN SAYA'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {userRole === 'admin' ? 'Kelola penawaran modifikasi dan estimasi.' : 'Daftar estimasi biaya untuk project motor Anda.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Cari judul / plat nomor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-64 rounded-full bg-base py-3 pl-11 pr-4 text-sm text-ink shadow-soft-in outline-none placeholder:text-muted"
            />
          </div>
          {userRole === 'admin' && (
            <Button icon={Plus} onClick={() => setIsCreateOpen(true)}>
              Buat Proposal
            </Button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {paginatedData.length === 0 ? (
          <div className="rounded-4xl border-2 border-dashed border-hair p-10 text-center">
            <FileText className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <p className="text-muted">Belum ada data proposal ditemukan.</p>
          </div>
        ) : (
          paginatedData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleViewDetail(item)}
              className="flex cursor-pointer flex-col justify-between gap-4 rounded-3xl border border-line bg-card p-5 shadow-soft transition-all hover:shadow-soft-lg sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-soft-sm">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-base font-semibold text-ink">{item.title}</h4>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <span className="rounded-md bg-base px-2 py-0.5 text-xs text-ink2 shadow-soft-in-sm">
                      {item.vehicle ? `${item.vehicle.model} (${item.vehicle.plate})` : 'Tanpa Kendaraan'}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex min-w-[140px] flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center">
                <p className="font-mono text-lg font-bold tracking-tight text-ink">{formatRupiah(item.grand_total)}</p>
                <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${getStatusColor(item.status)}`}>
                  {item.status === 'Converted' ? 'Jadi Transaksi' : item.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-ink2 shadow-soft transition disabled:opacity-40">Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`min-w-[40px] rounded-full px-4 py-2 text-sm transition ${
                currentPage === i + 1 ? 'bg-accent font-bold text-white shadow-[0_6px_14px_rgba(224,70,59,0.30)]' : 'bg-panel text-ink2 shadow-soft'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-ink2 shadow-soft transition disabled:opacity-40">Next</button>
        </div>
      )}

      {/* MODAL CREATE */}
      <Modal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Buat Proposal Project Baru">
        <ProposalForm onClose={() => setIsCreateOpen(false)} />
      </Modal>

      {/* MODAL DETAIL */}
      <Modal open={!!selectedProposal} onClose={() => setSelectedProposal(null)} title="Rincian Penawaran">
        {selectedProposal && (
          <div className="space-y-5">
            {/* Header */}
            <div className="rounded-2xl bg-base p-5 shadow-soft-in-sm">
              <h3 className="mb-1 text-xl font-semibold text-ink">{selectedProposal.title}</h3>
              <div className="mb-3 flex items-center justify-between border-b border-hair pb-3 text-sm text-muted">
                <span>Ref: #{selectedProposal.id}</span>
                <span>{formatDate(selectedProposal.createdAt)}</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted">Kendaraan:</span>
                  <span className="font-medium text-ink">
                    {selectedProposal.vehicle?.brand} {selectedProposal.vehicle?.model} ({selectedProposal.vehicle?.plate || '-'})
                  </span>
                </p>
                {selectedProposal.admin_note && (
                  <div className="mt-2 rounded-xl bg-card p-3 text-xs italic text-muted shadow-soft-in-sm">
                    "{selectedProposal.admin_note}"
                  </div>
                )}
              </div>
            </div>

            {/* Rincian Biaya */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-ink2">
                  <FileText size={16} className="text-blue-500" /> Rincian Biaya
                </h4>
                {isLoadingDetail && (
                  <span className="flex animate-pulse items-center text-xs text-blue-500">
                    <Loader2 size={12} className="mr-1 animate-spin" /> Memuat...
                  </span>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft-sm">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10 border-b border-hair bg-base text-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Deskripsi</th>
                        <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">Tipe</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">Harga</th>
                        <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">Qty</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hair">
                      {!selectedProposal.items && isLoadingDetail ? (
                        <tr><td colSpan={5} className="py-8 text-center text-muted">Mengambil data...</td></tr>
                      ) : !selectedProposal.items || selectedProposal.items.length === 0 ? (
                        <tr><td colSpan={5} className="py-8 text-center italic text-muted">Tidak ada item</td></tr>
                      ) : (
                        selectedProposal.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 text-ink2">{item.description}</td>
                            <td className="px-3 py-3 text-center">
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.type === 'Part' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                {item.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-xs text-muted">{formatRupiah(item.price)}</td>
                            <td className="px-3 py-3 text-center text-xs text-muted">{item.qty}</td>
                            <td className="px-4 py-3 text-right font-mono font-medium text-ink">{formatRupiah(item.subtotal)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t border-hair bg-base p-4">
                  <span className="text-sm font-medium text-muted">Total Estimasi:</span>
                  <span className="font-mono text-xl font-bold text-accent">{formatRupiah(selectedProposal.grand_total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {userRole === 'user' && selectedProposal.status === 'Sent' && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="mb-3 flex items-start gap-3">
                  <AlertCircle className="mt-0.5 shrink-0 text-amber-500" size={20} />
                  <p className="text-xs leading-relaxed text-amber-700">
                    Dengan menyetujui penawaran ini, transaksi akan otomatis dibuat dan masuk ke antrian bengkel.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      rejectProposal(selectedProposal.id);
                      setSelectedProposal(null);
                    }}
                    icon={XCircle}
                    className="text-xs"
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
                    className="text-xs"
                  >
                    Setujui
                  </Button>
                </div>
              </div>
            )}

            {selectedProposal.status === 'Converted' && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-center">
                <p className="text-sm font-medium text-blue-600">✅ Penawaran ini sudah disetujui dan menjadi transaksi.</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProposalsPage;
