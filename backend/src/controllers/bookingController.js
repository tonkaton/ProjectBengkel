const Booking = require('../models/Booking');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Transaction = require('../models/Transaction');
const Service = require('../models/Service');
const generateQueueNumber = require('../utils/queueGenerator');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// 1. TAMU: Kirim Data Booking (Public)
exports.create = async (req, res) => {
  try {
    const { name, phone, motor_type, service_type, booking_date, complaint } = req.body;

    if (!name || !phone || !motor_type || !booking_date) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    // A. Simpan Booking dulu
    const newBooking = await Booking.create({
      name,
      phone,
      motor_type,
      service_type,
      booking_date,
      complaint,
      status: 'Pending'
    });

    // B. 🔥 LOGIC HITUNG ANTRIAN (Khusus Tampilan Landing Page)
    // Hitung ada berapa booking pada tanggal tersebut
    const bookingCount = await Booking.count({
      where: { booking_date: booking_date }
    });

    // Format Tanggal: 2026-02-10 -> 20260210
    const dateCode = booking_date.split('-').join('');
    
    // Format Urutan: 5 -> 005
    const sequence = String(bookingCount).padStart(3, '0');
    
    // Gabungin: "20260210-005"
    const bookingQueue = `${dateCode}-${sequence}`;

    res.status(201).json({
      message: 'Booking berhasil dikirim! Admin akan segera memproses.',
      data: {
        ...newBooking.toJSON(),
        booking_queue: bookingQueue // 👇 Ini yang ditunggu Frontend
      }
    });
  } catch (error) {
    console.error('Booking Create Error:', error);
    res.status(500).json({ message: 'Gagal mengirim booking' });
  }
};

// 2. ADMIN: Lihat Semua Booking Masuk
exports.getAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json({ data: bookings });
  } catch (error) {
    console.error('Booking GetAll Error:', error);
    res.status(500).json({ message: 'Gagal mengambil data booking' });
  }
};

// 3. MAGIC: Proses Booking -> Jadi Member & Transaksi
exports.processBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { plate_number, service_id } = req.body; 

    if (!plate_number) {
      return res.status(400).json({ message: 'Plat nomor wajib diisi saat proses!' });
    }

    // A. Ambil Data Booking
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: 'Booking tidak ditemukan' });
    if (booking.status === 'Processed') return res.status(400).json({ message: 'Booking sudah diproses sebelumnya' });

    // B. Cek / Buat User (Member)
    const dummyEmail = `${booking.phone}@guest.local`;
    
    let user = await User.findOne({ 
      where: { 
        [Op.or]: [{ email: dummyEmail }, { name: booking.name }] 
      } 
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash('123456', 10); 
      user = await User.create({
        name: booking.name,
        email: dummyEmail,
        password: hashedPassword,
        role: 'user',
      });
    }

    // C. Buat Kendaraan (Vehicle)
    let vehicle = await Vehicle.findOne({ where: { plate: plate_number } });
    if (!vehicle) {
      vehicle = await Vehicle.create({
        plate: plate_number,
        model: booking.motor_type,
        UserId: user.id,
        year: new Date().getFullYear(), 
        brand: 'Unknown' 
      });
    }

    // D. Generate Antrian & Transaksi
    // Kirim tanggal booking tamu ke generator (biar akurat)
    const queueNumber = await generateQueueNumber(booking.booking_date);
    
    // Cek harga service & Poin
    let amount = 0;
    let points_earned = 0; 

    if (service_id) {
      const service = await Service.findByPk(service_id);
      if (service) {
        amount = service.price;        // Ambil harga
        points_earned = service.points; // Ambil poin
      }
    }

    const transaction = await Transaction.create({
      UserId: user.id,
      VehicleId: vehicle.id,
      ServiceId: service_id || null,
      queue_number: queueNumber,
      status: 'Menunggu',
      note: `Booking Web: ${booking.service_type}. Keluhan: ${booking.complaint || '-'}`,
      amount: amount,
      points_earned: points_earned 
    });

    // E. Update Status Booking
    booking.status = 'Processed';
    await booking.save();

    res.json({
      message: 'Berhasil! Tamu jadi Member & Transaksi dibuat.',
      data: {
        user: user.name,
        vehicle: vehicle.plate,
        queue: queueNumber,
        price: amount,
        points: points_earned,
        transactionId: transaction.id
      }
    });

  } catch (error) {
    console.error('Process Booking Error:', error);
    res.status(500).json({ message: 'Gagal memproses booking: ' + error.message });
  }
};