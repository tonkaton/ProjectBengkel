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
  const paginatedHistory = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const handlePrint = () => window.print();

  const inputClass =
    "rounded-2xl bg-base px-4 py-3 text-sm text-ink shadow-soft-in outline-none placeholder:text-muted";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Loyalti</span>
          <h1 className="mt-1 flex items-center gap-3 font-display text-4xl tracking-wide text-ink">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-soft-sm">
              <Wallet className="h-6 w-6" />
            </span>
            MUTASI POIN
          </h1>
          <p className="mt-1 text-sm text-muted">Laporan mutasi poin masuk dan keluar</p>
        </div>
        {!isAdmin && (
          <div className="rounded-2xl bg-card px-6 py-4 shadow-soft">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">Saldo Anda</p>
            <p className="font-mono text-3xl font-bold text-accent">{currentUser?.points || 0} XP</p>
          </div>
        )}
      </div>

      {/* FILTER */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full gap-3 md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Cari user / aktivitas..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-11 ${inputClass}`}
            />
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setCurrentPage(1);
            }}
            className={inputClass}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportExcel} icon={FileDown} variant="secondary">Excel</Button>
          <Button onClick={handlePrint} icon={Printer} variant="secondary">Print</Button>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedHistory.length === 0 ? (
          <div className="rounded-4xl border-2 border-dashed border-black/10 py-16 text-center text-muted">
            Belum ada riwayat.
          </div>
        ) : (
          paginatedHistory.map((t) => {
            const isPlus = t.points_earned > 0;
            return (
              <div
                key={t.id}
                className="flex flex-col justify-between rounded-3xl border border-white/70 bg-card p-5 shadow-soft transition-all hover:shadow-soft-lg sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-soft-sm ${
                      isPlus ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {isPlus ? <ArrowDownLeft className="h-7 w-7" /> : <ArrowUpRight className="h-7 w-7" />}
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-semibold text-ink">{isPlus ? 'Poin Masuk' : 'Poin Keluar'}</h4>
                    <p className="text-sm font-medium text-muted">{t.note || (isPlus ? 'Bonus Servis Berkala' : 'Penukaran Reward')}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                      <span className="rounded-md bg-base px-2 py-1 shadow-soft-in-sm">{formatDateTime(t.createdAt)}</span>
                      {isAdmin && <span className="font-semibold text-slate-500">• {t.customer?.name || 'User'}</span>}
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-black/5 pt-4 text-right sm:mt-0 sm:border-none sm:pt-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">Nominal</p>
                  <span className={`font-mono text-2xl font-bold tracking-tight ${isPlus ? 'text-emerald-600' : 'text-red-500'}`}>
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
        <div className="flex items-center justify-center gap-2 pt-6">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition disabled:opacity-30">Prev</button>
          <span className="px-2 text-sm text-muted">Page {currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition disabled:opacity-30">Next</button>
        </div>
      )}
    </div>
  );
};

export default PointsHistoryPage;
