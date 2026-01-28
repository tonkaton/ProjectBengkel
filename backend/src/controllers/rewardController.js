const Reward = require('../models/Reward');
const LoyaltyPoint = require('../models/LoyaltyPoint');

exports.getAll = async (req, res) => {
  try {
    const rewards = await Reward.findAll({
      where: { is_active: true },
      order: [['points_needed', 'ASC']]
    });
    res.json({ data: rewards }); // ✅ Format konsisten
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

exports.exchange = async (req, res) => {
  try {
    const reward = await Reward.findByPk(req.params.id);
    if (!reward || !reward.is_active) return res.status(404).json({ message: 'Reward tidak tersedia' });
    if (reward.stock <= 0) return res.status(400).json({ message: 'Stok habis' });

    const points = await LoyaltyPoint.findOne({ where: { UserId: req.user.id } });
    if (!points || points.points < reward.points_needed) {
      return res.status(400).json({ message: 'Poin tidak cukup' });
    }

    points.points -= reward.points_needed;
    reward.stock -= 1;
    await points.save();
    await reward.save();

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