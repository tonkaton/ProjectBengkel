const Maintenance = require('../models/Maintenance');
const User = require('../models/User');
const { Op } = require('sequelize');

// 1. GET ALL (Untuk Admin - Tracker Semua Pelanggan)
exports.getAll = async (req, res) => {
  try {
    const data = await Maintenance.findAll({
      include: [
        { 
          model: User, 
          as: 'owner', // ✅ WAJIB: sesuai alias di model
          attributes: ['id', 'name', 'email'] 
        }
      ],
      order: [['next_service', 'ASC']]
    });
    res.json({ data }); // ✅ Konsisten dengan format API lain
  } catch (e) {
    console.error('Maintenance getAll error:', e); // 👈 Untuk debug
    res.status(500).json({ message: 'Gagal mengambil data maintenance' });
  }
};

// 2. GET MY MAINTENANCES (Untuk User/Renal - Jadwal Servis Saya)
exports.getMyMaintenances = async (req, res) => {
  try {
    const data = await Maintenance.findAll({
      where: { UserId: req.user.id },
      include: [
        { 
          model: User, 
          as: 'owner', // ✅ WAJIB
          attributes: ['id', 'name', 'email'] 
        }
      ],
      order: [['next_service', 'ASC']]
    });
    res.json({ data });
  } catch (e) {
    console.error('getMyMaintenances error:', e);
    res.status(500).json({ message: 'Gagal mengambil jadwal servis Anda' });
  }
};

// 2.1 GET LATEST UPCOMING MAINTENANCE (For Customer Dashboard)
exports.getLatestUpcoming = async (req, res) => {
  try {
    const now = new Date();
    const maintenance = await Maintenance.findOne({
      where: { 
        UserId: req.user.id,
        next_service: {
          [Op.gte]: now // Only get upcoming schedules
        }
      },
      include: [
        { 
          model: User, 
          as: 'owner',
          attributes: ['id', 'name', 'email'] 
        }
      ],
      order: [['next_service', 'ASC']] // Get the nearest upcoming schedule
    });
    
    res.json({ data: maintenance });
  } catch (e) {
    console.error('getLatestUpcoming error:', e);
    res.status(500).json({ message: 'Gagal mengambil jadwal servis terbaru' });
  }
};

// 3. CREATE (Untuk Admin - Input Jadwal Servis Manual)
exports.create = async (req, res) => {
  try {
    const { UserId, vehicleId, note, next_service } = req.body;
    
    if (!UserId || !vehicleId || !next_service) {
      return res.status(400).json({ message: 'UserId, vehicleId, dan next_service wajib diisi' });
    }

    // Fetch vehicle to get motor name
    const Vehicle = require('../models/Vehicle');
    const vehicle = await Vehicle.findByPk(vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Kendaraan tidak ditemukan' });
    }

    // Verify vehicle belongs to the user
    if (vehicle.UserId !== Number(UserId)) {
      return res.status(400).json({ message: 'Kendaraan tidak sesuai dengan pelanggan' });
    }

    const motor_name = `${vehicle.brand} ${vehicle.model} (${vehicle.plate})`;
    const service_date = new Date(); // Current date as service date
    
    const newM = await Maintenance.create({
      UserId,
      motor_name,
      service_date,
      next_service,
      note: note || 'Maintenance terjadwal'
    });
    
    res.status(201).json({ message: 'Jadwal servis berhasil dibuat', data: newM });
  } catch (e) {
    console.error('Create maintenance error:', e);
    res.status(400).json({ message: 'Gagal membuat jadwal servis' });
  }
};

// 4. DELETE (Untuk Admin - Hapus Jadwal yang Batal/Salah)
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Maintenance.destroy({ where: { id } });
    res.json({ message: 'Jadwal servis dihapus' });
  } catch (e) {
    console.error('Delete maintenance error:', e);
    res.status(500).json({ message: 'Gagal menghapus jadwal' });
  }
};