import { useState } from 'react';
import { Container } from '../layout'; 
import { Card, Button } from '../ui';

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: 'Servis Ringan',
    date: '',
    time: '',
  });

  const [queueNumber, setQueueNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!form.name || !form.phone || !form.vehicle || !form.date || !form.time) {
      alert('Mohon lengkapi semua data booking');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setQueueNumber(data.queueNumber);
    } catch (err) {
      alert('Booking gagal, coba lagi');
    }
    setLoading(false);
  };

  return (
    <section id="booking" className="bg-black py-16 px-4 text-white">
      <Container size="sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Booking Servis Online</h2>
          <p className="text-gray-400">
            Booking dulu, datang ke bengkel tanpa perlu antri lama.
          </p>
        </div>

        <Card variant="solid" className="p-6 sm:p-8 shadow-2xl">
          {queueNumber ? (
            <div className="text-center">
              <p className="text-lg mb-2">Nomor Antrian Anda</p>
              <div className="text-5xl font-extrabold text-yellow-400 mb-4">
                #{queueNumber}
              </div>
              <p className="text-gray-300">
                Simpan nomor ini dan tunjukkan saat datang
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <input name="name" placeholder="Nama Lengkap" onChange={handleChange} className="p-3 rounded bg-gray-800" />
                <input name="phone" placeholder="No HP / WhatsApp" onChange={handleChange} className="p-3 rounded bg-gray-800" />
                <input name="vehicle" placeholder="Motor (Contoh: Vario 160)" onChange={handleChange} className="p-3 rounded bg-gray-800" />
                <select name="service" onChange={handleChange} className="p-3 rounded bg-gray-800">
                  <option>Servis Ringan</option>
                  <option>Servis Berat</option>
                  <option>Ganti Oli</option>
                  <option>Servis Mesin</option>
                </select>
                <input type="date" name="date" onChange={handleChange} className="p-3 rounded bg-gray-800" />
                <input type="time" name="time" onChange={handleChange} className="p-3 rounded bg-gray-800" />
              </div>

              <Button
                onClick={handleBooking}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg"
              >
                {loading ? 'Memproses...' : 'Ambil Nomor Antrian'}
              </Button>
            </>
          )}
        </Card>
      </Container>
    </section>
  );
}
