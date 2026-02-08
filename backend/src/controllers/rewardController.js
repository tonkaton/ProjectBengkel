const { Op } = require('sequelize'); // 👈 Wajib import Op buat filter history
const Reward = require('../models/Reward');
const LoyaltyPoint = require('../models/LoyaltyPoint');
const Transaction = require('../models/Transaction'); // 👈 Import Transaction
const Service = require('../models/Service');
const User = require('../models/User');

exports.getAll = async (req, res) => {
  try {
    const rewards = await Reward.findAll({
      where: { is_active: true },
      order: [['points_needed', 'ASC']]
    });
    res.json({ data: rewards });
  } catch (err) {
    console.error('Reward getAll error:', err);
    res.status(500).json({ message: 'Gagal mengambil data reward' });
  }
};

exports.create = async (req, res) => {
  try {
    const reward = await Reward.create(req.body);
    res.status(201).json({ data: reward });
  } catch (err) {
    console.error('Create reward error:', err);
    res.status(400).json({ message: 'Gagal membuat reward' });
  }
};

exports.update = async (req, res) => {
  try {
    const reward = await Reward.findByPk(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward tidak ditemukan' });
    await reward.update(req.body);
    res.json({ data: reward });
  } catch (err) {
    console.error('Update reward error:', err);
    res.status(400).json({ message: 'Gagal memperbarui reward' });
  }
};

exports.remove = async (req, res) => {
  try {
    const reward = await Reward.findByPk(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward tidak ditemukan' });
    await reward.destroy();
    res.json({ message: 'Reward dihapus' });
  } catch (err) {
    console.error('Delete reward error:', err);
    res.status(500).json({ message: 'Gagal menghapus reward' });
  }
};

// 👇 UPDATE 1: Logic Tukar Poin (Auto-Log ke Transaction)
exports.exchange = async (req, res) => {
  try {
    const reward = await Reward.findByPk(req.params.id);
    if (!reward || !reward.is_active) return res.status(404).json({ message: 'Reward tidak tersedia' });
    if (reward.stock <= 0) return res.status(400).json({ message: 'Stok habis' });

    // Cek Poin User (Pakai findOrCreate biar aman kalo user baru belum punya record poin)
    let [points] = await LoyaltyPoint.findOrCreate({ 
      where: { UserId: req.user.id },
      defaults: { points: 0 }
    });

    if (points.points < reward.points_needed) {
      return res.status(400).json({ message: 'Poin tidak cukup' });
    }

    // 1. Kurangi Poin & Stok
    points.points -= reward.points_needed;
    reward.stock -= 1;
    await points.save();
    await reward.save();

    // 2. CATAT TRANSAKSI "PENUKARAN" (Virtual History)
    await Transaction.create({
      UserId: req.user.id,
      ServiceId: null, // Karena bukan servis
      amount: 0,       // Gratis (Rp 0)
      points_earned: -reward.points_needed, // Poin Minus (Tanda Keluar)
      status: 'Selesai', // Langsung selesai
      note: `Tukar Reward: ${reward.name}`
    });

    res.json({ 
      message: `Berhasil tukar ${reward.name}`, 
      remaining_points: points.points,
      data: { reward, points: points.points }
    });
  } catch (err) {
    console.error('Exchange reward error:', err);
    res.status(500).json({ message: 'Gagal menukar reward' });
  }
};

// 👇 UPDATE 2: Logic Get History (Riwayat Poin)
exports.getHistory = async (req, res) => {
  try {
    const whereClause = {};

    // Filter: Hanya ambil transaksi yang ada poinnya (Entah dapat (+) atau tukar (-))
    whereClause.points_earned = { [Op.ne]: 0 };

    // Kalau User Biasa -> Cuma liat punya sendiri
    if (req.user.role !== 'admin') {
      whereClause.UserId = req.user.id;
    }

    const history = await Transaction.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'customer', attributes: ['name'] }, // Biar admin tau siapa
        { model: Service, as: 'service', attributes: ['name'] } // Biar tau servis apa
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ data: history });
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ message: 'Gagal mengambil riwayat poin' });
  }
};