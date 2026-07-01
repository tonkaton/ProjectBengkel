import React, { useState, useMemo } from "react";
import { Plus, Search, Printer, FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useAuth, useData } from "../../contexts";
import { Button } from "../ui";
import { TransactionRow } from "../common";

const TransactionsPage = ({ onOpenModal }) => {
  const { isAdmin } = useAuth();
  const { transactions, toggleTransactionStatus, deleteTransaction } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const keyword = searchTerm.toLowerCase();
      const matchSearch =
        String(t.UserId).toLowerCase().includes(keyword) ||
        t.note?.toLowerCase().includes(keyword) ||
        t.status?.toLowerCase().includes(keyword) ||
        String(t.amount).includes(keyword) ||
        String(t.queue_number).toLowerCase().includes(keyword) ||
        String(t.id).includes(keyword);
      const matchDate = filterDate
        ? new Date(t.createdAt).toISOString().split("T")[0] === filterDate
        : true;
      return matchSearch && matchDate;
    });
  }, [transactions, searchTerm, filterDate]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportExcel = () => {
    const dataExport = filteredTransactions.map((t) => ({
      ID: t.id,
      Antrian: t.queue_number || "-",
      Name: t.UserId,
      Tanggal: new Date(t.createdAt).toLocaleString(),
      Catatan: t.note || "-",
      Status: t.status || "Menunggu",
      Nominal: t.amount,
      Poin: t.points_earned,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transaksi");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "data-transaksi.xlsx"
    );
  };

  const handlePrint = () => {
    const rows = filteredTransactions
      .map(
        (t) => `
        <tr>
          <td>${t.id}</td>
          <td style="font-weight:bold; color:blue;">${t.queue_number || "-"}</td> <td>${t.UserId}</td>
          <td>${new Date(t.createdAt).toLocaleString()}</td>
          <td>${t.note || "-"}</td>
          <td>${t.status || "menunggu"}</td>
          <td>Rp ${Number(t.amount).toLocaleString('id-ID')}</td>
          <td>${t.points_earned}</td>
        </tr>`
      )
      .join("");
    const printContent = `
      <html>
        <head>
          <title>Data Transaksi</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align:left; }
            th { background: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Data Transaksi Bengkel</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>Antrian</th> <th>User ID</th>
              <th>Tanggal</th>
              <th>Catatan</th>
              <th>Status</th>
              <th>Nominal</th>
              <th>Poin</th>
            </tr>
            ${rows}
          </table>
        </body>
      </html>
    `;
    const win = window.open("", "", "width=900,height=700");
    win.document.write(printContent);
    win.document.close();
    win.print();
  };

  const inputClass =
    "rounded-2xl bg-base px-4 py-2.5 text-sm text-ink shadow-soft-in outline-none placeholder:text-muted";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Keuangan</span>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">KELOLA TRANSAKSI</h1>
        </div>
        {isAdmin && (
          <Button onClick={() => onOpenModal("addTransaction")} icon={Plus}>
            Tambah Transaksi
          </Button>
        )}
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full gap-3 md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Cari ID, User, Antrian..."
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
          <Button onClick={handleExportExcel} icon={FileDown} variant="secondary">Export</Button>
          <Button onClick={handlePrint} icon={Printer} variant="secondary">Print</Button>
        </div>
      </div>

      {/* DATA */}
      {paginatedTransactions.length === 0 ? (
        <p className="py-10 text-center text-muted">Tidak ada transaksi ditemukan</p>
      ) : (
        <div className="space-y-4">
          {paginatedTransactions.map((t) => (
            <TransactionRow
              key={t.id}
              transaction={{ ...t, status: t.status || "Menunggu" }}
              onToggleStatus={toggleTransactionStatus}
              onDelete={deleteTransaction}
            />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`min-w-[40px] rounded-full px-4 py-2 text-sm transition ${
                currentPage === i + 1
                  ? "bg-accent font-bold text-white shadow-[0_6px_14px_rgba(224,70,59,0.30)]"
                  : "bg-panel text-slate-600 shadow-soft"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
