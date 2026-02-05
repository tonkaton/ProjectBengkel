import { useState, useEffect } from 'react';
import { Container } from '../layout';
import { Card, Button } from '../ui';

// Variable API_URL sudah mengandung "/api" (sesuai env lu)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: '', 
    date: '',
    time: '',
    complaint: ''
  });

  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [servicesList, setServicesList] = useState([]); 

  // 👇 1. FETCH LAYANAN DARI BACKEND
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // HAPUS "/api" manual, karena API_URL sudah bawa "/api"
        const res = await fetch(`${API_URL}/services`); 
        const data = await res.json();
        
        if (res.ok && data.data) {
          setServicesList(data.data);
        }
      } catch (err) {
        console.error("Gagal ambil layanan:", err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    // Validasi Input
    if (!form.name || !form.phone || !form.vehicle || !form.date || !form.time || !form.service) {
      alert('Mohon lengkapi data booking (Nama, HP, Motor, Layanan, Tgl, Jam)');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        motor_type: form.vehicle,   
        service_type: form.service, 
        booking_date: form.date,    
        complaint: `Jam: ${form.time}. Keluhan: ${form.complaint || '-'}` 
      };

      // 👇 2. POST BOOKING KE BACKEND
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Gagal booking');

      // Simpan hasil response (isi data ada id, booking_queue, dll)
      setBookingResult(data.data); 

    } catch (err) {
      console.error(err);
      alert('Gagal mengirim booking: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <section id="booking" className="bg-black py-16 px-4 text-white">
      <Container size="sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Booking Servis Online</h2>
          <p className="text-gray-400">
            Daftar sekarang, admin kami akan segera memproses jadwal Anda.
          </p>
        </div>

        <Card variant="solid" className="p-6 sm:p-8 shadow-2xl border border-zinc-800 bg-zinc-900">
          {bookingResult ? (
            // TAMPILAN SUKSES
            <div className="text-center py-6">
              <div className="inline-block p-4 rounded-full bg-green-500/20 text-green-400 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Booking Berhasil!</h3>
              <p className="text-gray-300 mb-6">
                Data Anda telah kami terima. Tunjukkan nomor antrian ini ke admin saat datang ke bengkel.
              </p>
              
              {/* 👇 TAMPILAN TIKET ANTRIAN */}
              <div className="bg-zinc-800 rounded-lg p-6 max-w-sm mx-auto mb-8 border border-zinc-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-semibold">Nomor Antrian Booking</p>
                
                {/* 🔥 MENAMPILKAN QUEUE DARI BACKEND (Contoh: 20260210-001) */}
                <div className="text-4xl font-mono font-bold text-yellow-400 tracking-wider">
                  {bookingResult.booking_queue || `#${bookingResult.id}`}
                </div>
                
                <p className="text-xs text-zinc-600 mt-2">
                  Tanggal: {bookingResult.booking_date}
                </p>
              </div>

              <Button 
                onClick={() => { setBookingResult(null); setForm({...form, name: '', phone: ''}); }}
                variant="outline"
                className="mx-auto"
              >
                Buat Booking Baru
              </Button>
            </div>
          ) : (
            // FORM BOOKING
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input name="name" placeholder="Nama Lengkap" value={form.name} onChange={handleChange} className="p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-yellow-500" />
                <input name="phone" placeholder="No HP / WhatsApp" value={form.phone} onChange={handleChange} className="p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-yellow-500" />
                <input name="vehicle" placeholder="Motor (Contoh: Vario 160)" value={form.vehicle} onChange={handleChange} className="p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-yellow-500" />
                
                {/* 👇 DROPDOWN DINAMIS + HARGA */}
                <div className="relative">
                  <select 
                    name="service" 
                    value={form.service} 
                    onChange={handleChange} 
                    className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white appearance-none focus:outline-none focus:border-yellow-500"
                  >
                    <option value="">-- Pilih Layanan --</option>
                    
                    {servicesList.length > 0 ? (
                      servicesList.map((svc) => (
                        <option key={svc.id} value={svc.name}>
                          {svc.name} - Rp {svc.price.toLocaleString('id-ID')}
                        </option>
                      ))
                    ) : (
                      // Fallback kalau DB masih kosong/loading
                      <>
                        <option>Servis Ringan</option>
                        <option>Servis Berat</option>
                        <option>Ganti Oli</option>
                        <option>Servis CVT</option>
                      </>
                    )}
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">▼</div>
                </div>

                <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-yellow-500" />
                <input type="time" name="time" value={form.time} onChange={handleChange} className="p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-yellow-500" />
              </div>

              <textarea 
                name="complaint" 
                placeholder="Ada keluhan tambahan? (Opsional)" 
                value={form.complaint} 
                onChange={handleChange} 
                className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white mb-6 focus:outline-none focus:border-yellow-500 h-24 resize-none"
              />

              <Button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sedang Memproses...
                  </span>
                ) : 'Kirim Booking'}
              </Button>
            </>
          )}
        </Card>
      </Container>
    </section>
  );
}