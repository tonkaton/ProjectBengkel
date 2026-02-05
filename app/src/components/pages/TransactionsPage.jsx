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

  // 🔍 SEARCH + FILTER
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const keyword = searchTerm.toLowerCase();

      const matchSearch =
        String(t.UserId).toLowerCase().includes(keyword) ||
        t.note?.toLowerCase().includes(keyword) ||
        t.status?.toLowerCase().includes(keyword) || 
        String(t.amount).includes(keyword) ||
        String(t.queue_number).toLowerCase().includes(keyword) || // 👈 Tambah search by Queue
        String(t.id).includes(keyword);

      const matchDate = filterDate
        ? new Date(t.createdAt).toISOString().split("T")[0] === filterDate
        : true;

      return matchSearch && matchDate;
    });
  }, [transactions, searchTerm, filterDate]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 📥 EXPORT EXCEL (UPDATE)
  const handleExportExcel = () => {
    const dataExport = filteredTransactions.map((t) => ({
      ID: t.id,
      Antrian: t.queue_number || "-", // 👈 Tambah Kolom Antrian
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

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "data-transaksi.xlsx"
    );
  };

  // 🖨 PRINT (UPDATE)
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Kelola Transaksi</h2>
        {isAdmin && (
          <Button onClick={() => onOpenModal("addTransaction")} icon={Plus} size="lg">
            Tambah Transaksi
          </Button>
        )}
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari ID, User, Antrian..." // 👈 Update placeholder
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            />
          </div>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleExportExcel} icon={FileDown}>Export</Button>
          <Button onClick={handlePrint} icon={Printer}>Print</Button>
        </div>
      </div>

      {/* DATA */}
      {paginatedTransactions.length === 0 ? (
        <p className="text-gray-400 text-center py-10">Tidak ada transaksi ditemukan</p>
      ) : (
        <div className="space-y-4"> {/* 👈 Wrapper biar rapi */}
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
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-zinc-800 text-white rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-yellow-500 text-black border-yellow-500 font-bold"
                  : "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-zinc-800 text-white rounded-lg border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;