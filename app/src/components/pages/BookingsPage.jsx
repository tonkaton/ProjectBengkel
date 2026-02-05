import React, { useState } from 'react';
import { Calendar, Smartphone, Bike, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts';
import { useSearch } from '../../hooks';
import { SearchInput, Button, Modal, Input, Select } from '../ui';

const BookingsPage = () => {
  // 1. Ambil data
  const { bookings, services, processBooking } = useData();

  // 2. Pake Hook Search bawaan lu
  const { searchQuery, setSearchQuery, filteredData: filteredBookings } = useSearch(
    bookings,
    ['name', 'phone', 'motor_type', 'service_type']
  );

  // 3. State Lokal (Modal Proses)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [processForm, setProcessForm] = useState({ plate_number: '', service_id: '' });
  const [loadingProcess, setLoadingProcess] = useState(false);

  // --- HANDLERS ---
  const handleOpenProcess = (booking) => {
    setSelectedBooking(booking);

    // 🔥 LOGIC FIX: Cari Service ID yang namanya SAMA dengan pilihan Tamu
    // Biar Admin gak perlu milih manual lagi, dan Harga OTOMATIS masuk ke backend
    const matchedService = services.find(s => s.name === booking.service_type);

    setProcessForm({ 
      plate_number: '', 
      // Kalau ketemu ID-nya, pake itu. Kalau gak, kosongin.
      service_id: matchedService ? matchedService.id : '' 
    });
    
    setIsModalOpen(true);
  };

  const handleProcessSubmit = async (e) => {
    e.preventDefault();
    if (!processForm.plate_number) return alert('Plat Nomor Wajib Diisi!');

    setLoadingProcess(true);
    const result = await processBooking(selectedBooking.id, processForm);
    setLoadingProcess(false);

    if (result.success) {
      alert(`Berhasil! ${selectedBooking.name} sudah jadi Member.`);
      setIsModalOpen(false);
    } else {
      alert('Gagal: ' + result.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Booking Masuk</h2>
          <p className="text-zinc-400 text-sm mt-1">Kelola antrian booking dari website</p>
        </div>
        <div className="w-full max-w-xs">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama / motor..."
          />
        </div>
      </div>

      {/* GRID KARTU */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.length === 0 && (
          <div className="col-span-full text-center py-12 text-zinc-500 bg-zinc-800/50 rounded-xl border border-dashed border-zinc-700">
            Tidak ada data booking yang ditemukan.
          </div>
        )}

        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className={`p-5 rounded-xl border transition-all ${
              booking.status === 'Processed'
                ? 'bg-zinc-900 border-zinc-800 opacity-75'
                : 'bg-zinc-800 border-zinc-700 hover:border-yellow-500'
            }`}
          >
            {/* Header Kartu */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-white font-bold text-lg">{booking.name}</h4>
                <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                  <Smartphone className="w-3 h-3" /> {booking.phone}
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                booking.status === 'Processed' 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-yellow-900 text-yellow-300'
              }`}>
                {booking.status}
              </span>
            </div>

            {/* Body Kartu */}
            <div className="space-y-3 text-sm text-zinc-300 border-t border-zinc-700/50 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Bike className="w-4 h-4" /> Motor
                </div>
                <span className="font-medium text-white">{booking.motor_type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-zinc-400">
                  <AlertCircle className="w-4 h-4" /> Service
                </div>
                <span className="font-medium text-yellow-400">{booking.service_type}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="w-4 h-4" /> Tgl
                </div>
                <span>{booking.booking_date}</span>
              </div>

              {/* Complaint Box */}
              <div className="bg-zinc-900/50 p-2 rounded text-xs text-zinc-400 italic mt-2">
                "{booking.complaint}"
              </div>
            </div>

            {/* Action Button */}
            {booking.status === 'Pending' && (
              <Button
                onClick={() => handleOpenProcess(booking)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              >
                <CheckCircle className="w-4 h-4 mr-2" /> Proses Booking
              </Button>
            )}
            
            {booking.status === 'Processed' && (
              <div className="w-full text-center py-2 text-green-500 text-sm font-semibold flex items-center justify-center gap-2 bg-green-900/10 rounded">
                <CheckCircle className="w-4 h-4" /> Sudah Diproses
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL PROSES */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Proses Booking Tamu"
      >
        <form onSubmit={handleProcessSubmit} className="space-y-4 mt-2">
          <div className="bg-zinc-800 p-3 rounded border border-zinc-700 text-sm">
            <p className="text-zinc-400">Nama: <span className="text-white font-bold">{selectedBooking?.name}</span></p>
            <p className="text-zinc-400">Motor: <span className="text-yellow-500">{selectedBooking?.motor_type}</span></p>
            {/* Tampilkan juga request tamu di sini biar admin ngeh */}
            <p className="text-zinc-400">Request: <span className="text-yellow-500 font-bold">{selectedBooking?.service_type}</span></p>
          </div>

          <div className="bg-blue-900/20 text-blue-200 p-3 rounded text-xs border border-blue-900/50">
            Sistem akan otomatis membuat <b>User Baru</b> dan <b>Data Kendaraan</b>.
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Plat Nomor <span className="text-red-500">*</span>
            </label>
            <Input
              value={processForm.plate_number}
              onChange={(e) => setProcessForm({ ...processForm, plate_number: e.target.value })}
              placeholder="B 1234 XYZ"
              className="uppercase"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Pilih Layanan (Harga Otomatis)
            </label>
            <Select
              value={processForm.service_id}
              onChange={(e) => setProcessForm({ ...processForm, service_id: e.target.value })}
            >
              <option value="">-- Pilih Manual (Jika Kosong) --</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - Rp {s.price.toLocaleString('id-ID')}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-700">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" isLoading={loadingProcess}>
              Simpan & Proses
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookingsPage;