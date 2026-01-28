// controllers/vehicleController.js
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.getAll = async (req, res) => {
  try {
    // Admin: lihat semua kendaraan
    // User: hanya lihat milik sendiri
    const where = req.user.role === 'admin' ? {} : { UserId: req.user.id };

    const vehicles = await Vehicle.findAll({
      where,
      include: [{ 
        model: User, 
        as: 'owner', 
        attributes: ['id', 'name', 'email'] 
      }]
    });
    res.json({ data: vehicles });
  } catch (err) {
    console.error('Vehicle getAll error:', err);
    res.status(500).json({ message: 'Gagal mengambil data kendaraan' });
  }
};

exports.getMyVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { UserId: req.user.id },
      include: [{ 
        model: User, 
        as: 'owner', 
        attributes: ['name'] 
      }]
    });
    res.json({ data: vehicles });
  } catch (err) {
    console.error('getMyVehicles error:', err);
    res.status(500).json({ message: 'Gagal mengambil kendaraan Anda' });
  }
};

exports.create = async (req, res) => {
  try {
    const { brand, model, plate, year, color, UserId } = req.body;
    
    // Admin can specify UserId, otherwise use logged-in user
    let ownerId = req.user.id;
    if (req.user.role === 'admin' && UserId) {
      // Validate that the specified user exists
      const user = await User.findByPk(UserId);
      if (!user) {
        return res.status(400).json({ message: 'Pemilik tidak ditemukan' });
      }
      ownerId = UserId;
    }

    const vehicle = await Vehicle.create({
      brand,
      model,
      plate,
      year,
      color,
      UserId: ownerId
    });
    res.status(201).json({ data: vehicle });
  } catch (err) {
    console.error('Create vehicle error:', err);
    res.status(400).json({ message: 'Gagal menambahkan kendaraan' });
  }
};

exports.update = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Kendaraan tidak ditemukan' });
    }
    if (vehicle.UserId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Tidak berhak mengubah kendaraan ini' });
    }
    await vehicle.update(req.body);
    res.json({ data: vehicle });
  } catch (err) {
    console.error('Update vehicle error:', err);
    res.status(400).json({ message: 'Gagal memperbarui kendaraan' });
  }
};

exports.remove = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Kendaraan tidak ditemukan' });
    }
    if (vehicle.UserId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Tidak berhak menghapus kendaraan ini' });
    }
    await vehicle.destroy();
    res.json({ message: 'Kendaraan berhasil dihapus' });
  } catch (err) {
    console.error('Delete vehicle error:', err);
    res.status(500).json({ message: 'Gagal menghapus kendaraan' });
  }
};