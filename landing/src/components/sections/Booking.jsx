import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Container } from '../layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const inputClass =
  'w-full rounded-2xl bg-base px-4 py-3 text-ink shadow-soft-in placeholder:text-muted focus:outline-none';

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: '',
    date: '',
    time: '',
    complaint: '',
  });

  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/services`);
        const data = await res.json();
        if (res.ok && data.data) setServicesList(data.data);
      } catch (err) {
        console.error('Gagal ambil layanan:', err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
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
        complaint: `[JAM KEDATANGAN: ${form.time}] - ${form.complaint || '-'}`,
      };

      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal booking');
      setBookingResult(data.data);
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim booking: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <section id="booking" className="bg-tintMint px-4 py-24">
      <Container size="sm">
        <div className="mb-10 text-center">
          <span className="eyebrow">Booking online</span>
          <h2 className="mt-3 font-display text-5xl tracking-wide text-ink md:text-6xl">
            BOOKING <span className="text-accent">SERVIS</span>
          </h2>
          <p className="mt-4 text-ink2">
            Pilih jadwal kedatangan Anda. Admin akan memproses antrian.
          </p>
        </div>

        <div className="rounded-4xl border border-line bg-card p-6 shadow-soft-lg sm:p-8">
          {bookingResult ? (
            <div className="py-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-base text-ok shadow-soft">
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-semibold text-ink">Booking berhasil!</h3>
              <p className="mt-1 text-ink2">Data Anda telah kami terima.</p>

              <div className="mx-auto mb-8 mt-6 max-w-sm rounded-3xl bg-base p-6 shadow-soft-in">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
                  Kode booking / ID antrian
                </p>
                <div className="font-mono text-4xl font-bold tracking-wider text-accent">
                  {bookingResult.booking_queue || `#${bookingResult.id}`}
                </div>
                <div className="mt-4 flex justify-between border-t border-hair pt-4 text-xs text-muted">
                  <span>Tanggal: {bookingResult.booking_date}</span>
                  <span>Jam: {form.time}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingResult(null);
                  setForm({ ...form, name: '', phone: '' });
                }}
                className="rounded-full bg-panel px-7 py-3 font-semibold text-ink shadow-soft transition hover:shadow-soft-lg active:shadow-soft-in"
              >
                Buat booking baru
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="name" placeholder="Nama lengkap" value={form.name} onChange={handleChange} className={inputClass} />
                <input name="phone" placeholder="No HP / WhatsApp" value={form.phone} onChange={handleChange} className={inputClass} />
                <input name="vehicle" placeholder="Motor (contoh: Vario 160)" value={form.vehicle} onChange={handleChange} className={inputClass} />

                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    <option value="">-- Pilih layanan --</option>
                    {servicesList.length > 0 ? (
                      servicesList.map((svc) => (
                        <option key={svc.id} value={svc.name}>
                          {svc.name} - Rp {svc.price.toLocaleString('id-ID')}
                        </option>
                      ))
                    ) : (
                      <option>Loading...</option>
                    )}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-muted" />
                </div>

                <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} />
                <input type="time" name="time" value={form.time} onChange={handleChange} className={inputClass} />
              </div>

              <textarea
                name="complaint"
                placeholder="Ada keluhan tambahan? (opsional)"
                value={form.complaint}
                onChange={handleChange}
                className={`${inputClass} mb-6 h-24 resize-none`}
              />

              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full rounded-full bg-accent py-3.5 font-semibold text-white shadow-[0_10px_24px_rgba(224,70,59,0.35)] transition hover:bg-accentDark active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? 'Sedang memproses...' : 'Kirim booking'}
              </button>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
