import React, { useState, useMemo } from "react";
import { Search, Printer, FileDown, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useAuth, useData } from "../../contexts";
import { Button } from "../ui";
import { formatDateTime } from "../../utils/formatters";

const PointsHistoryPage = () => {
  const { isAdmin, currentUser } = useAuth();
  const { transactions } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter Data
  const filteredHistory = useMemo(() => {
    return transactions
      .filter((t) => {
        if (t.points_earned === 0) return false;        
        if (!isAdmin && t.UserId !== currentUser?.id) return false;
        if (t.status !== 'Selesai') return false;
        const keyword = searchTerm.toLowerCase();
        const matchSearch =
          String(t.UserId).toLowerCase().includes(keyword) ||
          t.note?.toLowerCase().includes(keyword) ||
          String(t.id).includes(keyword);
        const matchDate = filterDate
          ? new Date(t.createdAt).toISOString().split("T")[0] === filterDate
          : true;
        return matchSearch && matchDate;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
  }, [transactions, searchTerm, filterDate, isAdmin, currentUser]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportExcel = () => {
    const dataExport = filteredHistory.map((t) => ({
      Tanggal: new Date(t.createdAt).toLocaleString(),
      User: t.customer?.name || t.UserId,
      Tipe: t.points_earned > 0 ? "Masuk" : "Keluar",
      Keterangan: t.note || (t.points_earned > 0 ? "Bonus Servis" : "Tukar Reward"),
      Poin: t.points_earned,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Mutasi Poin");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "mutasi-poin.xlsx");
  };

  const handlePrint = () => { window.print(); };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg shadow-orange-900/20">
                    <Wallet className="w-7 h-7 text-white" />
                </div>
                Riwayat Poin dan Service
            </h2>
            <p className="text-zinc-400 mt-1 ml-1">Laporan mutasi poin masuk dan keluar</p>
        </div>
        {!isAdmin && (
             <div className="bg-zinc-900 px-6 py-4 rounded-xl border border-zinc-800">
                 <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-1">Saldo Anda</p>
                 <p className="text-yellow-400 font-mono font-bold text-3xl">{currentUser?.points || 0} XP</p>
             </div>
        )}
      </div>

      {/* FILTER */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="text" placeholder="Cari user / aktivitas..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-800 focus:border-yellow-600 outline-none" />
          </div>
          <input type="date" value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }} className="px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-800 focus:border-yellow-600 outline-none" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportExcel} icon={FileDown} variant="secondary">Excel</Button>
          <Button onClick={handlePrint} icon={Printer} variant="secondary">Print</Button>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedHistory.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-2xl">
                <p className="text-zinc-500 text-lg">Belum ada riwayat.</p>
            </div>
        ) : (
            paginatedHistory.map((t) => {
                const isPlus = t.points_earned > 0;
                return (
                    <div key={t.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-900/80 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all hover:shadow-lg hover:shadow-zinc-900/50">
                        
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                                isPlus 
                                ? 'bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border border-emerald-500/30 text-emerald-400' 
                                : 'bg-gradient-to-br from-red-900/50 to-red-800/30 border border-red-500/30 text-red-400'
                            }`}>
                                {isPlus ? <ArrowDownLeft className="w-7 h-7" /> : <ArrowUpRight className="w-7 h-7" />}
                            </div>

                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">
                                    {isPlus ? 'Poin Masuk' : 'Poin Keluar'}
                                </h4>
                                <p className="text-zinc-400 text-sm font-medium">
                                    {t.note || (isPlus ? 'Bonus Servis Berkala' : 'Penukaran Reward')}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800">
                                        {formatDateTime(t.createdAt)}
                                    </span>
                                    {isAdmin && <span className="text-yellow-600/80 font-semibold">• {t.customer?.name || 'User'}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Nominal Besar */}
                        <div className="mt-4 sm:mt-0 text-right pl-4 border-l border-zinc-800/50 sm:border-none">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Nominal</p>
                            <span className={`font-mono font-bold text-2xl tracking-tight ${
                                isPlus ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                                {isPlus ? '+' : ''}{t.points_earned} XP
                            </span>
                        </div>
                    </div>
                );
            })
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30">Prev</button>
          <span className="text-zinc-500 px-2">Page {currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30">Next</button>
        </div>
      )}
    </div>
  );
};

export default PointsHistoryPage;