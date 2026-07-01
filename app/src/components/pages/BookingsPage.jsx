import React, { useState } from 'react';
import { Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts';
import { useSearch } from '../../hooks';
import { SearchInput, Button, Modal, Input, Select } from '../ui';

const BookingsPage = () => {
  const { bookings, services, processBooking } = useData();
  const { searchQuery, setSearchQuery, filteredData: filteredBookings } = useSearch(bookings, [
    'name',
    'phone',
    'motor_type',
    'service_type',
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [processForm, setProcessForm] = useState({ plate_number: '', service_id: '' });
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [matchedServiceName, setMatchedServiceName] = useState(null);

  const handleOpenProcess = (booking) => {
    setSelectedBooking(booking);
    const matchedService = services.find((s) => s.name === booking.service_type);
    setProcessForm({ plate_number: '', service_id: matchedService ? matchedService.id : '' });
    setMatchedServiceName(
      matchedService ? `${matchedService.name} - Rp ${matchedService.price.toLocaleString('id-ID')}` : null
    );
    setIsModalOpen(true);
  };

  const handleProcessSubmit = async (e) => {
    e.preventDefault();
    if (!processForm.plate_number) return alert('Plat Nomor Wajib Diisi!');
    if (!processForm.service_id) return alert('Mohon pastikan Layanan Service sudah terpilih!');

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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Antrian website</span>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">BOOKING MASUK</h1>
        </div>
        <div className="w-full max-w-xs">
          <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari nama / motor..." />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.length === 0 && (
          <div className="col-span-full rounded-4xl border-2 border-dashed border-hair py-12 text-center text-muted">
            Tidak ada data booking.
          </div>
        )}

        {filteredBookings.map((booking) => {
          const isPending = booking.status === 'Pending';
          return (
            <div
              key={booking.id}
              className={`rounded-4xl border border-line bg-card p-5 shadow-soft transition-all ${
                isPending ? 'cursor-pointer hover:shadow-soft-lg' : 'opacity-80'
              }`}
              onClick={isPending ? () => handleOpenProcess(booking) : undefined}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-ink">{booking.name}</h4>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <Smartphone className="h-3 w-3" /> {booking.phone}
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    isPending ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mb-4 space-y-2.5 border-t border-hair pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Motor:</span>
                  <span className="font-medium text-ink">{booking.motor_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Service:</span>
                  <span className="font-medium text-accent">{booking.service_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tgl:</span>
                  <span className="font-mono text-ink2">{booking.booking_date}</span>
                </div>
                {booking.complaint && (
                  <div className="mt-2 rounded-xl bg-base p-2.5 text-xs italic text-muted shadow-soft-in-sm">
                    "{booking.complaint}"
                  </div>
                )}
              </div>

              {isPending ? (
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-2.5 font-semibold text-white shadow-[0_8px_18px_rgba(224,70,59,0.30)] transition active:scale-[0.98]">
                  <CheckCircle className="h-4 w-4" /> Proses Booking
                </button>
              ) : (
                <div className="w-full rounded-full bg-emerald-50 py-2 text-center text-sm font-semibold text-emerald-600">
                  Sudah Diproses
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Proses Booking Tamu">
        <form onSubmit={handleProcessSubmit} className="mt-2 space-y-4">
          <div className="space-y-1 rounded-2xl bg-base p-4 text-sm shadow-soft-in-sm">
            <p className="text-muted">Nama: <span className="font-semibold text-ink">{selectedBooking?.name}</span></p>
            <p className="text-muted">Motor: <span className="text-ink">{selectedBooking?.motor_type}</span></p>
            <p className="text-muted">Request Tamu: <span className="font-semibold text-accent">"{selectedBooking?.service_type}"</span></p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700">
            Sistem akan otomatis membuat <b>User Baru</b> dan <b>Data Kendaraan</b>.
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink2">
              Plat Nomor <span className="text-accent">*</span>
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
            <label className="mb-1.5 block text-sm font-medium text-ink2">Konfirmasi Layanan &amp; Harga</label>
            {matchedServiceName ? (
              <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="font-semibold">{matchedServiceName}</span>
                </div>
                <button type="button" onClick={() => setMatchedServiceName(null)} className="text-xs font-medium text-emerald-600 underline">
                  Ubah?
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="mb-1 flex items-center gap-1 text-xs text-amber-600">
                  <AlertCircle className="h-3 w-3" /> Pilih layanan secara manual:
                </div>
                <Select value={processForm.service_id} onChange={(e) => setProcessForm({ ...processForm, service_id: e.target.value })}>
                  <option value="">-- Pilih Layanan --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} - Rp {s.price.toLocaleString('id-ID')}
                    </option>
                  ))}
                </Select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-hair pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" isLoading={loadingProcess}>
              Simpan &amp; Proses
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookingsPage;
